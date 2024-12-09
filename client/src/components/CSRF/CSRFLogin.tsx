import React from 'react';

import useBaseForm from '../../hooks/useBaseForm';

const CSRFLogin: React.FC = () => {
  const title = 'CSRFLogin';
  const url = 'csrf/login';
  const isLogin = true;
  const Component = useBaseForm(title, url, isLogin, true);

  return <Component />;
};

export default CSRFLogin;
