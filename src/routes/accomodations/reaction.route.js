import {Router} from 'express';
import reactionController from '../../controllers/reactions.controller';
import asyncHandler from '../../middlewares/asynchandler';
import TripValidations from '../../middlewares/validations/tripValidations';
import authMiddleware from  '../../middlewares/auth.middleware';

const reactionRouter = new Router();

reactionRouter
.post('/like',authMiddleware.checkToken, asyncHandler(reactionController.likes))
.post('/unlike',authMiddleware.checkToken, asyncHandler(reactionController.unlike))
export default reactionRouter;
