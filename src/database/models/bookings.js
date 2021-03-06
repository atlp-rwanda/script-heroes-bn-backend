const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    static associate(models) {
      Bookings.belongsTo(models.Room, {
        foreignKey: 'bookedRoom',
        onDelete: 'CASCADE'
      });
      Bookings.belongsTo(models.User, {
        foreignKey: 'requester',
        onDelete: 'CASCADE'
      });
      Bookings.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        onDelete: 'CASCADE'
      });
    }
  }
  Bookings.init(
    {
      bookedRoom: {
        type: DataTypes.INTEGER,
        references: { model: 'Room', key: 'id' }
      },
      accomodationId: {
        type: DataTypes.INTEGER,
        references: { model: 'Accomodation', key: 'id' }
      },
      requester: {
        type: DataTypes.INTEGER,
        references: { model: 'User', key: 'id' }
      },
      checkInDate: DataTypes.STRING,
      checkOutDate: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Bookings'
    }
  );
  return Bookings;
};
