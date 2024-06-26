import React from 'react';

const ClaimTable = () => {
  // Dummy data for demonstration
  const claims = [
    { id: 1, claimNumber: 'CLM001', amount: '$500', status: 'Pending' },
    { id: 2, claimNumber: 'CLM002', amount: '$300', status: 'Approved' },
    { id: 3, claimNumber: 'CLM003', amount: '$700', status: 'Rejected' },
  ];

  return (
    <div>
      <h3>Claim Table</h3>
      <table>
        <thead>
          <tr>
            <th>Claim Number</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.claimNumber}</td>
              <td>{claim.amount}</td>
              <td>{claim.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimTable;
