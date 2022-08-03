import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import SelectInput from './SelectInput';

const Author = forwardRef(({ countryOptions, target, v, i }, _ref) => {
  useImperativeHandle(_ref, () => ({
    getSelectedCountry: () => countryStateRef.current.getSelected(),
  }));

  const countryStateRef = useRef();

  return (
    <div className="author">
      <label className="vg">
        Nombre
        <input size="1" type="text" name={`${target}-name-${v}-${i}`} />
      </label>
      <label className="vg">
        Apellido
        <input size="1" type="text" name={`${target}-surname-${v}-${i}`} />
      </label>
      <label className="vg">
        Nacionalidad
        <SelectInput
          options={countryOptions}
          isMulti={false}
          isCreatable={false}
          ref={countryStateRef}
        />
      </label>
      <label className="vg">
        Rol
        <input size="1" type="text" name={`${target}-role-${v}-${i}`} />
      </label>
    </div>
  );
});

export default Author;
