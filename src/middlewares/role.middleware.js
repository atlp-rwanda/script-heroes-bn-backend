import { decode } from '../utils/jwtFunctions';
import { UserRole } from '../database/models';
import RoleService from '../services/role.service';

class RoleMiddleware {
  static async isSuperAdmin(req, res, next) {
    const { roleId } = req.user;

    if (roleId === null) {
      return res
        .status(400)
        .json({ msg: 'you are not allowed to perform this action.' });
    }

    const role = await RoleService.findRoleById(roleId);

    if (role.name === 'SUPER_ADMIN') return next();
    return res
      .status(400)
      .json({ msg: 'you are not allowed to perform this action.' });
  }

  static async oneRole(req, res, next) {
    const { id } = req.params;
    const role = await UserRole.findOne(
      { where: { id } },
      {
        attributes: ['id', 'name', 'description']
      }
    );

    if (!role) {
      return res.status(404).json({
        error: res.__('Role not found')
      });
    }

    req.role = role;
    next();
  }
}
export default RoleMiddleware;
