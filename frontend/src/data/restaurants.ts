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
}

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Martin's Bar-B-Q Joint",
    cuisine: "Barbeque",
    distance: 0.4,
    rating: "possible",
    isPartnered: true,
    hasAllergyExcellence: false,
    matchingItems: 21,
    description:
      "Martin's BBQ has gone to great lengths to identify options for gluten-free diets and food allergies in their dietary restriction menu. All of their BBQ is free of the top 8 allergens and gluten with one exception - the smoked sausage contains dairy.",
    address: "410 4th Ave S, Nashville, TN",
    lat: 36.158,
    lng: -86.7775,
  },
  {
    id: "2",
    name: "Villa Castrioti",
    cuisine: "Pizza, Italian",
    distance: 0.2,
    rating: "pick",
    isPartnered: true,
    hasAllergyExcellence: false,
    matchingItems: 34,
    description:
      "Villa Castrioti offers a welcoming setting where guests can enjoy the comfort of fine Italian gourmet meals, the casual delight of New York-style brick-oven pizza, or the flavor of broiled filets from the Carni selection.",
    address: "123 Broadway, Nashville, TN",
    lat: 36.1615,
    lng: -86.7742,
  },
  {
    id: "3",
    name: "The Well Coffeehouse",
    cuisine: "Breakfast & Brunch, Coffee & Tea",
    distance: 0.2,
    rating: "possible",
    isPartnered: true,
    hasAllergyExcellence: true,
    matchingItems: 46,
    description:
      "The Well goes above and beyond to serve guests with critical dietary restrictions. They have removed peanuts from their menu, have strict protocols for avoiding cross-contact, and are very transparent about process and ingredients.",
    address: "211 Broadway, Nashville, TN",
    lat: 36.1592,
    lng: -86.7755,
  },
  {
    id: "4",
    name: "Two Hands",
    cuisine: "Cafe",
    distance: 0.8,
    rating: "possible",
    isPartnered: true,
    hasAllergyExcellence: false,
    matchingItems: 28,
    description:
      "Two Hands Hospitality is a restaurant group that prioritizes culinary excellence while also accommodating allergies and special diets. The restaurant uses fresh ingredients to prepare seasonal menu items from scratch.",
    address: "456 West End Ave, Nashville, TN",
    lat: 36.1547,
    lng: -86.782,
  },
  {
    id: "5",
    name: "Jasper's",
    cuisine: "American, Cocktail Bar, Family",
    distance: 1.2,
    rating: "pick",
    isPartnered: true,
    hasAllergyExcellence: true,
    matchingItems: 52,
    description:
      "Jasper's offers an upscale casual dining experience with a focus on locally sourced ingredients. Their kitchen team is well-trained on allergen protocols and offers detailed ingredient information.",
    address: "789 12th Ave S, Nashville, TN",
    lat: 36.151,
    lng: -86.789,
  },
  {
    id: "6",
    name: "Green Table Bistro",
    cuisine: "Vegan, Vegetarian",
    distance: 0.6,
    rating: "pick",
    isPartnered: true,
    hasAllergyExcellence: true,
    matchingItems: 67,
    description:
      "A fully plant-based restaurant with a dedicated allergen-free kitchen. Perfect for those with multiple food sensitivities. Every dish is clearly labeled with allergen information.",
    address: "321 Division St, Nashville, TN",
    lat: 36.156,
    lng: -86.7805,
  },
];

export const allergens = [
  { id: "peanuts", label: "Peanuts", icon: "🥜" },
  { id: "tree-nuts", label: "Tree Nuts", icon: "🌰" },
  { id: "dairy", label: "Dairy", icon: "🥛" },
  { id: "eggs", label: "Eggs", icon: "🥚" },
  { id: "wheat", label: "Wheat/Gluten", icon: "🌾" },
  { id: "soy", label: "Soy", icon: "🫘" },
  { id: "fish", label: "Fish", icon: "🐟" },
  { id: "shellfish", label: "Shellfish", icon: "🦐" },
  { id: "sesame", label: "Sesame", icon: "🌱" },
];

export const distances = [
  { value: 1, label: "1 Mile" },
  { value: 5, label: "5 Miles" },
  { value: 25, label: "25 Miles" },
  { value: 50, label: "50 Miles" },
];
