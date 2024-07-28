const Attendance = require('../models/Attendance');

// exports.markAttendance = async (req, res) => {
//   const { userId, date, status } = req.body;

//   try {
//     const attendance = new Attendance({
//       userId,
//       date,
//       status,
//     });

//     await attendance.save();
//     res.json({ message: 'Attendance marked successfully' });
//   } catch (error) {
//     console.error('Error marking attendance', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.markAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;

    // Validate the incoming data
    if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({ message: 'Invalid attendance data' });
    }

    // Save each attendance record
    for (const record of attendanceData) {
      const { userId, date, status } = record;
      if (!userId || !date || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const attendance = new Attendance({
        userId,
        date,
        status,
      });

      await attendance.save();
    }

    res.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required' });
    }

    const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JS
    const endDate = new Date(year, month, 0); // Last day of the month

    const attendance = await Attendance.find({
      userId: userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance', error);
    res.status(500).json({ message: 'Server error' });
  }
};
