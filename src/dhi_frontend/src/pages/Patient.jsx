import React, { useState, useEffect } from 'react';
import { decentralizedHealthInsurance } from '../agent';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const result = await decentralizedHealthInsurance.readPatients();
    setPatients(result);
  };

  const handleCreatePatient = async () => {
    const newPatient = { id: Date.now(), name, age: parseInt(age), insuranceNumber };
    await decentralizedHealthInsurance.createPatient(newPatient);
    setPatients([...patients, newPatient]);
    setName('');
    setAge('');
    setInsuranceNumber('');
  };

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.name} - {patient.age} - {patient.insuranceNumber}</li>
        ))}
      </ul>
      <h3>Create Patient</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <input value={insuranceNumber} onChange={(e) => setInsuranceNumber(e.target.value)} placeholder="Insurance Number" />
      <button onClick={handleCreatePatient}>Create</button>
    </div>
  );
};

export default Patient;
