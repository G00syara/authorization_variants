import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { useState } from 'react';

const GmailAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return <p>Нет clientId в env</p>;
  }

  const handleLoginSuccess = (credentialResponse: any) => {
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    setIsAuthenticated(true);
    setUserName(decodedToken.name);
    alert(`Welcome, ${decodedToken.name}`);
  };

  const handleLoginFailure = () => {
    console.error('Login Failed');
    alert('Failed');
  };

  const handleLogout = () => {
    googleLogout();
    setIsAuthenticated(false);
    setUserName(null);
    alert('Succesful');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h3>Gmail Authorization</h3>
        {!isAuthenticated ? (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
        ) : (
          <div>
            <h4>Welcome, {userName}!</h4>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GmailAuth;
