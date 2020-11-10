import { Router } from 'express';
import searchRequestController from '../controllers/searchRequests';
import asyncHandler from '../middlewares/asynchandler';
import authMiddleware from '../middlewares/auth.middleware';

const searchRequestRouter = new Router();

searchRequestRouter.get(
  '/allRequestsByStatus/search',
  authMiddleware.checkToken,
  asyncHandler(searchRequestController.getAllRequestsByStatus)
);

searchRequestRouter.get(
  '/getRequestById/search',
  authMiddleware.checkToken,
  asyncHandler(searchRequestController.getRequestById)
);

searchRequestRouter.get(
  '/getRequestByUser/search',
  authMiddleware.checkToken,
  asyncHandler(searchRequestController.getRequestByUser)
);
export default searchRequestRouter;
