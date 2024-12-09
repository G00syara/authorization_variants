import React from 'react';

import './App.css';
import CSRFLogin from './components/CSRF/CSRFLogin';
import CSRFRegister from './components/CSRF/CSRFRegistery';
import CSRFToken from './components/CSRF/CSRFToken';
import FullJwtCheck from './components/FullJwt/FullJwtCheck';
import FullJwtLogin from './components/FullJwt/FullJwtLogin';
import FullJwtRegister from './components/FullJwt/FullJwtRegistery';
import JWTCheck from './components/JWT/JWTCheck';
import JWTLogin from './components/JWT/JWTLogin';
import JWTRegister from './components/JWT/JWTRegistery';
import ProtectedLogin from './components/Protected/ProtectedLogin';
import ProtectedRegister from './components/Protected/ProtectedRegistery';
import SimpleLogin from './components/Simple/SimpeLogin';
import SimpleRegister from './components/Simple/SimpleRegistery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="gap-4 flex flex-row items-start">
          <div className="auth-container m-6">
            <SimpleLogin />
            <SimpleRegister />
          </div>
          <div className="auth-container m-6">
            <ProtectedLogin />
            <ProtectedRegister />
          </div>
          <div className="auth-container m-6">
            <JWTLogin />
            <JWTRegister />
            <JWTCheck />
          </div>
          <div className="auth-container m-6">
            <FullJwtLogin />
            <FullJwtRegister />
            <FullJwtCheck />
          </div>
          <div className="auth-container m-6">
            <CSRFLogin />
            <CSRFRegister />
            <CSRFToken />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
