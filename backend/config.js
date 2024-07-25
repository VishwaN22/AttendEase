require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  emailSecret: process.env.EMAIL_SECRET,
  mongoURI: process.env.MONGO_URI,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
