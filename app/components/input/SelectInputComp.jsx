import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  selectField: {
    '& .MuiSelect-select.MuiSelect-select': {
      padding: '8px 3px',
      fontSize: '0.9rem',
      fontWeight: '400',
    },
  },
  select: {
    background: '#F4F4F4',
    '&:focus': {
      background: '#D0D0D0!important',
    },
  },
});

export const SelectInputComp = ({
  name,
  options,
  width,
  value,
  helperText,
  valueFormat,
  labelFormat,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <FormControl style={{ width: width }} className={classes.selectField}>
      <Select
        classes={{
          select: classes.select,
        }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        disableUnderline
        MenuProps={{
          disableScrollLock: true,
        }}
        value={value}
        {...otherProps}
      >
        {options.map((option, index) => {
          return (
            <MenuItem
              key={`${index}`}
              dense
              value={valueFormat ? valueFormat(option) : option}
            >
              {labelFormat ? labelFormat(option) : option}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
