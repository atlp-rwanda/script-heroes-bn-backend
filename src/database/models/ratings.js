const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    static associate(models) {
      // define association here
      Ratings.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        onDelete: 'CASCADE'
      });
      Ratings.belongsTo(models.User, {
        foreignKey: 'rater',
        onDelete: 'CASCADE'
      });
    }
  }
  Ratings.init({
    accomodationId: DataTypes.INTEGER,
    ratingValue: DataTypes.INTEGER,
    rater: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ratings',
  });
  return Ratings;
};
