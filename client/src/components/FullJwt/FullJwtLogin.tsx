import useBaseForm from '../../hooks/useBaseForm';

const FullJwtLogin = () => {
  const title = 'FullJwtLogin';
  const url = 'full_jwt/login';
  const isLogin = true;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default FullJwtLogin;
