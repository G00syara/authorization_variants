import React, { useState } from 'react';
import axios from 'axios';


const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  url: string,
  username: string,
  password: string,
  isLogin: boolean
) => {
  e.preventDefault();

  try {
    const response = await axios.post(`http://localhost:4001/${url}`, {
      username,
      password,
    });
    alert(`${isLogin ? 'Login' : 'Register'} successful!`);
    console.info(response.data);
  } catch (error) {
    alert(`${isLogin ? 'Login' : 'Register'} failed. ${error}`);
  }
};

const useBaseForm = (title: string, url: string, isLogin:boolean): React.FC => {
  const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    return (
      <div>
        <h2>{title}</h2>
        <form onSubmit={(e) => handleSubmit(e, url, username, password, isLogin)}
        >
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
          <button type="submit">{title}</button>
        </form>
      </div>
    );
  };

  return Login;
};

export default useBaseForm;
