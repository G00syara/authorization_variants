import useBaseForm from '../../hooks/useBaseForm';

const JWTLogin = () => {
  const title = 'JWTLogin';
  const url = 'jwt/login';
  const isLogin = true;
  const Component = useBaseForm(title, url, isLogin);

  return <Component />;
};

export default JWTLogin;
