module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origin: {
        type: Sequelize.INTEGER,
        references: { model: 'Locations', key: 'id' },
        onDelete: 'CASCADE'
      },
      destination: {
        type: Sequelize.INTEGER,
        references: { model: 'Locations', key: 'id' },
        onDelete: 'CASCADE'
      },
      from: {
        type: Sequelize.STRING
      },
      till: {
        type: Sequelize.STRING
      },
      requestId: {
        type: Sequelize.INTEGER,
        references: { model: 'Requests', key: 'id' },
        onDelete: 'CASCADE'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trips');
  }
};
