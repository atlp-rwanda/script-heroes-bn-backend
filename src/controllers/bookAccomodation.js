import { Accomodation, Room, Bookings, User } from '../database/models';

export default {
  getBookings: async (req, res) => {
    const bookings = await Bookings.findAll({
      include: [
        { model: Room, include: [{ model: Accomodation }] },
        { model: User }
      ]
    });
    res.status(200).json({
      msg: res.__('Bookings retrieved successfully'),
      bookings
    });
  },
  getSingleBooking: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Bookings.findOne({ where: { id, requester: userId },
      include: [
        { model: Room, include: [{ model: Accomodation }] },
        { model: User }
      ]
    });
    if (!booking) {
      return res.status(404).json({
        message: res.__('You don\'t have  booking with that id')
      });
    }
    res.status(200).json({
      msg: res.__('Booking retrieved successfully'),
      booking
    });
  },
  deleteBooking: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedBooking = await Bookings.destroy({
      where: { id, requester: userId }
    });
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: res.__('You don\'t have a booking with a specified id') });
    }
    return res
      .status(200)
      .json({ message: res.__('Booking deleted successfully') });
  },
  updateBooking: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedBooking = await Bookings.findOne({ where: { id, requester: userId } });
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ message: res.__('You don\'t have a booking with specified id') });
    }
    await Bookings.update({
      bookedRoom: req.body.roomId || updatedBooking.bookedRoom,
      accomodationId: req.body.accomodationId || updatedBooking.accomodationId,
      requester: req.body.requester || updatedBooking.requester,
      checkInDate: req.body.checkInDate || updatedBooking.checkInDate,
      checkOutDate: req.body.checkOutDate || updatedBooking.checkOutDate
    }, {
      where: {
        id, requester: userId
      }
    });
    return res
      .status(200)
      .json({ message: res.__('Booking updated successfully') });
  },
  bookAccomodation: async (req, res) => {
    const { roomId, accomodationId, checkInDate, checkOutDate } = req.body;
    const { id } = req.user;
    const roomToUpdate = await Room.findOne({ where: { id: roomId } });
    if (!roomToUpdate) {
      return res.status(404).json({ message: res.__('No room with that id is found') });
    }
    await Room.update({
      isBooked: true,
      UserId: id
    },
    {
      where: { id: roomId },
    });
    const createdBooking = await Bookings.create({
      bookedRoom: roomId,
      checkInDate,
      checkOutDate,
      requester: id,
      accomodationId
    });
    return res.status(200).json({
      message: res.__('Booking created successfully'),
      createdBooking
    });
  },
  deleteAllBookings: async (req, res) => {
    await Bookings.destroy({
      where: {},
      truncate: true
    });
    return res
      .status(200)
      .json({ message: res.__('Bookings deleted successfully') });
  },
};
