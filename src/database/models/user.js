/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {object} models
     * @returns {object} User
     */

    static associate(models) {
      // define association here
      User.belongsTo(models.UserRole, {
        as: 'role',
        foreignKey: 'roleId'
      });
      User.hasMany(models.Reaction, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Request, {
        foreignKey: 'userId'
      });
      User.hasOne(models.Bookings, {
        foreignKey: 'requester',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      language: DataTypes.STRING,
      currency: DataTypes.STRING,
      country: DataTypes.STRING,
      department: DataTypes.STRING,
      linemanager: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      roleId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
