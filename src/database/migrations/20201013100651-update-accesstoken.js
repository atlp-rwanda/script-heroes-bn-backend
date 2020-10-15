module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('AccessTokens', 'token', {
      type: Sequelize.STRING(1024)
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('AccessTokens', 'token', {
      type: Sequelize.STRING(255)
    });
  }
};
