import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import CircularProgress from '@mui/material/CircularProgress';
import SearchTopBar from './SearchTopBar';
import { flag } from 'country-emoji';
import Options from './Options';
import ClickAwayListener from '@mui/material/ClickAwayListener';
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

function Table({ pieces, setSelectedPiece, loading }) {
  const data = useMemo(
    () =>
      pieces.map((element) => {
        let authorsStr = '';
        let countryFlags = '';
        let countrySearch = '';
        if (element.authors.length !== 0) {
          element.authors.map((person) =>
            !authorsStr.length
              ? (authorsStr = `${person.surname}, ${person.name}`)
              : (authorsStr = `${authorsStr} - ${person.surname}, ${person.name}`)
          );
          element.authors.map(
            (person) =>
              (countryFlags =
                person.country && `${countryFlags} ${flag(person.country)}`)
          );
          element.authors.map(
            (person) =>
              (countrySearch =
                person.country &&
                `${countrySearch}${countries.getName(person.country, 'es', {
                  select: 'alias',
                })} `)
          );
        } else {
          authorsStr = <span className="anonymous">Anónimo</span>;
        }
        element.tableAuthors = authorsStr;
        element.tableCountry = countryFlags;
        element.tableCountrySearch = countrySearch;

        let genreStr = '';
        element.genre.map((gen, i) =>
          element.genre.length - 1 > i
            ? (genreStr = `${genreStr}${gen}, `)
            : (genreStr = `${genreStr}${gen}`)
        );
        element.tableGenre = genreStr;

        let arrAuthorsStr = '';
        let numVoicesStr = '';
        let genderVoicesStr = '';
        let cabinetStr = '';
        let boxStr = '';
        let accompanimentStr = '';
        let originalsStr = '';
        let copiesStr = '';
        element.versions.map((version) => {
          if (version.arr_authors.length !== 0) {
            version.arr_authors.map((person) =>
              !arrAuthorsStr.length
                ? (arrAuthorsStr = `${person.surname}, ${person.name}`)
                : (arrAuthorsStr = `${arrAuthorsStr} - ${person.surname}, ${person.name}`)
            );
          }
          version.accompaniment.map((gen, i) =>
            version.accompaniment.length - 1 > i
              ? (accompanimentStr = `${accompanimentStr}${gen}, `)
              : (accompanimentStr = `${accompanimentStr}${gen}`)
          );
          !cabinetStr.length
            ? (cabinetStr = `${cabinetStr}${version.files.location.cabinet}`)
            : (cabinetStr = `${cabinetStr} - ${version.files.location.cabinet}`);
          !boxStr.length
            ? (boxStr = `${boxStr}${version.files.location.box}`)
            : (boxStr = `${boxStr} - ${version.files.location.box}`);

          !originalsStr.length
            ? (originalsStr = `${originalsStr}${version.files.quantity.originals}`)
            : (originalsStr = `${originalsStr} - ${version.files.quantity.originals}`);

          !copiesStr.length
            ? (copiesStr = `${copiesStr}${version.files.quantity.copies}`)
            : (copiesStr = `${copiesStr} - ${version.files.quantity.copies}`);

          !genderVoicesStr.length
            ? (genderVoicesStr = `${genderVoicesStr}${version.voices.gender}`)
            : (genderVoicesStr = `${genderVoicesStr} - ${version.voices.gender}`);
          !numVoicesStr.length
            ? (numVoicesStr = `${numVoicesStr}${
                version.voices.num_of_voices !== 0
                  ? version.voices.num_of_voices
                  : ''
              }`)
            : (numVoicesStr = `${numVoicesStr} - ${
                version.voices.num_of_voices !== 0
                  ? version.voices.num_of_voices
                  : ''
              }`);
          return version;
        });
        element.tableArrAuthors = arrAuthorsStr;
        element.tableNumVoices = numVoicesStr;
        element.tableGenderVoices = genderVoicesStr;
        element.tableAccompaniment = accompanimentStr;
        element.tableCabinet = cabinetStr;
        element.tableOriginals = originalsStr;
        element.tableCopies = copiesStr;
        element.tableBox = boxStr;
        return element;
      }),
    [pieces]
  );

  const columns = useMemo(
    () => [
      {
        id: 'Obra',
        Header: 'Obra',
        accessor: 'title',
      },
      {
        id: 'Autor',
        Header: 'Autor',
        accessor: 'tableAuthors',
      },
      {
        id: 'Arreglador',
        Header: 'Arreglador',
        accessor: 'tableArrAuthors',
      },
      {
        id: 'País',
        Header: 'País',
        accessor: 'tableCountry',
      },
      {
        id: 'Género',
        Header: 'Género',
        accessor: 'tableGenre',
      },
      {
        id: 'Repertorio',
        Header: 'Repertorio',
        accessor: 'repertoire',
      },
      {
        id: 'Acompañamiento',
        Header: 'Acompañamiento',
        accessor: 'tableAccompaniment',
      },
      {
        id: 'Archivos originales',
        Header: 'Archivos originales',
        accessor: 'originalsStr',
      },
      {
        id: 'Copias',
        Header: 'Copias',
        accessor: 'copiesStr',
      },
      {
        id: 'N° de voces',
        Header: 'N° de voces',
        accessor: 'tableNumVoices',
      },
      {
        id: 'Voces',
        Header: 'Voces',
        accessor: 'tableGenderVoices',
      },
      {
        id: 'Armario',
        Header: 'Armario',
        accessor: 'tableCabinet',
      },
      {
        id: 'Caja',
        Header: 'Caja',
        accessor: 'tableBox',
      },
      {
        id: 'countrySearchHidden',
        Header: 'alwaysHidden',
        accessor: 'tableCountrySearch',
      },
    ],
    []
  );

  const visibleColumns = JSON.parse(localStorage.getItem('columns')) || [
    'Arreglador',
    'País',
    'Género',
    'Repertorio',
    'Acompañamiento',
    'Archivos originales',
    'Copias',
    'N° de voces',
    'Voces',
    'Armario',
    'Caja',
  ];

  const [optionsVisibility, setOptionsVisibility] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['countrySearchHidden', ...visibleColumns],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    localStorage.setItem(
      'columns',
      JSON.stringify(
        allColumns
          .filter((c) => !c.isVisible && c.id !== 'countrySearchHidden')
          .map((c) => c.id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[...allColumns]]);

  const { globalFilter } = state;

  const handleTableClick = (e, row) => {
    if (e.currentTarget.classList.contains('selected')) {
      setSelectedPiece({});
      e.currentTarget.classList.remove('selected');
    } else {
      setSelectedPiece(row.original);
      if (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected');
      }
      e.currentTarget.classList.add('selected');
    }
  };

  return (
    <div className="table-wrapper">
      <ClickAwayListener onClickAway={() => setOptionsVisibility(false)}>
        <div className="top-bar search">
          <SearchTopBar
            searchValue={globalFilter}
            setSearchValue={setGlobalFilter}
            options={optionsVisibility}
            setOptions={setOptionsVisibility}
          />
          <Options
            allColumns={allColumns}
            optionsVisibility={optionsVisibility}
          />
        </div>
      </ClickAwayListener>
      {pieces.length !== 0 ? (
        <div className="table">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ⏷'
                          : ' ⏶'
                        : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={(e) => handleTableClick(e, row)}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="loading-container">
          {loading && <CircularProgress />}
        </div>
      )}
    </div>
  );
}

export default Table;
