import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textFieldOutline: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    // '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
    //   fontSize: '0.9rem',
    //   fontWeight: 500,
    // },
    // filled
    // '& .MuiFilledInput-input': {
    //   background: '#F4F4F4',
    //   fontSize: '0.9rem',
    //   fontWeight: 'bold',
    // },
    // '& .MuiInputLabel-filled.MuiInputLabel-marginDense': {
    //   fontSize: '0.9rem',
    //   fontWeight: 500,
    // },
  },

  inputOutline: {
    background: '#F4F4F4',
    border: '1px solid #70707033',
  },
  option: {
    padding: 8,
    fontSize: '1rem',
  },
  noBorder: {
    border: 'none',
  },
});

const OutlinedAutoCompleteInput = ({
  name,
  val,
  label,
  options,
  code,
  display,
  placeholder,
  inputProps,
  ...otherProps
}) => {
  // const { }=otherProps
  const classes = useStyles();
  const configSelect = {
    fullWidth: true,
    options: options ? options : [],
    onChange: (e, value) => ({}),
    renderInput: params => (
      <TextField
        {...params}
        // placeholder={label}
        size="small"
        className={classes.textFieldOutline}
        variant="outlined"
        placeholder={placeholder || ''}
        InputProps={{
          ...params.InputProps,
          className: classes.inputOutline,
          classes: { notchedOutline: classes.noBorder },
        }}
        {...inputProps}
      />
    ),
    disableClearable: true,
    size: 'small',
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
export default OutlinedAutoCompleteInput;
