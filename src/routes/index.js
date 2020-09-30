import express from 'express';
import users from './auth/emailAuth';

const router = express.Router();

router.use('/auth', users);

export default router;
