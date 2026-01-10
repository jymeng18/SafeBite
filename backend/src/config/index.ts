// config file for the api
export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  cache: {
    ttl: 3600, // 1 hour
  },
  rateLimit: {
    windowMs: 60000, // 1 minute
    maxRequests: 30,
  },
  api: {
    overpassUrl: 'https://overpass-api.de/api/interpreter',
    nominatimUrl: 'https://nominatim.openstreetmap.org',
    userAgent: 'SafeBiteApp/1.0 (Dietary Restaurant Finder)',
  },
};
