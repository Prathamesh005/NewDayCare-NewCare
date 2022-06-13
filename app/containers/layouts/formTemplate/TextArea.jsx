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
      padding: 15,
      paddingTop: '10.5px',
      paddingBottom: '10.5px',
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },
  },
});

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const classes = useStyles();

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
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
      }}
    />
  );
};

export default TextfieldWrapper;
