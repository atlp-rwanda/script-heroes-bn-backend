import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import Middleware from '../middlewares/request';
import asyncHandler from '../middlewares/asynchandler';
import RequestsController from '../controllers/requests';
import TripsValidation from '../middlewares/validations/tripValidations';

const router = new Router();

router.post(
  '/multi-city',
  AuthMiddleware.checkToken,
  TripsValidation.multiCity,
  asyncHandler(RequestsController.createMultiCity)
);

export default router;
