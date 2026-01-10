import axios from 'axios';
import { config } from '../config/index.js';
import { GeocodingResult } from '../type/index.js';
import cache from '../utils/cache.js';
import { Logger } from '../utils/logger.js';

export class GeocodeService {
  async searchLocation(query: string): Promise<{ data: GeocodingResult[]; source: 'cache' | 'api' }> {
    const cacheKey = `geocode_${query. toLowerCase().trim()}`;

    if (cache.has(cacheKey)) {
      Logger.info(`Cache hit for geocode: ${query}`);
      const cachedData = cache.get<GeocodingResult[]>(cacheKey);
      return { data: cachedData || [], source: 'cache' };
    }

    Logger.info(`Geocoding location: ${query}`);

    try {
      const response = await axios. get<GeocodingResult[]>(
        `${config.api.nominatimUrl}/search`,
        {
          params: {
            format: 'json',
            q: query,
            limit: 5,
          },
          headers: {
            'User-Agent': config.api.userAgent,
          },
          timeout: 10000,
        }
      );

      cache.set(cacheKey, response.data);
      Logger.info(`Geocoded ${response.data.length} results for: ${query}`);

      return { data: response.data, source: 'api' };
    } catch (error) {
      Logger.error('Error geocoding location', error);
      throw new Error('Failed to geocode location');
    }
  }

  async reverseGeocode(lat: number, lon: number): Promise<GeocodingResult | null> {
    const cacheKey = `reverse_${lat}_${lon}`;

    if (cache.has(cacheKey)) {
      Logger.info(`Cache hit for reverse geocode: ${lat}, ${lon}`);
      return cache.get<GeocodingResult>(cacheKey) || null;
    }

    Logger.info(`Reverse geocoding:  ${lat}, ${lon}`);

    try {
      const response = await axios.get<GeocodingResult>(
        `${config.api.nominatimUrl}/reverse`,
        {
          params: {
            format: 'json',
            lat,
            lon,
          },
          headers: {
            'User-Agent': config.api.userAgent,
          },
          timeout: 10000,
        }
      );

      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      Logger.error('Error reverse geocoding', error);
      throw new Error('Failed to reverse geocode');
    }
  }
}

export default new GeocodeService();