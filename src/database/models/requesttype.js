const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequestType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RequestType.hasMany(models.Request, { foreignKey: 'type' });
    }
  }
  RequestType.init(
    {
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'RequestType'
    }
  );
  return RequestType;
};
