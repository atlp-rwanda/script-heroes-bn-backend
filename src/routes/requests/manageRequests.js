import { Router } from 'express';
import asyncHandler from '../../middlewares/asynchandler';
import managerequestsController from '../../controllers/manageRequests';
import authMiddleware from '../../middlewares/auth.middleware';
import managerequestsMiddleware from '../../middlewares/manageRequests';

const managerequestsRoute = new Router();

managerequestsRoute.get(
  '/',
  authMiddleware.checkToken,
  authMiddleware.checkManager,
  asyncHandler(managerequestsController.displaydirectRequests)
);
managerequestsRoute.put(
  '/:id/:decision',
  authMiddleware.checkToken,
  authMiddleware.checkManager,
  managerequestsMiddleware.makeDecision,
  asyncHandler(managerequestsController.makeDecision)
);
export default managerequestsRoute;
