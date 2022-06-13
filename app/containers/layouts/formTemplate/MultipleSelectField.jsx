import {
  Box,
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useField, useFormikContext } from 'formik';
import React from 'react';

const useStyles = makeStyles({
  selectField: {
    '& .MuiSelect-select.MuiSelect-select': {
      padding: '9px 3px',
      background: '#F4F4F4',
      borderRadius: '3px',
      fontSize: 14,
    },
    // width: '100%'
  },
});

const MultipleSelectField = ({
  name,
  options,
  width,
  value,
  valueFormat,
  labelFormat,
  renderValueFormat,
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
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        displayEmpty
        disableUnderline
        renderValue={selected =>
          renderValueFormat && renderValueFormat(selected)
        }
      >
        {options.map((item, index) => {
          return (
            <MenuItem
              key={`${index}`}
              value={valueFormat && valueFormat(item)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: 'white',
              }}
            >
              <Typography variant="h3">
                {labelFormat && labelFormat(item)}
              </Typography>

              {value.indexOf(valueFormat && valueFormat(item)) > -1 && (
                <Checkbox
                  checked={value.indexOf(valueFormat && valueFormat(item)) > -1}
                  checkedIcon={
                    <CheckCircleIcon
                      style={{ color: '#ff3399', fontSize: 20 }}
                    />
                  }
                  style={{ padding: 0 }}
                />
              )}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{meta.touched ? meta.error : ''}</FormHelperText>
    </FormControl>
  );
};

export default MultipleSelectField;
