export interface PropertyGalleryItem {
  name: string;
  url: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  address: string;
  price: number;
  rentPrice: number;
  type: string;
  size: number; // in sqm
  yard: number; // in sqm
  bedrooms: number;
  baths: number;
  mainImage: string;
  gallery: PropertyGalleryItem[];
  description: string;
  rating: number;
}

export interface FilterState {
  location: string;
  propertyType: string;
  maxPrice: number;
  checkIn?: string;
  checkOut?: string;
  offerType: 'Buy' | 'Rent';
}

export interface Message {
  id: string;
  sender: 'user' | 'aura';
  text: string;
  timestamp: Date;
  action?: {
    type: 'FILTER_CHANGE';
    payload: Partial<FilterState>;
  };
}
