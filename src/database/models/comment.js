'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Request, {
        foreignKey: 'requestId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      requestId: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  );
  return Comment;
};
