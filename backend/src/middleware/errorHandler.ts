import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger.js';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    Logger.error(`AppError: ${err.message}`);
    res.status(err. statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  Logger.error('Unexpected Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};