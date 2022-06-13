import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormControl, NativeSelect, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  formControl: {
    '& .MuiSelect-selectMenu': {
      background: '#ffffff',
      padding: '13px',
      borderRadius: '5px 0px 0px 5px',
      boxShadow: '-2px 2px 4px #00000029',
      fontSize: '1rem',
      fontWeight: '500',
    },
  },

  selectEmpty: {
    background: '#ffffff',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: 5,
    borderRight: '2px solid #c4c3c1',
    borderBottom: '2px solid #c4c3c1',
    // boxShadow: "0px 0px 3px 0px grey",
    '& .MuiNativeSelect-select': {
      height: '38px !important',
      paddingLeft: 30,
    },
    '& .MuiNativeSelect-icon': {
      top: 'auto',
    },

    [theme.breakpoints.down('md')]: {
      '& .MuiNativeSelect-select': {
        height: '38px !important',
        paddingLeft: '1rem',
      },
    },
  },
}));

export default function SearchDropdown({
  selectedIndex,
  handleChange,
  options,
}) {
  const classes = useStyles();

  return (
    <>
      {/* <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <NativeSelect
          value={selectedIndex}
          onChange={handleChange}
          name="selectedIndex"
          disableUnderline
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'selectedIndex' }}
        >
          {options &&
            options.length > 0 &&
            options.map((val, i) => {
              return (
                <option
                  key={(i + 1).toString()}
                  value={i}
                  style={{ padding: '1rem' }}
                >
                  {val.option}
                </option>
              );
            })}
        </NativeSelect>
      </FormControl> */}

      <FormControl className={classes.formControl} fullWidth>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedIndex}
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
          disableUnderline
          // InputProps={{ disableUnderline: true }}
        >
          {options &&
            options.length > 0 &&
            options.map((val, i) => {
              return (
                <MenuItem
                  value={i}
                  key={(i + 1).toString()}
                  style={{ fontSize: '1rem', fontWeight: 400 }}
                >
                  {val.option}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </>
  );
}
