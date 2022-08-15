import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Author from './Author';
import FileUpload from './FileUpload';
import {
  MenuItem,
  Select,
  TextField,
  Button,
  Autocomplete,
  Switch,
} from '@mui/material';

const Version = ({
  versions,
  changeVersions,
  setVersions,
  countryOptions,
  accompanimentOptions,
  subindex,
  setFiles,
  files,
}) => {
  const handleAddArrAuthorBtn = () => {
    let newArray = [...versions];
    newArray[subindex].arr_author.push({
      name: '',
      surname: '',
      country: '',
      role: '',
    });
    setVersions(newArray);
  };

  const handleRemoveArrAuthorBtn = () => {
    let newArray = [...versions];
    newArray[subindex].arr_author.pop();
    setVersions(newArray);
  };

  const getValuesFromEvent = (event) => {
    let subindex = event.target.subindex;
    if (subindex === undefined) {
      subindex = parseInt(event.target.getAttribute('subindex'));
    }
    let index = event.target.index;
    if (index === undefined) {
      index = parseInt(event.target.getAttribute('index'));
    }
    return {
      name: event.target.name,
      value: event.target.value,
      index: index,
      subindex: subindex,
    };
  };

  const changeArrAuthors = (event) => {
    const { name, value, index, subindex } = getValuesFromEvent(event);
    let newArray = [...versions];
    newArray[subindex].arr_author[index][name] = value;
    setVersions(newArray);
  };

  const [switchChecked, setSwitchChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
    if (event.target.checked) {
      handleAddArrAuthorBtn();
    } else {
      let newArray = [...versions];
      newArray[subindex].arr_author = [];
      setVersions(newArray);
    }
  };
  return (
    <div className="version">
      <h3 className="bt">
        {versions[subindex].arr_author.length > 1
          ? 'Arregladores'
          : 'Arreglador'}
        <Switch checked={switchChecked} onChange={handleSwitchChange} />
      </h3>
      <div className="authors arr">
        {versions[subindex].arr_author.map((e, i) => (
          <Author
            countryOptions={countryOptions}
            target="arr-author"
            index={i}
            subindex={subindex}
            key={`arr_author${i}`}
            authors={versions[subindex].arr_author}
            changeAuthors={changeArrAuthors}
          />
        ))}
      </div>
      {switchChecked ? (
        <div className="btns">
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            className="add"
            onClick={handleAddArrAuthorBtn}
          >
            Agregar arreglador
          </Button>
          {versions[subindex].arr_author.length > 1 ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon />}
              className="remove"
              onClick={handleRemoveArrAuthorBtn}
            >
              Quitar arreglador
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className="group">
        <div className="vg big-group">
          <h3 className="bt">Voces</h3>
          <div className="hg voices">
            <div className="option-select">
              <Select
                value={versions[subindex].gender}
                onChange={(event) => {
                  event.target.subindex = subindex;
                  event.target.name = 'gender';
                  changeVersions(event);
                }}
              >
                <MenuItem value="mixto">Mixto</MenuItem>
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
              </Select>
            </div>
            <span>a</span>
            <TextField
              label="n°"
              value={versions[subindex].num_of_voices}
              inputProps={{ type: 'number' }}
              onChange={(event) => {
                event.target.subindex = subindex;
                event.target.name = 'num_of_voices';
                changeVersions(event);
              }}
            />
            <span>voces</span>
          </div>
        </div>
        <div className="vg accompaniment-group">
          <Autocomplete
            multiple
            freeSolo
            options={accompanimentOptions}
            filterSelectedOptions
            onChange={(event, newValue) => {
              event.target.subindex = subindex;
              event.target.name = 'genre';
              changeVersions(event, newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Acompañamiento" />
            )}
          />
        </div>
        <div className="vg">
          <h3 className="bt">Archivo</h3>
          <div className="hg">
            <TextField
              label="Originales"
              value={versions[subindex].originals}
              inputProps={{ type: 'number' }}
              onChange={(event) => {
                event.target.subindex = subindex;
                event.target.name = 'originals';
                changeVersions(event);
              }}
            />
            <TextField
              label="Copias"
              value={versions[subindex].copies}
              inputProps={{ type: 'number' }}
              onChange={(event) => {
                event.target.subindex = subindex;
                event.target.name = 'copies';
                changeVersions(event);
              }}
            />
          </div>
        </div>

        <div className="vg">
          <h3 className="bt">Ubicación</h3>
          <div className="hg">
            <TextField
              label="Armario"
              value={versions[subindex].cabinet}
              onChange={(event) => {
                event.target.subindex = subindex;
                event.target.name = 'cabinet';
                changeVersions(event);
              }}
            />
            <TextField
              label="Caja"
              value={versions[subindex].box}
              onChange={(event) => {
                event.target.subindex = subindex;
                event.target.name = 'box';
                changeVersions(event);
              }}
            />
          </div>
        </div>
      </div>
      <FileUpload index={subindex} setFiles={setFiles} files={files} />
    </div>
  );
};
export default Version;
