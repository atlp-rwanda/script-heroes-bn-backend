import { config } from 'dotenv';
import UserController from '../controllers/emailAuth';
import RoleService from '../services/role.service';

import { User } from './models';

config();

const { hashPassword } = UserController;

async function createAdminUser() {
  const roleName = 'SUPER_ADMIN';

  const role = await RoleService.findRoleByName(roleName);
  if (!role) {
    console.log('Create SUPER_ADMIN role first. Hint: `npm run role:create`. ');
    return;
  }
  const passwordHashed = await hashPassword(process.env.SUPER_ADMIN_PASSWORD);
  const superAdmin = {
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@example.com',
    phoneNumber: '0780000084',
    isVerified: true,
    roleId: role.id,
    password: passwordHashed,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await User.create(superAdmin);
  console.log('Super admin user has been created.');
}
createAdminUser();
