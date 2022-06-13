import React from 'react';
import { FormControl,Select, MenuItem,FormHelperText } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { makeStyles} from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles({
  selectField:{
    "& .MuiSelect-select.MuiSelect-select": {
      padding: "8px 3px",
      background: "#F4F4F4",
      // borderRadius: "3px",
      fontSize:"0.9rem",
      fontWeight:"bold"
    },
    // width: '100%'
  },
});

const SelectFieldValue = ({
  name,
  options,
  width,
  ...otherProps
}) => {
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
    onChange: handleChange
  };


  return (
    <FormControl error={Boolean(meta.touched && meta.error)} style={{width:width}} className={classes.selectField}> 
      <Select
        {...configSelect}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        disableUnderline
      >
        {options && options.length >0 && options.map((item, index) => {
          return (
            <MenuItem key={index} value={item['key']}>
              {item['value']}
            </MenuItem>
            )
          })}
      </Select>
      <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
    </FormControl> 
    
  );
};

export default SelectFieldValue;
