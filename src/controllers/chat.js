import { ChatMessage, User } from '../database/models';
import { socketServer } from '../index';

class Chat {
  static async pastMessages(req, res) {
    const messages = await ChatMessage.findAll({
      include: {
        model: User,
        as: 'sender',
        attributes: ['firstName', 'lastName', 'email']
      }
    });

    return res.status(200).json({
      message: res.__('success'),
      data: messages
    });
  }

  static async sendMessage(req, res) {
    const message = await ChatMessage.create({
      senderId: req.user.id,
      messageText: req.body.message
    });

    const { email, firstName, lastName } = req.user;
    const createdMessage = {
      ...message.dataValues,
      sender: {
        firstName,
        lastName,
        email
      }
    };
    socketServer.emit('message', createdMessage);

    return res.status(201).json({
      message: res.__('message sent successfully'),
      data: createdMessage
    });
  }
}
export default Chat;
