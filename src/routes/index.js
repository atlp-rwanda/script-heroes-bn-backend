import express from 'express';
import users from './auth/auth';
import profile from './profile/profile';

const router = express.Router();

router.use('/auth', users);

export default router;
router.use('/profile', profile);
