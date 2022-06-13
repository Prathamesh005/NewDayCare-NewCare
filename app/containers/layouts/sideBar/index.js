import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { actionsConfig, doLogout } from '../../../apis/appApis/appSlice';
import { currentEnvironment } from '../../../config/environmentConfig';
import CustomSVG from '../../../icons/CustomSVG';
import ActiveTreatmentPlanLogo from '../../../images/active-treatment-plan.svg';
import active from '../../../images/active.svg';
import activebilling from '../../../images/activebilling.svg';
import Adminactive from '../../../images/Adminactive.svg';
import AdminIcon from '../../../images/Adminicon.svg';
import treatmentPlanDarkLogo from '../../../images/assets/dark-treatment-plan-logo.svg';
import billing from '../../../images/billing.svg';
import dashboard from '../../../images/dashboard.svg';
import dashboardActive from '../../../images/dashboardActive.svg';
import AllPatientLogo from '../../../images/Group 119.svg';
import DayCareLogo from '../../../images/Group 4366.svg';
import Group115 from '../../../images/Group115.svg';
import Group115Active from '../../../images/Group115Active.svg';
import Group117Active from '../../../images/Group117Active.svg';
import AnalyticsLogo from '../../../images/Icon feather-bar-chart-2.svg';
import HelpLogo from '../../../images/Icon material-live-help.svg';
import logo from '../../../images/logo.png';
import messages from '../../../translations/messages';
import { checkEitherRWRO } from '../../../utils/authHelper';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import { changeLocale } from '../../languageProvider/actions';
import DayCare from '../../../images/assets/day-care.svg';

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
    width: 80,
    float: 'left',
    height: 'calc(100vh - 55px)',
  },

  listHeading: {
    fontSize: '18px',
    pointerEvents: 'none',
    color: '#000000',
    padding: '10px 20px',
    fontWeight: '400',
  },

  listInnerHeading: {
    fontSize: '16px',
    // pointerEvents: 'none',
    color: '#000000',
    cursor: 'pointer',

    '& > span': {
      '&:hover': {
        color: '#ff3399',
      },
    },

    // padding: '10px 20px',
  },
  isActiveList: {
    '& > span': {
      fontWeight: theme.typography.fontWeightBold,
      color: '#FF3399',
    },
  },
  isSubMainActiveList: {
    '& > span': {
      fontWeight: theme.typography.fontWeightBold,
      color: '#FF3399',
      padding: '10px 20px',
    },
  },
  isSubMainActiveAfterOpenList: {
    '& > span': {
      fontWeight: theme.typography.fontWeightBold,
      color: '#FF3399',
    },
  },
  isActiveAdmin: {
    '& > div': {
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
    // display:'none'
  },

  listItem: {
    // margin: "theme.spacing(3, 0, 5)",
    margin: '10px 0px 18px 0px',

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
    minWidth: 45,
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
    minHeight: 80,
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
    // "&:last-child":{
    //   '& $subMenu': {
    //     border:"2px solid red"
    //   }
    // },

    position: 'relative',
    maxWidth: 80,
    cursor: 'pointer',
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
  lit1: {
    // "&:last-child":{
    //   '& $subMenu': {
    //     border:"2px solid red"
    //   }
    // },

    position: 'relative',
    maxWidth: 80,
    cursor: 'pointer',
    '&:hover': {
      maxWidth: 'unset',
      minWidth: 270,

      '& $isActive': {
        backgroundColor: '#f7f6f4 !important',
        width: '280px !important',
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
    top: '-8px',
    left: 79, //'91px'
    display: 'none',
    position: 'absolute',
    minWidth: 200,
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
      color: '#000000',
      transition: '.3s all ease-in-out',
      fontWeight: '400 !important',
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
  rightIcon: {
    position: 'absolute',
    right: -20,
  },
  menuAfterSideBarOpen: {
    color: '#000000',
    left: '80px',
    display: 'flex', // display: 'block',
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
    cursor: 'pointer',
    '& li': {
      // padding: '10px 20px',
      // fontSize: '18px',
      // transition: '.3s all ease-in-out',
      fontWeight: '400',
      whiteSpace: 'noWrap',
      cursor: 'pointer',
      // '& span': {
      //   // transition: '.3s all ease-in-out',
      // },
      // '&:hover > span': {
      //   color: '#FF3399',
      //   border: 'none !important',
      //   outline: 'none !important',
      // },
      '&:first-child': {
        padding: '12px 20px',
      },
    },
    // '&:hover': {
    //   backgroundColor: '#f7f6f4 !important',
    // },
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
    bottom: '-1px',
    left: '0px',
    // float:'right',
    position: 'absolute',
    minWidth: '180px',
    // display: 'flex',
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
    // color:'red'
  },
}));

export function SideBar(props) {
  const {
    setTitle,
    history,
    isSidebarOpen,
    updateGlobelByKeyVal,
    onLocaleToggle,
    locale,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [selectedList, setSelectedList] = useState();
  const [selectedListItem, setSelectedListItem] = useState();
  const [selectedAdminItem, setSelectedAdminItem] = useState();
  const [expanded, setExpanded] = useState(null);
  const [isActive, setActive] = useState(false);
  const [hoverId, setHovered] = useState(false);

  const helpDesk = () => <LiveHelpIcon />;
  const setHoveredData = Id => {
    setHovered(Id);
  };
  const sidebarDataOne = [
    {
      id: 'dashboard',
      resourceId: 'Dashboard',
      icon: dashboardActive,
      link: ROUTES_CONSTANTS.DASHBOARD,
      options: [
        {
          id: 'dashboard',
          link: ROUTES_CONSTANTS.DASHBOARD,
        },
      ],
    },
    {
      id: 'allPatient',
      resourceId: 'Search Patient',
      icon: active,
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
      id: 'onlyappointments',
      resourceId: 'onlyappointments',
      icon: Group115,
      options: [
        {
          id: 'appointments',
          link: ROUTES_CONSTANTS.MY_APPOINTMENTS,
        },
        {
          id: 'allappointments',
          link: ROUTES_CONSTANTS.ALL_APPOINTMENTS,
        },
        {
          id: 'bookappointment',
          link: ROUTES_CONSTANTS.CREATE_APPOINTMENTS,
        },
        {
          id: 'appointmentReports',
          link: ROUTES_CONSTANTS.APPOINTMENT_REPORTS,
        },
        {
          id: 'referralReports',
          link: ROUTES_CONSTANTS.REFERRAL_REPORTS,
        },
      ],
    },
    {
      id: 'billing',
      resourceId: 'billing',
      icon: billing,
      options: [
        {
          id: 'billing',
          link: ROUTES_CONSTANTS.BILLING,
        },
        {
          id: 'generateBill',
          link: ROUTES_CONSTANTS.GENERATE_BILLING,
        },
        {
          id: 'billReport',
          link: ROUTES_CONSTANTS.REPORTS,
        },
      ],
    },
    {
      id: 'onlyDayCare',
      resourceId: 'Day Care',
      icon: DayCare,
      options: [
        {
          id: 'dayCare',
          link: '/daycare',
        },
        {
          id: 'dayCareCreate',
          link: '/daycare/create',
        },
      ],
    },
    {
      id: 'treatmentPlan',
      resourceId: 'Treatment Plan',
      routeAccessKey: 'TreatmentPlanner',
      icon: treatmentPlanDarkLogo,
      link: ROUTES_CONSTANTS.TREATMENT_PLAN,
      options: [
        {
          id: 'treatmentPlan',
          link: ROUTES_CONSTANTS.TREATMENT_PLAN,
        },
      ],
    },

    {
      id: 'onlyAdministration',
      resourceId: 'onlyAdministration',
      icon: AdminIcon,
      options: [
        {
          id: 'organization',
          link: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL,
        },
        {
          id: 'labMaster',
          link: ROUTES_CONSTANTS.ADMINISTRATION_LAB_MASTER,
        },
        {
          id: 'valueSet',
          link: '/',
        },
      ],
    },

    // {
    //   id: 'onlyAdministration',
    //   resourceId: 'onlyAdministration',
    //   icon: AdminIcon,
    //   options: [
    //     {
    //       id: 'clinicalAdministration',
    //       resourceId: 'clinicalAdministration',
    //       icon: AdminIcon,
    //       link: '#',
    //       options: [
    //         {
    //           id: 'doctor',
    //           resourceId: 'doctor',
    //           icon: AdminIcon,
    //           link: ROUTES_CONSTANTS.ADMINISTRATION_DOCTORS,
    //           options: [
    //             // {
    //             //   id: 'adddoctor',
    //             //   link: '/add_doctor',
    //             // },
    //             // {
    //             //   id: 'updatedoctor',
    //             //   link: ROUTES_CONSTANTS.ADMINISTRATION_DOCTORS,
    //             // },
    //           ],
    //         },
    //         {
    //           id: 'staff',
    //           resourceId: 'staff',
    //           icon: AdminIcon,
    //           link: ROUTES_CONSTANTS.ADMINISTRATION_STAFF,
    //           options: [
    //             // {
    //             //   id: 'addPracRole',
    //             //   link: '/add_pracrole',
    //             // },
    //             // {
    //             //   id: 'updatepracRole',
    //             //   link: ROUTES_CONSTANTS.ADMINISTRATION_STAFF,
    //             // },
    //           ],
    //         },
    //         // {
    //         //   id: 'Schedule',
    //         //   resourceId: 'Schedule',
    //         //   icon: AdminIcon,
    //         //   link: ROUTES_CONSTANTS.ADMINISTRATION_SCHEDULES,
    //         //   options: [
    //         //     // {
    //         //     //   id: 'addscheduleslot',
    //         //     //   link: '/add_schedule',
    //         //     // },
    //         //     // {
    //         //     //   id: 'updatescheduleslot',
    //         //     //   link: ROUTES_CONSTANTS.ADMINISTRATION_SCHEDULES,
    //         //     // },
    //         //   ],
    //         // },
    //         // {
    //         //   id: 'Slot',
    //         //   resourceId: 'Slot',
    //         //   icon: AdminIcon,
    //         //   link: ROUTES_CONSTANTS.ADMINISTRATION_SLOTS,
    //         //   options: [
    //         //     // {
    //         //     //   id: 'addslot',
    //         //     //   link: '/add_slot',
    //         //     // },
    //         //     // {
    //         //     //   id: 'updateslot',
    //         //     //   link: ROUTES_CONSTANTS.ADMINISTRATION_SLOTS,
    //         //     // },
    //         //   ],
    //         // },
    //       ],
    //     },
    //   ],
    // },
  ];
  const sidebarDataTwo = [
    {
      id: 'dashboard',
      resourceId: 'Dashboard',
      icon: dashboardActive,
      link: ROUTES_CONSTANTS.DASHBOARD,
      options: [
        {
          id: 'dashboard',
          link: ROUTES_CONSTANTS.DASHBOARD,
        },
      ],
    },
    {
      id: 'allPatient',
      resourceId: 'Search Patient',
      icon: active,
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
      id: 'onlyappointments',
      resourceId: 'onlyappointments',
      icon: Group115,
      options: [
        {
          id: 'appointments',
          link: ROUTES_CONSTANTS.MY_APPOINTMENTS,
        },
        {
          id: 'allappointments',
          link: ROUTES_CONSTANTS.ALL_APPOINTMENTS,
        },
        {
          id: 'bookappointment',
          link: ROUTES_CONSTANTS.CREATE_APPOINTMENTS,
        },
        {
          id: 'appointmentReports',
          link: ROUTES_CONSTANTS.APPOINTMENT_REPORTS,
        },
        {
          id: 'referralReports',
          link: ROUTES_CONSTANTS.REFERRAL_REPORTS,
        },
      ],
    },
    {
      id: 'billing',
      resourceId: 'billing',
      icon: billing,
      options: [
        {
          id: 'billing',
          link: ROUTES_CONSTANTS.BILLING,
        },
        {
          id: 'generateBill',
          link: ROUTES_CONSTANTS.GENERATE_BILLING,
        },
        {
          id: 'billReport',
          link: ROUTES_CONSTANTS.REPORTS,
        },
      ],
    },

    // {
    //   id: 'treatmentPlan',
    //   resourceId: 'Treatment Plan',
    //   routeAccessKey: 'TreatmentPlanner',
    //   icon: treatmentPlanDarkLogo,
    //   link: ROUTES_CONSTANTS.TREATMENT_PLAN,
    //   options: [
    //     {
    //       id: 'treatmentPlan',
    //       link: ROUTES_CONSTANTS.TREATMENT_PLAN,
    //     },
    //   ],
    // },
  ];
  let sidebarData = currentEnvironment === 'PROD' ? sidebarDataTwo : currentEnvironment === 'DEMO' ? sidebarDataTwo : sidebarDataOne;
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
    props.doLogout();
  };

  useEffect(() => {
    sidebarData.forEach((l, i) => {
      // eslint-disable-next-line array-callback-return
      l.options.map(option => {
        if (window.location.pathname === option.link) {
          setSelectedList(i);
          setTitle(option.id);
          setSelectedListItem(option.id);

          setSelectedAdminItem();
        } else if (option.link === '#') {
          option.options.map(val => {
            if (window.location.pathname === val.link) {
              setSelectedList(i);
              setTitle(val.id);
              setSelectedListItem(val.id);

              setSelectedAdminItem(option.id);
            }
          });
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
      // NOTE : props.location.search removed due to  search query for old route was present
      // props.history.push(link + props.location.search);
      props.history.push(link);

      updateGlobelByKeyVal({
        key: 'isSidebarOpen',
        data: false,
      });

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

  // console.log('selectedList', selectedList)
  // console.log('setSelectedListItem', selectedListItem)
  return (
    <Fragment>
      <Hidden smDown>
        <div
          className={classes.fixedSideBar}
          style={{
            width: !isSidebarOpen ? '80px' : '280px',
            boxShadow: '2px 0px 6px rgba(85, 85, 85, 0.08)',
          }}
        >
          <div className={classes.container}>
            {sidebarData.map((l, i) => {
              //NOTE:  CHECK for hide menu logic if object has routeAccessKey key
              // here we are not showing list menu
              if (l.routeAccessKey && !checkEitherRWRO(l.routeAccessKey)) {
                return null;
              }
              return (
                <div
                  className={isSidebarOpen ? classes.lit1 : classes.lit}
                  key={`list-${l.id}`}
                >
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

                      {/* NOTE : this condition will render active icon and all non-selected image will get render with help of last option  */}
                      {l.id == 'dashboard' && i === selectedList ? (
                        <>
                          <img
                            width="25px"
                            height="25px"
                            src={dashboard}
                            alt="Needelp"
                          />{' '}
                        </>
                      ) : l.id == 'onlyAdministration' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={Adminactive}
                          alt="Needelp"
                        />
                      ) : l.id == 'clinicalAdministration' &&
                        i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={Adminactive}
                          alt="Needelp"
                        />
                      ) : l.id == 'allPatient' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={AllPatientLogo}
                          alt="Needelp"
                        />
                      ) : l.id == 'onlyappointments' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={Group115Active}
                          alt="Needelp"
                        />
                      ) : l.id == 'onlysurgeries' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={Group117Active}
                          alt="Needelp"
                        />
                      ) : l.id == 'billing' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={activebilling}
                          alt="Needelp"
                        />
                      ) : l.id == 'analytics' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={AnalyticsLogo}
                          alt="Needelp"
                        />
                      ) : l.id == 'helpdesk' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={HelpLogo}
                          alt="Needelp"
                        />
                      ) : l.id == 'onlyDayCare' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={DayCareLogo}
                          alt="Needelp"
                        />
                      ) : l.id == 'treatmentPlan' && i === selectedList ? (
                        <img
                          width="25px"
                          height="25px"
                          src={ActiveTreatmentPlanLogo}
                          alt="Needelp"
                        />
                      ) : (
                        // NOTE : all not selected item image get render here
                        <img
                          width="25px"
                          height="25px"
                          src={l.icon}
                          alt="Needelp"
                        />
                      )}

                      {/* {l.icon} */}
                    </ListItemIcon>
                    {/* {console.log('l.id',l.id)}
                    {console.log('selectedList', selectedList)}
                    {console.log('i', i)}
                    {console.log('===', l.id == 'onlyAdministration' && i === selectedList)} */}
                    <div
                      className={classes.isActive}
                      style={{
                        background: i === selectedList ? '#FEF0FF' : 'none',
                        width:
                          i === selectedList && isSidebarOpen
                            ? '280px'
                            : '80px',
                        // : '100%',
                        marginLeft:
                          i === selectedList && isSidebarOpen
                            ? '-15px'
                            : '-15px',
                        padding:
                          i === selectedList && isSidebarOpen
                            ? '30px 10px'
                            : '30px 10px',
                      }}
                    />

                    {isSidebarOpen == true ? (
                      <ul className={classes.menuAfterSideBarOpen}>
                        {l.options.length > 1 && (
                          <>
                            {console.log('l.options ', l.options)}
                            {console.log('l ', l)}

                            {/* className={classes.listHeading} */}
                            <b
                              className={
                                //for administration
                                l.options.some(
                                  option => option.id === selectedAdminItem,
                                )
                                  ? classes.isSubMainActiveList
                                  : l.options.some(
                                    option => option.id === selectedListItem,
                                  )
                                    ? classes.isSubMainActiveList
                                    : classes.listHeading
                              }
                            >
                              <FormattedMessage {...messages.layout[l.id]} />

                              {l.options.length > 0 && (
                                <ChevronRightIcon
                                  className={classes.rightIcon}
                                />
                              )}
                            </b>
                            <ul
                              className={classes.subMenu}
                              style={{ left: '198px' }}
                            // style={{ left: '200px' }}
                            >
                              {/* {l.options.length && (
                                <b className={classes.listHeading}>
                                  <FormattedMessage
                                    {...messages.layout[l.id]}
                                  />
                                </b>
                              )} */}
                              {l.options.map(option =>
                                option.link === '#' ? (
                                  // <p style={{position: 'relative',top:'10px'}}>
                                  <span
                                    key={option.id}
                                    style={{ padding: '10px 20px' }}
                                    onMouseEnter={() =>
                                      setHoveredData(option.id)
                                    }
                                    className={
                                      option.id === selectedAdminItem
                                        ? classes.isActiveAdmin
                                        : classes.list
                                    }
                                  >
                                    {/* className={classes.listInnerHeading} */}
                                    <div className={classes.listInnerHeading}>
                                      {option.id && (
                                        <FormattedMessage
                                          {...messages.layout[option.id]}
                                        />
                                      )}
                                    </div>
                                    {/* </p> */}

                                    {option.id === hoverId ? (
                                      <ul
                                        className={classes.InnersubMenu}
                                        style={{ left: '195px' }}
                                      >
                                        {option.options.map(x => (
                                          <li
                                            role="presentation"
                                            key={x.id}
                                            onClick={() =>
                                              menuClickHandler(
                                                x.link,
                                                x.id,
                                                1,
                                                false,
                                              )
                                            }
                                            onKeyDown={() => { }}
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
                                  </span>
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
                                    onKeyDown={() => { }}
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
                              //this affect in list hover
                              onKeyDown={() => { }}
                              // className={
                              //   option.id === selectedListItem
                              //     ? classes.isActiveList
                              //     : classes.list
                              // }
                              onMouseOver={() => setHoveredData(false)}
                              className={
                                l.options.some(
                                  option => option.id === selectedAdminItem,
                                )
                                  ? classes.isSubMainActiveAfterOpenList
                                  : l.options.some(
                                    option => option.id === selectedListItem,
                                  )
                                    ? classes.isSubMainActiveAfterOpenList
                                    : classes.list
                              }
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
                        {/* {l.options.length && (
                          <b className={classes.listHeading}>
                            <FormattedMessage {...messages.layout[l.id]} />
                          </b>
                        )} */}

                        {l.options.map(option =>
                          option.link === '#' ? (
                            // <p style={{position: 'relative',marginBottom:5}}>
                            <span
                              key={option.id}
                              style={{ padding: '10px 20px' }}
                              onMouseEnter={() => setHoveredData(option.id)}
                              className={
                                option.id === selectedAdminItem
                                  ? classes.isActiveAdmin
                                  : classes.list
                              }
                            >
                              <div className={classes.listInnerHeading}>
                                {option.id && (
                                  <FormattedMessage
                                    {...messages.layout[option.id]}
                                  />
                                )}
                              </div>
                              {/* </p>*/}

                              {option.id === hoverId ? (
                                <ul
                                  className={classes.InnersubMenu}
                                  style={{ left: '195px' }}
                                >
                                  {option.options.map(x => (
                                    <li
                                      role="presentation"
                                      key={x.id}
                                      onClick={() =>
                                        menuClickHandler(x.link, x.id, 3, false)
                                      }
                                      onKeyDown={() => { }}
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
                            </span>
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
                              onKeyDown={() => { }}
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
              );
            })}
          </div>
        </div>
        <div className={classes.fixSidebarPlaceholder} />
      </Hidden>

      {/* for mobile  */}
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
                {sidebarData.map((l, i) => {
                  if (l.routeAccessKey && !checkEitherRWRO(l.routeAccessKey)) {
                    return null;
                  }
                  return (
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
                            : () => menuClickHandler(l.link, l.id, l.id, false)
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
                            <img
                              width="25px"
                              height="25px"
                              src={l.icon}
                              alt="Needelp"
                            />
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
                  );
                })}
              </List>
            </div>

            <Button
              className={classes.logout}
              onClick={() => {
                updateGlobelByKeyVal({
                  key: 'isSidebarOpen',
                  data: !isSidebarOpen,
                });
                logout();
              }}
            >
              <FormattedMessage {...messages.Auth.logout} />
            </Button>
          </div>
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalNew;

export function mapDispatchToProps(dispatch) {
  return {
    updateGlobelByKeyVal: data =>
      dispatch(actionsConfig.updateGlobelByKeyVal(data)),
    doLogout: () => dispatch(doLogout()),

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
  withRouter,
)(SideBar);
