export type UniformCategory = 
  | 'all' 
  | 'school' 
  | 'staff' 
  | 'corporate' 
  | 'healthcare' 
  | 'hospitality' 
  | 'linen';

export type UniformGender = 'Unisex' | 'Men' | 'Women' | 'Junior';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeMeasurement {
  size: string;
  chestInches: number;
  waistInches: number;
  lengthInches: number;
  shoulderInches: number;
}

export interface UniformItem {
  id: string;
  name: string;
  category: 'school' | 'staff' | 'corporate' | 'healthcare' | 'hospitality' | 'linen';
  subcategory: string;
  gender: UniformGender;
  description: string;
  fabricComposition: string;
  gsm: number;
  weave: string;
  keyFeatures: string[];
  colorOptions: ColorOption[];
  sizes: string[];
  sizeMeasurements?: SizeMeasurement[];
  moq: number;
  priceRangeEstimate: string;
  imageUrl: string;
  badge?: string;
  suitableFor: string;
  careInstructions: string[];
  customizationOptions: string[];
}

export interface BulkQuoteItem {
  uniformId: string;
  uniformName: string;
  category: string;
  quantity: number;
  selectedColor: string;
  selectedFabricGrade: string;
  includeEmbroidery: boolean;
  notes?: string;
}

export interface SwatchKitRequest {
  fullName: string;
  organizationName: string;
  sector: 'school' | 'staff' | 'corporate' | 'healthcare' | 'hospitality' | 'linen' | 'multiple';
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  pincodeOrZip: string;
  estimatedQuantity: string;
  specificRequirements: string;
}
