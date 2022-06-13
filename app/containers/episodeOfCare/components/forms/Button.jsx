import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
const useStyles = makeStyles(theme => ({
  saveButton: {
    padding: '5px 30px',
    color: '#ffffff',
    background: theme.palette.button.paginated.color,
    '&:hover': {
      background: theme.palette.button.paginated.color,
      opacity: 0.9,
    },
  },
}));
const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const classes = useStyles();
  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    onClick: handleSubmit,
  };

  return (
    <Button {...configButton} className={classes.saveButton}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
