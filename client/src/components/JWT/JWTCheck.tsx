import axios from 'axios';
import React, { useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const JWTCheck = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const checkJwt = async () => {
    try {
      const response = await axios.get(`${backendUrl}jwt/check_jwt`, { withCredentials: true });

      setMessage(response.data.message);
      setUser(response.data.user);
    } catch (err) {
      setError('Unauthorized: Invalid token');
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={checkJwt}>Check JWT</button>
      {message && <p>{message}</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JWTCheck;
