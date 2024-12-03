import axios from 'axios';
import React, { useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  url: string,
  username: string,
  password: string,
  isLogin: boolean,
) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${backendUrl}${url}`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    alert(`${isLogin ? 'Login' : 'Register'} successful!`);
    console.info(response.data);
  } catch (error) {
    alert(`${isLogin ? 'Login' : 'Register'} failed. ${error}`);
  }
};

const useBaseForm = (title: string, url: string, isLogin: boolean): React.FC => {
  const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div>
        <h2>{title}</h2>
        <form onSubmit={(e) => handleSubmit(e, url, username, password, isLogin)}>
          <input
            className="p-0.5 m-2 text-black	"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-0.5 m-2 text-black	"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="p-1 bg-gray-400 text-black" type="submit">
            {title}
          </button>
        </form>
      </div>
    );
  };

  return Login;
};

export default useBaseForm;
