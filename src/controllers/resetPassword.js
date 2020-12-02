import bcrypt from 'bcryptjs';
import { User } from '../database/models';
import { decode } from '../utils/jwtFunctions';

export default {
  async reset(req, res) {
    const token = req.params.theToken;
    try {
      const user = decode(token);
      const emailExists = await User.findOne({
        where: { email: user.email }
      });
      if (req.body.password === req.body.confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        await emailExists.update({ password: hash });
        res.status(200).json({ message: res.__('Password well reset') });
      } else {
        res
          .status(400)
          .json({ error: res.__('The passwords do not match !!!') });
      }
    } catch (err) {
      res.status(404).json({ err: res.__('Invalid token') });
    }
  }
};
