import { Router } from 'express';
import Trips from '../controllers/trips';
import asynchandler from '../middlewares/asynchandler';
import AuthMiddleware from '../middlewares/auth.middleware';
import TripsMiddleware from '../middlewares/trips';

const router = Router();

router.get('/', AuthMiddleware.checkToken, asynchandler(Trips.getTrips));
router.get(
  '/:id',
  AuthMiddleware.checkToken,
  TripsMiddleware.CheckOwner,
  asynchandler(Trips.getTrip)
);
export default router;
