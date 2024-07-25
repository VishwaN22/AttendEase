// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { jwtSecret } = require('../config');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });

    // Determine redirect URL based on role
    const redirectUrl = {
      admin: '/admin',
      manager: '/manager',
      employee: '/employee'
    }[user.role];

    res.json({ token, user: { id: user._id, role: user.role }, redirectUrl });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };



