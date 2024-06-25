import React, { useState, useEffect } from 'react';
import { decentralizedHealthInsurance } from '../agent';

const Claim = () => {
  const [claims, setClaims] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    const result = await decentralizedHealthInsurance.readClaims();
    setClaims(result);
  };

  const handleCreateClaim = async () => {
    const newClaim = { id: Date.now(), patientId: parseInt(patientId), doctorId: parseInt(doctorId), amount: parseInt(amount), status };
    await decentralizedHealthInsurance.createClaim(newClaim);
    setClaims([...claims, newClaim]);
    setPatientId('');
    setDoctorId('');
    setAmount('');
    setStatus('');
  };

  return (
    <div>
      <h2>Claims</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim.id}>{`Patient ID: ${claim.patientId}, Doctor ID: ${claim.doctorId}, Amount: ${claim.amount}, Status: ${claim.status}`}</li>
        ))}
      </ul>
      <h3>Create Claim</h3>
      <input value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" />
      <input value={doctorId} onChange={(e) => setDoctorId(e.target.value)} placeholder="Doctor ID" />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
      <button onClick={handleCreateClaim}>Create</button>
    </div>
  );
};

export default Claim;
