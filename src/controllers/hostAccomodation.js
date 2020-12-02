import { Accomodation, Location } from '../database/models';

class hostAccomodation {
  async getAll(req, res) {
    const accomodations = await Accomodation.findAll({
      include: { model: Location, as: 'locations' }
    });

    if (!accomodations) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('Accommodations not found')
      });
    }

    res.status(200).json({
      status: res.__('ok'),
      msg: res.__('retrieved success'),
      accomodations
    });
  }
  async getOne(req, res) {
    const accomodations = await Accomodation.findOne({
      include: { model: Location, as: 'locations' },
      where: { id: req.params.id }
    });

    if (!accomodations) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('Accommodations not found')
      });
    }

    res.status(200).json({
      status: res.__('ok'),
      msg: res.__('retrieved success'),
      accomodations
    });
  }
  async create(req, res) {
    const accomodations = req.body;

    const getLocation = await Location.findOne({
      where: { id: accomodations.locationId }
    });

    if (!getLocation) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('Location not found')
      });
    }

    await Accomodation.create(accomodations);

    res.status(200).json({
      status: res.__('ok'),
      msg: res.__('Successfully created accomodation'),
      accomodations
    });
  }
  async update(req, res) {
    const accomodation = await Accomodation.findOne({
      where: { id: req.params.id }
    });

    if (!accomodation) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('Accommodations not found')
      });
    }

    const updtAccomodation = req.body;

    const getLocation = await Location.findOne({
      where: { id: updtAccomodation.locationId }
    });

    if (!getLocation) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('Location not found')
      });
    }

    await Accomodation.update(updtAccomodation, {
      where: { id: accomodation.id },
      returning: true
    });

    res.status(200).json({
      status: res.__('ok'),
      msg: res.__('Successfully updated accomodation'),
      updtAccomodation
    });
  }
  async delete(req, res) {
    const accomodation = await Accomodation.findOne({
      where: { id: req.params.id }
    });

    if (!accomodation) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('Accommodations not found')
      });
    }

    await accomodation.destroy();

    res.status(200).json({
      status: res.__('ok'),
      msg: res.__('Accommodation deleted successfully')
    });
  }
}

export default hostAccomodation;
