import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { dhi_backend } from 'declarations/dhi_backend';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [members, setMembers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [memberClaims, setMemberClaims] = useState([]);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showAddClaimForm, setShowAddClaimForm] = useState(false);
  const [newMember, setNewMember] = useState({ firstName: '', lastName: '', address: '', contact: '' });
  const [newClaim, setNewClaim] = useState({ claimId: '', claimName: '' });
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedClaimId, setSelectedClaimId] = useState('');
  const navigate = useNavigate();
  // Assuming this is the relevant section of Login.jsx
  const [actor, setActor] = useState(null);

  const authClientPromise = AuthClient.create();

  const signIn = async () => {
    const authClient = await authClientPromise;
    const internetIdentityUrl = process.env.NODE_ENV === 'production'
      ? undefined
      : `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => resolve(undefined),
      });
    });

    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setIsLoggedIn(true);
  };

  const signOut = async () => {
    const authClient = await authClientPromise;
    await authClient.logout();
    updateIdentity(null);
    setIsLoggedIn(false);
  };

  const updateIdentity = (identity) => {
    if (identity) {
      setPrincipal(identity.getPrincipal());
      const agent = new HttpAgent({ identity });
      if (process.env.NODE_ENV !== 'production') {
        agent.fetchRootKey().catch(err => {
          console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
          console.error(err);
        });
      }
      const actor = Actor.createActor(dhi_backend_idl, { agent, canisterId: dhi_backend.did });
      setActor(actor);
    } else {
      setPrincipal(null);
      setActor(null);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const authClient = await authClientPromise;
      const isAuthenticated = await authClient.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
      if (isAuthenticated) {
        const identity = authClient.getIdentity();
        updateIdentity(identity);
      }
    };

    checkLoginStatus();
  }, [authClientPromise]);

  const fetchMembers = async () => {
    try {
      const membersList = await dhi_backend.getMembers();
      setMembers(membersList);
      localStorage.setItem('members', JSON.stringify(membersList));
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const fetchClaims = async () => {
    try {
      const claimsList = await dhi_backend.getClaims();
      setClaims(claimsList);
      localStorage.setItem('claims', JSON.stringify(claimsList));
    } catch (error) {
      console.error("Failed to fetch claims:", error);
    }
  };

  const fetchMemberClaims = async (memberId) => {
    try {
      const memberClaimsList = await dhi_backend.getMemberClaims(memberId);
      setMemberClaims(memberClaimsList);
    } catch (error) {
      console.error("Failed to fetch member claims:", error);
    }
  };

  const handleAddMember = async (event) => {
    event.preventDefault();
    try {
      await dhi_backend.addMember(newMember.firstName, newMember.lastName, newMember.address, newMember.contact);
      setNewMember({ firstName: '', lastName: '', address: '', contact: '' });
      setShowAddMemberForm(false);
      fetchMembers();
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleAddClaim = async (event) => {
    event.preventDefault();
    try {
      await dhi_backend.addClaim(newClaim.claimId, newClaim.claimName);
      setNewClaim({ claimId: '', claimName: '' });
      setShowAddClaimForm(false);
      fetchClaims();
    } catch (error) {
      console.error("Failed to add claim:", error);
    }
  };

  const handleAssignClaimToMember = async () => {
    try {
      await dhi_backend.assignClaimToMember(selectedMemberId, selectedClaimId);
      fetchMemberClaims(selectedMemberId);
    } catch (error) {
      console.error("Failed to assign claim:", error);
    }
  };

  return (
   
    <main className='container-fluid p-3'>
     
      <h1 className='alert alert-success p-3'>  Members and Claims Management (DHI)</h1>
      {isLoggedIn ? (
        <>
          
          {/* <button onClick={signOut}>Sign Out</button>
          <button onClick={() => setShowAddMemberForm(true)}>Add New Member</button>
          <button onClick={() => setShowAddClaimForm(true)}>Add New Claim</button>
          <button onClick={fetchMembers}>Fetch Members</button>
          <button onClick={fetchClaims}>Fetch Claims</button> */}
          <div className="button-group m-3 p-2 navbar  container-fluid">
      
      <button className="btn btn-primary nav-link" onClick={() => setShowAddMemberForm(true)}>
        <i className="bi bi-person-plus"></i> New Member
      </button>
      <button className="btn btn-primary nav-link" onClick={() => setShowAddClaimForm(true)}>
        <i className="bi bi-file-earmark-plus"></i> New Claim
      </button>
      <button className="btn btn-info nav-link" onClick={fetchMembers}>
        <i className="bi bi-people"></i> Fetch Members
      </button>
      <button className="btn btn-info nav-link" onClick={fetchClaims}>
        <i className="bi bi-file-earmark-text"></i> Fetch Claims
      </button>
      <button className="btn btn-danger nav-link" onClick={signOut}>
        <i className="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>


          <h2 className='alert alert-primary p-2'>Members Available List</h2>
          <ul>
            {members.map((member, index) => (
              <li key={index}>
                {member.firstName} {member.lastName} {member.address} - {member.contact}
              </li>
            ))}
          </ul>
          {showAddMemberForm && (
            <form onSubmit={handleAddMember}>
              <label className='p-3 text-dark'>
                First Name:
                <input
                  type="text"
                  className='form control'
                  value={newMember.firstName}
                  onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                  required
                />
              </label>
              <label className='p-3 text-dark'>
                Last Name:
                <input
                className='form control'
                  type="text"
                  value={newMember.lastName}
                  onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                  required
                />
              </label>
              <label className='p-3 text-dark'>
                Address:
                <input
                className='form control'
                  type="text"
                  value={newMember.address}
                  onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                  required
                />
              </label>
              <label className='p-3 text-dark'>
                Contact:
                <input
                className='form control'
                  type="text"
                  value={newMember.contact}
                  onChange={(e) => setNewMember({ ...newMember, contact: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className='btn btn-primary'>Save Change</button>
            </form>
          )}
          <h2 className='alert alert-primary p-3'>Claims Available List</h2>
          <ul>
            {claims.map((claim, index) => (
              <li key={index}>
                {claim.claimId} - {claim.claimName}
              </li>
            ))}
          </ul>
          {showAddClaimForm && (
            <form onSubmit={handleAddClaim}>
              <label className='p-3 text-dark'>
                Claim ID:
                <input
                  type="text"
                  className='form control'
                  value={newClaim.claimId}
                  onChange={(e) => setNewClaim({ ...newClaim, claimId: e.target.value })}
                  required
                />
              </label>
              <label className='p-3 text-dark'>
                Claim Name:
                <input
                  type="text"
                  className='form control'
                  value={newClaim.claimName}
                  onChange={(e) => setNewClaim({ ...newClaim, claimName: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className='btn btn-primary'>Save Change</button>
            </form>
          )}
          <h2 className='alert alert-primary p-2'>Assign Claims to Members</h2>
          <label className='p-3 text-dark'>
            Select Member:
            <select className='form control' value={selectedMemberId} onChange={(e) => setSelectedMemberId(e.target.value)}>
              <option value="">Select a Member</option>
              {members.map((member, index) => (
                <option key={index} value={member.id}>{member.firstName} {member.lastName}</option>
              ))}
            </select>
          </label>
          <label className='p-3 text-dark'>
            Select Claim:
            <select className='form control' value={selectedClaimId} onChange={(e) => setSelectedClaimId(e.target.value)}>
              <option value="">Select a Claim</option>
              {claims.map((claim, index) => (
                <option key={index} value={claim.claimId}>{claim.claimName}</option>
              ))}
            </select>
          </label>
          <button onClick={handleAssignClaimToMember} className='btn btn-primary'>Assign Claim</button>
          {selectedMemberId && (
            <>
              <h2 className='btn btn-success p-3'>Claims for {selectedMemberId}</h2>
              <button onClick={() => fetchMemberClaims(selectedMemberId)} className='btn btn-info'>Fetch Claims for Member</button>
              <ul>
                {memberClaims.map((claim, index) => (
                  <li key={index}>
                    {claim.claimId} - {claim.claimName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <button onClick={signIn} className='btn btn-primary'>Sign In</button>
      )}
      
    </main>
    
  );
};

export default Login;



