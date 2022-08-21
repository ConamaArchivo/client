import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { axiosPublic } from '../axios';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate, useLocation } from 'react-router-dom';

const User = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPublic.post(
        '/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log('err: ', err);
    }
    setLoading(false);
    navigate(from, {replace: true});
  };

  const handleLogout = async (e) => {
    try {
      const response = await axiosPrivate.post('/logout');
      console.log(JSON.stringify(response?.data));
      setAuth({});
    } catch (err) {
      console.log(err);
    }
  };

  if (!auth?.email) {
    return (
      <form onSubmit={handleLogin}>
        <TextField
          required
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Correo electrónico"
        />
        <TextField
          required
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Contraseña"
        />
        <LoadingButton loading={loading} variant="contained" type="submit">
          Iniciar sesión
        </LoadingButton>
      </form>
    );
  } else {
    return <Button onClick={handleLogout}>Cerrar sesión</Button>;
  }
};

export default User;
