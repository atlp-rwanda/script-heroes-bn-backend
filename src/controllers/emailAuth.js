/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import { User } from '../database/models';
import { encode } from '../utils/jwtFunctions';

class UserController {
  static async signupUser(req, res) {
    const {
      firstName, lastName, email, phoneNumber, password
    } = req.body;

    const emailExist = await User.findOne({
      where: { email: req.body.email }
    });
    if (emailExist) {
      return res.status(409).json({ message: res.__('Email already exists') });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword
    });
    res.status(201).json({ message: res.__('Successfully registered') });
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    const userAccount = await User.findOne({ where: { email } });
    if (!userAccount) {
      return res
        .status(404)
        .send({ message: res.__('Email or Password is incorrect') });
    }
    const validPass = await bcrypt.compare(password, userAccount.password);
    if (!validPass) {
      return res
        .status(404)
        .send({ message: res.__('Email or Password is incorrect') });
    }

    const token = encode({
      id: userAccount.id,
      firstName: userAccount.firstName,
      lastName: userAccount.lastName,
      email: userAccount.email
    });
    return res.status(200).send({
      message: res.__('Your are successfully loged in'),
      token
    });
  }
}
export default UserController;
