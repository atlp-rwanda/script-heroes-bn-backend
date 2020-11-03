import { UserRole } from '../database/models';

class RoleService {
  static async findRoleByName(userRole) {
    const role = await UserRole.findOne({ where: { name: userRole } });
    if (role) return role;
  }

  static async findRoleById(roleId) {
    const roleExist = await UserRole.findOne({ where: { id: roleId } });
    if (roleExist) return roleExist;
  }
}
export default RoleService;
