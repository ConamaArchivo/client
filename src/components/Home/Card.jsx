import React from 'react';
import { XLg, Link45deg, Download, List } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import { Buffer } from 'buffer';
import { flag } from 'country-emoji';
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

const Card = ({ selectedPiece, setSelectedPiece }) => {
  if (Object.keys(selectedPiece).length !== 0) {
    console.log(selectedPiece);
    return (
      <div className="card-wrapper">
        <div className="card">
          <div className="card-btns">
            <button className="more-actions">
              <List />
            </button>

            <button className="close-card" onClick={() => setSelectedPiece({})}>
              <XLg />
            </button>
            <div className="actions">
              <a href="/edit">EDITAR</a>
              <a href="/delete">BORRAR</a>
            </div>
          </div>
          <h3>{selectedPiece.title}</h3>
          <div className="author">
            {selectedPiece.authors.length !== 0 ? (
              selectedPiece.authors.map((person) => (
                <div key={uuid()}>
                  <h4>{`${person.surname}, ${person.name}${
                    person.role !== '' ? ` (${person.role})` : ''
                  }`}</h4>
                  <span
                    data-country={countries.getName(person.country, 'es', {
                      select: 'alias',
                    })}
                  >
                    {flag(person.country)}
                  </span>
                </div>
              ))
            ) : (
              <h4 className="anonymous">Anónimo</h4>
            )}
          </div>
          {selectedPiece.genre.length !== 0 ? (
            <h5>{selectedPiece.genre.length > 1 ? 'Géneros' : 'Género'}</h5>
          ) : null}
          {selectedPiece.genre.length !== 0 ? (
            <div className="genres">
              {selectedPiece.genre.map((element) => (
                <div className="genre-item" key={uuid()}>
                  {element}
                </div>
              ))}
            </div>
          ) : null}
          <div className="repertoire">
            Repertorio: {selectedPiece.repertoire}
          </div>
          {selectedPiece.comment !== '' ? (
            <div className="comment">{selectedPiece.comment}</div>
          ) : null}
          {selectedPiece.versions.map((version) => (
            <div className="version" key={uuid()}>
              {/* <div className="divider"></div> */}
              {version.arr_authors.length !== 0 ? (
                <h5>
                  {version.arr_authors.length > 1
                    ? 'Arregladores'
                    : 'Arreglador'}
                </h5>
              ) : null}
              {version.arr_authors.length !== 0 ? (
                <div className="arr-author">
                  {version.arr_authors.map((person) => (
                    <div key={uuid()}>
                      <h4>{`${person.surname}, ${person.name}${
                        person.role !== '' ? ` (${person.role})` : ''
                      }`}</h4>
                      <span
                        data-country={countries.getName(person.country, 'es', {
                          select: 'alias',
                        })}
                      >
                        {flag(person.country)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="voices">
                Para coro {version.voices.gender}
                {version.voices.num_of_voices !== 0
                  ? ` a ${version.voices.num_of_voices} voces`
                  : ''}
              </div>
              {version.accompaniment.length !== 0 ? (
                <h5>Acompañamiento</h5>
              ) : null}
              {version.accompaniment.length !== 0 ? (
                <div className="accompaniment">
                  {version.accompaniment.map((element) => (
                    <div className="accompaniment-item" key={uuid()}>
                      {element}
                    </div>
                  ))}
                </div>
              ) : null}
              <h5>Archivo</h5>
              <div className="archive">
                <div className="archive-item">
                  Originales: {version.files.quantity.originals}
                </div>
                <div className="archive-item">
                  Copias: {version.files.quantity.copies}
                </div>
                <div className="location">
                  {version.files.location.cabinet !== ''
                    ? `Armario ${version.files.location.cabinet}`
                    : null}
                  {version.files.location.box !== ''
                    ? version.files.location.cabinet !== ''
                      ? `, caja ${version.files.location.box}`
                      : `Caja ${version.files.location.box}`
                    : null}
                </div>
                {version.files.pdf ? (
                  <div className="pdf">
                    <div className="img-wrapper">
                      <img
                        alt="thumbnail"
                        src={`data:image/jpg;base64,${Buffer.from(
                          version.files.pdf.thumbnail.data,
                          'binary'
                        ).toString('base64')}`}
                      />
                      <a
                        className="link"
                        rel="noreferrer"
                        target="_blank"
                        href={version.files.pdf.url.webRawLink}
                      >
                        <Link45deg />
                      </a>
                      <a
                        className="download"
                        href={version.files.pdf.url.webContentLink}
                      >
                        <Download />
                        <div className="loader"></div>
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else return null;
};
export default Card;
