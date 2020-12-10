/* eslint-disable no-unused-vars */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Requests',
        'reason',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Requests', 'reason'),
    ]);
  },
};
