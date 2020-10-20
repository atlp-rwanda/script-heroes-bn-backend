const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      Request.belongsTo(models.RequestType, {
        foreignKey: 'type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Request.hasMany(models.Trip, {
        foreignKey: 'requestId'
      });
    }
  }
  Request.init(
    {
      type: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Request'
    }
  );
  return Request;
};
