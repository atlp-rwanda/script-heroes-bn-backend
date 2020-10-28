import { QueryTypes } from 'sequelize';
import { sequelize, Location } from '../database/models';

class travelDestination {
  async getAll(req, res) {
    const destinations = await sequelize.query(
      'select destination from "Trips" group by destination order by count(destination) desc',
      { type: QueryTypes.SELECT }
    );
    if (!destinations || !destinations.length) {
      return res.status(200).json({
        status: res.__('ok'),
        msg: res.__('Destination not found'),
        destinations
      });
    }
    const mostVisited = await Location.findOne({
      where: { id: destinations[0].destination }
    });
    res.status(200).json({
      status: res.__('ok'),
      msg: res.__('retrieved success'),
      mostVisited
    });
  }
}

export default travelDestination;
