import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyle from '../../hooks/useStyle';

const TopBar = ({ loading }) => {
  const { mobileView } = useStyle();

  return (
    <div className="top-bar">
      {mobileView && (
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      )}
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
