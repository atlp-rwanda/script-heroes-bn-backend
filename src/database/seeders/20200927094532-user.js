import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      salt
    );

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'first',
          lastName: 'last',
          email: 'email@example.com',
          phoneNumber: '07884',
          password: hashedPassword,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
