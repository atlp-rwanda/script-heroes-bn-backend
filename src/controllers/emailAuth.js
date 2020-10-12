/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import sgMail from '@sendgrid/mail';
import { User, AccessToken } from '../database/models';
import { encode } from '../utils/jwtFunctions';
import autoMsg from '../helpers/autoemail';

class UserController {
  static async signupUser(req, res) {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const emailExist = await User.findOne({
      where: { email: req.body.email }
    });
    if (emailExist) {
      return res.status(409).json({ message: res.__('Email already exists') });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = encode({ email });
    const url = `${process.env.BACK_END_URL}/${token}`;
    const msg = autoMsg({ email, firstName, url });
    sgMail
      .send(msg)
      .then(async () => {
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hashedPassword
        });
        res.status(201).json({ message: res.__('Successfully registered') });
      })
      .catch((error) => {
        res.status(500).send({ message: res.__('Something went wrong') });
      });
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    const userAccount = await User.findOne({ where: { email } });
    if (!userAccount) {
      return res.status(404).send({ message: res.__('Email or Password is incorrect') });
    }
    const validPass = await bcrypt.compare(password, userAccount.password);
    if (!validPass) {
      return res.status(404).send({ message: res.__('Email or Password is incorrect') });
    }
    if (!userAccount.isVerified) {
      return res.status(401).send({ message: res.__('Your email is not verified!!') });
    }
    // check user has roleId
    const token = encode({
      id: userAccount.id,
      firstName: userAccount.firstName,
      lastName: userAccount.lastName,
      email: userAccount.email,
      roleId: userAccount.roleId
    });

    const saveToken = await AccessToken.create({ token });

    return res.status(200).send({
      message: res.__('Your are successfully loged in'),
      token: saveToken.token
    });
  }

  static async userLogout(req, res) {
    const { 'x-auth-token': token } = req.headers;
    await AccessToken.destroy({ where: { token } });
    res.status(200).json({
      msg: res.__('Loggout success')
    });
  }

  static async hashPassword(adminPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);
    return hashedAdminPassword;
  }
}
export default UserController;
