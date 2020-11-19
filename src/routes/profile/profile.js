import { Router } from 'express';
import ProfileController from '../../controllers/profile';
import asyncHandler from '../../middlewares/asynchandler';
import {
  completeprofileValidation,
  updateprofileValidation
} from '../../middlewares/validations/profile';
import AuthMiddleware from '../../middlewares/auth.middleware';

const profileRouter = new Router();

profileRouter
  .put(
    '/complete',
    AuthMiddleware.checkToken,
    completeprofileValidation,
    asyncHandler(ProfileController.completeProfile)
  )
  .put(
    '/update',
    AuthMiddleware.checkToken,
    updateprofileValidation,
    asyncHandler(ProfileController.updateProfile)
  )
  .get(
    '/',
    AuthMiddleware.checkToken,
    asyncHandler(ProfileController.displayProfile)
  )
  .get(
    '/managers',
    AuthMiddleware.checkToken,
    asyncHandler(ProfileController.getManagers)
  );

export default profileRouter;
