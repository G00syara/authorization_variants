import React from 'react';

import useBaseForm from '../../hooks/useBaseForm';

const SimpleLogin: React.FC = () => {
  const title = 'Login';
  const url = 'simple/login';
  const isLogin = true;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default SimpleLogin;
