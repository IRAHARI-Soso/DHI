import React from 'react';
import Navbar from '../Layout/Navbar';
import ClaimTable from './ClaimTable';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h2>Dashboard</h2>
      <p>Welcome to your Dashboard!</p>
      <ClaimTable />
    </div>
  );
};

export default Dashboard;
