import { User } from '../database/models';
import { decode } from '../utils/jwtFunctions';

export default async (req, res) => {
  const { token } = req.params;
  const user = decode(token);
  const emailExist = await User.findOne({
    where: { email: user.email }
  });
  if (!emailExist) {
    return res.status(409).json({ message: res.__('Email does not exist') });
  }
  const result = await User.update(
    { isVerified: true },
    { where: { email: user.email } }
  );
  res.status(200).send({ message: res.__('Your email has been verified'), result });
};
