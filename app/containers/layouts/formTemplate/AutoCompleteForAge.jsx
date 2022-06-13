import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',

      [theme.breakpoints.down('md')]: {
        paddingLeft: '10.5px',
      },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 40,
    },
  },
  normalFontWeight: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 400,
    },
  },
  textField1: {
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,

    [theme.breakpoints.down('md')]: {
      paddingRight: '0px',
    },
  },
}));
const AutoCompleteForAge = ({
  name,
  label,
  options,
  value,
  marginDenseProps,
  fontWeightProps,
  values,
  ...otherProps
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [show, SetShow] = useState(false);
  const configSelect = {
    ...field,
    ...otherProps,
    fullWidth: true,
    disableClearable: true,
    open: show,
    // freeSolo: true,
    // blurOnSelect: true,
    options: options ? options : [],
    getOptionLabel: option => option['display'] || '',
    value: value ? value : ' ',
    onChange: (e, value) => {
      SetShow(false);
      if (value) {
        setFieldValue('dob', {
          code: value['code'],
          display: value['display'],
        });

        let getTodayDate = moment().format('YYYY');
        let resultDate = `${parseInt(getTodayDate) -
          parseInt(value['display'])}-01-01`;

        setFieldValue('dateOfBirth', resultDate);
      } else if (value === null) {
        setFieldValue('dob', { code: '', display: '' });
        setFieldValue('dateOfBirth', '');
      }
    },
    className: marginDenseProps && classes.textField1,
    renderInput: params => (
      <TextField
        {...params}
        placeholder={label}
        margin="dense"
        variant="outlined"
        className={clsx(
          classes.textField,
          fontWeightProps && classes.normalFontWeight,
        )}
        error={Boolean(
          meta && meta.touched && meta.error && meta.error['display'],
        )}
        helperText={meta && meta.touched && meta.error && meta.error['display']}
        onBlur={e => {
          SetShow(false);
          if (e.target.value) {
            if (field.value && field.value.display === e.target.value) {
              setFieldValue('dateOfBirth', values.dateOfBirth);
            } else {
              setFieldValue('dob', {
                code: parseInt(e.target.value),
                display: e.target.value,
              });

              let getTodayDate = moment().format('YYYY');
              let resultDate = `${parseInt(getTodayDate) -
                parseInt(e.target.value)}-01-01`;
              setFieldValue('dateOfBirth', resultDate);
            }
          } else if (e.target.value === '') {
            setFieldValue('dob', {
              code: '',
              display: '',
            });
            setFieldValue('dateOfBirth', '');
          }
        }}
        onKeyDown={e => {
          SetShow(true);
          if (e.key === 'Enter' && e.target.value !== '') {
            SetShow(false);
            if (field.value && field.value.display === e.target.value) {
              setFieldValue('dateOfBirth', values.dateOfBirth);
            } else {
              setFieldValue('dob', {
                code: parseInt(e.target.value),
                display: e.target.value,
              });

              let getTodayDate = moment().format('YYYY');
              let resultDate = `${parseInt(getTodayDate) -
                parseInt(e.target.value)}-01-01`;
              setFieldValue('dateOfBirth', resultDate);
            }
          }
        }}
        InputProps={{
          ...params.InputProps,
          // type: 'search',
          className: classes.input1,
          classes: { notchedOutline: classes.noBorder },
        }}
      />
    ),
  };
  return <Autocomplete {...configSelect} />;
};
export default AutoCompleteForAge;
