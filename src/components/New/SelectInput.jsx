import React, { useState, forwardRef, useImperativeHandle } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const SelectInput = forwardRef(({ options, isMulti, isCreatable }, _ref) => {
  const [selected, setSelected] = useState(isCreatable ? [] : {});

  useImperativeHandle(_ref, () => ({
    getSelected: () => selected,
  }));

  const customStyles = (provided) => {
    return {
      ...provided,
      colors: {
        ...provided.colors,
        primary: 'white', // Border focus
        neutral30: 'transparent', // Border hover
        neutral0: '#444', // Background
        neutral80: '#fff', // Input text
        primary25: '#666', // Hover option
        primary50: '#555', // Active option
        neutral10: '#181818', // Selected multi-option background
        neutral20: 'transparent', // Selected multi-option background
        danger: '#fff', // Remove option button X hover
        dangerLight: '#666', // Remove option button background hover
      },
    };
  };

  const selectProps = {
    isSearchable: true,
    isMulti: isMulti,
    options: options,
    theme: customStyles,
    onChange: setSelected,
    placeholder: '',
    formatCreateLabel: (userInput) => `Agregar "${userInput}"`,
    noOptionsMessage: () => 'No hay opciones',
    components: {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
    },
  };

  return isCreatable ? (
    <CreatableSelect {...selectProps} />
  ) : (
    <Select {...selectProps} />
  );
});

export default SelectInput;
