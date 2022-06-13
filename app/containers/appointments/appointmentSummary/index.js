import { CircularProgress, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton } from '@material-ui/lab';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import moment from 'moment';
import printJS from 'print-js';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { saveAppointmentPdf } from '../../../apis/appointmentsApis/serviceCalls';
import {
  doSavePDF,
  doSharePDF,
  getAppointmentDetails,
  getPatientDetails,
  getPractitionerDetails,
  loadAdvice,
  loadDiagnosis,
  loadEncounterWiseAdditionalData,
  loadEncounterWisePrescription,
  loadGeneralExaminationEncounterWise,
  loadHOPIEncounterWise,
  loadMedicalHistory,
  loadPastHistoryEncounterWise,
  loadPatientVitalEncounterWise,
  loadPersonalHistory,
  loadRefferedTo,
  loadTreatmentPlan,
  loadTreatmentProtocol,
} from '../../../apis/globalApis/globalSlice';
import SharingPopUp from '../../../components/sharingPopUp/SharingPopUp';
import { MessageComponent } from '../../../components';
import editIcon from '../../../images/edit.svg';
import printIcon from '../../../images/print.svg';
import shareIcon from '../../../images/share.svg';
import ShareSMS from '../../../images/SharingSMS.svg';
import HeaderContext from '../../../utils/contextCreate';
import { getFromLocalStorage } from '../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import AccordionTab from './components/AccordionTab';
import BriefSummary from './components/briefSummary';
import CustomizedSummary from './components/customizedSummary';
import DetailedSummary from './components/detailedSummary';
import PdfCustomView from './pdfComponents/PdfCustomView';
import PdfDetailedView from './pdfComponents/PdfDetailedView';
import PdfView from './pdfComponents/PdfView';

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, label, ...other } = props;
  const history = useHistory();
  const [isDisable, setIsDisable] = useState(false);
  // console.log("history", history)
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopover',
  });
  const contentDisplay = [
    { type: 'Mobile', content: ShareSMS, height: '10rem', width: '10rem' },
  ];
  const handleAction = actionType => {
    if (actionType === 'Mobile') {
      props.handlePrint(index, 'share');
    }
  };
  useEffect(() => {
    if (props.loader === true) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [props.loader]);
  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            <Grid container className={classes.tabHeader}>
              <Grid item xs={7}>
                {label}
              </Grid>
              <Grid
                item
                xs={5}
                style={{ display: 'flex', justifyContent: 'end' }}
              >
                <div className={classes.wrapperOne}>
                  {props.isLoadingShare && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgressOne}
                    />
                  )}
                </div>
                <div className={classes.wrapper}>
                  {/* {props.circularLoader && props.clickOption === 'share' ? (
                    <div
                      className={classes.printBtn}
                      style={{ height: '12px', width: '12px' }}
                    >
                      <CircularProgress
                        size={20}
                        className={classes.buttonProgress}
                      />
                    </div>
                  ) : ( */}
                  <div variant="contained" {...bindHover(popupState)}>
                    <img
                      src={shareIcon}
                      alt="Share"
                      height="12px"
                      width="12px"
                      className={classes.printBtn}
                    />
                  </div>
                  {/* )} */}
                </div>
                <div className={classes.wrapper}>
                  {props.circularLoader && props.clickOption === 'print' ? (
                    <div
                      className={classes.printBtn}
                      style={{ height: '12px', width: '12px' }}
                    >
                      {' '}
                      <CircularProgress
                        size={20}
                        className={classes.buttonProgress}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        !isDisable && props.handlePrint(index, 'print')
                      }
                    >
                      <img
                        src={printIcon}
                        alt="Print"
                        height="12px"
                        width="12px"
                        className={classes.printBtn}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={classes.wrapper}
                  onClick={() => !isDisable && props.handleEditRedirection()}
                >
                  <img
                    src={editIcon}
                    alt="Print"
                    height="12px"
                    width="12px"
                    className={classes.printBtn}
                  />
                </div>
                <div className={classes.closeBtn} />
                {/* <Link
                                className={classes.appointmentLink}
                                to={{
                                    pathname: `ROUTES_CONSTANTS.ALL_APPOINTMENTS`,
                                }}
                            > */}
                <div
                  className={classes.closeBtn}
                  onClick={() => {
                    history.go(-1) || history.goBack();
                  }}
                >
                  <CloseIcon fontSize="small" />
                </div>
                {/* </Link> */}
              </Grid>
            </Grid>
            <Box p={3} className={classes.rightContent}>
              {children}
            </Box>
          </>
        )}
      </div>
      <SharingPopUp
        popupState={popupState}
        content={contentDisplay}
        handleAction={handleAction}
      />
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    border: `1px solid ${theme.palette.divider}`,
    width: '30%',
    backgroundColor: '#f0f0f0',
    '& .MuiTab-root': {
      maxWidth: '95%',
    },
  },
  tabHeader: {
    height: '50px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    boxShadow: '0px 2px 4px #00000029',
    padding: '1rem',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-000000)',
    textAlign: 'left',
    font: 'normal normal medium 24px/32px Yantramanav',
    color: ' #000000',
    opacity: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiIconButton-root': {
      padding: 0,
    },
  },
  rightSection: {
    border: `1px solid ${theme.palette.divider}`,
    width: '70%',
    marginLeft: '1rem',
    backgroundColor: 'white',
    // backgroundColor: theme.palette.background.paper,
    overflowY: '',
  },
  tabValues: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '0.8rem',
    width: '100%',
    borderRadius: 'inherit',
    fontSize: '14px',
    fontWeight: 'bold',
    color: ' #000000',
    opacity: 1,
    '& .MuiTab-wrapper': {
      alignItems: 'baseline',
    },
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '2px',
    fontSize: 'xx-small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    '&:nth-child(5)': {
      borderTop: '0px',
      borderBottom: '0px',
      padding: '2px 5px',
      backgroundColor: '#ffffff',
    },
    cursor: 'pointer',
  },
  wrapperOne: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgressOne: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '10%',
    marginTop: -12,
    marginLeft: -24,
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '2px',
    fontSize: 'xx-small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    '&:nth-child(5)': {
      borderTop: '0px',
      borderBottom: '0px',
      padding: '2px 5px',
      backgroundColor: '#ffffff',
    },
    cursor: 'pointer',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  rightContent: {
    height: '92%',
    overflow: 'auto',
  },
  printBtn: {
    margin: '5px',
    color: '#cacaca',
  },
}));

function AppointmentSummary(props) {
  // console.log(props);

  const {
    practitionerDetails,
    patientDetailsData,
    allergyData,
    comorbidData,
    familyHistoryData,
    lifestyleIndicatorData,
    prevTestResultData,
    chiefComplaintData,
    HOPIEncounterWiseDescription,
    genAndSysExaminationDataEncounter,
    ecogDataEncounter,
    kScoreDataEncounter,
    vitalDataEncounterWise,
    diagnosisData,
    impressionForVisitData,
    adviceData,
    treatmentPlanTotalData,
    treatmentProtocolData,
    discussionData,
    additionalNoteData,
    scheduleFollowUpData,
    refferedToData,
    prescriptionData,
    appointmentSummaryDate,
    appointmentDetailsData,
  } = props;

  const classes = useStyles();
  const history = useHistory();

  //context
  const [headerToggle, setHeaderToggle] = useState(false);
  const [headerContext, setHeaderContext] = useState({
    setHeaderToggle: setHeaderToggle,
  });
  // debugger;
  const briefComponent = useRef();
  const detailedComponent = useRef();
  const customComponent = useRef();
  const [value, setValue] = React.useState(1);
  const [selectedState, setSelectedState] = useState({
    reasonForVisit: true,
    historyOfPresentIllness: true,
    historiesAndConditions: true,
    generalAndSystemicExam: true,
    treatmentPlan: true,
    discussion: true,
    additionalNote: true,
    impressionForVisit: true,
    referredTo: true,
    allergy: true,
    previousTestResults: true,
  });
  const [openView, setOpenView] = useState(false);
  const [openDetailedView, setOpenDetailedView] = useState(false);
  const [openCustomView, setOpenCustomView] = useState(false);
  const [loader, setLoader] = useState(false);
  const [urlToOpen, setUrlToOpen] = useState();
  const [baseString, setBaseString] = useState('');
  const [view, setView] = useState();
  const [patientInfo, setPatientInfo] = useState();
  const [appointmentDetails, setAppointmentDetails] = useState();
  const handleChange = (event, newValue) => {
    // debugger;
    setValue(newValue);
  };
  const handleSelectChange = state => {
    setSelectedState({ ...state });
  };
  const loginUserDetails = getFromLocalStorage('data').userDetails;
  const practitionerId = loginUserDetails.fhirResourceId;
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
  const [clickOption, setClickOption] = useState();
  const [circularLoader, setCircularLoader] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);

  const userQualification =
    practitionerDetails && practitionerDetails.qualifications
      ? practitionerDetails.qualifications.length > 0
        ? practitionerDetails.qualifications.map(item => {
            return `${item.code.display}`;
          })
        : ''
      : '';
  const userSignature =
    practitionerDetails && practitionerDetails.signatureImage
      ? practitionerDetails.signatureImage
        ? practitionerDetails.signatureImage
        : ''
      : '';
  const userSignatureContentType =
    practitionerDetails && practitionerDetails.signatureContentType
      ? practitionerDetails.signatureContentType
        ? practitionerDetails.signatureContentType
        : ''
      : '';

  const userDetailsForHeader = {
    organizationLogo:
      loginUserDetails.organizationDetails[0]['organizationLogo'],
    userName: loginUserDetails.display.split('/')[0],
    organization: `${orgName + ',' + ' ' + locName}`,
    mobileNumber: loginUserDetails.display.split('/')[2],
    email: loginUserDetails.email,
    qualification: userQualification,
    signature: userSignature,
    signatureContentType: userSignatureContentType,
    website: loginUserDetails.organizationDetails[0]['endpoint'],
  };
  // console.log("userDetailsForHeader", userDetailsForHeader)
  const patientInformtion = {
    patientName: '',
    patientMobile: '',
    referredBy: '',
  };
  const { appointmentId, patientId } = useParams();
  // console.log("params", appointmentId, patientId)

  const [field, Setfield] = useState({
    appointmentId: appointmentId,
    id: patientId,
  });

  //-----------------API CALLS ---------------
  const callonLoad = async field => {
    setLoader(true);
    console.time('doSomething');
    await Promise.allSettled([
      props
        .getPractitionerDetails({ id: practitionerId })
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .getPatientDetails(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadMedicalHistory(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadPastHistoryEncounterWise(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadHOPIEncounterWise(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadPersonalHistory(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadGeneralExaminationEncounterWise(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadPatientVitalEncounterWise(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadDiagnosis(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadAdvice(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadTreatmentPlan(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadTreatmentProtocol(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadEncounterWisePrescription(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadEncounterWiseAdditionalData(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadRefferedTo(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .getAppointmentDetails({ id: appointmentId })
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
    ]);

    console.timeEnd('doSomething');
    setLoader(false);
  };

  //-----------------API CALLS END---------------

  useEffect(() => {
    if (appointmentId && patientId) {
      callonLoad(field);
    }
  }, [patientId]);
  // console.log("fetchPractitionerDataSuccess", props.fetchPractitionerDataSuccess)

  // const handlePrintBrief = useReactToPrint({
  //     content: () => briefComponent.current
  // })
  const handlePrintBrief = (index, option) => {
    setBaseString('');
    setClickOption(option);
    setCircularLoader(true);
    setOpenView(true);
    setOpenDetailedView(false);
    setOpenCustomView(false);
  };
  // const handlePrintDetailed = useReactToPrint({
  //     content: () => detailedComponent.current
  // })
  const handlePrintDetailed = (index, option) => {
    // debugger;
    setBaseString('');
    setClickOption(option);
    setOpenView(false);
    setOpenCustomView(false);
    setOpenDetailedView(true);
    setCircularLoader(true);
  };
  // const handlePrintCustom = useReactToPrint({
  //     content: () => customComponent.current
  // })
  const handlePrintCustom = (index, option) => {
    // debugger;
    setBaseString('');
    setClickOption(option);
    setOpenView(false);
    setOpenDetailedView(false);
    setOpenCustomView(true);
    setCircularLoader(true);
  };
  const handleViewClose = () => {
    if (view === 'basicView') setOpenView(false);
    else if (view === 'detailView') setOpenDetailedView(false);
    else if (view === 'customView') setOpenCustomView(false);
    setClickOption();
    setView();
    setUrlToOpen();
  };
  useEffect(() => {
    if (
      history.location.state &&
      history.location.state.type &&
      history.location.state.type === 'custom'
    ) {
      setValue(3);
    } else if (
      history.location.state &&
      history.location.state.type &&
      history.location.state.type === 'detailed'
    ) {
      setValue(2);
    }
  }, []);

  const callPdfSave = async field => {
    if (clickOption === 'share') {
      setIsLoadingShare(true);
    }

    const { payload } = await props.doSavePDF(saveAppointmentPdf(field));
    if (payload && payload.status === 200) {
      if (clickOption === 'print') {
        // debugger
        printJS({
          printable: urlToOpen,
          onPrintDialogClose: handleViewClose(),
        });
      } else {
        const SharePDF = await props.doSharePDF({
          patientId: patientId,
          documentId: uuidv4(),
          resourceType: 'AppointmentSummary',
        });

        if (SharePDF.payload && SharePDF.payload.status === 200) {
          let m =
            SharePDF.payload &&
            SharePDF.payload.data &&
            SharePDF.payload.data.message
              ? SharePDF.payload.data.message
              : 'Report is shared successfully with patient';
          props.snackbarShowMessage(m, 'success');

          setIsLoadingShare(false);
          setClickOption();
          setView();
          setUrlToOpen();
          setBaseString('');
        } else if (SharePDF.payload && SharePDF.payload.message) {
          let m = 'Sharing Failed';
          props.snackbarShowMessage(m, 'error');

          setIsLoadingShare(false);
          setClickOption();
          setView();
          setUrlToOpen();
          setBaseString('');
        }
      }
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
      setIsLoadingShare(false);
    }

    setCircularLoader(false);
  };

  useEffect(() => {
    // debugger;
    if (baseString && urlToOpen && clickOption) {
      let uid = uuidv4();
      const randomDigit = Math.floor(10000000 + Math.random() * 90000000);
      const encounterDate =
        appointmentSummaryDate &&
        moment.utc(appointmentSummaryDate).format('DD-MM-YYYY');
      // debugger;
      const newObj = {
        resourceId: uid,
        recordName: `Visit-Summary${
          encounterDate ? `-${encounterDate}` : ''
        }-${randomDigit}.pdf`,
        practitioner: {
          resourceId: loginUserDetails.fhirResourceId,
          display: loginUserDetails.display,
          name: loginUserDetails.display.split('/')[0],
        },
        patientDetails: { details: patientInfo.patient },
        content: [
          {
            attachment: {
              contentType: 'application/pdf',
              title: `Visit-Summary${
                encounterDate ? `-${encounterDate}` : ''
              }-${randomDigit}.pdf`,
              data: baseString && baseString.split(',')[1],
            },
          },
        ],
      };

      callPdfSave(newObj);
    }
  }, [baseString]);

  const handleSavePDfFunc = (blob, url, view) => {
    // console.log('base', baseString);
    setUrlToOpen(url);
    setView(view);
    var reader = new FileReader();
    reader.onload = () => setBaseString(reader.result);
    reader.readAsDataURL(blob);
  };
  const handleEditRedirection = () => {
    if (appointmentDetails) {
      history.push({
        pathname: ROUTES_CONSTANTS.EPISODE_OF_CARE,
        state: { detaildata: appointmentDetails },
      });
    }
  };
  useEffect(() => {
    setPatientInfo(patientDetailsData && patientDetailsData);
  }, [patientDetailsData]);

  useEffect(() => {
    setAppointmentDetails(
      appointmentDetailsData && appointmentDetailsData.patientAppointment,
    );
  }, [appointmentDetailsData]);

  // console.log("headerToggle", headerToggle)
  return (
    <HeaderContext.Provider value={headerContext}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          // variant="standard"
          variant={value === 3 ? 'scrollable' : 'standard'}
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <div className={classes.tabHeader}>Appointment Summary</div>
          <Tab
            label="Brief Summary"
            {...a11yProps(0)}
            className={classes.tabValues}
          />
          <Tab
            label="Detailed Summary"
            {...a11yProps(1)}
            className={classes.tabValues}
          />
          {/* <Tab label="Customized Summary" {...a11yProps(2)} className={classes.tabValues} /> */}
          <AccordionTab
            {...a11yProps(2)}
            handleClick={() => setValue(3)}
            handleSelectChange={handleSelectChange}
            open={
              history.location.state &&
              history.location.state.type &&
              history.location.state.type === 'custom'
            }
            close={value !== 3 ? true : false}
          />
        </Tabs>
        <TabPanel
          value={value}
          index={1}
          className={classes.rightSection}
          label="Brief Summary"
          handlePrint={handlePrintBrief}
          circularLoader={circularLoader}
          isLoadingShare={isLoadingShare}
          clickOption={clickOption}
          handleEditRedirection={handleEditRedirection}
          loader={loader}
        >
          {!loader ? (
            <BriefSummary
              ref={briefComponent}
              userDetailsForHeader={userDetailsForHeader}
              patientDetails={patientDetailsData}
              prevTestResult={prevTestResultData}
              VisitNotesResult={chiefComplaintData}
              adviceAndPrescriptionData={adviceData}
              diagnosisData={diagnosisData}
              impressionForVisitData={impressionForVisitData}
              PrevTumorTestResult={props && props.PrevTumorTestResult} //not in use
              PrevBiospyResult={props && props.PrevBiospyResult} //not in use
              TreatmentData={treatmentPlanTotalData}
              treatmentProtocolData={treatmentProtocolData}
              DiscussionData={discussionData}
              loadAdditionalNoteDataSuccess={additionalNoteData}
              scheduleFollowUp={scheduleFollowUpData}
              loadReferredToPrevDataSuccess={refferedToData}
              prescriptionData={prescriptionData}
              appointmentSummaryDate={appointmentSummaryDate}
              headerToggle={headerToggle}
            />
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
            </Grid>
          )}
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          className={classes.rightSection}
          label="Detailed Summary"
          handlePrint={handlePrintDetailed}
          circularLoader={circularLoader}
          isLoadingShare={isLoadingShare}
          clickOption={clickOption}
          handleEditRedirection={handleEditRedirection}
          loader={loader}
        >
          {!loader ? (
            <DetailedSummary
              ref={detailedComponent}
              userDetailsForHeader={userDetailsForHeader}
              patientDetails={patientDetailsData}
              loadAllergyDataSuccess={allergyData}
              comorbidDataResult={comorbidData}
              familyResult={familyHistoryData}
              LifestyleResult={lifestyleIndicatorData}
              prevTestResult={prevTestResultData}
              VisitNotesResult={chiefComplaintData}
              fetchHOPIDataSuccess={HOPIEncounterWiseDescription}
              GenAndSysResult={genAndSysExaminationDataEncounter}
              ScoresDataResult={ecogDataEncounter}
              vitalDataSuccess={vitalDataEncounterWise}
              diagnosisData={diagnosisData}
              impressionForVisitData={impressionForVisitData}
              adviceAndPrescriptionData={adviceData}
              PrevTumorTestResult={props && props.PrevTumorTestResult} //not in use
              PrevBiospyResult={props && props.PrevBiospyResult} //not in use
              TreatmentData={treatmentPlanTotalData}
              treatmentProtocolData={treatmentProtocolData}
              DiscussionData={discussionData}
              loadAdditionalNoteDataSuccess={additionalNoteData}
              scheduleFollowUp={scheduleFollowUpData}
              loadReferredToPrevDataSuccess={refferedToData}
              prescriptionData={prescriptionData}
              appointmentSummaryDate={appointmentSummaryDate}
              headerToggle={headerToggle}
            />
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
            </Grid>
          )}
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
          className={classes.rightSection}
          label="Customized Summary"
          handlePrint={handlePrintCustom}
          circularLoader={circularLoader}
          isLoadingShare={isLoadingShare}
          clickOption={clickOption}
          handleEditRedirection={handleEditRedirection}
          loader={loader}
        >
          {!loader ? (
            <CustomizedSummary
              ref={customComponent}
              selectedState={selectedState}
              userDetailsForHeader={userDetailsForHeader}
              patientDetails={patientDetailsData}
              loadAllergyDataSuccess={allergyData}
              comorbidDataResult={comorbidData}
              familyResult={familyHistoryData}
              LifestyleResult={lifestyleIndicatorData}
              prevTestResult={prevTestResultData}
              VisitNotesResult={chiefComplaintData}
              fetchHOPIDataSuccess={HOPIEncounterWiseDescription}
              GenAndSysResult={genAndSysExaminationDataEncounter}
              ScoresDataResult={ecogDataEncounter}
              vitalDataSuccess={vitalDataEncounterWise}
              diagnosisData={diagnosisData}
              impressionForVisitData={impressionForVisitData}
              adviceAndPrescriptionData={adviceData}
              PrevTumorTestResult={props && props.PrevTumorTestResult} //not in use
              PrevBiospyResult={props && props.PrevBiospyResult} //not in use
              TreatmentData={treatmentPlanTotalData}
              treatmentProtocolData={treatmentProtocolData}
              DiscussionData={discussionData}
              loadAdditionalNoteDataSuccess={additionalNoteData}
              scheduleFollowUp={scheduleFollowUpData}
              loadReferredToPrevDataSuccess={refferedToData}
              prescriptionData={prescriptionData}
              appointmentSummaryDate={appointmentSummaryDate}
              headerToggle={headerToggle}
            />
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height={50} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
              </Grid>
            </Grid>
          )}
        </TabPanel>
      </div>
      {openView ? (
        <PDFDownloadLink
          document={
            <PdfView
              userDetailsForHeader={userDetailsForHeader}
              patientInfo={patientDetailsData}
              prevTestResult={prevTestResultData}
              VisitNotesResult={chiefComplaintData}
              adviceAndPrescriptionData={adviceData}
              diagnosisData={diagnosisData}
              impressionForVisitData={impressionForVisitData}
              PrevTumorTestResult={props && props.PrevTumorTestResult} //not in use
              PrevBiospyResult={props && props.PrevBiospyResult} //not in use
              TreatmentData={treatmentPlanTotalData}
              treatmentProtocolData={treatmentProtocolData}
              DiscussionData={discussionData}
              loadAdditionalNoteDataSuccess={additionalNoteData}
              scheduleFollowUp={scheduleFollowUpData}
              loadReferredToPrevDataSuccess={refferedToData}
              prescriptionData={prescriptionData}
              appointmentSummaryDate={appointmentSummaryDate}
              headerToggle={headerToggle}
            />
          }
          fileName="summary.pdf"
        >
          {({ blob, url, loading, error }) => {
            // debugger;
            loading
              ? 'Loading document...'
              : blob && handleSavePDfFunc(blob, url, 'basicView');
            // printJS({ printable: url, onPrintDialogClose: () => setOpenView(false) });
          }}
        </PDFDownloadLink>
      ) : (
        ''
      )}
      {openDetailedView ? (
        <PDFDownloadLink
          document={
            <PdfDetailedView
              userDetailsForHeader={userDetailsForHeader}
              patientInfo={patientDetailsData}
              loadAllergyDataSuccess={allergyData}
              comorbidDataResult={comorbidData}
              familyResult={familyHistoryData}
              LifestyleResult={lifestyleIndicatorData}
              prevTestResult={prevTestResultData}
              VisitNotesResult={chiefComplaintData}
              fetchHOPIDataSuccess={HOPIEncounterWiseDescription}
              GenAndSysResult={genAndSysExaminationDataEncounter}
              ScoresDataResult={ecogDataEncounter}
              vitalDataSuccess={vitalDataEncounterWise}
              diagnosisData={diagnosisData}
              impressionForVisitData={impressionForVisitData}
              adviceAndPrescriptionData={adviceData}
              PrevTumorTestResult={props && props.PrevTumorTestResult} //not in use
              PrevBiospyResult={props && props.PrevBiospyResult} //not in use
              TreatmentData={treatmentPlanTotalData}
              treatmentProtocolData={treatmentProtocolData}
              DiscussionData={discussionData}
              loadAdditionalNoteDataSuccess={additionalNoteData}
              scheduleFollowUp={scheduleFollowUpData}
              loadReferredToPrevDataSuccess={refferedToData}
              prescriptionData={prescriptionData}
              appointmentSummaryDate={appointmentSummaryDate}
              headerToggle={headerToggle}
            />
          }
          fileName="summary.pdf"
        >
          {({ blob, url, loading, error }) => {
            // debugger;
            loading
              ? 'Loading document...'
              : blob && handleSavePDfFunc(blob, url, 'detailView');
            // printJS({ printable: url, onPrintDialogClose: () => setOpenDetailedView(false) });
          }}
        </PDFDownloadLink>
      ) : (
        ''
      )}
      {openCustomView ? (
        <PDFDownloadLink
          document={
            <PdfCustomView
              selectedState={selectedState}
              userDetailsForHeader={userDetailsForHeader}
              patientInfo={patientDetailsData}
              loadAllergyDataSuccess={allergyData}
              comorbidDataResult={comorbidData}
              familyResult={familyHistoryData}
              LifestyleResult={lifestyleIndicatorData}
              prevTestResult={prevTestResultData}
              VisitNotesResult={chiefComplaintData}
              fetchHOPIDataSuccess={HOPIEncounterWiseDescription}
              GenAndSysResult={genAndSysExaminationDataEncounter}
              ScoresDataResult={ecogDataEncounter}
              vitalDataSuccess={vitalDataEncounterWise}
              diagnosisData={diagnosisData}
              impressionForVisitData={impressionForVisitData}
              adviceAndPrescriptionData={adviceData}
              PrevTumorTestResult={props && props.PrevTumorTestResult} //not in use
              PrevBiospyResult={props && props.PrevBiospyResult} //not in use
              TreatmentData={treatmentPlanTotalData}
              treatmentProtocolData={treatmentProtocolData}
              DiscussionData={discussionData}
              loadAdditionalNoteDataSuccess={additionalNoteData}
              scheduleFollowUp={scheduleFollowUpData}
              loadReferredToPrevDataSuccess={refferedToData}
              prescriptionData={prescriptionData}
              appointmentSummaryDate={appointmentSummaryDate}
              headerToggle={headerToggle}
            />
          }
          fileName="summary.pdf"
        >
          {({ blob, url, loading, error }) => {
            loading
              ? 'Loading document...'
              : blob && handleSavePDfFunc(blob, url, 'customView');
            // printJS({ printable: url, onPrintDialogClose: () => setOpenCustomView(false) });
          }}
        </PDFDownloadLink>
      ) : (
        ''
      )}
    </HeaderContext.Provider>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    getPractitionerDetails: payload =>
      dispatch(getPractitionerDetails(payload)),
    getPatientDetails: payload => dispatch(getPatientDetails(payload)),
    loadMedicalHistory: payload => dispatch(loadMedicalHistory(payload)),
    loadPersonalHistory: payload => dispatch(loadPersonalHistory(payload)),
    loadPastHistoryEncounterWise: payload =>
      dispatch(loadPastHistoryEncounterWise(payload)),
    loadHOPIEncounterWise: payload => dispatch(loadHOPIEncounterWise(payload)),
    loadGeneralExaminationEncounterWise: payload =>
      dispatch(loadGeneralExaminationEncounterWise(payload)),

    loadPatientVitalEncounterWise: payload =>
      dispatch(loadPatientVitalEncounterWise(payload)),

    loadDiagnosis: payload => dispatch(loadDiagnosis(payload)),
    loadAdvice: payload => dispatch(loadAdvice(payload)),
    loadTreatmentPlan: payload => dispatch(loadTreatmentPlan(payload)),
    loadTreatmentProtocol: payload => dispatch(loadTreatmentProtocol(payload)),
    loadEncounterWisePrescription: payload =>
      dispatch(loadEncounterWisePrescription(payload)),

    loadEncounterWiseAdditionalData: payload =>
      dispatch(loadEncounterWiseAdditionalData(payload)),

    loadRefferedTo: payload => dispatch(loadRefferedTo(payload)),
    getAppointmentDetails: payload => dispatch(getAppointmentDetails(payload)),

    doSavePDF: payload => dispatch(doSavePDF(payload)),
    doSharePDF: payload => dispatch(doSharePDF(payload)),
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
  MessageComponent,
)(AppointmentSummary);
