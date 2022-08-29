import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from './Search';
import { flag } from 'country-emoji';
import { Checkbox, FormControlLabel } from '@mui/material';
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

function Table({ pieces, setSelectedPiece }) {
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
                person.country && `${countryFlags}${flag(person.country)}`)
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
          authorsStr = 'Anónimo';
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
        id: 'countrySearchHidden',
        Header: 'alwaysHidden',
        accessor: 'tableCountrySearch',
      },
    ],
    []
  );
  const [optionsVisibility, setOptionsVisibility] = useState(true);

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
        hiddenColumns: ['countrySearchHidden'],
      },
    },
    useGlobalFilter,
    useSortBy
  );

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
      <SearchBar
        searchValue={globalFilter}
        setSearchValue={setGlobalFilter}
        options={optionsVisibility}
        setOptions={setOptionsVisibility}
      />
      {optionsVisibility && (
        <div className="options">
          {allColumns.map(
            (column) =>
              column.Header !== 'alwaysHidden' && (
                <div key={column.id}>
                  <FormControlLabel
                    control={<Checkbox {...column.getToggleHiddenProps()} />}
                    label={column.Header}
                  />
                </div>
              )
          )}
        </div>
      )}
      {pieces.length !== 0 ? (
        <table {...getTableProps()}>
          {console.log('data: ', data)}
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
      ) : (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Table;
