import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [managers, setManagers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [adminEmail, setAdminEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch managers list
    axios.get('${process.env.REACT_APP_BACKEND_URL}/api/users/managers', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setManagers(response.data);
    }).catch(error => {
      console.error('Error fetching managers', error);
    });

    // Fetch admin email
    axios.get('${process.env.REACT_APP_BACKEND_URL}/api/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setAdminEmail(response.data.email);
    }).catch(error => {
      console.error('Error fetching admin email', error);
    });
  }, []);

  const handleAttendanceChange = (userId, status) => {
    const updatedAttendance = attendance.map(att =>
      att.userId === userId ? { ...att, status } : att
    );
    setAttendance(updatedAttendance);
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const attendanceData = managers.map(manager => ({
      userId: manager._id,
      date: selectedDate,
      status: attendance.find(att => att.userId === manager._id)?.status || 'present'
    }));

    try {
      const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/attendance/mark-admin', attendanceData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  useEffect(() => {
    const initialAttendance = managers.map(manager => ({
      userId: manager._id,
      status: 'present'
    }));
    setAttendance(initialAttendance);
  }, [managers]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {adminEmail}</p>

      <section>
        <h2>Mark Manager Attendance</h2>
        <div className="date-selection">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <form onSubmit={handleAttendanceSubmit}>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {managers.map(manager => (
                <tr key={manager._id}>
                  <td>{manager.email}</td>
                  <td>
                    <select
                      value={attendance.find(att => att.userId === manager._id)?.status || 'present'}
                      onChange={(e) => handleAttendanceChange(manager._id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit">Mark Attendance</button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;
