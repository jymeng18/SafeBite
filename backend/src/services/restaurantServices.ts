import axios from 'axios';
import { config } from '../config/index.js';
import { Restaurant, OverpassResponse, OverpassElement } from '../types/index.js';
import cache from '../utils/cache.js';
import { Logger } from '../utils/logger.js';

export class RestaurantService {
  private buildOverpassQuery(lat: number, lon: number, radius:  number, dietary?:  string[]): string {
    // Base query for all food establishments
    let query = `
      [out:json][timeout:25];
      (
        node["amenity"="restaurant"](around: ${radius},${lat},${lon});
        way["amenity"="restaurant"](around:${radius},${lat},${lon});
        node["amenity"="cafe"](around:${radius},${lat},${lon});
        node["amenity"="fast_food"](around:${radius},${lat},${lon});
      );
      out body;
      >;
      out skel qt;
    `;

    return query;
  }

  private processDietaryOptions(tags: OverpassElement['tags']) {
    if (!tags) return {};

    return {
      vegetarian: tags['diet:vegetarian'] === 'yes',
      vegan: tags['diet:vegan'] === 'yes',
      gluten_free: tags['diet:gluten_free'] === 'yes',
      halal: tags['diet:halal'] === 'yes',
      kosher: tags['diet:kosher'] === 'yes',
    };
  }

  private processOverpassElement(element: OverpassElement): Restaurant | null {
    if (element.type !== 'node' || !element.lat || !element.lon || !element.tags) {
      return null;
    }

    const tags = element.tags;

    return {
      id: element.id,
      name: tags.name || 'Unnamed Restaurant',
      lat: element.lat,
      lon: element.lon,
      cuisine: tags.cuisine || null,
      address: {
        street: tags['addr:street'] || null,
        housenumber: tags['addr:housenumber'] || null,
        city:  tags['addr:city'] || null,
        postcode: tags['addr:postcode'] || null,
      },
      contact: {
        phone: tags. phone || tags['contact:phone'] || null,
        website: tags. website || tags['contact:website'] || null,
        email: tags['contact:email'] || null,
      },
      opening_hours:  tags.opening_hours || null,
      rating: null,
      dietary_options: this.processDietaryOptions(tags),
    };
  }

  async searchRestaurants(
    lat: number,
    lon: number,
    radius: number = 1500,
    dietary?:  string[]
  ): Promise<{ data: Restaurant[]; source: 'cache' | 'api' }> {
    const cacheKey = `restaurants_${lat}_${lon}_${radius}_${dietary?. join(',') || 'all'}`;

    if (cache.has(cacheKey)) {
      Logger.info(`Cache hit for: ${cacheKey}`);
      const cachedData = cache.get<Restaurant[]>(cacheKey);
      return { data: cachedData || [], source: 'cache' };
    }

    Logger.info(`Fetching restaurants from API for lat:  ${lat}, lon: ${lon}, radius: ${radius}`);

    try {
      const query = this.buildOverpassQuery(lat, lon, radius, dietary);
      const response = await axios.post<OverpassResponse>(
        config.api.overpassUrl,
        `data=${encodeURIComponent(query)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 30000,
        }
      );

      let restaurants = response.data.elements
        .map(element => this. processOverpassElement(element))
        .filter((restaurant): restaurant is Restaurant => restaurant !== null);

      // Filter by dietary requirements if specified
      if (dietary && dietary.length > 0) {
        restaurants = restaurants.filter(restaurant => {
          if (! restaurant.dietary_options) return false;
          return dietary.some(diet => {
            const key = diet as keyof typeof restaurant.dietary_options;
            return restaurant.dietary_options![key] === true;
          });
        });
      }

      cache.set(cacheKey, restaurants);
      Logger.info(`Found ${restaurants.length} restaurants`);

      return { data: restaurants, source: 'api' };
    } catch (error) {
      Logger.error('Error fetching restaurants from Overpass API', error);
      throw new Error('Failed to fetch restaurants');
    }
  }
}

export default new RestaurantService();