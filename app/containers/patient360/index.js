import { Tab, Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { compose } from 'redux';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from '../../components/accordions';
import { MessageComponent, SemiBoldText } from '../../components';
import { API_DATE_FORMAT, NO_RECORD } from '../../utils/constants';
import ErrorBoundary from '../../utils/errorBoundry';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import { Patient360Scrren } from '../skeleton';
import AllergieTable from './components/AllergiesTable';
import BodySiteTable from './components/bodySiteTable';
import CancerScores from './components/CancerInformation';
import ClinicalComplaintTable from './components/ClinicalComplaintTable';
//left side
import ComorbidTable from './components/ComorbidTable';
import TreatmentTable from './components/components/TreatmentTable';
import CriticalEventTable from './components/CriticalEvent';
import Examinations from './components/examinations';
import FamilyTable from './components/familyTable';
import General from './components/general';
import HOPI from './components/HOPI';
import ImmunizationTable from './components/ImmuizationTable';
import LifestyleTable from './components/LifestyleTable';
import ObsGynecHistoryTable from './components/ObsGynecHistory';
import OpdTable from './components/OpdTable';
import PastHospitalization from './components/PastHospitalization';
import PatientReportedTable from './components/PatientReported';
import RelatedCases from './components/RelatedCasesGrid';
import RightSidebarClose from './components/rightSidebar/RightSidebarClose';
import RightSidebarOpen from './components/rightSidebar/RightSidebarOpen';
//middle side
import SummaryCard from './components/Summary';
import TumorTable from './components/Tumormakers';
import UserProfile from './components/UserProfile';
import Vitals from './components/Vitals';

import { loadPatientVitalData } from '../../apis/globalApis/globalSlice';
import {
  getTreatmentList,
  loadCriticalEventsData,
  loadPatientEverything,
  loadPatientTimelineData,
  loadPatientOutcomesData,
  loadRelatedCasesData,
  usePatient360Slice,
} from '../../apis/patient360Apis/patient360Slice';
import moment from 'moment';
import { SignalCellularNullRounded } from '@material-ui/icons';

const drawerWidth = '360px';
const drawerWidth1 = '320px';
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
    boxShadow: '0px 2px 4px #00000029',
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
    color: '#636262',
    fontWeight: 500,
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
    background: '#f8f8f8',
  },
  left: {
    width: '100%',
    marginBottom: '20px',
  },
  heading: {
    // fontWeight: 'bold',
    // fontSize: '18px',
    // color: theme.palette.text.black,
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
    background: '#F8F8F8',
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
    padding: '0px 10px 0px 20px',
  },
  accordianDetails: {
    background: '#F4F4F4',
    flexDirection: 'column',
    minHeight: 200,
    padding: theme.spacing(3),
  },
  tableaccordianDetails: {
    background: '#F4F4F4',
    flexDirection: 'column',
    minHeight: 200,
    padding: '10px 0px 40px',
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

  shiftTextLeft: {
    // marginRight: 0,
    // marginBottom: 20,
  },
  shiftTextRight: {
    // marginRight: 0,
    // marginBottom: 20,
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: drawerWidth1,
    },
  },

  drawerPaperStyle: {
    width: drawerWidth,
    marginTop: 56,
    // overflowY: 'scroll',
    // zIndex: '1',
    // padding: '15px',
    background: '#F7F6F4',
    // height: '100vh',
    [theme.breakpoints.down('md')]: {
      width: drawerWidth1,
    },
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
      width: drawerWidth1,
    },
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
  //-------------- using thunk ----------------
  usePatient360Slice();
  //-------------- using thunk ----------------

  const classes = useStyles();
  // const [page, setPages] = React.useState(0);

  const [secondaryCondtionData, setsecondaryCondtionData] = React.useState();
  const [optData, setcancerEncounterOPTs] = React.useState();
  const [tumorData, setTumorData] = React.useState();
  const [noncancerConditionData, setNonCancerConditionsData] = React.useState();
  const [stageData, setStageData] = React.useState(null);
  const [stageDate, setStageDate] = React.useState('');
  const [getUserResourcId, setUserResourcId] = React.useState(null);

  const [caseSummary, setCaseSummary] = React.useState();
  const [treatmentSummary, setTreatmentSummary] = React.useState();

  const [comorbidData, setcomorbidData] = React.useState();
  const [allergiesData, setAllergiesData] = React.useState();
  const [immunizationData, setImmunizationData] = React.useState();
  const [familyData, setFamilyData] = React.useState();
  const [lifestyleData, setLifestyleData] = React.useState();

  const [obsHistoryData, setobsHistoryData] = React.useState();

  const [complainsData, setcomplainsData] = React.useState();
  const [examinationData, setExamination] = React.useState();

  const [patient360Result, setPatient360Result] = React.useState(null);
  const [patient360Loader, setPatient360Loader] = React.useState(false);
  const [Is360Valid, setIs360Valid] = React.useState(false);

  const [timelineData, setTimelineData] = React.useState([]);
  const [criticalEventData, setCriticalEventData] = React.useState(null);
  const [vitalData, setVitalData] = React.useState(null);
  const [treatmentList, setTreatmentList] = React.useState([]);

  useEffect(() => {
    if (props && props.patient360) {
      setPatient360Result(props.patient360.patient360Result);
      setPatient360Loader(props.patient360.patient360Loader);
    }
  }, [props && props.patient360]);

  useEffect(() => {
    if (
      patient360Result &&
      patient360Result.recordCount !== undefined &&
      patient360Result.recordCount !== null
    ) {
      setIs360Valid(true);
    }

    let validate360Result = props && patient360Result;

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

    setobsHistoryData(validate360Result && validate360Result.oBGYNObservation);

    setCaseSummary(validate360Result && validate360Result.caseSummary);
    setTreatmentSummary(
      validate360Result && validate360Result.treatmentSummary,
    );

    setsecondaryCondtionData(
      validate360Result && validate360Result.secondaryCancerConditions,
    );

    setcancerEncounterOPTs(
      validate360Result && validate360Result.cancerEncounterOPDs,
    );

    setTumorData(validate360Result && validate360Result.tumorMarkers);

    setNonCancerConditionsData(
      validate360Result && validate360Result.nonCancerSpecificConditions,
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

    setcomplainsData(
      validate360Result && validate360Result.clinicalComplainses,
    );
    setExamination(validate360Result && validate360Result);

    setUserResourcId((validate360Result && validate360Result.patient) || null);
  }, [patient360Result]);

  useEffect(() => {
    const id = getFromLocalStorage('resourceId');
    // deleteKeyFromLocalStorage('resourceId');
    onLoad(id);
  }, [getFromLocalStorage('resourceId')]);

  //-----------------API CALLS ---------------
  const callLoadPatientEverything = async field => {
    const { payload } = await props.loadPatientEverything(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  const callLoadPatientTimelineData = async field => {
    const { payload } = await props.loadPatientTimelineData(field);

    if (payload && payload.data) {
      setTimelineData((payload && payload.data) || []);
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setTimelineData([]);
    }
  };

  const callLoadCriticalEventsData = async field => {
    const { payload } = await props.loadCriticalEventsData(field);

    if (payload && payload.data) {
      setCriticalEventData(payload.data.cancerClinicalImpressions);
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setCriticalEventData(null);
    }
  };

  const callLoadPatientVitalData = async field => {
    const { payload } = await props.loadPatientVitalData(field);

    if (payload && payload.data) {
      setVitalData(payload.data);
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setVitalData(null);
    }
  };

  const callGetTreatmentList = async field => {
    const { payload } = await props.getTreatmentList(field);

    if (payload && payload.data) {
      setTreatmentList(
        payload.data && payload.data.treatmentProtocolPlans
          ? payload.data.treatmentProtocolPlans || []
          : [],
      );
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setTreatmentList([]);
    }
  };

  const callLoadPatientOutcomesData = async field => {
    const { payload } = await props.loadPatientOutcomesData(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  const callLoadRelatedCasesData = async field => {
    const { payload } = await props.loadRelatedCasesData(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  //-----------------API CALLS END---------------

  const onLoad = id => {
    let field = {
      id: id,
    };
    callLoadPatientEverything(field);
    callLoadCriticalEventsData(field);
    callLoadPatientTimelineData(field);
    callLoadPatientVitalData(field);
    callGetTreatmentList(field);

    const fromDate = moment(new Date())
      .subtract(6, 'day')
      .format(API_DATE_FORMAT);
    const toDate = moment(new Date()).format(API_DATE_FORMAT);

    let field1 = {
      id: id,
      fromDate: fromDate,
      toDate: toDate,
    };
    callLoadPatientOutcomesData(field1);
  };

  useEffect(() => {
    // RelatedCases
    let cancerType = null;
    let gender = null;
    let resourceId = null;

    if (patient360Result) {
      cancerType = patient360Result.primaryCancerCondition;
      gender = patient360Result.patient && patient360Result.patient.gender;
      resourceId =
        patient360Result.patient && patient360Result.patient.resourceId;
    }

    if (
      cancerType &&
      cancerType.code &&
      cancerType.code.display &&
      stageData &&
      gender &&
      resourceId
    ) {
      let field = {
        cancerType: cancerType.code.display.split(' ')[0],
        stage: stageData,
        gender: gender,
        resourceId: resourceId,
      };

      callLoadRelatedCasesData(field);
    }
  }, [stageData, patient360Result]);

  const [sidebarShow, setSidebarShow] = React.useState(false);
  const [item, setItem] = useState({});

  const [sidebarShow1, setSidebarShow1] = React.useState(false);
  // console.log(sidebarShow)
  useEffect(() => {
    setSidebarShow1(!sidebarShow1);
  }, [sidebarShow]);

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

  const [mainIndex, setMainIndex] = useState(0);
  const handleMainChange = (event, value) => {
    setMainIndex(value);
  };

  const handleMainChangeIndex = index => {
    setMainIndex(index);
  };

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

  const TreatmeantData = (
    <div className={classes.slide}>
      <ErrorBoundary>
        {treatmentList && treatmentList.length > 0 ? (
          <TreatmentTable
            rows={treatmentList}
            test={optData}
            patientResourceId={getUserResourcId && getUserResourcId.resourceId}
          />
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
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? patient360Result.primaryCancerCondition
                    : '-'
                  : '-'
              }
              Id={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? patient360Result.primaryCancerCondition.resourceId
                    : '-'
                  : '-'
              }
              bodySite={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? props &&
                      patient360Result &&
                      patient360Result.primaryCancerCondition
                        .bodySideWithLaterality != []
                      ? props &&
                        patient360Result &&
                        patient360Result.primaryCancerCondition
                          .bodySideWithLaterality != [] &&
                        patient360Result.primaryCancerCondition
                          .bodySideWithLaterality
                      : '-'
                    : '-'
                  : '-'
              }
              laterality={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? props &&
                      patient360Result &&
                      patient360Result.primaryCancerCondition
                        .bodySideWithLaterality != []
                      ? props &&
                        patient360Result &&
                        patient360Result.primaryCancerCondition
                          .bodySideWithLaterality != [] &&
                        patient360Result.primaryCancerCondition
                          .bodySideWithLaterality
                      : '-'
                    : '-'
                  : '-'
              }
              verification={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? props &&
                      patient360Result &&
                      patient360Result.primaryCancerCondition
                        .verificationStatus != null
                      ? props &&
                        patient360Result &&
                        patient360Result.primaryCancerCondition
                          .verificationStatus.display == null
                        ? props &&
                          patient360Result &&
                          patient360Result.primaryCancerCondition
                            .verificationStatus.code
                        : props &&
                          patient360Result &&
                          patient360Result.primaryCancerCondition
                            .verificationStatus
                      : '-'
                    : '-'
                  : '-'
              }
              status={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? props &&
                      patient360Result &&
                      patient360Result.primaryCancerCondition.clinicalStatus !=
                        null
                      ? props &&
                        patient360Result &&
                        patient360Result.primaryCancerCondition.clinicalStatus
                          .display == null
                        ? patient360Result &&
                          patient360Result.primaryCancerCondition.clinicalStatus
                            .code
                        : patient360Result &&
                          patient360Result.primaryCancerCondition.clinicalStatus
                      : '-'
                    : '-'
                  : '-'
              }
              onset={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? props &&
                      patient360Result &&
                      patient360Result.primaryCancerCondition.onset != null
                      ? props &&
                        patient360Result &&
                        patient360Result.primaryCancerCondition.onset
                      : '-'
                    : '-'
                  : '-'
              }
              code={
                props && patient360Result != []
                  ? props &&
                    patient360Result &&
                    patient360Result.primaryCancerCondition != null
                    ? props &&
                      patient360Result &&
                      patient360Result.primaryCancerCondition.code != null
                      ? props &&
                        patient360Result &&
                        patient360Result.primaryCancerCondition.code
                      : '-'
                    : '-'
                  : '-'
              }
            />
          </div>
          <div className={classes.slide}>
            <ErrorBoundary>
              {/* {props && patient360Result  ? (
                <Secondary
                  Data={secondaryCondtionData}
                  scrren="secondary"
                  Id={getUserResourcId}
                />
              ) : (
                NO_RECORD
              )} */}
              {NO_RECORD}
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
            // fullWidth
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
                <ClinicalComplaintTable
                  Data={complainsData}
                  scrren="radiation"
                />
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
              {props && patient360Result != [] ? (
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

  const Allergies = () => {
    <ErrorBoundary>
      {props && patient360Result != [] ? (
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

  return (
    <div>
      {Is360Valid && patient360Loader == false ? (
        <div className={classes.container}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} className={classes.fixedGrid}>
              {/* user profile */}
              <ErrorBoundary>
                {Is360Valid && patient360Result && patient360Result.patient ? (
                  <UserProfile
                    profile={
                      props && patient360Result && patient360Result.patient
                    }
                    Id={
                      props &&
                      patient360Result &&
                      patient360Result.patient &&
                      patient360Result.patient.resourceId
                    }
                  />
                ) : (
                  NO_RECORD
                )}
              </ErrorBoundary>

              {/* Left Side Panel */}
              <div className={classes.left}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      Comorbid
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.tableaccordianDetails}>
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
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      Allergies History
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.tableaccordianDetails}>
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

                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      History of Presenting Illness
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <ErrorBoundary>
                      <HOPI scrren="HOPI" Id={getUserResourcId} />
                    </ErrorBoundary>
                  </AccordionDetails>
                </Accordion>

                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      Past Hospitalization
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
                    <ErrorBoundary>
                      <PastHospitalization
                        scrren="Past Hospitalization"
                        Id={getUserResourcId}
                      />
                    </ErrorBoundary>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      Immunization History
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.tableaccordianDetails}>
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
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      Family History
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordianDetails}>
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

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordianSummary}
                  >
                    <SemiBoldText variant="h3" className={classes.heading}>
                      Lifestyle
                    </SemiBoldText>
                  </AccordionSummary>
                  <AccordionDetails className={classes.tableaccordianDetails}>
                    <Grid item xs container direction="column">
                      {Is360Valid ? (
                        <ErrorBoundary>
                          <LifestyleTable
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

                {getUserResourcId && getUserResourcId.gender === 'Female' && (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      className={classes.accordianSummary}
                    >
                      <SemiBoldText variant="h3" className={classes.heading}>
                        Obs Gynec History
                      </SemiBoldText>
                    </AccordionSummary>
                    <AccordionDetails className={classes.tableaccordianDetails}>
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
            </Grid>

            {/* Right Side Panel */}
            <Grid item xs={12} md={9}>
              <div
                className={
                  sidebarShow ? classes.shiftTextRight : classes.shiftTextLeft
                }
              >
                <Grid container spacing={4}>
                  <Grid
                    item
                    xs={12}
                    md={!sidebarShow ? 11 : 12}
                    className={classes.fixedGrid}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={sidebarShow ? 6 : 4}>
                        {/* // case summary  */}
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
                            <ErrorBoundary>
                              <CancerScores
                                stage={stageData}
                                stageDate={stageDate}
                                cancerType={
                                  props &&
                                  patient360Result.primaryCancerCondition
                                }
                                ecogScore={
                                  props &&
                                  patient360Result &&
                                  patient360Result.eCOGPerformanceStatus
                                }
                                cgaScore={
                                  props &&
                                  patient360Result &&
                                  patient360Result.cancerGeriatricAssessment
                                }
                              />
                            </ErrorBoundary>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <ErrorBoundary>
                              {props && patient360Result != [] ? (
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
                            <ErrorBoundary>
                              <Vitals
                                temperatureData={
                                  vitalData && vitalData.temperatureData
                                }
                                heartRateData={
                                  vitalData && vitalData.heartRateData
                                }
                                bloodPressureData={
                                  vitalData && vitalData.bloodPressureData
                                }
                                respirationData={
                                  vitalData && vitalData.respirationData
                                }
                                weightData={vitalData && vitalData.weightData}
                                oxygenSaturationData={
                                  vitalData && vitalData.oxygenSaturationData
                                }
                                glucoseData={vitalData && vitalData.glucoseData}
                                heightData={vitalData && vitalData.heightData}
                              />
                            </ErrorBoundary>
                          </Grid>{' '}
                        </>
                      ) : (
                        <>
                          <Grid item xs={12} md={8}>
                            <Grid container spacing={4}>
                              <Grid item xs={12} md={12}>
                                <ErrorBoundary>
                                  <CancerScores
                                    sidebarShow={sidebarShow1}
                                    stage={stageData}
                                    stageDate={stageDate}
                                    cancerType={
                                      props &&
                                      patient360Result.primaryCancerCondition
                                    }
                                    ecogScore={
                                      props &&
                                      patient360Result &&
                                      patient360Result.eCOGPerformanceStatus
                                    }
                                    cgaScore={
                                      props &&
                                      patient360Result &&
                                      patient360Result.cancerGeriatricAssessment
                                    }
                                  />
                                </ErrorBoundary>
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <ErrorBoundary>
                                  {props && patient360Result != [] ? (
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
                                <ErrorBoundary>
                                  <Vitals
                                    temperatureData={
                                      vitalData && vitalData.temperatureData
                                    }
                                    heartRateData={
                                      vitalData && vitalData.heartRateData
                                    }
                                    bloodPressureData={
                                      vitalData && vitalData.bloodPressureData
                                    }
                                    respirationData={
                                      vitalData && vitalData.respirationData
                                    }
                                    weightData={
                                      vitalData && vitalData.weightData
                                    }
                                    oxygenSaturationData={
                                      vitalData &&
                                      vitalData.oxygenSaturationData
                                    }
                                    glucoseData={
                                      vitalData && vitalData.glucoseData
                                    }
                                    heightData={
                                      vitalData && vitalData.heightData
                                    }
                                  />
                                </ErrorBoundary>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}

                      <Hidden smDown>
                        <Grid item sm={12} md={12}>
                          <Paper className={classes.paper} elevation={0}>
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
                                scrollable={'true'}
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
                                {/* // Encounters  */}
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
                                <Tab
                                  style={{ minWidth: 100 }}
                                  className={
                                    mainIndex === 3
                                      ? classes.active_tabStyle
                                      : classes.mainTab
                                  }
                                  label="Chemotherapy Orders"
                                />
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
                                <div className={classes.outerSlide}>
                                  {TreatmeantData}
                                </div>
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

                          {/* Treatment  -start */}
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={classes.accordianSummary}
                            >
                              <Typography className={classes.heading}>
                                chemotherapy orders
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
                                {TreatmeantData}
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                          {/* Treatment  -end */}
                        </Grid>
                      </Hidden>

                      {/* patient reported outcomes */}
                      <Grid item xs={12} md={sidebarShow ? 12 : 6}>
                        <ErrorBoundary>
                          <PatientReportedTable />
                        </ErrorBoundary>
                      </Grid>

                      {/* <Critical Events /> */}
                      <Grid item xs={12} md={sidebarShow ? 12 : 6}>
                        <ErrorBoundary>
                          <CriticalEventTable
                            criticalEventsData={criticalEventData}
                          />
                        </ErrorBoundary>
                      </Grid>

                      {/* related cases */}
                      <Grid item xs={12} md={12} sm={12}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12}>
                            <Typography
                              variant="h3"
                              style={{
                                fontWeight: 500,
                                padding: 10,
                                float: 'left',
                              }}
                            >
                              Related Cases
                            </Typography>
                          </Grid>
                        </Grid>
                        <div style={{ clear: 'both' }}> </div>

                        <Grid item container xs={12} sm={12}>
                          {Is360Valid ? (
                            <RelatedCases sidebarShow={sidebarShow} />
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Right Sidebar */}
                  <Grid item md={1}>
                    {!sidebarShow && (
                      <ErrorBoundary>
                        {' '}
                        <RightSidebarClose
                          TimelineData={timelineData}
                          setSidebarShow={setSidebarShow}
                          setItem={setItem}
                        />{' '}
                      </ErrorBoundary>
                    )}

                    <Drawer
                      BackdropProps={{ open: false, invisible: true }}
                      anchor="right"
                      variant="persistent"
                      open={sidebarShow}
                      className={clsx(classes.drawer, {
                        [classes.drawerOpen]: sidebarShow,
                        [classes.drawerClose]: !sidebarShow,
                      })}
                      classes={{
                        paper: classes.drawerPaperStyle,
                      }}
                    >
                      <RightSidebarOpen
                        TimelineData={timelineData}
                        setSidebarShow={setSidebarShow}
                        sidebarShow={sidebarShow}
                        item={item}
                        setItem={setItem}
                      />
                    </Drawer>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Patient360Scrren />
      )}
    </div>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    loadPatientEverything: id => dispatch(loadPatientEverything(id)),
    loadPatientTimelineData: id => dispatch(loadPatientTimelineData(id)),
    loadCriticalEventsData: id => dispatch(loadCriticalEventsData(id)),
    loadPatientVitalData: id => dispatch(loadPatientVitalData(id)),
    // TreatmentList
    getTreatmentList: id => dispatch(getTreatmentList(id)),
    // Patient reported outcomes
    loadPatientOutcomesData: id => dispatch(loadPatientOutcomesData(id)),

    //related cases
    loadRelatedCasesData: field => dispatch(loadRelatedCasesData(field)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(Patient360);
