require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin');
const connectDB = require('./db');

const setupAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin account already exists');
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User'
    });

    await admin.save();
    console.log('Admin account created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
};

setupAdmin(); 