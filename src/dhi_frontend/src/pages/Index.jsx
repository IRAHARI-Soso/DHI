// src/pages/Index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => (
  <div>
    <h1>Decentralized Health Insurance</h1>
    <nav>
      <ul>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/reset">Reset Password</Link></li>
        <li><Link to="/doctorDashboard">Doctor Dashboard</Link></li>
        <li><Link to="/insurancer">Insurancer</Link></li>
        <li><Link to="/patient">Patient</Link></li>
        <li><Link to="/claim">Claim</Link></li>
        <li><Link to="/doctor">Doctor</Link></li>
      </ul>
    </nav>
  </div>
);

export default Index;
