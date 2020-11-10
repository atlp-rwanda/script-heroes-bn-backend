const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasOne(models.Bookings, {
        foreignKey: 'bookedRoom'
      });
      Room.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId'
      });
    }
  }
  Room.init(
    {
      UserId: DataTypes.INTEGER,
      accomodationId: DataTypes.INTEGER,
      roomType: DataTypes.STRING,
      isBooked: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Room'
    }
  );
  return Room;
};
