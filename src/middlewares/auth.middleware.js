import { decode } from '../utils/jwtFunctions';
import { User, AccessToken, UserRole } from '../database/models';
import RoleService from '../services/role.service';

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
  static async checkManager(req, res, next) {
    const token = req.headers['x-auth-token'];
    const userParam = await decode(token);

    const { roleId } = userParam;
    if (roleId === null)
      return res.status(401).json({ msg: res.__('Unauthorized request') });

    const role = await RoleService.findRoleById(roleId);

    if (role.name === 'MANAGER') return next();
    return res.status(401).json({ msg: res.__('Unauthorized request') });
  }
}

export default AuthMiddleware;
