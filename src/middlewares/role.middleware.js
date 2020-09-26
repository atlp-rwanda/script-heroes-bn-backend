import { decode } from '../utils/jwtFunctions';
import RoleService from '../services/role.service';

class RoleMiddleware {
  static async isSuperAdmin(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ msg: 'you are not allowed' });
    const userParam = await decode(token);

    const { roleId } = userParam;
    if (roleId === null) return res.status(400).json({ msg: 'you are not allowed to perform this action.' });

    const role = await RoleService.findRoleById(roleId);

    if (role.name === 'SUPER_ADMIN') return next();
    return res.status(400).json({ msg: 'you are not allowed to perform this action.' });
  }

  static async isSuperAdminOrTravelAdmin(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ msg: 'you are not allowed' });
    const userParam = await decode(token);

    const { roleId } = userParam;
    if (roleId === null) return res.status(400).json({ msg: 'you are not allowed to perform this action.' });

    const role = await RoleService.findRoleById(roleId);

    if (role.name === 'SUPER_ADMIN' || role.name === 'TRAVEL_ADMIN') return next();
    return res.status(400).json({ msg: 'you are not allowed to perform this action.' });
  }
}
export default RoleMiddleware;
