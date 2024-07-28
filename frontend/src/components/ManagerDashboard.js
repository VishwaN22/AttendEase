import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({ userId: '', date: '', status: 'present' });
  const [managerEmail, setManagerEmail] = useState('');

  // Fetch employees and manager email on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Fetch employees list
    axios.get('/api/users/employees', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setEmployees(response.data);
    }).catch(error => {
      console.error('Error fetching employees', error);
    });
    
    // Fetch manager email
    axios.get('/api/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setManagerEmail(response.data.email);
    }).catch(error => {
      console.error('Error fetching manager email', error);
    });
  }, []);

  // Handle attendance submission
  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('/api/attendance/mark', attendance, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      alert('Attendance marked successfully');
    }).catch(error => {
      console.error('Error marking attendance', error);
    });
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <p>Welcome, {managerEmail}</p>
      
      <section>
        <h2>Mark Employee Attendance</h2>
        <form onSubmit={handleAttendanceSubmit}>
          <select
            value={attendance.userId}
            onChange={(e) => setAttendance({ ...attendance, userId: e.target.value })}
            required
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.email}
              </option>
            ))}
          </select>
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
          </select>
          <button type="submit">Mark Attendance</button>
        </form>
      </section>
    </div>
  );
};

export default ManagerDashboard;
