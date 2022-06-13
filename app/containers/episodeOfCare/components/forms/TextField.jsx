import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

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
  },
}));

const TextfieldWrapper = ({ name, endAdornment, ...otherProps }) => {
  const [field, meta] = useField(name);
  const classes = useStyles();

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
    autoComplete: 'off',
  };

  if (meta && meta.touched && meta.error) {
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

export default TextfieldWrapper;
