class RequestMiddleware {
  static async getRequest(req, res, next) {
    const { user } = req;
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: res.__('Request id must be a number')
      });
    }
    const request = await user.getRequests({
      where: { id }
    });

    if (!request || !request.length) {
      return res.status(404).json({
        error: res.__('Request not found')
      });
    }

    req.request = request;
    next();
  }
}
export default RequestMiddleware;
