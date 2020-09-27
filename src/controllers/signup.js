/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import signupvalidation from '../validations/signup';
import { User } from '../database/models';

// Register User
class signupController {
  async signupUser(req, res) {
    // Validate register before submitting
    const {
      firstName, lastName, email, phoneNumber, password
    } = req.body;
    const { error } = signupvalidation(req.body);
    if (error) {
      return res.status(400).json({ err: error.details[0].message });
    }

    // Checking If email already exists

    const emailExist = await User.findOne({
      where: { email: req.body.email }
    });
    if (emailExist) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hashing Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new User

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    });
    res.status(201).json({ message: 'Successfully registered' });
  }
}
export default signupController;
