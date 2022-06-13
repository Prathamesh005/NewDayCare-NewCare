import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
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
const AutoCompleteField = ({
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
    fullWidth: true,
    // autoSelect: true,
    value: val ? val : null, //these is important because controlled input
    options: options ? options : [],
    getOptionLabel: option => option[display] || '',
    onChange: (e, value) => {
      if (value) {
        setFieldValue(name, {
          [code]: value !== null ? value[code] : '',
          [display]: value !== null ? value[display] : '',
        });
      } else if (value === null) {
        setFieldValue(name, { [code]: '', [display]: '' });
      }
    },
    renderInput: params => (
      <TextField
        {...params}
        autoComplete="off"
        placeholder={label}
        className={classes.textField}
        variant="outlined"
        error={Boolean(
          meta && meta.touched && meta.error && meta.error[display],
        )}
        helperText={meta && meta.touched && meta.error && meta.error[display]}
        InputProps={{
          ...params.InputProps,
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
export default AutoCompleteField;
