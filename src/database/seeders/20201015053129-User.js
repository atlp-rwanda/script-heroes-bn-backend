import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@email.com',
        isVerified: 'T',
        phoneNumber: '07827378390',
        password: hashedPassword,
        gender: 'male',
        birthdate: '03-15-2020',
        language: 'English',
        currency: 'USD',
        country: 'Rwanda',
        department: 'Marketing',
        linemanager: '2',
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'doe@email.com',
        isVerified: 'T',
        phoneNumber: '07827378390',
        password: hashedPassword,
        gender: 'male',
        birthdate: '03-15-2020',
        language: 'English',
        currency: 'USD',
        country: 'Rwanda',
        department: 'Marketing',
        linemanager: '1',
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'doe2@email.com',
        isVerified: 'T',
        phoneNumber: '07827378390',
        password: hashedPassword,
        gender: 'male',
        birthdate: '03-15-2020',
        language: 'English',
        currency: 'USD',
        country: 'Rwanda',
        department: 'Marketing',
        linemanager: '1',
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'manager1@gmail.com',
        isVerified: 'T',
        phoneNumber: '07827378390',
        password: hashedPassword,
        gender: 'male',
        birthdate: '03-15-2020',
        language: 'English',
        currency: 'USD',
        country: 'Rwanda',
        department: 'Marketing',
        linemanager: '2',
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'manager2@gmail.com',
        isVerified: 'T',
        phoneNumber: '07827378390',
        password: hashedPassword,
        gender: 'male',
        birthdate: '03-15-2020',
        language: 'English',
        currency: 'USD',
        country: 'Rwanda',
        department: 'Marketing',
        linemanager: '1',
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
