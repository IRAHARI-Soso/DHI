import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Auth/Login';
import Home from './Auth/Home';
import Signup from './Auth/Signup';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
  );
};

export default App;
