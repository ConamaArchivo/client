import React, { useState, useMemo, createContext } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import sass from '../src/style/export.module.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

let globalContext = createContext();

const RouteSwitch = () => {
  const [mobileView, setMobileView] = useState(
    window.matchMedia(`(max-width: ${sass.bp2})`).matches
  );
  window.addEventListener('resize', () => {
    setMobileView(window.matchMedia(`(max-width: ${sass.bp2})`).matches);
  });
  const prefersDarkMode = true;
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <BrowserRouter>
      <globalContext.Provider value={{ mobileView }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {mobileView ? null : <Sidebar />}
          <Routes>
            <Route path="/obras" element={<Home />} />
            <Route path="/nueva-entrada" element={<New />} />
            <Route path="/" element={<Navigate to="/obras" replace />} />
          </Routes>
          {mobileView ? <Navbar /> : null}
        </ThemeProvider>
      </globalContext.Provider>
    </BrowserRouter>
  );
};

export default RouteSwitch;
export { globalContext };
