import {
  Trip,
  Request,
  User,
  RequestType,
  Accomodation,
  Location
} from '../database/models';

class searchTripController {
  static async getAllByStartDate(req, res) {
    const startDate = await req.query.startDate;
    if (!startDate) {
      return res.status(404).json({
        error: res.__('Start date is required !!!')
      });
    }

    const trips = await Trip.findAll({
      include: [
        { model: Accomodation },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ],
      where: {
        from: startDate
      }
    });
    if (!trips || !trips.length) {
      return res.status(404).json({
        msg: res.__('Trips not found')
      });
    }
    res.status(200).json({
      status: 'Ok',
      msg: res.__('Retrieved success'),
      trips
    });
  }

  static async getAllByEndDate(req, res) {
    const endDate = await req.query.endDate;
    if (!endDate) {
      return res.status(404).json({
        error: res.__('End date is required !!!')
      });
    }

    const trips = await Trip.findAll({
      include: [
        { model: Accomodation },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ],
      where: {
        till: endDate
      }
    });

    if (!trips || !trips.length) {
      return res.status(404).json({
        msg: res.__('Trips not found')
      });
    }
    res.status(200).json({
      status: 'Ok',
      msg: res.__('Retrieved success'),
      trips
    });
  }

  static async getAllByOrigin(req, res) {
    // Location country is provided
    const origin = await req.query.origin;
    if (!origin) {
      return res.status(404).json({
        error: res.__('Origin is required !!!')
      });
    }

    // Location is it in DB
    const originLoc = await Location.findOne({
      where: {
        country: origin
      }
    });
    if (!originLoc) {
      return res
        .status(404)
        .json({ err: res.__('Origin location does NOT exist !!!') });
    }

    const trips = await Trip.findAll({
      include: [
        { model: Accomodation },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ],
      where: {
        origin: originLoc.id
      }
    });
    if (!trips || !trips.length) {
      return res.status(404).json({
        msg: res.__('Trips not found')
      });
    }
    res.status(200).json({
      status: 'Ok',
      msg: res.__('Retrieved success'),
      trips
    });
  }

  static async getAllByDest(req, res) {
    const destination = await req.query.destination;
    if (!destination) {
      return res.status(404).json({
        msg: res.__('Destination is required !!!')
      });
    }

    const destLoc = await Location.findOne({
      where: {
        country: destination
      }
    });

    if (!destLoc) {
      return res
        .status(404)
        .json({ err: res.__('Destination location does NOT exist !!!') });
    }
    const trips = await Trip.findAll({
      include: [
        { model: Accomodation },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ],
      where: {
        destination: destLoc.id
      }
    });
    if (!trips || !trips.length) {
      return res.status(404).json({
        msg: res.__('Trips not found')
      });
    }
    res.status(200).json({
      status: 'Ok',
      msg: res.__('Retrieved success'),
      trips
    });
  }

  static async getAllByOriginDest(req, res) {
    const { origin, destination } = req.query;
    if (!origin) {
      return res.status(404).json({
        msg: res.__('Origin is required !!!')
      });
    }
    if (!destination) {
      return res.status(404).json({
        msg: res.__('Destination is required !!!')
      });
    }

    const originLoc = await Location.findOne({
      where: {
        country: origin
      }
    });
    if (!originLoc) {
      return res.status(404).json({ err: res.__('Origin does NOT exist !!!') });
    }
    const destLoc = await Location.findOne({
      where: {
        country: destination
      }
    });
    if (!destLoc) {
      return res
        .status(404)
        .json({ err: res.__('Destination does NOT exist !!!') });
    }
    const trips = await Trip.findAll({
      include: [
        { model: Accomodation },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ],
      where: {
        origin: originLoc.id,
        destination: destLoc.id
      }
    });
    if (!trips || !trips.length) {
      return res.status(404).json({
        msg: res.__('Trips not found')
      });
    }
    res.status(200).json({
      status: 'ok',
      msg: res.__('Retrieved success'),
      trips
    });
  }
}
export default searchTripController;
