import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireLogin = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.email) {
    return <Outlet />;
  } else {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }
};

export default RequireLogin;
