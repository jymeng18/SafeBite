// Interface for resturant 
export interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lon: number;
  cuisine: string | null;
  address: {
    street: string | null;
    housenumber: string | null;
    city: string | null;
    postcode: string | null;
  };
  contact: {
    phone: string | null;
    website: string | null;
    email: string | null;
  };
  opening_hours: string | null;
  rating: number | null;
  dietary_options?:  {
    vegetarian?:  boolean;
    vegan?: boolean;
    gluten_free?:  boolean;
    halal?: boolean;
    kosher?: boolean;
  };
}

export interface OverpassElement {
  type: string;
  id: number;
  lat?:  number;
  lon?: number;
  tags?: {
    name?: string;
    amenity?: string;
    cuisine?:  string;
    phone?: string;
    'contact:phone'?: string;
    website?: string;
    'contact:website'?: string;
    'contact:email'?: string;
    opening_hours?: string;
    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:city'?:  string;
    'addr:postcode'?: string;
    'diet:vegetarian'?: string;
    'diet:vegan'?: string;
    'diet:gluten_free'?: string;
    'diet:halal'?: string;
    'diet:kosher'?: string;
  };
}

export interface OverpassResponse {
  elements: OverpassElement[];
}

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
  address?:  {
    city?:  string;
    country?: string;
    state?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  source?:  'cache' | 'api';
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchQuery {
  lat:  number;
  lon: number;
  radius?: number;
  dietary?:  string[];
}
