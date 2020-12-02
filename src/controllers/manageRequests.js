import { Request, User, RequestType } from '../database/models';
import { createNotification } from '../helpers/notification';

export default {
  displaydirectRequests: async (req, res) => {
    const directRequests = await Request.findAll({
      where: { linemanager: req.user.id },
      include: [{ model: User }, { model: RequestType }]
    });
    return res.status(200).json({
      message: res.__('Requests fetched successfully'),
      directRequests
    });
  },
  makeDecision: async (req, res) => {
    const request = await Request.findOne({
      where: { id: req.params.id },
      include: [{ model: User }, { model: RequestType }]
    });
    const decision = req.params.decision;
    const type = RequestType.findOne({ where: { id: request.type } });
    const status = decision + 'd';
    await request.update({ status: `${status}` });

    // Creating a notification
    await createNotification(
      request.userId,
      request.id,
      req.user.firstName,
      request.type,
      status
    );
    return res.status(201).json({
      message: res.__(`Request ${status} successfully`),
      request: request
    });
  }
};
