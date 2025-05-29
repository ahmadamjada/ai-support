const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  socialId: String, // For WhatsApp/FB/Instagram user IDs
  channel: String,  // e.g., 'whatsapp', 'messenger', 'instagram'
  language: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);