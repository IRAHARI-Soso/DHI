import React, { useState } from 'react';

const Reset = () => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    // Add logic to handle password reset, e.g., sending data to backend
    console.log('Reset Password for', { email });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
};

export default Reset;
