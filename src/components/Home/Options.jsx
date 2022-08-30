import { Checkbox, FormControlLabel } from '@mui/material';

const Options = ({ allColumns, optionsVisibility }) => {
  return (
    <div className={`options${optionsVisibility ? ' active' : ''}`}>
      {allColumns.map(
        (column) =>
          column.Header !== 'alwaysHidden' &&
          column.Header !== 'Obra' && (
            <div key={column.id}>
              <FormControlLabel
                control={<Checkbox {...column.getToggleHiddenProps()} />}
                label={column.Header}
              />
            </div>
          )
      )}
    </div>
  );
};

export default Options;
