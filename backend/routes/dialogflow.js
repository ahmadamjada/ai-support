const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');

// Get chat statistics
router.get('/stats', async (req, res) => {
  try {
    // Get total chats
    const totalChats = await Chat.countDocuments();

    // Calculate average response time
    const avgResponseTime = await Chat.aggregate([
      {
        $group: {
          _id: null,
          avgTime: { $avg: '$responseTime' }
        }
      }
    ]);

    // Calculate success rate (chats with confidence > 0.7)
    const successfulChats = await Chat.countDocuments({ confidence: { $gt: 0.7 } });
    const successRate = totalChats > 0 ? (successfulChats / totalChats) * 100 : 0;

    // Get recent chats
    const recentChats = await Chat.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('query intent responseTime timestamp');

    res.json({
      stats: {
        totalChats,
        avgResponseTime: avgResponseTime[0]?.avgTime || 0,
        successRate: Math.round(successRate),
        satisfactionRate: Math.round(successRate * 0.9) // Assuming 90% of successful chats are satisfactory
      },
      recentChats
    });
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
