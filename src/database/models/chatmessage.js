const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatMessage.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender'
      });
    }
  }
  ChatMessage.init(
    {
      senderId: DataTypes.INTEGER,
      messageText: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ChatMessage'
    }
  );
  return ChatMessage;
};
