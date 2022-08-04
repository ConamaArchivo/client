import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusLg, XLg, CloudCheck } from 'react-bootstrap-icons';
import Author from './Author';
import Version from './Version';
import SelectInput from './SelectInput';

const Form = () => {
  const { handleSubmit /*register, formState: { errors } */ } = useForm();
  const onSubmit = () => console.log(getFullForm());

  const getFullForm = () => {
    let data = {...generalInfo}
    data[0].authors = authors
    data[0].versions = versions
    return data;
  }

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
    let newObject = {...generalInfo};
    newObject[0][event.target.name] = event.target.value;
    setGeneralInfo(newObject);
  };

  const changeRepertoire = (event) => {
    let newObject = {...generalInfo};
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
  const handleAddAuthorBtn = () => {
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
  const handleRemoveAuthorBtn = () => {
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
      gender: '',
      num_of_voices: '',
      accompaniment: [],
      originals: '',
      copies: '',
      cabinet: '',
      box: '',
      arr_author: [],
    },
  ]);
  const handleAddVersionBtn = () => {
    setVersions((versions) => [
      ...versions,
      {
        gender: '',
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
  const handleRemoveVersionBtn = () => {
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

  const countryOptions = [
    { value: 'AR', label: 'País1' },
    { value: 'AR', label: 'País2' },
    { value: 'AR', label: 'País3' },
    { value: 'AR', label: 'País4' },
  ];

  const genreOptions = [
    { value: 'género1', label: 'Género1' },
    { value: 'género2', label: 'Género2' },
    { value: 'género3', label: 'Género3' },
  ];

  const accompanimentOptions = [
    { value: 'acompañamiento1', label: 'Acompañamiento1' },
    { value: 'acompañamiento2', label: 'Acompañamiento2' },
    { value: 'acompañamiento3', label: 'Acompañamiento3' },
  ];

  const voicesOptions = [
    { value: 'mixto', label: 'Mixto' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="general">
        <label className="bl vg ">
          Título
          <input
            type="text"
            name="title"
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
              subIndex=""
              changeAuthors={changeAuthors}
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
              <label >
                <input
                  type="radio"
                  name="repertoire"
                  value="académico"
                  defaultChecked
                  onChange={changeRepertoire}
                />
                Académico
              </label>
              <label >
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
            subIndex={i}
            key={`version${i}`}
            versions={versions}
            changeVersions={changeVersions}
            setVersions={setVersions}
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
