import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useField, useFormikContext } from 'formik';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
const filterArray = createFilterOptions();

const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
  },
  noBorder: {
    border: 'none',
  },
  textField1: {
    background: '#F4F4F4',
    paddingLeft: 3.5,
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },

  displayName: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
});

const MultipleFreeSoloAutoComplete = ({
  name,
  value,
  label,
  options,
  code,
  display,
  ...otherProps
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const configSelect = {
    multiple: true,
    // fullWidth: true,
    id: 'tags-filled',
    options: options ? options : [],
    value: value,
    freeSolo: true,

    getOptionLabel: option => {
      if (typeof option === 'string') {
        return option;
      }
      // Add "xxx" option created dynamically
      if (option.inputValue) {
        return option[display];
      }
      return option[display];
    },
    filterOptions: (optionsArray, params) => {
      const filtered = filterArray(optionsArray, params);
      // Suggest the creation of a new value
      if (params.inputValue !== '') {
        filtered.push({
          inputValue: params.inputValue,
          [display]: `Add "${params.inputValue}"`,
        });
      }
      return filtered;
    },

    onChange: (event, newValue) => {
      let findInputValue = newValue && newValue.find(ele => ele.inputValue);
      if (findInputValue) {
        setFieldValue(name, [
          ...value,
          {
            [code]: findInputValue.inputValue,
            [display]: findInputValue.inputValue,
          },
        ]);
      } else {
        setFieldValue(name, newValue);
      }
    },

    renderTags: (value, getTagProps) => {
      return value.map((option, index) => {
        return (
          <span className={classes.displayName}>{`${option[display]} ,`}</span>
        );
      });
    },

    className: classes.textField1,
    renderInput: params => (
      <TextField
        {...params}
        className={classes.textField}
        margin="dense"
        variant="outlined"
        placeholder={value && value.length === 0 && label}
        InputProps={{
          ...params.InputProps,
          classes: { notchedOutline: classes.noBorder },
        }}
      />
    ),
    ...otherProps,
  };

  return <Autocomplete {...configSelect} />;
};
export default MultipleFreeSoloAutoComplete;

{
  /* <Autocomplete
      multiple
      id="tags-filled"
      options={options.map(option => option.display)}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      className={classes.textField1}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Favorites"
          margin="dense"
          className={classes.textField}
          InputProps={{
            ...params.InputProps,
            // className: classes.input1,
            classes: { notchedOutline: classes.noBorder },
          }}
        />
      )}
    /> */
}
