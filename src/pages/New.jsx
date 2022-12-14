import React, { useState, useEffect } from 'react';
import Form from '../components/New/Form';
import { axiosPublic } from '../axios';
import useStyle from '../hooks/useStyle';
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
const { flag } = require('country-emoji');

const New = () => {
  const { prefersDarkMode } = useStyle();
  const [genreOptions, setGenreOptions] = useState([]);
  const [accompanimentOptions, setAccompanimentOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [surnameOptions, setSurnameOptions] = useState([]);
  const [arrNameOptions, setArrNameOptions] = useState([]);
  const [arrSurnameOptions, setArrSurnameOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const res = await axiosPublic.get('/new', {});
        setGenreOptions(res.data.genres);
        setAccompanimentOptions(res.data.accompaniments);
        setNameOptions(res.data.names);
        setSurnameOptions(res.data.surnames);
        setArrNameOptions(res.data.arr_names);
        setArrSurnameOptions(res.data.arr_surnames);
      } catch (error) {}
    };
    getOptions();
  }, []);

  const countryOptions = [];
  Object.keys(countries.getNames('es', { select: 'official' })).forEach(
    (code) => {
      const name = countries.getName(code, 'es', { select: 'alias' });
      const flagIcon = flag(code);
      if (name.length < 18 && flagIcon) {
        countryOptions.push({ value: code, label: `${flagIcon} ${name}` });
      }
    }
  );

  const voicesOptions = [
    { value: 'mixto', label: 'Mixto' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
  ];

  const [loading, setLoading] = useState(false);

  return (
    <div
      id="new"
      className="section-container"
      data-dark-theme={prefersDarkMode}
    >
      <Form
        countryOptions={countryOptions}
        genreOptions={genreOptions}
        accompanimentOptions={accompanimentOptions}
        voicesOptions={voicesOptions}
        nameOptions={nameOptions}
        surnameOptions={surnameOptions}
        arrNameOptions={arrNameOptions}
        arrSurnameOptions={arrSurnameOptions}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
};

export default New;
