import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import { makeStyles} from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles({
  dobField:{
    // fontSize:"0.9rem",
    background:"#F4F4F4",
    "& .MuiFilledInput-inputMarginDense":{
      padding:"12px"
    },
  },
});


const DateTimePickerField = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles();

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    variant: 'filled',
    fullWidth: true,
    size:"small",
    InputLabelProps: {
      shrink: true
    },
    autoComplete:'off'
  };

  if(meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <TextField
      {...configDateTimePicker}
      InputProps={{
        placeholder:"dd-mm-yyyy",
        className:classes.dobField,
        disableUnderline: true,
      }}
    />
  );
};

export default DateTimePickerField;