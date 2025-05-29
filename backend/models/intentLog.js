const mongoose = require('mongoose');

const intentLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  intent: String,
  confidence: Number,
  isFallback: Boolean, // true if Gemini was used
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IntentLog', intentLogSchema);