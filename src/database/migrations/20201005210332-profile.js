module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'gender', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn('Users', 'birthdate', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'language', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'currency', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'country', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'department', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'linemanager', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  },
  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'birthdate'),
      queryInterface.removeColumn('Users', 'language'),
      queryInterface.removeColumn('Users', 'currency'),
      queryInterface.removeColumn('Users', 'country'),
      queryInterface.removeColumn('Users', 'department'),
      queryInterface.removeColumn('Users', 'linemanager')
    ]);
  }
};
