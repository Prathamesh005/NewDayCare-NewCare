/* eslint-disable indent */
import React, { useState, Fragment, useEffect, memo } from 'react';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import {
  Button,
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CustomSVG from '../../../icons/CustomSVG';
import messages from '../../../translations/messages';
import logo from '../../../images/logo.png';
import { deleteKeyFromLocalStorage } from '../../../utils/localStorageUtils';

import { makeSelectIsSidebar, makeSelectUserAccess } from '../../app/selectors';
import { updateGlobelByKeyVal, doLogout } from '../../app/actions';
import { changeLocale } from '../../languageProvider/actions';
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
// import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssessmentIcon from '@material-ui/icons/Assessment';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import MailIcon  from '@material-ui/icons/Mail';
// import SearchIcon from  '@material-ui/icons/Search';

import dashboard from '../../../images/dashboard.svg';
import appointment from '../../../images/appointment.svg';
import diagnosis from '../../../images/diagnosis.svg';
import earlydetection from '../../../images/earlydetection.svg';
import Group115 from '../../../images/Group115.svg';
import Group112 from '../../../images/Group112.svg';
import Group116 from '../../../images/Group116.svg';
import Group117 from '../../../images/Group117.svg';
import active from '../../../images/active.svg';
import Group112Active from '../../../images/Group112Active.svg';
import Group113Active from '../../../images/Group113Active.svg';
import Group114Active from '../../../images/Group114Active.svg';
import Group115Active from '../../../images/Group115Active.svg';
import Group116Active from '../../../images/Group116Active.svg';
import Group117Active from '../../../images/Group117Active.svg';
import dashboardActive from '../../../images/dashboardActive.svg';
import AdminIcon from '../../../images/Adminicon.svg';
import Adminactive from '../../../images/Adminactive.svg';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';

const useStyles = makeStyles(theme => ({
  fixedSideBar: {
    zIndex: 12,
    left: 0,
    top: 0,
    bottom: 0,
    padding: theme.spacing(11, 0),
    position: 'fixed',
    transition: '.3s ease-in-out',
    backgroundColor: theme.palette.primary.light,
  },

  mobileContprt: {
    flexGrow: 1,
    minWidth: 295,
    padding: theme.spacing(0, 0, 0, 0),
  },
  fixSidebarPlaceholder: {
    width: 90,
    float: 'left',
    height: 'calc(100vh - 55px)',
  },

  listHeading: {
    fontSize: '18px',
    pointerEvents: 'none',
    color: '#000000',
    padding: '10px 20px',
  },

  isActiveList: {
    '& > span': {
      fontWeight: theme.typography.fontWeightBold,
      color: '#FF3399',
    },
  },

  isActiveList1: {
    width: '200px',
    '& > span': {
      fontWeight: theme.typography.fontWeightBold,
      color: '#FF3399',
    },
  },
  list1: {
    //display:'none'
  },

  listItem: {
    margin: theme.spacing(3, 0, 5),
    display: 'flex',
    color: theme.palette.text.light,
    '&>$isActive': {
      transition: '290ms min-width ease-in-out',
    },
    width: '100%',
  },
  listIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  isActive: {
    display: 'block',
    minHeight: 50,
    width: 58,
    position: 'absolute',
    borderRadius: theme.spacing(0),
    zIndex: -1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 3),
    minHeight: 65,
  },
  languageIcon: {
    margin: theme.spacing(0),
  },
  langTxt: {
    color: theme.palette.text.main,
    margin: theme.spacing(0),
  },

  subMenuItem: {
    padding: theme.spacing(2, 2, 0, 2),
    minHeight: 90,
  },
  logout: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 66,
    paddingLeft: 16,
    color: theme.palette.text.light,
  },

  mobileContainer: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  lit: {
    position: 'relative',
    maxWidth: 90,
    '&:hover': {
      maxWidth: 'unset',
      minWidth: 270,

      '& $isActive': {
        backgroundColor: '#f7f6f4 !important',
        maxWidth: 'unset',
        '& *': {
          display: 'block',
        },
      },
      '& $subMenu': {
        display: 'flex',
      },
    },
  },
  subMenu: {
    top: '0px',
    left: '91px',
    display: 'none',
    position: 'absolute',
    minWidth: '180px',
    background: theme.palette.backgroundColor.main,
    borderRadius: '0',
    flexDirection: 'column',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    border: `1px solid ${theme.palette.lineBorderColor.main} `,
    '& li': {
      padding: '10px 20px',
      fontSize: '16px',
      transition: '.3s all ease-in-out',
      fontWeight: '400',
      whiteSpace: 'noWrap',
      cursor: 'pointer',
      '& span': {
        transition: '.3s all ease-in-out',
      },
      '&:hover > span': {
        color: '#FF3399',
      },
      '&:active > span': {
        color: '#FF3399',
      },
      '&:first-child': {
        padding: '12px 20px',
      },
    },
  },

  menuAfterSideBarOpen: {
    top: '0px',
    color: '#000000',
    left: '80px',
    display: 'block',
    position: 'absolute',
    minWidth: '180px',
    background: 'none',
    borderRadius: '0',
    flexDirection: 'column',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    border: `1px solid transparent `,
    outline: 'none',
    '& li': {
      padding: '10px 20px',
      fontSize: '18px',
      //transition: '.3s all ease-in-out',
      fontWeight: 'bold',
      whiteSpace: 'noWrap',
      cursor: 'pointer',
      '& span': {
        //transition: '.3s all ease-in-out',
      },
      '&:hover > span': {
        color: '#FF3399',
        border: 'none !important',
        outline: 'none !important',
      },
      '&:first-child': {
        padding: '12px 20px',
      },
    },
    fontSize: '18px',
  },

  li: {
    padding: 0,
    borderBottom: `1px solid ${theme.palette.lineBorderColor.main}`,
  },
  sidebarListItem: {
    boxShadow: 'none',
    background: 'none',
    width: '100%',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  panelSummary: {
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 5, 0, 3),
  },
  panelSummaryContainer: {
    minHeight: 45,
  },
  panelSummaryContainerExpanded: {
    margin: '5px -5px 5px 0px !important',
    minHeight: '35px !important',
  },
  subMenuUl: {
    width: '100%',
  },
  subMenuItems: {
    color: theme.palette.text.main,
    transition: '.3s all ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingLeft: theme.spacing(12),
    },
  },
  selectedList: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    [theme.breakpoints.down('sm')]: {
      '& > p': {
        opacity: '1 !important',
      },
    },
    '& span': {
      opacity: '1 !important',
    },
  },
  subMenuText: {
    color: theme.palette.text.main,
    '& > span': {
      fontSize: `${theme.typography.fontSize}px !important`,
    },
    '&:hover': {
      color: theme.palette.text.other,
    },
  },
  ListItemClass: {
    fontWeight: 'bold',
    marginLeft: 55,
    fontSize: 18,
    background: '#FEF0FF',
    color: '#FF3399',
  },
  hiddenList: {
    display: 'none',
  },
  InnersubMenu: {
    top: '0px',
    left: '0px',
    //float:'right',
    position: 'absolute',
    minWidth: '180px',
    //display: 'flex',
    background: theme.palette.backgroundColor.main,
    borderRadius: '0',
    flexDirection: 'column',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    border: `1px solid ${theme.palette.lineBorderColor.main} `,
    '& li': {
      padding: '10px 20px',
      fontSize: '16px',
      transition: '.3s all ease-in-out',
      fontWeight: '400',
      whiteSpace: 'noWrap',
      cursor: 'pointer',
      '& span': {
        transition: '.3s all ease-in-out',
      },
      '&:hover > span': {
        color: '#FF3399 !important',
      },
      '&:active > span': {
        color: '#FF3399 !important',
      },
      '&:first-child': {
        padding: '12px 20px',
      },
    },
    //color:'red'
  },
}));

export function SideBar(props) {
  const {
    setTitle,
    history,
    isSidebarOpen,
    updateGlobelByKeyVal,
    doLogout,
    onLocaleToggle,
    locale,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [selectedList, setSelectedList] = useState();
  const [selectedListItem, setSelectedListItem] = useState();
  const [expanded, setExpanded] = useState(null);
  const [isActive, setActive] = useState(false);
  const [hoverId, setHovered] = useState(false);

  const setHoveredData = Id => {
    setHovered(Id);
  };
  const sidebarData = [
    {
      id: 'dashboard',
      resourceId: 'Dashboard',
      icon: dashboardActive,
      link: '/dashboard',
      options: [
        {
          id: 'dashboard',
          link: '/dashboard',
        },
      ],
    },
    {
      id: 'administration',
      resourceId: 'Administration',
      icon: AdminIcon,
      options: [
        {
          id: 'doctor',
          resourceId: 'doctor',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'adddoctor',
              link: 'add_doctor',
            },
            {
              id: 'updatedoctor',
              link: 'update_doctor',
            },
          ],
        },
        {
          id: 'PractitionerRole',
          resourceId: 'PractitionerRole',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addPracRole',
              link: 'add_pracrole',
            },
            {
              id: 'updatepracRole',
              link: 'update_pracrole',
            },
          ],
        },
        {
          id: 'ValueSet',
          resourceId: 'ValueSet',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addvalueset',
              link: 'add_valueset',
            },
            {
              id: 'updatevalueset',
              link: 'update_valueset',
            },
          ],
        },
        {
          id: 'Questionnaire',
          resourceId: 'Questionnaire',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addquestioner',
              link: 'add_questioner',
            },
            {
              id: 'updatequestioner',
              link: 'update_questioner',
            },
          ],
        },
        {
          id: 'Patient',
          resourceId: 'Patient',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addpatient',
              link: 'add_patient',
            },
            {
              id: 'updatepatient',
              link: 'update_patient',
            },
          ],
        },
        {
          id: 'Schedule',
          resourceId: 'Schedule',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addscheduleslot',
              link: 'add_schedule',
            },
            {
              id: 'updatescheduleslot',
              link: 'update_schedule',
            },
          ],
        },
        {
          id: 'Health',
          resourceId: 'Health',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addhealth',
              link: 'add_health',
            },
            {
              id: 'updatehealth',
              link: 'update_health',
            },
          ],
        },
        {
          id: 'Slot',
          resourceId: 'Slot',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addslot',
              link: 'add_slot',
            },
            {
              id: 'updateslot',
              link: 'update_slot',
            },
          ],
        },
        {
          id: 'Location',
          resourceId: 'Location',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addlocation',
              link: 'add_location',
            },
            {
              id: 'updatelocation',
              link: 'update_location',
            },
          ],
        },
        {
          id: 'Organization',
          resourceId: 'Organization',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addorg',
              link: 'add_org',
            },
            {
              id: 'updateorg',
              link: 'update_org',
            },
          ],
        },
        {
          id: 'Home',
          resourceId: 'Home',
          icon: AdminIcon,
          link: '#',
          options: [
            {
              id: 'addhome',
              link: 'add_home',
            },
            {
              id: 'updatehome',
              link: 'update_home',
            },
          ],
        },
      ],
    },
    {
      id: 'searchPatient',
      resourceId: 'Search Patient',
      icon: active,
      link: ROUTES_CONSTANTS.SEARCH_PATIENTS,
      options: [
        {
          id: 'searchPatient',
          link: ROUTES_CONSTANTS.SEARCH_PATIENTS,
        },
        {
          id: 'patientRegistration',
          link: ROUTES_CONSTANTS.CREATE_PATIENTS,
        },
      ],
    },
    {
      id: 'earlyDetection',
      resourceId: 'Early Detection',
      icon: Group112,
      link: '/early-detection',
      options: [
        {
          id: 'earlyDetection',
          link: '/early-detection',
        },
      ],
    },
    {
      id: 'diagnosis',
      resourceId: 'Diagnosis',
      icon: diagnosis,
      options: [
        {
          id: 'diagnosis',
          link: '/diagnosis',
        },
      ],
    },
    {
      id: 'onlyappointments',
      resourceId: 'onlyappointments',
      icon: earlydetection,
      options: [
        // {
        //   id: 'onlyappointments',
        //   link: '#',
        // },
        {
          id: 'appointments',
          link: ROUTES_CONSTANTS.MY_APPOINTMENTS,
        },
        {
          id: 'allappointments',
          link: ROUTES_CONSTANTS.ALL_APPOINTMENTS,
        },
      ],
    },
    {
      id: 'onlysurgeries',
      resourceId: 'onlysurgeries',
      icon: Group115,
      options: [
        {
          id: 'surgeries',
          link: '/surgeries',
        },
        {
          id: 'allsurgeries',
          link: '/all_surgeries',
        },
      ],
    },
    {
      id: 'crossReferal',
      resourceId: 'Cross Referal',
      icon: Group116,
      options: [
        {
          id: 'crossReferal',
          link: '/cross-referal',
        },
      ],
    },
    {
      id: 'survivorshipCare',
      resourceId: 'Survivorship Care',
      icon: Group117,
      options: [
        {
          id: 'survivorshipCare',
          link: '/survivorship-care',
        },
      ],
    },
  ];

  const handleExpansionList = id => () => {
    setActive(true);
    if (expanded && expanded.includes(id)) {
      setExpanded(expanded.filter(a => a !== id));
    } else {
      setExpanded(expanded ? expanded.concat(id) : [id]);
    }
  };

  useEffect(() => {
    if (isActive && expanded === null) {
      setExpanded(sidebarData.map(l => l.id));
    } else if (!isActive) {
      setExpanded(null);
    }
  }, [sidebarData, expanded, isActive, setExpanded]);

  const logout = () => {
    new Promise(resolve => {
      doLogout(resolve);
      deleteKeyFromLocalStorage('HKTWQ');
      deleteKeyFromLocalStorage('TOKEN');
      deleteKeyFromLocalStorage('FHIRRESORCEID');
      deleteKeyFromLocalStorage('USERNAME');
      deleteKeyFromLocalStorage('FNAME');
      deleteKeyFromLocalStorage('LNAME');
      deleteKeyFromLocalStorage('data');
    }).then(() => {
      history.push(ROUTES_CONSTANTS.LOGOUT);
    });
  };

  useEffect(() => {
    sidebarData.forEach((l, i) => {
      // eslint-disable-next-line array-callback-return
      l.options.map(option => {
        if (window.location.pathname.includes(option.link)) {
          setSelectedList(i);
          setTitle(option.id);
          setSelectedListItem(option.id);
        }
      });
    });
  }, [window.location.pathname]);

  const languageList = [
    { id: 'en', text: 'EN', icon: 'en' },
    { id: 'de', text: 'DE', icon: 'de' },
  ];

  const menuClickHandler = (link, i, Id, isMobile) => {
    setSelectedListItem(i);
    setSelectedList(Id);
    if (i !== selectedList) {
      // eslint-disable-next-line react/prop-types
      props.history.push(link + props.location.search);
      if (isMobile) {
        updateGlobelByKeyVal({
          key: 'isSidebarOpen',
          data: !isSidebarOpen,
        });
      }
    }
    if (link === '/session-overview') {
      updateGlobelByKeyVal({
        key: 'isSessionDetails',
        data: false,
      });
    }
  };

  console.log('selectedList', selectedList);
  console.log('setSelectedListItem', selectedListItem);
  return (
    <Fragment>
      {!props.userAccess && (
        <Fragment>
          <Hidden smDown>
            <div
              className={classes.fixedSideBar}
              style={{
                width: !isSidebarOpen ? '90px' : '280px',
                boxShadow: '2px 0px 6px rgba(85, 85, 85, 0.08)',
              }}
            >
              <div className={classes.container}>
                {sidebarData.map((l, i) => (
                  <div key={`list-${l.id}`} className={classes.lit}>
                    <ListItem classes={{ root: classes.listItem }}>
                      <ListItemIcon
                        classes={{ root: classes.listIcon }}
                        onMouseOver={() => setHoveredData(false)}
                      >
                        {/* <CustomSVG
                          width="30"
                          height="30"
                          name={l.icon}
                          fill={
                            i === selectedList
                              ? theme.palette.text.other
                              : theme.palette.text.light
                          }
                        /> */}
                        {l.id == 'dashboard' && i === selectedList ? (
                          <>
                            <img src={dashboard} alt="Needelp" />{' '}
                          </>
                        ) : l.id == 'administration' && i === selectedList ? (
                          <>
                            <img src={Adminactive} alt="Needelp" />{' '}
                          </>
                        ) : l.id == 'searchPatient' && i === selectedList ? (
                          <img src={appointment} alt="Needelp" />
                        ) : l.id == 'earlyDetection' && i === selectedList ? (
                          <img src={Group112Active} alt="Needelp" />
                        ) : l.id == 'diagnosis' && i === selectedList ? (
                          <img src={Group113Active} alt="Needelp" />
                        ) : l.id == 'onlyappointments' && i === selectedList ? (
                          <img src={Group114Active} alt="Needelp" />
                        ) : l.id == 'onlysurgeries' && i === selectedList ? (
                          <img src={Group115Active} alt="Needelp" />
                        ) : l.id == 'crossReferal' && i === selectedList ? (
                          <img src={Group117Active} alt="Needelp" />
                        ) : l.id == 'survivorshipCare' && i === selectedList ? (
                          <img src={Group116Active} alt="Needelp" />
                        ) : (
                          <img src={l.icon} alt="Needelp" />
                        )}
                        {/* {l.icon} */}
                      </ListItemIcon>

                      <div
                        className={classes.isActive}
                        style={{
                          background: i === selectedList ? '#FEF0FF' : 'none',
                          width:
                            i === selectedList && isSidebarOpen
                              ? '250px'
                              : '100%',
                          marginLeft:
                            i === selectedList && isSidebarOpen
                              ? '0px'
                              : '-15px',
                          padding:
                            i === selectedList && isSidebarOpen
                              ? '0px'
                              : '30px 10px',
                        }}
                      />

                      {isSidebarOpen == true ? (
                        <ul className={classes.menuAfterSideBarOpen}>
                          {l.options.length > 1 && (
                            <>
                              <b className={classes.listHeading}>
                                <FormattedMessage {...messages.layout[l.id]} />
                              </b>
                              <ul
                                className={classes.subMenu}
                                style={{ left: '200px' }}
                              >
                                {l.options.length && (
                                  <b className={classes.listHeading}>
                                    <FormattedMessage
                                      {...messages.layout[l.id]}
                                    />
                                  </b>
                                )}
                                {l.options.map(option =>
                                  option.link === '#' ? (
                                    <p
                                      key={option.id}
                                      style={{
                                        position: 'relative',
                                        marginBottom: 5,
                                      }}
                                    >
                                      <p
                                        onMouseEnter={() =>
                                          setHoveredData(option.id)
                                        }
                                      >
                                        <b className={classes.listHeading}>
                                          {option.id && (
                                            <FormattedMessage
                                              {...messages.layout[option.id]}
                                            />
                                          )}
                                        </b>
                                      </p>

                                      {option.id === hoverId ? (
                                        <ul
                                          className={classes.InnersubMenu}
                                          style={{ left: '150px' }}
                                        >
                                          {option.options.map(x => (
                                            <li
                                              role="presentation"
                                              key={x.id}
                                              onClick={() =>
                                                menuClickHandler(
                                                  x.link,
                                                  x.id,
                                                  l.id,
                                                  false,
                                                )
                                              }
                                              onKeyDown={() => {}}
                                              className={
                                                x.id === selectedListItem
                                                  ? classes.isActiveList
                                                  : classes.list
                                              }
                                            >
                                              {x.id && (
                                                <FormattedMessage
                                                  {...messages.layout[x.id]}
                                                />
                                              )}
                                            </li>
                                          ))}
                                        </ul>
                                      ) : null}
                                    </p>
                                  ) : (
                                    <li
                                      role="presentation"
                                      key={option.id}
                                      onClick={() =>
                                        menuClickHandler(
                                          option.link,
                                          option.id,
                                          l.id,
                                          false,
                                        )
                                      }
                                      onKeyDown={() => {}}
                                      className={
                                        option.id === selectedListItem
                                          ? classes.isActiveList
                                          : classes.list
                                      }
                                    >
                                      {option.id && (
                                        <FormattedMessage
                                          {...messages.layout[option.id]}
                                        />
                                      )}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </>
                          )}
                          {l.options.length <= 1 &&
                            l.options.map(option => (
                              <li
                                role="presentation"
                                key={option.id}
                                onClick={() =>
                                  menuClickHandler(
                                    option.link,
                                    option.id,
                                    option.id,
                                    false,
                                  )
                                }
                                onKeyDown={() => {}}
                                className={
                                  option.id === selectedListItem
                                    ? classes.isActiveList
                                    : classes.list
                                }
                                onMouseOver={() => setHoveredData(false)}
                              >
                                {option.id && (
                                  <FormattedMessage
                                    {...messages.layout[option.id]}
                                  />
                                )}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <ul className={classes.subMenu}>
                          {l.options.length && (
                            <b className={classes.listHeading}>
                              <FormattedMessage {...messages.layout[l.id]} />
                            </b>
                          )}
                          {l.options.map(option =>
                            option.link === '#' ? (
                              <p
                                key={option.id}
                                style={{
                                  position: 'relative',
                                  marginBottom: 5,
                                }}
                              >
                                <p
                                  onMouseEnter={() => setHoveredData(option.id)}
                                >
                                  <b className={classes.listHeading}>
                                    {option.id && (
                                      <FormattedMessage
                                        {...messages.layout[option.id]}
                                      />
                                    )}
                                  </b>
                                </p>

                                {option.id === hoverId ? (
                                  <ul
                                    className={classes.InnersubMenu}
                                    style={{ left: '150px' }}
                                  >
                                    {option.options.map(x => (
                                      <li
                                        role="presentation"
                                        key={x.id}
                                        onClick={() =>
                                          menuClickHandler(
                                            x.link,
                                            x.id,
                                            l.id,
                                            false,
                                          )
                                        }
                                        onKeyDown={() => {}}
                                        className={
                                          x.id === selectedListItem
                                            ? classes.isActiveList
                                            : classes.list
                                        }
                                      >
                                        {x.id && (
                                          <FormattedMessage
                                            {...messages.layout[x.id]}
                                          />
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </p>
                            ) : (
                              <li
                                role="presentation"
                                key={option.id}
                                onClick={() =>
                                  menuClickHandler(
                                    option.link,
                                    option.id,
                                    l.id,
                                    false,
                                  )
                                }
                                onKeyDown={() => {}}
                                className={
                                  option.id === selectedListItem
                                    ? classes.isActiveList
                                    : classes.list
                                }
                              >
                                {option.id && (
                                  <FormattedMessage
                                    {...messages.layout[option.id]}
                                  />
                                )}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </ListItem>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.fixSidebarPlaceholder} />
          </Hidden>
          <Hidden mdUp>
            <Drawer
              open={isSidebarOpen}
              onClose={() =>
                updateGlobelByKeyVal({
                  key: 'isSidebarOpen',
                  data: !isSidebarOpen,
                })
              }
            >
              <div className={classes.mobileContainer} role="presentation">
                <Button
                  className={classes.toolbar}
                  onClick={() =>
                    updateGlobelByKeyVal({
                      key: 'isSidebarOpen',
                      data: !isSidebarOpen,
                    })
                  }
                >
                  <Link
                    to="/"
                    className={classes.logo}
                    style={{ margin: '0px auto' }}
                  >
                    <img src={logo} alt="icon" width="40%" />
                  </Link>
                </Button>
                <Divider />
                <div className={classes.mobileContprt}>
                  <List disablePadding component="nav">
                    {sidebarData.map((l, i) => (
                      <ListItem
                        key={`item-${l.id}`}
                        disableGutters
                        className={classes.li}
                      >
                        <Accordion
                          className={classes.sidebarListItem}
                          expanded={
                            (expanded && expanded.includes(l.id)) || false
                          }
                          onChange={
                            l.options.length > 1
                              ? handleExpansionList(l.id)
                              : () =>
                                  menuClickHandler(l.link, l.id, l.id, false)
                          }
                        >
                          <AccordionSummary
                            expandIcon={
                              l.options.length > 1 && (
                                <CustomSVG
                                  name="dropdown"
                                  fill={theme.palette.text.main}
                                  height="15"
                                  width="15"
                                />
                              )
                            }
                            aria-controls="panel1a-content"
                            id={`item-${l.id}`}
                            className={classes.panelSummary}
                            classes={{
                              root: classes.panelSummaryContainer,
                              expanded: classes.panelSummaryContainerExpanded,
                            }}
                          >
                            <ListItemIcon
                              classes={{
                                root: classes.listIcon,
                              }}
                            >
                              {l.icon}
                            </ListItemIcon>
                            <ListItemText>
                              <b>
                                <FormattedMessage {...messages.layout[l.id]} />
                              </b>
                            </ListItemText>
                          </AccordionSummary>
                          {l.options.length > 1 && (
                            <AccordionDetails
                              // key={el.id}
                              className={classes.panelDetails}
                            >
                              <List disablePadding>
                                {l.options.map((el, index) => (
                                  <ListItem
                                    key={index + 1}
                                    className={classes.subMenuItems}
                                    classes={{
                                      selected: classes.selectedList,
                                    }}
                                    disableGutters
                                  >
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.layout[el.id]}
                                        />
                                      }
                                      className={classes.subMenuText}
                                      onClick={() =>
                                        menuClickHandler(
                                          el.link,
                                          el.id,
                                          el.id,
                                          false,
                                        )
                                      }
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          )}
                        </Accordion>
                      </ListItem>
                    ))}
                  </List>
                </div>

                {/* Language change commited SNT 28112020 */}
                {/* <div className={classes.subMenuItem}>
                  {languageList &&
                    languageList.map(l => (
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        className={classes.locationButton}
                        key={`sidebarLanguage-${l.id}`}
                        onClick={() => {
                          updateGlobelByKeyVal({
                            key: 'isSidebarOpen',
                            data: !isSidebarOpen,
                          });
                          onLocaleToggle(l.id);
                        }}
                      >
                        {l.icon && (
                          <div
                            className={locale !== l.id ? classes.Active : ''}
                          >
                            <p className={classes.languageIcon}>
                              <CustomSVG
                                name={l.icon}
                                height="40"
                                width="40"
                                fill={theme.palette.primary.main}
                              />
                            </p>
                            <p className={classes.langTxt}>{l.text}</p>
                          </div>
                        )}
                      </Button>
                    ))}
                </div> 
                <Divider />
                */}

                <Typography
                  className={classes.logout}
                  onClick={() => {
                    updateGlobelByKeyVal({
                      key: 'isSidebarOpen',
                      data: !isSidebarOpen,
                    });
                    logout();
                  }}
                >
                  {/* {logOutLabel} */}
                  <FormattedMessage {...messages.Auth.logout} />
                </Typography>
              </div>
            </Drawer>
          </Hidden>
        </Fragment>
      )}
    </Fragment>
  );
}

SideBar.prototypes = {
  setTitle: PropTypes.string,
  history: PropTypes.any,
  isSidebarOpen: PropTypes.bool,
  updateGlobelByKeyVal: PropTypes.any,
  doLogout: PropTypes.any,
  onLocaleToggle: PropTypes.any,
  locale: PropTypes.string,
  userAccess: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isSidebarOpen: makeSelectIsSidebar(),
  locale: state => state.language.locale,
  userAccess: makeSelectUserAccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateGlobelByKeyVal: data => dispatch(updateGlobelByKeyVal(data)),
    doLogout: resolve => dispatch(doLogout(resolve)),
    onLocaleToggle: val => dispatch(changeLocale(val)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(SideBar);
