import Op from 'sequelize';
import { isNull } from 'underscore';
import { Accomodation, Reaction, Room } from '../database/models';

class reactionController {
                                /* Like function*/
  static async likes(req, res) {
    const { liked, unliked, userId, accomodationId } = req.body;

    //Check if user ever booked that in that accomodation
    const userBooked = await Room.findOne({
      where: {
        UserId: req.user.id,
        accomodationId: req.body.accomodationId
      }
    });

    //Check if user already reacted accomodation
    const userReacted = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId
      }
    });

    //Check if user unliked accomodation
    const unlikedReaction = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId,
        unliked: true,
        liked: false
      }
    });

    //Check if user already liked accomodation
    const trueReaction = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId,
        liked: true,
        unliked: false
      }
    });

    //Check if user has undone reaction accomodation
    const falseReaction = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId,
        liked: false,
        unliked: false
      }
    });

    //If user has never booked
    if (!userBooked) {
      return res.status(400).json({
        error: res.__('You have never booked that accomodation')
      });
    }

    //If user has booked before, check reaction status
    if (userBooked) {
      if (userReacted) {
        if (unlikedReaction) {
          const undoLike = await userReacted.update({
            liked: true,
            unliked: false
          });

          //Count likes and unlikes for that accomodation
          const countLikes = await Reaction.findAndCountAll({
            where: { liked: true, accomodationId: req.body.accomodationId }
          });
          const countUnlikes = await Reaction.findAndCountAll({
            where: { unliked: true, accomodationId: req.body.accomodationId }
          });

          return res.status(201).json({
            message: res.__('Accomodation liked'),
            likes: countLikes.count,
            unlikes: countUnlikes.count
          });
        }
        if (trueReaction) {
          const undoLike = await userReacted.update({
            liked: false
          });

          //Count likes and unlikes for that accomodation
          const countLikes = await Reaction.findAndCountAll({
            where: { liked: true, accomodationId: req.body.accomodationId }
          });
          const countUnlikes = await Reaction.findAndCountAll({
            where: { unliked: true, accomodationId: req.body.accomodationId }
          });

          return res.status(201).json({
            message: res.__('Like undone'),
            likes: countLikes.count,
            unlikes: countUnlikes.count
          });
        }
        if (falseReaction) {
          const redoLike = await userReacted.update({
            liked: true
          });

          //Count likes and unlikes for the accomodation
          const countLikes = await Reaction.findAndCountAll({
            where: { liked: true, accomodationId: req.body.accomodationId }
          });
          const countUnlikes = await Reaction.findAndCountAll({
            where: { unliked: true, accomodationId: req.body.accomodationId }
          });

          return res.status(201).json({
            message: res.__('Reliked successfully'),
            likes: countLikes.count,
            unlikes: countUnlikes.count
          });
        }
      }
      if (!userReacted) {
        const newLike = await Reaction.create({
          accomodationId,
          liked: true,
          unlike: false,
          userId: req.user.id
        });

        //Count likes and unlikes for the accomodation
        const countLikes = await Reaction.findAndCountAll({
          where: { liked: true, accomodationId: req.body.accomodationId }
        });
        const countUnlikes = await Reaction.findAndCountAll({
          where: { unliked: true, accomodationId: req.body.accomodationId }
        });

        return res.status(201).json({
          message: res.__('Accomodation liked successfully'),
          likes: countLikes.count,
          unlikes: countUnlikes.count
        });
      }
    }
  }

                                  /* Unlike function */          
  static async unlike(req, res) {
    const { liked, unliked, userId, accomodationId } = req.body;

    //Check if user already reacted to accomodation
    const userReacted = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId
      }
    });

    //Check if user liked accomodation
    const likedReaction = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId,
        unliked: false,
        liked: true
      }
    });

    const trueReaction = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId,
        unliked: true,
        liked: false
      }
    });
    const falseReaction = await Reaction.findOne({
      where: {
        userId: req.user.id,
        accomodationId: req.body.accomodationId,
        unliked: false,
        liked: false
      }
    });

    //Check if user ever booked that in that accomodation
    const userBooked = await Room.findOne({
      where: {
        UserId: req.user.id,
        accomodationId: req.body.accomodationId
      }
    });

    //If user has never booked
    if (!userBooked) {
      return res.status(400).json({
        error: res.__('You have never booked that accomodation')
      });
    }

    //If user has booked before, check reaction status
    if (userBooked) {
      if (userReacted) {
        if (likedReaction) {
          const undoLike = await userReacted.update({
            liked: false,
            unliked: true
          });
        }

        if (trueReaction) {
          const undoLike = await userReacted.update({
            unliked: false
          });

          //Count likes and unlikes for the accomodation
          const countLikes = await Reaction.findAndCountAll({
            where: { liked: true, accomodationId: req.body.accomodationId }
          });
          const countUnlikes = await Reaction.findAndCountAll({
            where: { unliked: true, accomodationId: req.body.accomodationId }
          });

          return res.status(201).json({
            message: res.__('Re-unliked accomodation'),
            likes: countLikes.count,
            unlikes: countUnlikes.count
          });
        }

        if (falseReaction) {
          const redoLike = await userReacted.update({
            unliked: true
          });
          
           //Count likes and unlikes for the accomodation
           const countLikes = await Reaction.findAndCountAll({
            where: { liked: true, accomodationId: req.body.accomodationId }
          });
          const countUnlikes = await Reaction.findAndCountAll({
            where: { unliked: true, accomodationId: req.body.accomodationId }
          });

          return res.status(201).json({
            message: res.__('Unliked accomodation'),
            likes: countLikes.count,
            unlikes: countUnlikes.count
          });
        }
      }

      if (!userReacted) {
        const newLike = await Reaction.create({
          accomodationId,
          unliked: true,
          liked: false,
          userId: req.user.id
        });

         //Count likes and unlikes for the accomodation
         const countLikes = await Reaction.findAndCountAll({
          where: { liked: true, accomodationId: req.body.accomodationId }
        });
        const countUnlikes = await Reaction.findAndCountAll({
          where: { unliked: true, accomodationId: req.body.accomodationId }
        });

        return res.status(201).json({
          message: res.__('Accomodation unliked successfully'),
          likes: countLikes.count,
          unlikes: countUnlikes.count
        });
      }
    }
  }
}

export default reactionController;
