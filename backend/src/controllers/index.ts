import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middleware/errorHandler';
import { ApiResponse, HealthResponse, MessageResponse, User } from '../types';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

export class AppController {
  /** Health check — useful for container orchestration. */
  public healthCheck = (
    _req: Request,
    res: Response<ApiResponse<HealthResponse>>
  ): void => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0',
      },
    });
  };

  /** Greet the caller. */
  public greet = (
    req: Request,
    res: Response<ApiResponse<MessageResponse>>
  ): void => {
    const name = req.query.name ? String(req.query.name) : 'World';
    res.status(200).json({
      success: true,
      message: `Hello, ${name}!`,
      data: { message: `Hello, ${name}!` },
    });
  };

  /** GET /api/users — list all users. */
  public getUsers = (
    _req: Request,
    res: Response<ApiResponse<User[]>>
  ): void => {
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  };

  /** GET /api/users/:id — get a single user by ID. */
  public getUserById = (
    req: Request,
    res: Response<ApiResponse<User>>,
    next: NextFunction
  ): void => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      next(new ApiError(400, 'Invalid user ID'));
      return;
    }

    const user = users.find((u) => u.id === id);
    if (!user) {
      next(new ApiError(404, `User with ID ${id} not found`));
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  };

  /** POST /api/users — create a new user. */
  public createUser = (
    req: Request<unknown, unknown, unknown>,
    res: Response<ApiResponse<User>>,
    next: NextFunction
  ): void => {
    const { name, email } = req.body as { name: string; email: string };

    if (!name || !email) {
      next(new ApiError(400, 'Name and email are required'));
      return;
    }

    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  };
}

export const appController = new AppController();
