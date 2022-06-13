import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  copyAddress: {
    marginBottom: 0,

    '& .MuiTypography-body1': {
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#ff3399',
    },
  },
});

const CheckboxWrapper = ({ name, label, legend, checked, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const classes = useStyles();

  // console.log("CheckboxWrapper",checked)

  const handleChange = evt => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };
  // console.log("...otherProps",configCheckbox)

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          className={classes.copyAddress}
          control={<Checkbox {...configCheckbox} />}
          label={label}
          checked={configCheckbox.value}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
