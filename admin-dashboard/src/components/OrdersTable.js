import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders/recent') // API endpoint to fetch recent orders
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Recent Orders</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{borderBottom: '1px solid #ddd', padding: '8px'}}>Name</th>
            <th style={{borderBottom: '1px solid #ddd', padding: '8px'}}>Product</th>
            <th style={{borderBottom: '1px solid #ddd', padding: '8px'}}>Phone</th>
            <th style={{borderBottom: '1px solid #ddd', padding: '8px'}}>Email</th>
            <th style={{borderBottom: '1px solid #ddd', padding: '8px'}}>Address</th>
            <th style={{borderBottom: '1px solid #ddd', padding: '8px'}}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td style={{borderBottom: '1px solid #ddd', padding: '8px'}}>{order.name}</td>
              <td style={{borderBottom: '1px solid #ddd', padding: '8px'}}>{order.product}</td>
              <td style={{borderBottom: '1px solid #ddd', padding: '8px'}}>{order.phone}</td>
              <td style={{borderBottom: '1px solid #ddd', padding: '8px'}}>{order.email}</td>
              <td style={{borderBottom: '1px solid #ddd', padding: '8px'}}>{order.address}</td>
              <td style={{borderBottom: '1px solid #ddd', padding: '8px'}}>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
