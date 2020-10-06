import template from './template';

require('dotenv/config');

const msg = ({ email, firstName, url }) => ({
  to: email,
  from: process.env.SENDER_EMAIL,
  subject: 'Confirm your Email',
  text: 'Confirm your Email',
  html: template({ firstName, url })
});

export default msg;
