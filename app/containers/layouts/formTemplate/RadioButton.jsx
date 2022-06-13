import React from 'react';
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useField } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.button,
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.button,
    },
  },
  formControl: {
    paddingTop: 3,
  },
}));
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      size="small"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}
function RadioButton(props) {
  const { row, name, label, value, options, onChange, ...rest } = props;
  const [field, meta] = useField(name);
  const classes = useStyles();
  // console.log(props)
  return (
    <FormControl
      component="fieldset"
      className={classes.formControl}
      error={Boolean(meta.touched && meta.error)}
    >
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={name}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={option.key}
            value={option.value}
            control={<StyledRadio />}
            label={
              <Typography
                variant="h4"
                style={{ fontSize: '0.9rem', fontWeight: '500' }}
              >
                {option.key}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
      <FormHelperText>{meta.touched ? meta.error : ''}</FormHelperText>
    </FormControl>
  );
}

export default RadioButton;
