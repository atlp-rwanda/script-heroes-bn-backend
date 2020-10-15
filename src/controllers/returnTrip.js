import {
  User,
  Trip,
  Accomodation,
  Request,
  RequestType,
  Location
} from '../database/models';
import sgMail from '@sendgrid/mail';
import autoMsg from '../helpers/newRequestEmail';

class returnTripController {
  async getAll(req, res) {
    const trips = await Trip.findAll({
      include: [
        { model: Accomodation },
        { model: Location },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ]
    });
    if (!trips || !trips.length) {
      return res.status(404).json({
        msg: res.__('No trips found')
      });
    }
    res.status(200).json({
      status: 'ok',
      msg: res.__('Retrieved success'),
      trips
    });
  }
  async createTrip(req, res) {
    const {
      origin,
      destination,
      from,
      till,
      travelReasons,
      accomodationId
    } = req.body;

    const getRequest = {
      status: 'pending',
      userId: req.user.id,
      type: 2,
      linemanager: req.user.linemanager
    };

    const lineManager = await User.findOne({
      where: { id: req.user.linemanager }
    });

    if (!lineManager) {
      return res.status(404).json({
        msg: res.__('Can not find your line manager')
      });
    }

    const msg = autoMsg({
      user: req.user,
      lineManager
    });
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'development'
    ) {
      await sgMail.send(msg);
    }

    const request = await Request.create(getRequest);

    const getAccomodation = await Accomodation.findOne({
      where: { id: accomodationId }
    });

    if (!getAccomodation) {
      return res.status(404).json({
        msg: res.__('Accomodation not found')
      });
    }

    const From = await Location.findOne({
      where: { id: origin }
    });

    const To = await Location.findOne({
      where: { id: destination }
    });

    if (!From || !To) {
      return res.status(404).json({
        msg: res.__('Location not found')
      });
    }

    const newTrip = {
      origin: From.id,
      destination: To.id,
      from,
      till,
      travelReasons,
      accomodationId: getAccomodation.id,
      requestId: request.id,
      linemanager: req.user.linemanager
    };

    await Trip.create(newTrip);

    res.status(200).json({
      status: 'ok',
      msg: res.__('Trip requested success'),
      trip: newTrip
    });
  }
  async deleteTrip(req, res) {
    const trip = await Trip.findOne({ where: { id: req.params.id } });
    if (!trip) {
      return res.status(404).json({
        status: 'failed',
        msg: res.__('Not found')
      });
    }
    await trip.destroy();
    res.status(200).json({
      status: 'ok',
      msg: res.__('Successfully deleted trip')
    });
  }
  async updateTrip(req, res) {
    const trip = await Trip.findOne({ where: { id: req.params.id } });
    if (!trip) {
      return res.status(404).json({
        status: 'failed',
        msg: res.__('Not found')
      });
    }
    const {
      origin,
      destination,
      from,
      till,
      travelReasons,
      accomodationId
    } = req.body;

    let getAccomodation;
    if (accomodationId) {
      getAccomodation = await Accomodation.findOne({
        where: { id: accomodationId }
      });
    }

    const updtTrip = {
      origin,
      destination,
      from,
      till,
      travelReasons,
      accomodationId: getAccomodation
        ? getAccomodation.id
        : trip.accomodationId,
      requestId: trip.requestId,
      linemanager: req.user.linemanager
    };

    const newTrip = await Trip.update(updtTrip, {
      where: { id: req.params.id },
      returning: true
    });

    res.status(200).json({
      status: 'ok',
      msg: res.__('Success updated'),
      trip: newTrip
    });
  }
}

export default returnTripController;
