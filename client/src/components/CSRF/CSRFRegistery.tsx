import React from 'react';

import useBaseForm from '../../hooks/useBaseForm';

const CSRFRegister: React.FC = () => {
  const title = 'CSRFRegister';
  const url = 'csrf/register';
  const isLogin = false;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default CSRFRegister;
