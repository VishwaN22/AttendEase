// controllers/userController.js
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password, role });
    await newUser.save();

    // Determine redirect URL based on role
    const redirectUrl = {
      admin: '/admin',
      manager: '/manager',
      employee: '/employee'
    }[role] || '/login'; // Default to login if role is not found
    console.log(`Received role: ${role}`);

    res.status(201).json({ message: 'User registered successfully', redirectUrl });
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register };






