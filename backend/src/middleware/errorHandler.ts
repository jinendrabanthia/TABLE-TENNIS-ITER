import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error | ApiError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    if (!err.isOperational) {
      logger.error(`Unexpected error: ${err.message}`, err.stack);
    } else {
      logger.warn(`Operational error: ${err.message}`);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.isOperational ? {} : { stack: err.stack }),
    });
    return;
  }

  // Unknown error — log it and respond generically
  logger.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
