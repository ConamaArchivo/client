import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useContext } from 'react';
import { globalContext } from '../../RouteSwitch';

const TopBar = ({ loading }) => {
  let { mobileView } = useContext(globalContext);

  return (
    <div className="top-bar">
      {mobileView ? (
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      ) : null}
      <LoadingButton
        color="success"
        loading={loading}
        variant="contained"
        startIcon={<SaveIcon />}
        type="submit"
        form="new-piece"
      >
        Guardar
      </LoadingButton>
    </div>
  );
};

export default TopBar;
