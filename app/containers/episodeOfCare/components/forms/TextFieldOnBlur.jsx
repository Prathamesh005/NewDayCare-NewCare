import React from 'react';
import { TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  noBorder: {
    border: 'none',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: '400',
      color: '#000000',
      padding: '10.5px 10px',
    },

    '& .MuiFormHelperText-root.Mui-error': {
      background: 'white',
    },
    '& .MuiFormHelperText-contained': {
      paddingLeft: 14,
      paddingRight: 14,
      margin: 0,
    },

    // hide arrow
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));

const TextFieldOnBlur = ({ name, endAdornment, ...otherProps }) => {
  const [field, meta] = useField(name);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handleOnBlur = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configTextfield = {
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
    autoComplete: 'off',
    onBlur: handleOnBlur,
    ...otherProps,
  };

  if (meta && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  const InputProps = {
    classes: { notchedOutline: classes.noBorder },
    endAdornment: endAdornment,
  };

  return (
    <TextField
      {...configTextfield}
      className={classes.textField}
      InputProps={InputProps}
    />
  );
};

export default TextFieldOnBlur;
