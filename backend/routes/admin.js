// routes/admin.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');

// GET /api/orders/stats
router.get('/orders/stats', async (req, res) => {
  try {
    // Group orders by month and count them
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    // Convert to { month: count }
    const monthlyOrders = {};
    stats.forEach(stat => {
      monthlyOrders[stat._id] = stat.count;
    });
    res.json({ monthlyOrders });
  } catch (err) {
    console.error('Error fetching order stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/product-distribution
router.get('/orders/product-distribution', async (req, res) => {
  try {
    const orders = await Order.find();
    const productCount = {};

    orders.forEach(order => {
      const product = order.product;
      productCount[product] = (productCount[product] || 0) + 1;
    });

    res.json(productCount);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/recent
router.get('/orders/recent', async (req, res) => {
  try {
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);
    res.json(recentOrders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    // Get orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        ordersByStatus: ordersByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {})
      },
      recentOrders: recentOrders.map(order => ({
        id: order._id,
        user: order.user,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

module.exports = router;
