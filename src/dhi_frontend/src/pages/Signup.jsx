import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decentralizedHealthInsurance } from '../agent';
import { Modal, Button, Form } from 'react-bootstrap';

const Signup = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Doctor');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const newUser = { id: Date.now(), username, password, role };
    await decentralizedHealthInsurance.createUser(newUser);
    alert('Signup successful');
    handleClose();
    navigate('/login');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Signup</Modal.Title>
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
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
              <option value="Insurancer">Insurancer</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={handleSignup}>Signup</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
