import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorDashboard = () => {
  return (
    <div className="d-flex">
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Profile</div>
        <div className="list-group list-group-flush">
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target="#claimsDropdown"
            aria-expanded="false"
            aria-controls="claimsDropdown"
          >
            Manage Claims
          </a>
          <div className="collapse" id="claimsDropdown">
            <a href="#" className="list-group-item list-group-item-action">Add</a>
            <a href="#" className="list-group-item list-group-item-action">View Table</a>
            <a href="#" className="list-group-item list-group-item-action">Edit</a>
            <a href="#" className="list-group-item list-group-item-action">Delete</a>
          </div>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target="#doctorsDropdown"
            aria-expanded="false"
            aria-controls="doctorsDropdown"
          >
            Manage Doctors
          </a>
          <div className="collapse" id="doctorsDropdown">
            <a href="#" className="list-group-item list-group-item-action">Add</a>
            <a href="#" className="list-group-item list-group-item-action">View Table</a>
            <a href="#" className="list-group-item list-group-item-action">            Edit</a>
            <a href="#" className="list-group-item list-group-item-action">Delete</a>
          </div>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target="#insuranceDropdown"
            aria-expanded="false"
            aria-controls="insuranceDropdown"
          >
            Manage Insurance
          </a>
          <div className="collapse" id="insuranceDropdown">
            <a href="#" className="list-group-item list-group-item-action">Add</a>
            <a href="#" className="list-group-item list-group-item-action">View Table</a>
            <a href="#" className="list-group-item list-group-item-action">Edit</a>
            <a href="#" className="list-group-item list-group-item-action">Delete</a>
          </div>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target="#patientsDropdown"
            aria-expanded="false"
            aria-controls="patientsDropdown"
          >
            Manage Patients
          </a>
          <div className="collapse" id="patientsDropdown">
            <a href="#" className="list-group-item list-group-item-action">Add</a>
            <a href="#" className="list-group-item list-group-item-action">View Table</a>
            <a href="#" className="list-group-item list-group-item-action">Edit</a>
            <a href="#" className="list-group-item list-group-item-action">Delete</a>
          </div>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target="#usersDropdown"
            aria-expanded="false"
            aria-controls="usersDropdown"
          >
            Manage Users
          </a>
          <div className="collapse" id="usersDropdown">
            <a href="#" className="list-group-item list-group-item-action">Add</a>
            <a href="#" className="list-group-item list-group-item-action">View Table</a>
            <a href="#" className="list-group-item list-group-item-action">Edit</a>
            <a href="#" className="list-group-item list-group-item-action">Delete</a>
          </div>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target="#fraudDetectionDropdown"
            aria-expanded="false"
            aria-controls="fraudDetectionDropdown"
          >
            Manage Fraud Detection
          </a>
          <div className="collapse" id="fraudDetectionDropdown">
            <a href="#" className="list-group-item list-group-item-action">Add</a>
            <a href="#" className="list-group-item list-group-item-action">View Table</a>
            <a href="#" className="list-group-item list-group-item-action">Edit</a>
            <a href="#" className="list-group-item list-group-item-action">Delete</a>
          </div>
          <a href="#" className="list-group-item list-group-item-action bg-light">Logout</a>
        </div>
      </div>
      <div className="container-fluid">
        <h2>Doctor Dashboard</h2>
        <p>Welcome to the doctor dashboard. Here you can manage your appointments, patients, and claims.</p>
        {/* Add more functionality as needed */}
      </div>
    </div>
  );
};

export default DoctorDashboard;

