import { Accomodation, Room } from '../database/models';

export default {
  addAccomodation: async (req, res) => {
    const {
      facilityName,
      locationId,
      description,
      roomType,
      photoUrl
    } = req.body;
    const accomodation = await Accomodation.create({
      facilityName,
      locationId,
      description,
      photoUrl
    });
    const room = await Room.create({
      roomType,
      accomodationId: accomodation.id
    });
    return res.status(201).json({
      message: res.__('Accomodation created successfully'),
      accomodation: {
        accomodation,
        rooms: {
          room
        }
      }
    });
  },
  getAccomodations: async (req, res) => {
    const accomodations = await Accomodation.findAll({
      include: [
        {
          model: Room,
          as: 'rooms'
        }
      ]
    });
    return res.status(200).json(accomodations);
  },
  getAnAccommodation: async (req, res) => {
    const { id } = req.params;
    const accomodation = await Accomodation.findOne({
      where: { id },
      include: [
        {
          model: Room,
          as: 'rooms'
        }
      ]
    });
    if (!accomodation) {
      return res.status(404).json({ message: res.__('No accomodation found') });
    }
    return res.status(200).json(accomodation);
  },
  deleteAccomodation: async (req, res) => {
    const { id } = req.params;
    const deleted = await Accomodation.destroy({
      where: { id }
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: res.__('No accomodation to delete') });
    }
    return res
      .status(200)
      .json({ message: res.__('Accomodation deleted successfully') });
  },
  updateAccomodation: async (req, res) => {
    const { id } = req.params;

    const accomodation = await Accomodation.findByPk(id);
    if (!accomodation) {
      return res
        .status(404)
        .json({ message: res.__('No accomodation with such id') });
    }
    await Accomodation.update(
      {
        facilityName: req.body.facilityName || accomodation.facilityName,
        location: req.body.location || accomodation.location,
        description: req.body.description || accomodation.description,
        photoUrl: req.body.photoUrl || accomodation.photoUrl
      },
      {
        where: {
          id
        }
      }
    );
    return res
      .status(200)
      .json({ message: res.__('Accomodation successfully updated') });
  }
};
