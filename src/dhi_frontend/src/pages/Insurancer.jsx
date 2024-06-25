import React, { useState, useEffect } from 'react';

const Insurancer = () => {
  const [insurances, setInsurances] = useState([]);
  const [name, setName] = useState('');
  const [coverageDetails, setCoverageDetails] = useState('');

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    // Fetch insurances from the backend
    // Example: const result = await fetchBackend('/api/insurances');
    // setInsurances(result);
  };

  const handleCreateInsurance = async () => {
    const newInsurance = { id: Date.now(), name, coverageDetails };
    // Send newInsurance to the backend
    // await sendToBackend('/api/createInsurance', newInsurance);
    setInsurances([...insurances, newInsurance]);
    setName('');
    setCoverageDetails('');
  };

  return (
    <div>
      <h2>Insurances</h2>
      <ul>
        {insurances.map((insurance) => (
          <li key={insurance.id}>{insurance.name} - {insurance.coverageDetails}</li>
        ))}
      </ul>
      <h3>Create Insurance</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={coverageDetails} onChange={(e) => setCoverageDetails(e.target.value)} placeholder="Coverage Details" />
      <button onClick={handleCreateInsurance}>Create</button>
    </div>
  );
};

export default Insurancer;
