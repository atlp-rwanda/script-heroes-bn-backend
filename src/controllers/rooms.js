import { Accomodation, Room } from '../database/models';

export default {
  makeRooms: async (req, res) => {
    const { id } = req.params;
    const { roomType } = req.body;
    const accomodation = await Accomodation.findByPk(id);
    if (!accomodation) {
      return res
        .status(404)
        .json({ message: res.__('No accommodation found') });
    }
    const room = await Room.create({ roomType, accomodationId: id });
    return res.status(201).json({
      message: res.__(
        `Room in ${accomodation.facilityName} created successfuly`
      ),
      room
    });
  },
  getRooms: async (req, res) => {
    const { id } = req.params;
    const rooms = await Room.findAll({ where: { accomodationId: id } });
    if (rooms.length === 0) {
      return res
        .status(0)
        .json({ message: res.__('No rooms created yet in this accomodation') });
    }
    return res.status(200).json(rooms);
  },
  deleteRooms: async (req, res) => {
    const { id } = req.body;
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (!accomodation) {
      return res
        .status(404)
        .json({ message: res.__('No accommodation found') });
    }
    const deletedRoom = await Room.destroy({ where: { id } });
    if (!deletedRoom) {
      return res.status(404).json({ message: res.__('Failed to delete') });
    }
    return res
      .status(200)
      .json({ message: res.__('Room Deleted successfully') });
  }
};
