import React, { useState, useEffect } from 'react';
import { decentralizedHealthInsurance } from '../agent';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const result = await decentralizedHealthInsurance.readDoctors();
    setDoctors(result);
  };

  const handleCreateDoctor = async () => {
    const newDoctor = { id: Date.now(), name, specialty };
    await decentralizedHealthInsurance.createDoctor(newDoctor);
    setDoctors([...doctors, newDoctor]);
    setName('');
    setSpecialty('');
  };

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.name} - {doctor.specialty}</li>
        ))}
      </ul>
      <h3>Create Doctor</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Specialty" />
      <button onClick={handleCreateDoctor}>Create</button>
    </div>
  );
};

export default Doctor;
