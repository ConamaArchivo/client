import React from 'react';
import { XLg, Link45deg, Download, List } from 'react-bootstrap-icons';
import { flag } from 'country-emoji';

const piece = {
  _id: '62e6cb668as1d4a7c0982afe',
  title: 'Título',
  author: [
    {
      name: 'Nombre1',
      surname: 'Apellido1',
      country_code: 'AR',
      role: 'Rol1',
    },
    {
      name: 'Nombre2',
      surname: 'Apellido2',
      country_code: 'US',
      role: '',
    },
  ],
  genre: ['Género1', 'Género2', 'Género3', 'Género4', 'Género5'],
  repertoire: 'académico',
  comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  versions: [
    {
      arrangement_author: [
        {
          name: 'Nombre1',
          surname: 'Apellido1',
          country_code: 'AR',
          role: '',
        },
        {
          name: 'Nombre2',
          surname: 'Apellido2',
          country_code: 'US',
          role: 'Rol2',
        },
      ],
      voices: {
        gender: 'mixto',
        num_of_voices: 16,
      },
      accompaniment: ['Acompañamiento1', 'Acompañamiento2'],
      files: {
        pdf: {
          url: {
            webContentLink:
              'https://www.google.com/search?q=webContentLink&sourceid=chrome&ie=UTF-8',
            webViewLink:
              'https://www.google.com/search?q=webViewLink&sourceid=chrome&ie=UTF-8',
            webRawLink:
              'https://www.google.com/search?q=webRawLink&sourceid=chrome&ie=UTF-8',
          },
          thumbnail:
            '/9j/4AAQSkZJRgABAQEASABIAAD//gA2IEltYWdlIGdlbmVyYXRlZCBieSBHUEwgR2hvc3RzY3JpcHQgKGRldmljZT1wcG1yYXcpCv/bAEMAEAsMDgwKEA4NDhIREBMYKBoYFhYYMSMlHSg6Mz08OTM4N0BIXE5ARFdFNzhQbVFXX2JnaGc+TXF5cGR4XGVnY//AAAsIAA4ACgEBEQD/xAAXAAADAQAAAAAAAAAAAAAAAAABBAUG/8QAIRABAAEEAgEFAAAAAAAAAAAAAREAAgMSBCEFBkFRYYH/2gAIAQEAAD8A0h6l411+hgzbLBMB7QrPRLH401j81w78dtzfEgx8VQ0tRNSH6ogBB0Ff/9k=',
        },
        quantity: {
          originals: 10,
          copies: 65,
        },
        location: {
          cabinet: 'A',
          box: '1 - A',
        },
      },
    },
    {
      arrangement_author: [
        {
          name: 'Nombre1',
          surname: 'Apellido1',
          country_code: 'AR',
          role: '',
        },
      ],
      voices: {
        gender: 'femenino',
        num_of_voices: 4,
      },
      accompaniment: [],
      files: {
        pdf: {
          url: {
            webContentLink:
              'https://www.google.com/search?q=webContentLink&sourceid=chrome&ie=UTF-8',
            webViewLink:
              'https://www.google.com/search?q=webViewLink&sourceid=chrome&ie=UTF-8',
            webRawLink:
              'https://www.google.com/search?q=webRawLink&sourceid=chrome&ie=UTF-8',
          },
          thumbnail:
            '/9j/4AAQSkZJRgABAQEASABIAAD//gA2IEltYWdlIGdlbmVyYXRlZCBieSBHUEwgR2hvc3RzY3JpcHQgKGRldmljZT1wcG1yYXcpCv/bAEMAEAsMDgwKEA4NDhIREBMYKBoYFhYYMSMlHSg6Mz08OTM4N0BIXE5ARFdFNzhQbVFXX2JnaGc+TXF5cGR4XGVnY//AAAsIAA4ACgEBEQD/xAAXAAADAQAAAAAAAAAAAAAAAAABBAUG/8QAIRABAAEEAgEFAAAAAAAAAAAAAREAAgMSBCEFBkFRYYH/2gAIAQEAAD8A0h6l411+hgzbLBMB7QrPRLH401j81w78dtzfEgx8VQ0tRNSH6ogBB0Ff/9k=',
        },
        quantity: {
          originals: 10,
          copies: 65,
        },
        location: {
          cabinet: 'A',
          box: '1 - A',
        },
      },
    },
  ],
  date_added: '2022-07-31T03:00:00.000Z',
  __v: 0,
};

const Card = () => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-btns">
          <button className="more-actions">
            <List />
          </button>

          <button className="close-card">
            <XLg />
          </button>
          <div className="actions">
            <a href="/edit">EDITAR</a>
            <a href="/delete">BORRAR</a>
          </div>
        </div>
        <h3>{piece.title}</h3>
        <div className="author">
          {piece.author.length !== 0 ? (
            piece.author.map((person) => (
              <div>
                <h4>{`${person.surname}, ${person.name}${
                  person.role !== '' ? ` (${person.role})` : ''
                }`}</h4>
                <span data-code={person.country_code}>
                  {flag(person.country_code)}
                </span>
              </div>
            ))
          ) : (
            <h4 className="anonymous">Anónimo</h4>
          )}
        </div>
        {piece.genre.length !== 0 ? (
          <h5>{piece.genre.length > 1 ? 'Géneros' : 'Género'}</h5>
        ) : null}
        {piece.genre.length !== 0 ? (
          <div className="genres">
            {piece.genre.map((element) => (
              <div className="genre-item">{element}</div>
            ))}
          </div>
        ) : null}
        <div className="repertoire">Repertorio: {piece.repertoire}</div>
        {piece.comment !== '' ? (
          <div className="comment">{piece.comment}</div>
        ) : null}
        {piece.versions.map((version) => (
          <div className="version">
            {/* <div className="divider"></div> */}
            {version.arrangement_author.length !== 0 ? (
              <h5>
                {version.arrangement_author.length > 1
                  ? 'Arregladores'
                  : 'Arreglador'}
              </h5>
            ) : null}
            {version.arrangement_author.length !== 0 ? (
              <div className="arr-author">
                {version.arrangement_author.map((person) => (
                  <div>
                    <h4>{`${person.surname}, ${person.name}${
                      person.role !== '' ? ` (${person.role})` : ''
                    }`}</h4>
                    <span data-code={person.country_code}>
                      {flag(person.country_code)}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="voices">
              Para coro {version.voices.gender}
              {version.voices.num_of_voices !== null
                ? ` a ${version.voices.num_of_voices} voces`
                : ''}
            </div>
            {version.accompaniment.length !== 0 ? (
              <h5>Acompañamiento</h5>
            ) : null}
            {version.accompaniment.length !== 0 ? (
              <div className="accompaniment">
                {version.accompaniment.map((element) => (
                  <div className="accompaniment-item">{element}</div>
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
              {version.files.pdf.thumbnail !== undefined ? (
                <div className="pdf">
                  <div className="img-wrapper">
                    <img
                      alt="thumbnail"
                      src={`data:image/jpg;base64,${version.files.pdf.thumbnail.toString(
                        'base64'
                      )}`}
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
};
export default Card;
