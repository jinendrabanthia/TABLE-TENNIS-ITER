import express, { Application } from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { ApiError, errorHandler } from './middleware/errorHandler';
import { config } from './config';
import { logger } from './utils/logger';

export function createApp(): Application {
  const app: Application = express();

  // --- Middleware ---
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // --- Request logging (dev only) ---
  if (!config.isProduction) {
    app.use((req, _res, next) => {
      logger.debug(`${req.method} ${req.path}`);
      next();
    });
  }

  // --- Routes ---
  app.get('/', (_req, res) => {
    res.json({
      success: true,
      message: 'API is running. See /api/v1/health',
    });
  });

  app.use('/api/v1', apiRouter);

  // --- 404 handler for non-API routes ---
  app.use((_req, _res, next) => {
    next(new ApiError(404, 'Route not found'));
  });

  // --- Error handler (must be last) ---
  app.use(errorHandler);

  logger.info(`Express app initialised — NODE_ENV=${config.nodeEnv}`);
  return app;
}
