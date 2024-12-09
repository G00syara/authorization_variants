import axios from 'axios';
import React, { useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CSRFToken = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [csrf, setCSRF] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getTokenCSRF = async () => {
    try {
      const response = await axios.get(`${backendUrl}csrf/csrf_token`, { withCredentials: true });

      setMessage(response.data.message);
      setCSRF(response.data.csrfToken);
    } catch (err) {
      setError('Unauthorized: Invalid token');
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={getTokenCSRF}>Check csrf</button>
      {message && <p>{message}</p>}
      {csrf && <pre>{JSON.stringify(csrf, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CSRFToken;
