// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();  // Changed from useHistory to useNavigate

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Implement login logic here, e.g., API call
//     console.log('Logging in with:', email, password);
//     // Redirect to dashboard after successful login
//     navigate('/dashboard');  // Changed from history.push to navigate
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <br />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;




// import React, { useState, useEffect } from 'react';
// import { AuthClient } from "@dfinity/auth-client";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { dhi_backend } from 'declarations/dhi_backend';

// function Login() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [principal, setPrincipal] = useState(null);

//   const authClientPromise = AuthClient.create();

//   const signIn = async () => {
//     const authClient = await authClientPromise;

//     const internetIdentityUrl = import.meta.env.PROD
//       ? undefined
//       : `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`;

//     await new Promise((resolve) => {
//       authClient.login({
//         identityProvider: internetIdentityUrl,
//         onSuccess: () => resolve(undefined),
//       });
//     });

//     const identity = authClient.getIdentity();
//     updateIdentity(identity);
//     setIsLoggedIn(true);
//   };

//   const signOut = async () => {
//     const authClient = await authClientPromise;
//     await authClient.logout();
//     updateIdentity(null);
//     setIsLoggedIn(false);
//   };

//   const updateIdentity = (identity) => {
//     if (identity) {
//       setPrincipal(identity.getPrincipal());
//       Actor.agentOf(dhi_backend).replaceIdentity(identity);
//     } else {
//       setPrincipal(null);
//     }
//   };

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const authClient = await authClientPromise;
//       const isAuthenticated = await authClient.isAuthenticated();
//       setIsLoggedIn(isAuthenticated);
//       if (isAuthenticated) {
//         const identity = authClient.getIdentity();
//         updateIdentity(identity);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   return (
//     <main>
//       <h1>Welcome back again to  Decentralized Health Insurance System</h1>
//       {isLoggedIn ? (
//         <>
//           <p>Welcome back, {principal ? principal.toString() : "User"}!</p>
//           <button onClick={signOut}>Sign Out</button>
//         </>
//       ) : (
//         <button onClick={signIn}>Sign In</button>
//       )}
//     </main>
//   );
// }

// export default Login;



import React, { useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { dhi_backend } from 'declarations/dhi_backend';
import './index.scss';

function Login() {
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
  };

  const updateIdentity = (identity) => {
    if (identity) {
      setPrincipal(identity.getPrincipal());
      // Create Actor with HttpAgent
      const agent = new HttpAgent();
      const actor = Actor.createActor(dhi_backend, { agent: agent });
      dhi_backend.setActor(actor); // Set the actor for example_backend
    } else {
      setPrincipal(null);
      dhi_backend.setActor(null); // Clear the actor
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
        const storedMembers = localStorage.getItem('members');
        const storedClaims = localStorage.getItem('claims');
        if (storedMembers && storedClaims) {
          setMembers(JSON.parse(storedMembers));
          setClaims(JSON.parse(storedClaims));
        } else {
          fetchMembers();
          fetchClaims();
        }
      }
    };
  
    checkLoginStatus();
  }, []);
  
  

  const fetchMembers = async () => {
    try {
      const membersList = await dhi_backend.getMembers();
      console.log("Fetched members:", membersList);
      setMembers(membersList);
      localStorage.setItem('members', JSON.stringify(membersList)); // Store fetched students in local storage
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };
  
  const fetchClaims = async () => {
    try {
      const claimsList = await dhi_backend.getClaims();
      console.log("Fetched claims:", claimsList);
      setClaims(claimsList);
      localStorage.setItem('claims', JSON.stringify(claimsList)); // Store fetched courses in local storage
    } catch (error) {
      console.error("Failed to fetch claims:", error);
    }
  };
  

  const fetchMemberClaims = async (memberId) => {
    try {
      const memberClaimsList = await dhi_backend.getMemberClaims(memberId);
      console.log("Fetched member claims:", memberClaimsList);
      setMemberClaims(memberClaimsList);
    } catch (error) {
      console.error("Failed to fetch member claims:", error);
    }
  };

  const handleAddMember = async (event) => {
    event.preventDefault();
    console.log("Submitting member:", newMember);

    try {
      await dhi_backend.addMember(newMember.firstName, newMember.lastName, newMember.address,newMember.contact);
      console.log("Member added successfully");
      setNewMember({ firstName: '', lastName: '', address: '', contact: '' });
      setShowAddMemberForm(false);
      fetchMembers(); // Fetch members after adding a new student
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleAddClaim = async (event) => {
    event.preventDefault();
    console.log("Submitting claim:", newClaim);

    try {
      await dhi_backend.addClaim(newClaim.claimId, newClaim.claimName);
      console.log("Claim added successfully");
      setNewClaim({ claimId: '', claimName: '' });
      setShowAddClaimForm(false);
      fetchClaims(); // Fetch courses after adding a new course
    } catch (error) {
      console.error("Failed to add claim:", error);
    }
  };

  const handleAssignClaimToMember = async () => {
    console.log("Assigning claim:", selectedClaimId, "to member:", selectedMemberId);

    try {
      await dhi_backend.assignClaimToMember(selectedMemberId, selectedClaimId);
      console.log("Claim assigned successfully");
      fetchMemberClaims(selectedMemberId); // Fetch student courses after assignment
    } catch (error) {
      console.error("Failed to assign claim:", error);
    }
  };

  return (
    <main>
        <img src="/logo2.svg" alt="DFINITY logo" />
      <h1 className='alert alert-success p-3'>Members and Claims Management (dhi)</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome back, {principal ? principal.toString() : "User"}!</p>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={() => setShowAddMemberForm(true)}>Add New Member</button>
          <button onClick={() => setShowAddClaimForm(true)}>Add New Claim</button>
          <button onClick={fetchMembers}>Fetch Members</button>
          <button onClick={fetchClaims}>Fetch Claims</button>
          <h2 className='alert alert-primary p-2'>Members Available List</h2>
          <ul>
            {members.map((members, index) => (
              <li key={index}>
                {member.firstName} {member.lastName} {member.address} - {member.contact}
              </li>
            ))}
          </ul>
          {showAddMemberForm && (
            <form onSubmit={handleAddMember}>
              <label>
                First Name:
                <input
                  type="text"
                  value={newMember.firstName}
                  onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={newMember.lastName}
                  onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={newMember.address}
                  onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                  required
                />
              </label>
              <label>
                Contact / Tel:
                <input
                  type="text"
                  value={newMember.contact}
                  onChange={(e) => setNewMember({ ...newMember, contact: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className='btn btn-primary'>Save Change</button>
            </form>
          )}
          <h2 className='alert alert-primary p-2'>Claims Available List</h2>
          <ul>
            {claims.map((claim, index) => (
              <li key={index}>
                {claim.claimId} - {claim.claimName}
              </li>
            ))}
          </ul>
          {showAddClaimForm && (
            <form onSubmit={handleAddClaim}>
              <label>
                Claim ID:
                <input
                  type="text"
                  value={newClaim.claimId}
                  onChange={(e) => setNewClaim({ ...newClaim, claimId: e.target.value })}
                  required
                />
              </label>
              <label>
                Claim Name:
                <input
                  type="text"
                  value={newClaim.claimName}
                  onChange={(e) => setNewClaim({ ...newClaim, claimName: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className='btn btn-primary'>Save Change</button>
            </form>
          )}
          <h2 className='alert alert-primary p-2'>Assign Claims to Members</h2>
          <label>
            Select Member:
            <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
              <option value="">Select a Member</option>
              {members.map((member, index) => (
                <option key={index} value={member.firstName + ' ' + member.lastName}>{member.firstName} {member.lastName}</option>
              ))}
            </select>
          </label>
          <label>
            Select Claim:
            <select value={selectedClaimId} onChange={(e) => setSelectedClaimId(e.target.value)}>
              <option value="">Select a Claim</option>
              {claims.map((claim, index) => (
                <option key={index} value={claim.claimId}>{claim.claimName}</option>
              ))}
            </select>
          </label>
          <button onClick={handleAssignClaimToMembers}>Assign Claim</button>
          {selectedMemberId && (
            <>
              <h2 className='btn btn-success p-3'>Claim for {selectedMemberId}</h2>
              <button onClick={() => fetchMemberClaims(selectedMemberId)}>Fetch Claims for Members</button>
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
        <button onClick={signIn}>Sign In</button>
      )}
    </main>
  );
}

export default Login;
