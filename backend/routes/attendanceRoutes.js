const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/mark', authMiddleware(['manager']), markAttendance); // Managers mark attendance for employees
router.post('/mark-admin', authMiddleware(['admin']), markAttendance); // Admins mark attendance for managers
router.get('/', authMiddleware(), getAttendance);

module.exports = router;
