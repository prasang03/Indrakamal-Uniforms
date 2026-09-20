/**
 * Direct Email Inquiry Service for Indrakamal Uniforms
 * Transmits inquiries securely to info@indrakamal.in
 * Includes anti-spam verification: honeypot traps, bot timing analysis,
 * Indian mobile format verification, disposable email blocking & keyword filtering.
 */

const RECIPIENT_EMAIL = 'info@indrakamal.in';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

// Known disposable temporary email domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  '10minutemail.com',
  'sharklasers.com',
  'yopmail.com',
  'trashmail.com',
  'getairmail.com',
  'dispostable.com',
  'temp-mail.org',
  'throwawaymail.com',
  'burnermail.io'
]);

// Spam trigger phrases typically blasted by internet bots
const SPAM_KEYWORDS = [
  'crypto',
  'bitcoin',
  'ethereum',
  'forex',
  'seo ranking',
  'backlink',
  'casino',
  'viagra',
  'cialis',
  'guest post',
  'poker',
  'porn',
  'dating service',
  'telegram.me',
  't.me/',
  'whatsapp marketing',
  'make money fast',
  'investment opportunity',
  'hire hackers'
];

export interface AntiSpamMeta {
  honeypot?: string;
  elapsedSeconds?: number;
}

/**
 * Validates whether an Indian mobile number is structurally genuine
 */
export function validateIndianPhone(phone: string): { isValid: boolean; message?: string } {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  const digitsOnly = cleaned.startsWith('91') && cleaned.length === 12 
    ? cleaned.slice(2) 
    : cleaned;

  if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
    return {
      isValid: false,
      message: 'Please provide a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).'
    };
  }

  // Check for dummy repetitive numbers (e.g., 9999999999, 1234567890)
  if (/^(\d)\1{9}$/.test(digitsOnly) || digitsOnly === '1234567890' || digitsOnly === '9876543210') {
    return {
      isValid: false,
      message: 'Please enter a genuine contact number for institutional quotation.'
    };
  }

  return { isValid: true };
}

/**
 * Checks if email is disposable or invalid
 */
export function validateEmail(email?: string): { isValid: boolean; message?: string } {
  if (!email || !email.trim()) return { isValid: true };
  const trimmed = email.trim().toLowerCase();
  
  const atIndex = trimmed.indexOf('@');
  if (atIndex === -1) {
    return { isValid: false, message: 'Please enter a valid email address format.' };
  }

  const domain = trimmed.slice(atIndex + 1);
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      message: 'Please use an official institutional or permanent email address.'
    };
  }

  return { isValid: true };
}

/**
 * Checks text content for bot patterns, spam links, and keywords
 */
function containsBotSpam(texts: (string | undefined)[]): boolean {
  const combined = texts.filter(Boolean).join(' ').toLowerCase();

  // Flag external spam links (genuine uniform buyers do not paste external web links)
  if (/https?:\/\/|www\./i.test(combined)) {
    return true;
  }

  // Flag spam trigger keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (combined.includes(keyword)) {
      return true;
    }
  }

  return false;
}

export interface QuoteInquiryPayload extends AntiSpamMeta {
  reference: string;
  organization: string;
  contactPerson: string;
  phone: string;
  email?: string;
  location: string;
  timeline: string;
  notes?: string;
  estimatedTotal: string;
  itemsSummary: string;
}

export interface SampleKitPayload extends AntiSpamMeta {
  reference: string;
  fullName: string;
  organizationName: string;
  sector: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  estimatedQuantity: string;
  requirements?: string;
}

export interface GeneralInquiryPayload extends AntiSpamMeta {
  reference: string;
  organization: string;
  contactPerson: string;
  role?: string;
  phone: string;
  email?: string;
  location: string;
  sector: string;
  approxQuantity?: string;
  requirements: string;
  timeline: string;
  attachedQuote?: {
    totalGarments: number;
    estimatedTotal: string;
    itemsSummary: string;
  };
}

export async function sendQuoteInquiry(data: QuoteInquiryPayload): Promise<{ success: boolean; error?: string }> {
  // Silent drop for honeypot bot trap
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { success: true };
  }

  // Silent drop for speed trap (< 2.5 seconds to fill whole form)
  if (data.elapsedSeconds !== undefined && data.elapsedSeconds < 2.5) {
    return { success: true };
  }

  // Spam keyword & URL check
  if (containsBotSpam([data.notes, data.organization, data.contactPerson])) {
    return { success: true }; // Silently absorb spam
  }

  // Phone validation
  const phoneValidation = validateIndianPhone(data.phone);
  if (!phoneValidation.isValid) {
    return { success: false, error: phoneValidation.message };
  }

  // Email validation
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.message };
  }

  try {
    const payload = {
      _subject: `[Bulk Quote Request] ${data.organization || data.contactPerson} (${data.reference})`,
      _template: 'table',
      _captcha: 'true',
      'Inquiry Type': 'Bulk Institutional Quote Calculation',
      'Quote Reference': data.reference,
      'Organization / Institution': data.organization,
      'Contact Person': data.contactPerson,
      'Phone / WhatsApp': data.phone,
      'Email Address': data.email || 'Not provided',
      'Location / State': data.location,
      'Required Timeline': data.timeline,
      'Order Items & Specifications': data.itemsSummary,
      'Estimated Total Value': data.estimatedTotal,
      'Additional Notes': data.notes || 'None',
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { success: false, error: errData.message || `Server returned status ${response.status}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}

export async function sendSampleKitInquiry(data: SampleKitPayload): Promise<{ success: boolean; error?: string }> {
  // Silent drop for honeypot bot trap
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { success: true };
  }

  // Silent drop for speed trap
  if (data.elapsedSeconds !== undefined && data.elapsedSeconds < 2.5) {
    return { success: true };
  }

  // Spam keyword & URL check
  if (containsBotSpam([data.requirements, data.address, data.organizationName, data.fullName])) {
    return { success: true };
  }

  // Phone validation
  const phoneValidation = validateIndianPhone(data.phone);
  if (!phoneValidation.isValid) {
    return { success: false, error: phoneValidation.message };
  }

  // Pincode validation (6 numeric digits)
  if (!/^\d{6}$/.test(data.pincode.trim())) {
    return { success: false, error: 'Please enter a valid 6-digit Indian PIN code.' };
  }

  // Email validation
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.message };
  }

  try {
    const payload = {
      _subject: `[Sample Cloth Kit Request] ${data.organizationName || data.fullName} (${data.reference})`,
      _template: 'table',
      _captcha: 'true',
      'Inquiry Type': 'Free Cloth & Shade Card Sample Kit',
      'Courier Reference': data.reference,
      'Organization / School': data.organizationName,
      'Contact Person': data.fullName,
      'Phone / WhatsApp': data.phone,
      'Email Address': data.email || 'Not provided',
      'Sector of Interest': data.sector,
      'Dispatch Address': data.address,
      'City & State': data.city,
      'Pincode': data.pincode,
      'Estimated Uniform Quantity': data.estimatedQuantity,
      'Specific Fabric / Color Requirements': data.requirements || 'Standard institutional kit',
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { success: false, error: errData.message || `Server returned status ${response.status}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}

export async function sendGeneralInquiry(data: GeneralInquiryPayload): Promise<{ success: boolean; error?: string }> {
  // Silent drop for honeypot bot trap
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { success: true };
  }

  // Silent drop for speed trap (< 2.5s)
  if (data.elapsedSeconds !== undefined && data.elapsedSeconds < 2.5) {
    return { success: true };
  }

  // Spam keyword & URL check
  if (containsBotSpam([data.requirements, data.organization, data.contactPerson, data.location])) {
    return { success: true };
  }

  // Phone validation
  const phoneValidation = validateIndianPhone(data.phone);
  if (!phoneValidation.isValid) {
    return { success: false, error: phoneValidation.message };
  }

  // Requirements character length check (at least 10 chars)
  if (data.requirements.trim().length < 10) {
    return { success: false, error: 'Please provide at least a brief description (10+ characters) of your uniform requirements.' };
  }

  // Email validation
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.message };
  }

  try {
    const payload: Record<string, string> = {
      _subject: `[Institutional Inquiry] ${data.organization || data.contactPerson} (${data.reference})`,
      _template: 'table',
      _captcha: 'true',
      'Inquiry Type': 'Direct Institutional Inquiry / RFQ',
      'Inquiry Reference': data.reference,
      'Organization / School': data.organization,
      'Contact Person': data.contactPerson + (data.role ? ` (${data.role})` : ''),
      'Phone / WhatsApp': data.phone,
      'Email Address': data.email || 'Not provided',
      'Location / State': data.location,
      'Sector of Interest': data.sector,
      'Estimated Quantity': data.approxQuantity || 'Not specified',
      'Uniform Requirements / Query': data.requirements,
      'Delivery Timeline': data.timeline,
      'Attached Calculator Estimate': data.attachedQuote 
        ? `${data.attachedQuote.totalGarments} items | Total: ${data.attachedQuote.estimatedTotal}\n\n${data.attachedQuote.itemsSummary}`
        : 'No live calculator estimate attached',
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { success: false, error: errData.message || `Server returned status ${response.status}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}
