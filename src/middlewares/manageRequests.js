import { Request, User } from '../database/models';
class ManagerequestsMiddleware {
  static async makeDecision(req, res, next) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: res.__('Request id must be a number')
      });
    }
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({
        error: res.__('Request not found')
      });
    }
    const requesterId = request.userId;
    const requester = await User.findByPk(requesterId);
    if (requester.linemanager != req.user.id) {
      return res.status(401).json({
        error: res.__('Unauthorized request')
      });
    }
    const decision = req.params.decision;
    if (decision == 'approve' || decision == 'decline') {
      return next();
    } else {
      return res.status(400).json({
        error: res.__('Decision must be one of approve or decline')
      });
    }
  }
}
export default ManagerequestsMiddleware;
