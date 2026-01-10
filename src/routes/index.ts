import { Router } from 'express';
import restaurantController from '../controllers/restaurantController.js';
import geocodeController from '../controllers/geocodeControllers.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import cache from '../utils/cache.js';

const router = Router();

// Restaurant routes
router.get('/restaurants', asyncHandler(restaurantController.getRestaurants. bind(restaurantController)));

// Geocoding routes
router.get('/geocode', asyncHandler(geocodeController.searchLocation.bind(geocodeController)));
router.get('/reverse-geocode', asyncHandler(geocodeController.reverseGeocode. bind(geocodeController)));

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    cache: {
      keys: cache.getKeys().length,
      stats: cache.getStats(),
    },
  });
});

// Clear cache
router.post('/cache/clear', (req, res) => {
  cache.flush();
  res.json({
    success: true,
    message: 'Cache cleared successfully',
  });
});

export default router;