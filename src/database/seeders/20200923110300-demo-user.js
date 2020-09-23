module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'johnDoe@test.com'
      }
    ],
    {}
  ),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', [
    {
      first_name: 'John'
    }
  ])
};
