// backend/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-support-assistant';
    
    // Updated connection options with correct SSL configuration
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4  // Force IPv4
    };

    await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    
    if (err.message.includes('IP whitelist')) {
      console.error('Please add your IP address to MongoDB Atlas whitelist:');
      console.error('1. Go to MongoDB Atlas dashboard');
      console.error('2. Click on "Network Access"');
      console.error('3. Click "Add IP Address"');
      console.error('4. Add your current IP or use 0.0.0.0/0 for all IPs (not recommended for production)');
    }
    
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

module.exports = connectDB;
