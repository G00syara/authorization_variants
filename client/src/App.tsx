import React from 'react';
import './App.css';
import SimpleRegister from './Simple/SimpleRegistery';
import SimpleLogin from './Simple/SimpeLogin';
import ProtectedLogin from './Protected/ProtectedLogin';
import ProtectedRegister from './Protected/ProtectedRegistery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="auth-container">
          <div>
            <SimpleLogin />
            <SimpleRegister />
          </div>
          <div>
            <ProtectedLogin />
            <ProtectedRegister />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
