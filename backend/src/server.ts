import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import { config } from './config/index.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { Logger } from './utils/logger.js';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors({
      origin: config.corsOrigin,
      credentials: true,
    }));
    this.app.use(compression());

    if (config.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(rateLimiter);
  }

  private setupRoutes(): void {
    this.app. use('/api', routes);

    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'SafeBite API - Find restaurants matching your dietary needs',
        version: '1.0.0',
        endpoints: {
          restaurants: '/api/restaurants? lat={lat}&lon={lon}&radius={radius}&dietary={dietary}',
          geocode: '/api/geocode? query={location}',
          reverseGeocode: '/api/reverse-geocode?lat={lat}&lon={lon}',
          health: '/api/health',
        },
        dietary_options: ['vegetarian', 'vegan', 'gluten_free', 'halal', 'kosher'],
      });
    });

    
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
      });
    });
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(config.port, () => {
      Logger.info(` SafeBite server running on port ${config.port}`);
      Logger.info(` Environment: ${config.nodeEnv}`);
      Logger.info(` CORS enabled for: ${config. corsOrigin}`);
    });
  }
}

const server = new Server();
server.start();

process.on('unhandledRejection', (reason: Error) => {
  Logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error:  Error) => {
  Logger.error('Uncaught Exception:', error);
  process.exit(1);
});