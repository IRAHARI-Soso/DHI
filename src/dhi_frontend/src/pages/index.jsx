import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Signup from './Signup';

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginClose = () => setShowLoginModal(false);
  const handleSignupClose = () => setShowSignupModal(false);
  const handleLoginShow = () => setShowLoginModal(true);
  const handleSignupShow = () => setShowSignupModal(true);

  return (
    <div>
      <h1>Decentralized Health Insurance</h1>
      <nav>
        <ul>
          <li><button onClick={handleSignupShow}>Signup</button></li>
          <li><button onClick={handleLoginShow}>Login</button></li>
        </ul>
      </nav>
      <Login show={showLoginModal} handleClose={handleLoginClose} />
      <Signup show={showSignupModal} handleClose={handleSignupClose} />
    </div>
  );
};

export default Index;
