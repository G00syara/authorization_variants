import axios from 'axios';
import React, { useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const FullJwtCheck = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${backendUrl}full_jwt/refresh_token`, {}, { withCredentials: true });

      const { accessToken } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setMessage('Token refreshed successfully!');
    } catch (err) {
      setError('Failed to refresh token');
      console.error(err);
    }
  };

  const checkFullJwt = async () => {
    try {
      const response = await axios.get(`${backendUrl}full_jwt/check_token`, {
        withCredentials: true,
      });

      setMessage(response.data.message);
      setUser(response.data.user);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        await refreshToken();
      } else {
        setError('Unauthorized: Invalid token');
      }
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={checkFullJwt}>Check Full JWT</button>
      {message && <p>{message}</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FullJwtCheck;
