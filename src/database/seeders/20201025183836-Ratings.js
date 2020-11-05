module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ratings', [{
      accomodationId: 2,
      ratingValue: 3,
      rater: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accomodationId: 3,
      ratingValue: 5,
      rater: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      accomodationId: 1,
      ratingValue: 4,
      rater: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ratings', null, {});
  }
};
