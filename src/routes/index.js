import express from 'express';
import users from './auth/auth';
import profile from './profile/profile';
import accomodation from './accomodations/accomodation';
import trips from './requests';
import location from './locations';
import asyncHandler from '../middlewares/asynchandler';
import RequestsController from '../controllers/requests';
import passwordRouter from './resetPassword';
import trip from './returnTrip';
import bookAccomodation from './accomodations/bookAccomodation';
import onewayBooking from './Trips/TripRequest.route';
import host from './hostAccomodations';
import notificationRouter from './notification/notification';
import reaction from './accomodations/reaction.route';
import manageRequests from './requests/manageRequests';
import travelDestination from './travelDestinations';

const router = express.Router();

router.use('/auth', users);
router.use('/accommodations', accomodation);
router.use('/trips', onewayBooking);
router.use('/trips', trips);
router.use('/profile', profile);
router.use('/locations', location);
router.get('/request-types', asyncHandler(RequestsController.getRequestTypes));
router.use('/', passwordRouter);
router.use('/trip', trip);
router.use('/accommodations', accomodation);
router.use('/accomodations/book', bookAccomodation);
router.use('/host', host);
router.use('/accommodations', reaction);
router.use('/requests', manageRequests);
router.use('/notifications', notificationRouter);
router.use('/most-traveled', travelDestination);

export default router;
