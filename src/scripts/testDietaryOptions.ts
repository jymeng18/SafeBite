import assert from 'node:assert/strict';
import { createDietaryOptions } from '../utils/restaurantFactory.js';
import type { OverpassElement } from '../type/index.js';

function withStubbedRandom<T>(stubValue: number, fn: () => T): T {
  const originalRandom = Math.random;
  (Math as any).random = () => stubValue;
  try {
    return fn();
  } finally {
    (Math as any).random = originalRandom;
  }
}

// Case 1: Tags explicitly set yes/no override randomness
const tags1: OverpassElement['tags'] = {
  'diet:vegetarian': 'yes',
  'diet:vegan': 'no',
  'diet:gluten_free': 'yes',
};
const opts1 = createDietaryOptions(tags1);
assert.equal(opts1.vegetarian, true);
assert.equal(opts1.vegan, false);
assert.equal(opts1.gluten_free, true);
console.log('Case 1 passed:', opts1);

// Case 2: No tags, RNG returns 0 -> all booleans true
const opts2 = withStubbedRandom(0, () => createDietaryOptions());
assert.equal(opts2.vegetarian, true);
assert.equal(opts2.vegan, true);
assert.equal(opts2.gluten_free, true);
assert.equal(opts2.halal, true);
assert.equal(opts2.kosher, true);
console.log('Case 2 passed:', opts2);

// Case 3: No tags, RNG returns 1 -> all booleans false
const opts3 = withStubbedRandom(1, () => createDietaryOptions());
assert.equal(opts3.vegetarian, false);
assert.equal(opts3.vegan, false);
assert.equal(opts3.gluten_free, false);
assert.equal(opts3.halal, false);
assert.equal(opts3.kosher, false);
console.log('Case 3 passed:', opts3);

console.log('All tests passed.');
