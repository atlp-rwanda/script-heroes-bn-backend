import { Request } from '../database/models';

class searchRequestController {
  // Get requests by a Status (pending or approved)
  static async getAllRequestsByStatus(req, res) {
    const requestStatus = req.query.status;
    if (!requestStatus) {
      return res.status(400).json({
        error: res.__('Status is required !!!')
      });
    }

    if (
      requestStatus !== 'pending' &&
      requestStatus !== 'rejected' &&
      requestStatus !== 'approved'
    ) {
      return res.status(404).json({
        error: res.__('Status must be either rejected or pending or approved.')
      });
    }

    const requests = await Request.findAll({
      where: {
        status: requestStatus
      }
    });
    if (!requests || !requests.length) {
      return res.status(404).json({
        msg: res.__('Requests not found')
      });
    }
    res.status(200).json({
      msg: res.__('Retrieved success'),
      requests
    });
  }

  // Get a specific request by ID
  static async getRequestById(req, res) {
    let requestId = req.query.id;
    if (!requestId) {
      return res.status(400).json({
        error: res.__('Request ID is required !!!')
      });
    }

    requestId = parseInt(requestId, 10);

    if (Number.isInteger(requestId) === false) {
      return res.status(400).json({
        error: res.__('Request ID must be a number !!!')
      });
    }

    const requests = await Request.findAll({
      where: {
        id: requestId
      }
    });
    if (!requests || !requests.length) {
      return res.status(404).json({
        msg: res.__('Requests not found')
      });
    }
    res.status(200).json({
      status: 'Ok',
      msg: res.__('Retrieved success'),
      requests
    });
  }

  // Get requests by user ID
  static async getRequestByUser(req, res) {
    let userId = req.query.id;
    if (!userId) {
      return res.status(400).json({
        error: res.__('User ID is required !!!')
      });
    }

    userId = parseInt(userId, 10);

    if (Number.isInteger(userId) === false) {
      return res.status(400).json({
        error: res.__('User ID must be a number !!!')
      });
    }

    const requests = await Request.findAll({
      where: {
        userId
      }
    });
    if (!requests || !requests.length) {
      return res.status(404).json({
        msg: res.__('Requests not found')
      });
    }
    res.status(200).json({
      status: 'Ok',
      msg: res.__('Retrieved success'),
      requests
    });
  }
}
export default searchRequestController;
