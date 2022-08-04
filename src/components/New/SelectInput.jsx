import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const SelectInput = ({
  options,
  isMulti,
  isCreatable,
  name,
  setSelected,
  index,
  subIndex
}) => {
  const setValues = (event) => {
    let selected = isCreatable ? [] : '';
    if (isCreatable) {
      event.forEach((option) => selected.push(option.value));
    } else selected = event.value;
    const eventResponse = {
      target: {
        name: name,
        index: index,
        subIndex: subIndex,
        value: selected,
      },
    };
    setSelected(eventResponse);
  };

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
    onChange: setValues,
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
};

export default SelectInput;
