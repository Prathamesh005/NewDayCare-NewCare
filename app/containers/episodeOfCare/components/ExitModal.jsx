import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  keep: {
    color: '#FF3399',
    background: '#ffffff',
    padding: '6px 40px',
    border: '1px solid #FF5CAD',
    '&:hover': {
      background: '#ffffff',
      opacity: 0.9,
    },
  },
  cancel1: {
    color: '#e3e3e3',
    background: '#e3e3e3',
    padding: '6px 40px',
    '&:hover': {
      background: '#e3e3e3',
      opacity: 0.9,
    },
  },
  cancel: {
    color: '#ffffff',
    background: '#FF3399',
    padding: '6px 40px',
    '&:hover': {
      background: '#FF3399',
      opacity: 0.9,
    },
  },
}));
export default function ExistModel(props) {
  const { submitForm } = useFormikContext();

  const handleClose = () => {
    props.click(false);
  };

  const classes = useStyles();
  const [cancellation, setCancellation] = useState('');

  const { Id, appointmentId, details, data } = props;

  const history = useHistory();
  const gotoSummary = () => {
    history.push({
      pathname: `${
        ROUTES_CONSTANTS.APPOINTMENT_SUMMARY
      }/${Id}/${appointmentId}`,
      state: {
        type: 'detailed',
        data: data,
        details: details,
      },
    });
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h2">
            There are unsaved changes. Do you want to save ?
          </Typography>
        </DialogTitle>

        <DialogActions>
          <div className={classes.wrapper}>
            <Button
              onClick={() => submitForm()}
              color="primary"
              className={props.LoadingSave ? classes.cancel1 : classes.cancel}
              disabled={props.LoadingSave}
            >
              Yes
            </Button>
            {props.LoadingSave && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>

          <Button
            onClick={gotoSummary}
            color="primary"
            className={classes.keep}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
