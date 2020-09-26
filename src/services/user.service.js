import { User } from '../database/models';

class UserService {
  static async findUserByEmail({ email }) {
    const currentUser = await User.findOne({ where: { email } });
    return currentUser;
  }

  static async updateUserByRole(roleId, email) {
    const updatedUser = await User.update({ roleId }, { where: { email } });
    if (updatedUser) {
      return updatedUser;
    }
  }
}

export default UserService;
