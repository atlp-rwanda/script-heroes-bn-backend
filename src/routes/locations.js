import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import asyncHandler from '../middlewares/asynchandler';
import LocationController from '../controllers/locations';
import validationMiddleware from '../middlewares/validations/location';
import Middleware from '../middlewares/location';

const router = new Router();

router.get('/', asyncHandler(LocationController.getLocations));
router.get(
  '/:id',
  Middleware.getLocation,
  asyncHandler(LocationController.getLocation)
);

router.post(
  '/',
  AuthMiddleware.checkToken,
  validationMiddleware,
  asyncHandler(LocationController.addLocation)
);
router.put(
  '/:id',
  Middleware.getLocation,
  AuthMiddleware.checkToken,
  validationMiddleware,
  asyncHandler(LocationController.updateLocation)
);
router.delete(
  '/:id',
  Middleware.getLocation,
  AuthMiddleware.checkToken,
  asyncHandler(LocationController.deleteLocation)
);

export default router;
