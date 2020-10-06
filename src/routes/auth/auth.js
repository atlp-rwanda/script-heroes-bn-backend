import { Router } from 'express';
import UserController from '../../controllers/emailAuth';
import emailVerification from '../../controllers/emailVerification';
import asyncHandler from '../../middlewares/asynchandler';
import {
  signupValidations,
  loginValidation
} from '../../middlewares/validations/userValidation';
import AuthMiddleware from '../../middlewares/auth.middleware';

const userRouter = new Router();

userRouter
  .post('/signup', signupValidations, asyncHandler(UserController.signupUser))
  .post('/login', loginValidation, asyncHandler(UserController.userLogin))
  .get(
    '/logout',
    AuthMiddleware.checkToken,
    asyncHandler(UserController.userLogout)
  )
  .get('/verify/:token', asyncHandler(emailVerification));

export default userRouter;
