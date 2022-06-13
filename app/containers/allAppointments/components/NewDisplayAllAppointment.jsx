/*eslint-disable*/
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  getPatientDetails,
  handleApproveAppointment,
  handleMarkAsArrived,
  useAppointmentSlice,
} from '../../../apis/appointmentsApis/appointmentSlice';
import { valueSetSearch } from '../../../apis/globalApis/globalSlice';
import { ViewTable, WhiteAddCircleButton } from '../../../components';
import { DoctorInfoTableHeader } from '../../../components/headers/DoctorInfoTableHeader';
import hospitalHomeIcon from '../../../images/assets/Group 2656.svg';
import hospital from '../../../images/assets/Icon awesome-hospital-symbol.svg';
import videocamIcon from '../../../images/assets/Icon material-videocam.svg';
import { TIMESLOT } from '../../../utils/constants';
import {
  deleteKeyFromLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../utils/localStorageUtils';
import { URLS } from '../../../utils/urls';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '90px',
  },
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    boxShadow: '0px 2px 4px #00000029',
  },
  innerDiv: {
    padding: 20,
    borderRadius: 0,
    background: '#F4F4F4',
    height: 372,
    //height: 400
  },

  appointmentLink: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
  },

  buttonMenu: {
    padding: 0,
    minWidth: 40,
    background: '#F7F6F4',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  menuDisabled: {
    '&.MuiListItem-root.Mui-disabled': {
      opacity: 'unset',
      color: '#a2a2a2',
      background: ' #ECECEC',
    },
  },
}));

function DisplayAllAppointment(props) {
  //-------------- using thunk ----------------
  useAppointmentSlice();
  //-------------- using thunk ----------------
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const backDate = getFromLocalStorage('BDA');
  const getFromDisplayToName = name => {
    return name.split('/')[0];
  };

  let Data = props && props.Data && props.Data.cancerPatientAppointments;
  const search = props.search;
  const selectI = props.selectedIndex;

  if (search.length > 0) {
    if (selectI === 1) {
      Data = Data.filter(eachVal => {
        let opt =
          eachVal.cancerPatient &&
          JSON.stringify(eachVal.cancerPatient)
            .toLowerCase()
            .search(search.toLowerCase()) !== -1;
        return opt;
      });
    }
  }

  const selectedDates = props.selectedDates;
  if (selectedDates != null) {
    Data = Data.filter(eachVal => {
      return props.checkDateFilter(eachVal.startDateTime, selectedDates);
    });
  }

  const actorPractitionerObj =
    props &&
    props.Data &&
    props.Data.display &&
    getFromDisplayToName(props.Data.display);

  // console.log("dataafterfilter", Data);
  const [approveLoader, setApproveLoader] = useState(false);
  const handleApprove = async row => {
    const id = row.resourceId;
    setApproveLoader(true);
    const { payload } = await props.handleApproveAppointment(id);
    setApproveLoader(false);
    if (payload.data) {
      props.handleReload();
    } else {
      console.log('error', payload.message);
    }
  };

  const [arrivedLoader, setArrivedLoader] = useState(false);
  const handleArrived = async row => {
    const id = row.resourceId;
    setArrivedLoader(true);
    const { payload } = await props.handleMarkAsArrived(id);
    setArrivedLoader(false);
    if (payload.data) {
      props.handleReload();
    } else {
      console.log('error', payload.message);
    }
  };

  const handleCancelAppointment = async row => {
    const { payload } = await props.valueSetSearch({
      url: URLS.CANCEL_APPOINTMENT_REASON,
      systemUrl: true,
    });
    if (!payload.message) {
      const id = row.resourceId;
      props.handleOpenCancelDialog(id, true, payload);
    } else {
      console.log('error', payload.message);
    }
  };

  const checkValidity = startDate => {
    const startDateFormat = moment(startDate)
      .utc()
      .format('YYYY-MM-DD');
    const expiryDateFormat = moment()
      .subtract(7, 'd')
      .format('YYYY-MM-DD');
    if (moment(startDateFormat).isBefore(expiryDateFormat)) {
      return false;
    } else {
      return true;
    }
  };
  const checkWithinLast7Days = startDate => {
    const startDateFormat = moment(startDate)
      .utc()
      .format('YYYY-MM-DD');
    const expiryDateFormat = moment()
      .subtract(8, 'd')
      .format('YYYY-MM-DD');
    if (moment(startDateFormat).isBetween(expiryDateFormat, moment())) {
      return true;
    } else {
      return false;
    }
  };
  const checkTodaysDate = startDate => {
    const startDateFormat = moment(startDate)
      .utc()
      .format('YYYY-MM-DD');
    const todayDateFormat = moment().format('YYYY-MM-DD');
    if (moment(startDateFormat).isSame(todayDateFormat)) {
      return true;
    } else {
      return false;
    }
  };
  const checkFromExpiryToFuture = startDate => {
    const startDateFormat = moment(startDate)
      .utc()
      .format('YYYY-MM-DD');
    const expiryDateFormat = moment()
      .subtract(7, 'd')
      .format('YYYY-MM-DD');
    if (moment(startDateFormat).isSameOrAfter(expiryDateFormat)) {
      return true;
    } else return false;
  };
  const checkFromTodayToFuture = startDate => {
    const startDateFormat = moment(startDate)
      .utc()
      .format('YYYY-MM-DD');
    const todayDateFormat = moment().format('YYYY-MM-DD');
    if (moment(startDateFormat).isSameOrAfter(todayDateFormat)) {
      return true;
    } else return false;
  };
  const checkBackDate = startDate => {
    const todayDate = moment().format('DD-MM-YYYY');
    const appointmentDate = moment(startDate).format('DD-MM-YYYY');
    if (moment(appointmentDate).isBefore(todayDate, 'day')) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditAppointment = row => {
    // console.log(row)
    const patientID = row.cancerPatient.resourceId;
    const appointmentResourceId = row.resourceId;
    const appointmentStatus = row.appointmentStatus;
    const obj = {
      patientID: patientID,
      appointmentResourceId: appointmentResourceId,
      appointmentStatus: appointmentStatus,
      serviceType:
        row.serviceType && row.serviceType.length != 0
          ? row.serviceType[0]
          : null,
      detaildata: row,
    };
    props.handleEditAppointment(obj);
  };

  const raiseInvoiceClicked = Id => {
    deleteKeyFromLocalStorage('resourceId');
    setToLocalStorage('resourceId', Id);
    history.push(ROUTES_CONSTANTS.PATIENT_EVERYTHING);
  };

  // route user to video url
  const handleVideoClick = data => {
    //Patient
    const rowPatient = data.patientAppointment.participants.filter(
      ele => ele.role === 'RelatedPerson' || ele.role === 'Patient',
    );
    const selectedPatient =
      rowPatient.find(c => c.role === 'RelatedPerson') ||
      rowPatient.find(c => c.role === 'Patient');

    // Practitioner
    const rowPractitioner = data.patientAppointment.participants.filter(
      ele => ele.role === 'Practitioner',
    );
    const selectedPractitioner = rowPractitioner.find(
      c => c.role === 'Practitioner',
    );

    let patientResourceId = selectedPatient.actor.resourceId;
    let practitionerResourceId = selectedPractitioner.actor.resourceId;

    if (patientResourceId && practitionerResourceId) {
      history.push({
        pathname: ROUTES_CONSTANTS.VIDEO_CONSULTATION,
        search: `?patientId=${patientResourceId}&practitionerId=${practitionerResourceId}`,
      });
    }
  };

  let rows = Data || [];
  const defaultHeadCells = [
    {
      id: 'serviceType',
      label: '',
      render: ({ value }) => {
        return value.map(serviceIcon => {
          return serviceIcon.display === 'Video Consultation' ? (
            <img src={videocamIcon} alt="Not Found!" />
          ) : serviceIcon.display === 'Clinic Appointment' ? (
            <img src={hospital} alt="Not Found!" />
          ) : serviceIcon.display === 'Home Visits' ? (
            <img src={hospitalHomeIcon} alt="Not Found!" />
          ) : (
            ''
          );
        });
      },
    },
    {
      id: 'cancerPatient',
      label: 'Patient Name',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value && value.first}</span>;
      },
    },
    {
      id: 'cancerPatient',
      label: 'Mobile Number',
      render: ({ value }) => {
        return value && value.phone;
      },
    },
    {
      id: 'startDateTime',
      label: 'Time',
      render: ({ value }) => {
        return value.slice('+')[1] === '05:30'
          ? moment
            .utc(value)
            .local()
            .format(TIMESLOT)
          : moment.utc(value).format(TIMESLOT);
      },
    },
    {
      id: 'appointmentStatus',
      label: '',
      render: ({ value }) => {
        return value === 'Pending' ? (
          <DoneIcon style={{ fontSize: '1.5rem' }} />
        ) : value === 'Booked' ? (
          <DoneAllIcon style={{ fontSize: '1.5rem' }} />
        ) : value === 'Arrived' ? (
          <DoneAllIcon style={{ color: '#ff3399', fontSize: '1.5rem' }} />
        ) : (
          <DoneIcon style={{ fontSize: '1.5rem' }} />
        );
      },
    },
    {
      id: '',
      label: '',
      render: ({ value, row }) => {
        return (
          <>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={e => {
                handleClick(e);
                setState(row);
              }}
              className={classes.buttonMenu}
            >
              <MoreHorizIcon />
            </Button>
            {state && state.resourceId === row.resourceId ? (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {checkValidity(row.startDateTime) ? (
                  row.appointmentStatus === 'Pending' ? (
                    <MenuItem
                      onClick={() => handleApprove(state)}
                      disabled={approveLoader}
                      className={classes.menuDisabled}
                    >
                      Approve Appointment{' '}
                      {approveLoader && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </MenuItem>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                {checkWithinLast7Days(row.startDateTime) &&
                  row.appointmentStatus === 'Booked' ? (
                  <MenuItem
                    onClick={() => handleArrived(state)}
                    disabled={arrivedLoader}
                    className={classes.menuDisabled}
                  >
                    Mark As Arrived
                    {arrivedLoader && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </MenuItem>
                ) : (
                  ''
                )}

                {checkFromExpiryToFuture(row.startDateTime) ? (
                  <MenuItem
                    onClick={() =>
                      raiseInvoiceClicked(row.cancerPatient.resourceId)
                    }
                  >
                    Patient Detail
                  </MenuItem>
                ) : row.appointmentStatus === 'Arrived' ||
                  row.appointmentStatus === 'Completed' ? (
                  <MenuItem
                    onClick={() =>
                      raiseInvoiceClicked(row.cancerPatient.resourceId)
                    }
                  >
                    Patient Detail
                  </MenuItem>
                ) : (
                  ''
                )}
                {backDate === 'false' ? (
                  checkWithinLast7Days(row.startDateTime) &&
                    (row.appointmentStatus === 'Arrived' ||
                      row.appointmentStatus === 'Completed') ? (
                    <MenuItem>
                      <Link
                        className={classes.appointmentLink}
                        to={{
                          pathname: ROUTES_CONSTANTS.EPISODE_OF_CARE,
                          state: {
                            detaildata: state,
                            // state.patientAppointment,
                          },
                        }}
                      >
                        Appointment Detail
                      </Link>
                    </MenuItem>
                  ) : (
                    ''
                  )
                ) : row.appointmentStatus === 'Arrived' ||
                  row.appointmentStatus === 'Completed' ? (
                  <MenuItem>
                    <Link
                      className={classes.appointmentLink}
                      to={{
                        pathname: ROUTES_CONSTANTS.EPISODE_OF_CARE,
                        state: {
                          detaildata: state,
                          // state.patientAppointment,
                        },
                      }}
                    >
                      Appointment Detail
                    </Link>
                  </MenuItem>
                ) : (
                  ''
                )}

                {checkFromExpiryToFuture(row.startDateTime) &&
                  (row.appointmentStatus === 'Pending' ||
                    row.appointmentStatus === 'Booked') ? (
                  <MenuItem onClick={() => handleEditAppointment(state)}>
                    Edit Appointment
                  </MenuItem>
                ) : (
                  ''
                )}
                {checkFromExpiryToFuture(row.startDateTime) &&
                  (row.appointmentStatus === 'Pending' ||
                    row.appointmentStatus === 'Booked') ? (
                  <MenuItem onClick={() => handleCancelAppointment(state)}>
                    Cancel Appointment
                  </MenuItem>
                ) : (
                  ''
                )}
              </Menu>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Paper className={classes.paper} elevation={0}>
        <DoctorInfoTableHeader
          name={
            actorPractitionerObj && actorPractitionerObj
              ? actorPractitionerObj
              : ''
          }
          src=""
          RightSideComponent={
            <WhiteAddCircleButton
              title={'Create Appointment'}
              onClick={() => props.handleOpenCreateAppointment()}
              size="small"
              style={{
                width: 177,
                borderRadius: 20,
              }}
            />
          }
        />

        <div className={classes.innerDiv}>
          <ViewTable
            rows={rows}
            headCells={defaultHeadCells}
            pagination={false}
            headBackground={'#F4F4F4'}
          />
        </div>
      </Paper>
    </>
  );
}
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    handleApproveAppointment: payload =>
      dispatch(handleApproveAppointment(payload)),
    handleMarkAsArrived: payload => dispatch(handleMarkAsArrived(payload)),
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
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
)(DisplayAllAppointment);
