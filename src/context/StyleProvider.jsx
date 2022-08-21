import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import sass from '../../src/style/export.module.scss';

const StyleContext = createContext({});

export const StyleProvider = ({ children }) => {
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

  const getMediaMatch = () => {
    return window.matchMedia(`(max-width: ${sass.bp2})`).matches;
  };

  const [mobileView, setMobileView] = useState(getMediaMatch());
  
  window.addEventListener('resize', () => setMobileView(getMediaMatch()));
  return (
    <StyleContext.Provider value={{ mobileView }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyleContext.Provider>
  );
};

export default StyleContext;