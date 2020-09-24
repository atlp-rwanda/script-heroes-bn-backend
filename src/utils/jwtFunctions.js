import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encode = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

export const decode = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};
