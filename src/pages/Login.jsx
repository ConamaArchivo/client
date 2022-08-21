import React, { useState } from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { axiosPublic } from '../axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const { setAuth } = useAuth();

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
    navigate(from, { replace: true });
  };

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
        type="password"
        label="Contraseña"
      />
      <LoadingButton loading={loading} variant="contained" type="submit">
        Iniciar sesión
      </LoadingButton>
    </form>
  );
};

export default Login;
