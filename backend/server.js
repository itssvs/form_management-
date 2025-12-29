const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Import database connection
require('./config/db');

// Routes
app.use('/api/auth', require('./modules/auth/routes/authRoutes'));
app.use('/api/user/forms', require('./modules/user/routes/userFormRoutes'));  // NEW
app.use('/api/admin', require('./modules/admin/routes/adminFormRoutes'));    // NEW

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

const PORT = process.env.PORT; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});