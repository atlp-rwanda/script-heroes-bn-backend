import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import asyncHandler from '../middlewares/asynchandler';
import CommentsController from '../controllers/comment';

const router = new Router();

router.delete(
  '/:id',
  AuthMiddleware.checkToken,
  asyncHandler(CommentsController.deleteComment)
);

export default router;
