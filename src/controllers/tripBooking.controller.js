/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import sgMail from '@sendgrid/mail';
import template from '../helpers/newRequestEmail';
import {
  User,
  Trip,
  Request,
  Location,
  Accomodation,
  RequestType
} from '../database/models';
import { createRequest, createNotification } from '../helpers/notification';

class tripController {
  static async onewayTrip(req, res) {
    const {
      origin,
      destination,
      from,
      till,
      accomodationId,
      travelReasons
    } = req.body;
    const { user } = req;

    const newRequest = await Request.create({
      userId: user.id,
      type: 1,
      status: 'pending',
      linemanager: req.user.linemanager
    });

    const newTrip = await Trip.create({
      requestId: newRequest.id,
      origin,
      destination,
      from,
      till,
      accomodationId,
      travelReasons,
      linemanager: req.user.linemanager
    });

    const tripId = await Trip.findOne({
      where: { id: newTrip.id }
    });
    const viewLink = `${process.env.TRIP_VIEW_URL}/${tripId}`;

    const lineManager = await User.findOne({ where: { id: user.linemanager } });

    if (!lineManager) {
      return res.status(404).json({
        error: res.__('Can not find your line manager')
      });
    }

    await createNotification(
      lineManager.id,
      newRequest.id,
      user.firstName,
      1,
      createRequest
    );
    const email = template({ user, lineManager, viewLink });
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'development'
    ) {
      await sgMail.send(email);
    }
    res.status(201).json({
      message: res.__('Request successfully sent'),
      trip: newTrip
    });
  }

  static async getTrips(req, res) {
    const findTrips = await Trip.findAll({
      include: [
        { model: Location },
        { model: Request, include: [{ model: User }, { model: RequestType }] },
        { model: Accomodation }
      ]
    });
    if (findTrips) {
      return res.status(200).json({
        message: res.__('Trips retrieved succesfully'),
        Trips: findTrips
      });
    }
    if (!findTrip) {
      return res.status(404).json({ error: res.__('Trips not found') });
    }
  }

  static async getTrip(req, res) {
    const findTrip = await Trip.findOne({
      where: { id: req.params.id },
      include: [
        { model: Location },
        { model: Request, include: [{ model: User }, { model: RequestType }] },
        { model: Accomodation }
      ]
    });
    if (findTrip) {
      return res.status(200).json({
        message: res.__('Trip retrieved succesfully'),
        Trip: findTrip
      });
    }
    if (!findTrip) {
      return res.status(404).json({ error: res.__('Trip does not exist') });
    }
  }

  static async updateTrip(req, res) {
    const findTrip = await Trip.findOne({
      where: { id: req.params.id }
    });
    if (findTrip) {
      const updatedTrip = await findTrip.update(req.body);
      res.status(201).json({
        message: res.__('Trip updated succesfully'),
        Trip: updatedTrip
      });
    }
  }

  static async deleteTrip(req, res) {
    const findTrip = await Trip.findOne({
      where: { id: req.params.id }
    });
    if (findTrip) {
      const deleteTrip = await findTrip.destroy(req.body);
      res.status(201).json({
        message: res.__('Trip deleted succesfully'),
        Trip: deleteTrip
      });
    }
  }
}
export default tripController;
