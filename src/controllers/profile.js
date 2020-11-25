import db from '../database/models/index';
import { User, UserRole } from '../database/models';
import { decode } from '../utils/jwtFunctions';
import RoleService from '../services/role.service';

class ProfileController {
  static async completeProfile(req, res) {
    const userFound = await User.findOne({
      where: { email: req.user.email }
    });

    if (
      userFound &&
      userFound.gender != null &&
      userFound.birthdate != null &&
      userFound.language != null &&
      userFound.currency != null &&
      userFound.country != null &&
      userFound.department != null &&
      userFound.linemanager != null
    ) {
      return res
        .status(400)
        .json({ error: res.__('Profile is already complete') });
    }
    const completedProfile = await userFound.update(req.body);

    return res.status(201).json({
      msg: res.__('Profile completed succesfuly'),
      profile: completedProfile
    });
  }

  static async displayProfile(req, res) {
    const userFound = await User.findOne({
      where: { email: req.user.email }
    });
    const linemanagerId = userFound.linemanager;
    const linemanager = await User.findByPk(linemanagerId);

    let firstName = '';
    let lastName = '';

    if (linemanager) {
      firstName = linemanager.firstName;
      lastName = linemanager.lastName;
    }

    if (userFound) {
      res.status(200).json({
        profile: {
          id: userFound.id,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email,
          isVerified: true,
          phoneNumber: userFound.phoneNumber,
          password: userFound.password,
          gender: userFound.gender,
          birthdate: userFound.birthdate,
          language: userFound.language,
          currency: userFound.currency,
          country: userFound.country,
          department: userFound.department,
          linemanager: `${firstName} ${lastName}`,
          linemanagerId: userFound.linemanager,
          roleId: userFound.roleId,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt
        }
      });
    }
  }

  static async updateProfile(req, res) {
    const userFound = await User.findOne({
      where: { email: req.user.email }
    });
    if (userFound) {
      const updatedProfile = await userFound.update(req.body);
      return res.status(201).json({
        msg: res.__('Profile updated succesfuly'),
        profile: updatedProfile
      });
    }
  }

  static async getManagers(req, res) {
    const role = await UserRole.findOne({ where: { name: 'MANAGER' } });
    if (!role) {
      return res.status(404).json({ message: res.__("Role does't exist") });
    }
    const Managers = await User.findAll({ where: { roleId: role.id } });
    if (!Managers) {
      return res.status(404).json({ message: res.__('No managers found') });
    }
    return res
      .status(200)
      .json({ message: res.__('Managers retrieved successfully'), Managers });
  }
}
export default ProfileController;
