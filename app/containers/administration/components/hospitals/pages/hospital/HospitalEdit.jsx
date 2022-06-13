import {
  Divider,
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
import { doPractionerSave } from '../../../../../../apis/administrationApis/administrationSlice';
import { hospitalAdd } from '../../../../../../apis/administrationApis/serviceCalls';
import {
  OuterBoxPaper,
  PinkText,
  UploadImage,
  SaveActionButton,
  MessageComponent,
} from '../../../../../../components';
import profileImageDefault from '../../../../../../images/profile-Image.png';
import { URLS } from '../../../../../../utils/urls';
import AutoCompleteField from '../../../../../layouts/formTemplate/AutoCompleteField';
import SwitchFieldWrapper from '../../../../../layouts/formTemplate/SwitchField';
import TextfieldWrapper from '../../../../../layouts/formTemplate/TextField';

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
}));

const HospitalEdit = props => {
  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [serviceTypeData, setServiceTypeData] = useState([
    { code: 'Hospital', display: 'Hospital' },
    { code: 'Clinic', display: 'Clinic' },
  ]);
  const [profileContentT, setProfileContentT] = React.useState(null);
  const [profileSelectedFile, setProfileSelectedFile] = React.useState(null);

  const [saveLoader, setSaveLoader] = React.useState(false);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const specialitySet = await props.valueSetSearch({
      url: URLS.SPECIALITY,
    });
    setServiceTypeData(
      specialitySet.payload && specialitySet.payload.message
        ? []
        : specialitySet.payload,
    );
  };
  //-----------------API CALLS END---------------
  React.useEffect(() => {
    // callValueSetSearch();
  }, []);

  let hospitalName = '';
  let serviceType = {
    code: '',
    display: '',
  };
  let address = '';
  let city = '';
  let pincode = '';
  let adminName = '';
  let phone = '';
  let pan = '';
  let tan = '';
  let gstn = '';
  let status = false;

  let Data = {
    hospitalName: 'Oncowin Cancer Clinic',
    serviceType: {
      code: '',
      display: '',
    },
    address: 'Siddhakala Nagar',
    city: 'Nashik, Maharashtra',
    pincode: '425409',
    adminName: 'Sidhharth Karmarkar',
    phone: '9632589550',
    pan: 'DTSPM5896D',
    tan: 'GRDDY5896G',
    gstn: '14GTSFT589A1G',
    status: true,
  };

  if (Data) {
    hospitalName = Data['hospitalName'];
    serviceType = Data['serviceType'];
    address = Data['address'];
    city = Data['city'];
    pincode = Data['pincode'];
    adminName = Data['adminName'];
    phone = Data['phone'];
    pan = Data['pan'];
    tan = Data['tan'];
    gstn = Data['gstn'];
    status = Data['status'];
  }

  const INITIAL_FORM_STATE = {
    hospitalName: hospitalName,
    serviceType: serviceType,
    address: address,
    city: city,
    pincode: pincode,
    adminName: adminName,
    phone: phone,
    pan: pan,
    tan: tan,
    gstn: gstn,
    status: status,
  };

  const FORM_VALIDATION = Yup.object().shape({});

  const onSave = async (values, { resetForm }) => {
    console.log(values);
    const field = {
      values: values,
      role: 'Doctor',
      resourceName: 'Practitioner',
      profileContentT: profileContentT,
      profileSelectedFile: profileSelectedFile,
    };

    const Id = '';
    debugger;

    setSaveLoader(true);
    const { payload } = await props.doPractionerSave(hospitalAdd(field));
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
        <Grid item container xs={12} md={6} style={{ marginBottom: 25 }}>
          <Grid container spacing={3}>
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
                  id="hospital-profile"
                  selectedFile={profileSelectedFile}
                  handleCapture={handleCaptureProfile}
                  removeCapture={removeCaptureProfile}
                  addText="Upload Logo"
                  changeText="Change Logo"
                  removeText="Remove Logo"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Hospital/Clinic Name
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TextfieldWrapper
                  name="hospitalName"
                  placeholder="Enter Hospital Name"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Service Type
              </Grid>
              <Grid item xs={12} md={9}>
                <AutoCompleteField
                  id="serviceType"
                  size="small"
                  options={serviceTypeData ? serviceTypeData : []}
                  label="Select Service Type"
                  name="serviceType"
                  val={values.serviceType}
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Address
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="address"
                  placeholder="Plot No. Apartment"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                City, State
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper name="city" placeholder="City, State" />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Pincode
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper name="pincode" placeholder="Pincode" />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <PinkText>Admin Details</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3} className={classes.lebels}>
                  Admin Name
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextfieldWrapper name="adminName" placeholder="Enter Name" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Admin Contact Number
              </Grid>
              <Grid item xs={12} md={9}>
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
          </Grid>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PinkText>Account Detail</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                PAN
              </Grid>
              <Grid item xs={12} md={8}>
                <TextfieldWrapper name="pan" placeholder="Enter Value Here" />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                TAN
              </Grid>
              <Grid item xs={12} md={8}>
                <TextfieldWrapper name="tan" placeholder="Enter Value Here" />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                GSTN
              </Grid>
              <Grid item xs={12} md={8}>
                <TextfieldWrapper name="gstn" placeholder="Enter Value Here" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Status
              </Grid>
              <Grid item xs={12} md={8}>
                <SwitchFieldWrapper
                  name="status"
                  value={values.status}
                  unCheckedText="Inactive"
                  checkedText="Active"
                />
              </Grid>
            </Grid>
          </Grid>{' '}
        </Grid>
      </Grid>
    );
  };

  const handleOnClose = () => {
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
                title={'Edit Hospital/Clinic'}
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
    // valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    doPractionerSave: payload => dispatch(doPractionerSave(payload)),
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
)(HospitalEdit);
