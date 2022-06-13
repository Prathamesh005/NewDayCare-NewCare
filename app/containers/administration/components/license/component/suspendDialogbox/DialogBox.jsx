import { CircularProgress, Grid, Checkbox } from '@material-ui/core';
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
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import SuspendLicense from '../../../../../../images/SuspendLicense.svg';
import RadioButton from './RadioButton';
import TextfieldWrapper from '../../../../../layouts/formTemplate/TextArea';
import { values } from 'lodash';
import { ROUTES_CONSTANTS } from '../../../../../app/routeConstants';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  optCss: {
    margin: '0rem 5rem',
  },
  title: {
    color: '#FF5CAD',
    marginBottom: '0.8rem',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
  keep: {
    color: '#FF3399',
    background: '#FFFFFF',
    padding: '6px 40px',
    border: '1px solid #FF5CAD',
    '&:hover': {
      background: '#FFFFFF',
      opacity: 0.9,
    },
  },
  cancel: {
    color: '#FFFFFF',
    background: '#FF3399',
    padding: '6px 40px',
    '&:hover': {
      background: '#FF3399',
      opacity: 0.9,
    },
  },
  cancel1: {
    color: '#E3E3E3',
    background: '#E3E3E3',
    padding: '6px 40px',
    '&:hover': {
      background: '#E3E3E3',
      opacity: 0.9,
    },
  },
  buttonProgress: {
    color: '#FF3399',
  },
}));
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    // borderBottom: '1px solid #CACACA',
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
export default function CancelReasonDialog(props) {
  const classes = useStyles();
  const history = useHistory();
  const { onClose, id, open, cancel } = props;
  const [reasonValueSet, setReasonValueSet] = useState(props.options);
  const handleClose = () => {
    cancel();
  };
  useEffect(() => {
    setReasonValueSet(props.options);
  }, [props.options]);
  // const handleListItemClick = value => {
  //   onClose(value);
  // };
  const choices =
    reasonValueSet &&
    reasonValueSet.map(item => {
      return {
        key: item.display,
        value: item.display,
      };
    });
  const handleCheckBox = (e, values, setFieldValue) => {
    const { checked, value } = e.target;
    if (checked) {
      setFieldValue('reason', [...values, { display: value }]);
    } else {
      setFieldValue('reason', values.filter(v => v.display !== value));
    }
  };
  const onSave = values => {
    console.log(values, 'final output');
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL,
      //   search: `?licenseID=${query.licenseID}`,
      // state: { licenseData: data }
    });
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
              xs={10}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                marginTop: '1rem',
              }}
            >
              <img
                src={SuspendLicense}
                alt="Suspend License"
                height="40px"
                width="40px"
              />
            </Grid>
            <Grid item xs={12} className={classes.title}>
              Suspend Current License
            </Grid>
          </Grid>
        </DialogTitle>
        <Formik
          initialValues={{
            reason: [],
            description: '',
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            reason: Yup.array()
              .min(1)
              .required(),
            description: Yup.string().required(),
          })}
          onSubmit={onSave}
        >
          {({
            values,
            setFieldValue,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleReset,
          }) => (
            <Form>
              {console.log(values.reason, 'lop')}
              <DialogContent dividers style={{ background: '#F0F0F0' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.optCss}>
                    <Typography variant="h3" style={{ fontWeight: '500' }}>
                      Select an appropriate reason
                    </Typography>
                  </Grid>
                  <DialogContentText id="alert-dialog-description">
                    <Grid item xs={12} className={classes.optCss}>
                      <RadioButton
                        row={false}
                        name="reason"
                        reasonValue={values.reason}
                        options={(choices && choices) || []}
                        onChange={handleCheckBox}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                  </DialogContentText>
                  <Grid item xs={12} className={classes.optCss}>
                    <TextfieldWrapper
                      name="description"
                      placeholder="Enter Remark Here"
                      multiline
                      rows={3}
                      style={{
                        border: '1px solid #70707033',
                        borderRadius: '5px',
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                style={{
                  justifyContent: 'space-evenly',
                  padding: '1.5rem 2rem',
                  background: '#F0F0F0',
                }}
              >
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    color="primary"
                    autoFocus
                    className={classes.cancel}
                    style={{ fontSize: '0.8rem' }}
                  >
                    Suspend License
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                      style={{
                        position: 'absolute',
                      }}
                    />
                  </Button>
                </div>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
