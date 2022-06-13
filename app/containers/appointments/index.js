import { useMediaQuery } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchAppointments,
  getPatientDetails,
  useAppointmentSlice,
} from '../../apis/appointmentsApis/appointmentSlice';
import {
  GreyOnHoverWhiteButton,
  PageTitleText,
  PinkAddCircleButton,
  MessageComponent,
} from '../../components';
import SearchByPartsOfDay from '../../components/searchByPartsOfDay/SearchByPartsOfDay';
import {
  APT_FORM_DATE,
  List_DATE_TIME_DISPLAY,
  YEAR_24HOURS_DATE,
} from '../../utils/constants';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import DateWithNextAndPrev from '../layouts/searchWrappers/DateWithNextAndPrev';
import SearchByOuery from '../layouts/searchWrappers/SearchByQuery';
import SearchDropdown from '../layouts/searchWrappers/SearchDropdown';
import Table from './components/appointmentTable/AppointmentTable';
import CancelReasonDialog from './components/forms/CancelReasonDialog';

const Skeleton = React.lazy(() => import('../skeleton/tableSkeletone'));
const NoRecord = React.lazy(() =>
  import('../../components/elements/NoRecordPage'),
);

const useStyles = makeStyles(theme => ({
  jump: {
    //height: '500px'
  },

  textFieldGrid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  dateBtn: {
    border: 'none',
    padding: '0px 40px',
    height: 40,
    marginRight: '3rem',
    border: `1px solid transparent`,
    '&:focus': {
      background: theme.palette.button.primary.color,
      border: `1px solid ${theme.palette.button.common.color}`,
      color: theme.palette.button.common.color,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: '1rem',
    },
  },
}));

function Appointments(props) {
  //-------------- using thunk ----------------
  useAppointmentSlice();
  //-------------- using thunk ----------------
  const theme = useTheme();
  const classes = useStyles();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const [data, setData] = useState({
    query: false,
    date: moment().format(List_DATE_TIME_DISPLAY),
    activeFilter: [],
  });
  const [practitioner, setpractitioner] = useState(
    getFromLocalStorage('FHIRRESORCEID'),
  );
  const [patinetValue, setPatientValue] = React.useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [cancelAppointmentID, setCancelAppointmentID] = useState('');
  const [cancelReasonValueSet, setCancelReasonValueSet] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [LocalLoader, setLocalLoader] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleChange1 = event => {
    setSelectedIndex(Number(event.target.value));
  };
  const options = [{ option: 'Search By Patient' }];

  //-------------search by parts of day --------------
  const [timeInterval, setTimeInterval] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState('');
  const handleTimeInterval = (event, newAlignment) => {
    setTimeInterval(newAlignment);
    setSelectedTime(newAlignment);
  };
  const clearStateTimeInterval = () => {
    setTimeInterval(null);
    setSelectedTime('');
  };
  //------------search by parts of day end-----------------

  const handleChange = value => {
    setData({ ...data, query: value });
  };
  //main function to call
  const loadAppointmentData = async (
    url,
    dates,
    limit,
    id,
    practitioner,
    patinetValue,
  ) => {
    // debugger;
    setLocalLoader(true);
    const { payload } = await props.fetchAppointments({
      url,
      dates,
      limit,
      id,
      practitioner,
      patinetValue,
    });
    setLocalLoader(false);
    // debugger;
    if (payload.data) {
      // debugger
      setResponseData(
        payload.data.cancerPatientAppointments !== null
          ? payload.data.cancerPatientAppointments
          : [],
      );
    } else {
      // debugger
    }
  };

  React.useEffect(() => {
    // setPage(1)
    setData({
      ...data,
      date: moment(data.date).format(List_DATE_TIME_DISPLAY),
      minLimit: 0,
      maxLimit: 0,
    });
  }, [data.date]);

  React.useEffect(() => {
    let dates = [
      `${moment(data.date).format(APT_FORM_DATE) + 'T' + '00:00'} to ${moment(
        data.date,
      ).format(APT_FORM_DATE) +
      'T' +
      '23:59'}`,
    ];

    if (props && props.history.location.state != undefined) {
      setData({
        ...data,
        date: moment(props.history.location.state.date).format(
          List_DATE_TIME_DISPLAY,
        ),
      });
      props.history.replace({
        state: undefined,
      });
      //return;
    }
    const url = '';
    const id = 0;
    const limit = 5;

    loadAppointmentData(url, dates, limit, id, practitioner, patinetValue);
  }, [data.date]);

  const onLoad = () => {
    const url = '';
    const fromdate = moment(data.date).format(APT_FORM_DATE) + 'T' + '00:00';
    const todate = moment(data.date).format(APT_FORM_DATE) + 'T' + '23:59';
    const id = 0;
    const limit = 5;
    const dates = [`${fromdate} to ${todate}`];

    loadAppointmentData(url, dates, limit, id, practitioner, patinetValue);
  };

  const handleLeft = () => {
    const myDate = moment(data.date).subtract(1, 'day');
    setData({ ...data, date: moment(myDate).format(List_DATE_TIME_DISPLAY) });
    clearStateTimeInterval();
  };

  const handleRight = () => {
    const myDate = moment(data.date).add(1, 'day');
    setData({ ...data, date: moment(myDate).format(List_DATE_TIME_DISPLAY) });
    clearStateTimeInterval();
  };

  const setTodaysDate = () => {
    setData({ ...data, date: moment().format(List_DATE_TIME_DISPLAY) });
    clearStateTimeInterval();
  };

  const handleDateChange = event => {
    setData({
      ...data,
      date: moment(event.target.value).format(List_DATE_TIME_DISPLAY),
    });
    clearStateTimeInterval();
  };

  const handleOpenCancelDialog = (id, boolValue, valueSet) => {
    setOpenCancelDialog(boolValue);
    setCancelAppointmentID(id);
    setCancelReasonValueSet(valueSet);
  };
  const handleEditAppointment = async details => {
    const { payload } = await props.getPatientDetails(details.patientID);
    if (payload.data) {
      const obj = {
        appointmentResourceId: details.appointmentResourceId,
        appointmentStatus: details.appointmentStatus,
        serviceType: details.serviceType,
        patientID: details.patientID,
        detaildata: details.detaildata,
      };
      history.push({
        pathname: ROUTES_CONSTANTS.CREATE_APPOINTMENTS,
        state: {
          detailsForEditAppointment: { ...obj, patientDetails: true },
        },
      });
    }
  };
  const handleAddAppointmentOnClick = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.CREATE_APPOINTMENTS,
      state: { detailsForEditAppointment: null },
    });
  };

  const handleSaveClose = () => {
    onLoad();
    setOpenCancelDialog(false);
  };
  let Data1 = (responseData && responseData) || [];

  const search = data.query;
  if (search.length > 0) {
    if (selectedIndex === 0) {
      Data1 = Data1.filter(eachVal => {
        let opt = eachVal.patientAppointment.participants.some(
          ({ actor }) =>
            actor.display &&
            actor.display.toLowerCase().search(search.toLowerCase()) !==
            -1 &&
            actor.resourceType === 'Patient',
        );
        return opt;
      },
      );
    }
  }

  const checkDateFilter = (fromBackend, selectedDates) => {
    let filterDate = moment(fromBackend)
      .utc()
      .format(YEAR_24HOURS_DATE);

    let a = moment(filterDate).isBetween(
      moment(selectedDates.split(' ')[0]),
      moment(selectedDates.split(' ')[2]),
    );
    let b = moment(filterDate).isSame(moment(selectedDates.split(' ')[0]));
    let c = moment(filterDate).isSame(moment(selectedDates.split(' ')[2]));

    return a || b || c;
  };

  // console.log('timeInterval', timeInterval);
  const selectedDates = timeInterval;
  if (selectedDates != null) {
    Data1 = Data1.filter(eachVal => {
      let opt =
        eachVal.patientAppointment.participants.some(
          ({ actor }) => actor.resourceType === 'Patient',
        ) &&
        checkDateFilter(
          eachVal.patientAppointment.startDateTime,
          selectedDates,
        );
      return opt;
    })

  }

  const { isLoader } = props;
  // console.log('cancelReason', cancelReasonValueSet);
  return (
    <Fragment>
      <>
        <div className={classes.main}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} style={{ marginTop: 5 }}>
              <PageTitleText>My Appointments</PageTitleText>
            </Grid>

            <Grid item xs sm={8}>
              <Grid
                container
                justify="center"
                direction="row"
                className={classes.gridContainerFilter}
              >
                <Grid className={classes.textFieldGrid} item sm={2} xs={12} />
                <Grid className={classes.textFieldGrid} item sm={3} xs={12}>
                  <SearchDropdown
                    selectedIndex={selectedIndex}
                    handleChange={handleChange1}
                    options={options}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <SearchByOuery
                    onChange={e => handleChange(e.target.value)}
                    onClick={() => setData({ ...data, query: '' })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container style={{ alignItems: 'center' }}>
                <Grid
                  item
                  container
                  xs={12}
                  md={8}
                  lg={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <SearchByPartsOfDay
                    date={data.date}
                    value={timeInterval}
                    selectedTime={selectedTime}
                    onChange={handleTimeInterval}
                  />

                  <GreyOnHoverWhiteButton
                    variant="outlined"
                    size="large"
                    className={classes.dateBtn}
                    onClick={setTodaysDate}
                  >
                    Today
                  </GreyOnHoverWhiteButton>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                  <DateWithNextAndPrev
                    handleLeft={handleLeft}
                    handleRight={handleRight}
                    value={moment(data.date)
                      .local()
                      .format('YYYY-MM-DD')}
                    handleDateChange={event => handleDateChange(event)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Divider style={{ margin: '1rem 0' }} />
        <div>
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.jump}
          >
            <Grid item sm={12} style={{ width: '100%' }}>
              {LocalLoader === false ? (
                Data1 && Data1.length > 0 ? (
                  <Table
                    Data={Data1}
                    page="Appointment"
                    handleOpenCancelDialog={handleOpenCancelDialog}
                    handleEditAppointment={handleEditAppointment}
                    handleOpenCreateAppointment={handleAddAppointmentOnClick}
                    handleReload={onLoad}
                  />
                ) : (
                  <div style={{ height: 450, width: '100%' }}>
                    <NoRecord />
                  </div>
                )
              ) : (
                <Skeleton />
              )}
            </Grid>
          </Grid>
        </div>

        <PinkAddCircleButton
          title={'Create Appointment'}
          onClick={() => handleAddAppointmentOnClick()}
          style={{
            width: 180,
            borderRadius: 50,
            position: 'fixed',
            bottom: 40,
            right: 40,
          }}
        />
      </>

      {openCancelDialog ? (
        <CancelReasonDialog
          id={cancelAppointmentID}
          options={cancelReasonValueSet}
          open={openCancelDialog}
          cancel={() => setOpenCancelDialog(false)}
          onClose={handleSaveClose}
        />
      ) : (
        ''
      )}
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    fetchAppointments: payload => dispatch(fetchAppointments(payload)),
    getPatientDetails: payload => dispatch(getPatientDetails(payload)),
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
)(Appointments);
