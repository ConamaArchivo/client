import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import useStyle from '../../hooks/useStyle';
const SaveTopBar = ({ loading }) => {
  const { mobileView } = useStyle();

  return (
    <div className="top-bar save">
      {mobileView && (
        <Link to="/">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        </Link>
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

export default SaveTopBar;
