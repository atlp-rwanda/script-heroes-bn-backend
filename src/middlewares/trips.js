import { Trip } from '../database/models/index';
class TripsMiddleware {
  static async CheckOwner(req, res, next) {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: res.__('Trip does not exist') });
    }
    if (trip.userId != req.user.id) {
      return res.status(401).json({
        error: res.__('Unauthorized request')
      });
    }
    next();
  }
}
export default TripsMiddleware;
