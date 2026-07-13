export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  lodging: string;
  description: string;
  activities: string[];
}

export interface SafariPackage {
  id: string;
  title: string;
  tagline: string;
  durationDays: number;
  featuredImage: string;
  gallery: string[];
  destinations: string[];
  lodges: string[];
  priceEstUsd: number;
  maxGroupSize: number;
  highlights: string[];
  experienceType: 'Sky Safari' | 'Bespoke Private' | 'Small Group Journey' | 'Family Expedition';
  itinerary: ItineraryDay[];
}

export interface AdvisorReview {
  id: string;
  clientName: string;
  residence: string;
  quote: string;
  rating: number;
  safariTaken: string;
  image: string;
}

export interface CustomizedSafariInquiry {
  destinations: string[];
  travelers: number;
  pace: 'Leisurely & Relaxed' | 'Balanced Explorer' | 'Active & Adventure-Dense';
  durationDays: number;
  monthOfTravel: string;
  lodgingStyle: 'Ultra-Luxury Lodges' | 'Tented Elite Wilderness' | 'Classic Luxury Blend';
  specialInterests: string[];
  customWishesByGuest: string;
}

export interface NatureMasterpiece {
  id: string;
  title: string;
  category: 'Big Cats' | 'Giants of the Soil' | 'Avian Skies' | 'Rift & Rivers' | 'Vistas & Horizons';
  location: string;
  imageUrl: string;
  description: string;
  photographer: string;
  aperture: string;
  dateTaken: string;
}
