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




// Load env variables
dotenv.config();

connectDB();

// App initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/webhook', webhookRoute);
app.use('/api', adminRoutes);



// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB Connected'))
// .catch((err) => console.error('❌ MongoDB Error:', err));

// Routes (temporary test)
app.get('/', (req, res) => {
  res.send('🎉 AI Support Assistant Backend is Running!');
});

// In server.js
app.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});

