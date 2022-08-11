import React, { useState } from 'react';
import { PlusLg, XLg, CloudCheck } from 'react-bootstrap-icons';
import Author from './Author';
import Version from './Version';
import SelectInput from './SelectInput';
import axios from 'axios';

const Form = ({
  countryOptions,
  genreOptions,
  accompanimentOptions,
  voicesOptions,
  nameOptions,
  surnameOptions,
  arrNameOptions,
  arrSurnameOptions
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = getFullForm();
    buildFormData(formData, data);
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });
    try {
      const res = await axios.post('/nueva-entrada', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (error) {}
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

  const getValuesFromEvent = (event) => {
    let index = event.target.index;
    if (index === undefined) {
      index = parseInt(event.target.getAttribute('index'));
    }
    return { name: event.target.name, value: event.target.value, index: index };
  };

  const [generalInfo, setGeneralInfo] = useState([
    {
      title: '',
      genre: [],
      repertoire: '',
      comment: '',
    },
  ]);

  const changeGeneralInfo = (event) => {
    let newObject = { ...generalInfo };
    newObject[0][event.target.name] = event.target.value;
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
  const changeAuthors = (event) => {
    const { name, value, index } = getValuesFromEvent(event);
    let newArray = [...authors];
    newArray[index][name] = value;
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
  const changeVersions = (event) => {
    const { name, value, index } = getValuesFromEvent(event);
    let newArray = [...versions];
    newArray[index][name] = value;
    setVersions(newArray);
  };

  const [files, setFiles] = useState([]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="general">
        <label className="bl vg ">
          Título
          <input
            type="text"
            name="title"
            required
            value={generalInfo.title}
            onChange={changeGeneralInfo}
          />
        </label>
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
          <button className="add" onClick={handleAddAuthorBtn}>
            <PlusLg /> Agregar autor
          </button>
          {authors.length > 1 ? (
            <button className="remove" onClick={handleRemoveAuthorBtn}>
              <XLg /> Quitar autor
            </button>
          ) : null}
        </div>
        <div className="group-alt">
          <div className="hg">
            <div className="repertoire vg">
              <h3 className="bt">Repertorio</h3>
              <label>
                <input
                  type="radio"
                  name="repertoire"
                  value="académico"
                  onChange={changeRepertoire}
                />
                Académico
              </label>
              <label>
                <input
                  type="radio"
                  name="repertoire"
                  onChange={changeRepertoire}
                  value="popular"
                />
                Popular
              </label>
            </div>
            <div className="genre vg">
              <h3 className="bt">Género</h3>
              <SelectInput
                options={genreOptions}
                isMulti={true}
                isCreatable={true}
                name="genre"
                setSelected={changeGeneralInfo}
              />
            </div>
          </div>
          <label className="vg bl">
            Observaciones
            <textarea
              rows="3"
              name="comment"
              value={generalInfo.comment}
              onChange={changeGeneralInfo}
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
          <button className="add" onClick={handleAddVersionBtn}>
            <PlusLg /> Agregar versión
          </button>
          {versions.length > 1 ? (
            <button className="remove" onClick={handleRemoveVersionBtn}>
              <XLg /> Quitar versión
            </button>
          ) : null}
        </div>
        <button id="save" type="submit">
          <CloudCheck /> Guardar
        </button>
      </div>
    </form>
  );
};

export default Form;
