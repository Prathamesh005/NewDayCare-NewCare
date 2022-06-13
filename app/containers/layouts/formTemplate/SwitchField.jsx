import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  withStyles,
} from '@material-ui/core';

import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#FF5CAD',
    '&$checked': {
      color: '#FF5CAD',
    },
    '&$checked + $track': {
      backgroundColor: 'grey',
    },
  },
  checked: {},
  track: {
    backgroundColor: '#c5c5c5',
  },
})(Switch);

const SwitchFieldWrapper = ({
  name,
  checked,
  unCheckedText = 'No',
  checkedText = 'Yes',
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  // const classes = useStyles();

  // console.log("SwitchFieldWrapper",checked)

  const handleChange = evt => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };
  // console.log('...otherProps', configCheckbox);

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>{unCheckedText}</Grid>
          <Grid item>
            <PurpleSwitch
              {...configCheckbox}
              checked={configCheckbox.value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>{checkedText}</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
};

export default SwitchFieldWrapper;
