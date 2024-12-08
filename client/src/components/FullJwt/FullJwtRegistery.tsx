import React from 'react';

import useBaseForm from '../../hooks/useBaseForm';

const FullJwtRegister: React.FC = () => {
  const title = 'FullJwtRegister';
  const url = 'full_jwt/register';
  const isLogin = false;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default FullJwtRegister;
