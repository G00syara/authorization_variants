import React from 'react';

import useBaseForm from '../../hooks/useBaseForm';

const ProtectedRegister: React.FC = () => {
  const title = 'ProtectedRegister';
  const url = 'protected/register';
  const isLogin = false;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default ProtectedRegister;
