import { CircularProgress, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  cancelReasonSubmit,
  useAppointmentSlice,
} from '../../../../apis/appointmentsApis/appointmentSlice';
import cancelAppointmentImage from '../../../../images/newCancelAppointment.svg';
import ErrorMessageComponent from '../../../layouts/errorMessage/ErrorMessage';
import RadioButton from '../../../layouts/formTemplate/RadioButton';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  optCss: {
    margin: '0rem 5rem',
  },
  title: {
    color: '#ff5cad',
    marginBottom: '0.8rem',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
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
  cancel: {
    color: '#ffffff',
    background: '#FF3399',
    padding: '6px 40px',
    '&:hover': {
      background: '#FF3399',
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
  buttonProgress: {
    color: '#ff3399',
  },
}));
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    // borderBottom: '1px solid #cacaca',
    boxShadow: '0px 2px 10px #00000029',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(4),

    background: '#F4F4F4 0% 0% no-repeat padding-box',
    borderRadius: 5,
    padding: 5,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon style={{ fontSize: 25 }} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
function CancelReasonDialog(props) {
  //-------------- using thunk ----------------
  useAppointmentSlice();
  //-------------- using thunk ----------------
  const classes = useStyles();
  const { onClose, id, open, cancel } = props;
  const [SuccessMessageShow, setSuccessMessageShow] = useState(false);
  const [ErrorMessageShow, setErrorMessageShow] = useState(false);
  const [LocalLoader, setLocalLoader] = useState(false);

  const [reasonValueSet, setReasonValueSet] = useState(props.options.concept);
  const handleClose = () => {
    cancel();
  };
  useEffect(() => {
    setReasonValueSet(props.options.concept);
  }, [props.options]);
  const handleListItemClick = value => {
    onClose(value);
  };
  const choices =
    reasonValueSet &&
    reasonValueSet.map(item => {
      return {
        key: item.display,
        value: item.code,
      };
    });
  const systemURL = props.options.system;
  const onSave = async values => {
    const obj =
      reasonValueSet &&
      reasonValueSet.find(item => item.code === values.reason);
    const fieldValue = {
      url: systemURL,
      code: obj.code,
      display: obj.display,
      id: id,
    };
    setLocalLoader(true);
    const { payload } = await props.cancelReasonSubmit(fieldValue);
    setLocalLoader(false);
    if (payload.data) {
      setSuccessMessageShow(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setErrorMessageShow(true);
    }
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle id="simple-dialog-title" onClose={handleClose}>
          <Grid
            container
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            spacing={4}
          >
            <Grid
              item
              xs={12}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                marginTop: '1rem',
              }}
            >
              <img
                src={cancelAppointmentImage}
                alt="Cancel Appoinment"
                height="40px"
                width="40px"
              />
            </Grid>
            <Grid item xs={12} className={classes.title}>
              Cancel Appointment
            </Grid>
          </Grid>
        </DialogTitle>
        <Formik
          initialValues={{
            reason: { code: '', display: '' },
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            reason: Yup.string()
              .typeError('Please select any one reason')
              .required('Reason Required'),
          })}
          onSubmit={onSave}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleReset,
          }) => (
            <Form>
              <DialogContent dividers style={{ background: '#F0F0F0' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.optCss}>
                    <Typography variant="h3" style={{ fontWeight: '500' }}>
                      Select Reason for Appointment Cancellation
                    </Typography>
                  </Grid>
                  <DialogContentText id="alert-dialog-description">
                    <Grid item xs={12} className={classes.optCss}>
                      <RadioButton
                        row={false}
                        name="reason"
                        value={values.reason}
                        options={(choices && choices) || []}
                        onChange={handleChange}
                      />
                    </Grid>
                  </DialogContentText>
                </Grid>
              </DialogContent>
              <DialogActions
                style={{
                  justifyContent: 'space-evenly',
                  padding: '1.5rem 2rem',
                  background: '#F0F0F0',
                }}
              >
                <Button
                  onClick={handleClose}
                  color="primary"
                  className={classes.keep}
                  style={{ fontSize: '0.8rem' }}
                >
                  Keep Appointment
                </Button>

                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    color="primary"
                    autoFocus
                    className={LocalLoader ? classes.cancel1 : classes.cancel}
                    style={{ fontSize: '0.8rem' }}
                    disabled={LocalLoader}
                  >
                    Cancel Appointment
                    {LocalLoader && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                        style={{
                          position: 'absolute',
                        }}
                      />
                    )}
                  </Button>
                </div>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {SuccessMessageShow && props.CancelReasonSubmit && (
        <ErrorMessageComponent
          SuccessMessageShow={SuccessMessageShow}
          setSuccessMessageShow={setSuccessMessageShow}
          SuccessMessage={props.CancelReasonSubmit}
        />
      )}
      {ErrorMessageShow && props.CancelReasonSubmitError && (
        <ErrorMessageComponent
          ErrorMessageShow={ErrorMessageShow}
          setErrorMessageShow={setErrorMessageShow}
          ErrorMessage={props.CancelReasonSubmitError}
        />
      )}
    </>
  );
}

CancelReasonDialog.propTypes = {
  // onClose: PropTypes.func.isRequired,
  // open: PropTypes.bool.isRequired,
};
const mapStateToProps = state => state;
export function mapDispatchToProps(dispatch) {
  return {
    cancelReasonSubmit: payload => dispatch(cancelReasonSubmit(payload)),
    dispatch,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withRouter,
  memo,
)(CancelReasonDialog);
