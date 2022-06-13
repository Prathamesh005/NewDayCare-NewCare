import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  selectField: {
    '& .MuiSelect-select.MuiSelect-select': {
      padding: '9px 3px',
      background: '#F4F4F4',
      // borderRadius: "3px",
      fontSize: '0.9rem',
      fontWeight: '400',
    },
    // width: '100%'
  },
});

const SelectField = ({ name, options, width, value, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const classes = useStyles();

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  return (
    <FormControl
      error={Boolean(meta.touched && meta.error)}
      style={{ width: width }}
      className={classes.selectField}
    >
      <Select
        {...configSelect}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        disableUnderline
        MenuProps={{
          disableScrollLock: true,
        }}
        value={value ? value : ' '}
      >
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item['value']}>
              {item['key']}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{meta.touched ? meta.error : ''}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
