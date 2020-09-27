import express from 'express';

import asynchandler from '../middlewares/asynchandler';

import signupController from '../controllers/signup';

const user = new signupController();

const router = express.Router();

router.post('/signup', asynchandler(user.signupUser));

export default router;
