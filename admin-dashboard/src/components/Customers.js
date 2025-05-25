import React, { useEffect, useState } from 'react';
import { orderService } from '../services/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // For now, we'll get customers from orders
        const orders = await orderService.getOrders();
        const uniqueCustomers = Array.from(
          new Set(orders.map(order => order.customerName))
        ).map(name => {
          const customerOrders = orders.filter(order => order.customerName === name);
          return {
            name,
            totalOrders: customerOrders.length,
            totalSpent: customerOrders.reduce((sum, order) => sum + order.amount, 0),
            lastOrder: new Date(Math.max(...customerOrders.map(o => new Date(o.createdAt))))
          };
        });
        setCustomers(uniqueCustomers);
      } catch (err) {
        setError('Failed to fetch customers');
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1>Customers Management</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.name}>
                <td>{customer.name}</td>
                <td>{customer.totalOrders}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
                <td>{customer.lastOrder.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers; 