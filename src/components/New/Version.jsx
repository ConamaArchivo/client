import React from 'react';
import { PlusLg, XLg } from 'react-bootstrap-icons';
import Author from './Author';
import SelectInput from './SelectInput';
import FileUpload from './FIleUpload';

const Version = ({
  versions,
  changeVersions,
  setVersions,
  countryOptions,
  accompanimentOptions,
  voicesOptions,
  subindex,
  setFiles,
  files
}) => {
  const handleAddArrAuthorBtn = (e) => {
    e.preventDefault();
    let newArray = [...versions];
    newArray[subindex].arr_author.push({
      name: '',
      surname: '',
      country: '',
      role: '',
    });
    setVersions(newArray);
  };

  const handleRemoveArrAuthorBtn = (e) => {
    e.preventDefault();
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

  return (
    <div className="version">
      {versions[subindex].arr_author.length !== 0 ? (
        <h3 className="bt">
          {versions[subindex].arr_author.length > 1
            ? 'Arregladores'
            : 'Arreglador'}
        </h3>
      ) : null}
      <div className="authors">
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
      <div
        className={`btns${
          versions[subindex].arr_author.length === 0 ? ' no-margin' : ''
        }`}
      >
        <button className="add" onClick={handleAddArrAuthorBtn}>
          <PlusLg /> Agregar arreglador
        </button>
        {versions[subindex].arr_author.length > 0 ? (
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
                index={subindex}
                name="gender"
                setSelected={changeVersions}
                defaultValue={voicesOptions[0]}
              />
            </div>
            <span>a</span>
            <input
              className="number-select"
              type="number"
              placeholder="n° de voces"
              index={subindex}
              name="num_of_voices"
              value={versions[subindex].num_of_voices}
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
            index={subindex}
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
                index={subindex}
                name="originals"
                value={versions[subindex].originals}
                onChange={changeVersions}
              />
            </label>
            <label className="vg">
              Copias
              <input
                type="number"
                index={subindex}
                name="copies"
                value={versions[subindex].copies}
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
                index={subindex}
                name="cabinet"
                value={versions[subindex].cabinet}
                onChange={changeVersions}
              />
            </label>
            <label className="vg">
              Caja
              <input
                type="text"
                index={subindex}
                name="box"
                value={versions[subindex].box}
                onChange={changeVersions}
              />
            </label>
          </div>
        </div>
      </div>
      <FileUpload index={subindex} setFiles={setFiles} files={files} />
    </div>
  );
};
export default Version;
