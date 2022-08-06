import React from 'react';
import SelectInput from './SelectInput';

const Author = ({
  authors,
  changeAuthors,
  countryOptions,
  index,
  subindex,
}) => {
  return (
    <div className="author">
      <label className="vg">
        Nombre
        <input
          size="1"
          type="text"
          index={index}
          subindex={subindex}
          name="name"
          value={authors[index].name}
          onChange={changeAuthors}
        />
      </label>
      <label className="vg">
        Apellido
        <input
          size="1"
          type="text"
          index={index}
          subindex={subindex}
          name="surname"
          value={authors[index].surname}
          onChange={changeAuthors}
        />
      </label>
      <label className="vg">
        Nacionalidad
        <SelectInput
          isMulti={false}
          isCreatable={false}
          index={index}
          subindex={subindex}
          name="country"
          options={countryOptions}
          setSelected={changeAuthors}
        />
      </label>
      <label className="vg">
        Rol
        <input
          size="1"
          type="text"
          index={index}
          subindex={subindex}
          name="role"
          value={authors[index].role}
          onChange={changeAuthors}
        />
      </label>
    </div>
  );
};
export default Author;
