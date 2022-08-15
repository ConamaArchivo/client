import React, { Fragment, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, ButtonGroup } from '@mui/material';

const FileUpload = ({ index, setFiles, files }) => {
  const [filename, setFilename] = useState('');

  const handleUpload = (event) => {
    if (event.target.files[0]) {
      setFilename(event.target.files[0].name);
      let newArray = [...files];
      newArray[index] = event.target.files[0];
      setFiles(newArray);
    }
  };

  const handleClearUpload = () => {
    setFilename('');
    let newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  };

  const fileInput = React.useRef();

  return (
    <div className="upload-wrapper">
      <ButtonGroup variant="contained">
        <Button
          startIcon={filename === '' ? <FileUploadIcon /> : null}
          className="upload-pdf"
          onClick={() => fileInput.current.click()}
        >
          {filename === '' ? <Fragment>Subir PDF</Fragment> : filename}
          <input
            hidden
            ref={fileInput}
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
          />
        </Button>
        {filename === '' ? null : (
          <Button onClick={handleClearUpload}>
            <ClearIcon />
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default FileUpload;
