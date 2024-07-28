// userRoutes.js
const express = require('express');
const { register, getAllEmployees, getUserDetails, getManagers } = require('../controllers/userController');
const { login } = require('../controllers/authController');
const authMiddleware= require('../middlewares/authMiddleware');
const { check } = require('express-validator');
const {getAttendance} = require('../controllers/attendanceController')
const router = express.Router();

// Allow admins to register any role, others can only register as 'employee' or 'manager'
router.post('/register', [
 
  // Validation checks
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('role').isIn(['employee', 'manager', 'admin'])
], register);

// Login route
router.post('/login', login);

// Example protected routes
router.get('/profile', authMiddleware(['admin', 'manager', 'employee']), (req, res) => {
  res.json({ message: 'User profile', user: req.user });
});

router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

router.get('/manager', authMiddleware(['manager']), (req, res) => {
  res.json({ message: 'Manager dashboard' });
});

router.get('/employee', authMiddleware(['employee']), (req, res) => {
  res.json({ message: 'Employee dashboard' });
});

router.get('/users/employees', authMiddleware(['admin', 'manager']), getAllEmployees);
 
// router.get('/users/me',authMiddleware(), getUserDetails);
router.get('/users/me', authMiddleware(), (req, res) => {
  console.log('Received request for /users/me');
  getUserDetails(req, res);
});

router.get('/attendance', authMiddleware(), (req, res) => {
  console.log('Received request for /attendance');
  getAttendance(req, res);
});


router.get('/managers', authMiddleware(['admin']), getManagers);

module.exports = router;
