import React, { useState, Fragment } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from '@mui/material';
import Author from './Author';
import Version from './Version';
import Notification from './Notification';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Form = ({
  countryOptions,
  genreOptions,
  accompanimentOptions,
  voicesOptions,
  nameOptions,
  surnameOptions,
  arrNameOptions,
  arrSurnameOptions,
  setLoading,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const data = getFullForm();
    buildFormData(formData, data);
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });
    try {
      const res = await axiosPrivate.post('/nueva-entrada', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
        },
        crossDomain: true,
      });
      console.log('res: ', res);
      setLoading(false);
      setOpenSuccessToast(true);
    } catch (error) {
      setLoading(false);
      setOpenErrorToast(true);
    }
  };

  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }

  const getFullForm = () => {
    let data = { ...generalInfo }[0];
    data.authors = authors;
    data.versions = versions;
    return data;
  };

  const [generalInfo, setGeneralInfo] = useState([
    {
      title: '',
      genre: [],
      repertoire: '',
      comment: '',
    },
  ]);

  const changeGeneralInfo = (event, newValue) => {
    const name = event.target.name;
    let newObject = { ...generalInfo };
    if (newValue) {
      if (newValue.value) {
        newObject[0][name] = newValue.value;
      } else {
        newObject[0][name] = newValue;
      }
    } else {
      if (event.target.value) {
        newObject[0][name] = event.target.value;
      } else {
        newObject[0][name] = '';
      }
    }
    setGeneralInfo(newObject);
  };

  const changeRepertoire = (event) => {
    let newObject = { ...generalInfo };
    newObject[0].repertoire = event.target.value;
    setGeneralInfo(newObject);
  };

  const [authors, setAuthors] = useState([
    {
      name: '',
      surname: '',
      country: '',
      role: '',
    },
  ]);
  const handleAddAuthorBtn = (e) => {
    e.preventDefault();

    setAuthors((authors) => [
      ...authors,
      {
        name: '',
        surname: '',
        country: '',
        role: '',
      },
    ]);
  };
  const handleRemoveAuthorBtn = (e) => {
    e.preventDefault();

    let newArray = [...authors];
    newArray.pop();
    setAuthors(newArray);
  };

  const changeAuthors = (event, newValue) => {
    const index = parseInt(event.target.index);
    const name = event.target.name;
    let newArray = [...authors];
    if (newValue) {
      if (newValue.value) {
        newArray[index][name] = newValue.value;
      } else {
        newArray[index][name] = newValue;
      }
    } else {
      if (event.target.value) {
        newArray[index][name] = event.target.value;
      } else {
        newArray[index][name] = '';
      }
    }
    setAuthors(newArray);
  };

  const [versions, setVersions] = useState([
    {
      gender: 'mixto',
      num_of_voices: '',
      accompaniment: [],
      originals: '',
      copies: '',
      cabinet: '',
      box: '',
      arr_author: [],
    },
  ]);
  const handleAddVersionBtn = (e) => {
    e.preventDefault();
    setVersions((versions) => [
      ...versions,
      {
        gender: 'mixto',
        num_of_voices: '',
        accompaniment: [],
        originals: '',
        copies: '',
        cabinet: '',
        box: '',
        arr_author: [],
      },
    ]);
  };
  const handleRemoveVersionBtn = (e) => {
    e.preventDefault();
    let newArray = [...versions];
    newArray.pop();
    setVersions(newArray);
  };

  const changeVersions = (event, newValue) => {
    const subindex = parseInt(event.target.subindex);
    const name = event.target.name;
    const value = event.target.value;
    let newArray = [...versions];
    if (newValue) {
      if (newValue.value) {
        newArray[subindex][name] = newValue.value;
      } else {
        newArray[subindex][name] = newValue;
      }
    } else {
      if (value) {
        newArray[subindex][name] = value;
      } else {
        newArray[subindex][name] = '';
      }
    }
    setVersions(newArray);
  };

  const [files, setFiles] = useState([]);
  const [openSuccessToast, setOpenSuccessToast] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState(false);

  return (
    <Fragment>
      <Notification
        open={openSuccessToast}
        setOpen={setOpenSuccessToast}
        message="bien"
        severity="success"
      />
      <Notification
        open={openErrorToast}
        setOpen={setOpenErrorToast}
        message="mal"
        severity="error"
      />
      <form id="new-piece" onSubmit={handleSubmit}>
        <div className="general">
          <TextField
            fullWidth
            required
            helperText="Obligatorio"
            label="Título"
            value={generalInfo.title}
            onChange={(event) => {
              event.target.name = 'title';
              changeGeneralInfo(event);
            }}
          />
          <h3 className="bt authors-title">
            {authors.length > 1 ? 'Autores' : 'Autor'}
          </h3>
          <div className="authors">
            {authors.map((e, i) => (
              <Author
                countryOptions={countryOptions}
                target="author"
                index={i}
                key={`author${i}`}
                authors={authors}
                subindex=""
                changeAuthors={changeAuthors}
                nameOptions={nameOptions}
                surnameOptions={surnameOptions}
              />
            ))}
          </div>
          <div className="btns">
            <Button
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
              className="add"
              onClick={handleAddAuthorBtn}
            >
              Agregar autor
            </Button>
            {authors.length > 1 ? (
              <Button
                size="small"
                variant="outlined"
                startIcon={<ClearIcon />}
                className="remove"
                onClick={handleRemoveAuthorBtn}
              >
                Quitar autor
              </Button>
            ) : null}
          </div>
          <div className="group-alt">
            <div className="hg">
              <div className="repertoire vg">
                <h3 className="bt">Repertorio</h3>
                <RadioGroup
                  name="repertoire"
                  value={generalInfo.repertoire}
                  onChange={changeRepertoire}
                >
                  <FormControlLabel
                    value="académico"
                    control={<Radio />}
                    label="Académico"
                  />
                  <FormControlLabel
                    value="popular"
                    control={<Radio />}
                    label="Popular"
                  />
                </RadioGroup>
              </div>
              <div className="genre vg">
                <h3>&nbsp;</h3>
                <div className="genre-wrapper">
                  <Autocomplete
                    multiple
                    freeSolo
                    options={genreOptions}
                    filterSelectedOptions
                    onChange={(event, newValue) => {
                      event.target.name = 'genre';
                      changeGeneralInfo(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Género" />
                    )}
                  />
                </div>
              </div>
            </div>
            <label className="vg bl comment-wrapper">
              <h3>&nbsp;</h3>

              <TextField
                label="Observaciones"
                value={generalInfo.comment}
                onChange={(event) => {
                  event.target.name = 'comment';
                  changeGeneralInfo(event);
                }}
                multiline
                rows={3}
              />
            </label>
          </div>
        </div>
        <div className="versions">
          {versions.map((e, i) => (
            <Version
              countryOptions={countryOptions}
              accompanimentOptions={accompanimentOptions}
              voicesOptions={voicesOptions}
              subindex={i}
              key={`version${i}`}
              versions={versions}
              changeVersions={changeVersions}
              setVersions={setVersions}
              setFiles={setFiles}
              files={files}
            />
          ))}
          <div className="btns">
            <Button
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
              className="add"
              onClick={handleAddVersionBtn}
            >
              Agregar versión
            </Button>
            {versions.length > 1 ? (
              <Button
                size="small"
                variant="outlined"
                startIcon={<ClearIcon />}
                className="remove"
                onClick={handleRemoveVersionBtn}
              >
                Quitar versión
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Form;
