import { Router } from 'express';
import commentController from '../../controllers/comment';
import asynchandler from '../../middlewares/asynchandler';
import AuthMiddleware from '../../middlewares/auth.middleware';
import commentsValidation from '../../middlewares/validations/comments';

const commentRouter = new Router();

commentRouter
  .post(
    '/request/:requestId/comments',
    AuthMiddleware.checkToken,
    commentsValidation,
    asynchandler(commentController.comment)
  )
  .get(
    '/request/:requestId/comments/:id',
    AuthMiddleware.checkToken,
    asynchandler(commentController.getOneComment)
  )
  .get(
    '/request/:requestId/comments',
    AuthMiddleware.checkToken,
    asynchandler(commentController.getAllComments)
  )
  .delete(
    '/request/:requestId/comments/:id',
    AuthMiddleware.checkToken,
    asynchandler(commentController.deleteComment)
  )
  .put(
    '/request/:requestId/comments/:id',
    AuthMiddleware.checkToken,
    commentsValidation,
    asynchandler(commentController.editComment)
  );

export default commentRouter;
