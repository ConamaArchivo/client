import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
     await axiosPrivate.post('/logout');
      setAuth({});
    } catch (err) {
      console.log('err: ', err);
    }
    setLoading(false);
    navigate('/');
  };

  return (
    <div id="user">
      <h3>{auth.email}</h3>
      <LoadingButton onClick={handleLogout} loading={loading} variant="contained">
        Cerrar sesión
      </LoadingButton>
    </div>
  );
};

export default User;
