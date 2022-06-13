import React from 'react';
import { TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  noBorder: {
    border: 'none',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      padding: 15,
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: '400',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },
  },
});

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handleOnBlur = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configTextfield = {
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
    autoComplete: 'off',
    onBlur: handleOnBlur,
    defaultValue: field.value,
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
