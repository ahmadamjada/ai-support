// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const webhookRoute = require('./routes/webhook');
const connectDB = require('./db');
const Order = require('./models/Order'); // ✅ This imports the model
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const dialogflowRoutes = require('./routes/dialogflow');

// Load env variables
dotenv.config();

// App initialization
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://192.168.0.105:3000',
    'https://aisite-92ss8m2wz-ahmadamjadas-projects.vercel.app',
    'https://aisite-nu.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', adminRoutes);
app.use('/api/dialogflow', dialogflowRoutes);
app.use('/webhook', webhookRoute);

// Test route
app.get('/', (req, res) => {
  res.send('🎉 AI Support Assistant Backend is Running!');
});

// Test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'ok',
    timestamp: new Date(),
    database: dbStatus,
    uptime: process.uptime()
  });
});

// Orders route
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});

