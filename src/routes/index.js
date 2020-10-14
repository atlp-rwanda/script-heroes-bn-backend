import express from 'express';
import users from './auth/auth';
import profile from './profile/profile';
import accomodation from './accomodations/accomodation';

const router = express.Router();

router.use('/auth', users);
router.use('/accommodations', accomodation);
router.use('/profile', profile);

export default router;

