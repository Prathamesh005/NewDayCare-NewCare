import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';
import NotificationCard from './NotificationCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import { APT_FORM_DATE, YEAR_24HOURS_DATE } from '../../../../../utils/constants'
import { loadNotification, doNotificationRead } from '../../../../../apis/globalApis/globalSlice';
import { actionsConfig } from '../../../../../apis/appApis/appSlice';
import { getFromLocalStorage } from '../../../../../utils/localStorageUtils';
import DockTop from '../../../../../images/assets/dock-top.svg';
import TextBox from '../../../../../images/assets/text-box-plus-outline.svg'
import CalenderIcon from '../../../../../images/assets/calendar-blank.svg'
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  popperDiv: {
    width: 400,
    height: '90vh',
    position: 'fixed',
    top: 56,
    right: 0,
    bottom: 0,
    zIndex: '1',
  },
  headerDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  topTexts: {
    fontWeight: 'bold',
  },
  profileBtn: {
    padding: '0px 15px',
    borderRadius: 17,
    background: '#FF5CAD',
    fontSize: '0.8rem',
    fontWeight: 400,
    color: '#ffffff',
    minHeight: '1.5rem',
    '&:hover': {
      background: '#FF5CAD',
    },
  },
  iconBtn: {
    padding: 12,
    outline: 'none !important',
    backgroundColor: '#FEF0FF',
    color: '#FF3399',
    border: '1px solid #FF5CAD1A',
    '&:hover': {
      background: '#FEF0FF',
    },
  },
  normalBtn: {
    padding: '0px 15px',
    borderRadius: 17,
    background: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 400,
    // color: 'black',
    border: '0.5px solid #707070',
    '&:hover': {
      background: '#ffffff',
    },
  },
  bottomDiv: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '100%',
    padding: '15px',
    textAlign: 'end',
    // border: '2px solid',
    background: '#ffffff',
  },
  seeAllBtn: {
    padding: '0px 12px',
    outline: 'none !important',
    backgroundColor: '#ffffff',
    color: '#FF3399',
    '&:hover': {
      background: '#ffffff',
    },
  },
  middleDiv: {
    // border: '1px solid',
    // paddingBottom: '8rem',
    height: '80%',
    overflowY: 'Scroll',
  },
  linkCss: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
    hidden: {
      display: 'none',
    },
    visible: {
      display: 'block',
    },
  },
}));

function NotificationPopper(props) {
  const classes = useStyles();
  const history = useHistory();
  const { popperOPen, unreadNotification } = props;

  const handleNotificationClose = () => {
    // setOpenNotification(false)
    popperOPen(false)
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleNotificationClose();
          // debugger;
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  const [notificationData, setNotificationData] = useState([])

  //api call when open the notification popup
  const callLoadNotification = async () => {
    const resourceId = getFromLocalStorage('data').userDetails.fhirResourceId;
    const limit = 20
    const url = ''
    const id = 0
    const { payload } = await props.loadNotification({
      url,
      limit,
      id,
      resourceId,
    });

    if (payload && payload.response.data) {
      setNotificationData([...payload.response.data.communications]);
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setNotificationData([]);
    }

  };
  //end api call

  useEffect(() => {
    callLoadNotification()
  }, [])


  //set value for conditional rendring of badge
  const handleUnreadNotification = () => {
    popperOPen(false)
    props.updateGlobelByKeyVal({
      key: 'updateCount',
      data: false,
    })
  }

{console.log(notificationData)}
  return (
    <Fragment>
      <Paper ref={wrapperRef} className={classes.popperDiv}>
        <div className={classes.headerDiv}>
          <Typography
            variant="h3"
            color="textSecondary"
            className={classes.topTexts}
          >
            Notifications
          </Typography>

          <div>
            <Button
              // variant="contained"
              className={classes.profileBtn}
            >
              {`${unreadNotification.length} Unread`}
            </Button>
          </div>
        </div>
        <Divider style={{ height: 4 }} />

        <div className={classes.middleDiv}>

          {notificationData[0]
            ? "" : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress style={{ color: '#FF5CAD' }} />
            </div>}

          {notificationData.filter((eles, index) => { return index <= 4 }).map((ele, index1) => {
            return <NotificationCard key={index1}
              Icon={
                ele.communication.categoryType === 'CriticalEvent' ?
                  TextBox : ele.communication.categoryType === 'Appointment' ?
                    CalenderIcon : DockTop
              }
              title={ele.communication.payLoad[0].contentString}
              time={
                (moment(moment().format(YEAR_24HOURS_DATE)).diff((moment(ele.communication.received).format(YEAR_24HOURS_DATE)), 'minutes')) < 60 ?
                  `${moment(moment().format(YEAR_24HOURS_DATE)).diff((moment(ele.communication.received).format(YEAR_24HOURS_DATE)), 'minutes')}min ago` :
                  (moment(moment().format(APT_FORM_DATE)).diff((moment(ele.communication.received).format(APT_FORM_DATE)), 'days')) < 1 ?
                    `${moment(moment().format(YEAR_24HOURS_DATE)).diff((moment(ele.communication.received).format(YEAR_24HOURS_DATE)), 'hours')}hours ago` :
                    (moment(moment().format(APT_FORM_DATE)).diff((moment(ele.communication.received).format(APT_FORM_DATE)), 'days')) <= 2 ?
                      `${moment(moment().format(APT_FORM_DATE)).diff((moment(ele.communication.received).format(APT_FORM_DATE)), 'days')} Day ago` :
                      `${(moment(ele.communication.received).format('DD/MM/YYYY'))}`
              }
              description={ele.communication.note}
              // name={'Pratik Kuhad ( 56/M)'}
              linksArray={
                ele.communication.categoryType === 'CriticalEvent' ?
                  [
                    { titleName: 'Visit Patient 360' },
                  ]
                  : ele.communication.categoryType === 'Appointment' ?
                    [
                      { titleName: 'Visit Patient 360' },
                      { titleName: 'My Appointment' },
                    ]
                    : []
              }
              status={ele.communication.status}
            />
          })}

        </div>
        <div className={classes.bottomDiv}>
          <Link
            className={classes.linkCss}
            to={{
              pathname: ROUTES_CONSTANTS.NOTIFICATION,
            }}
          // state: { detaildata: detaildata, id: props.id , page:page},

          >
            <Button
              // variant="contained"
              className={classes.seeAllBtn}
              onClick={handleUnreadNotification}
            >
              {'See All'}
            </Button>
          </Link>

        </div>
      </Paper>
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    loadNotification: payload => dispatch(loadNotification(payload)),
    doNotificationRead: payload => dispatch(doNotificationRead(payload)),
    updateGlobelByKeyVal: resolve =>
      dispatch(actionsConfig.updateGlobelByKeyVal(resolve)),
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

)(NotificationPopper);
