import React, { useState, useRef, memo, useEffect } from 'react';
import {
  withStyles,
  alpha,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from '../reducer';
import saga from '../saga';
import * as actions from '../actions';
import {
  makeLoadPatientEverythingFail,
  makeLoadPatientEverything,
  makeLoad,
  makeLoadTimelineSuccess,
  makeLoadTimelineFail,
  makeLoadPatientVital,
  makeLoadPatientVitalFail,
  makeLoadCriticalEvents,
  makeLoadCriticalEventsFail,
} from '../selectors';
import CustomSVG from '../../../icons/CustomSVG';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { ClassSharp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StarIcon from '@material-ui/icons/Star';
// import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
// import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
// import { orange, pink, green } from "@material-ui/core/colors";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from "@material-ui/core/TableHead";
import TableRow from '@material-ui/core/TableRow';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DraftsIcon from '@material-ui/icons/Drafts';

// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import Search from '../../layouts/Search/Search';
// import Thermometer from 'react-thermometer-chart';
// import Thermometer from 'react-thermometer-component'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CastIcon from '@material-ui/icons/Cast';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import BallotIcon from '@material-ui/icons/Ballot';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import moment from 'moment';
import {
  API_DATE_FORMAT,
  DATE_FORMAT,
  NO_RECORD,
} from '../../../utils/constants';
// import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
// import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
// import DetailsIcon from '@material-ui/icons/Details';
// import HeightIcon from '@material-ui/icons/Height';
// import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Graph from './graph';
// import Ohif from './Ohif';
// import AccordianPanel from './accordianPanel';
import { Snackbar, SnackbarContent, useMediaQuery } from '@material-ui/core';
// import Loader from '../../../components/elements/Loader';
import { Patient360Scrren } from '../../skeleton';
// import Profile from './userProfile';
import RecordedOutcomes from './Table';
import Secondary from './SecondaryTable';
import Combridtable from './CombridTable';
import RadiationTable from './radiationTable';
import SuricalProcedureTable from './suricalProcedureTable';
import Surgical from './surgicalTable';
import OpdTable from './OpdTable';
import Medication from './medication';

import MedicationRequestTable from './medicationRequestTable';
import General from './general';
import GeneralProcedure from './generalProcedureTable';
import ObservationTable from './generalObservationTable';
import NonCancerSpecValue from './nonCancerSpecificValue';
import Compliance from './clinicalCompilance';
import Examinations from './examinations';
import MedicationStatment from './pprtMedicationStatment';
import ChemoMedicationStatment from './chemoMedicationStatment';
import ImmunoMedicationStatment from './immunoMedicationStatment';

import CancerSpecValue from './cancerSpecificObs';
import CancerDocumentRef from './cancerDocumentRef';
import CaseSummary from './caseSummary';
import TnmTable from './tnmTable.jsx';
import CarePlan from './carePlanTable';
import DiagnosticTable from './diagnosticTable';
import Modal from './Modal';
import TimelineModal from './timelineModal';
import {
  getFromLocalStorage,
  deleteKeyFromLocalStorage,
} from '../../../utils/localStorageUtils';
import timeline from '../../../images/timeline.svg';
import careplan from '../../../images/careplan.svg';
import genome from '../../../images/genome.svg';
import report from '../../../images/report.svg';
import ErrorBoundary from '../../../utils/errorBoundry';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RelatedCases from './RelatedCasesGrid';
// import CustomTab from "./customeTabs";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import UserProfile from './userProfileold_1';
import DynamicCard from './dynamicCard';
// import RelatedNew from './relatedCases1';
import Hidden from '@material-ui/core/Hidden';
import RecommendationCard from './Recommendation';
import BodySiteTable from './bodySiteTable';

//left side
import ComorbidTable from './ComorbidTable';
import AllergieTable from './AllergiesTable';
import ImmunizationTable from './ImmuizationTable';
import FamilyTable from './familyTable';
import SmokingTable from './smokingTable';
import HOPI from './HOPI';
import PastHospitalization from './PastHospitalization';
import ObsGynecHistoryTable from './ObsGynecHistory';

// const PastHospitalization = React.lazy(() => import('./PastHospitalization'));

//middle side
import SummaryCard from './Summary';
import CancerScores from './header';
import Vitals from './Vitals';
import TumorTable from './Tumormakers';
import PatientReportedTable from './PatientReported';
import CriticalEventTable from './CriticalEvent';

import RightSidebarComponent from './rightSidebar';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiAccordionDetails);

const drawerWidth = '22.2vw';

const useStyles = makeStyles(theme => ({
  container: {
    // paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#F7F6F4',
    // maxHeight:'100%',
    // overflowY:'scroll'
  },
  paper: {
    //padding: theme.spacing(4),
    padding: theme.spacing(5),
    display: 'flex',
    //overflow: "auto",
    flexDirection: 'column',
    background: '#fff',
    height: 600,
  },
  header: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fixedGrid: {
    overflowY: 'scroll',
    height: '100vh',
  },
  tabs: {
    // flexGrow: 1,
    height: 'auto',
    outline: 'none !important',
    borderRadius: 0,
    marginRight: 10,
    color: theme.palette.tabs.primary.color,
    fontWeight: 'normal',
    textTransform: 'capitalize',
    opacity: 1,
  },
  tab: {
    outline: 'none !important',
    boxShadow: 'none !important',
    color: theme.palette.tabs.primary.main,
    fontWeight: 'bold',
  },
  slide: {
    padding: '20px 0px',
    // maxHeight: 400,
    height: 400,
    //height:"auto",
    background: theme.palette.backgroundColor.primary,
  },
  left: {
    width: '100%',
    marginBottom: '20px',
  },
  heading: {
    //fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    fontSize: '18px',
    color: theme.palette.text.black,
  },
  list: {
    width: '100vw',
  },
  fullList: {
    width: 'auto',
  },
  Button: {
    marginBottom: '20px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],

    color: theme.palette.button.common.main,
    background: theme.palette.button.primary.color,
  },
  closeButtonLeft: {
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    width: 40,
    height: 40,
  },

  profile: {
    borderRadius: 0,
    marginBottom: 20,
    background: `url(${'https://picsum.photos/200/200'})`,
  },
  media: {
    height: 70,
    width: 70,
    borderRadius: '100%',
    textAlign: 'center',
  },
  card: {
    textAlign: 'center',
    verticalAlign: 'text-bottom',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    margin: '0px auto',
    textShadow: '2px 2px 4px #000',
    color: theme.palette.card.common,
  },
  papers: {
    padding: theme.spacing(1),
    margin: 'auto',
    borderRadius: 0,
    background: `url(${'https://picsum.photos/200/200'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  inner: {
    position: 'relative',
    display: 'flex',
    width: '100% !important',
    height: '200px !important',
    textAlign: 'center',
    verticalAlign: 'text-bottom',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  List: {
    width: '100%',
    // maxWidth: '36ch',
    padding: 0,
    margin: '0 !important',
    // marginBottom:20
  },
  listIem: {
    marginBottom: 20,
    backgroundColor: '#F7F6F4',
  },
  inline: {
    display: 'inline',
  },

  recommendation: {
    // marginBottom:20
  },
  timeline: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  vitals: {
    display: 'block',
    fontWeight: '500',
  },
  vitalIcons: {
    fontSize: 18,
  },
  vitalvalue: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  cardTitle: {
    // textTransform: "uppercase",
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  caption: {
    textAlign: 'center',
    fontSize: 16,
  },
  middleSection: {
    fontWeight: 500,
    fontSize: 15,
  },
  root: {
    margin: '10px',
  },
  leftButtons: {
    textAlign: 'left',
    justifyContent: 'left',
    alignItems: 'left',
    fontWeight: 'bold',
    color: '#000',
  },
  cardButtons: {
    marginBottom: '0px',
    borderRadius: '0px',
    fontWeight: 'bold',
    fontSize: '18px',
    //padding:"16px 10px 15px 35px",
    outline: 'none !important',
    '&:hover $focusHighlight': {
      opacity: 1,
      background: '#F4F4F4',
      cursor: 'pointer',
      // padding:"16px 10px 16px 50px",
      outline: 'none !important',
    },
    // "&:active $focusHighlight": {
    //   opacity: 1,
    //   background:'#F4F4F4',
    //   cursor: "pointer",
    //   padding:"16px 10px 16px 50px",
    //   outline:"none !important",
    // }
  },

  snackBarSuccess: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.utils.success,
  },
  snackBarInfo: {
    backgroundColor: theme.palette.utils.info,
  },
  snackBarError: {
    backgroundColor: theme.palette.utils.error,
  },
  snackBarWarning: {
    backgroundColor: theme.palette.utils.warning,
  },
  actionIcon: {
    margin: theme.spacing(1),
  },
  actionIconInfo: {
    position: 'absolute',
    left: '0px',
    margin: theme.spacing(0, 1, 0, 4),
  },

  table: {
    width: '100%',
    padding: '3px !important',
    fontWeight: 'bold',
    fontSize: '18px',
  },

  tablecontainer: {
    maxHeight: '440px',
  },
  avatar: {
    fontSize: '15px',
    width: '30px',
    height: '30px',
    borderRadius: '0%',
  },
  arrow: {
    width: 30,
    height: 30,
    marginTop: 10,
  },

  //tabs demos
  tabsClass: {
    background: '#fffff',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#373737',
    outline: 'none !important',
    border: '1px solid transparent',
    '&$selected': { background: '#FF3399' },
  },
  outerSlide: {
    padding: '30px 30px',
    // margin: "0px 0px -23px 0px",
    //maxHeight: 500,
    color: '#000',
    //height: 400,
    background: '#F7F6F4',
  },
  // innerSlides: {
  //   padding: 15,
  //   color: "#000",
  //   overFlow:'scroll',
  //   background:"#fff",
  // },

  actionArea: {
    // "&:hover $focusHighlight": {
    //   opacity: 1,
    //   background:'#F4F4F4',
    //   cursor: "pointer"
    // }
    outline: 'none !important',
    padding: '16px 10px 15px 35px',
  },

  accordianSummary: {
    background: '#ffff',
    padding: '0px 10px 0px 45px',
  },
  accordianDetails: {
    background: '#F4F4F4',
    flexDirection: 'column',
    minHeight: 200,
  },

  mainTab: {
    //flexGrow: 1,
    height: 'auto',
    outline: 'none !important',
    borderRadius: 0,
    //marginRight:10,
    color: '#000',
    fontWeight: 'bold',
    // '&$selected': {color:'#FF3399 !important'},
    // '&$active': {color:'#FF3399 !important'}
  },

  active_tabStyle: {
    //flexGrow: 1,
    height: 'auto',
    outline: 'none !important',
    borderRadius: 0,
    //marginRight:10,
    fontWeight: 'bold',
    color: '#FF3399 !important',
  },

  //  shiftTextLeft: {
  //   marginRight: '0px'
  // },
  // shiftTextRight: {
  //   marginRight: 0,
  //   [theme.breakpoints.up('md')]: {
  //     marginRight: drawerWidth,
  //   },
  // },

  shiftTextLeft: {
    marginRight: '0px',
  },
  shiftTextRight: {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
    },
  },

  drawers: {
    flexShrink: 0,
    position: 'relative',
    zIndex: '1',
  },
  drawerPaperStyle: {
    width: drawerWidth,
    marginTop: 60,
    height: '100vh',
    overflowX: 'hidden',
    zIndex: '1',
    padding: '10px',
    background: '#F7F6F4',
  },
  drawerPaper: {
    width: '40vw',
    marginTop: 60,
    height: '100vh',
    background: '#F7F6F4',
    //  marginRight:'30%'
  },
  drawerPaper2: {
    width: '100vw',
    overflowX: 'hidden',
    marginTop: 0,
    height: '100%',
    background: '#F7F6F4',
  },

  hidden: {
    display: 'none',
  },
  visible: {
    display: 'inline-block',
  },
  rootList: {
    width: '100%',
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
  },
  demo: {
    padding: '27px 10px 27px 35px',
  },
  listText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  listTextActive: {
    fontWeight: 'bold',
    color: '#FF3399',
  },
  scroller: {
    flexGrow: '0',
  },
  rootTab: {
    justifyContent: 'start',
    marginLeft: -40,
  },
}));

const themes = createTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: 'transparent !important',
      },
    },
    MuiTab: {
      root: {
        color: '#000',
        '&$selected': {
          backgroundColor: '#fff',
          color: '#ff3399 !important',
          fontWeight: 'bold !important',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#F7F6F4 !important',
        color: '#000',
      },
    },

    drawer: {
      flexShrink: 0,
      position: 'relative',
      zIndex: '1',
    },
  },
});

function Patient360(props) {
  // console.log("Patient360",props)

  const key = 'searchpatient';
  useInjectReducer({
    key,
    reducer,
  });
  useInjectSaga({ key, saga });

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSnackBar, setSnackBar] = useState(false);
  const [errorMessageType, setErrorMessageType] = useState('snackBarInfo');
  const [errorMessage, setErrorMessage] = useState('');
  const [expanded, setExpanded] = React.useState('panel1');

  const [Is360Valid, setIs360Valid] = React.useState(false);
  const [loader, setloader] = React.useState(true);

  // const [page, setPages] = React.useState(0);

  const [pageData, setPageData] = React.useState();
  const [secondaryCondtionData, setsecondaryCondtionData] = React.useState();
  const [radiationData, setradiationData] = React.useState();
  const [surgicalData, setsurgicalData] = React.useState();
  const [encounterData, setEncounterSurgical] = React.useState();
  const [optData, setcancerEncounterOPTs] = React.useState();
  const [medicationData, setMedicationData] = React.useState();
  const [medicationRequestData, setMedicationRequestData] = React.useState();
  const [tumorData, setTumorData] = React.useState();
  const [carePlanData, setCarePlanData] = React.useState();
  const [diagnosticData, setdiagnosticData] = React.useState();
  const [noncancerConditionData, setNonCancerConditionsData] = React.useState();
  const [noncancerProcedureData, setNonCancerProcedureData] = React.useState();
  const [observationData, setObservationData] = React.useState();
  const [
    cancerSpecificobservationData,
    setCancerSpecificObservationData,
  ] = React.useState();
  const [
    nonCancerSpecobservationData,
    setNonCancerSpecificObservationData,
  ] = React.useState();
  const [cancerDocumentData, setCancerDocumentRef] = React.useState();
  const [cancerSummaryData, setCancerSummary] = React.useState();
  const [medicationStatment, setMedicationStatus] = React.useState();
  const [chemomedicationStatment, setChemoMedicationStatus] = React.useState();
  const [immunomedicationStatment, setImunoMedicationStatus] = React.useState();

  const [diseaseStatus, setDiseaseData] = React.useState();

  const [Id, setId] = React.useState();
  const [dignosticObservation, setDignosticObservation] = React.useState();
  const [stageData, setStageData] = React.useState(null);
  const [stageDate, setStageDate] = React.useState('');

  const [headerData, setHeaderData] = React.useState();
  const [getUserResourcId, setUserResourcId] = React.useState(null);

  const [caseSummary, setCaseSummary] = React.useState();
  const [treatmentSummary, setTreatmentSummary] = React.useState();

  const [comorbidData, setcomorbidData] = React.useState();
  const [allergiesData, setAllergiesData] = React.useState();
  const [immunizationData, setImmunizationData] = React.useState();
  const [familyData, setFamilyData] = React.useState();
  const [lifestyleData, setLifestyleData] = React.useState();
  const [hopiData, setHopiData] = React.useState();

  const [obsHistoryData, setobsHistoryData] = React.useState();

  const [complainsData, setcomplainsData] = React.useState();
  const [examinationData, setExamination] = React.useState();

  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // useEffect(() => {
  //   const id = props&&props.location.state.resourceId;
  //     onLoad(id);
  // }, [props.location.state]);

  useEffect(() => {
    // console.log(props)
    // console.log(props.patient360Result)

    // debugger;

    if (
      props.patient360Result.length !== 0 &&
      props.patient360Result.recordCount !== undefined &&
      props.patient360Result.recordCount !== null
    ) {
      setIs360Valid(true);
    }

    let validate360Result = props && props.patient360Result;

    setFamilyData(validate360Result && validate360Result.familyMemberHistories);
    setcomorbidData(validate360Result && validate360Result.comorbidConditions);
    setAllergiesData(
      validate360Result && validate360Result.cancerAllergyIntolerances,
    );
    setLifestyleData(
      validate360Result && validate360Result.lifeStyleIndicators,
    );
    setImmunizationData(
      validate360Result && validate360Result.cancerImmunizations,
    );
    setHopiData(validate360Result && validate360Result.presentIllness);

    setobsHistoryData(validate360Result && validate360Result.oBGYNObservation);

    setCaseSummary(validate360Result && validate360Result.caseSummary);
    setTreatmentSummary(
      validate360Result && validate360Result.treatmentSummary,
    );

    setHeaderData(
      validate360Result && validate360Result.cancerPatientRiskAssessments,
    );
    setPageData(
      validate360Result && validate360Result.cancerPatientReportedSymptoms,
    );
    setsecondaryCondtionData(
      validate360Result && validate360Result.secondaryCancerConditions,
    );
    setradiationData(
      validate360Result && validate360Result.cancerRadiationProcedures,
    );
    setsurgicalData(
      validate360Result && validate360Result.cancerSurgicalProcedures,
    );
    setEncounterSurgical(
      validate360Result && validate360Result.cancerEncounterSurgicals,
    );
    setcancerEncounterOPTs(
      validate360Result && validate360Result.cancerEncounterOPDs,
    );
    setMedicationData(
      validate360Result && validate360Result.cancerMedicationStatements,
    );
    setMedicationRequestData(
      validate360Result && validate360Result.cancerMedicationRequests,
    );
    setTumorData(validate360Result && validate360Result.tumorMarkers);

    setCarePlanData(validate360Result && validate360Result.carePlans);
    setdiagnosticData(
      validate360Result && validate360Result.cancerDiagnosticReports,
    );
    setNonCancerConditionsData(
      validate360Result && validate360Result.nonCancerSpecificConditions,
    );
    setNonCancerProcedureData(
      validate360Result && validate360Result.nonCancerSpecificProcedures,
    );

    setStageData(
      validate360Result &&
        validate360Result.primaryCancerCondition &&
        validate360Result.primaryCancerCondition.stage &&
        validate360Result.primaryCancerCondition.stage[0].summary &&
        validate360Result.primaryCancerCondition.stage[0].summary.display,
    );
    setStageDate(
      validate360Result &&
        validate360Result.primaryCancerCondition &&
        validate360Result.primaryCancerCondition.onset,
    );
    setObservationData(
      validate360Result && validate360Result.nonCancerSpecificObservations,
    );
    setDiseaseData(validate360Result && validate360Result.cancerDiseaseStatus);
    setDignosticObservation(
      validate360Result && validate360Result.observationLabs,
    );
    setCancerSpecificObservationData(
      validate360Result && validate360Result.nonCancerSpecificObservations,
    );
    setNonCancerSpecificObservationData(
      validate360Result &&
        validate360Result.nonCancerSpecificValueCodeableObservations,
    );
    setCancerDocumentRef(
      validate360Result && validate360Result.cancerDocumentReferences,
    );
    setCancerSummary(validate360Result && validate360Result.caseSummaries);
    setcomplainsData(
      validate360Result && validate360Result.clinicalComplainses,
    );
    setExamination(validate360Result && validate360Result);

    setMedicationStatus(
      validate360Result && validate360Result.pRRTMedicationStatements,
    );
    setChemoMedicationStatus(
      validate360Result && validate360Result.chemoMedicationStatements,
    );
    setImunoMedicationStatus(
      validate360Result && validate360Result.immunoMedicationStatements,
    );
    setUserResourcId(validate360Result && validate360Result.patient);
  }, [props.patient360Result]);

  useEffect(() => {
    const id = getFromLocalStorage('resourceId');
    setId(id);
    // deleteKeyFromLocalStorage('resourceId');
    onLoad(id);
  }, [props.location.state]);

  const onLoad = id => {
    new Promise((resolve, reject) => {
      props.loadCriticalEventsData(id, resolve, reject);
    })
      .then(() => {
        const m =
          props && props.criticalEventsSuccess != []
            ? 'Data Loaded Successfully.'
            : 'Data Loaded Successfully.';
      })
      .catch(() => {
        const m =
          props && props.criticalEventsFail
            ? props.criticalEventsFail
            : 'Critical Events Fetch Failed';
        setErrorMessage(m);
        setErrorMessageType('snackBarError');
        setSnackBar(true);
      });

    new Promise((resolve, reject) => {
      props.loadPatientVitalData(id, resolve, reject);
    })
      .then(() => {
        const m =
          props && props.vitalDataSuccess != []
            ? 'Data Loaded Successfully.'
            : 'Data Loaded Successfully.';
      })
      .catch(() => {
        const m =
          props && props.vitalDataFail
            ? props.vitalDataFail
            : 'Vital Fetch Failed';
        setErrorMessage(m);
        setErrorMessageType('snackBarError');
        setSnackBar(true);
      });

    new Promise((resolve, reject) => {
      props.loadPatientEverything(id, resolve, reject);
    })
      .then(() => {
        setloader(false);
        const m =
          props && props.patient360Result != []
            ? 'Data Loaded Successfully.'
            : 'Data Loaded Successfully.';
      })
      .catch(() => {
        const m = props && props.error ? props.error : 'Failed';
        setErrorMessage(m);
        setErrorMessageType('snackBarError');
        setSnackBar(true);
      });

    new Promise((resolve, reject) => {
      props.loadPatientTimelineData(id, resolve, reject);
    })
      .then(() => {
        const m =
          props && props.Timelinedata && props.Timelinedata != []
            ? 'Data Loaded Successfully.'
            : 'Data Loaded Successfully.';
      })
      .catch(() => {
        const m = props && props.TimelineFail ? props.TimelineFail : 'Failed';
        setErrorMessage(m);
        setErrorMessageType('snackBarError');
        setSnackBar(true);
      });
  };

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [value, setValue] = React.useState('1');

  //for CONDITIONS
  const [index, setIndex] = useState(0);
  const [fineIndex, setFineIndex] = useState(index);
  const indicatorRef = useRef(null);
  const getLeft = () => {
    const indicatorDOM = indicatorRef.current;
    if (!indicatorDOM) return {};
    const { clientWidth } = indicatorDOM;
    return { left: fineIndex * clientWidth };
  };
  const onChange = i => {
    setIndex(i);
    setFineIndex(i);
  };

  //for CONDITIONS
  const [cindex, setConditionIndex] = useState(0);
  const [confineIndex, setConditionFineIndex] = useState(cindex);
  const condindicatorRef = useRef(null);
  const getLeftCon = () => {
    const indicatorDOMProc = condindicatorRef.current;
    if (!indicatorDOMProc) return {};
    const { clientWidth } = indicatorDOMProc;
    return { left: fineIndex * clientWidth };
  };
  const onConditionChange = i => {
    setConditionIndex(i);
    setConditionFineIndex(i);
  };

  //for PROCEDURE/TREATMENT
  // const [pindex, setProcedureIndex] = useState(0);
  // const [profineIndex, setProcedureFineIndex] = useState(pindex);
  // const procindicatorRef = useRef(null);
  // const getLeftProc = () => {
  //   const indicatorDOMProc = procindicatorRef.current;
  //   if (!indicatorDOMProc) return {};
  //   const { clientWidth } = indicatorDOMProc;
  //   return { left: fineIndex * clientWidth };
  // };
  // const onProcedureChange = i => {
  //   setProcedureIndex(i);
  //   setProcedureFineIndex(i);
  // };

  //for ENCOUNTERS
  const [eindex, setEncounterIndex] = useState(0);
  const [encounterfineIndex, setEncounterFineIndex] = useState(eindex);
  const encounterindicatorRef = useRef(null);
  const getLeftEnc = () => {
    const indicatorDOMEnc = encounterindicatorRef.current;
    if (!indicatorDOMEnc) return {};
    const { clientWidth } = indicatorDOMEnc;
    return { left: fineIndex * clientWidth };
  };
  const onEncounterChange = i => {
    setEncounterIndex(i);
    setEncounterFineIndex(i);
  };

  //for OBSERVATION/CLINICAL NOTES
  const [oindex, setObservationIndex] = useState(0);
  const [obsfineIndex, setObservationFineIndex] = useState(oindex);
  const obscindicatorRef = useRef(null);

  const getLeftObs = () => {
    const indicatorDOM = obscindicatorRef.current;
    if (!indicatorDOM) return {};
    const { clientWidth } = indicatorDOM;
    return { left: fineIndex * clientWidth };
  };
  const onObservationChange = i => {
    setObservationIndex(i);
    setObservationFineIndex(i);
  };

  //for MEDICATION
  const [mindex, setMedicationIndex] = useState(0);
  const [medicationIndex, setMedicationFineIndex] = useState(mindex);
  const medindicatorRef = useRef(null);
  const getLeftMedc = () => {
    const indicatorDOMProc = medindicatorRef.current;
    if (!indicatorDOMProc) return {};
    const { clientWidth } = indicatorDOMProc;
    return { left: fineIndex * clientWidth };
  };
  const onMedicationChange = i => {
    setMedicationIndex(i);
    setMedicationFineIndex(i);
  };

  //for TNM
  const [tnmindex, setTnmIndex] = useState(0);
  const [tnmIndex, setTnmFineIndex] = useState(tnmindex);
  const tnmindicatorRef = useRef(null);
  const getLeftTnm = () => {
    const indicatorDOMProc = tnmindicatorRef.current;
    if (!indicatorDOMProc) return {};
    const { clientWidth } = indicatorDOMProc;
    return { left: fineIndex * clientWidth };
  };
  const onTnmChange = i => {
    setTnmIndex(i);
    setTnmFineIndex(i);
  };

  const [sidebarShow, setSidebarShow] = React.useState(false);
  const [sidebarShow1, setSidebarShow1] = React.useState(false);
  // console.log(sidebarShow)
  useEffect(() => {
    setSidebarShow1(!sidebarShow1);
  }, [sidebarShow]);

  const [state, setState] = React.useState({
    right: false,
    left: false,
    up: false,
  });

  const [style, setStyle] = useState(false);

  const changeStyle = () => {
    setStyle(!style);
  };

  const [listShow, setList] = React.useState(true);

  const toggleDrawer = (anchor, open, index) => event => {
    setStyle(false);
    // window.scrollTo(0, 0);
    // window.scrollTo(0, '1000vh');
    setState({ ...state, [anchor]: open });

    if (index != 0) {
      setState({ ...state, [anchor]: open, ['right']: false });
    }
    if (index != 1) {
      setState({ ...state, [anchor]: open, ['up']: false });
    }
    if (index != 2) {
      setState({ ...state, [anchor]: open, ['left']: false });
    }
    setSelectedIndex(index);
  };

  const toggleList = () => {
    setList(!listShow);
  };

  const [data, setData] = useState({
    query: false,
  });

  const [recommendation, setRecommendation] = useState([
    {
      fname: 'Jayne',
      age: '10',
      gender: 'female',
    },
    {
      fname: 'Peterson',
      age: '20',
      gender: 'male',
    },
    {
      fname: 'Velazquez',
      age: '20',
      gender: 'male',
    },
  ]);

  const handleSearchChange = value => {
    setData({ ...data, query: value });
  };

  const handleSnackBarClose = () => {
    setSnackBar(false);
  };

  // const item = (anchor) => (
  //   <div
  //     className={clsx(classes.list)}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <h2>Timeline</h2>
  //     <br />
  //   </div>
  // );

  const [vital, setVital] = useState(true);

  const changeVital = () => {
    setVital(!vital);
  };

  const [open, setModalOpen] = useState(false);
  const [timelineOpen, setTimelineModalOpen] = useState(false);

  const [resourceId, setResourceId] = useState(false);
  const [timeLineData, settimeLineData] = useState(false);

  const modalOpen = (value, id) => {
    setResourceId(id);
    setModalOpen(value);
  };

  const timelineModalOpen = (value, id) => {
    setTimelineModalOpen(value);
    settimeLineData(id);
  };

  const search = data.query;
  let filteredData = recommendation;

  // if (search.length > 0) {
  //   filteredData =
  //   recommendation.filter(item => {
  //     return Object.keys(item).some(key =>
  //       item[key].toLowerCase().includes(search.toLowerCase())
  //     );
  //   });
  // }

  const [mainIndex, setMainIndex] = useState(0);
  const handleMainChange = (event, value) => {
    setMainIndex(value);
  };

  const handleMainChangeIndex = index => {
    setMainIndex(index);
  };

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: '18px',
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        fontWeight: 'bold',
      },
    },
  }))(TableRow);

  const [tempDrawer, setTempData] = useState({
    isDrawerOpen: false,
  });

  const toggleDrawerOpenClose = e => {
    e.preventDefault();
    setTempData({
      ...tempDrawer,
      isDrawerOpen: !tempDrawer.isDrawerOpen,
    });
  };

  //   const EncountersData =(<div className={classes.tabs} style={{ width: '100%' }}>
  //      <MuiThemeProvider theme={themes}>
  //   <AppBar
  //     position="static"
  //    // color="default"
  //     className={classes.tab}
  //     style={{ boxShadow: '0 0', maxWidth: '100%' ,background:'#F7F6F4 !important'}}
  //   >
  //     <Tabs
  //       value={eindex}
  //       className={classes.tab}
  //       fullWidth
  //       //indicatorColor="primary"
  //      // textColor="primary"
  //       TabIndicatorProps={{
  //         ref: indicatorRef,
  //         style: {
  //           ...getLeftEnc (),
  //           ...(eindex !== encounterfineIndex  && {
  //             transition: 'none',
  //           }),
  //         },
  //       }}
  //       onChange={(e, val) => onEncounterChange (val)}
  //     >
  //       <Tab className={classes.tabs} label="OPD" />
  //       {/* <Tab className={classes.tabs} label="IPD" />
  //       <Tab className={classes.tabs} label="Surgical" /> */}
  //     </Tabs>
  //   </AppBar>
  //   <SwipeableViews
  //     enableMouseEvents
  //     index={eindex}
  //     onSwitching={(i, type) => {
  //       setEncounterIndex(i);
  //       if (type === 'end') {
  //         onEncounterChange (i);
  //       }
  //     }}
  //   >
  //     <div className={classes.slide}>
  //         <ErrorBoundary>
  //           {optData && optData.length > 0 ?
  //             <OpdTable Data={optData} Id={getUserResourcId} scrren="radiation" />
  //             : NO_RECORD}
  //         </ErrorBoundary>
  //     </div>
  //     <div className={classes.slide}>
  //     IPD
  //     </div>
  //     <div className={classes.slide}>
  //         <ErrorBoundary>
  //           {encounterData && encounterData.length > 0 ?
  //             <Surgical Data={encounterData} scrren="radiation" />
  //             : NO_RECORD}
  //         </ErrorBoundary>

  //     </div>
  //   </SwipeableViews>
  //   </MuiThemeProvider>
  // </div>);

  const EncountersData = (
    <div className={classes.slide}>
      <ErrorBoundary>
        {optData && optData.length > 0 ? (
          <OpdTable Data={optData} Id={getUserResourcId} scrren="radiation" />
        ) : (
          NO_RECORD
        )}
      </ErrorBoundary>
    </div>
  );

  const ConditionsData = (
    <div style={{ width: '100%' }}>
      <MuiThemeProvider theme={themes}>
        <AppBar
          position="static"
          // color="transparent"
          className={classes.tab}
          style={{
            boxShadow: '0 0',
            maxWidth: '100%',
            background: '#F7F6F4 !important',
          }}
        >
          <Tabs
            value={cindex}
            className={classes.tab}
            //fullWidth
            // indicatorColor="primary"
            textColor="primary"
            TabIndicatorProps={{
              ref: indicatorRef,
              style: {
                ...getLeftCon(),
                ...(cindex !== confineIndex && {
                  transition: 'none',
                }),
              },
            }}
            onChange={(e, val) => onConditionChange(val)}
          >
            <Tab className={classes.tabs} label="Primary" />
            <Tab className={classes.tabs} label="Secondary" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          enableMouseEvents
          index={cindex}
          onSwitching={(i, type) => {
            setConditionFineIndex(i);
            if (type === 'end') {
              onConditionChange(i);
            }
          }}
        >
          <div className={classes.slide}>
            <BodySiteTable
              data={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props.patient360Result.primaryCancerCondition
                    : '-'
                  : '-'
              }
              Id={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props.patient360Result.primaryCancerCondition.resourceId
                    : '-'
                  : '-'
              }
              bodySite={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props &&
                      props.patient360Result &&
                      props.patient360Result.primaryCancerCondition
                        .bodySideWithLaterality != []
                      ? props &&
                        props.patient360Result &&
                        props.patient360Result.primaryCancerCondition
                          .bodySideWithLaterality != [] &&
                        props.patient360Result.primaryCancerCondition
                          .bodySideWithLaterality
                      : '-'
                    : '-'
                  : '-'
              }
              laterality={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props &&
                      props.patient360Result &&
                      props.patient360Result.primaryCancerCondition
                        .bodySideWithLaterality != []
                      ? props &&
                        props.patient360Result &&
                        props.patient360Result.primaryCancerCondition
                          .bodySideWithLaterality != [] &&
                        props.patient360Result.primaryCancerCondition
                          .bodySideWithLaterality
                      : '-'
                    : '-'
                  : '-'
              }
              verification={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props &&
                      props.patient360Result &&
                      props.patient360Result.primaryCancerCondition
                        .verificationStatus != null
                      ? props &&
                        props.patient360Result &&
                        props.patient360Result.primaryCancerCondition
                          .verificationStatus.display == null
                        ? props &&
                          props.patient360Result &&
                          props.patient360Result.primaryCancerCondition
                            .verificationStatus.code
                        : props &&
                          props.patient360Result &&
                          props.patient360Result.primaryCancerCondition
                            .verificationStatus
                      : '-'
                    : '-'
                  : '-'
              }
              status={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props &&
                      props.patient360Result &&
                      props.patient360Result.primaryCancerCondition
                        .clinicalStatus != null
                      ? props &&
                        props.patient360Result &&
                        props.patient360Result.primaryCancerCondition
                          .clinicalStatus.display == null
                        ? props.patient360Result &&
                          props.patient360Result.primaryCancerCondition
                            .clinicalStatus.code
                        : props.patient360Result &&
                          props.patient360Result.primaryCancerCondition
                            .clinicalStatus
                      : '-'
                    : '-'
                  : '-'
              }
              onset={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props &&
                      props.patient360Result &&
                      props.patient360Result.primaryCancerCondition.onset !=
                        null
                      ? props &&
                        props.patient360Result &&
                        props.patient360Result.primaryCancerCondition.onset
                      : '-'
                    : '-'
                  : '-'
              }
              code={
                props && props.patient360Result != []
                  ? props &&
                    props.patient360Result &&
                    props.patient360Result.primaryCancerCondition != null
                    ? props &&
                      props.patient360Result &&
                      props.patient360Result.primaryCancerCondition.code != null
                      ? props &&
                        props.patient360Result &&
                        props.patient360Result.primaryCancerCondition.code
                      : '-'
                    : '-'
                  : '-'
              }
            />
          </div>
          <div className={classes.slide}>
            <ErrorBoundary>
              {/* {secondaryCondtionData && secondaryCondtionData.length > 0 ? */}
              {props && props.patient360Result != [] ? (
                <Secondary
                  Data={secondaryCondtionData}
                  scrren="secondary"
                  Id={getUserResourcId}
                />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    </div>
  );

  const MedicationData = (
    <div className={classes.tabs} style={{ width: '100%' }}>
      <MuiThemeProvider theme={themes}>
        <AppBar
          position="static"
          //color="default"
          className={classes.tab}
          style={{
            boxShadow: '0 0',
            maxWidth: '100%',
            background: '#F7F6F4 !important',
          }}
        >
          <Tabs
            value={mindex}
            className={classes.tab}
            fullWidth
            //indicatorColor="primary"
            //textColor="primary"
            TabIndicatorProps={{
              ref: indicatorRef,
              style: {
                ...getLeftMedc(),
                ...(mindex !== medicationIndex && {
                  transition: 'none',
                }),
              },
            }}
            onChange={(e, val) => onMedicationChange(val)}
          >
            <Tab className={classes.tabs} label="Medication Request" />
            <Tab className={classes.tabs} label="Medication Statement" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          enableMouseEvents
          index={mindex}
          onSwitching={(i, type) => {
            setMedicationFineIndex(i);
            if (type === 'end') {
              onMedicationChange(i);
            }
          }}
        >
          <div className={classes.slide}>
            <ErrorBoundary>
              {medicationRequestData && medicationRequestData.length > 0 ? (
                <MedicationRequestTable
                  Data={medicationRequestData}
                  scrren="radiation"
                />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>
          <div className={classes.slide}>
            <ErrorBoundary>
              {medicationData && medicationData.length > 0 ? (
                <Medication Data={medicationData} />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    </div>
  );

  const ClinicalNotesData = (
    <div className={classes.tabs} style={{ width: '100%' }}>
      <MuiThemeProvider theme={themes}>
        <AppBar
          position="static"
          // color="default"
          className={classes.tab}
          style={{
            boxShadow: '0 0',
            maxWidth: '100%',
            background: '#F7F6F4 !important',
          }}
        >
          <Tabs
            value={oindex}
            className={classes.tab}
            fullWidth
            // indicatorColor="primary"
            //textColor="primary"
            TabIndicatorProps={{
              ref: indicatorRef,
              style: {
                ...getLeftObs(),
                ...(oindex !== obsfineIndex && {
                  transition: 'none',
                }),
              },
            }}
            onChange={(e, val) => onObservationChange(val)}
          >
            <Tab className={classes.tabs} label="Clinical Complaint" />
            <Tab className={classes.tabs} label="Examinations" />
            <Tab className={classes.tabs} label="General" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          enableMouseEvents
          index={oindex}
          onSwitching={(i, type) => {
            setObservationFineIndex(i);
            if (type === 'end') {
              onObservationChange(i);
            }
          }}
        >
          <div className={classes.slide}>
            <ErrorBoundary>
              {complainsData && complainsData.length > 0 ? (
                <Compliance Data={complainsData} scrren="radiation" />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>

          <div className={classes.slide}>
            <ErrorBoundary>
              {Is360Valid ? (
                <Examinations Data={examinationData} scrren="radiation" />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>

          <div className={classes.slide}>
            <ErrorBoundary>
              {props && props.patient360Result != [] ? (
                <General
                  Data={noncancerConditionData}
                  scrren="radiation"
                  Id={getUserResourcId}
                />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    </div>
  );

  const TNMData = (
    <div className={classes.tabs} style={{ width: '100%' }}>
      <MuiThemeProvider theme={themes}>
        <AppBar
          position="static"
          // color="default"
          className={classes.tab}
          style={{
            boxShadow: '0 0',
            maxWidth: '100%',
            background: '#F7F6F4 !important',
          }}
        >
          <Tabs
            value={tnmindex}
            className={classes.tab}
            fullWidth
            // indicatorColor="primary"
            //textColor="primary"
            TabIndicatorProps={{
              ref: indicatorRef,
              style: {
                ...getLeftTnm(),
                ...(tnmindex !== setTnmFineIndex && {
                  transition: 'none',
                }),
              },
            }}
            onChange={(e, val) => onTnmChange(val)}
          >
            <Tab className={classes.tabs} label="TNM" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          enableMouseEvents
          index={tnmindex}
          onSwitching={(i, type) => {
            setTnmFineIndex(i);
            if (type === 'end') {
              onTnmChange(i);
            }
          }}
        >
          <div className={classes.slide}>
            <ErrorBoundary>
              {props &&
              props &&
              props.patient360Result &&
              props.patient360Result != [] ? (
                <TnmTable
                  Data={props && props.patient360Result}
                  scrren="radiation"
                />
              ) : (
                NO_RECORD
              )}
            </ErrorBoundary>
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    </div>
  );

  // const TreatmentData=(<div className={classes.tabs} style={{ width: '100%' }}>
  //   <MuiThemeProvider theme={themes}>
  // <AppBar
  //   position="static"
  //   //color="default"
  //   className={classes.tab}
  //   style={{ boxShadow: '0 0', maxWidth: '100%', background:'#F7F6F4 !important' }}
  // >
  //   <Tabs
  //     value={pindex}
  //     className={classes.tab}
  //     fullWidth
  //     //indicatorColor="primary"
  //     //textColor="primary"
  //     TabIndicatorProps={{
  //       ref: indicatorRef,
  //       style: {
  //         ...getLeftProc(),
  //         ...(pindex !== profineIndex && {
  //           transition: 'none',
  //         }),
  //       },
  //     }}
  //     onChange={(e, val) => onProcedureChange(val)}
  //   >

  //     <Tab className={classes.tabs} label="Surgical" />
  //     <Tab className={classes.tabs} label="Radiation" />
  //     <Tab className={classes.tabs} label="PPRT" />
  //     <Tab className={classes.tabs} label="CHEMO" />
  //     <Tab className={classes.tabs} label="IMMUNO" />
  //     <Tab className={classes.tabs} label="General" />

  //   </Tabs>
  // </AppBar>
  // <SwipeableViews
  //   enableMouseEvents
  //   index={pindex}
  //   onSwitching={(i, type) => {
  //     setProcedureFineIndex(i);
  //     if (type === 'end') {
  //       onProcedureChange(i);
  //     }
  //   }}
  // >
  //   <div className={classes.slide}>
  //       <ErrorBoundary>
  //       {props && props.patient360Result!=[]?
  //           <SuricalProcedureTable Data={surgicalData} scrren="surgical" Id={getUserResourcId}  />
  //           : NO_RECORD}
  //       </ErrorBoundary>
  //   </div>
  //   <div className={classes.slide}>
  //       <ErrorBoundary>
  //       {props && props.patient360Result!=[]?
  //           <RadiationTable Data={radiationData} scrren="radiation" Id={getUserResourcId} />
  //           : NO_RECORD}
  //       </ErrorBoundary>
  //   </div>
  //   <div className={classes.slide}>
  //       <ErrorBoundary>
  //       {props && props.patient360Result!=[]?
  //           <GeneralProcedure Data={noncancerProcedureData} scrren="radiation" />
  //           : NO_RECORD}
  //       </ErrorBoundary>

  //   </div>
  //   <div className={classes.slide}>
  //       <ErrorBoundary>
  //         {chemomedicationStatment && chemomedicationStatment.length > 0 ?
  //           <ChemoMedicationStatment Data={chemomedicationStatment} scrren="radiation" />
  //           : NO_RECORD}
  //       </ErrorBoundary>

  //   </div>
  //   <div className={classes.slide}>
  //       <ErrorBoundary>
  //         {immunomedicationStatment && immunomedicationStatment.length > 0 ?
  //           <ImmunoMedicationStatment Data={immunomedicationStatment} scrren="radiation" />
  //           : NO_RECORD}
  //       </ErrorBoundary>

  //   </div>
  //   <div className={classes.slide}>
  //       <ErrorBoundary>
  //         {medicationStatment && medicationStatment.length > 0 ?
  //           <MedicationStatment Data={medicationStatment} scrren="radiation" />
  //           : NO_RECORD}
  //       </ErrorBoundary>

  //   </div>
  // </SwipeableViews>
  // </MuiThemeProvider>
  // </div>);

  // const RecordedOutcomesData=(
  //   <div className={classes.slide}>
  //   <ErrorBoundary>
  //  { pageData && pageData.length>0 ?
  //   <RecordedOutcomes Data={pageData}/>
  //   : NO_RECORD}
  //    </ErrorBoundary>
  //    </div>
  // );

  // const careData =(
  //   <div className={classes.slide}>
  //   <ErrorBoundary>
  //     {carePlanData && carePlanData.length > 0 ?
  //       <CarePlan Data={carePlanData} />
  //       : NO_RECORD}
  //   </ErrorBoundary>
  //   </div>
  // );

  // const Diagnostic =(
  //   <div className={classes.slide}>
  //   <ErrorBoundary>
  //   {diagnosticData && diagnosticData.length>0 ?
  //   <DiagnosticTable Data={diagnosticData} Observation={dignosticObservation}/>
  //   : NO_RECORD}
  //    </ErrorBoundary>
  //    </div>
  // );

  // const PatientReportData=(<div className={classes.tabs} style={{ width: '100%' }}>
  //   <MuiThemeProvider theme={themes}>
  //     <AppBar
  //       position="static"
  //     // color="default"
  //       className={classes.tab}
  //       style={{ boxShadow: '0 0', maxWidth: '100%',  background:'#F7F6F4 !important' }}

  //     >
  //       <Tabs
  //         value={oindex}
  //         className={classes.tab}
  //         fullWidth
  //         TabIndicatorProps={{
  //           ref: indicatorRef,
  //           style: {
  //             ...getLeftObs(),
  //             ...(oindex !== obsfineIndex && {
  //               transition: 'none',
  //             }),
  //           },
  //         }}
  //         onChange={(e, val) => onObservationChange(val)}
  //       >

  //         <Tab className={classes.tabs} label="Document Ref" />
  //         <Tab className={classes.tabs} label="Case Summary" />
  //       </Tabs>
  //     </AppBar>
  //     <SwipeableViews
  //       enableMouseEvents
  //       index={oindex}
  //       onSwitching={(i, type) => {
  //         setObservationFineIndex(i);
  //         if (type === 'end') {
  //           onObservationChange (i);
  //         }
  //       }}
  //     >
  //       <div className={classes.slide}>
  //         <ErrorBoundary>
  //           {cancerDocumentData && cancerDocumentData.length > 0 ?
  //             <CancerDocumentRef Data={cancerDocumentData} scrren="radiation" />
  //             : NO_RECORD}
  //         </ErrorBoundary>

  //       </div>
  //       <div className={classes.slide}>
  //           <ErrorBoundary>
  //               {cancerSummaryData && cancerSummaryData.length > 0 ?
  //               <CaseSummary Data={cancerSummaryData} scrren="radiation" />
  //               : NO_RECORD}
  //           </ErrorBoundary>

  //       </div>

  //     </SwipeableViews>
  //   </MuiThemeProvider>
  // </div>);

  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (event, index, drawer, pos) => {
    setSelectedIndex(index);
    toggleDrawer(drawer, !pos);
  };

  // const lifeStyleindicator=()=>{
  // return <>
  //   <ErrorBoundary>
  //   {/* {lifestyleData && lifestyleData.length > 0 ?
  //     <>
  //       <Typography variant="body2" display="block" gutterBottom className={classes.vitals}>
  //         Smoking Status &nbsp;&nbsp;<span className={classes.vitalvalue}> -
  //             </span>
  //       </Typography>
  //       <SmokingTable Data={lifestyleData} />
  //     </>
  //     :

  //     <Typography variant="body2" display="block" gutterBottom className={classes.vitals}>
  //       Smoking Status &nbsp;&nbsp;<span className={classes.vitalvalue}> - {NO_RECORD}
  //       </span>
  //     </Typography>
  //   } */}

  // {props && props.patient360Result!=[]?
  //     <>
  //       <Typography variant="body2" display="block" gutterBottom className={classes.vitals}>
  //         Smoking Status &nbsp;&nbsp;<span className={classes.vitalvalue}> -
  //             </span>
  //       </Typography>
  //       <SmokingTable Data={lifestyleData} scrren="comorbid" Id={getUserResourcId} />
  //     </>
  //   : NO_RECORD}
  // </ ErrorBoundary>

  // <Typography variant="body2" display="block" gutterBottom className={classes.vitals}>
  //   Obesity Status &nbsp;&nbsp;<span className={classes.vitalvalue}> -</span>
  // </Typography>
  // <Typography variant="body2" display="block" gutterBottom className={classes.vitals}>
  //   Alcohol Status &nbsp;&nbsp;<span className={classes.vitalvalue}> -</span>
  // </Typography>
  // </>
  // };

  const Allergies = () => {
    <ErrorBoundary>
      {/* {props && props.patient360Result && props.patient360Result.cancerAllergyIntolerances != null && props.patient360Result.cancerAllergyIntolerances.length > 0 ?
    props && props.patient360Result && patient360Result.cancerAllergyIntolerances.map((v) => {
      return <>
        <div style={{ flexDirection: "column" }} onClick={() =>
          modalOpen(true, props && Id)
        }>
          <Typography variant="body2" display="block" gutterBottom className={classes.vitals}>
            {v.reaction.map((reactions) => {
              return reactions.manifestation.map((manifestation) => <p>{manifestation.display}</p>)
            })}
          </Typography>
        </div>
      </>
    }) : NO_RECORD} */}

      {props && props.patient360Result != [] ? (
        <Allergies
          Data={allergiesData}
          scrren="comorbid"
          Id={getUserResourcId}
        />
      ) : (
        NO_RECORD
      )}
    </ErrorBoundary>;
  };

  const { patient360Result, error, Timelinedata } = props;
  // console.log('TimelineData',props&&props.Timelinedata);
  return (
    <div>
      {Is360Valid && loader == false ? (
        <div maxWidth="xl" className={classes.container}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} className={classes.fixedGrid}>
              {/* <ErrorBoundary>
                  {props && props.patient360Result && patient360Result.patient ?
                    <Profile profile={props && props.patient360Result && patient360Result.patient} Id={props && Id}
                    /> : NO_RECORD}
                </ErrorBoundary> */}

              {/* user profile */}
              <ErrorBoundary>
                {Is360Valid && patient360Result.patient ? (
                  <UserProfile
                    profile={
                      props &&
                      props.patient360Result &&
                      patient360Result.patient
                    }
                    Id={
                      props &&
                      props.patient360Result &&
                      patient360Result.patient.resourceId
                    }
                  />
                ) : (
                  NO_RECORD
                )}
              </ErrorBoundary>

              {/* Left Side Panel */}
              <div className={classes.left}>
                {/* CO-Morbids History */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      Comorbid
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    {/* <Grid item xs container direction="column" spacing={2} onClick={() =>
                        modalOpen(true, props && Id)
                      }> */}
                    <Grid item xs container direction="column" spacing={2}>
                      {Is360Valid ? (
                        <ErrorBoundary>
                          <ComorbidTable
                            Data={comorbidData}
                            Id={getUserResourcId}
                          />
                        </ErrorBoundary>
                      ) : (
                        NO_RECORD
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/*  Allergies */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      Allergies History
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <ErrorBoundary>
                      {Is360Valid ? (
                        <AllergieTable
                          Data={allergiesData}
                          scrren="Allergies"
                          Id={getUserResourcId}
                        />
                      ) : (
                        NO_RECORD
                      )}
                    </ErrorBoundary>
                  </AccordionDetails>
                </Accordion>

                {/*  History of presenting illness */}
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      History of Presenting Illness
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <ErrorBoundary>
                      <HOPI scrren="HOPI" Id={getUserResourcId} />
                    </ErrorBoundary>
                  </AccordionDetails>
                </Accordion>

                {/*  Past Hospitalization */}
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      Past Hospitalization
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <ErrorBoundary>
                      {/* {Is360Valid && pastHospitalizationData.length > 0 ?
                          <PastHospitalization Data={pastHospitalizationData} scrren="Past Hospitalization" Id={getUserResourcId}/>
                        : NO_RECORD} */}
                      <PastHospitalization
                        scrren="Past Hospitalization"
                        Id={getUserResourcId}
                      />
                    </ErrorBoundary>
                  </AccordionDetails>
                </Accordion>

                {/* Immunization */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      Immunization History
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <ErrorBoundary>
                      {Is360Valid ? (
                        <ImmunizationTable
                          Data={immunizationData}
                          Id={getUserResourcId}
                        />
                      ) : (
                        NO_RECORD
                      )}
                    </ErrorBoundary>
                  </AccordionDetails>
                </Accordion>

                {/* Family History */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      Family History
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    {/* <Grid item xs container direction="column" spacing={2} onClick={() =>
                        modalOpen(true, props && Id)
                      }> */}
                    <Grid item xs container direction="column">
                      {Is360Valid ? (
                        <ErrorBoundary>
                          <FamilyTable
                            Data={familyData}
                            Id={getUserResourcId}
                          />
                        </ErrorBoundary>
                      ) : (
                        NO_RECORD
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Lifestyle Indicator */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordianSummary}
                  >
                    <Typography className={classes.heading}>
                      Lifestyle
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <Grid item xs container direction="column">
                      {/* {lifeStyleindicator()} */}

                      {Is360Valid ? (
                        <ErrorBoundary>
                          <SmokingTable
                            Data={lifestyleData}
                            scrren="lifestyle"
                            Id={getUserResourcId}
                          />
                        </ErrorBoundary>
                      ) : (
                        NO_RECORD
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/*  Obs Gynec History */}
                {getUserResourcId && getUserResourcId.gender === 'Female' && (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      className={classes.accordianSummary}
                    >
                      <Typography className={classes.heading}>
                        Obs Gynec History
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordianDetails}>
                      <ErrorBoundary>
                        {Is360Valid ? (
                          <ObsGynecHistoryTable
                            Data={obsHistoryData}
                            scrren="Obs Gynec History"
                            Id={getUserResourcId}
                          />
                        ) : (
                          NO_RECORD
                        )}
                      </ErrorBoundary>
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>
              {/* <ErrorBoundary>
                  {state['right']||state['up']||state['left']?<CancerScores  Data={headerData} 
                  stage={stageData} status={diseaseStatus} 
                  cancerType={props && props.patient360Result.primaryCancerCondition}
                  ecogScore={props && props.patient360Result && patient360Result.eCOGPerformanceStatus}
                  kScore ={props && props.patient360Result && props.patient360Result.karnofskyPerformanceStatus}
                  />:null}
                </ErrorBoundary> */}

              {/* <ErrorBoundary>
                  <RecommendationCard />
                </ErrorBoundary> */}
            </Grid>

            {/* yog 6:8 convert 6:6 */}
            {/* <Grid item xs={12} md={state['right']||state['left']||state['up']?6:6} className={state['right']||state['left']||state['up'] ? classes.shiftTextRight : classes.shiftTextLeft}> */}

            {/* <div className={classes.fixedGrid}> */}
            <Grid item xs={12} md={9}>
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  md={sidebarShow ? 8 : 11}
                  className={classes.fixedGrid}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={sidebarShow ? 6 : 4}>
                      {/* case summary */}
                      <ErrorBoundary>
                        <SummaryCard
                          sidebarShow={sidebarShow1}
                          CaseSummary={caseSummary}
                          TreatmentSummary={treatmentSummary}
                        />
                      </ErrorBoundary>
                    </Grid>

                    {sidebarShow ? (
                      <>
                        <Grid item xs={12} md={6}>
                          {/* // Cancer Scores  */}
                          <ErrorBoundary>
                            <CancerScores
                              stage={stageData}
                              stageDate={stageDate}
                              cancerType={
                                props &&
                                props.patient360Result.primaryCancerCondition
                              }
                              ecogScore={
                                props &&
                                props.patient360Result &&
                                patient360Result.eCOGPerformanceStatus
                              }
                              cgaScore={
                                props &&
                                props.patient360Result &&
                                patient360Result.cancerGeriatricAssessment
                              }
                            />
                          </ErrorBoundary>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {/* //  Tumor Markers  */}
                          <ErrorBoundary>
                            {props && props.patient360Result != [] ? (
                              <TumorTable
                                Data={tumorData}
                                Id={getUserResourcId}
                              />
                            ) : (
                              NO_RECORD
                            )}
                          </ErrorBoundary>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {/* vitals */}
                          <ErrorBoundary>
                            <Vitals
                              temperatureData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.temperatureData
                              }
                              heartRateData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.heartRateData
                              }
                              bloodPressureData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.bloodPressureData
                              }
                              respirationData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.respirationData
                              }
                              weightData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.weightData
                              }
                              oxygenSaturationData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.oxygenSaturationData
                              }
                              glucoseData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.glucoseData
                              }
                              heightData={
                                props &&
                                props.vitalDataSuccess &&
                                props.vitalDataSuccess.heightData
                              }
                            />
                          </ErrorBoundary>
                        </Grid>{' '}
                      </>
                    ) : (
                      <>
                        <Grid item xs={12} md={8}>
                          <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                              {/* // cancer scores  */}
                              <ErrorBoundary>
                                <CancerScores
                                  sidebarShow={sidebarShow1}
                                  stage={stageData}
                                  stageDate={stageDate}
                                  cancerType={
                                    props &&
                                    props.patient360Result
                                      .primaryCancerCondition
                                  }
                                  ecogScore={
                                    props &&
                                    props.patient360Result &&
                                    patient360Result.eCOGPerformanceStatus
                                  }
                                  cgaScore={
                                    props &&
                                    props.patient360Result &&
                                    patient360Result.cancerGeriatricAssessment
                                  }
                                />
                              </ErrorBoundary>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              {/* //  Tumor Makers  */}
                              <ErrorBoundary>
                                {props && props.patient360Result != [] ? (
                                  <TumorTable
                                    Data={tumorData}
                                    Id={getUserResourcId}
                                  />
                                ) : (
                                  NO_RECORD
                                )}
                              </ErrorBoundary>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              {/* vitals */}
                              <ErrorBoundary>
                                <Vitals
                                  temperatureData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.temperatureData
                                  }
                                  heartRateData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.heartRateData
                                  }
                                  bloodPressureData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.bloodPressureData
                                  }
                                  respirationData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.respirationData
                                  }
                                  weightData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.weightData
                                  }
                                  oxygenSaturationData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.oxygenSaturationData
                                  }
                                  glucoseData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.glucoseData
                                  }
                                  heightData={
                                    props &&
                                    props.vitalDataSuccess &&
                                    props.vitalDataSuccess.heightData
                                  }
                                />
                              </ErrorBoundary>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {/* yog */}
                    <Hidden smDown>
                      <Grid item xs={12} md={12} sm={12}>
                        <Paper className={classes.paper}>
                          <div>
                            <Tabs
                              value={mainIndex}
                              classes={{
                                root: classes.rootTab,
                                scroller: classes.scroller,
                              }}
                              //fullWidth
                              onChange={handleMainChange}
                              className={classes.tabsClass}
                              variant={'scrollable'}
                              //scrollButtons={"on"}
                              scrollable={true}
                              scrollButtons="on"
                              TabIndicatorProps={{
                                style: { background: '#FF3399' },
                              }}
                            >
                              <Tab
                                style={{ minWidth: 90 }}
                                className={
                                  mainIndex === 0
                                    ? classes.active_tabStyle
                                    : classes.mainTab
                                }
                                label="Past OPD Visits"
                              />
                              {/* Encounters */}
                              <Tab
                                style={{ minWidth: 90 }}
                                className={
                                  mainIndex === 1
                                    ? classes.active_tabStyle
                                    : classes.mainTab
                                }
                                label="Clinical Notes"
                              />
                              <Tab
                                style={{ minWidth: 100 }}
                                className={
                                  mainIndex === 2
                                    ? classes.active_tabStyle
                                    : classes.mainTab
                                }
                                label="Cancer Conditions"
                              />
                              {/* <Tab style={{ minWidth: 90 }} className= {mainIndex ===3 ? classes.active_tabStyle :classes.mainTab} label="Medication Statement" />
                                <Tab style={{ minWidth: 90 }} className= {mainIndex ===4 ? classes.active_tabStyle :classes.mainTab} label="TNM" /> */}

                              {/* <Tab style={{ minWidth: 90 }} className= {mainIndex ===2 ? classes.active_tabStyle :classes.mainTab}  label="Treatment" /> */}
                              {/* <Tab style={{ minWidth: 90 }} className= {mainIndex ===3 ? classes.active_tabStyle :classes.mainTab}  label="Diagnostic Report" /> */}
                              {/* <Tab style={{ minWidth: 40 }} className= {mainIndex ===5 ? classes.active_tabStyle :classes.mainTab}label="Recorded Outcomes" /> */}
                              {/* <Tab style={{ minWidth: 90 }} className= {mainIndex ===7 ? classes.active_tabStyle :classes.mainTab}  label="Patient Reports" /> */}
                              {/* <Tab style={{ minWidth: 90 }} className= {mainIndex ===8 ? classes.active_tabStyle :classes.mainTab} label="Care Plans" /> */}
                            </Tabs>
                            <SwipeableViews
                              enableMouseEvents
                              index={mainIndex}
                              onChangeIndex={handleMainChangeIndex}
                            >
                              <div className={classes.outerSlide}>
                                {EncountersData}
                              </div>

                              <div className={classes.outerSlide}>
                                {ClinicalNotesData}
                              </div>
                              <div className={classes.outerSlide}>
                                {ConditionsData}
                              </div>

                              {/* <div className={classes.outerSlide}>
                                  {MedicationData}
                                </div> */}
                              {/* <div className={classes.outerSlide}>
                                  {TNMData}
                                </div> */}

                              {/* <div className={classes.outerSlides}>
                                  {TreatmentData}
                                </div>
                                <div className={classes.outerSlides}>
                                  {Diagnostic}
                                </div> */}
                              {/* <div className={classes.outerSlides}>
                                  {RecordedOutcomesData}
                                </div> */}
                              {/* <div className={classes.outerSlides}>
                                  {PatientReportData}
                                </div> */}
                              {/* <div className={classes.outerSlides}>
                                  {careData}
                                </div> */}
                            </SwipeableViews>
                          </div>
                        </Paper>
                      </Grid>
                    </Hidden>

                    <Hidden only={['lg', 'xl', 'md']}>
                      <Grid item xs={12} md={12} sm={12}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.accordianSummary}
                          >
                            <Typography className={classes.heading}>
                              {/* Encounters */}
                              Past OPD Visit
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            className={classes.accordianDetails}
                          >
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              {EncountersData}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.accordianSummary}
                          >
                            <Typography className={classes.heading}>
                              Clinical Notes
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            className={classes.accordianDetails}
                          >
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              {ClinicalNotesData}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.accordianSummary}
                          >
                            <Typography className={classes.heading}>
                              Cancer Conditions
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            className={classes.accordianDetails}
                          >
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              {ConditionsData}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>

                        {/* <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={classes.accordianSummary}
                            >
                              <Typography className={classes.heading}>
                                Medication Statement
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                              <Grid item xs container direction="column" spacing={2}>
                                  {MedicationData}
                              </Grid>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={classes.accordianSummary}
                            >
                              <Typography className={classes.heading}>
                                TNM
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                              <Grid item xs container direction="column" spacing={2}>
                                  {TNMData}
                              </Grid>
                            </AccordionDetails>
                          </Accordion> */}

                        {/* <Accordion >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.accordianSummary}
                              >
                                <Typography className={classes.heading}>
                                  Procedure
                              </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accordianDetails}>
                                <Grid item xs container direction="column" spacing={2}>
                                    {TreatmentData}
                                </Grid>
                              </AccordionDetails>
                          </Accordion> */}

                        {/* <Accordion >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.accordianSummary}
                              >
                                <Typography className={classes.heading}>
                                  Diagnostic Report
                              </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accordianDetails}>
                                <Grid item xs container direction="column" spacing={2}>
                                    {Diagnostic}
                                </Grid>
                              </AccordionDetails>
                          </Accordion> */}

                        {/* <Accordion >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.accordianSummary}
                              >
                                <Typography className={classes.heading}>
                                  Patient Recorded Outcome
                              </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accordianDetails}>
                                <Grid item xs container direction="column" spacing={2}>
                                        {RecordedOutcomesData}
                                </Grid>
                              </AccordionDetails>
                          </Accordion> */}
                        {/* <Accordion >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.accordianSummary}
                              >
                                <Typography className={classes.heading}>
                                  Care Plan
                              </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accordianDetails}>
                                <Grid item xs container direction="column" spacing={2}>
                                  {careData}
                                </Grid>
                              </AccordionDetails>
                          </Accordion> */}
                      </Grid>
                    </Hidden>

                    {/* yog */}
                    <Grid item xs={12} md={sidebarShow ? 12 : 6}>
                      {/* patient reported outcomes */}
                      <ErrorBoundary>
                        <PatientReportedTable />
                      </ErrorBoundary>
                    </Grid>
                    <Grid item xs={12} md={sidebarShow ? 12 : 6}>
                      <ErrorBoundary>
                        {/* <Critical Events /> */}
                        {/* {props && props.patient360Result && patient360Result.patient ?
                              <CriticalEventTable  profile={props && props.patient360Result && patient360Result.patient} Id={props && props.patient360Result && patient360Result.patient.resourceId}
                              /> : NO_RECORD} */}

                        <CriticalEventTable
                          criticalEventsData={
                            props &&
                            props.criticalEventsSuccess
                              .cancerClinicalImpressions
                          }
                        />
                      </ErrorBoundary>
                    </Grid>

                    {/* <Hidden only={['xs']}>       
                        <Grid item xs={12} md={state['right']||state['left']||state['up']?6:4}>
                          <div className={classes.rootList}>
                            <List component="nav" aria-label="main mailbox folders">
                              <ListItem
                                className={classes.demo}
                                button
                                selected={selectedIndex === 0}
                                onClick={ toggleDrawer('right', !state.right, 0)}
                              >
                                <ListItemIcon>
                                    <Avatar aria-label="Timeline" className={classes.avatar} src={timeline}>
                                      
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary="Timeline" className={selectedIndex ===0? classes.listTextActive:classes.listText}/>
                                <ListItemSecondaryAction  onClick={ toggleDrawer('right', !state.right, 0)}>
                                  <IconButton edge="end" aria-label="delete">
                                    <ArrowForwardIosIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                              <Divider />
                              <ListItem
                                className={classes.demo}
                                button
                                selected={selectedIndex === 1}
                                onClick={toggleDrawer('up', true, 1)}
                              >
                                <ListItemIcon>
                                    <Avatar aria-label="Clinical Pathways" className={classes.avatar} src={careplan}>
                                      
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText  className={selectedIndex ===1? classes.listTextActive:classes.listText} >
                                    Clinical Pathway
                                </ListItemText>
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete"  onClick={toggleDrawer('up', true, 1)}>
                                    <ArrowForwardIosIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                              <Divider />
                              <ListItem
                                className={classes.demo}
                                button
                                selected={selectedIndex === 2}
                                onClick={toggleDrawer('left', true, 2)}
                              >
                                <ListItemIcon>
                                  <Avatar aria-label="Reports" className={classes.avatar} src={report}>
                                      <LocalMallIcon />
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary="Reports" className={selectedIndex ===2? classes.listTextActive:classes.listText} />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete"   onClick={toggleDrawer('left', true, 2)}>
                                    <ArrowForwardIosIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                              <Divider />
                              <ListItem
                                className={classes.demo}
                                button
                                selected={selectedIndex === 3}
                                onClick={toggleDrawer('right', true, 3)}
                              >
                                <ListItemIcon>
                                    <Avatar aria-label="Genomics" className={classes.avatar} src={genome}>
                                      <StarIcon />
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary="Genomics" className={selectedIndex ===3? classes.listTextActive:classes.listText} />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete"  onClick={toggleDrawer('right', true, 3)}>
                                    <ArrowForwardIosIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </List>
                          </div>
                        </Grid>
                      </Hidden>    */}

                    {/* 
                      <Hidden only={['sm', 'lg', 'xl', 'md']}>
                        <Grid item xs={12} md={12} sm={12}>
                          <Paper className={classes.paper} >
                            <div style={{marginTop:"40px"}}>
                              <Tabs
                                value={mainIndex}
                                classes={{  root: classes.rootTab, scroller: classes.scroller }}
                                //fullWidth
                                onChange={handleMainChange}
                                className={classes.tabsClass}
                                variant={"scrollable"}
                                //scrollButtons={"on"}
                                scrollable={true} scrollButtons="on"
                                TabIndicatorProps={{style: {background:'#FF3399'}}}
                              >
                                <Tab style={{ minWidth: 100 }} className= {mainIndex ===0 ? classes.active_tabStyle :classes.mainTab} label="Timeline"   />
                                <Tab style={{ minWidth: 90 }} className= {mainIndex ===1 ? classes.active_tabStyle :classes.mainTab}  label="Clinical Pathway" />
                                <Tab style={{ minWidth: 90 }} className= {mainIndex ===2 ? classes.active_tabStyle :classes.mainTab}  label="Reports" />
                                <Tab style={{ minWidth: 90 }} className= {mainIndex ===3 ? classes.active_tabStyle :classes.mainTab} label="Genomics" />
                              </Tabs>
                              <SwipeableViews
                                enableMouseEvents
                                index={mainIndex}
                                onChangeIndex={handleMainChangeIndex}
                              >
                                <div className={classes.outerSlide}>
                                  Timeline
                                </div>
                                <div className={classes.outerSlide}>
                                  <Graph />
                                </div>

                                <div className={classes.outerSlide}>
                                  <Graph />
                                </div>
                                <div className={classes.outerSlide}>
                                  <Graph />
                                </div>
                              </SwipeableViews>
                            </div>
                          </Paper>
                        </Grid>
                      </Hidden> */}

                    {/* related cases */}

                    <Grid item xs={12} md={12} sm={12}>
                      <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                          <Typography
                            style={{
                              fontSize: '18px',
                              fontWeight: 'bold',
                              padding: 10,
                              float: 'left',
                            }}
                          >
                            Related Cases
                          </Typography>
                          {/* <Button style={{ float: 'right', fontWeight: "bold", fontSize: "16px" }}>More</Button> */}
                        </Grid>
                      </Grid>
                      <div style={{ clear: 'both' }}> </div>

                      <Grid item container xs={12} sm={12}>
                        {Is360Valid ? (
                          <RelatedCases
                            stage={stageData}
                            cancerType={
                              props &&
                              props.patient360Result.primaryCancerCondition
                            }
                            gender={
                              props &&
                              props.patient360Result &&
                              patient360Result.patient &&
                              patient360Result.patient.gender
                            }
                            resourceId={
                              props &&
                              props.patient360Result &&
                              patient360Result.patient &&
                              patient360Result.patient.resourceId
                            }
                            sidebarShow={sidebarShow}
                          />
                        ) : (
                          ''
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* </div> */}

                <Grid item xs={12} md={sidebarShow ? 4 : 1}>
                  {/* Right Sidebar */}
                  <ErrorBoundary>
                    <RightSidebarComponent
                      TimelineData={Timelinedata}
                      setSidebarShow={setSidebarShow}
                      sidebarShow={sidebarShow}
                    />
                  </ErrorBoundary>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* {open?<Modal click={modalOpen} open={open}  data ={Allergies} title="Allergies" />:''} */}
          {/* {timelineOpen?<TimelineModal click={timelineModalOpen} open={timelineOpen}  data ={timeLineData} />:''} */}
        </div>
      ) : (
        <Patient360Scrren />
      )}

      <Snackbar
        anchorOrigin={{
          vertical: (smDown && 'top') || 'bottom',
          horizontal: 'right',
        }}
        open={isSnackBar}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
        classes={{ root: classes.left }}
      >
        <SnackbarContent
          className={classes[errorMessageType]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {errorMessage}
            </span>
          }
          action={[
            <CustomSVG
              key="action-icon"
              name="precitec_info"
              className={classes.actionIconInfo}
              fill={theme.palette.text.white}
              height="23"
              width="23"
              onClick={handleSnackBarClose}
            />,
            <CustomSVG
              key="action-close"
              name="close"
              className={classes.actionIcon}
              fill={theme.palette.text.white}
              height="14"
              width="14"
              onClick={handleSnackBarClose}
            />,
          ]}
        />
      </Snackbar>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  criticalEventsSuccess: makeLoadCriticalEvents(),
  criticalEventsFail: makeLoadCriticalEventsFail(),

  vitalDataSuccess: makeLoadPatientVital(),
  vitalDataFail: makeLoadPatientVitalFail(),

  patient360Result: makeLoadPatientEverything(),
  error: makeLoadPatientEverythingFail(),
  patient360loader: makeLoad(),
  Timelinedata: makeLoadTimelineSuccess(),
  TimelineFail: makeLoadTimelineFail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadPatientEverything: (id, resolve, reject) =>
      dispatch(actions.loadPatientEverything(id, resolve, reject)),
    loadPatientTimelineData: (id, resolve, reject) =>
      dispatch(actions.loadPatientTimelineData(id, resolve, reject)),
    loadPatientVitalData: (id, resolve, reject) =>
      dispatch(actions.loadPatientVitalData(id, resolve, reject)),
    loadCriticalEventsData: (id, resolve, reject) =>
      dispatch(actions.loadCriticalEventsData(id, resolve, reject)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

Patient360.propTypes = {
  loadPatientEverything: PropTypes.func,
  error: PropTypes.string,
  patient360Result: PropTypes.any,
  // loader: PropTypes.boolean,
  Timelinedata: PropTypes.any,
  TimelineFail: PropTypes.string,
};
export default compose(
  withConnect,
  withRouter,
  memo,
)(Patient360);
