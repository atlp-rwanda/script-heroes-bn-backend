/* eslint-disable require-jsdoc */
import sgMail from '@sendgrid/mail';
import template from '../helpers/newRequestEmail';
import { Trip, Request, RequestType, User } from '../database/models';

class RequestsController {
  static async getRequestTypes(req, res) {
    const requests = await RequestType.findAll();

    if (!requests || !requests.length) {
      return res.status(404).json({
        error: res.__('No request types found')
      });
    }

    return res.status(201).json({
      message: res.__('Request types fetched successfully'),
      requests
    });
  }

  static async createMultiCity(req, res) {
    const { user } = req;
    const { trips } = req.body;

    const request = await Request.create({
      userId: user.id,
      status: 'pending',
      type: 3
    });
    const lineManager = await User.findOne({ where: { id: user.linemanager } });

    if (!lineManager) {
      return res.status(404).json({
        error: res.__('Can not find your line manager')
      });
    }

    const email = template({ user, lineManager });
    if (process.env.NODE_ENV === 'production') {
      await sgMail.send(email);
    }

    trips.map((trip) => {
      trip.requestId = request.id;
      return trip;
    });

    const trip = await Trip.bulkCreate(trips, { returning: true });

    return res.status(201).json({
      message: res.__('Request successfully sent for approval'),
      request,
      trips: trip
    });
  }

  static async getRequest(req, res) {
    const { request } = req;

    return res.status(200).json({
      message: res.__('Request fetched successfully'),
      request
    });
  }

  static async deleteRequest(req, res) {
    const { id } = req.params;
    await Request.destroy({
      where: { id }
    });

    return res.status(200).json({
      message: res.__('Request deleted successfully')
    });
  }

  static async getRequests(req, res) {
    const { user } = req;
    const requests = await user.getRequests();

    if (!requests || !requests.length) {
      return res.status(404).json({
        error: res.__('No requests found')
      });
    }

    return res.status(200).json({
      message: res.__('Requests fetched successfully'),
      requests
    });
  }
}
export default RequestsController;
