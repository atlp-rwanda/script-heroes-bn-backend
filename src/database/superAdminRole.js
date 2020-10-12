import { UserRole } from './models';

async function createAdminRole() {
  const role = {
    name: 'SUPER_ADMIN',
    description: 'This is for Super Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await UserRole.create(role);
  console.log('Role has been created.');
}
createAdminRole();
