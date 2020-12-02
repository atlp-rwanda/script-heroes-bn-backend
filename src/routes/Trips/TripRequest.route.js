import { Router } from 'express';
import tripController from '../../controllers/tripBooking.controller';
import asyncHandler from '../../middlewares/asynchandler';
import TripValidations from '../../middlewares/validations/tripValidations';
import authMiddleware from '../../middlewares/auth.middleware';
import TripsMiddleware from '../../middlewares/trips';

const tripRouter = new Router();

tripRouter
  .post(
    '/oneway',
    authMiddleware.checkToken,
    TripValidations.oneway,
    asyncHandler(tripController.onewayTrip)
  )
  .get(
    '/oneway',
    authMiddleware.checkToken,
    asyncHandler(tripController.getTrips)
  )
  .delete(
    '/oneway/:id',
    authMiddleware.checkToken,
    TripsMiddleware.CheckOwner,
    asyncHandler(tripController.deleteTrip)
  )
  .patch(
    '/oneway/:id',
    authMiddleware.checkToken,
    TripsMiddleware.CheckOwner,
    TripValidations.oneway,
    asyncHandler(tripController.updateTrip)
  )
  .get(
    '/oneway/:id',
    authMiddleware.checkToken,
    TripsMiddleware.CheckOwner,
    asyncHandler(tripController.getTrip)
  );
export default tripRouter;
