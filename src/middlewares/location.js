import { Location } from '../database/models';

class LocationMiddleware {
  static async getLocation(req, res, next) {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: res.__('Location id must be a number')
      });
    }

    const location = await Location.findOne({ where: { id } });

    if (!location) {
      return res.status(404).json({
        error: res.__('Location not found')
      });
    }

    req.location = location;
    next();
  }
}
export default LocationMiddleware;
