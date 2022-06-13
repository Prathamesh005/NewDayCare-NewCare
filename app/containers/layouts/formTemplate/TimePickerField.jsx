import DateFnsUtils from '@date-io/date-fns';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import clockImg from '../../../images/assets/clock-outline.svg';

const useStyles = makeStyles({
  dobField: {
    fontSize: '0.9rem',
    background: '#F4F4F4',
    padding: '6px 0px 5px 12px',
    borderRadius: 5,
    '&:hover': {
      background: '#F4F4F4',
    },
  },
});

const theme = createTheme({
  overrides: {
    MuiPickersClock: {
      clock: {
        // backgroundColor: 'red'
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#ff3399',
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: '#ff3399',
      },
      noPoint: {
        backgroundColor: '#ff3399',
      },
      thumb: {
        borderColor: '#ff3399',
      },
    },
    MuiPickersClockNumber: {
      clockNumberSelected: {
        backgroundColor: '#ff3399',
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: '#ff3399',
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#ff3399',
      },
    },
  },
});

const TimePickerField = ({ name, value, ...otherProps }) => {
  const [field, meta] = useField(name);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handleDateChange = date => {
    if (date && date != 'Invalid Date') {
      setFieldValue(name, date);
    }
  };

  const configDateTimePicker = {
    // margin:"normal",
    fullWidth: true,
    autoOk: true,
    id: 'time-picker',
    KeyboardButtonProps: {
      'aria-label': 'change time',
    },
    variant: 'inline',
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          {...configDateTimePicker}
          InputProps={{
            className: classes.dobField,
            disableUnderline: true,
          }}
          value={value}
          onChange={handleDateChange}
          keyboardIcon={
            <img src={clockImg} alt="calendar" width="20px" height="20px" />
          }
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default TimePickerField;
