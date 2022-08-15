import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const Author = ({
  authors,
  changeAuthors,
  countryOptions,
  index,
  subindex,
  nameOptions,
  surnameOptions,
}) => {
  return (
    <div className="author">
      <TextField
        label="Nombre"
        value={authors[index].name}
        onChange={(event, newValue) => {
          event.target.index = index;
          event.target.subindex = subindex;
          event.target.name = 'name';
          changeAuthors(event, newValue);
        }}
      />
      <TextField
        label="Apellido"
        value={authors[index].surname}
        onChange={(event, newValue) => {
          event.target.index = index;
          event.target.subindex = subindex;
          event.target.name = 'surname';
          changeAuthors(event, newValue);
        }}
      />
      <Autocomplete
        options={countryOptions}
        renderInput={(params) => <TextField {...params} label="Nacionalidad" />}
        onChange={(event, newValue) => {
          event.target.index = index;
          event.target.subindex = subindex;
          event.target.name = 'country';
          changeAuthors(event, newValue);
        }}
      />
      <TextField
        label="Rol"
        value={authors[index].role}
        onChange={(event, newValue) => {
          event.target.index = index;
          event.target.subindex = subindex;
          event.target.name = 'role';
          changeAuthors(event, newValue);
        }}
      />
    </div>
  );
};
export default Author;
