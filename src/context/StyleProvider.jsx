import { createContext, useState, useMemo, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import sass from '../../src/style/export.module.scss';

const StyleContext = createContext({});

export const StyleProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'system');
  const [prefersDarkMode, setPrefersDarkMode] = useState(true);

  const query = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (mode === 'dark') setPrefersDarkMode(true);
    if (mode === 'light') setPrefersDarkMode(false);
    if (mode === 'system') setPrefersDarkMode(query);
    localStorage.setItem('mode', mode);
  }, [mode, query]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const getMediaMatch = () => {
    return window.matchMedia(`(max-width: ${sass.bp2})`).matches;
  };

  const [mobileView, setMobileView] = useState(getMediaMatch());

  window.addEventListener('resize', () => setMobileView(getMediaMatch()));
  return (
    <StyleContext.Provider
      value={{ mobileView, prefersDarkMode, setMode, mode }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyleContext.Provider>
  );
};

export default StyleContext;
