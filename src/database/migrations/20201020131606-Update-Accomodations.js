module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Accomodations', 'roomNumbers', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('Accomodations', 'price', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('Accomodations', 'services', {
      type: Sequelize.STRING(1234)
    });
    await queryInterface.addColumn('Accomodations', 'amenities', {
      type: Sequelize.STRING(1234)
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Accomodations', 'roomNumbers', {
      type: Sequelize.INTEGER
    });
    await queryInterface.removeColumn('Accomodations', 'price', {
      type: Sequelize.INTEGER
    });
    await queryInterface.removeColumn('Accomodations', 'services', {
      type: Sequelize.STRING(1234)
    });
    await queryInterface.removeColumn('Accomodations', 'amenities', {
      type: Sequelize.STRING(1234)
    });
  }
};
