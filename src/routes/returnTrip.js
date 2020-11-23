import { Router } from 'express';
import ReturnTrip from '../controllers/returnTrip';
import asynchandler from '../middlewares/asynchandler';
import AuthMiddleware from '../middlewares/auth.middleware';
import { validateReturnTrip } from '../middlewares/validations/returnTripValidations';
import TripsMiddleware from '../middlewares/trips';

const router = Router();
const returnTrip = new ReturnTrip();

router.get('/return-trip', AuthMiddleware.checkToken, returnTrip.getAll);
router.post(
  '/return-trip',
  AuthMiddleware.checkToken,
  validateReturnTrip,
  asynchandler(returnTrip.createTrip)
);
router.delete(
  '/return-trip/:id',
  AuthMiddleware.checkToken,
  TripsMiddleware.CheckOwner,
  asynchandler(returnTrip.deleteTrip)
);
router.put(
  '/return-trip/:id',
  AuthMiddleware.checkToken,
  TripsMiddleware.CheckOwner,
  asynchandler(returnTrip.updateTrip)
);

export default router;
