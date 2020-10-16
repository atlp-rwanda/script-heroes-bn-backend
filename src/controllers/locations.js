import { Location } from '../database/models';

class LocationsController {
  static async getLocations(req, res) {
    const locations = await Location.findAll();

    if (!locations || !locations.length) {
      return res.status(404).json({
        error: res.__('No locations found')
      });
    }

    return res.status(200).json({
      message: res.__('Locations fetched successfully'),
      locations
    });
  }

  static async getLocation(req, res) {
    const { location } = req;

    return res.status(200).json({
      message: res.__('Location fetched successfully'),
      location
    });
  }

  static async addLocation(req, res) {
    const { country, city } = req.body;

    const location = await Location.create({
      country,
      city
    });

    return res.status(201).json({
      message: res.__('Location added successfully'),
      location
    });
  }

  static async updateLocation(req, res) {
    const { country, city } = req.body;
    const { location } = req;

    await location.update({
      city,
      country
    });

    return res.status(201).json({
      message: res.__('Location updated successfully'),
      location
    });
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;
    await Location.destroy({ where: { id } });
    return res.status(200).json({
      message: res.__('Location is successfully deleted')
    });
  }
}
export default LocationsController;
