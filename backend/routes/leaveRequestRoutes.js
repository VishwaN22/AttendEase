const express = require('express');
const { submitLeaveRequest, getLeaveRequests } = require('../controllers/leaveRequestController');
const authMiddleware= require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware(['employee']) , submitLeaveRequest);
router.get('/', authMiddleware(['admin', 'manager']), getLeaveRequests);

module.exports = router;
