import express, { Router } from 'express';
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
      email: req.user.email,
      roleId: req.user.roleId
    });
    const savedToken = await AccessToken.create({ token });
    res.cookie('access_token', savedToken, {
      expires: new Date(Date.now() + 8 * 3600000) // Cookie will be removed after 8 hours
    });
    res.redirect('/');
  }
);

export default googleRouter;
