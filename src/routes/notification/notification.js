import { Router } from 'express';
import notification from '../../controllers/notifications';
import asyncHandler from '../../middlewares/asynchandler';
import authMiddleware from '../../middlewares/auth.middleware';

const notificationRouter = new Router();

notificationRouter
  .get(
    '/',
    authMiddleware.checkToken,
    asyncHandler(notification.getAllNotifications)
  )
  .get(
    '/count',
    authMiddleware.checkToken,
    asyncHandler(notification.countUnseenNotifications)
  )
  .get(
    '/:id',
    authMiddleware.checkToken,
    asyncHandler(notification.getSingleNotification)
  )
  .delete(
    '/:id',
    authMiddleware.checkToken,
    asyncHandler(notification.deleteNotification)
  )
  .patch('/', authMiddleware.checkToken, asyncHandler(notification.markAsRead));

export default notificationRouter;
