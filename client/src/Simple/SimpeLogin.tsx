import React, { useState } from 'react';
import axios from 'axios';

const SimpleLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4001/SimpleLogin', {
        username,
        password,
      });
      alert('SimpleLogin successful!');
    } catch (error) {
      alert('SimpleLogin failed.');
    }
  };

  return (
    <div>
      <h2>SimpleLogin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SimpleLogin;
