import {
  User,
  Trip,
  Accomodation,
  Request,
  RequestType,
  Location
} from '../database/models';
class Trips {
  static async getTrips(req, res) {
    const trips = await Trip.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Accomodation, include: [{ model: Location }] },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
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

  static async getTrip(req, res) {
    const findTrip = await Trip.findOne({
      where: { id: req.params.id },
      include: [
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] },
        { model: Accomodation, include: [{ model: Location }] }
      ]
    });
    if (findTrip) {
      return res.status(200).json({
        message: res.__('Trip retrieved succesfully'),
        Trip: findTrip
      });
    }
  }
}
export default Trips;
