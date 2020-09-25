/* eslint-disable arrow-body-style */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'isVerified', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      )
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('Users', 'isVerified')]);
  }
};
