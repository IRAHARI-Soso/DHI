import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Handle click events for DHI and Features
  const handleClick = (event, section) => {
    event.preventDefault();
    alert(`Clicked on ${section}`);
  };

  return (
    <div className='container-fluid p-3 mt-5'>
      <div className="container p-3 m-3">
        <header className='container-fluid p-3 text-dark'>
          <nav className="navbar navbar-expand-sm navbar-light text-primary">
            <a className="navbar-brand" href="#">DHI</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse container-fluid" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/features">Features</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        
        <p className='alert alert-primary p-3 container-fluid text-center display-5 mt-3'>Welcome back again</p>
        
        <div className="container display-6 text-bold text-bold">
          <div className="container shadow rounded p-2">
            <div className="row">
              <div className="col-md-3 section p-3">
                <h4>Advertisement</h4>
                <p className='p-3 shadow rounded alert alert-primary'>Content for Advertisement</p>
              </div>
              <div className="col-md-3 section p-3">
                <h4>Programs</h4>
                <p className='p-3 shadow rounded alert alert-dark'>Content for Programs</p>
              </div>
              <div className="col-md-3 section p-3">
                <h4>Announcements</h4>
                <p className='p-3 shadow rounded alert alert-success'>Content for Announcements</p>
              </div>
              <div className="col-md-3 section p-3">
                <h4>Trends Claims</h4>
                <p className='p-3 shadow rounded alert alert-primary'>Content for Trends Claims</p>
              </div>
  
              <div className="col-md-12 section p-3 mt-3">
                <p className='display-7 p-3 container'>DECENTRALIZED HEALTH INSURANCE SYSTEM</p>
                <p className='p-3 alert alert-dark text-bold text-bold'>
                  Decentralized Health Insurance (DHI) leverages blockchain technology to provide transparent and secure health
                  insurance solutions. By decentralizing the control and distribution of health insurance claims, DHI aims to
                  reduce fraud, ensure privacy, and offer real-time processing of claims. Members of DHI benefit from lower premiums,
                  faster claims settlements, and a community-driven approach to health insurance. The use of smart contracts ensures
                  that all terms and conditions are automatically enforced without the need for intermediaries, creating a more
                  efficient and fair system.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <footer className="footer container p-3 mt-2">
          <div>
            <p>&copy; DHI   2024   ICP RWANDA</p>
            <p>
              <a href="mailto:support@vondy.com">Email</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">AWS</a>
              <a href="https://forum.vondy.com" target="_blank" rel="noopener noreferrer">Forum</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

