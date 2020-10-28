import { UserRole } from '../database/models';
class hostAccomodation {
  async host(req, res, next) {
    if (req.user.roleId === null) {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('You have no Role on Barefoot Nomad')
      });
    }

    const role = await UserRole.findOne({ where: { id: req.user.roleId } });

    if (role.name !== 'HOST') {
      return res.status(400).json({
        status: res.__('failed'),
        msg: res.__('You are not HOST on Barefoot Nomad')
      });
    }
    next();
  }
}
export default hostAccomodation;
