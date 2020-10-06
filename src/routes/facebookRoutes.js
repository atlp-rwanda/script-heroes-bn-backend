import express from 'express';
import { AccessToken } from '../database/models';
import faceConfig from '../middlewares/facebookSign';
import { encode } from '../utils/jwtFunctions';

const facebookRoute = express.Router();

facebookRoute.use(faceConfig.initialize());
facebookRoute.get('/users/auth/facebook', faceConfig.authenticate('facebook'));

facebookRoute.get(
  '/users/auth/facebook/callback',
  faceConfig.authenticate('facebook', { scope: ['public_profile', 'email'] }),
  async (req, res) => {
    const token = encode({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    });
    const savedToken = await AccessToken.create({ token });
    res.send({
      message: 'Facebook Login Success',
      user: req.user,
      token: savedToken.token
    });
  }
);
export default facebookRoute;
