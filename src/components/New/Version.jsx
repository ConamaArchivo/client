import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { PlusLg, XLg, Upload } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import Author from './Author';
import SelectInput from './SelectInput';

const Version = forwardRef(
  ({ countryOptions, accompanimentOptions, voicesOptions, v }, _ref) => {
    const [arrAuthors, setArrAuthors] = useState(0);
    useImperativeHandle(_ref, () => ({
      getSelectedAccompaniment: () =>
        accompanimentStateRef.current.getSelected(),
      getSelectedVoices: () => voicesStateRef.current.getSelected(),
      getSelectedArrCountry: () => {
        let arrAuthorsArray = [];
        arrAuthorsRefs.current.forEach((ref) => {
          if (ref !== null) {
            arrAuthorsArray.push(ref.getSelectedCountry());
          }
        });
        return arrAuthorsArray;
      },
    }));

    const accompanimentStateRef = useRef();
    const voicesStateRef = useRef();
    const arrAuthorsRefs = useRef([]);

    const handleAddArrAuthorBtn = () => {
      setArrAuthors(arrAuthors + 1);
    };
    const handleRemoveArrAuthorBtn = () => {
      if (arrAuthors > 0) setArrAuthors(arrAuthors - 1);
    };

    return (
      <div className="version">
          {arrAuthors !== 0 ? (
            <h3 className="bt">
              {arrAuthors > 1 ? 'Arregladores' : 'Arreglador'}
            </h3>
          ) : null}
        <div className="authors">
          {Array.from(Array(arrAuthors)).map((e, i) => (
            <Author
              countryOptions={countryOptions}
              target="arr-author"
              v={v}
              i={i}
              key={uuid()}
              ref={(el) => (arrAuthorsRefs.current[i] = el)}
            />
          ))}
        </div>
        <div className={`btns${arrAuthors === 0? ' no-margin' : ''}`}>
          <button className='add' onClick={handleAddArrAuthorBtn}>
            <PlusLg /> Agregar arreglador
          </button>
          {arrAuthors > 0 ? (
            <button className="remove" onClick={handleRemoveArrAuthorBtn}>
              <XLg /> Quitar arreglador
            </button>
          ) : null}
        </div>
        <div className="group">
          <div className="vg">
            <h3 className="bt">Voces</h3>
            <div className="hg voices">
              <div className='option-select'>
                <SelectInput
                  options={voicesOptions}
                  isMulti={false}
                  isCreatable={false}
                  ref={voicesStateRef}
                />
              </div>
              <span>a</span>
              <input
              className='number-select'
                type="number"
                id={`num-voices-${v}`}
                name={`num-voices-${v}`}
                placeholder="n° de voces"
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
              ref={accompanimentStateRef}
            />
          </div>
          <div className="vg">
            <h3 className="bt">Archivo</h3>
            <div className="hg">
              <label className="vg">
                Originales
                <input type="number" name={`originals-${v}`} />
              </label>
              <label className="vg">
                Copias
                <input type="number" name={`copies-${v}`} />
              </label>
            </div>
          </div>

          <div className="vg">
            <h3 className="bt">Ubicación</h3>
            <div className="hg">
              <label className="vg">
                Armario
                <input type="text" name={`cabinet-${v}`} />
              </label>
              <label className="vg">
                Caja
                <input type="text" name={`box-${v}`} />
              </label>
            </div>
          </div>
        </div>
        <label className="upload-pdf">
          <Upload /> Subir PDF
          <input type="file" name={`pdf-${v}`} accept="application/pdf" />
        </label>
      </div>
    );
  }
);

export default Version;
