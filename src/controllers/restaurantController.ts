import { Request, Response } from 'express';
import restaurantService from '../services/restaurantServices.js';
import { ApiResponse, Restaurant } from '../type/index.js';
import { AppError } from '../middleware/errorHandler.js';

export class RestaurantController {
  async getRestaurants(req: Request, res: Response): Promise<void> {
    const { lat, lon, radius, dietary } = req.query;

    if (!lat || !lon) {
      throw new AppError('Latitude and longitude are required', 400);
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lon as string);
    const searchRadius = radius ? parseInt(radius as string, 10) : 1500;
    const dietaryOptions = dietary ? (dietary as string).split(',') : undefined;

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new AppError('Invalid latitude or longitude', 400);
    }

    if (latitude < -90 || latitude > 90) {
      throw new AppError('Latitude must be between -90 and 90', 400);
    }

    if (longitude < -180 || longitude > 180) {
      throw new AppError('Longitude must be between -180 and 180', 400);
    }

    if (searchRadius < 100 || searchRadius > 5000) {
      throw new AppError('Radius must be between 100 and 5000 meters', 400);
    }

    const result = await restaurantService.searchRestaurants(
      latitude,
      longitude,
      searchRadius,
      dietaryOptions
    );

    const response: ApiResponse<Restaurant[]> = {
      success: true,
      source: result.source,
      data: result.data,
      message: `Found ${result.data.length} restaurants`,
    };

    res.json(response);
  }
}

export default new RestaurantController();
