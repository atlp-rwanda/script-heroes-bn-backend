module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trips', 'accomodationId', {
      type: Sequelize.INTEGER,
      references: { model: 'Accomodations', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Trips', 'travelReasons', {
      type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trips', 'accomodationId', {
      type: Sequelize.INTEGER,
      references: { model: 'Accomodations', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.removeColumn('Trips', 'travelReasons', {
      type: Sequelize.STRING
    });
  }
};
