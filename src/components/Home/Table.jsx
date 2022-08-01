import React, { useMemo } from 'react';
import { useTable } from 'react-table';

function Table() {
  const data = useMemo(
    () => [
      {
        title: 'Obra 1',
        author: 'Autor 1',
      },
      {
        title: 'Obra 2',
        author: 'Autor 2',
      },
      {
        title: 'Obra 3',
        author: 'Autor 3',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'title',
      },
      {
        Header: 'Autor',
        accessor: 'author',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table-wrapper">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
