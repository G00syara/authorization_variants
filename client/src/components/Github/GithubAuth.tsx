import { useState } from 'react';

const GithubAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return <p>GitHub OAuth credentials are missing in the environment variables.</p>;
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user&prompt=consent`;

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    setError(null);
    alert('You have successfully logged out.');
  };

  return (
    <div>
      <h3>GitHub Authorization</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isAuthenticated ? (
        <div>
          <a href={githubAuthUrl}>Login with GitHub</a>
        </div>
      ) : (
        <div>
          <h4>Welcome, {userName}!</h4>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GithubAuth;
