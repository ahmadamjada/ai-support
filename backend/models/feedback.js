const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  rating: Number, // 1-5
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);