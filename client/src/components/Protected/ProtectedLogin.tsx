import useBaseForm from '../../hooks/useBaseForm';

const ProtectedLogin = () => {
  const title = 'ProtectedLogin';
  const url = 'protected/login';
  const isLogin = true;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default ProtectedLogin;
