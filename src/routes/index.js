import express from 'express';
import users from './auth/auth';
import profile from './profile/profile';
import accomodation from './accomodations/accomodation';
import trips from './requests';
import location from './locations';
import asyncHandler from '../middlewares/asynchandler';
import RequestsController from '../controllers/requests';
import passwordRouter from './resetPassword';

const router = express.Router();

router.use('/auth', users);
router.use('/accommodations', accomodation);
router.use('/trips', trips);
router.use('/profile', profile);
router.use('/locations', location);
router.get('/request-types', asyncHandler(RequestsController.getRequestTypes));
router.use('/', passwordRouter);

export default router;
