import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            {/* Replace this with your home page content */}
            <div>
              <h2>Home Page</h2>
              <p>Welcome to the Home Page!</p>
            </div>
          </Route>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          {/* Add more routes as needed */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
