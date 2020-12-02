import express from 'express';
import cookieParser from 'cookie-parser';
import passConfig from '../middlewares/googleSign';
import { encode } from '../utils/jwtFunctions';
import { AccessToken } from '../database/models';

const googleRouter = express.Router();

googleRouter.use(passConfig.initialize());
googleRouter.use(cookieParser());

googleRouter.get(
  '/users/auth/google',
  passConfig.authenticate('google', { scope: ['profile', 'email'] })
);
googleRouter.get(
  '/users/auth/google/callback',
  passConfig.authenticate('google'),
  async (req, res) => {
    const token = encode({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    });
    const savedToken = await AccessToken.create({ token });
    res.cookie('token', savedToken);
    res.redirect(process.env.FRONTEND_URL);
  }
);

export default googleRouter;
