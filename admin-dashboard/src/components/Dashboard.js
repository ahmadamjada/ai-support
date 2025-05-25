import React, { useEffect, useState } from 'react';
import { orderService, productService } from '../services/api';
import OrdersChart from './OrdersChart';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [orderStats, productStats] = await Promise.all([
          orderService.getOrderStats(),
          productService.getProductStats()
        ]);

        setStats({
          totalOrders: orderStats.totalOrders || 0,
          totalRevenue: orderStats.totalRevenue || 0,
          totalProducts: productStats.totalProducts || 0,
          totalCustomers: orderStats.totalCustomers || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div>
      <h1>Dashboard Overview</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Customers</h3>
          <p className="stat-value">{stats.totalCustomers}</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="dashboard-card">
          <h3>Orders Over Time</h3>
          <OrdersChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 