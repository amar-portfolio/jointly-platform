const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes Connection
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes')); 
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); 
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));


// Test Route
app.get('/', (req, res) => {
  res.json({ message: "Joinly Backend API is running successfully!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});