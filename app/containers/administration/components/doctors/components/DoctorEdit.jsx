import {
  Box,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  actionsConfig,
  doPractionerEdit,
} from '../../../../../apis/administrationApis/administrationSlice';
import { practionerSave } from '../../../../../apis/administrationApis/serviceCalls';
import {
  getPractitionerDetails,
  valueSetSearch,
} from '../../../../../apis/globalApis/globalSlice';
import {
  BoldText,
  MessageComponent,
  OuterBoxPaper,
  PinkText,
  SaveActionButton,
  UploadImage,
} from '../../../../../components';
import profileImageDefault from '../../../../../images/profile-Image.png';
import { URLS } from '../../../../../utils/urls';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';
import AutoCompleteField from '../../../../layouts/formTemplate/AutoCompleteField';
import AutoCompleteTextSearch from '../../../../layouts/formTemplate/AutoCompleteTextSearch';
import DateTimePickerField from '../../../../layouts/formTemplate/DateTimePickerField';
import MultipleFreeSoloAutoComplete from '../../../../layouts/formTemplate/MultipleFreeSoloAutoComplete';
import MultipleSelectField from '../../../../layouts/formTemplate/MultipleSelectField';
import RadioButton from '../../../../layouts/formTemplate/RadioButton';
import TextArea from '../../../../layouts/formTemplate/TextArea';
import TextfieldWrapper from '../../../../layouts/formTemplate/TextField';
import Patient360 from '../../../../skeleton/Patient360';

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

const DoctorEdit = props => {
  const { practitionerDetails } = props;

  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [roleTypeData, setRoleTypeData] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const [apiLanguageData, setApiLanguageData] = useState([]);
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
  const [localLoader, setLoaderLoader] = React.useState(false);
  const [practionerId, setPractionerId] = React.useState(null);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const specialitySet = await props.valueSetSearch({
      url: URLS.SPECIALITY,
    });
    setSpecialityData(
      specialitySet.payload && specialitySet.payload.message
        ? []
        : specialitySet.payload,
    );

    const languageSet = await props.valueSetSearch({
      url: URLS.LANGUAGE,
    });
    setApiLanguageData(
      languageSet.payload && languageSet.payload.message
        ? []
        : languageSet.payload,
    );

    const qualificationSet = await props.valueSetSearch({
      url: URLS.QUALIFICATION,
    });
    setQualificationData(
      qualificationSet.payload && qualificationSet.payload.message
        ? []
        : qualificationSet.payload,
    );
  };
  //-----------------API CALLS END---------------
  React.useEffect(() => {
    callValueSetSearch();
  }, []);

  React.useEffect(() => {
    function generateValue() {
      var res = [];
      for (var i = 0; i < 40; i += 1) {
        res.push(i);
      }
      return res;
    }

    var result = generateValue();
    let res = [];

    result.forEach(val => {
      res.push({ code: val, display: `${val}` });
    });

    setExperienceYearData(res);
  }, []);

  React.useEffect(() => {
    if (props.location.state && props.location.state.practitionerID) {
      onLoad(props.location.state.practitionerID);
      setPractionerId(props.location.state.practitionerID);
    }
  }, [props.location.state]);

  const onLoad = async practitionerId => {
    const { payload } = await props.getPractitionerDetails({
      id: practitionerId,
    });

    if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }

    setLoaderLoader(true);
  };

  React.useEffect(() => {
    if (practitionerDetails) {
      const {
        image,
        contentType,
        signatureContentType,
        signatureImage,
      } = practitionerDetails;

      setProfileSelectedFile(image);
      setProfileContentT(contentType);

      setcontentSignatureT(signatureContentType);
      setSignatureSelectedFile(signatureImage);
    }
  }, [practitionerDetails]);

  let firstName = '';
  let middleName = '';
  let lastName = '';
  let dateOfBirth = '';
  let genderN = '';
  let aboutN = '';
  let phoneN = '';
  let emailN = '';
  let speciality = { code: '', display: '' };
  let language = [];
  let qualification = [];
  let experienceYear = { code: '', display: '' };
  let registrationDetails = '';
  let channelLink = '';
  let signatureText = '';

  // experience -> experienceYear
  // registrationNo -> registrationDetails

  if (practitionerDetails && practitionerDetails) {
    const {
      first,
      middle,
      last,
      birthDate,
      gender,
      about,
      phone,
      email,
      experience,
      registrationNo,
      practitionerRoleInOrganization,
      languages,
      qualifications,
      channel,
    } = practitionerDetails;

    firstName = first;
    middleName = middle;
    lastName = last;
    dateOfBirth = birthDate;
    genderN = gender;
    aboutN = about;
    phoneN = phone;
    emailN = email;
    registrationDetails = registrationNo;

    experienceYear = experience &&
      experience && { code: experience, display: experience };
    speciality =
      practitionerRoleInOrganization &&
      practitionerRoleInOrganization[0] &&
      practitionerRoleInOrganization[0].speciality &&
      practitionerRoleInOrganization[0].speciality[0];

    language =
      (languages && languages.length > 0 && _.map(languages, 'display')) || [];

    let splitQualification =
      qualifications &&
      qualifications[0] &&
      qualifications[0].qualification &&
      qualifications[0].qualification.split([',']);

    qualification =
      (splitQualification &&
        splitQualification.length > 0 &&
        qualificationData &&
        qualificationData.filter((obj, index) => {
          return splitQualification.includes(obj.display);
        })) ||
      [];

    channelLink = channel || '';
  }

  const INITIAL_FORM_STATE = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    gender: genderN,
    about: aboutN,
    phone: phoneN,
    email: emailN,
    speciality: speciality,
    language: language,
    qualification: qualification,
    experienceYear: experienceYear,
    registrationDetails: registrationDetails,
    channelLink: channelLink,
    signatureText: signatureText,
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
    speciality: Yup.object().shape({
      display: Yup.string().required('Required'),
    }),
  });

  const onSave = async (values, { resetForm }) => {
    const field = {
      values: values,
      role: 'Doctor',
      resourceName: 'Practitioner',
      profileContentT: profileContentT,
      profileSelectedFile: profileSelectedFile,
      signatureContentT: signatureContentT,
      signatureSelectedFile: signatureSelectedFile,
      languageData: apiLanguageData,
      practionerId: practionerId,
    };

    setSaveLoader(true);
    const { payload } = await props.doPractionerEdit(practionerSave(field));
    setSaveLoader(false);
    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      handleOnClose();
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
    { key: 'Other', value: 'Other' },
  ];

  const handleCaptureProfile = ({ target }) => {
    setProfileContentT(target.files[0].type);

    var file = target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      setProfileSelectedFile(reader.result.split(',')[1]);
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
      setSignatureSelectedFile(reader.result.split(',')[1]);
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
                      : 'data:image/*;base64,' + profileSelectedFile
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
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                About
              </Grid>
              <Grid item xs={12} md={9}>
                <TextArea
                  name="about"
                  placeholder="Write about the doctor"
                  multiline
                  rows={8}
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
                Speciality
                <span className={classes.mendotary}>{' *'}</span>
              </Grid>
              <Grid item xs={12} md={8}>
                <AutoCompleteField
                  id="speciality"
                  size="small"
                  options={specialityData ? specialityData : []}
                  label="Enter Specialty"
                  name="speciality"
                  val={values.speciality}
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Select Language
              </Grid>
              <Grid item xs={12} md={8}>
                <MultipleSelectField
                  name="language"
                  options={apiLanguageData}
                  value={values.language}
                  width="100%"
                  labelFormat={obj => obj.code}
                  valueFormat={obj => obj.display}
                  renderValueFormat={selected => {
                    if (selected.length === 0) {
                      return (
                        <Box>
                          <LanguageIcon
                            style={{ opacity: 0.6, fontSize: ' 1.25rem' }}
                          />
                          <Typography
                            variant="h3"
                            component={'span'}
                            style={{ opacity: 0.6 }}
                          >
                            {' '}
                            Select Language
                          </Typography>
                        </Box>
                      );
                    }
                    return (
                      <BoldText
                        variant="h4"
                        component={'span'}
                        style={{ padding: '0px 10px' }}
                      >
                        {selected.join(', ')}
                      </BoldText>
                    );
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Select Qualification
              </Grid>
              <Grid item xs={12} md={8}>
                {/* <AutoCompleteTextSearch
                  id="qualification"
                  options={qualificationData ? qualificationData : []}
                  label="Select Qualification"
                  name="qualification"
                  value={values.qualification}
                  code="code"
                  display="display"
                /> */}

                <MultipleFreeSoloAutoComplete
                  id="qualification"
                  label="Select Qualification"
                  options={qualificationData ? qualificationData : []}
                  name="qualification"
                  value={values.qualification}
                  multiple
                  code="code"
                  display="display"
                />

                {/* {console.log(values.qualification)} */}
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Experience Year
              </Grid>
              <Grid item xs={12} md={8}>
                <AutoCompleteTextSearch
                  id="experienceYear"
                  options={experienceYearData ? experienceYearData : []}
                  label="Select experience year"
                  name="experienceYear"
                  value={values.experienceYear}
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Registration Details
              </Grid>
              <Grid item xs={12} md={8}>
                <TextfieldWrapper
                  name="registrationDetails"
                  placeholder="Enter registration details"
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <PinkText>Uploads</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                My Channel
              </Grid>
              <Grid item xs={12} md={8}>
                <TextfieldWrapper
                  name="channelLink"
                  placeholder="Channel link"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Signature
              </Grid>
              <Grid item xs={12} md={8}>
                <TextArea
                  name="signatureText"
                  placeholder="Signature Name"
                  maxRows={4}
                  multiline
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} />
              <Grid
                item
                xs={12}
                md={8}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  {signatureSelectedFile && (
                    <img
                      src={
                        signatureSelectedFile === null
                          ? profileImageDefault
                          : 'data:image/*;base64,' + signatureSelectedFile
                      }
                      alt="Not Found"
                      height="100px"
                      width="175px"
                      style={{ borderRadius: 5 }}
                    />
                  )}

                  {signatureSelectedFile === null && (
                    <>
                      <UploadImage
                        id="practioner-signature"
                        selectedFile={signatureSelectedFile}
                        handleCapture={handleCaptureSignature}
                        removeCapture={removeCaptureSignature}
                        addText="Add Signature"
                      />

                      <Typography
                        variant="h5"
                        color="textSecondary"
                        style={{ marginTop: 15 }}
                      >
                        *Accepted file format JPG, PNG, JPEG
                      </Typography>
                      <Typography variant="h5" color="textSecondary">
                        Max File Size 200kb
                      </Typography>
                    </>
                  )}
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {signatureSelectedFile && (
                    <UploadImage
                      id="practioner-signature"
                      selectedFile={signatureSelectedFile}
                      handleCapture={handleCaptureSignature}
                      removeCapture={removeCaptureSignature}
                      vertical={true}
                      changeText="Change Signature"
                      removeText="Remove Signature"
                    />
                  )}
                </Box>
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
      data: 2,
    });

    props.history.push(ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL);
  };

  return (
    <Fragment>
      {localLoader ? (
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
                  title={'Edit Profile'}
                  handleClose={handleOnClose}
                  rightContainer={RightContainer(formProps)}
                  bottomComponent={BottomContainer(formProps)}
                  bottomHeight={'76vh'}
                />
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Patient360 />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    doPractionerEdit: payload => dispatch(doPractionerEdit(payload)),
    updateAdministrationByKeyVal: payload =>
      dispatch(actionsConfig.updateAdministrationByKeyVal(payload)),

    getPractitionerDetails: payload =>
      dispatch(getPractitionerDetails(payload)),
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
)(DoctorEdit);
