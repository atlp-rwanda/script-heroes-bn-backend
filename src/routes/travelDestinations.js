import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import TravelDestination from '../controllers/travelDestination';
import asynchandler from '../middlewares/asynchandler';

const router = new Router();
const travelDestination = new TravelDestination();

router.get(
  '/destinations',
  AuthMiddleware.checkToken,
  asynchandler(travelDestination.getAll)
);

export default router;
