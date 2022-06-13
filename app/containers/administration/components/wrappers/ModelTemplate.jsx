import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  // closeButton: {
  //   position: 'absolute',
  //   right: theme.spacing(1),
  //   top: theme.spacing(1),
  //   color: theme.palette.grey[500],
  // },

  closeButton: {
    color: theme.palette.grey[500],
    marginRight: 0,
    // marginTop: 15,
  },
  heading: {
    color: '#727272',
    fontSize: '22px',
    fontWeight: 'bolder',
    marginLeft: 40,
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  cancelContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));
function AppointmentFormModal(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { click, open, page, title, Component, state } = props;
  // debugger;
  const handleClose = () => {
    click(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={'md'}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ padding: '15px' }}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Grid container direction="row">
          <Grid item sm={9} xs={9} md={11} className={classes.cancelContainer}>
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <Grid item sm={3} xs={3} md={1} className={classes.cancelContainer}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent style={{ padding: '20px 25px' }} dividers>
        <Component click={click} page={page} state={state} />
      </DialogContent>
    </Dialog>
  );
}

export default compose(
  withRouter,
  memo,
)(AppointmentFormModal);
