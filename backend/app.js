const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRequestRoutes = require('./routes/leaveRequestRoutes');
const { mongoURI } = require('./config.js');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'https://attend-ease-phi.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave-request', leaveRequestRoutes);
app.use('api/attendance/mark',attendanceRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



  
// error handlers
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
