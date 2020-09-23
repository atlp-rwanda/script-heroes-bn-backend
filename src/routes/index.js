import express from 'express';
import users from './auth/auth';

const router = express.Router();

router.use('/auth', users);

export default router;
