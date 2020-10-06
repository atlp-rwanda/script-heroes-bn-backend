import express from 'express';
import passConfig from '../middlewares/googleSign';
import { encode } from '../utils/jwtFunctions';
import { AccessToken } from '../database/models';

const googleRouter = express.Router();
googleRouter.use(passConfig.initialize());

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
    res.send({
      message: 'Google Login Success',
      user: req.user,
      token: savedToken.token
    });
  }
);

export default googleRouter;
