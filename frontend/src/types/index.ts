/**
 * Shared types for SafeBite frontend
 */

// Allergen keys (must match backend)
export type AllergenKey = 
  | "peanuts"
  | "tree_nuts"
  | "dairy"
  | "eggs"
  | "wheat"
  | "soy"
  | "fish"
  | "shellfish"
  | "sesame";

// Backend Restaurant type (what the API returns)
export interface ApiRestaurant {
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
  allergens_present: Record<AllergenKey, boolean>;
}

// Frontend Restaurant type (what components use)
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: number;
  rating: "pick" | "possible";
  isPartnered: boolean;
  hasAllergyExcellence: boolean;
  matchingItems: number;
  description: string;
  address: string;
  lat: number;
  lng: number;
  // Allergens present in this restaurant's food
  allergens_present: Record<AllergenKey, boolean>;
  // Additional fields from API
  contact?: {
    phone: string | null;
    website: string | null;
    email: string | null;
  };
  opening_hours?: string | null;
  dietary_options?: {
    vegetarian: boolean;
    vegan: boolean;
    gluten_free: boolean;
    halal: boolean;
    kosher: boolean;
  };
}

// Allergen definition
export interface Allergen {
  id: AllergenKey;
  label: string;
  icon: string;
}

// Distance option
export interface DistanceOption {
  value: number;
  label: string;
}

// Allergens list - IDs must match backend allergen keys exactly
export const allergens: Allergen[] = [
  { id: "peanuts", label: "Peanuts", icon: "🥜" },
  { id: "tree_nuts", label: "Tree Nuts", icon: "🌰" },
  { id: "dairy", label: "Dairy", icon: "🥛" },
  { id: "eggs", label: "Eggs", icon: "🥚" },
  { id: "wheat", label: "Wheat/Gluten", icon: "🌾" },
  { id: "soy", label: "Soy", icon: "🫘" },
  { id: "fish", label: "Fish", icon: "🐟" },
  { id: "shellfish", label: "Shellfish", icon: "🦐" },
  { id: "sesame", label: "Sesame", icon: "🌱" },
];

// Distance options
export const distances: DistanceOption[] = [
  { value: 1, label: "1 Mile" },
  { value: 5, label: "5 Miles" },
  { value: 25, label: "25 Miles" },
  { value: 50, label: "50 Miles" },
];

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

/**
 * Format address from API address object
 */
function formatAddress(address: ApiRestaurant["address"]): string {
  const parts = [];
  if (address.housenumber && address.street) {
    parts.push(`${address.housenumber} ${address.street}`);
  } else if (address.street) {
    parts.push(address.street);
  }
  if (address.city) {
    parts.push(address.city);
  }
  return parts.join(", ") || "Address not available";
}

/**
 * Determine restaurant rating based on user's allergens
 * "pick" = restaurant does NOT contain any of the user's allergens (safe!)
 * "possible" = restaurant contains at least one of the user's allergens
 */
function determineRating(
  restaurant: ApiRestaurant,
  userAllergens: AllergenKey[]
): "pick" | "possible" {
  // If user has no allergens selected, all restaurants are picks
  if (userAllergens.length === 0) {
    return "pick";
  }

  // Check if the restaurant contains ANY of the user's allergens
  const containsUserAllergen = userAllergens.some(
    (allergen) => restaurant.allergens_present[allergen] === true
  );

  // If restaurant does NOT contain user's allergens, it's a "pick"
  // If it does contain allergens, it's "possible" (might still have safe options)
  return containsUserAllergen ? "possible" : "pick";
}

/**
 * Count how many of user's allergens are NOT present (safe items)
 */
function countSafeAllergens(
  restaurant: ApiRestaurant,
  userAllergens: AllergenKey[]
): number {
  if (userAllergens.length === 0) return 0;
  return userAllergens.filter(
    (allergen) => restaurant.allergens_present[allergen] === false
  ).length;
}

/**
 * Transform API restaurant data to frontend format
 */
export function transformRestaurant(
  apiRestaurant: ApiRestaurant,
  userLat: number,
  userLon: number,
  userAllergens: AllergenKey[] = []
): Restaurant {
  const distance = calculateDistance(
    userLat,
    userLon,
    apiRestaurant.lat,
    apiRestaurant.lon
  );

  const safeCount = countSafeAllergens(apiRestaurant, userAllergens);

  return {
    id: apiRestaurant.id.toString(),
    name: apiRestaurant.name,
    cuisine: apiRestaurant.cuisine || "Restaurant",
    distance,
    rating: determineRating(apiRestaurant, userAllergens),
    isPartnered: false, // Could be determined by a partnered restaurants list
    hasAllergyExcellence: apiRestaurant.dietary_options.gluten_free || apiRestaurant.dietary_options.vegan,
    matchingItems: safeCount, // Now represents allergens that are safe
    description: `${apiRestaurant.name} is a ${apiRestaurant.cuisine || "restaurant"} located at ${formatAddress(apiRestaurant.address)}.${apiRestaurant.opening_hours ? ` Hours: ${apiRestaurant.opening_hours}` : ""}`,
    address: formatAddress(apiRestaurant.address),
    lat: apiRestaurant.lat,
    lng: apiRestaurant.lon, // Note: API uses 'lon', frontend uses 'lng'
    allergens_present: apiRestaurant.allergens_present,
    contact: apiRestaurant.contact,
    opening_hours: apiRestaurant.opening_hours,
    dietary_options: apiRestaurant.dietary_options,
  };
}

/**
 * Transform array of API restaurants to frontend format
 */
export function transformRestaurants(
  apiRestaurants: ApiRestaurant[],
  userLat: number,
  userLon: number,
  userAllergens: AllergenKey[] = []
): Restaurant[] {
  return apiRestaurants.map((r) =>
    transformRestaurant(r, userLat, userLon, userAllergens)
  );
}
