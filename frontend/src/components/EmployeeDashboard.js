import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [profile, setProfile] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState({ startDate: '', endDate: '', reason: '' });
  const [workReport, setWorkReport] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch profile data
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      setProfile(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error('Error fetching profile data', error);
    });

    // Fetch attendance data for the current month and year
    fetchAttendance(selectedDate.getMonth() + 1, selectedDate.getFullYear());
  }, [selectedDate]);

  const fetchAttendance = (month, year) => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/attendance`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { month, year }
    }).then(response => {
      setAttendance(response.data);
    }).catch(error => {
      console.error('Error fetching attendance data', error);
    });
  };

  const handleLeaveRequestSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/leave-request/submit`, leaveRequest, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      alert('Leave request submitted successfully');
    }).catch(error => {
      console.error('Error submitting leave request', error);
    });
  };

  const handleWorkReportSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/work-report`, { report: workReport }, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      alert('Work report submitted successfully');
    }).catch(error => {
      console.error('Error submitting work report', error);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Redirect to home page
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const attendanceEntry = attendance.find(entry => entry.date === dateString);
      if (attendanceEntry) {
        return attendanceEntry.status === 'present' ? 'react-calendar__tile--present' : 'react-calendar__tile--absent';
      } else if (date.getDay() === 0 || date.getDay() === 6) { // Weekend
        return 'react-calendar__tile--weekend';
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <button onClick={handleLogout} style={{ float: 'right', marginTop: '-50px' }}>Logout</button>
      
      <section>
        <h2>Profile</h2>
        <p>Email: {profile.email}</p>
      </section>
      <section>
        <h2>Attendance</h2>
        <div>
          <label>Month:</label>
          <select
            value={selectedDate.getMonth() + 1}
            onChange={(e) => setSelectedDate(new Date(selectedDate.getFullYear(), e.target.value - 1, 1))}
          >
            {[...Array(12).keys()].map(m => (
              <option key={m + 1} value={m + 1}>{m + 1}</option>
            ))}
          </select>
          <label>Year:</label>
          <input
            type="number"
            value={selectedDate.getFullYear()}
            onChange={(e) => setSelectedDate(new Date(e.target.value, selectedDate.getMonth(), 1))}
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileClassName={getTileClassName}
          tileDisabled={() => true} // Disable interaction with the tiles
        />
      </section>
      <section>
        <h2>Request Leave</h2>
        <form onSubmit={handleLeaveRequestSubmit}>
          <input
            type="date"
            value={leaveRequest.startDate}
            onChange={(e) => setLeaveRequest({ ...leaveRequest, startDate: e.target.value })}
            required
          />
          <input
            type="date"
            value={leaveRequest.endDate}
            onChange={(e) => setLeaveRequest({ ...leaveRequest, endDate: e.target.value })}
            required
          />
          <textarea
            placeholder="Reason"
            value={leaveRequest.reason}
            onChange={(e) => setLeaveRequest({ ...leaveRequest, reason: e.target.value })}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        <h2>Submit Work Report</h2>
        <form onSubmit={handleWorkReportSubmit}>
          <textarea
            placeholder="Work report"
            value={workReport}
            onChange={(e) => setWorkReport(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default EmployeeDashboard;
