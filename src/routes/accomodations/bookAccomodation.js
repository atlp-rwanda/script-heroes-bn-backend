import { Router } from 'express';
import asyncHandler from '../../middlewares/asynchandler';
import bookAccomodationController from '../../controllers/bookAccomodation';
import authMiddleware from '../../middlewares/auth.middleware';
import bookAccomodationValidation from '../../middlewares/validations/bookAccomodation';

const bookAccomodationRoute = new Router();

bookAccomodationRoute.post('/',
  authMiddleware.checkToken,
  bookAccomodationValidation,
  asyncHandler(bookAccomodationController.bookAccomodation));
bookAccomodationRoute.get('/',
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  asyncHandler(bookAccomodationController.getBookings));
bookAccomodationRoute.get('/:id',
  authMiddleware.checkToken,
  asyncHandler(bookAccomodationController.getSingleBooking));
bookAccomodationRoute.delete('/:id',
  authMiddleware.checkToken,
  asyncHandler(bookAccomodationController.deleteBooking));
bookAccomodationRoute.patch('/:id',
  authMiddleware.checkToken,
  asyncHandler(bookAccomodationController.updateBooking));
bookAccomodationRoute.delete('/',
  authMiddleware.checkToken,
  authMiddleware.checkAdmin,
  asyncHandler(bookAccomodationController.deleteAllBookings));

export default bookAccomodationRoute;
