import React, { useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from './Search';

function Table({ pieces, setSelectedPiece }) {
  const data = useMemo(() => pieces, [pieces]);

  const columns = useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'title',
      },
      {
        Header: 'Autor',
        accessor: 'authors[0].name',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

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
      <SearchBar searchValue={globalFilter} setSearchValue={setGlobalFilter} />
      {pieces.length !== 0 ? (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
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
