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
      linemanager: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
