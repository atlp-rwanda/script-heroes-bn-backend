import { Comment, User, Request } from '../database/models';

class commentController {
  static async comment(req, res) {
    const { comment } = req.body;
    const addComment = await Comment.create({
      requestId: req.params.requestId,
      userId: req.user.id,
      comment
    });

    res
      .status(201)
      .json({ message: res.__('Your comment has been created'), addComment });
  }

  static async getAllComments(req, res) {
    const getAllComments = await Comment.findAll({
      include: [{ model: User }, { model: Request }]
    });

    res.status(201).json({
      message: res.__('Successful'),
      comments: getAllComments
    });
  }

  static async getOneComment(req, res) {
    const { id } = req.params;
    const getOneComment = await Comment.findOne({
      where: {
        id
      },
      include: [{ model: User }, { model: Request }]
    });
    if (!getOneComment) {
      return res
        .status(409)
        .json({ message: res.__('Comment does not exist') });
    }
    res.status(200).json({
      message: res.__('Success'),
      comment: getOneComment
    });
  }

  static async deleteComment(req, res) {
    const { id } = req.params;
    await Comment.destroy({
      where: { id }
    });

    res.status(200).json({
      message: res.__('Successfully deleted a comment')
    });
  }

  static async editComment(req, res) {
    const { comment } = req.body;
    const { id } = req.params;
    await Comment.update({ comment }, { where: { id } });

    res.status(200).json({
      message: res.__('Successfully updated a comment')
    });
  }
}

export default commentController;
