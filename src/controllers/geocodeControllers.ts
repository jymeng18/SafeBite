import { Request, Response } from 'express';
import geocodeService from '../services/geocodeService.js';
import { ApiResponse, GeocodingResult } from '../types/index.js';
import { AppError } from '../middleware/errorHandler.js';

export class GeocodeController {
  async searchLocation(req: Request, res: Response): Promise<void> {
    const { query } = req.query;

    if (! query || typeof query !== 'string') {
      throw new AppError('Search query is required', 400);
    }

    if (query.trim().length < 2) {
      throw new AppError('Search query must be at least 2 characters', 400);
    }

    const result = await geocodeService.searchLocation(query);

    const response: ApiResponse<GeocodingResult[]> = {
      success: true,
      source: result.source,
      data: result.data,
      message: `Found ${result.data.length} locations`,
    };

    res.json(response);
  }

  async reverseGeocode(req: Request, res: Response): Promise<void> {
    const { lat, lon } = req. query;

    if (!lat || !lon) {
      throw new AppError('Latitude and longitude are required', 400);
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lon as string);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new AppError('Invalid latitude or longitude', 400);
    }

    const result = await geocodeService.reverseGeocode(latitude, longitude);

    if (!result) {
      throw new AppError('Location not found', 404);
    }

    const response: ApiResponse<GeocodingResult> = {
      success: true,
      data: result,
    };

    res.json(response);
  }
}

export default new GeocodeController();
