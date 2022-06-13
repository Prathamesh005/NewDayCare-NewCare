import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import { CloseIconButton } from '../../components';
import contantLogo from '../../images/assets/Group 4614.svg';
import nqLogo from '../../images/newNuquareLoginLogo.png';
import { getUserCredentials } from '../../utils/authHelper';
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import ButtonComponent from '../layouts/formTemplate/Button';
import TextArea from '../layouts/formTemplate/TextArea';
import Textfield from '../layouts/formTemplate/TextField';

const useStyles = makeStyles(theme => ({
  loginContainer: {
    padding: '2rem 5rem 0 0',
  },

  lebels: {
    fontWeight: 'bold',
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkCss: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
  },
  leftSideGrid: {
    marginTop: '3rem',
    padding: '2rem 2rem 4rem 0rem',
  },
  rigthSideGrid: {
    marginTop: '3rem',
    padding: '2rem 4rem',
  },
  contentLogo: {
    objectFit: 'contain',
  },
  closeBtn: {
    background: '#ffffff',
    padding: 7,
    boxShadow: '0px 0px 6px #00000029',
    '&:focus': {
      background: '#ffffff',
    },
    '&:hover': {
      background: '#ffffff',
    },
  },
}));

function HelpDesk(props) {
  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
    recaptcha: '',
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email Required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Please Enter valid Phone number')
      .min(10, 'Please Enter valid Phone number')
      .max(12, 'Please Enter valid Phone number')
      .required('Phone number Required'),
    comment: Yup.string().required('Required'),
  });

  const userDetail = getUserCredentials();

  const onSave = (values, { resetForm }) => {
    const field = {
      practitionerId:
        Object.keys(userDetail).length === 0 ? '' : userDetail.fhirResourceId,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      comment: values.comment,
    };
  };

  return (
    <>
      <Grid
        container
        className={
          Object.keys(userDetail).length === 0
            ? classes.loginContainer
            : classes.rootContainer
        }
      >
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={11}>
          <div className={classes.headerDiv}>
            <div>
              <img src={nqLogo} height="50px" width="250px" alt="icon" />
            </div>

            <Link
              className={classes.linkCss}
              to={{
                pathname: ROUTES_CONSTANTS.DASHBOARD,
              }}
            >
              <CloseIconButton
                className={classes.closeBtn}
                onClick={props.handleClose}
              />
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={5} className={classes.leftSideGrid}>
          <div style={{ marginBottom: 20 }}>
            <img
              src={contantLogo}
              height="250px"
              alt="icon"
              className={classes.contentLogo}
            />
          </div>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            style={{ color: '#FF3399' }}
          >
            Contact Us
          </Typography>
          <Typography variant="h4" gutterBottom>
            Drop in a message and we shall get back to you
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          component={Paper}
          elevation={4}
          className={classes.rigthSideGrid}
        >
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            enableReinitialize={true}
            onSubmit={onSave}
          >
            {({
              values,
              touched,
              errors,
              setFieldValue,
              isSubmitting,
              handleChange,
              handleBlur,
              setSubmitting,
            }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h2" className={classes.lebels}>
                      GET IN TOUCH
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Textfield name="firstName" placeholder="First Name" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Textfield name="lastName" placeholder="Last Name" />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Textfield name="email" placeholder="Email" />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Textfield name="phone" placeholder="Mobile Number" />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextArea
                      name="comment"
                      placeholder="Comment"
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <ButtonComponent
                      variant="contained"
                      color="primary"
                      // disabled={isSubmitting}
                    >
                      Submit
                    </ButtonComponent>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12} md={1} />
      </Grid>
    </>
  );
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  // debugger;

  return {
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
)(HelpDesk);
