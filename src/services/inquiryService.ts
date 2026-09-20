/**
 * Direct Email Inquiry Service for Indrakamal Uniforms
 * Transmits inquiries securely to info@indrakamal.in
 */

const RECIPIENT_EMAIL = 'info@indrakamal.in';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

export interface QuoteInquiryPayload {
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

export interface SampleKitPayload {
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

export async function sendQuoteInquiry(data: QuoteInquiryPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      _subject: `[Bulk Quote Request] ${data.organization || data.contactPerson} (${data.reference})`,
      _template: 'table',
      _captcha: 'false',
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
  try {
    const payload = {
      _subject: `[Sample Cloth Kit Request] ${data.organizationName || data.fullName} (${data.reference})`,
      _template: 'table',
      _captcha: 'false',
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
