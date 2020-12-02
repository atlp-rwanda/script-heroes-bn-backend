import sgMail from '@sendgrid/mail';
import { User } from '../database/models';
import { encode } from '../utils/jwtFunctions';
import msgToReset from '../helpers/msgToResetPwd';

export default {
  async forgot(req, res) {
    const emailExists = await User.findOne({
      where: { email: req.body.email }
    });
    if (!emailExists) {
      return res
        .status(404)
        .json({ err: res.__('Email does not exist in our database') });
    }
    const { email } = req.body;
    const token = encode({ email });

    const url = `${process.env.CLIENT_URL}`;
    const msg = msgToReset({ email, url, token });
    sgMail
      .send(msg)
      .then(async () => {
        res.status(200).json({
          token,
          message: res.__(
            'A link to reset your password has been sent to your email address !!!'
          )
        });
      })
      .catch((err) => {
        res.status(400).send({ err });
      });
  }
};
