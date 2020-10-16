const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.Request, {
        foreignKey: 'requestId',
        as: 'request'
      });

      Trip.hasOne(models.Location, {
        foreignKey: 'id',
        as: 'originId'
      });

      Trip.hasOne(models.Location, {
        foreignKey: 'id',
        as: 'destinationId'
      });
    }
  }
  Trip.init(
    {
      origin: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      from: DataTypes.STRING,
      till: DataTypes.STRING,
      requestId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Trip'
    }
  );
  return Trip;
};
