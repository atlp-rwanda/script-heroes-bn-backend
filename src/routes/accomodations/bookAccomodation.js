import { Router } from 'express';
import asyncHandler from '../../middlewares/asynchandler';
import bookAccomodationController from '../../controllers/bookAccomodation'
import authMiddleware from '../../middlewares/auth.middleware';
import bookAccomodationValidation from '../../middlewares/validations/bookAccomodation';


const bookAccomodationRoute = new Router()

bookAccomodationRoute.post('/',
    authMiddleware.checkToken,
    bookAccomodationValidation,
    asyncHandler(bookAccomodationController.bookAccomodation))

export default bookAccomodationRoute
