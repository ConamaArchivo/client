import { useState, useEffect, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setLoading(false);
      }
    };
    !auth?.accessToken && persist ? verifyRefreshToken() : setLoading(false);

    return () => (isMounted = false);
  }, [auth?.accessToken, persist, refresh]);

  return (
    <Fragment>{!persist ? <Outlet /> : loading ? null : <Outlet />}</Fragment>
  );
};

export default PersistLogin;
