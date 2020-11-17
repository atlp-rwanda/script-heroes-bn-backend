module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          name: 'HOST',
          description: 'pre screened host or supplier',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'SUPER_ADMIN',
          description: 'admin for Barefoot Nomad',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserRoles', null, {});
  }
};
