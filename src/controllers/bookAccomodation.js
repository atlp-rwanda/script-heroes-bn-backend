import { Accomodation, Room } from '../database/models';



export default {
    bookAccomodation: async (req, res) => {
        const { id, firstName, lastName, phoneNumber, email } = req.user
        const { roomId, accommodationId, checkInDate, checkOutDate } = req.body


        const accomodation = await Accomodation.findOne({
            where: { id: accommodationId },
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

        let selectedAccomodation;
        accomodation.rooms.map(async room => {
            if (room.id === roomId) {
                selectedAccomodation = await room.update({
                    UserId: id,
                    isBooked: true
                })
            }
        })
        return res.status(200).json({
            message: "Booking request completed successfully",
            requester: {
                firstName,
                lastName,
                phoneNumber,
                email,
                roomId,
                bookedAccommodation: accommodationId
            },
            bookedFrom: checkInDate,
            bookedTo: checkOutDate

        }
        );
    }
}
