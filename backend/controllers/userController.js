// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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



    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });


    // Determine redirect URL based on role
    const redirectUrl = {
      admin: '/admin',
      manager: '/manager',
      employee: '/employee'
    }[role] || '/login'; // Default to login if role is not found
    console.log(`Received role: ${role}`);

    res.status(201).json({ message: 'User registered successfully', redirectUrl, user: {role},token });
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('email');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//get manager details

const getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: 'manager' }).select('email');
    res.json(managers);
  } catch (error) {
    console.error('Error fetching managers', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch current user details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('email');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, getAllEmployees, getUserDetails, getManagers };






