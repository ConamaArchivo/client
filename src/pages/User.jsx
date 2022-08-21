import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post('/logout');
      console.log(JSON.stringify(response?.data));
      setAuth({});
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    navigate('/');
  };

  return (
    <LoadingButton onClick={handleLogout} loading={loading} variant="contained">
      Cerrar sesión
    </LoadingButton>
  );
};

export default User;
