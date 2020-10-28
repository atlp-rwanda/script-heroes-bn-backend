/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accomodation.hasMany(models.Room, {
        foreignKey: 'accomodationId',
        as: 'rooms',
        onDelete: 'CASCADE'
      });
      Accomodation.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
      });
      Accomodation.hasMany(models.Trip, { foreignKey: 'accomodationId' });
    }
  }
  Accomodation.init(
    {
      facilityName: DataTypes.STRING,
      locationId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      roomNumbers: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      services: DataTypes.STRING(1234),
      amenities: DataTypes.STRING(1234)
    },
    {
      sequelize,
      modelName: 'Accomodation'
    }
  );
  return Accomodation;
};
