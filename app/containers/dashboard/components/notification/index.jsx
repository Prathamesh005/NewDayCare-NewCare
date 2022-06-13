import { Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadNotification, doNotificationRead } from '../../../../apis/globalApis/globalSlice';
import { actionsConfig } from "../../../../apis/appApis/appSlice"
import moment from 'moment';
import { APT_FORM_DATE, YEAR_24HOURS_DATE } from '../../../../utils/constants'
import NotificationCard from './components/NotificationCard'
import { NOTIFICATION_LIMIT } from '../../../../utils/constants';
import { getFromLocalStorage } from '../../../../utils/localStorageUtils'
const Skeleton = React.lazy(() => import('../../../skeleton/SearchPatient'));
const NoRecord = React.lazy(() =>
  import('../../../../components/elements/NoRecordPage'),
);
import { CircularProgress } from '@material-ui/core';
import DockTop from '../../../../images/assets/dock-top.svg';
import TextBox from '../../../../images/assets/text-box-plus-outline.svg'
import CalenderIcon from '../../../../images/assets/calendar-blank.svg'

const useStyles = makeStyles(theme => ({
  yog: {
    position: 'fixed',
    top: 55,
    height: 20,
    width: '100%',
    background: '#f7f6f4',
    zIndex: 11,
  },
  popperDiv: {
    width: 600,
    // height: '90vh',      
    background: 'white',

    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0px 3px 40px #00000033',
  },
  headerDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    width: 600,
    background: 'white',
    zIndex: '1',
    position: 'fixed',
    borderBottom: '4px solid #e0e0e0',
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
    // height: '80%',
    // overflowY: 'Scroll', 
    marginTop: 55,
  },
  exitBtn: {
    borderRadius: 5,
    padding: 5,
    // margin: "3px 10px 3px 10px",
    outline: 'none !important',
    color: '#b3b3b3',
    position: 'fixed',
    top: 85,
    right: 20,
  },
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'block',
  },
}));


const key = 'dashboard';
const Notification = props => {
  const { handleError, Id } = props;
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const resourceId = getFromLocalStorage('FHIRRESORCEID')
  const [page, setPage] = useState(1);

  // add loader refrence
  const loaders = useRef(null);


  //-------------------- using thunk get data --------------------
  // searchresulterror
  let Data = props && props.actdata;
  let responseData =
    props && props.searchresultdata;
  let loader = props && props.searchListLoading;
  ////-------------------- using thunk get data --------------------

  //Onscroll load data
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loaders.current) {
      observer.observe(loaders.current);
    }

  }, []);


  useEffect(() => {
    const id = 0;
    const url = ' ';
    const limit = NOTIFICATION_LIMIT;
    onLoad(
      url,
      limit,
      id,
      resourceId,
    );
  }, []);

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  };


  useEffect(() => {
    if (page > 1) {
      fetchMoreData(NOTIFICATION_LIMIT);
    }

  }, [page]);


  //api call
  const onLoad = async (
    url,
    limit,
    id,
    resourceId,
  ) => {
    const { payload } = await props.loadNotification({
      url,
      limit,
      id,
      resourceId,
    });

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }

  };
  //end api call

  const fetchMoreData = limit_get => {
    if (
      responseData &&
      responseData.nextResultUrl !== undefined &&
      responseData.nextResultUrl !== null
    ) {
      const id = 1;
      const url = responseData.nextResultUrl;
      const limit = limit_get;
      onLoad(
        url,
        limit,
        id,
        resourceId,

      );
    }
  };



  //read notification api
  const callReadNotification = async (resourceId) => {
    const { payload } = await props.doNotificationRead({ resourceId: resourceId });
    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
    
    const id = 0;
    const url = '';
    const limit = 20;
    onLoad(
      url,
      limit,
      id,
      resourceId,
    );
    //badge conditional rendering
    props.updateGlobelByKeyVal({
      key: 'updateCount',
      data: true,

    })

  }

  //read notification when unmount the component
  const [state, setState] = useState('')

  useEffect(() => {
    setState('s')

    return () => {
      const resourceId = getFromLocalStorage('data').userDetails.fhirResourceId;
      callReadNotification(resourceId)

    };
  }, [])

  return (
    <Fragment>

      <div className={classes.yog} />

      <IconButton
        className={classes.exitBtn}
        onClick={() => { history.push('dashboard') }}
      >
        <ClearIcon style={{ fontSize: 25, color: '#707070' }} />
      </IconButton>

      <div className={classes.popperDiv}>
        <div className={classes.headerDiv}>
          <Typography
            variant="h3"
            color="textSecondary"
            className={classes.topTexts}
          >
            Notifications
          </Typography>

          {/* <div>
            <Button
              // variant="contained"
              className={classes.profileBtn}
            >
              {`${unreadNotification.length} Unread`}
            </Button>
          </div> */}
        </div>

        <div className={classes.middleDiv}>

          {Data && Data.map((ele, index) => {
            return <NotificationCard key={index}
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
      </div>
      {
        <div
          ref={loaders}
          className={
            responseData &&
              responseData.nextResultUrl !== undefined &&
              responseData.nextResultUrl !== null
              ? classes.visible
              : classes.hidden
          }
        >
          {/* <h2>Load More</h2>*/}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress style={{ color: '#FF5CAD' }} />
          </div>
        </div>
      }
      {loader == true && responseData && responseData.length < 1 ? (
        <Skeleton />
      ) : loader == false && Data.length == 0 ? (
        <NoRecord />
      ) : null}
      {/* </div> */}
    </Fragment>
  );
};
const mapStateToProps = state => state.globalReducerThunk;

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
)(Notification);
