import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Changed from useHistory to useNavigate

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here, e.g., API call
    console.log('Signing up with:', email, password);
    // Redirect to dashboard after successful signup
    history.push('/dashboard');
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
