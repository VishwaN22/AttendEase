const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
