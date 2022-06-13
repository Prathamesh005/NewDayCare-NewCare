import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { actionsConfig, doLogout } from '../../../apis/appApis/appSlice';
import { GrayIconButton } from '../../../components';
import CustomSVG from '../../../icons/CustomSVG';
import IconExpand from '../../../images/assets/Icon ionic-md-arrow-dropdown.svg';
import ColorMenuExpand from '../../../images/assets/Icon open-menu (1).svg';
import MenuExpand from '../../../images/assets/Icon open-menu.svg';
import InstantAppointmentIcon from '../../../images/InstantAppointmentIcon.svg';
import nqLogo from '../../../images/new_logo_nuqare.png';
import messages from '../../../translations/messages';
import { getUserCredentials } from '../../../utils/authHelper';
import {
  deleteKeyFromLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import SelectHospital from '../selectHospital';
import IndexSearch from './indexSearch';
import { styled } from '@material-ui/core';
import NotificationPopper from '../../dashboard/components/notification/components/NotificationPopper';
import { loadNotification } from '../../../apis/globalApis/globalSlice';

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    color: 'white',
    backgroundColor: '#FF3399',
    fontSize: '0.7rem',
  },
});

const useStyles = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  menuButtons: {
    width: 80,
    // position: "fixed",
    // width: 256,
    // height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: -25,
    // paddingLeft: 10,
    margin: '0px 0px 0px -25px',
    padding: 5,
    background: '#F8F8F8',
  },
  menuButtons1: {
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 0px 0px -25px',
    padding: 5,
    background: '#FF3399',
  },
  menuIconButton: {
    '&:hover': {
      background: 'unset',
    },
    '&:focus': {
      background: 'unset',
    },
  },
  toolBar: {
    background: '#ffffff',
    minHeight: theme.spacing(11),
    height: theme.spacing(11),
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  header: {
    boxShadow: '0px 3px 6px rgba(85,85,85,.09)',
  },
  title: {
    color: theme.palette.text.main,
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    letterSpacing: 0.8,
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(6),
      fontWeight: 'bold',
    },
  },
  logo: {
    textDecoration: 'none',
    marginRight: theme.spacing(4),
    '& > img': {
      width: 40,
      height: 40,
    },
  },
  headerLeft: {
    color: theme.palette.text.main,
    display: 'flex',
    alignItems: 'center',
    marginRight: 'auto',
  },
  headerCenter: {
    position: 'absolute',
    //transform: 'translateX(-50%)',
    //left: '20%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    marginTop: '20px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  pageName: {
    ...theme.typography.h4,
    color: theme.palette.text.light,
    marginLeft: 50,
    marginTop: '-10px',
    textAlign: 'left',
  },
  sepeartor: {
    backgroundColor: theme.palette.lineBorderColor.light,
    height: 30,
    width: 1,
    margin: theme.spacing(4),
  },
  userButton: {
    ...theme.typography.h4,
    color: theme.palette.button.secondary.main,
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    border: `1px solid transparent`,
    borderRadius: '100%',
    textTransform: 'capitalize',
    minWidth: 30,
    outline: 'none !important',
  },
  avatar: {
    // backgroundColor: "#c4c4c4",
    width: 100,
    height: 100,
    // border: '1px solid #FF3399',
    // borderRadius: "73px",
    // boxShadow: "0px 3px 6px #00000029",
    // margin:"15px 0px",
    // marginBottom: 20,
    // marginTop: 20,
    // [theme.breakpoints.down('sm')]: {
    //   width: "90px",
    //   height: "90px",
    //   borderRadius: "100%"
    //  },
    '& .MuiAvatar-img': {
      width: 'unset',
    },
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  appBar: {
    width: '100% !important',
    paddingRight: `${theme.spacing(0)}px !important`,
    boxShadow: '0 1px 5px 0 rgba(0,0,0,0.15)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 3),
      boxShadow: 'none',
      backgroundColor: '#F8F8F8 !important',
    },
    backgroundColor: '#F8F8F8 !important',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0),
      width: '100vw',
    },
    backgroundColor: '#F8F8F8 !important',
  },
  menuButton: {
    height: '60px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
    margin: 0,
    paddingLeft: 0,
    width: '76px',
    transition: '.3s opacity ease-in-out,.3s .3s background-color ease-in-out',
    opacity: 1,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  hide: {
    opacity: 0,
    width: 0,
    padding: 0,
  },
  divider: {
    height: theme.spacing(4),
    width: 1,
    background: theme.palette.lineBorderColor.tableBorder,
    marginRight: theme.spacing(3),
  },

  search: {
    position: 'relative',
    border: '0.5px solid #707070',
    borderRadius: '5px',
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    padding: '0px !important',
    height: '35px',
    // marginTop: 7
  },
  searchIcon: {
    padding: theme.spacing(1, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6c6c6c',
  },
  inputRoot: {
    color: 'default',
  },
  inputInput: {
    fontWeight: 400,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
    ['@media (min-width:960px) and (max-width:1040px)']: {
      // eslint-disable-line no-useless-computed-key
      width: '20ch !important',
    },
  },
  grow: {
    flexGrow: 1,
  },
  selectOrg: {
    backgroundColor: '#F7F6F4',
    color: '#5d5d5d',
    // padding: "0.5rem 0.7rem",
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
  },
  // wrapText:{
  //   overflow: "hidden",
  // },
  arrowBox: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
    },
  },
  userProfile: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 15,
    },
    ['@media (min-width:960px) and (max-width:1070px)']: {
      // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
  },

  profileBtn: {
    padding: '0px 15px 0px 0px',
    borderRadius: 17,
    background: '#ffffff',
    fontSize: '0.98rem',
    marginLeft: '2.5rem',
    fontWeight: 400,
    '&:hover': {
      background: '#f4f4f4',
    },
  },
  profileImage: {
    width: 30,
    height: 30,
    marginLeft: 5,
    border: '2px solid #ff3399',
    borderRadius: 50,
  },
  card: {
    minWidth: 300,
  },
  cardHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheaderTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkCss: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
  },
  listText: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  popover_class: {
    top: '9px !important',
  },
  orgImg: {
    objectFit: 'contain',
  },
  orgText: {
    display: 'flex',
    alignItems: 'center',
    margin: 6,
  },
}));
const drawerWidth = 275;
export function Header(props) {
  const {
    isSidebarOpen,
    title,
    openSidebar,
    updateGlobelByKeyVal,
    isSessionDetails,
    intl,
    updateCount,
  } = props.globalNew;

  const classes = useStyles();
  const theme = useTheme();
  const [action, setAction] = React.useState();
  const userMenu = {
    options: ['Logout'],
    image: false,
    recent: false,
  };
  const [openSelectOrg, setOpenSelectOrg] = useState(false);
  // For todays date;
  Date.prototype.today = function() {
    return `${(this.getDate() < 10 ? '0' : '') + this.getDate()}-${
      this.getMonth() + 1 < 10 ? '0' : ''
    }${this.getMonth() + 1}-${this.getFullYear()}`;
  };

  // For the time now
  Date.prototype.timeNow = function() {
    return `${(this.getHours() < 10 ? '0' : '') + this.getHours()}:${
      this.getMinutes() < 10 ? '0' : ''
    }${this.getMinutes()}`;
  };
  const [curTime, setCurTime] = useState();
  const org = getFromLocalStorage('ORG');
  const loc = getFromLocalStorage('LOC');
  const orgName = org !== null ? org.split('|')[1].split('/')[0] : null;
  const locName =
    org !== null
      ? loc
          .split('|')[1]
          .split('/')
          .pop()
      : null;

  useEffect(() => {
    const ac = new AbortController();
    setCurTime(new Date().timeNow());
    const interval = setInterval(function() {
      setCurTime(new Date().timeNow());
    }, 60000);
    return () => ac.abort();
  }, []);

  if (action === 'Logout') {
    props.doLogout();
  }

  const handleOrganization = () => {
    setOpenSelectOrg(!openSelectOrg);
  };
  const handleCloseDialog = () => {
    setOpenSelectOrg(false);
    history.replace('/');
  };

  const [nOpen, setnOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const nhandleToggle = () => {
    setnOpen(prevOpen => !prevOpen);
  };

  const nhandleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setnOpen(false);
  };

  function nhandleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setnOpen(false);
    }
  }

  // return focus to the button when we transitioned from !nOpen -> nOpen
  const prevOpen = React.useRef(nOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && nOpen === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = nOpen;
  }, [nOpen]);

  let history = useHistory();

  const userDetail = getUserCredentials();

  React.useEffect(() => {
    if (!(userDetail && userDetail.display)) {
      window.location.href = '/sessionexpired';
    }
  }, [userDetail]);
  const doctorFirstName = `${userDetail && userDetail.first} ${
    userDetail && userDetail.last ? userDetail.last : ''
  }`;

  const hospitalImage =
    userDetail &&
    userDetail.organizationDetails &&
    userDetail.organizationDetails[0].organizationLogo;
  const channelLink =
    userDetail &&
    userDetail.organizationDetails &&
    userDetail.organizationDetails[0].endpoint;
  const channelId = userDetail && userDetail.fhirResourceId;

  const raiseInvoiceClicked = () => {
    deleteKeyFromLocalStorage('resourceId');
    setToLocalStorage('resourceId', channelId);
    window.open(`${channelLink}`, '_blank'); //to open new page
    setnOpen(false);
  };

  const handleOpenCreateAppointment = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.CREATE_APPOINTMENTS,
      state: {
        path: history.location.pathname,
      },
    });
  };
  const handleAdminProfile = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE,
      search: `?practitionerID=${userDetail.fhirResourceId}`,
    });
  };

  //notification work
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState([]);

  //api call to load and filter unread notification
  const callLoadNotification = async () => {
    const resourceId = getFromLocalStorage('data').userDetails.fhirResourceId;
    const limit = 20;
    const url = '';
    const id = 0;

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

  // end api call

  let Data =
    props && props.globalReducerThunk && props.globalReducerThunk.actdata;
  const MINUTE_MS = 300000;

  useEffect(() => {
    callLoadNotification();
  }, []);

  //call api after every 5 min to update notification count on badge after create new appointment
  useEffect(() => {
    const interval = setInterval(() => {
      callLoadNotification();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  //unread notification count
  useEffect(() => {
    const filterNotification =
      Data &&
      Data.length > 0 &&
      Data.filter(ele => {
        return ele.communication.status === 'InProgress';
      });
    setUnreadNotification(filterNotification ? [...filterNotification] : []);
  }, [Data]);

  //pass as a prop to notification popper and set open close popper based on click away listner
  const popperOPen = value => {
    setOpenNotification(value);
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isSidebarOpen,
        })}
      >
        <Toolbar classes={{ root: classes.toolBar }}>
          <Hidden mdUp>
            <CustomSVG
              name="menuHamburger"
              onClick={() =>
                updateGlobelByKeyVal({
                  key: 'isSidebarOpen',
                  data: !isSidebarOpen,
                })
              }
              fill={theme.palette.text.main}
              height="20"
              width="20"
            />
            <Typography className={classes.title} align="left">
              {title && <FormattedMessage {...messages.layout[title]} />}
            </Typography>
          </Hidden>
          <Hidden smDown>
            <div className={classes.headerLeft}>
              <div
                className={
                  !isSidebarOpen ? classes.menuButtons : classes.menuButtons1
                }
              >
                <IconButton
                  onClick={() =>
                    updateGlobelByKeyVal({
                      key: 'isSidebarOpen',
                      data: !isSidebarOpen,
                    })
                  }
                  disableRipple
                  edge="start"
                  //color="inherit"
                  aria-label="open drawer"
                  style={{ marginLeft: -5 }}
                  className={classes.menuIconButton}
                >
                  <img
                    src={!isSidebarOpen ? MenuExpand : ColorMenuExpand}
                    height={20}
                    width={20}
                  />
                </IconButton>
              </div>

              <div className={classes.divider} />

              <img
                src={nqLogo}
                height="40px"
                style={{ paddingRight: 16 }}
                alt="icon"
              />

              <div
                className={classes.selectOrg}
                onClick={() => handleOrganization()}
              >
                <div className={classes.orgText}>
                  <Typography variant="h4" noWrap>
                    {orgName},{locName}{' '}
                  </Typography>

                  <ExpandMoreIcon className={classes.arrowBox} />
                </div>
              </div>
            </div>

            <div className={classes.headerRight}>
              <div style={{ marginRight: '15px' }}>
                <img
                  src={InstantAppointmentIcon}
                  alt="Instant Appointment"
                  height="25px"
                  width="25px"
                  onClick={() => handleOpenCreateAppointment()}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <IndexSearch />

              <Button
                className={classes.profileBtn}
                startIcon={
                  <Avatar alt="Not Found!" className={classes.profileImage} />
                }
                onClick={handleAdminProfile}
              >
                {userDetail &&
                  (userDetail.userRole === 'Doctor'
                    ? ` ${doctorFirstName}`
                    : `${userDetail && userDetail.first} ${userDetail &&
                        userDetail.last} `)}
              </Button>

              <GrayIconButton
                aria-label="show 17 new notifications"
                onClick={() => popperOPen(true)}
                style={{ padding: 6, margin: '0px 5px' }}
              >
                <StyledBadge
                  badgeContent={updateCount ? unreadNotification.length : 0}
                >
                  <NotificationsIcon style={{ fontSize: 25 }} />
                </StyledBadge>
              </GrayIconButton>

              {openNotification && (
                <NotificationPopper
                  open={openNotification}
                  popperOPen={popperOPen}
                  unreadNotification={unreadNotification}
                />
              )}

              <GrayIconButton
                ref={anchorRef}
                aria-controls={nOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={nhandleToggle}
                style={{ padding: 11, margin: '0px 5px' }}
              >
                <img
                  src={IconExpand}
                  height="15px"
                  width="15px"
                  alt="Not Found!"
                />
              </GrayIconButton>

              <Popper
                className={classes.popover_class}
                open={nOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper elevation={2}>
                      <ClickAwayListener onClickAway={nhandleClose}>
                        <MenuList
                          autoFocusItem={nOpen}
                          id="menu-list-grow"
                          onKeyDown={nhandleListKeyDown}
                        >
                          <Card className={classes.card} elevation={0}>
                            <CardHeader
                              avatar={
                                <img
                                  height="100"
                                  width="100"
                                  src={
                                    'data:image/*;base64,' +
                                    hospitalImage.split('|')[1]
                                  }
                                  alt="icon"
                                  className={classes.orgImg}
                                />
                              }
                              title={
                                userDetail &&
                                (userDetail.userRole === 'Doctor'
                                  ? ` ${doctorFirstName}`
                                  : `${userDetail &&
                                      userDetail.first} ${userDetail &&
                                      userDetail.last} `)
                              }
                              subheader={`${orgName}, ${locName}`}
                              classes={{
                                title: classes.headerTitle,
                                subheader: classes.subheaderTitle,
                              }}
                              className={classes.cardHeader}
                            />
                          </Card>

                          <List
                            component="nav"
                            aria-label="main mailbox folders"
                          >
                            <Divider />

                            <Link
                              className={classes.linkCss}
                              to={{
                                pathname: '/helpdesk',
                              }}
                            >
                              <ListItem
                                button
                                onClick={() => {
                                  setnOpen(false);
                                }}
                              >
                                <ListItemIcon>
                                  <HelpOutlineIcon
                                    style={{ color: '#313131' }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Help"
                                  classes={{ primary: classes.listText }}
                                />
                              </ListItem>
                            </Link>

                            <ListItem
                              button
                              onClick={() => raiseInvoiceClicked()}
                            >
                              <ListItemIcon>
                                <DescriptionOutlinedIcon
                                  style={{ color: '#313131' }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Channel"
                                classes={{ primary: classes.listText }}
                              />
                            </ListItem>

                            <ListItem button onClick={e => setAction('Logout')}>
                              <ListItemIcon>
                                <ExitToAppIcon style={{ color: '#313131' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary="Logout"
                                classes={{ primary: classes.listText }}
                              />
                            </ListItem>
                          </List>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>

      {openSelectOrg ? (
        <SelectHospital handleCloseDialog={handleCloseDialog} />
      ) : (
        ''
      )}
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    doLogout: () => dispatch(doLogout()),

    updateGlobelByKeyVal: resolve =>
      dispatch(actionsConfig.updateGlobelByKeyVal(resolve)),
    loadNotification: payload => dispatch(loadNotification(payload)),
    updateNotficationByKeyVal: payload =>
      dispatch(actionsConfig.updateNotficationByKeyVal(payload)),
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
  injectIntl,
)(Header);
