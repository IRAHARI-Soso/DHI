import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Reset from './pages/Reset';
import DoctorDashboard from './pages/DoctorDashboard';
import Insurancer from './pages/Insurancer';
import Patient from './pages/Patient';
import Claim from './pages/Claim';
import Doctor from './pages/Doctor';
import Login from './pages/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/insurancer" element={<Insurancer />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
