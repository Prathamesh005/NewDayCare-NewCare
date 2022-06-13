import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import { range } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import { doPatientSave } from '../../../../apis/globalApis/globalSlice';
import { updatePatient } from '../../../../apis/globalApis/serviceCalls';
//-------------- using thunk ----------------
import { WhiteButton } from '../../../../components/button';
import { MessageComponent } from '../../../../components';
import profileImageDefault from '../../../../images/profile-Image.png';
import AutoCompleteForAge from '../../../layouts/formTemplate/AutoCompleteForAge';
import ButtonComponent from '../../../layouts/formTemplate/Button';
import DateTimePickerField from '../../../layouts/formTemplate/DateTimePickerField';
import RadioButton from '../../../layouts/formTemplate/RadioButton';
import Textfield from '../../../layouts/formTemplate/TextField';

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
function EditPatientForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [contentT, setcontentT] = React.useState(props.patientData.contentType);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [circularLoader, setCircularLoader] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState(
    props.patientData.image,
  );
  const [dobData, setdobData] = React.useState([]);

  const [stateProps, setStateProps] = useState({
    firstName: props.patientData.firstName,
    lastName: props.patientData.lastName,
    age: props.patientData.age,
    dateOfBirth: props.patientData.dateOfBirth,
    gender: props.patientData.gender,
    city: props.patientData.city,
    contactNumber: props.patientData.phone,
    id: props.patientData.id,
  });
  const choices = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
    { key: 'Others', value: 'Others' },
  ];
  const INITIAL_FORM_STATE = {
    firstName: stateProps.firstName,
    lastName: stateProps.lastName,
    dateOfBirth: stateProps.dateOfBirth,
    dob: {
      code: parseInt(stateProps.age),
      display: stateProps.age && stateProps.age.toString(),
    },
    gender: stateProps.gender,
    city: stateProps.city,
    contactNumber: stateProps.contactNumber,
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
      .max(12, 'Please Enter valid Phone number')
      .required('Phone number Required'),
  });
  const handleCapture = ({ target }) => {
    setcontentT(target.files[0].type);

    var file = target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      setSelectedFile(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };
  const removeCapure = () => {
    setcontentT(null);
    setSelectedFile(null);
  };

  const onSave = async (values, { resetForm }) => {
    const field = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      dob: values.dob.code,
      gender: values.gender,
      city: values.city,
      phone: values.contactNumber,
      image: selectedFile,
      contentType: contentT,
      id: stateProps.id,
    };
    //-------------- using thunk api call start----------------
    setCircularLoader(true);
    const { payload } = await props.doPatientSave(updatePatient(field));
    setCircularLoader(false);

    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      props.disableAppointmentForm();
      props.handleOpenExistingPatientForm({
        ...field,
        nQPatientId: props.patientData.nQPatientId,
      });
      props.handleEditPatientDataFromPayload(payload.data.response);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
  };

  useEffect(() => {
    var result = range(0, 151);
    let res = [];

    result.forEach(val => {
      res.push({ code: val, display: `${val}` });
    });

    setdobData(res);
  }, []);

  return (
    <>
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
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <img
                      src={
                        selectedFile === null
                          ? profileImageDefault
                          : 'data:image/*;base64,' + selectedFile
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
                      id="edit-patient-appointment"
                      multiple
                      type="file"
                      onChange={handleCapture}
                    />
                    {selectedFile === null ? (
                      <label htmlFor="edit-patient-appointment">
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
                    <Textfield name="firstName" placeholder="First Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <Textfield name="lastName" placeholder="Last Name" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} className={classes.lebels}>
                    Date of Birth{' '}
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
                          let totalAge = moment().diff(e.target.value, 'years');

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
                  <Grid item xs={2} md={3}>
                    <AutoCompleteForAge
                      id="dob"
                      options={dobData && dobData.length !== 0 ? dobData : []}
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

              <Grid item xs={12} md={12} className={classes.bottomGrid}>
                <div className={classes.wrapper}>
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    disabled={circularLoader}
                  >
                    Save Changes
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
    </>
  );
}
const mapStateToProps = state => state;
export function mapDispatchToProps(dispatch) {
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
  memo,
  MessageComponent,
)(EditPatientForm);
