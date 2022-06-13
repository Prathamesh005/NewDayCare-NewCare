import { CircularProgress, Paper, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import { doPatientSave } from '../../apis/globalApis/globalSlice';
import { savePatient } from '../../apis/globalApis/serviceCalls';
import { PageTitleText, WhiteButton } from '../../components';
import { MessageComponent } from '../../components';
import profileImageDefault from '../../images/patient_profile.jpg';
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import AutoCompleteForAge from '../layouts/formTemplate/AutoCompleteForAge';
import ButtonComponent from '../layouts/formTemplate/Button';
import CheckboxWrapper from '../layouts/formTemplate/CheckBoxField';
import DateTimePickerField from '../layouts/formTemplate/DateTimePickerField';
import RadioButton from '../layouts/formTemplate/RadioButton';
import Textfield from '../layouts/formTemplate/TextField';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  saveButton: {
    paddingLeft: '15px !important',
    paddingRight: '15px !important',
    color: '#ffffff',
    background: theme.palette.button.paginated.color,
    '&:hover': {
      background: theme.palette.button.paginated.color,
      opacity: 0.9,
    },
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  bottomGrid: {
    backgroundColor: '#F2F5FA',
    padding: '1.2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  mendotary: {
    color: '#FF5C5C',
    paddingLeft: 5,
  },
}));

const PatientRegistration = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [contentT, setcontentT] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [circularLoader, setCircularLoader] = useState(false);
  const [patientIDV, setPatientIDV] = useState(props.patientIDValue);
  const [patientSaveError, setPateintSaveError] = useState(
    props.patientSaveError,
  );
  const history = useHistory();
  const [dobData, setdobData] = React.useState([]);

  const choices = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
    { key: 'Other', value: 'Other' },
  ];
  const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    dob: { code: '', display: '' },
    gender: '',
    city: '',
    contactNumber: '',
    sendInvite: true,
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required('Firstname Required'),
    lastName: Yup.string().required('Lastname Required'),
    dateOfBirth: Yup.date().required('Required'),
    dob: Yup.object().shape({
      display: Yup.string().required('Required'),
    }),
    gender: Yup.string().required('Gender Required'),
    city: Yup.string().required('Required'),
    contactNumber: Yup.string()
      .matches(phoneRegExp, 'Please Enter valid Phone number')
      .min(10, 'Please Enter valid Phone number')
      .max(10, 'Please Enter valid Phone number')
      .required('Phone number Required'),
  });
  const handleCapture = ({ target }) => {
    setcontentT(target.files[0].type);

    var file = target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeCapure = () => {
    setcontentT(null);
    setSelectedFile(null);
  };

  const onSave = async values => {
    const field = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      dob: values.dob.code,
      gender: values.gender,
      city: values.city,
      phone: values.contactNumber,
      image: selectedFile === null ? '' : selectedFile.split(',')[1],
      contentType: contentT === null ? '' : contentT,
      sendInvite: values.sendInvite,
    };
    //-------------- using thunk api call start----------------
    setCircularLoader(true);
    const { payload } = await props.doPatientSave(savePatient(field));
    setCircularLoader(false);
    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      setTimeout(() => {
        history.push(ROUTES_CONSTANTS.DASHBOARD);
      }, [2500]);
    } else if (payload && payload.message) {
      //NOTE: backend response is always in => payload.response.data.message
      //      if response is null then show => payload.message
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
    //--------------using thunk api call end with message ----------------
  };

  useEffect(() => {
    function generateValue() {
      var res = [];
      for (var i = 0; i < 151; i += 1) {
        res.push(i);
      }
      return res;
    }

    var result = generateValue();
    let res = [];

    result.forEach(val => {
      res.push({ code: val, display: `${val}` });
    });

    setdobData(res);
  }, []);

  return (
    <Fragment>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <PageTitleText>Register New Patient</PageTitleText>
          </Grid>

          <Grid item container component={Paper} style={{ padding: '2rem' }}>
            <Grid item xs={12} sm={6}>
              <Paper style={{ padding: '1rem' }} elevation={2}>
                <Formik
                  initialValues={{
                    ...INITIAL_FORM_STATE,
                  }}
                  enableReinitialize={true}
                  validationSchema={FORM_VALIDATION}
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
                    setFieldValue,
                  }) => (
                    <Form>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                      >
                        <Grid item xs={12}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item xs={4}>
                              <img
                                src={
                                  selectedFile === null
                                    ? profileImageDefault
                                    : selectedFile
                                }
                                alt="Not Found"
                                height="100px"
                                width="100px"
                                style={{ borderRadius: 5 }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <input
                                accept="image/*"
                                className={classes.input}
                                id="register-new-patient"
                                multiple
                                type="file"
                                onChange={handleCapture}
                              />

                              {selectedFile === null ? (
                                <label htmlFor="register-new-patient">
                                  <WhiteButton
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Add Photo
                                  </WhiteButton>
                                </label>
                              ) : (
                                <WhiteButton
                                  variant="contained"
                                  color="primary"
                                  onClick={() => removeCapure()}
                                >
                                  Remove Photo
                                </WhiteButton>
                              )}
                            </Grid>
                            <Grid item xs={4} />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.lebels}>
                              Patient Name{' '}
                              <span className={classes.mendotary}>{' *'}</span>
                            </Grid>
                            <Grid item xs={4}>
                              <Textfield
                                name="firstName"
                                placeholder="First Name"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Textfield
                                name="lastName"
                                placeholder="Last Name"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.lebels}>
                              Date of Birth
                              <span className={classes.mendotary}>{' *'}</span>
                            </Grid>

                            <Grid item xs={5} md={4}>
                              <DateTimePickerField
                                name="dateOfBirth"
                                type="date"
                                placeholder="Date Of Birth"
                                minDate=""
                                maxDate={new Date()}
                                onChange={e => {
                                  if (e.target.value !== '') {
                                    let totalAge = moment().diff(
                                      e.target.value,
                                      'years',
                                    );

                                    setFieldValue('dob', {
                                      code: totalAge,
                                      display: totalAge.toString(),
                                    });
                                  } else {
                                    setFieldValue('dob', {
                                      code: '',
                                      display: '',
                                    });
                                  }

                                  setFieldValue('dateOfBirth', e.target.value);
                                }}
                                fontWeightBold={true}
                              />
                            </Grid>

                            <Grid
                              item
                              xs={1}
                              className={classes.lebels}
                              style={{ justifyContent: 'center' }}
                            >
                              Or
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              md={3}
                              style={{ alignItems: 'center' }}
                            >
                              <AutoCompleteForAge
                                id="dob"
                                options={
                                  dobData && dobData.length !== 0 ? dobData : []
                                }
                                label="Age"
                                name="dob"
                                value={values.dob} //is required
                                marginDenseProps={true}
                                values={values}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.lebels}>
                              Select Gender
                              <span className={classes.mendotary}>{' *'}</span>
                            </Grid>
                            <Grid item xs={8}>
                              <RadioButton
                                row={true}
                                name="gender"
                                value={values.gender}
                                options={choices}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.lebels}>
                              City/Town/Village
                              <span className={classes.mendotary}>{' *'}</span>
                            </Grid>
                            <Grid item xs={8}>
                              <Textfield name="city" placeholder="City" />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.lebels}>
                              Contact Number
                              <span className={classes.mendotary}>{' *'}</span>
                            </Grid>
                            <Grid item xs={8}>
                              <Textfield
                                name="contactNumber"
                                placeholder="Phone Number"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.lebels}>
                              <CheckboxWrapper
                                name="sendInvite"
                                label="Send Welcome Email / SMS / WhatsApp to the Patient"
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          md={12}
                          className={classes.bottomGrid}
                        >
                          <div className={classes.wrapper}>
                            <ButtonComponent
                              variant="contained"
                              color="primary"
                              className={classes.saveButton}
                              disabled={circularLoader}
                            >
                              Add Patient
                            </ButtonComponent>
                            {circularLoader && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  // debugger;

  return {
    doPatientSave: payload => dispatch(doPatientSave(payload)),

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
  MessageComponent,
)(PatientRegistration);
