import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  dobField: {
    fontSize: '0.9rem',
    fontWeight: '400',
    background: '#F4F4F4',
    '& .MuiFilledInput-inputMarginDense': {
      padding: '10.5px',
    },
    '& ::-webkit-calendar-picker-indicator': {
      marginLeft: 0,
    },

    '& .MuiOutlinedInput-input': {
      [theme.breakpoints.down('md')]: {
        paddingRight: '5px',
        paddingLeft: '5px',
      },
    },
  },
  fontBold: {
    fontWeight: 'bold',
  },
  noBorder: {
    border: 'none',
  },
  // textField: {
  //   '& .MuiOutlinedInput-input': {
  //     background: '#F4F4F4',
  //     fontSize: '0.9rem',
  //     fontWeight: '400',
  //     padding: '18.5px 5px',
  //   },
  // },
}));

const DateTimePickerField = ({
  name,
  minDate,
  maxDate,
  fontWeightBold,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles();

  const configDateTimePicker = {
    variant: 'outlined',
    fullWidth: true,
    size: 'small',
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }
  const InputProps = {};
  return minDate !== '' && maxDate === '' ? (
    <TextField
      // className={classes.textField}
      {...configDateTimePicker}
      InputProps={{
        className: clsx(classes.dobField, fontWeightBold && classes.fontBold),
        // disableUnderline: true,
        placeholder: 'dd-mm-yyyy',
        classes: { notchedOutline: classes.noBorder },
      }}
      inputProps={{ min: moment(minDate).format('YYYY-MM-DD') }}
    />
  ) : minDate === '' && maxDate !== '' ? (
    <TextField
      {...configDateTimePicker}
      // className={classes.textField}
      InputProps={{
        className: clsx(classes.dobField, fontWeightBold && classes.fontBold),
        // disableUnderline: true,
        placeholder: 'dd-mm-yyyy',
        classes: { notchedOutline: classes.noBorder },
      }}
      inputProps={{ max: moment(maxDate).format('YYYY-MM-DD') }}
    />
  ) : (
    <TextField
      {...configDateTimePicker}
      // className={classes.textField}
      InputProps={{
        className: clsx(classes.dobField, fontWeightBold && classes.fontBold),
        // disableUnderline: true,
        placeholder: 'dd-mm-yyyy',
        classes: { notchedOutline: classes.noBorder },
      }}
      inputProps={{
        max: moment(maxDate).format('YYYY-MM-DD'),
        min: moment(minDate).format('YYYY-MM-DD'),
      }}
    />
  );
};

export default DateTimePickerField;
