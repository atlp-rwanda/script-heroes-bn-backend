import { UserRole } from '../database/models';
import statusCodes from '../utils/statusCodes';
import customMessages from '../utils/customMessages';
import UserService from '../services/user.service';
import RoleService from '../services/role.service';

const {
  serverError,
  roleCreated,
  notExistUser,
  roleAssigned,
  notRole
} = customMessages;
const { forbidden, ok } = statusCodes;

class UserRoleController {
  static async assign(req, res) {
    const { email, userRole } = req.body;
    const role = await RoleService.findRoleByName(userRole);

    if (!role) return res.status(forbidden).json({ msg: notRole });
    const roleId = role.id;

    const userExist = await UserService.findUserByEmail({ email });
    if (!userExist) return res.status(forbidden).json({ msg: notExistUser });

    const updateRole = await UserService.updateUserByRole(roleId, email);
    if (updateRole) return res.status(ok).json({ msg: roleAssigned });
  }

  static async create(req, res) {
    const { name } = req.body;
    const isExist = await UserRole.findOne({ where: { name } });

    if (isExist) {
      return res.status(400).json({
        error: res.__('Role already exists')
      });
    }
    const role = await UserRole.create({
      name: req.body.name,
      description: req.body.description
    });
    if (role) return res.status(ok).json({ role, msg: roleCreated });
    return res.status(serverError).json({ msg: 'Server error' });
  }

  static async getRoles(req, res) {
    const roles = await UserRole.findAll({
      attributes: ['id', 'name', 'description']
    });

    return res.status(200).json({
      message: res.__('roles fetched successfully'),
      roles
    });
  }

  static async getRole(req, res) {
    const { role } = req;

    return res.status(200).json({
      message: res.__('role fetched successfully'),
      role
    });
  }

  static async updateRole(req, res) {
    const { role } = req;
    const { name, description } = req.body;

    await role.update({
      name,
      description
    });

    return res.status(200).json({
      message: res.__('role updated successfully'),
      role
    });
  }

  static async deleteRole(req, res) {
    const { id } = req.params;

    await UserRole.destroy({ where: { id } });
    return res.status(200).json({
      message: res.__('role deleted successfully')
    });
  }
}
export default UserRoleController;
