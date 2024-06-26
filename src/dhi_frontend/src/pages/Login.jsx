import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decentralizedHealthInsurance } from '../agent';
import { Modal, Button, Form } from 'react-bootstrap';

const Login = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await decentralizedHealthInsurance.login(username, password);
    if (user) {
      if (user.role === 'Doctor') {
        navigate('/doctorDashboard');
      } else {
        alert('Redirect to appropriate dashboard based on role.');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
