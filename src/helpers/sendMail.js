import sgMail from '@sendgrid/mail';

const sendMail = (message) => sgMail.send(message);

export default sendMail;
