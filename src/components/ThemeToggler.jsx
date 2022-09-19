import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useStyle from '../hooks/useStyle';

const ThemeToggler = () => {
  const { setMode, mode } = useStyle();

  const handleTheme = (e) => {
    setMode(e.currentTarget.value);
  };

  return (
    <ToggleButtonGroup size="small" value={mode} exclusive onChange={handleTheme}>
      <ToggleButton value="light">
        {mode === 'light' ? <LightModeIcon /> : <LightModeOutlinedIcon />}
      </ToggleButton>
      <ToggleButton value="system">
        {mode === 'system' ? (
          <ManageAccountsIcon />
        ) : (
          <ManageAccountsOutlinedIcon />
        )}
      </ToggleButton>
      <ToggleButton value="dark">
        {mode === 'dark' ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default ThemeToggler;
