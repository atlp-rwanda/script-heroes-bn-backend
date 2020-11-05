const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Request, {
        foreignKey: {
          name: 'requestId',
          allowNull: false
        },
        as: 'requests',
        onDelete: 'CASCADE'
      });
    }
  }
  Notification.init(
    {
      requestId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      title: DataTypes.STRING,
      notification: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Notification'
    }
  );
  return Notification;
};
