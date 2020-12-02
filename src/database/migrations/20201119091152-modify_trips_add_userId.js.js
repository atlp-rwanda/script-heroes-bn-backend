module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Trips', // table name
        'userId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('Trips', 'userId')]);
  }
};
