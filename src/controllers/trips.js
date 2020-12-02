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
        {
          model: Accomodation,
          include: [{ model: Location, as: 'locations' }]
        },
        { model: Location, as: 'Origin' },
        { model: Location, as: 'Destination' },
        { model: Request, include: [{ model: User }, { model: RequestType }] }
      ]
    });
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
        { model: Accomodation, include: [{ model: Location, as: 'locations' }] }
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
