/**
 * API Service Layer
 * Handles all communication with the SafeBite backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Types matching backend responses
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
  dietary_options: {
    vegetarian: boolean;
    vegan: boolean;
    gluten_free: boolean;
    halal: boolean;
    kosher: boolean;
  };
  allergens_present: {
    peanuts: boolean;
    tree_nuts: boolean;
    dairy: boolean;
    eggs: boolean;
    wheat: boolean;
    soy: boolean;
    fish: boolean;
    shellfish: boolean;
    sesame: boolean;
  };
}

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    country?: string;
    state?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  source?: "cache" | "api";
  data?: T;
  error?: string;
  message?: string;
}

// API Error class
export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || data.message || "An error occurred",
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error occurred"
    );
  }
}

// Restaurant API
export interface GetRestaurantsParams {
  lat: number;
  lon: number;
  radius?: number; // in meters, default 1500, max 5000
  dietary?: string[]; // e.g., ['vegetarian', 'gluten_free']
}

export async function getRestaurants(
  params: GetRestaurantsParams
): Promise<ApiResponse<Restaurant[]>> {
  const searchParams = new URLSearchParams({
    lat: params.lat.toString(),
    lon: params.lon.toString(),
  });

  if (params.radius) {
    searchParams.set("radius", params.radius.toString());
  }

  if (params.dietary && params.dietary.length > 0) {
    searchParams.set("dietary", params.dietary.join(","));
  }

  return fetchApi<ApiResponse<Restaurant[]>>(
    `/restaurants?${searchParams.toString()}`
  );
}

// Geocoding API
export async function searchLocation(
  query: string
): Promise<ApiResponse<GeocodingResult[]>> {
  const searchParams = new URLSearchParams({ q: query });
  return fetchApi<ApiResponse<GeocodingResult[]>>(
    `/geocode?${searchParams.toString()}`
  );
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<ApiResponse<GeocodingResult>> {
  const searchParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
  });
  return fetchApi<ApiResponse<GeocodingResult>>(
    `/reverse-geocode?${searchParams.toString()}`
  );
}

// Health check
export async function healthCheck(): Promise<ApiResponse<{
  status: string;
  uptime: number;
  timestamp: string;
}>> {
  return fetchApi<ApiResponse<{ status: string; uptime: number; timestamp: string }>>(
    "/health"
  );
}

// Export all API functions as a single object for convenience
export const api = {
  restaurants: {
    getAll: getRestaurants,
  },
  geocode: {
    search: searchLocation,
    reverse: reverseGeocode,
  },
  health: healthCheck,
};

export default api;
