module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookedRoom: {
        type: Sequelize.INTEGER,
      },
      accomodationId: {
        type: Sequelize.INTEGER,
      },
      requester: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      checkInDate: {
        type: Sequelize.STRING
      },
      checkOutDate: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};
