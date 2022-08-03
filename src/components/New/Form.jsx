import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PlusLg, XLg, CloudCheck } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import Author from './Author';
import Version from './Version';
import SelectInput from './SelectInput';

const Form = () => {
  const { handleSubmit /*register, formState: { errors } */ } = useForm();
  const onSubmit = (data) => null;

  const [authors, setAuthors] = useState(1);
  const [versions, setVersions] = useState(1);

  const genresRef = useRef();
  const authorsRefs = useRef([]);
  const versionsRefs = useRef([]);

  const getAllStates = () => {
    authorsRefs.current.forEach((ref) => {
      if (ref !== null) {
        console.log('Author Country ', ref.getSelectedCountry());
      }
    });
    console.log('Genre ', genresRef.current.getSelected());
    versionsRefs.current.forEach((ref) => {
      if (ref !== null) {
        console.log('Arr Author Country ', ref.getSelectedArrCountry());
        console.log('Accompaniment ', ref.getSelectedAccompaniment());
        console.log('Voices ', ref.getSelectedVoices());
      }
    });
  };

  const handleAddAuthorBtn = () => {
    setAuthors(authors + 1);
  };
  const handleRemoveAuthorBtn = () => {
    if (authors > 1) setAuthors(authors - 1);
  };

  const handleAddVersionBtn = () => {
    setVersions(versions + 1);
  };
  const handleRemoveVersionBtn = () => {
    if (versions > 1) setVersions(versions - 1);
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
          <input type="text" name="title" />
        </label>
        <h3 className="bt authors-title">{authors > 1 ? 'Autores' : 'Autor'}</h3>
        <div className="authors">
          {Array.from(Array(authors)).map((e, i) => (
            <Author
              countryOptions={countryOptions}
              target="author"
              v="0"
              i={i}
              key={uuid()}
              ref={(el) => (authorsRefs.current[i] = el)}
            />
          ))}
        </div>
        <div className="btns">
          <button className="add" onClick={handleAddAuthorBtn}>
            <PlusLg /> Agregar autor
          </button>
          {authors > 1 ? (
            <button className="remove" onClick={handleRemoveAuthorBtn}>
              <XLg /> Quitar autor
            </button>
          ) : null}
        </div>
        <div className="group-alt">
          <div className="hg">
            <div className="repertoire vg">
              <h3 className="bt">Repertorio</h3>
              <label htmlFor="hg academic-rep">
                <input
                  type="radio"
                  id="academic-rep"
                  name="repertoire"
                  value="académico"
                  defaultChecked
                />
                Académico
              </label>
              <label htmlFor="hg popular-rep">
                <input
                  type="radio"
                  id="popular-rep"
                  name="repertoire"
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
                ref={genresRef}
              />
            </div>
          </div>
          <label className="vg bl">
            Observaciones
            <textarea rows="3" name="comment" />
          </label>
        </div>
      </div>
      <div className="versions">
        {Array.from(Array(versions)).map((e, i) => (
          <Version
            countryOptions={countryOptions}
            accompanimentOptions={accompanimentOptions}
            voicesOptions={voicesOptions}
            v={i + 1}
            key={uuid()}
            ref={(el) => (versionsRefs.current[i] = el)}
          />
        ))}
        <div className="btns">
          <button className="add" onClick={handleAddVersionBtn}>
            <PlusLg /> Agregar versión
          </button>
          {versions > 1 ? (
            <button className="remove" onClick={handleRemoveVersionBtn}>
              <XLg /> Quitar versión
            </button>
          ) : null}
        </div>
        <button id="save" type="submit" onClick={getAllStates}>
          <CloudCheck /> Guardar
        </button>
      </div>
    </form>
  );
};

export default Form;
