// config file for the api
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600', 10),
  },
  // limit each rate 
  rateLimit: {
    windowMs: parseInt(process.env. RATE_LIMIT_WINDOW_MS || '60000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '20', 10),
  },
  // api source
  api: {
    overpassUrl: 'https://overpass-api.de/api/interpreter',
    nominatimUrl: 'https://nominatim.openstreetmap.org',
    userAgent: 'SafeBiteApp/1.0 (Dietary Restaurant Finder)',
  },
};
