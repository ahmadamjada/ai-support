// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const webhookRoute = require('./routes/webhook');
const connectDB = require('./db');
const Order = require('./models/order'); // ✅ This imports the model
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// App initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/webhook', webhookRoute);
app.use('/api', adminRoutes);
app.use('/api/auth', authRoutes);

// Routes
app.use('/api', require('./routes/admin'));

// Test route
app.get('/', (req, res) => {
  res.send('🎉 AI Support Assistant Backend is Running!');
});

// In server.js
app.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});

