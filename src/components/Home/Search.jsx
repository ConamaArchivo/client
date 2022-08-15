import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { globalContext } from '../../RouteSwitch';

const SearchBar = () => {
  let { mobileView } = useContext(globalContext);
  return (
    <div className="search">
      <div className="content">
        {mobileView ? (
          <IconButton>
            <MenuIcon />
          </IconButton>
        ) : null}
        <input type="text" placeholder="Buscar..." />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchBar;
