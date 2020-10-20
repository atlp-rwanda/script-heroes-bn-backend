import { Notification } from '../database/models';

export default {
  deleteNotification: async (req, res) => {
    const { id } = req.params;
    const deleted = await Notification.destroy({ where: { id } });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: res.__('No notification found to delete') });
    }
    return res
      .status(200)
      .json({ message: res.__('Notification deleted successfully') });
  },
  getAllNotifications: async (req, res) => {
    const { id } = req.user;
    const notifications = await Notification.findAll({ where: { userId: id } });
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: res.__('No notification found') });
    }
    return res.status(200).json(notifications);
  },
  getSingleNotification: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const notification = await Notification.findOne({ where: { id, userId } });
    if (!notification) {
      return res.status(404).json({ message: res.__('No notification found') });
    }
    await notification.update({ status: 'read' });
    return res.status(200).json(notification);
  },
  countUnseenNotifications: async (req, res) => {
    const userId = req.user.id;
    const number = await Notification.count({
      where: { userId, status: 'unread' }
    });
    res.status(200).json({ number });
  },
  markAsRead: async (req, res) => {
    const updated = await Notification.update(
      { status: 'read' },
      { where: { status: 'unread' } }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: res.__('No notification to update') });
    }
    return res
      .status(200)
      .json({ message: res.__('Notification set as read successfully') });
  }
};
