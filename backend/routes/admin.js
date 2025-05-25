// routes/admin.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET /api/orders/stats
router.get('/orders/stats', async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      const orders = await Order.find();
      const monthlyOrders = {};
  
      orders.forEach(order => {
        const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
        monthlyOrders[month] = (monthlyOrders[month] || 0) + 1;
      });
  
      const dates = Object.keys(monthlyOrders);
      const counts = Object.values(monthlyOrders);
  
      res.json({
        totalOrders,
        dates,
        counts,
        monthlyOrders,
      });
    } catch (err) {
      console.error('Error in /orders/stats:', err);  // Add logging here
      res.status(500).json({ error: 'Server error' });
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

module.exports = router;
