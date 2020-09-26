import { UserRole } from '../database/models';
import statusCodes from '../utils/statusCodes';
import customMessages from '../utils/customMessages';

const { serverError, roleCreated } = customMessages;

const { ok } = statusCodes;

class RoleRegisterController {
  static async create(req, res) {
    const role = await UserRole.create({ name: req.body.name, description: req.body.description });
    if (role) return res.status(ok).json({ role, msg: roleCreated });
    return res.status(serverError).json({ msg: 'Server error' });
  }
}

export default RoleRegisterController;
