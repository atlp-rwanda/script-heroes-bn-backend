module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Users', 'roleId', {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      await queryInterface.addColumn('Users', 'managerId', {
        allowNull: true,
        type: Sequelize.INTEGER
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Users', 'roleId');
      await queryInterface.removeColumn('Users', 'managerId');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
