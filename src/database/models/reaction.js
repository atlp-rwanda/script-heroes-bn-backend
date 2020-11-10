'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        onDelete: 'CASCADE'
      });
      Reaction.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  Reaction.init(
    {
      accomodationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      liked: DataTypes.BOOLEAN,
      unliked: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Reaction'
    }
  );
  return Reaction;
};
