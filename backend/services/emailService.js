const nodemailer = require('nodemailer');
const { emailUser, emailPass } = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const sendConfirmationEmail = (userEmail, token) => {
  const url = `http://localhost:3000/confirm/${token}`;

  transporter.sendMail({
    from: emailUser,
    to: userEmail,
    subject: 'Confirm Your Email',
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
  }, (err, info) => {
    if (err) {
      console.error('Error sending email', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendConfirmationEmail;
