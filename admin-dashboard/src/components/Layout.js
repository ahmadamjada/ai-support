import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/api';

const Layout = ({ children }) => {
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="nav-header">
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="nav-links">
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === '/orders' ? 'active' : ''}>
            <Link to="/orders">Orders</Link>
          </li>
          <li className={location.pathname === '/products' ? 'active' : ''}>
            <Link to="/products">Products</Link>
          </li>
          <li className={location.pathname === '/customers' ? 'active' : ''}>
            <Link to="/customers">Customers</Link>
          </li>
        </ul>
        <div className="nav-footer">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 