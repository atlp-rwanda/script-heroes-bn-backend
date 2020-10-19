import { User } from '../database/models';
import { encode } from '../utils/jwtFunctions';
import msgToReset from '../helpers/msgToResetPwd';
import sendMail from '../helpers/sendMail';

export default {
  async forgot(req, res) {
    const emailExists = await User.findOne({
      where: { email: req.body.email }
    });
    if (!emailExists) {
      return res
        .status(404)
        .json({ err: res.__('Email does NOT exist in our database !!!') });
    }
    const { email } = req.body;
    const token = encode({ email });

    const url = `${process.env.CLIENT_URL}`;
    const msg = msgToReset({ email, url, token });

    try {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'development'
      ) {
        await sendMail(msg);
      }

      res.status(200).json({
        token,
        message: res.__(
          'A link to reset your password has been sent to your email address !!!'
        )
      });
    } catch (error) {
      res.status(400).json({
        err: res.__('Failed in sending Reset password email !!! ', error)
      });
    }
  }
};
