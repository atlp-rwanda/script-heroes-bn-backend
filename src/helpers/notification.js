import { Notification, RequestType } from '../database/models';

// Actions for notifications
export const createRequest = 'Creacted';
export const approvedRequest = 'Approved';
export const canceledRequest = 'Canceled';

export const createNotification = async (
  userId,
  requestId,
  name,
  typeId,
  action
) => {
  const type = await RequestType.findOne({ where: { id: typeId } });
  if (type) {
    const notification = await Notification.create({
      userId,
      requestId,
      title: `${type.type} trip is ${action}`,
      notification: `${name} ${action} ${type.type}`
    });
    return notification;
  }
};
