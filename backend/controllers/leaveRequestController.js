const LeaveRequest = require('../models/LeaveRequest');

exports.submitLeaveRequest = async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  try {
    const leaveRequest = new LeaveRequest({
      userId: req.user.userId,
      startDate,
      endDate,
      reason,
    });

    await leaveRequest.save();
    res.json({ message: 'Leave request submitted successfully' });
  } catch (error) {
    console.error('Error submitting leave request', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ userId: req.user.userId });
    res.json(leaveRequests);
  } catch (error) {
    console.error('Error fetching leave requests', error);
    res.status(500).json({ message: 'Server error' });
  }
};
