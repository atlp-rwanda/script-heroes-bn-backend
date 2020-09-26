import statusCodes from '../utils/statusCodes';
import customMessages from '../utils/customMessages';
import UserService from '../services/user.service';
import RoleService from '../services/role.service';

const { notExistUser, roleAssigned, existingRole, notRole, superUser } = customMessages;
const { badRequest, forbidden, ok } = statusCodes;

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
}
export default UserRoleController;
