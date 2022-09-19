import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { axiosPublic } from '../axios';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import useStyle from '../hooks/useStyle';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const { prefersDarkMode } = useStyle();
  const { setAuth, persist, setPersist } = useAuth();
  const { displayToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

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
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response.status === 400)  {
        displayToast('El email y la contraseña no pueden estar vacíos', 'error')
      }
      if (error.response.status === 401)  {
        displayToast('El email o la contraseña es incorrecta', 'error')
      } else{
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <div id="login" data-dark-theme={prefersDarkMode}>
      <h3>Iniciar sesión</h3>
      <form onSubmit={handleLogin}>
        <TextField
          required
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          label="Correo electrónico"
        />
        <TextField
          required
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          label="Contraseña"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={persist}
              onChange={(e) => {
                setPersist(e.target.checked);
              }}
            />
          }
          label="Mantener sesión iniciada"
        />

        <LoadingButton loading={loading} variant="contained" type="submit">
          Iniciar sesión
        </LoadingButton>
      </form>
    </div>
  );
};

export default Login;
