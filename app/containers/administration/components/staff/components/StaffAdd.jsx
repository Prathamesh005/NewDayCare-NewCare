import {
  Box,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  actionsConfig,
  doPractionerSave,
} from '../../../../../apis/administrationApis/administrationSlice';
import { practionerSave } from '../../../../../apis/administrationApis/serviceCalls';
import { valueSetSearch } from '../../../../../apis/globalApis/globalSlice';
import {
  OuterBoxPaper,
  PinkText,
  UploadImage,
  SaveActionButton,
  MessageComponent,
} from '../../../../../components';
import profileImageDefault from '../../../../../images/profile-Image.png';
import { URLS } from '../../../../../utils/urls';
import AutoCompleteField from '../../../../layouts/formTemplate/AutoCompleteField';
import AutoCompleteTextSearch from '../../../../layouts/formTemplate/AutoCompleteTextSearch';
import DateTimePickerField from '../../../../layouts/formTemplate/DateTimePickerField';
import RadioButton from '../../../../layouts/formTemplate/RadioButton';
import TextArea from '../../../../layouts/formTemplate/TextArea';
import TextfieldWrapper from '../../../../layouts/formTemplate/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fff',
    //marginTop:20
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  mendotary: {
    color: '#FF5C5C',
    paddingLeft: 5,
  },
}));

const StaffAdd = props => {
  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [roleTypeData, setRoleTypeData] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [experienceYearData, setExperienceYearData] = useState([]);

  const [systemURL, setSystemURL] = useState('');
  const [profileContentT, setProfileContentT] = React.useState(null);
  const [profileSelectedFile, setProfileSelectedFile] = React.useState(null);
  const [signatureContentT, setcontentSignatureT] = React.useState(null);
  const [signatureSelectedFile, setSignatureSelectedFile] = React.useState(
    null,
  );
  const [saveLoader, setSaveLoader] = React.useState(false);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    // const specialitySet = await props.valueSetSearch({
    //   url: URLS.STAFF_ROLE,
    // });
    // setSpecialityData(
    //   specialitySet.payload && specialitySet.payload.message
    //     ? []
    //     : specialitySet.payload,
    // );

    const doctorRoleSet = await props.valueSetSearch({
      url: URLS.STAFF_ROLE,
    });
    setRoleTypeData(
      doctorRoleSet.payload && doctorRoleSet.payload.message
        ? []
        : doctorRoleSet.payload,
    );
  };
  //-----------------API CALLS END---------------
  React.useEffect(() => {
    callValueSetSearch();
  }, []);

  const INITIAL_FORM_STATE = {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    about: '',
    phone: '',
    email: '',
    role: { code: '', display: '' },
    language: { code: '', display: '' },
    qualification: { code: '', display: '' },
    experienceYear: { code: '', display: '' },
    registrationDetails: '',
    channelLink: '',
    signatureText: '',
  };

  const phoneRegExp = /^[6-9]\d{9}$/;
  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
      .required('Firstname Required')
      .nullable(),
    middleName: Yup.string()
      .required('Middlename Required')
      .nullable(),
    lastName: Yup.string().required('Lastname Required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Please Enter valid Phone number')
      .min(10, 'Please Enter valid Phone number')
      .max(12, 'Please Enter valid Phone number')
      .nullable()
      .required('Phone number Required'),
    role: Yup.object().shape({
      display: Yup.string().required('Required'),
    }),
  });

  const onSave = async (values, { resetForm }) => {
    console.log(values);
    const field = {
      values: values,
      role: 'Doctor',
      resourceName: 'Practitioner',
      profileContentT: profileContentT,
      profileSelectedFile: profileSelectedFile,
      signatureContentT: signatureContentT,
      signatureSelectedFile: signatureSelectedFile,
    };

    const Id = '';
    debugger;

    setSaveLoader(true);
    const { payload } = await props.doPractionerSave(practionerSave(field));
    setSaveLoader(false);
    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      // setTimeout(() => {
      //   history.push(ROUTES_CONSTANTS.DASHBOARD);
      // }, [2500]);
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

  const choices = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
    { key: 'Others', value: 'Others' },
  ];

  const handleCaptureProfile = ({ target }) => {
    setProfileContentT(target.files[0].type);

    var file = target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      setProfileSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeCaptureProfile = () => {
    setProfileContentT(null);
    setProfileSelectedFile(null);
  };

  const handleCaptureSignature = ({ target }) => {
    setcontentSignatureT(target.files[0].type);

    var file = target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      setSignatureSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeCaptureSignature = () => {
    setcontentSignatureT(null);
    setSignatureSelectedFile(null);
  };

  const RightContainer = props => {
    return (
      <>
        <SaveActionButton
          isLoading={saveLoader}
          disabled={saveLoader}
          onClick={() => props.handleSubmit()}
          style={{
            padding: 0,
            minWidth: smDown ? 90 : '155px',
            fontSize: '0.9rem',
          }}
        >
          Save
        </SaveActionButton>
      </>
    );
  };

  const BottomContainer = props => {
    const { values, handleChange } = props;
    return (
      <Grid container>
        <Grid item xs={12} style={{ textAlign: 'end' }}>
          <PinkText style={{ fontSize: '0.85rem' }}>
            {' '}
            {'*Indicates a required filed'}
          </PinkText>
        </Grid>
        <Grid item container xs={12} md={6} style={{ marginBottom: 25 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PinkText>Personal Details</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} md={3}>
                <img
                  src={
                    profileSelectedFile === null
                      ? profileImageDefault
                      : profileSelectedFile
                  }
                  alt="Not Found"
                  height="100px"
                  width="100px"
                  style={{ borderRadius: 5 }}
                />
              </Grid>
              <Grid
                item
                xs={7}
                md={9}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <UploadImage
                  id="practioner-profile"
                  selectedFile={profileSelectedFile}
                  handleCapture={handleCaptureProfile}
                  removeCapture={removeCaptureProfile}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Name
                <span className={classes.mendotary}>{' *'}</span>
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
                style={{
                  display: !smDown && 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TextfieldWrapper
                  name="firstName"
                  placeholder="First Name"
                  style={{
                    width: mdDown ? !smDown && 115 : 150,
                    marginBottom: smDown && 15,
                  }}
                />
                <TextfieldWrapper
                  name="middleName"
                  placeholder="Middle Name"
                  style={{
                    width: mdDown ? !smDown && 115 : 150,
                    marginBottom: smDown && 15,
                  }}
                />
                <TextfieldWrapper
                  name="lastName"
                  placeholder="Last Name"
                  style={{
                    width: mdDown ? !smDown && 115 : 150,
                    marginBottom: smDown && 15,
                  }}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Date Of Birth
              </Grid>
              <Grid item xs={12} md={4}>
                <DateTimePickerField
                  name="dateOfBirth"
                  type="date"
                  placeholder="Date Of Birth"
                  minDate=""
                  maxDate={new Date()}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Gender
              </Grid>
              <Grid item xs={12} md={9}>
                <RadioButton
                  row={true}
                  name="gender"
                  value={values.gender}
                  options={choices}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <PinkText>Contact Details</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Contact Number
                <span className={classes.mendotary}>{' *'}</span>
              </Grid>
              <Grid item xs={12} md={5}>
                <TextfieldWrapper
                  name="phone"
                  placeholder="Mobile Number"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ color: '#000000' }}
                    >
                      <Typography variant="h4">+91</Typography>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Email
              </Grid>
              <Grid item xs={12} md={5}>
                <TextfieldWrapper name="email" placeholder="Email" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PinkText>Professional Details</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Role
                <span className={classes.mendotary}>{' *'}</span>
              </Grid>
              <Grid item xs={12} md={8}>
                <AutoCompleteField
                  id="role"
                  size="small"
                  options={roleTypeData ? roleTypeData : []}
                  label="Enter Role"
                  name="role"
                  val={values.role}
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>
          </Grid>{' '}
        </Grid>
      </Grid>
    );
  };

  const handleOnClose = () => {
    props.updateAdministrationByKeyVal({
      key: 'tabIndex',
      data: 3,
    });
    props.history.goBack();
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        enableReinitialize={true}
        validationSchema={FORM_VALIDATION}
        onSubmit={onSave}
      >
        {formProps => {
          // console.log("values", values)
          return (
            <Form>
              <OuterBoxPaper
                title={'Add Staff'}
                handleClose={handleOnClose}
                rightContainer={RightContainer(formProps)}
                bottomComponent={BottomContainer(formProps)}
                bottomHeight={'75vh'}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    doPractionerSave: payload => dispatch(doPractionerSave(payload)),
    updateAdministrationByKeyVal: payload =>
      dispatch(actionsConfig.updateAdministrationByKeyVal(payload)),
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
)(StaffAdd);
