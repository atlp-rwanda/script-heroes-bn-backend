/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings',
      [{
        bookedRoom: 1,
        accomodationId: 1,
        requester: 9,
        checkInDate: 'January 1, 2020',
        checkOutDate: 'Feb 1, 2020',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookedRoom: 2,
        accomodationId: 1,
        requester: 6,
        checkInDate: 'January 4, 2020',
        checkOutDate: 'Feb 5, 2020',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
