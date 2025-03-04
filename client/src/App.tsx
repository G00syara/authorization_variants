import React from 'react';

import './App.css';
import CSRFLogin from './components/CSRF/CSRFLogin';
import CSRFRegister from './components/CSRF/CSRFRegistery';
import CSRFToken from './components/CSRF/CSRFToken';
import FullJwtCheck from './components/FullJwt/FullJwtCheck';
import FullJwtLogin from './components/FullJwt/FullJwtLogin';
import FullJwtRegister from './components/FullJwt/FullJwtRegistery';
import GithubAuth from './components/Github/GithubAuth';
import GmailAuth from './components/Gmail/GmailAuth';
import JWTCheck from './components/JWT/JWTCheck';
import JWTLogin from './components/JWT/JWTLogin';
import JWTRegister from './components/JWT/JWTRegistery';
import ProtectedLogin from './components/Protected/ProtectedLogin';
import ProtectedRegister from './components/Protected/ProtectedRegistery';
import SimpleLogin from './components/Simple/SimpeLogin';
import SimpleRegister from './components/Simple/SimpleRegistery';
import WebAuthLogin from './components/WebAuth/WebAuthLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex flex-row space-x-4">
            <div className="auth-container w-full space-y-4">
              <SimpleLogin />
              <SimpleRegister />
            </div>
            <div className="auth-container w-full space-y-4">
              <ProtectedLogin />
              <ProtectedRegister />
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="auth-container w-full space-y-4">
              <JWTLogin />
              <JWTRegister />
              <JWTCheck />
            </div>
            <div className="auth-container w-full space-y-4">
              <FullJwtLogin />
              <FullJwtRegister />
              <FullJwtCheck />
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="auth-container w-full space-y-4">
              <CSRFLogin />
              <CSRFRegister />
              <CSRFToken />
            </div>
            <div className="auth-container w-full space-y-4">
              <GmailAuth />
            </div>
            <div className="auth-container w-full space-y-4">
              <GithubAuth />
            </div>
            <div className="auth-container w-full space-y-4">
              <WebAuthLogin />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
