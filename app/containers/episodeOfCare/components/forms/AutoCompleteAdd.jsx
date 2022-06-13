import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import { find } from 'lodash';
const filterArray = createFilterOptions();
const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
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
const AutoCompleteAdd = ({
  name,
  val,
  label,
  options,
  code,
  display,
  ...otherProps
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const configSelect = {
    ...field,
    ...otherProps,
    size: 'small',
    value: val ? val : null,
    options: options ? options : [],
    fullWidth: true,
    freeSolo: true,
    autoFocus: true,
    selectOnFocus: true,
    // disableClearable: true,
    // clearOnBlur: true,
    handleHomeEndKeys: true,
    renderOption: option => option.display,

    filterOptions: (optionsArray, params) => {
      const filtered = filterArray(optionsArray, params);

      if (params.inputValue !== '') {
        if (
          optionsArray.find(item =>
            item.display
              .toLowerCase()
              .includes(params['inputValue'].toLowerCase()),
          ) === undefined &&
          optionsArray.find(item =>
            item.display
              .toLowerCase()
              .includes(params['inputValue'].toLowerCase()),
          ) === undefined
        ) {
          filtered.push({
            inputValue: params.inputValue,
            display: `Add "${params.inputValue}"`,
          });
        }
      }

      return filtered;
    },
    getOptionLabel: option => {
      if (typeof option === 'string') {
        return option;
      }
      // Add "xxx" option created dynamically
      if (option.inputValue) {
        return option.inputValue;
      }
      return option.display;
    },

    onChange: (e, value) => {
      //top
      // debugger;
      if (typeof value === 'string') {
        setFieldValue(name, { [code]: value, [display]: value });
      } else if (value === null) {
        setFieldValue(name, { [code]: '', [display]: '' });
      } else if (value && value.code) {
        setFieldValue(name, {
          [code]: value[code],
          [display]: value[display],
        });
      } else if (value && value.inputValue) {
        setFieldValue(name, {
          [code]: value.inputValue,
          [display]: value.inputValue,
        });
      }
      // else {
      //     setFieldValue(value)
      // }
    },
    renderInput: params => (
      <TextField
        {...params}
        className={classes.textField}
        variant="outlined"
        error={Boolean(
          meta && meta.touched && meta.error && meta.error[display],
        )}
        helperText={meta && meta.touched && meta.error && meta.error[display]}
        InputLabelProps={{ shrink: false }}
        onBlur={e => {
          if (e.target.value) {
            let removeDup = find(options, function(o) {
              return o.display === e.target.value;
            });
            if (removeDup) {
              setFieldValue(name, {
                code: removeDup.code,
                display: removeDup.display,
              });
            } else {
              setFieldValue(name, {
                code: e.target.value,
                display: e.target.value,
              });
            }
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
export default AutoCompleteAdd;
