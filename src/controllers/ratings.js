import sequelize from 'sequelize';
import { Accomodation, User, Ratings, Bookings } from '../database/models';

export default {
  getRatings: async (req, res) => {
    const ratings = await Ratings.findAll({
      include: [
        { model: Accomodation },
        { model: User },
      ]
    });

    res.status(200).json({
      message: res.__('Ratings retrieved successfully'),
      ratings,
    });
  },
  getSingleRating: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const rating = await Ratings.findOne({ where: { id, rater: userId },
      include: [
        { model: Accomodation },
        { model: User }
      ]
    });
    if (!rating) {
      return res.status(404).json({
        message: res.__('No rating with that id')
      });
    }
    res.status(200).json({
      message: res.__('Rating retrieved successfully'),
      rating
    });
  },
  getRatingsByAccomodation: async (req, res) => {
    const { id } = req.params;
    const rating = await Ratings.findAll({ where: { accomodationId: id },
      include: [
        { model: Accomodation },
        { model: User }
      ] });
    if (!rating) {
      return res.status(404).json({
        message: res.__('No rating with that id')
      });
    }
    const averageRatings = await Ratings.findAll({ where: { accomodationId: id },
      attributes: [[sequelize.fn('AVG', sequelize.col('ratingValue')), 'ratingValue']]
    });
    const avg = Math.round(averageRatings[0].ratingValue * 10) / 10;
    res.status(200).json({
      message: res.__('Rating of an accomodation retrieved successfully'),
      rating,
      averageRatings: avg.toFixed(1)
    });
  },
  addRating: async (req, res) => {
    const { accomodationId, ratingValue } = req.body;
    const { id } = req.user;
    const userRated = await Ratings.findOne({ where: { rater: id, accomodationId } });
    const userBooked = await Bookings.findOne({ where: { requester: id, accomodationId } });
    const accommodationAvailable = await Accomodation.findOne({ where: { id: accomodationId } });
    if (!accommodationAvailable) {
      return res.status(404).json({
        message: res.__('👋,No accommodation with specified id')
      });
    }
    if (!userBooked) {
      return res.status(401).json({
        message: res.__('👋,You can not rate because you have not been to this accommodation')
      });
    }
    if (userRated) {
      return res.status(401).json({
        message: res.__('👋,You have already rated this accommodation')
      });
    }
    const createdRating = await Ratings.create({
      accomodationId,
      ratingValue,
      rater: id,
    });
    return res.status(200).json({
      message: res.__('Rating created successfully'),
      createdRating
    });
  },
  updateRating: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedRating = Ratings.findOne({ where: { id, rater: userId } });
    if (!updatedRating) {
      return res
        .status(404)
        .json({ message: res.__('No rating with that id') });
    }
    await Ratings.update({
      ratingValue: req.body.ratingValue || updatedRating.ratingValue,
    }, {
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ message: res.__('Rating updated successfully') });
  },
  deleteRating: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedRating = await Ratings.destroy({
      where: { id, rater: userId }
    });
    if (!deletedRating) {
      return res
        .status(404)
        .json({ message: res.__('No rating with specified id') });
    }
    return res
      .status(200)
      .json({ message: res.__('Rating deleted successfully') });
  },
};
