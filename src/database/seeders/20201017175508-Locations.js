module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Locations',
      [
        {
          city: 'Kigali',
          country: 'Rwanda',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          city: 'Nairobi',
          country: 'Kenya',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          city: 'Pretoria',
          country: 'South Africa',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          city: 'Istanbul',
          country: 'Turkey',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          city: 'London',
          country: 'United Kingdom',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Locations', null, {});
  }
};
