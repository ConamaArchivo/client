import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchValue, setSearchValue, options, setOptions}) => {

  return (
    <div className="search">
      <div className="content">
          <IconButton>
            <MenuIcon />
          </IconButton>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchValue || ''}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchBar;
