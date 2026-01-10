import { OverpassElement, Restaurant } from '../types/index.js';

const DIETARY_PROBABILITIES = {
  vegetarian: 0.35,
  vegan: 0.18,
  gluten_free: 0.22,
  halal: 0.10,
  kosher: 0.05,
} as const;

// Probability that a restaurant's food contains each allergen
// Higher probability = more likely to contain allergen
const ALLERGEN_PROBABILITIES = {
  peanuts: 0.25,
  tree_nuts: 0.30,
  dairy: 0.70,
  eggs: 0.60,
  wheat: 0.75,
  soy: 0.40,
  fish: 0.20,
  shellfish: 0.15,
  sesame: 0.25,
} as const;

function randomBoolean(probability: number): boolean {
  return Math.random() < probability;
}

function resolveDietValue(tags: OverpassElement['tags'] | undefined, key: keyof typeof DIETARY_PROBABILITIES): boolean {
  const tagKey = `diet:${key}` as const;
  if (tags && tagKey in tags) {
    const value = tags[tagKey as keyof NonNullable<typeof tags>];
    if (value === 'yes') return true;
    if (value === 'no') return false;
  }
  return randomBoolean(DIETARY_PROBABILITIES[key]);
}

export function createDietaryOptions(tags?: OverpassElement['tags']): Restaurant['dietary_options'] {
  return {
    vegetarian: resolveDietValue(tags, 'vegetarian'),
    vegan: resolveDietValue(tags, 'vegan'),
    gluten_free: resolveDietValue(tags, 'gluten_free'),
    halal: resolveDietValue(tags, 'halal'),
    kosher: resolveDietValue(tags, 'kosher'),
  };
}

export function createAllergensPresent(): Restaurant['allergens_present'] {
  return {
    peanuts: randomBoolean(ALLERGEN_PROBABILITIES.peanuts),
    tree_nuts: randomBoolean(ALLERGEN_PROBABILITIES.tree_nuts),
    dairy: randomBoolean(ALLERGEN_PROBABILITIES.dairy),
    eggs: randomBoolean(ALLERGEN_PROBABILITIES.eggs),
    wheat: randomBoolean(ALLERGEN_PROBABILITIES.wheat),
    soy: randomBoolean(ALLERGEN_PROBABILITIES.soy),
    fish: randomBoolean(ALLERGEN_PROBABILITIES.fish),
    shellfish: randomBoolean(ALLERGEN_PROBABILITIES.shellfish),
    sesame: randomBoolean(ALLERGEN_PROBABILITIES.sesame),
  };
}
