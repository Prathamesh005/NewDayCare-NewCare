/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import loadable from 'utils/loadable';
import { isAuthenticate, getUserCredentials } from '../../utils/authHelper';
import { ROUTES_CONSTANTS } from './routeConstants';
import { actionsConfig, doLogout } from '../../apis/appApis/appSlice';

import Auth from '../auth';
import SessionExpired from '../auth/components/SessionExpired';
import Header from '../layouts/header';
import SideBar from '../layouts/sideBar';
import PageNotFound from '../../components/elements/404';
import AccessDenied from '../../components/elements/AccessDenied';
import ErrorPage from '../../components/elements/errorPage';
import Graph from '../../components/elements/Graph';
import TitleComponent from '../../components/elements/header';

import Helpdesk from '../helpDesk/HelpDesk';

import Dashboard from '../dashboard/Lodable';
import Notification from '../dashboard/components/notification/Lodable';

import Searchpatient from '../searchPatient/Lodable';
import PatientRegistration from '../patientRegistration/Lodable';

import Appointment from '../appointments/Lodable';
import AppointmentReport from '../appointments/components/reports/AppoinmentReport';
import ReferralReport from '../appointments/components/reports/ReferralReport';
import BookAppointment from '../appointments/bookAppointment/BookAppointment';
import AppointmentSummary from '../appointments/appointmentSummary';
import AppointmentForm from '../appointments/components/forms/AppointmentForm';
import VideoConsultation from '../appointments/components/videoConsultation';

import AllAppointment from '../allAppointments/Lodable';

import Patient360 from '../patient360/Lodable'; //change
import EpisodeOfCare from '../episodeOfCare/Lodable';

import Billing from '../billing';
import GenerateBill from '../billing/components/GenerateBill';
import BillReport from '../billing/components/BillReport';

import TreatmentPlanContainer from '../treatmentPlan';
import { CreateTreatmentPlan } from '../treatmentPlan/pages';

// Hospitals
import Hospital from '../administration/components/hospitals/Lodable';
const AllHospital = loadable(() =>
  import('../administration/components/hospitals/pages/hospital/AllHospitals'),
);
import HospitalAdd from '../administration/components/hospitals/pages/hospital/HospitalAdd';
import HospitalEdit from '../administration/components/hospitals/pages/hospital/HospitalEdit';

// Doctors
import AllDoctors from '../administration/components/doctors/Lodable';
import CreateDoctor from '../administration/components/doctors/components/DoctorAdd';
import EditDoctor from '../administration/components/doctors/components/DoctorEdit';

// Staff
import AllStaff from '../administration/components/staff/Lodable';
import CreateStaff from '../administration/components/staff/components/StaffAdd';
import EditStaff from '../administration/components/staff/components/StaffEdit';

// Location
import CreateLocation from '../administration/components/location/components/LocationAdd';
import EditLocation from '../administration/components/location/components/LocationEdit';

// lab master
import LabMaster from '../administration/components/labMaster/Lodable';
import LabMasterEdit from '../administration/components/labMaster/components/LabMasterEdit';
import LabMasterUpload from '../administration/components/labMaster/components/LabMasterUpload';

// profile
import DashBoard from '../administration/components/profile/pages/dashboard/index';
import AddRefLink from '../administration/components/profile/pages/dashboard/components/referenceCard/AddRefLink';
import EditRefLink from '../administration/components/profile/pages/dashboard/components/referenceCard/EditRefLink';
import Configurations from '../administration/components/profile/pages/configurations';
import AddNewSlot from '../administration/components/profile/pages/configurations/components/slotManagement/components/AddNewSlot';
import EditExisitingSlot from '../administration/components/profile/pages/configurations/components/slotManagement/components/EditExisitingSlot';
import AddNewBlockCalender from '../administration/components/profile/pages/configurations/components/blockCalender/components/AddNewBlockCalender';
import EditExistingBlockCalender from '../administration/components/profile/pages/configurations/components/blockCalender/components/EditExistingBlockCalender';

// license
import ChooseLicense from '../administration/components/license/pages/chooseLicense/index';
import CustomizeLicense from '../administration/components/license/pages/customLicense/index';
import ManagedLicense from '../administration/components/license/pages/manageLicense/index';
import LicenseHistoryPage from '../administration/components/license/pages/licenseHistory/index';
import { currentEnvironment } from '../../config/environmentConfig';
import DayCare from '../dayCare';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.backgroundColor.primary,
    // maxHeight: '100vh',
    // overflow: 'hidden auto',
    flexDirection: 'column',
    display: 'flex',
    scrollBehavior: 'smooth',
    scrollPaddingTop: '60px',
    padding: theme.spacing(4),
    paddingTop: theme.spacing(15),
    // paddingLeft: 7,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'unset',
    },
    [theme.breakpoints.down('md')]: {
      scrollSnapType: 'y proximity',
      padding: props => props.isSessionDetails && 0,
    },
    minHeight: '100vh', //1000
  },
  header: {
    padding: theme.spacing(0),
  },
  scrollTop: {
    position: 'fixed',
    left: '48.2%',
    bottom: 20,
    // right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    cursor: 'pointer',
    animation: 'alphaIn 0.3s',
    transition: 'opacity 0.4s',
    opacity: '0.6',
    backgroundColor: '#000000c2',
    '&:hover': { opacity: '1', color: '#000000 !important' },
  },
  '@keyframes alphaIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 0.5,
    },
  },
}));
export function App(props) {
  const [title, setTitle] = useState('');
  const classes = useStyles(props);
  const timer = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const subscription = getFromLocalStorage('SUBSCRIPTION');
  const activeSubscriptions =
    subscription && subscription.filter(item => item.status === 'Active');
  const OPD =
    activeSubscriptions && activeSubscriptions.find(ele => ele.name === 'OPD');
  const Administration =
    activeSubscriptions &&
    activeSubscriptions.find(ele => ele.name === 'Administration');

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  const closeSidebar = () => {
    props.updateGlobelByKeyVal({
      key: 'isSidebarOpen',
      data: false,
    });
    // debugger
  };
  // console.log("currentEnv", currentEnvironment)
  const Loader = () => (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: 99,
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100%',
      }}
    >
      <span
        style={{
          textAlign: 'center',
          color: '#ffffff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 35,
        }}
      >
        <CircularProgress size={100} thickness={7} />
      </span>
    </div>
  );

  // NOTE - donts no what this condition does and when its run
  // tokenExpireTime is not getting in props
  if (
    getFromLocalStorage('HKTWQ') &&
    !props.authData
    //&& getFromLocalStorage('HKTWQ').tokenExpireTime > Math.floor(Date.now() / 1000)
  ) {
    // props.getAccess(getFromLocalStorage('HKTWQ'));
    props.loginSuccess(getFromLocalStorage('HKTWQ'));
  }

  const checkEitherRWRO = module => {
    const found = true;
    // (getFromLocalStorage('RWF') &&
    //   getFromLocalStorage('RWF').find(item => item === module)) ||
    // (getFromLocalStorage('RWF') &&
    //   getFromLocalStorage('ROF').find(item => item === module));
    if (found) return true;
    else return false;
  };
  const checkEitherRO = module => {
    const found = true;
    // getFromLocalStorage('ROF') &&
    // getFromLocalStorage('ROF').find(item => item === module);
    if (found) return true;
    else return false;
  };
  // console.log("process", process.env.NODE_ENV)
  let routes;

  if (getFromLocalStorage('HKTWQ')) {
    if (isAuthenticate) {
      if (
        props.location.pathname === '/404' ||
        props.location.pathname === '/access-denied'
      ) {
        routes = (
          <Switch>
            <Route from="/404" component={PageNotFound} />
            <Route path="/access-denied" component={AccessDenied} />
          </Switch>
        );
      } else {
        routes = (
          <Fragment>
            <TitleComponent title={props.location && props.location.pathname} />

            <Header title={title} />

            <SideBar setTitle={setTitle} />
            <div
              className={classes.root}
              onClick={() => {
                closeSidebar();
              }}
            >
              {OPD ? (
                <Switch>
                  <Route
                    path={ROUTES_CONSTANTS.DASHBOARD}
                    component={Dashboard}
                  />
                  {checkEitherRWRO('Patient360') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.SEARCH_PATIENTS}
                      component={Searchpatient}
                    />
                  )}
                  {checkEitherRWRO('RegistrationDetail') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.CREATE_PATIENTS}
                      component={PatientRegistration}
                    />
                  )}

                  {checkEitherRWRO('Appointment') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.MY_APPOINTMENTS}
                      component={Appointment}
                    />
                  )}
                  {checkEitherRWRO('Appointment') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.APPOINTMENT_REPORTS}
                      component={AppointmentReport}
                    />
                  )}
                  {checkEitherRWRO('Appointment') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.REFERRAL_REPORTS}
                      component={ReferralReport}
                    />
                  )}
                  {checkEitherRWRO('Appointment') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.CREATE_APPOINTMENTS}
                      component={BookAppointment}
                    />
                  )}
                  {checkEitherRWRO('AppointmentSummary') && (
                    <Route
                      exact
                      path={`${ROUTES_CONSTANTS.APPOINTMENT_SUMMARY
                        }/:patientId/:appointmentId`}
                      component={AppointmentSummary}
                    />
                  )}
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.CREATE_APPOINTMENTS}
                    component={AppointmentForm}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.VIDEO_CONSULTATION}
                    component={VideoConsultation}
                  />
                  {checkEitherRWRO('Appointment') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.ALL_APPOINTMENTS}
                      component={AllAppointment}
                    />
                  )}

                  {checkEitherRWRO('Patient360') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.PATIENT_EVERYTHING}
                      component={Patient360}
                    />
                  )}

                  <Route
                    exact
                    path={ROUTES_CONSTANTS.EPISODE_OF_CARE}
                    component={EpisodeOfCare}
                  />

                  {checkEitherRWRO('Billing') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.BILLING}
                      component={Billing}
                    />
                  )}
                  {checkEitherRO('Billing') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.GENERATE_BILLING}
                      component={GenerateBill}
                    />
                  )}
                  {checkEitherRO('Billing') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.REPORTS}
                      component={BillReport}
                    />
                  )}
                  {/* Day Care Routes */}
                  <Route exact path="/daycare" component={DayCare} />


                  {/*  ----------  TreatmentPlanner Routes -----------*/}
                  {checkEitherRWRO('TreatmentPlanner') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.TREATMENT_PLAN}
                      component={TreatmentPlanContainer}
                    />
                  )}
                  {checkEitherRWRO('TreatmentPlanner') && (
                    <Route
                      exact
                      path={ROUTES_CONSTANTS.TREATMENT_PLAN_CREATE}
                      component={CreateTreatmentPlan}
                    />
                  )}
                  <Route exact path="/cross-referal" component={ErrorPage} />
                  <Route exact path="/survivorship-care" component={Graph} />
                  <Route exact path="/helpdesk" component={Helpdesk} />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.NOTIFICATION}
                    component={Notification}
                  />
                  <Redirect exact from="/" to={ROUTES_CONSTANTS.DASHBOARD} />
                  {/*Administration Profile */}
                  {currentEnvironment == 'DEV' && (
                    <>
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_PROFILE}
                        component={DashBoard}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE}
                        component={Configurations}
                      />

                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_ADD_NEW_SLOT
                        }
                        component={AddNewSlot}
                      />
                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_EDIT_SLOT
                        }
                        component={EditExisitingSlot}
                      />
                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_ADD_BLOCK_CALENDER
                        }
                        component={AddNewBlockCalender}
                      />
                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_EDIT_BLOCK_CALENDER
                        }
                        component={EditExistingBlockCalender}
                      />
                      {/*Administration Profile end*/}

                      {/* Hospital */}
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL}
                        component={Hospital}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_HOSPITALS}
                        component={AllHospital}
                      />

                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_CREATE}
                        component={HospitalAdd}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_EDIT}
                        component={HospitalEdit}
                      />

                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE}
                        component={ChooseLicense}
                      />

                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_EDIT
                        }
                        component={CustomizeLicense}
                      />

                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_MANAGE
                        }
                        component={ManagedLicense}
                      />

                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_HISTORY
                        }
                        component={LicenseHistoryPage}
                      />
                      {/* Hospital end*/}

                      {/* Doctors */}
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_DOCTORS}
                        component={AllDoctors}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_DOCTOR_CREATE}
                        component={CreateDoctor}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_DOCTOR_EDIT}
                        component={EditDoctor}
                      />
                      {/* Doctors end*/}

                      {/* Staff */}
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_STAFF}
                        component={AllStaff}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_STAFF_CREATE}
                        component={CreateStaff}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_STAFF_EDIT}
                        component={EditStaff}
                      />
                      {/* Staff end*/}

                      {/* Reference link */}
                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_ADD_REFERENCE_LINK
                        }
                        component={AddRefLink}
                      />
                      <Route
                        exact
                        path={
                          ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_EDIT_REFERENCE_LINK
                        }
                        component={EditRefLink}
                      />
                      {/* Reference link end*/}

                      {/* Location */}

                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_LOCATION_CREATE}
                        component={CreateLocation}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_LOCATION_EDIT}
                        component={EditLocation}
                      />
                      {/* Location end*/}

                      {/* Lab Master */}
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_LAB_MASTER}
                        component={LabMaster}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_LAB_MASTER_EDIT}
                        component={LabMasterEdit}
                      />
                      <Route
                        exact
                        path={ROUTES_CONSTANTS.ADMINISTRATION_LAB_MASTER_UPLOAD}
                        component={LabMasterUpload}
                      />
                    </>
                  )}

                  {/* Lab Master end*/}

                  <Redirect to="/access-denied" />
                </Switch>
              ) : (
                <Switch>
                  <Route
                    path={ROUTES_CONSTANTS.DASHBOARD}
                    component={Dashboard}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.SEARCH_PATIENTS}
                    component={Searchpatient}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.CREATE_PATIENTS}
                    component={PatientRegistration}
                  />

                  <Route
                    exact
                    path={ROUTES_CONSTANTS.MY_APPOINTMENTS}
                    component={Appointment}
                  />

                  <Route
                    exact
                    path={ROUTES_CONSTANTS.APPOINTMENT_REPORTS}
                    component={AppointmentReport}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.REFERRAL_REPORTS}
                    component={ReferralReport}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.CREATE_APPOINTMENTS}
                    component={BookAppointment}
                  />
                  <Route
                    exact
                    path={`${ROUTES_CONSTANTS.APPOINTMENT_SUMMARY
                      }/:patientId/:appointmentId`}
                    component={AppointmentSummary}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.ALL_APPOINTMENTS}
                    component={AllAppointment}
                  />

                  <Route
                    exact
                    path={ROUTES_CONSTANTS.PATIENT_EVERYTHING}
                    component={Patient360}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.EPISODE_OF_CARE}
                    component={EpisodeOfCare}
                  />

                  <Route
                    exact
                    path={ROUTES_CONSTANTS.BILLING}
                    component={Billing}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.GENERATE_BILLING}
                    component={GenerateBill}
                  />
                  <Route
                    exact
                    path={ROUTES_CONSTANTS.REPORTS}
                    component={BillReport}
                  />

                  <Route
                    exact
                    path={ROUTES_CONSTANTS.NOTIFICATION}
                    component={Notification}
                  />

                  <Route exact path="/helpdesk" component={Helpdesk} />
                  <Redirect exact from="/" to={ROUTES_CONSTANTS.DASHBOARD} />
                  <Redirect to="/404" />
                </Switch>
              )}

              <Button
                variant="contained"
                size="large"
                className={classes.scrollTop}
                style={{
                  display: showScroll ? 'block' : 'none',
                  borderRadius: '50px',
                  color: '#fff',
                  fontWeight: 'bold',
                  outline: 'none',
                  border: '1px solid transparent',
                }}
                onClick={scrollTop}
              >
                Scroll To Top
              </Button>
            </div>
            {/* {props.isRefreshing && <Loader />} */}
          </Fragment>
        );
      }
    } else {
      props.doLogout();
    }
  } else {
    routes = (
      <Fragment>
        <TitleComponent title={props.location && props.location.pathname} />

        <Switch>
          <Route exact path="/helpdesk" component={Helpdesk} />
          <Route path="/" component={Auth} />
          <Route path="/sessionexpired" component={SessionExpired} />
        </Switch>
      </Fragment>
    );
  }
  return routes;
}

const mapStateToProps = state => state.globalNew;

export function mapDispatchToProps(dispatch) {
  return {
    doLogout: () => dispatch(doLogout()),
    loginSuccess: data => dispatch(actionsConfig.loginSuccess(data)),

    updateGlobelByKeyVal: data =>
      dispatch(actionsConfig.updateGlobelByKeyVal(data)),

    // refreshToken: () => dispatch(actions.refreshToken()),
    // getAccess: data => dispatch(actions.getAccess(data)),
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
)(App);
