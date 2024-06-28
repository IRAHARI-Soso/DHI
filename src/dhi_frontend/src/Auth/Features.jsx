import React from 'react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const features = [
    { id: 1, title: 'User Authentication', description: 'Secure login and authentication for users.' },
    { id: 2, title: 'Dashboard', description: 'Interactive dashboard to view data and analytics.' },
    { id: 3, title: 'Notifications', description: 'Real-time notifications for important updates.' },
    { id: 4, title: 'Mobile Responsive', description: 'Fully responsive design for mobile devices.' },
    { id: 5, title: 'Payment Integration', description: 'Integration with payment gateways for transactions.' },
    { id: 6, title: 'Data Encryption', description: 'Encryption of sensitive data to ensure security.' },
    { id: 7, title: 'Customizable Settings', description: 'Allow users to customize their experience.' }
  ];


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
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/features">Features</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        
        <p className='alert alert-primary p-3 container-fluid text-center display-5 mt-3'>Welcome to Features Page</p>
        
        <div className="container display-6 text-bold text-bold">
          <div className="container shadow rounded p-2">
            <div className="row">
              {/* Display features */}
              {features.map(feature => (
                <div key={feature.id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{feature.title}</h5>
                      <p className="card-text">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <footer className="footer container p-3 mt-2">
          <div>
            <p>&copy; DHI 2024 ICP RWANDA</p>
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

export default Features;
