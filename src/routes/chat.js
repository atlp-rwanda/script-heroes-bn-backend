import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import asyncHandler from '../middlewares/asynchandler';
import messageValidation from '../middlewares/validations/chatMessage';
import Chat from '../controllers/chat';

const router = new Router();

router.get('/', AuthMiddleware.checkToken, asyncHandler(Chat.pastMessages));
router.post(
  '/',
  AuthMiddleware.checkToken,
  messageValidation,
  asyncHandler(Chat.sendMessage)
);

export default router;
