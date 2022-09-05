import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const SearchTopBar = ({ searchValue, setSearchValue, options, setOptions }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className={`content${isFocus ? ' focus' : ''}`}>
      <ToggleButton
        value="check"
        selected={options}
        onChange={() => {
          setOptions(!options);
        }}
      >
        <MenuIcon />
      </ToggleButton>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchValue || ''}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <ToggleButton value="search">
        <SearchIcon />
      </ToggleButton>
    </div>
  );
};

export default SearchTopBar;
