import React from 'react';
import './Navigation.css';

function Navigation({ route, onRouteChange, isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <nav>
        <p
          onClick={() => onRouteChange('login')}
          className="f3 link dim black underline pa3 pointer white"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('login')}
          className="f3 link dim black underline pa3 pointer white"
        >
          Login
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black underline pa3 pointer white"
        >
          Register
        </p>
      </nav>
    );
  }
}

export default Navigation;
