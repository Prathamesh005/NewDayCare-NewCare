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
  fetchAllAppointments,
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
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import CancelReasonDialog from '../appointments/components/forms/CancelReasonDialog';
import DateWithNextAndPrev from '../layouts/searchWrappers/DateWithNextAndPrev';
import SearchByOuery from '../layouts/searchWrappers/SearchByQuery';
import SearchDropdown from '../layouts/searchWrappers/SearchDropdown';
import NewDisplayAllAppointment from './components/NewDisplayAllAppointment';

const HalfSizeTableSkeletone = React.lazy(() =>
  import('../skeleton/HalfSizeTableSkeletone'),
);
const NoRecord = React.lazy(() =>
  import('../../components/elements/NoRecordPage'),
);

const useStyles = makeStyles(theme => ({
  Button: {
    background: theme.palette.primary.button,
    borderRadius: 0,
    height: 40,
    width: 40,
  },
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

function AllAppointments(props) {
  //-------------- using thunk ----------------
  useAppointmentSlice();
  //-------------- using thunk ----------------
  const theme = useTheme();
  const classes = useStyles();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const [data, setData] = useState({
    query: '',
    date: moment().format(APT_FORM_DATE) + 'T' + '00:00',
    activeFilter: [],
    minLimit: 0,
    maxLimit: 0,
  });
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [cancelAppointmentID, setCancelAppointmentID] = useState('');
  const [cancelReasonValueSet, setCancelReasonValueSet] = useState([]);
  const [isLoad, setisLoad] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [responseData, setResponseData] = useState();
  const handleChange1 = event => {
    setSelectedIndex(Number(event.target.value));
  };
  const options = [
    { option: 'Search By Doctor' },
    { option: 'Search By Patient' },
  ];

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

  const onLoadAllAppointment = async field => {
    setisLoad(true);
    const { payload } = await props.fetchAllAppointments(field);
    setisLoad(false);
    if (payload.data) {
      setResponseData(payload.data.cancerPractitioner);
    } else if (payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  const onLoad = () => {
    let field = {
      fromDate: moment(data.date).format(APT_FORM_DATE) + 'T' + '00:00',
      toDate: moment(data.date).format(APT_FORM_DATE) + 'T' + '23:59',
    };
    setTimeout(() => {
      onLoadAllAppointment(field);
    }, 1000);
  };

  const handleChange = value => {
    setData({ ...data, query: value });
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

  React.useEffect(() => {
    // repetative loading

    let field = {
      fromDate: moment(data.date).format(APT_FORM_DATE) + 'T' + '00:00',
      toDate: moment(data.date).format(APT_FORM_DATE) + 'T' + '23:59',
    };
    onLoadAllAppointment(field);
  }, [data.date]);

  React.useEffect(() => {
    setData({ ...data, minLimit: 0, maxLimit: 4 });
  }, [data.activeFilter]);

  const handleOpenCancelDialog = (id, boolValue, valueSet) => {
    // debugger;
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
        detaildata: details.detaildata,
      };
      history.push({
        pathname: ROUTES_CONSTANTS.CREATE_APPOINTMENTS,
        // search: '?query=abc',
        state: {
          detailsForEditAppointment: { ...obj, patientDetails: true },
        },
      });
    } else {
      props.snackbarShowMessage(payload.message, 'error');
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
      Data1 = Object.values(Data1).filter(eachVal => {
        return (
          eachVal.practitioner.display
            .toLowerCase()
            .search(search.toLowerCase()) !== -1
        );
      });
    } else {
      Data1 = Object.values(Data1).filter(eachVal => {
        let opt = eachVal.practitioner.cancerPatientAppointments.some(
          ({ cancerPatient }) => {
            return (
              cancerPatient &&
              JSON.stringify(cancerPatient)
                .toLowerCase()
                .search(search.toLowerCase()) !== -1
            );
          },
        );
        return opt;
      });
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

  const selectedDates = timeInterval;
  if (selectedDates != null) {
    Data1 = Object.values(Data1).filter(eachVal => {
      let opt = eachVal.practitioner.cancerPatientAppointments.some(
        ({ startDateTime }) => {
          return checkDateFilter(startDateTime, selectedDates);
        },
      );
      return opt;
    });
  }

  const { isLoader } = props;
  return (
    <Fragment>
      <>
        <div className={classes.main}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} style={{ marginTop: 5 }}>
              <PageTitleText>All Appointments</PageTitleText>
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

        <Divider style={{ margin: '1rem 0px' }} />
        <div>
          <Grid container spacing={4} className={classes.jump}>
            {isLoad === false ? (
              Data1 && Data1.length > 0 ? (
                Data1.map(x => {
                  // debugger;
                  return (
                    <Grid item sm={12} md={6}>
                      <NewDisplayAllAppointment
                        Data={x.practitioner}
                        page="AllAppointment"
                        date={data.date}
                        search={data.query}
                        selectedIndex={selectedIndex}
                        selectedDates={timeInterval}
                        handleOpenCancelDialog={handleOpenCancelDialog}
                        handleEditAppointment={handleEditAppointment}
                        handleOpenCreateAppointment={
                          handleAddAppointmentOnClick
                        }
                        handleReload={onLoad}
                        checkDateFilter={checkDateFilter}
                      />
                    </Grid>
                  );
                })
              ) : (
                <div style={{ height: 450, width: '100%' }}>
                  <NoRecord />
                </div>
              )
            ) : (
              <HalfSizeTableSkeletone size={6} />
            )}
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
    fetchAllAppointments: payload => dispatch(fetchAllAppointments(payload)),
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
)(AllAppointments);
