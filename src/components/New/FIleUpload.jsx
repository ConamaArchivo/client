import React, {Fragment, useState } from 'react';
import { Upload } from 'react-bootstrap-icons';

const FileUpload = ({ index , setFiles, files}) => {

  const [filename, setFilename] = useState('');

  const handleUpload = (event) => {
    setFilename(event.target.files[0].name);
    let newArray = [...files];
    newArray[index] = event.target.files[0]
    setFiles(newArray);
  };

  return (
    <label className="upload-pdf">
      {filename === '' ? (
        <Fragment>
          <Upload /> Subir PDF
        </Fragment>
      ) : (
        filename
      )}
      <input
        type="file"
        accept="application/pdf"
        // name='pdf'
        onChange={handleUpload}
      />
    </label>
  );
};

export default FileUpload;
