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
        <div className='gap-4 flex flex-row items-start'>
          <div className='auth-container m-6'>
            <SimpleLogin />
            <SimpleRegister />
          </div>
          <div className='auth-container m-6'>
            <ProtectedLogin />
            <ProtectedRegister />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
