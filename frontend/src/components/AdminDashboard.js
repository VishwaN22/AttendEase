import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendance, setAttendance] = useState({ userId: '', date: '', status: 'present' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/attendance', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setAttendanceData(response.data);
    }).catch(error => {
      console.error('Error fetching attendance data', error);
    });
  }, []);

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('/api/attendance/mark-admin', attendance, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      alert('Attendance marked successfully');
    }).catch(error => {
      console.error('Error marking attendance', error);
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Mark Manager's Attendance</h2>
        <form onSubmit={handleAttendanceSubmit}>
          <input
            type="text"
            placeholder="Manager ID"
            value={attendance.userId}
            onChange={(e) => setAttendance({ ...attendance, userId: e.target.value })}
            required
          />
          <input
            type="date"
            value={attendance.date}
            onChange={(e) => setAttendance({ ...attendance, date: e.target.value })}
            required
          />
          <select
            value={attendance.status}
            onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}
            required
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        <h2>Attendance Records</h2>
        <ul>
          {attendanceData.map((entry, index) => (
            <li key={index}>{entry.date}: {entry.status}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
