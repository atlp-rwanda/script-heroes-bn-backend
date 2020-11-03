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
        onDelete: 'CASCADE'
      });

      Trip.belongsTo(models.Location, {
        foreignKey: 'origin',
        onDelete: 'CASCADE'
      });

      Trip.belongsTo(models.Location, {
        foreignKey: 'destination',
        onDelete: 'CASCADE'
      });
      Trip.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        onDelete: 'CASCADE'
      });
      Trip.belongsTo(models.User, {
        foreignKey: 'linemanager',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Trip.init(
    {
      origin: {
        type: DataTypes.INTEGER,
        references: { model: 'Location', key: 'id' }
      },
      destination: {
        type: DataTypes.INTEGER,
        references: { model: 'Location', key: 'id' }
      },
      from: DataTypes.STRING,
      till: DataTypes.STRING,
      requestId: DataTypes.INTEGER,
      accomodationId: {
        type: DataTypes.INTEGER,
        references: { model: 'Accomodation', key: 'id' }
      },
      travelReasons: DataTypes.STRING,
      linemanager: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Trip'
    }
  );
  return Trip;
};
