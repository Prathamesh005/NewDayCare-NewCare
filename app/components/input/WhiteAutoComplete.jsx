import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textFieldWhite: {
    '& .MuiOutlinedInput-input': {
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
  inputWhite: {
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',

    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  noBorder: {
    border: 'none',
  },
  option: {
    padding: 8,
    fontSize: '1rem',
  },
});

const WhiteAutoComplete = ({
  name,
  val,
  label,
  options = [],
  code,
  display,
  ...otherProps
}) => {
  const classes = useStyles();

  const configSelect = {
    fullWidth: true,
    options: options ? options : [],
    // getOptionLabel: option => option || '',
    size: 'small',
    renderInput: params => (
      <TextField
        {...params}
        className={classes.textFieldWhite}
        style={{ marginTop: '0px', marginBottom: '0px' }}
        variant="outlined"
        InputLabelProps={{ shrink: false }}
        placeholder="Select"
        InputProps={{
          ...params.InputProps,
          className: classes.inputWhite,
          classes: { notchedOutline: classes.noBorder },
        }}
      />
    ),
    disableClearable: true,
    ...otherProps,
  };

  return (
    <Autocomplete
      classes={{
        option: classes.option,
      }}
      {...configSelect}
    />
  );
};

// NOTE : IN testing
export default WhiteAutoComplete;
