module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      isVerified: 'T',
      phoneNumber: '07827378390',
      password: 'Password123',
      gender: 'male',
      birthdate: '03-15-2020',
      language: 'English',
      currency: 'USD',
      country: 'Rwanda',
      department: 'Marketing',
      linemanager: '12',
      roleId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
