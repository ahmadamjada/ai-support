const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  intent: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  responseTime: {
    type: Number,
    required: true
  },
  feedback: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Chat', chatSchema); 