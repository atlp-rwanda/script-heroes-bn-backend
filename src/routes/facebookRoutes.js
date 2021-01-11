import express from 'express';
import cookieParser from 'cookie-parser';
import faceConfig from '../middlewares/facebookSign';
import { encode } from '../utils/jwtFunctions';
import { AccessToken } from '../database/models';

const facebookRoute = express.Router();

facebookRoute.use(faceConfig.initialize());
facebookRoute.use(cookieParser());

facebookRoute.get('/users/auth/facebook', faceConfig.authenticate('facebook'));

facebookRoute.get(
  '/users/auth/facebook/callback',
  faceConfig.authenticate('facebook', { scope: ['public_profile', 'email'] }),
  async (req, res) => {
    const token = encode({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      roleId: req.user.roleId
    });
    const savedToken = await AccessToken.create({ token });
    res.cookie('token', savedToken);
    res.redirect(process.env.FRONTEND_URL);
  }
);
export default facebookRoute;
