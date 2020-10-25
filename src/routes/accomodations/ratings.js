import { Router } from 'express';
import asyncHandler from '../../middlewares/asynchandler';
import ratingsController from '../../controllers/ratings';
import authMiddleware from '../../middlewares/auth.middleware';
import { updateRating, createRating } from '../../middlewares/validations/ratings';

const ratingsRoute = new Router();

ratingsRoute.get('/',
  authMiddleware.checkToken,
  asyncHandler(ratingsController.getRatings));

ratingsRoute.get('/:id',
  authMiddleware.checkToken,
  asyncHandler(ratingsController.getSingleRating));

ratingsRoute.get('/accommodation/:id',
  authMiddleware.checkToken,
  asyncHandler(ratingsController.getRatingsByAccomodation));

ratingsRoute.post('/',
  authMiddleware.checkToken,
  createRating,
  asyncHandler(ratingsController.addRating));

ratingsRoute.patch('/:id',
  authMiddleware.checkToken,
  updateRating,
  asyncHandler(ratingsController.updateRating));

ratingsRoute.delete('/:id',
  authMiddleware.checkToken,
  asyncHandler(ratingsController.deleteRating));

export default ratingsRoute;
