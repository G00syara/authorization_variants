import React from 'react';
import './App.css';
import SimpleRegister from './components/Simple/SimpleRegistery';
import SimpleLogin from './components/Simple/SimpeLogin';
import ProtectedLogin from './components/Protected/ProtectedLogin';
import ProtectedRegister from './components/Protected/ProtectedRegistery';

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
