const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * @param {object} model
     * @returns {object} return userRole model class
     * @description Get role instance and save data
     */

    static associate(models) {
      // define association here
      UserRole.hasMany(models.User, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE'
      });
    }
  }
  UserRole.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'UserRole'
    }
  );
  return UserRole;
};
