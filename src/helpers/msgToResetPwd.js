import template from './passwordResetTemplate';

require('dotenv/config');

const msg = ({ email, url, token }) => ({
  to: email,
  from: process.env.SENDER_EMAIL,
  subject: 'Forgot password',
  text: 'Reset password',
  html: template({ url, token })
});

export default msg;
