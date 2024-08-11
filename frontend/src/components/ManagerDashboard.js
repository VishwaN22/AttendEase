


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [managerEmail, setManagerEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/employees`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setEmployees(response.data);
    }).catch(error => {
      console.error('Error fetching employees', error);
    });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setManagerEmail(response.data.email);
    }).catch(error => {
      console.error('Error fetching manager email', error);
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
    const attendanceData = employees.map(employee => ({
      userId: employee._id,
      date: selectedDate,
      status: attendance.find(att => att.userId === employee._id)?.status || 'present'
    }));

    console.log('Sending attendance data:', attendanceData); // Log the data being sent

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/attendance/mark`, attendanceData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  useEffect(() => {
    const initialAttendance = employees.map(employee => ({
      userId: employee._id,
      status: 'present'
    }));
    setAttendance(initialAttendance);
  }, [employees]);


  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="manager-dashboard">
      <h1>Manager Dashboard</h1>
      <button onClick={handleLogout} style={{ float: 'right', marginTop: '-50px' }}>Logout</button>
      
      <p>Welcome, {managerEmail}</p>

      <section>
        <h2>Mark Employee Attendance</h2>
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
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td>{employee.email}</td>
                  <td>
                    <select
                      value={attendance.find(att => att.userId === employee._id)?.status || 'present'}
                      onChange={(e) => handleAttendanceChange(employee._id, e.target.value)}
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

export default ManagerDashboard;
