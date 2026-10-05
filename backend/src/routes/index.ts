import { Router, Request, Response, NextFunction } from 'express';
import { appController } from '../controllers';
import { ApiError } from '../middleware/errorHandler';

const router = Router();

// --- Health / info ---
router.get('/health', appController.healthCheck);

// --- Greeting ---
router.get('/greet', appController.greet);

// --- Users ---
router.get('/users', appController.getUsers);
router.get('/users/:id', appController.getUserById);
router.post('/users', appController.createUser);

// --- Catch-all 404 for unrecognised API routes ---
router.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, 'API route not found'));
});

export default router;
