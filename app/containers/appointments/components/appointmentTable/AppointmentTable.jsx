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
import { find } from 'lodash';
import moment from 'moment';
import React, { memo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  handleApproveAppointment,
  handleMarkAsArrived,
  useAppointmentSlice,
} from '../../../../apis/appointmentsApis/appointmentSlice';
import { valueSetSearch } from '../../../../apis/globalApis/globalSlice';
import {
  ViewTable,
  WhiteAddCircleButton,
  MessageComponent,
} from '../../../../components';
import { DoctorInfoTableHeader } from '../../../../components/headers/DoctorInfoTableHeader';
import hospitalHomeIcon from '../../../../images/assets/Group 2656.svg';
import hospital from '../../../../images/assets/Icon awesome-hospital-symbol.svg';
import videocamIcon from '../../../../images/assets/Icon material-videocam.svg';
import { TIMESLOT } from '../../../../utils/constants';
import {
  deleteKeyFromLocalStorage,
  setToLocalStorage,
} from '../../../../utils/localStorageUtils';
import { URLS } from '../../../../utils/urls';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
const useStyles = makeStyles(theme => ({
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

  iconClass: {
    color: '#727272',
    cursor: 'pointer',
  },

  appointmentLink: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
  },
  draftIcon: {
    background: '#FEF0FF',
    color: theme.palette.button.paginated.color,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    boxShadow: 'none',
    padding: '4px',
    '&:focus': {
      background: '#FEF0FF',
    },
    '&:hover': {
      background: '#FEF0FF',
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

function Tabledata(props) {
  //-------------- using thunk ----------------
  useAppointmentSlice();
  //-------------- using thunk ----------------
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loader = useRef(null);
  const separators = ['\\+', '-', '\\(', '\\)', '\\*', '/', ':', '\\?'];

  const [docName, setName] = useState([]);
  const [state, setState] = useState(null);

  let Data = props && props.Data;

  React.useEffect(() => {
    if (props && props.Data != undefined) {
      const a = props.Data[0].patientAppointment.participants.find(function (c) {
        return c.actor.resourceType == 'Practitioner';
      });

      setName(a.actor.display.split('/')[0].split('Dr.'));
    }
  }, [props.Data && props.Page === 'Appointment']);

  const [approveLoader, setApproveLoader] = useState(false);
  const handleApprove = async row => {
    const id = row.patientAppointment.resourceId;
    setApproveLoader(true);
    const { payload } = await props.handleApproveAppointment(id);
    setApproveLoader(false);
    if (payload.data) {
      props.handleReload();
    } else {
      console.log('myAppointments', payload.message);
    }
  };
  const [arrivedLoader, setArrivedLoader] = useState(false);
  const handleArrived = async row => {
    const id = row.patientAppointment.resourceId;
    setArrivedLoader(true);
    const { payload } = await props.handleMarkAsArrived(id);
    setArrivedLoader(false);
    if (payload.data) {
      props.handleReload();
    } else {
      console.log('myAppointments', payload.message);
    }
  };

  const handleCancelAppointment = async row => {
    const { payload } = await props.valueSetSearch({
      url: URLS.CANCEL_APPOINTMENT_REASON,
      systemUrl: true,
    });
    if (!payload.message) {
      const id = row.patientAppointment.resourceId;
      props.handleOpenCancelDialog(id, true, payload);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const handleEditAppointment = row => {
    // console.log(row)
    const selectedPatient = findPatientDetails(
      row.patientAppointment.participants,
    );
    const patientID = selectedPatient.actor.resourceId;
    const appointmentResourceId = row.patientAppointment.resourceId;
    const appointmentStatus = row.patientAppointment.appointmentStatus;
    const obj = {
      patientID: patientID,
      appointmentResourceId: appointmentResourceId,
      appointmentStatus: appointmentStatus,
      serviceType:
        row.patientAppointment.serviceType &&
          row.patientAppointment.serviceType.length != 0
          ? row.patientAppointment.serviceType[0]
          : null,
      detaildata: row.patientAppointment,
    };
    props.handleEditAppointment(obj);
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

  const findPatientDetails = getDetail => {
    let selectedRelatedPerson = find(getDetail, function (ele) {
      if (ele.role === 'RelatedPerson') return { role: 'RelatedPerson' };
    });
    if (selectedRelatedPerson) {
      return selectedRelatedPerson;
    } else {
      let selectedPatient = find(getDetail, function (ele) {
        if (ele.role === 'Patient') return { role: 'Patient' };
      });
      return selectedPatient;
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
  const raiseInvoiceClicked = data => {
    const selectedPatient = findPatientDetails(data.participants);
    let resourceId = selectedPatient.actor.resourceId;
    deleteKeyFromLocalStorage('resourceId');
    setToLocalStorage('resourceId', resourceId);
    history.push(ROUTES_CONSTANTS.PATIENT_EVERYTHING);
  };

  const getActorDetails = (nData, type) => {
    let str = '';
    if (type === 'name') {
      str = nData.actor.display.split(new RegExp(separators.join('|'), 'g'))[0];
    } else if (type === 'phone') {
      str = nData.actor.display.split(new RegExp(separators.join('|'), 'g'))[2];
    }
    return str;
  };

  let rows = Data || [];

  const defaultHeadCells = [
    {
      id: 'patientAppointment',
      label: '',
      render: ({ value }) => {
        return value.serviceType.map(serviceIcon => {
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
      id: 'patientAppointment',
      label: 'Patient Name',
      minWidth: 170,
      render: ({ row }) => {
        let selectedPatient = findPatientDetails(
          row.patientAppointment.participants,
        );

        return selectedPatient && selectedPatient ? (
          <span style={{ fontWeight: 500 }}>
            {' '}
            {getActorDetails(selectedPatient, 'name')}
          </span>
        ) : (
          ''
        );
      },
    },
    {
      id: 'patientAppointment',
      label: 'Mobile Number',
      minWidth: 125,
      render: ({ row }) => {
        let selectedPatient = findPatientDetails(
          row.patientAppointment.participants,
        );

        return selectedPatient && selectedPatient
          ? getActorDetails(selectedPatient, 'phone')
          : '';
      },
    },
    {
      id: 'patientAppointment',
      label: 'Start Time',
      render: ({ row }) => {
        return row.patientAppointment.startDateTime.slice('+')[1] === '05:30'
          ? moment
            .utc(row.patientAppointment.startDateTime)
            .local()
            .format(TIMESLOT)
          : moment.utc(row.patientAppointment.startDateTime).format(TIMESLOT);
      },
    },
    {
      id: 'patientAppointment',
      label: 'End Time',
      render: ({ row }) => {
        return row.patientAppointment.endDateTime.slice('+')[1] === '05:30'
          ? moment
            .utc(row.patientAppointment.endDateTime)
            .local()
            .format(TIMESLOT)
          : moment.utc(row.patientAppointment.endDateTime).format(TIMESLOT);
      },
    },
    {
      id: 'patientAppointment',
      label: '',
      render: ({ row }) => {
        return row.patientAppointment.appointmentStatus === 'Pending' ? (
          <DoneIcon style={{ fontSize: '1.5rem' }} />
        ) : row.patientAppointment.appointmentStatus === 'Booked' ? (
          <DoneAllIcon style={{ fontSize: '1.5rem' }} />
        ) : row.patientAppointment.appointmentStatus === 'Arrived' ? (
          <DoneAllIcon style={{ color: '#ff3399', fontSize: '1.5rem' }} />
        ) : (
          <DoneIcon />
        );
      },
    },
    {
      id: 'patientAppointment',
      label: '',
      render: ({ row }) => {
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
            {state != null &&
              state.patientAppointment.resourceId ===
              row.patientAppointment.resourceId ? (
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
                {checkValidity(row.patientAppointment.startDateTime) ? (
                  row.patientAppointment.appointmentStatus === 'Pending' ? (
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
                {checkWithinLast7Days(row.patientAppointment.startDateTime) &&
                  row.patientAppointment.appointmentStatus === 'Booked' ? (
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

                {checkFromExpiryToFuture(
                  row.patientAppointment.startDateTime,
                ) ? (
                  <MenuItem
                    onClick={() => raiseInvoiceClicked(row.patientAppointment)}
                  >
                    Patient Detail
                  </MenuItem>
                ) : row.patientAppointment.appointmentStatus === 'Arrived' ||
                  row.patientAppointment.appointmentStatus === 'Completed' ? (
                  <MenuItem
                    onClick={() => raiseInvoiceClicked(row.patientAppointment)}
                  >
                    Patient Detail
                  </MenuItem>
                ) : (
                  ''
                )}
                {checkWithinLast7Days(row.patientAppointment.startDateTime) &&
                  (row.patientAppointment.appointmentStatus === 'Arrived' ||
                    row.patientAppointment.appointmentStatus === 'Completed') ? (
                  <MenuItem>
                    <Link
                      className={classes.appointmentLink}
                      to={{
                        pathname: ROUTES_CONSTANTS.EPISODE_OF_CARE,
                        state: {
                          detaildata: state.patientAppointment,
                        },
                      }}
                    >
                      Appointment Detail
                    </Link>
                  </MenuItem>
                ) : (
                  ''
                )}

                {checkFromExpiryToFuture(
                  row.patientAppointment.startDateTime,
                ) &&
                  (row.patientAppointment.appointmentStatus === 'Pending' ||
                    row.patientAppointment.appointmentStatus === 'Booked') ? (
                  <MenuItem onClick={() => handleEditAppointment(state)}>
                    Edit Appointment
                  </MenuItem>
                ) : (
                  ''
                )}
                {checkFromExpiryToFuture(
                  row.patientAppointment.startDateTime,
                ) &&
                  (row.patientAppointment.appointmentStatus === 'Pending' ||
                    row.patientAppointment.appointmentStatus === 'Booked') ? (
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
    <Paper className={classes.paper} elavation={0}>
      <DoctorInfoTableHeader
        name={docName.length !== 0 ? `Dr. ${docName[docName.length - 1]}` : ''}
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
  );
}
// const mapStateToProps = createStructuredSelector({
//   cancelReasonValueSet: makeCancelReasonValueSetSuccess(),
// });
// export function mapDispatchToProps(dispatch) {
//   return {
//     handleApproveAppointment: (id, resolve, reject) =>
//       dispatch(actions.handleApproveAppointment(id, resolve, reject)),
//     handleMarkAsArrived: (id, resolve, reject) =>
//       dispatch(actions.handleMarkAsArrived(id, resolve, reject)),
//     cancelReasonSet: (resolve, reject) =>
//       dispatch(actions.cancelReasonSet(resolve, reject)),
//   };
// }
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    handleApproveAppointment: payload =>
      dispatch(handleApproveAppointment(payload)),
    handleMarkAsArrived: payload => dispatch(handleMarkAsArrived(payload)),
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
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
)(Tabledata);
