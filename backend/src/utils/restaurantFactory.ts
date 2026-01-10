import { OverpassElement, Restaurant } from '../types/index.js';

const PROBABILITIES = {
  vegetarian: 0.35,
  vegan: 0.18,
  gluten_free: 0.22,
  halal: 0.10,
  kosher: 0.05,
} as const;

function randomBoolean(probability: number): boolean {
  return Math.random() < probability;
}

function resolveDietValue(tags: OverpassElement['tags'] | undefined, key: keyof typeof PROBABILITIES): boolean {
  const tagKey = `diet:${key}` as const;
  if (tags && tagKey in tags) {
    const value = tags[tagKey as keyof NonNullable<typeof tags>];
    if (value === 'yes') return true;
    if (value === 'no') return false;
  }
  return randomBoolean(PROBABILITIES[key]);
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
