import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import asyncHandler from '../middlewares/asynchandler';
import UsersController from '../controllers/emailAuth';
import RoleMiddleware from '../middlewares/role.middleware';

const router = new Router();

router.get(
  '/',
  AuthMiddleware.checkToken,
  RoleMiddleware.isSuperAdmin,
  asyncHandler(UsersController.getUsers)
);

export default router;
