// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: Reference to User
  name: String,    // Customer name
  phone: String,   // Customer phone
  email: String,   // Customer email
  address: String, // Shipping address
  product: String, // Product name or ID
  amount: Number,  // Order total or product price
  status: { type: String, default: 'pending' }, // e.g., pending, shipped, delivered
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
