module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'RequestTypes',
      [
        {
          type: 'one-way',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'return',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'multi-city',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RequestTypes', null, {});
  }
};
