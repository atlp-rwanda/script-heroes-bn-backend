const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasOne(models.Bookings, {
        foreignKey: 'bookedRoom',
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
