import React from 'react';

import useBaseForm from '../../hooks/useBaseForm';

const JWTRegister: React.FC = () => {
  const title = 'JWTRegister';
  const url = 'jwt/register';
  const isLogin = false;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default JWTRegister;
