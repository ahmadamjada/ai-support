import React from 'react';
import OrdersChart from './components/OrdersChart';
import ProductPieChart from './components/ProductPieChart';
import OrdersTable from './components/OrdersTable';

function App() {
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to your dashboard! Let’s build something awesome!</p>
      <OrdersChart />
      <ProductPieChart />
      <OrdersTable />
    </div>
  );
}

export default App;
