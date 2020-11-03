module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Requests', // table name
        'linemanager', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Requests', 'linemanager')
    ]);
  }
};
