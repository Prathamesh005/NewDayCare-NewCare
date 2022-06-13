import { InputAdornment, Typography, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  doAdminBundleSave,
  getLocationDetails,
} from '../../../../../apis/administrationApis/administrationSlice';
import { locationAddEdit } from '../../../../../apis/administrationApis/serviceCalls';
import { valueSetSearch } from '../../../../../apis/globalApis/globalSlice';
import {
  CircularChips,
  MessageComponent,
  OuterBoxPaper,
  PinkText,
  SaveActionButton,
} from '../../../../../components';
import { getOrganizationData } from '../../../../../utils/authHelper';
import { APT_FORM_DATE } from '../../../../../utils/constants';
import { URLS } from '../../../../../utils/urls';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';
import AutoCompleteField from '../../../../layouts/formTemplate/AutoCompleteField';
import TextfieldWrapper from '../../../../layouts/formTemplate/TextField';
import TimePickerField from '../../../../layouts/formTemplate/TimePickerField';
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
}));

const LocationEdit = props => {
  const { locationDetails } = props;
  console.log('locationDetails', locationDetails);
  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [serviceTypeData, setServiceTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedDays, setSelectedDays] = React.useState([]);
  const [saveLoader, setSaveLoader] = React.useState(false);
  const [LocalLoader, setLocalLoader] = React.useState(false);

  const locationId = props.location.state && props.location.state.locationID;
  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const serviceTypeValueSet = await props.valueSetSearch({
      url: URLS.LOCATION_SERVICE_TYPE,
    });
    setServiceTypeData(
      serviceTypeValueSet.payload && serviceTypeValueSet.payload.message
        ? []
        : serviceTypeValueSet.payload,
    );

    const statusValueSet = await props.valueSetSearch({
      url: URLS.LOCATION_STATUS,
    });
    setStatusData(
      statusValueSet.payload && statusValueSet.payload.message
        ? []
        : statusValueSet.payload,
    );
  };
  //-----------------API CALLS END---------------
  React.useEffect(() => {
    callValueSetSearch();
  }, []);

  const getLocationDetailsApi = async resourceId => {
    const { payload } = await props.getLocationDetails({ id: resourceId });
    setLocalLoader(true);
    if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  React.useEffect(() => {
    if (locationId) {
      getLocationDetailsApi(locationId);
    }
  }, [locationId]);

  React.useEffect(() => {
    if (locationDetails && locationDetails) {
      const { hoursOfOperations } = locationDetails;
      setSelectedDays(
        (hoursOfOperations &&
          hoursOfOperations.length > 0 &&
          hoursOfOperations[0] &&
          hoursOfOperations[0].daysOfWeek) ||
          [],
      );
    }
  }, [locationDetails]);

  let hospitalName = '';
  let serviceType = { code: '', display: '' };
  let statusN = { code: '', display: '' };
  let addressN = '';
  let cityN = '';
  let pincodeN = '';
  let emailN = '';
  let phoneN = '';
  let startTimeN = null;
  let endTimeN = null;

  if (locationDetails && locationDetails) {
    const {
      name,
      type,
      status,
      address,
      email,
      phone,
      hoursOfOperations,
    } = locationDetails;

    hospitalName = name;
    statusN = { code: status, display: status };
    addressN = address && address.line;
    cityN = address && address.city;
    pincodeN = address && address.postalCode;
    emailN = email;
    phoneN = phone;

    if (
      hoursOfOperations &&
      hoursOfOperations &&
      hoursOfOperations.length > 0
    ) {
      const { openingTime, closingTime } = hoursOfOperations[0];
      startTimeN = moment().format(APT_FORM_DATE) + 'T' + openingTime;
      endTimeN = moment().format(APT_FORM_DATE) + 'T' + closingTime;
    }
  }

  const INITIAL_FORM_STATE = {
    hospitalName: hospitalName,
    serviceType: serviceType,
    status: statusN,
    address: addressN,
    city: cityN,
    pincode: pincodeN,
    email: emailN,
    phone: phoneN,
    startTime: startTimeN,
    endTime: endTimeN,
  };

  const phoneRegExp = /^[6-9]\d{9}$/;

  const FORM_VALIDATION = Yup.object().shape({
    hospitalName: Yup.string()
      .required('Hospital Name is Required')
      .nullable(),
    address: Yup.string()
      .required('Address is required')
      .nullable(),
    city: Yup.string()
      .required('City is required')
      .nullable(),
    pincode: Yup.string()
      .required('Pincode is required')
      .nullable(),
    phone: Yup.string()
      .matches(phoneRegExp, 'Please Enter valid Phone number')
      .min(10, 'Please Enter valid Phone number')
      .max(12, 'Please Enter valid Phone number')
      .nullable()
      .required('Phone number Required'),

    startTime: Yup.string()
      .nullable()
      .required('Start time is required'),
    endTime: Yup.string()
      .nullable()
      .required('End time is required'),
  });

  const onSave = async (values, { resetForm }) => {
    const field = {
      values: values,
      organization: {
        resourceId: organizationId,
        resourceType: 'Organization',
        resourceReference: `Organization/${organizationId}`,
        display: organizationDisplay,
      },
      selectedDays: selectedDays,
    };

    setSaveLoader(true);
    const { payload } = await props.doAdminBundleSave(locationAddEdit(field));
    setSaveLoader(false);
    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      setTimeout(() => {
        handleOnClose();
      }, [2500]);
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
  const daysData = [
    { value: 'Monday', label: 'M' },
    { value: 'TuesDay', label: 'T' },
    { value: 'Wednesday', label: 'W' },
    { value: 'Thursday', label: 'T' },
    { value: 'Friday', label: 'F' },
    { value: 'Saturday', label: 'S' },
  ];

  const BottomContainer = props => {
    const { values, handleChange } = props;
    return (
      <Grid container>
        <Grid item container xs={12} md={6} style={{ marginBottom: 25 }}>
          <Grid container spacing={3}>
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
                Status
              </Grid>
              <Grid item xs={12} md={9}>
                <AutoCompleteField
                  id="status"
                  size="small"
                  options={statusData ? statusData : []}
                  label="Select Status"
                  name="status"
                  val={
                    statusData &&
                    statusData.find(obj => {
                      return obj.display === values.status;
                    })
                      ? statusData.find(obj => {
                          return obj.display === values.status;
                        })
                      : values.status
                  }
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <PinkText>Address Detail</PinkText>
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
              <PinkText>Communication Details</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3} className={classes.lebels}>
                  Phone Number
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

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Email Address
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper name="email" placeholder="Enter Email" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PinkText>Active Hours</PinkText>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Select Days
              </Grid>
              <Grid item xs={12} md={8}>
                <CircularChips
                  options={daysData}
                  selectedChips={selectedDays}
                  setSelectedChips={setSelectedDays}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Select Time
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <TimePickerField
                  name="startTime"
                  value={values.startTime}
                  placeholder="Start Time"
                  style={{ width: '45%' }}
                />

                <TimePickerField
                  name="endTime"
                  value={values.endTime}
                  placeholder="End Time"
                  style={{ width: '45%' }}
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
      {LocalLoader ? (
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
                  title={'Edit Location'}
                  handleClose={handleOnClose}
                  rightContainer={RightContainer(formProps)}
                  bottomComponent={BottomContainer(formProps)}
                  bottomHeight={'75vh'}
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

const mapStateToProps = state => state.Administration;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    doAdminBundleSave: payload => dispatch(doAdminBundleSave(payload)),
    getLocationDetails: payload => dispatch(getLocationDetails(payload)),

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
)(LocationEdit);
