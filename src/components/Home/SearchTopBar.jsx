import { ToggleButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const SearchTopBar = ({ searchValue, setSearchValue, options, setOptions }) => {
  return (
    <div className="top-bar search">
      <div className="content">
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
        />
        <ToggleButton>
          <SearchIcon />
        </ToggleButton>
      </div>
    </div>
  );
};

export default SearchTopBar;
