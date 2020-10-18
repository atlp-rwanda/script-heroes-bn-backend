import { decode } from '../utils/jwtFunctions';
import { User, AccessToken, UserRole } from '../database/models';

class AuthMiddleware {
  static async checkToken(req, res, next) {
    const { 'x-auth-token': token } = req.headers;

    if (!token) {
      return res.status(400).json({
        message: 'Please Login'
      });
    }

    const tokenExists = await AccessToken.findOne({
      where: { token }
    });

    if (!tokenExists) {
      return res.status(400).json({
        message: res.__('Token no longer valid')
      });
    }

    try {
      const user = decode(token);
      const userExist = await User.findOne({
        where: { email: user.email }
      });

      if (!userExist) {
        return res.status(400).json({
          message: res.__('User not found')
        });
      }

      req.user = userExist;
      next();
    } catch (err) {
      return res.status(400).json({
        error: res.__(err.message)
      });
    }
  }

  static async checkAdmin(req, res, next) {
    const role = await UserRole.findOne({ where: { id: req.user.roleId } });
    if (role.name !== 'SUPER_ADMIN' && role.name !== 'TRAVEL_ADMIN') {
      return res.status(401).send({ message: res.__('Unauthorized request') });
    }
    return next();
  }
}

export default AuthMiddleware;
