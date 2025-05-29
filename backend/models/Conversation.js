const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channel: String, // whatsapp, messenger, instagram, web
  messages: [
    {
      sender: String, // 'user' or 'bot'
      text: String,
      timestamp: { type: Date, default: Date.now },
      intent: String,
      isGemini: Boolean // true if Gemini handled the response
    }
  ],
  startedAt: { type: Date, default: Date.now },
  endedAt: Date
});

module.exports = mongoose.model('Conversation', conversationSchema);
