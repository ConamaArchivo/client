import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useStyle from '../../hooks/useStyle';

const SearchBar = ({ searchValue, setSearchValue }) => {
  const { mobileView } = useStyle();

  return (
    <div className="search">
      <div className="content">
        {mobileView && (
          <IconButton>
            <MenuIcon />
          </IconButton>
        )}
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
