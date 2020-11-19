import { Router } from 'express';
import AuthMiddleware from '../../middlewares/auth.middleware';
import Middleware from '../../middlewares/request';
import asyncHandler from '../../middlewares/asynchandler';
import RequestsController from '../../controllers/requests';
const router = new Router();
router.get(
  '/',
  AuthMiddleware.checkToken,
  asyncHandler(RequestsController.getRequests)
);
router.get(
  '/:id',
  AuthMiddleware.checkToken,
  Middleware.getRequest,
  asyncHandler(RequestsController.getRequest)
);

router.patch(
  '/open/:id',
  AuthMiddleware.checkToken,
  asyncHandler(RequestsController.updateOpenRequests)
);

router.delete(
  '/:id',
  AuthMiddleware.checkToken,
  Middleware.getRequest,
  asyncHandler(RequestsController.deleteRequest)
);
export default router;
