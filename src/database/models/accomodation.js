/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    static associate(models) {
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
      Accomodation.hasMany(models.Reaction, { foreignKey: 'accomodationId' });
      Accomodation.hasMany(models.Bookings, {
        foreignKey: 'accomodationId'
      });
      Accomodation.hasMany(models.Ratings, {
        foreignKey: 'accomodationId'
      });
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
