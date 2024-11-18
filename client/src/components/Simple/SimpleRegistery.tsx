import React from 'react';
import useBaseForm from '../../hooks/useBaseForm';

const SimpleRegister: React.FC = () => {
  const title = 'Register'
  const url = 'simple/register'
  const isLogin = false;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default SimpleRegister;
