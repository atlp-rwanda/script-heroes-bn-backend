'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Rooms',
      [
        {
          UserId: 1,
          accomodationId: 1,
          roomType: 'high-class',
          isBooked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 2,
          accomodationId: 2,
          roomType: 'high-class',
          isBooked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
