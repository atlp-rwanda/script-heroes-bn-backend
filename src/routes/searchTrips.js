import { Router } from 'express';
import searchTripController from '../controllers/searchTrips';
import asyncHandler from '../middlewares/asynchandler';
import authMiddleware from '../middlewares/auth.middleware';

const searchRouter = new Router();

searchRouter.get(
  '/allTripsByOrigin/search',
  authMiddleware.checkToken,
  asyncHandler(searchTripController.getAllByOrigin)
);
searchRouter.get(
  '/allTripsByDest/search',
  authMiddleware.checkToken,
  asyncHandler(searchTripController.getAllByDest)
);
searchRouter.get(
  '/allTripsByOriginDest/search',
  authMiddleware.checkToken,
  asyncHandler(searchTripController.getAllByOriginDest)
);
searchRouter.get(
  '/allTripsByStartDate/search',
  authMiddleware.checkToken,
  asyncHandler(searchTripController.getAllByStartDate)
);
searchRouter.get(
  '/allTripsByEndDate/search',
  authMiddleware.checkToken,
  asyncHandler(searchTripController.getAllByEndDate)
);
export default searchRouter;
