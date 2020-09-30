import { Router } from 'express';
import UserController from '../../controllers/emailAuth';
import asyncHandler from '../../middlewares/asynchandler';
import {
  signupValidations,
  loginValidation
} from '../../middlewares/validations/userValidation';

const userRouter = new Router();

userRouter
  .post('/signup', signupValidations, asyncHandler(UserController.signupUser))
  .post('/login', loginValidation, asyncHandler(UserController.userLogin));

export default userRouter;
