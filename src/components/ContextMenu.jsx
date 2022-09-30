import { useState, Fragment } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';

const ContextMenu = ({ icon, items }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Menu
        className="options-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {items.map((item) => (
          <MenuItem
            className={item.class}
            onClick={() => {
              handleClose();
              item.action();
            }}
          >
            {item.icon && item.icon}
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default ContextMenu;
