import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import Search from '@material-ui/icons/Search';
const filterArray = createFilterOptions();
const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  textField1: {
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
});
const AutoCompleteTextSearch = ({
  name,
  label,
  options,
  code,
  value,
  display,
  ...otherProps
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const configSelect = {
    ...field,
    ...otherProps,
    options: options ? options : [],
    value: value ? value : null,

    filterOptions: (optionsArray, params) => {
      const filtered = filterArray(optionsArray, params);
      // debugger;
      // Suggest the creation of a new value
      if (params.inputValue !== '') {
        filtered.push({
          inputValue: params.inputValue,
          [display]: `Add "${params.inputValue}"`,
        });
      }

      return filtered;
    },
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

    onChange: (e, value) => {
      if (value) {
        if (typeof value === 'string') {
          setFieldValue(name, {
            [code]: parseInt(''),
            [display]: value,
          });
        } else if (value && value.inputValue) {
          setFieldValue(name, {
            [code]: parseInt(value.inputValue.length),
            [display]: value.inputValue,
          });
        } else
          setFieldValue(name, {
            [code]: value['code'] && value['code'].length,
            [display]: value['display'],
          });
      }
    },
    selectOnFocus: true,
    freeSolo: true,
    className: classes.textField1,
    renderInput: params => (
      <TextField
        {...params}
        className={classes.textField}
        margin="dense"
        variant="outlined"
        InputLabelProps={{ shrink: false }}
        error={Boolean(
          meta && meta.touched && meta.error && meta.error[display],
        )}
        helperText={meta && meta.touched && meta.error && meta.error[display]}
        onBlur={e => {
          if (e.target.value) {
            if (typeof e.target.value === 'string') {
              setFieldValue(name, {
                [code]: parseInt(e.target.value.length),
                [display]: e.target.value,
              });
            }
          } else if (e.target.value === '') {
            setFieldValue(name, {
              [code]: '',
              [display]: '',
            });
          }
        }}
        InputProps={{
          ...params.InputProps,
          placeholder: label,
          className: classes.input1,
          classes: { notchedOutline: classes.noBorder },
        }}
      />
    ),
  };
  // console.log({ ...field })
  // console.log(meta)
  // console.log("val", val)
  return <Autocomplete {...configSelect} />;
};
export default AutoCompleteTextSearch;
