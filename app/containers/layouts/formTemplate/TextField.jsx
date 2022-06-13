import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  noBorder: {
    border: 'none',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-adornedStart': {
      background: '#F4F4F4',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      background: '#F4F4F4',
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
});

const TextfieldWrapper = ({
  name,
  startAdornment,
  endAdornment,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles();

  const configTextfield = {
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
    autoComplete: 'new-password',
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField
      {...configTextfield}
      className={classes.textField}
      InputProps={{
        classes: { notchedOutline: classes.noBorder },
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
    />
  );
};

export default TextfieldWrapper;
