module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Accomodations',
      [
        {
          facilityName: 'marriot',
          locationId: 1,
          description: 'adults',
          photoUrl: 'https://picsum.photos/200/300',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          facilityName: 'marriot',
          locationId: 3,
          description: 'adults',
          photoUrl: 'https://picsum.photos/seed/picsum/200/300',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accomodations', null, {});
  }
};
