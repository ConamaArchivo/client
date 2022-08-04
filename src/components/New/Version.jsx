import React from 'react';
import { PlusLg, XLg, Upload } from 'react-bootstrap-icons';
import Author from './Author';
import SelectInput from './SelectInput';

const Version = ({
  versions,
  changeVersions,
  setVersions,
  countryOptions,
  accompanimentOptions,
  voicesOptions,
  subIndex,
}) => {
  const handleAddArrAuthorBtn = () => {
    let newArray = [...versions];
    newArray[subIndex].arr_author.push({
      name: '',
      surname: '',
      country: '',
      role: '',
    });
    setVersions(newArray);
  };

  const handleRemoveArrAuthorBtn = () => {
    let newArray = [...versions];
    newArray[subIndex].arr_author.pop();
    setVersions(newArray);
  };

  const getValuesFromEvent = (event) => {
    let subIndex = event.target.subIndex;
    if (subIndex === undefined) {
      subIndex = parseInt(event.target.getAttribute('subIndex'));
    }
    let index = event.target.index;
    if (index === undefined) {
      index = parseInt(event.target.getAttribute('index'));
    }
    return {
      name: event.target.name,
      value: event.target.value,
      index: index,
      subIndex: subIndex,
    };
  };

  const changeArrAuthors = (event) => {
    const { name, value, index, subIndex } = getValuesFromEvent(event);
    let newArray = [...versions];
    newArray[subIndex].arr_author[index][name] = value;
    setVersions(newArray);
  };

  return (
    <div className="version">
      {versions[subIndex].arr_author.length !== 0 ? (
        <h3 className="bt">
          {versions[subIndex].arr_author.length > 1
            ? 'Arregladores'
            : 'Arreglador'}
        </h3>
      ) : null}
      <div className="authors">
        {versions[subIndex].arr_author.map((e, i) => (
          <Author
            countryOptions={countryOptions}
            target="arr-author"
            index={i}
            subIndex={subIndex}
            key={`arr_author${i}`}
            authors={versions[subIndex].arr_author}
            changeAuthors={changeArrAuthors}
          />
        ))}
      </div>
      <div
        className={`btns${
          versions[subIndex].arr_author.length === 0 ? ' no-margin' : ''
        }`}
      >
        <button className="add" onClick={handleAddArrAuthorBtn}>
          <PlusLg /> Agregar arreglador
        </button>
        {versions[subIndex].arr_author.length > 0 ? (
          <button className="remove" onClick={handleRemoveArrAuthorBtn}>
            <XLg /> Quitar arreglador
          </button>
        ) : null}
      </div>
      <div className="group">
        <div className="vg">
          <h3 className="bt">Voces</h3>
          <div className="hg voices">
            <div className="option-select">
              <SelectInput
                options={voicesOptions}
                isMulti={false}
                isCreatable={false}
                index={subIndex}
                name="gender"
                setSelected={changeVersions}
              />
            </div>
            <span>a</span>
            <input
              className="number-select"
              type="number"
              placeholder="n° de voces"
              index={subIndex}
              name="num_of_voices"
              value={versions[subIndex].num_of_voices}
              onChange={changeVersions}
            />
            <span>voces</span>
          </div>
        </div>
        <div className="vg">
          <h3 className="bt">Acompañamiento</h3>
          <SelectInput
            options={accompanimentOptions}
            isMulti={true}
            isCreatable={true}
            index={subIndex}
            name="accompaniment"
            setSelected={changeVersions}
          />
        </div>
        <div className="vg">
          <h3 className="bt">Archivo</h3>
          <div className="hg">
            <label className="vg">
              Originales
              <input
                type="number"
                index={subIndex}
                name="originals"
                value={versions[subIndex].originals}
                onChange={changeVersions}
              />
            </label>
            <label className="vg">
              Copias
              <input
                type="number"
                index={subIndex}
                name="copies"
                value={versions[subIndex].copies}
                onChange={changeVersions}
              />
            </label>
          </div>
        </div>

        <div className="vg">
          <h3 className="bt">Ubicación</h3>
          <div className="hg">
            <label className="vg">
              Armario
              <input
                type="text"
                index={subIndex}
                name="cabinet"
                value={versions[subIndex].cabinet}
                onChange={changeVersions}
              />
            </label>
            <label className="vg">
              Caja
              <input
                type="text"
                index={subIndex}
                name="box"
                value={versions[subIndex].box}
                onChange={changeVersions}
              />
            </label>
          </div>
        </div>
      </div>
      <label className="upload-pdf">
        <Upload /> Subir PDF
        <input type="file" index={subIndex} accept="application/pdf" />
      </label>
    </div>
  );
};
export default Version;
