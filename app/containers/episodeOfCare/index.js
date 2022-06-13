import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import { find } from 'lodash';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { saveEpisodeOfCare } from '../../apis/episodeOfCareApis/serviceCalls';
import {
  actionsConfig,
  doSaveEpisodeOfCare,
  getPatientDetails,
  loadAdvice,
  loadDiagnosis,
  loadEncounterWiseAdditionalData,
  loadEncounterWisePrescription,
  loadGeneralExamination,
  loadMedicalHistory,
  loadPastHistoryEncounterWise,
  loadPastIllnessData,
  loadPastOtherIllnessData,
  loadPatientVitalData,
  loadPersonalHistory,
  loadRefferedTo,
  loadTreatmentPlan,
  loadTreatmentProtocol,
  loadTypesOfTreatment,
} from '../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../components';
import ErrorBoundary from '../../utils/errorBoundry';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import AdviceSection from './components/AdviceSection';
import BasicDetailsForm from './components/BasicDetailsForm';
import DiagnososAndStagingForm from './components/DiagnososAndStagingForm';
import Discussion from './components/Discussion';
import ExistModel from './components/ExitModal';
import ButtonComponent from './components/forms/Button';
import GeneralExamination from './components/GeneralExamination';
import Header from './components/Header';
import Hopi from './components/Hopi';
import MedicalHistoryForm from './components/MedicalHistoryForm';
import PastHospitalizationHistory from './components/PastHospitalizationHistory';
import PersonalHistory from './components/PersonalHistory';
import Presciptions from './components/Presciptions';
import ScheduleFollowup from './components/ScheduleFollowup';
import BasicDetailEOCSkelaton from './components/skelaton/BasicDetailEOCSkelaton';
import HeaderEOCSkelaton from './components/skelaton/HeaderEOCSkelaton';
import TreatmentPlan from './components/TreatmentPlan';
import UserContext from './MyStateContext';

const useStyles = makeStyles(theme => ({
  mainRoot: {
    // height:'100%'
    background: '#F7F6F3',
  },
  accordationDiv: {
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '15px',
    },
  },
  emptyDiv: {
    marginLeft: -5,
    height: '25px',
    position: 'fixed',
    top: '55px',
    width: '100%',
    zIndex: '1',
    background: '#f7f6f4',
  },
  stickyHeader: {
    position: 'sticky',
    top: 75,
    zIndex: 1,
  },
  centerPaper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
    boxShadow: '0px 0px 3px #f4f4f4, 0px -3px 1px #cdcdcd',
  },

  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function EpisodeOfCare(props) {
  const { patientDetailsData } = props;

  const classes = useStyles();
  const [Id, setId] = useState('');
  const [loginDetail, setloginDetail] = React.useState({});
  const [appointmentId, setAppointmentId] = useState('');
  const history = useHistory();
  const [openEndOfAppointment, setOpenEndOfAppointment] = useState(false);
  const [TotalLoader, setTotalLoader] = useState(true);
  const [generatedHOPI, setGeneratedHOPI] = useState(false);
  const [generatedHOPIValue, setGeneratedHOPIValue] = useState(null);
  const [LoadingSave, setLoadingSave] = useState(false);
  const practitioner = getFromLocalStorage('data');

  const [BASIC_DETAIL_INITIAL_STATE, SET_BASIC_DETAIL_INITIAL_STATE] = useState(
    {},
  );
  const [
    FAMILY_HISTORY_CHECK_INITIAL_STATE,
    SET_FAMILY_HISTORY_CHECK_INITIAL_STATE,
  ] = useState({});
  const [
    PAST_HISTORY_CHECK_INITIAL_STATE,
    SET_PAST_HISTORY_CHECK_INITIAL_STATE,
  ] = useState({});
  const [LIFESTYLE_INITIAL_STATE, SET_LIFESTYLE_INITIAL_STATE] = useState({});
  const [OBS_GYN_INITIAL_STATE, SET_OBS_GYN_INITIAL_STATE] = useState({});

  const [HOPI_INITIAL_STATE, SET_HOPI_INITIAL_STATE] = useState({});
  const [SCORE_INITIAL_STATE, SET_SCORE_INITIAL_STATE] = useState({});
  const [VITAL_INITIAL_STATE, SET_VITAL_INITIAL_STATE] = useState({});
  const [
    LOCAL_SYSTEMIC_INITIAL_STATE,
    SET_LOCAL_SYSTEMIC_INITIAL_STATE,
  ] = useState({});

  const [DIAGNOSIS_INITIAL_STATE, SET_DIAGNOSIS_INITIAL_STATE] = useState({});

  const [
    TREATMENT_PROTOCOL_INITIAL_STATE,
    SET_TREATMENT_PROTOCOL_INITIAL_STATE,
  ] = useState({});
  const [DISCUSSION_INITIAL_STATE, SET_DISCUSSION_INITIAL_STATE] = useState({});
  const [
    ADDITIONAL_NOTE_INITIAL_STATE,
    SET_ADDITIONAL_NOTE_INITIAL_STATE,
  ] = useState({});

  const [FOLLOW_UP_INITIAL_STATE, SET_FOLLOW_UP_INITIAL_STATE] = useState({});
  const [
    IMPRESSION_VISIT_INITIAL_STATE,
    SET_IMPRESSION_VISIT_INITIAL_STATE,
  ] = useState({});

  const INITIAL_FORM_STATE = {
    ...BASIC_DETAIL_INITIAL_STATE,

    ...FAMILY_HISTORY_CHECK_INITIAL_STATE,

    ...PAST_HISTORY_CHECK_INITIAL_STATE,

    ...LIFESTYLE_INITIAL_STATE,
    ...OBS_GYN_INITIAL_STATE,

    ...HOPI_INITIAL_STATE,

    ...SCORE_INITIAL_STATE,
    ...VITAL_INITIAL_STATE,
    ...LOCAL_SYSTEMIC_INITIAL_STATE,

    ...DIAGNOSIS_INITIAL_STATE,

    ...TREATMENT_PROTOCOL_INITIAL_STATE,
    ...DISCUSSION_INITIAL_STATE,
    ...ADDITIONAL_NOTE_INITIAL_STATE,

    ...FOLLOW_UP_INITIAL_STATE,
    ...IMPRESSION_VISIT_INITIAL_STATE,
    temperatureUnit: '°F',
    pulseRateUnit: 'BPM',
    bloodPressureUnit: 'mmHg',
    respiratoryRateUnit: 'cyl/min',
    oxygenSaturationUnit: '%',
    rbsUnit: 'mg/dl',
  };

  const phoneRegExp = /^[6-9]\d{9}$/;

  const FORM_VALIDATION = Yup.object().shape({
    fullName: Yup.string().required('Firstname Required'),
    dob: Yup.object().shape({
      display: Yup.string().required('Required'),
    }),
    dateOfBirth: Yup.date().required('Required'),
    gender: Yup.string().required('Gender Required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Please Enter valid Phone number')
      .min(10, 'Please Enter valid Phone number')
      .max(12, 'Please Enter valid Phone number')
      .required('Phone number Required'),
  });
  const findPatientDetails = getDetail => {
    let selectedRelatedPerson = find(getDetail, function(ele) {
      // debugger
      if (ele.role === 'RelatedPerson') return { role: 'RelatedPerson' };
    });
    if (selectedRelatedPerson) {
      // debugger
      return selectedRelatedPerson;
    } else {
      let selectedPatient = find(getDetail, function(ele) {
        if (ele.role === 'Patient') return { role: 'Patient' };
      });
      return selectedPatient;
    }
  };
  useEffect(() => {
    setAppointmentId(props.location.state.detaildata.resourceId);
  }, [props.location.state && props.location.state.detaildata]);
  useEffect(() => {
    if (props.location.state != undefined && props.location.state.detaildata) {
      let str = '';

      let getStateFromLink = props.location.state;
      if (
        getStateFromLink.detaildata &&
        getStateFromLink.detaildata.participants
      ) {
        let selectedPatient = findPatientDetails(
          getStateFromLink.detaildata.participants,
        );
        str = selectedPatient.actor.resourceId;
        // getStateFromLink.detaildata.participants
        //   .filter(function (c) {
        //     return c.actor.resourceType == 'Patient';
        //   })
        //   .map(c => (str = c.actor.resourceId));
      }

      if (
        getStateFromLink.detaildata &&
        getStateFromLink.detaildata.cancerPatient
      ) {
        str = getStateFromLink.detaildata.cancerPatient.resourceId;
      }

      setId(str);
    }
  }, [props.location.state]);

  useEffect(() => {
    if (Id !== '') {
      let field = {
        id: Id,
        appointmentId: props.location.state.detaildata.resourceId,
      };

      callonLoad(field);
    }
  }, [Id]);

  //-----------------API CALLS ---------------
  const callonLoad = async field => {
    console.time('emrTime');
    await Promise.allSettled([
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
        .loadPastIllnessData(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadPastOtherIllnessData(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadTypesOfTreatment(field)
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
        .loadGeneralExamination(field)
        .then(res => {
          if (res.payload && res.payload.message) {
            return props.snackbarShowMessage(res.payload.message, 'error');
          }
        })
        .catch(error => props.snackbarShowMessage(error, 'error')),
      props
        .loadPatientVitalData(field)
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
    ]);
    console.timeEnd('emrTime');
    setTotalLoader(false);
  };

  useEffect(() => {
    // props.resetStore();
    return () => props.resetReducerStore();
  }, []);
  //-----------------API CALLS END---------------

  useEffect(() => {
    if (patientDetailsData && patientDetailsData.patient) {
      const { resourceId, display } = patientDetailsData.patient;
      setloginDetail({
        patientId: resourceId,
        patientDisplay: display,
        practitionerId: practitioner.userDetails.fhirResourceId,
        practitionerDisplay: practitioner.userDetails.display,
      });
    }
  }, [patientDetailsData]);

  const [ComorbidityData, setComorbidityData] = useState([]);
  const [CheckComorbidity, setCheckComorbidity] = useState(false);
  const [DelComorbidityData, setDelComorbidityData] = useState([]);

  const [AllergyData, setAllergyData] = useState([]);
  const [CheckAllergy, setCheckAllergy] = useState(false);
  const [DelAllergyData, setDelAllergyData] = useState([]);

  const [FamilyHistoryData, setFamilyHistoryData] = useState([]);
  const [CheckFamilyHistory, setCheckFamilyHistory] = useState(false);
  const [DelFamilyHistoryData, setDelFamilyHistoryData] = useState([]);

  const [PrevTestResultData, setPrevTestResultData] = useState([]);
  const [CheckPrevTestResult, setCheckPrevTestResult] = useState(false);
  const [DelPrevTestResultData, setDelPrevTestResultData] = useState([]);

  const [ImmunizationData, setImmunizationData] = useState([]);
  const [CheckImmunization, setCheckImmunization] = useState(false);
  const [DelImmunizationData, setDelImmunizationData] = useState([]);

  const [prescriptionData, setPrescriptionData] = useState([]);
  const [CheckPrescription, setCheckPrescription] = useState(false);
  const [DelPrescriptionData, setDelPrescriptionData] = useState([]);

  const [adviceData, setAdviceData] = useState([]);
  const [CheckAdvice, setCheckAdvice] = useState(false);
  const [DelAdviceData, setDelAdviceData] = useState([]);

  const [PertainingIllnessData, setPertainingIllnessData] = useState([]);
  const [CheckPertainingIllness, setCheckPertainingIllness] = useState(false);
  const [DelPertainingIllnessData, setDelsetPertainingIllnessData] = useState(
    [],
  );
  const [OtherIllnessData, setOtherIllnessData] = useState([]);
  const [CheckOtherIllness, setCheckOtherIllness] = useState(false);
  const [DelOtherIllnessData, setDelsetOtherIllnessData] = useState([]);

  const [GeneralExaminationData, setGeneralExaminationData] = useState([]);
  const [CheckGeneralExamination, setCheckGeneralExamination] = useState(false);
  const [DelGeneralExaminationData, setDelGeneralExaminationData] = useState(
    [],
  );

  const [Stage, setStage] = useState([]);

  const [TreatmentData, setTreatmentData] = useState([]);
  const [DelTreatmentData, setDelTreatmentData] = useState([]);
  const [CheckTreatmentData, setCheckTreatmentData] = useState(false);

  const [TreatmentHistoryData, setTreatmentHistoryData] = useState([]);
  const [DelTreatmentHistoryData, setDelTreatmentHistoryData] = useState([]);
  const [CheckTreatmentHistory, setCheckTreatmentHistory] = useState(false);

  const [ChiefComplaintData, setChiefComplaintData] = useState([]);
  const [DelChiefComplaintData, setDelChiefComplaintData] = useState([]);
  const [CheckChiefComplaint, setCheckChiefComplaint] = useState(false);

  const [GeriatricQuestionnaireId, setGeriatricQuestionnaireId] = useState('');
  const [GeriatricResultData, setGeriatricResultData] = useState({});
  const [GeriatricFinalScore, setGeriatricFinalScore] = useState('');

  const [ReportedToData, setReportedToData] = useState();
  const [CheckReportedToData, setCheckReportedToData] = useState(false);
  const [DelReportedToData, setDelReportedToData] = useState([]);
  const [showDOB, setshowDOB] = useState(false);

  const [MolecularTestResultData, setMolecularTestResultData] = useState([]);
  const [CheckMolecularTestResult, setCheckMolecularTestResult] = useState(
    false,
  );
  const [DelMolecularTestResultData, setDelMolecularTestResultData] = useState(
    [],
  );

  const [user, setUser] = useState({
    setComorbidityData: setComorbidityData,
    setCheckComorbidity: setCheckComorbidity,
    setDelComorbidityData: setDelComorbidityData,

    setAllergyData: setAllergyData,
    setCheckAllergy: setCheckAllergy,
    setDelAllergyData: setDelAllergyData,

    setFamilyHistoryData: setFamilyHistoryData,
    setCheckFamilyHistory: setCheckFamilyHistory,
    setDelFamilyHistoryData: setDelFamilyHistoryData,

    setPrevTestResultData: setPrevTestResultData,
    setDelPrevTestResultData: setDelPrevTestResultData,
    setCheckPrevTestResult: setCheckPrevTestResult,

    setImmunizationData: setImmunizationData,
    setDelImmunizationData: setDelImmunizationData,
    setCheckImmunization: setCheckImmunization,

    setPrescriptionData: setPrescriptionData,
    setDelPrescriptionData: setDelPrescriptionData,
    setCheckPrescription: setCheckPrescription,

    setAdviceData: setAdviceData,
    setCheckAdvice: setCheckAdvice,
    setDelAdviceData: setDelAdviceData,

    setPertainingIllnessData: setPertainingIllnessData,
    setDelsetPertainingIllnessData: setDelsetPertainingIllnessData,
    setCheckPertainingIllness: setCheckPertainingIllness,

    setOtherIllnessData: setOtherIllnessData,
    setDelsetOtherIllnessData: setDelsetOtherIllnessData,
    setCheckOtherIllness: setCheckOtherIllness,

    setGeneralExaminationData: setGeneralExaminationData,
    setCheckGeneralExamination: setCheckGeneralExamination,
    setDelGeneralExaminationData: setDelGeneralExaminationData,

    setStage: setStage,

    setTreatmentData: setTreatmentData,
    setDelTreatmentData: setDelTreatmentData,
    setCheckTreatmentData: setCheckTreatmentData,

    setTreatmentHistoryData: setTreatmentHistoryData,
    setDelTreatmentHistoryData: setDelTreatmentHistoryData,
    setCheckTreatmentHistory: setCheckTreatmentHistory,

    setChiefComplaintData: setChiefComplaintData,
    setDelChiefComplaintData: setDelChiefComplaintData,
    setCheckChiefComplaint: setCheckChiefComplaint,

    setGeriatricQuestionnaireId: setGeriatricQuestionnaireId,
    setGeriatricResultData: setGeriatricResultData,
    setGeriatricFinalScore: setGeriatricFinalScore,

    setReportedToData: setReportedToData,
    setCheckReportedToData: setCheckReportedToData,
    setDelReportedToData: setDelReportedToData,

    setshowDOB: setshowDOB,

    setMolecularTestResultData: setMolecularTestResultData,
    setCheckMolecularTestResult: setCheckMolecularTestResult,
    setDelMolecularTestResultData: setDelMolecularTestResultData,
  });

  const getChangedValues = (values, initialValues) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
      const hasChanged = initialValues[key] !== value;

      if (hasChanged) {
        acc[key] = value;
      }

      return acc;
    }, {});
  };

  const onSave = async (values, { resetForm }) => {
    const Check = getChangedValues(values, INITIAL_FORM_STATE);

    let field = {
      appointmentId: props.location.state.detaildata.resourceId,
      values: values,
      loginDetail: loginDetail,

      ComorbidityData: ComorbidityData,
      DelComorbidityData: DelComorbidityData,
      CheckComorbidity: CheckComorbidity,
      AllergyData: AllergyData,
      DelAllergyData: DelAllergyData,
      CheckAllergy: CheckAllergy,
      FamilyHistoryData: FamilyHistoryData,
      DelFamilyHistoryData: DelFamilyHistoryData,
      CheckFamilyHistory: CheckFamilyHistory,

      PrevTestResultData: PrevTestResultData,
      DelPrevTestResultData: DelPrevTestResultData,
      CheckPrevTestResult: CheckPrevTestResult,

      ImmunizationData: ImmunizationData,
      DelImmunizationData: DelImmunizationData,
      CheckImmunization: CheckImmunization,

      prescriptionData: prescriptionData,
      DelPrescriptionData: DelPrescriptionData,
      CheckPrescription: CheckPrescription,

      adviceData: adviceData,
      CheckAdvice: CheckAdvice,
      DelAdviceData: DelAdviceData,

      PertainingIllnessData: PertainingIllnessData,
      DelPertainingIllnessData: DelPertainingIllnessData,
      CheckPertainingIllness: CheckPertainingIllness,

      OtherIllnessData: OtherIllnessData,
      DelOtherIllnessData: DelOtherIllnessData,
      CheckOtherIllness: CheckOtherIllness,

      GeneralExaminationData: GeneralExaminationData,
      CheckGeneralExamination: CheckGeneralExamination,
      DelGeneralExaminationData: DelGeneralExaminationData,

      Stage: Stage,

      TreatmentData: TreatmentData,
      DelTreatmentData: DelTreatmentData,
      CheckTreatmentData: CheckTreatmentData,

      TreatmentHistoryData: TreatmentHistoryData,
      DelTreatmentHistoryData: DelTreatmentHistoryData,
      CheckTreatmentHistory: CheckTreatmentHistory,

      ChiefComplaintData: ChiefComplaintData,
      DelChiefComplaintData: DelChiefComplaintData,
      CheckChiefComplaint: CheckChiefComplaint,

      Check: Check,
      INITIAL_FORM_STATE: INITIAL_FORM_STATE,

      GeriatricQuestionnaireId: GeriatricQuestionnaireId,
      GeriatricResultData: GeriatricResultData,
      GeriatricFinalScore: GeriatricFinalScore,

      ReportedToData: ReportedToData,
      CheckReportedToData: CheckReportedToData,
      DelReportedToData: DelReportedToData,
      showDOB: showDOB,

      hopi:
        Check.hopi !== undefined && !generatedHOPI
          ? {
              resourceId: uuidv4(),
              Description: values.hopi,
              Encounter: values.encounter,
            }
          : Check.hopi !== undefined &&
            generatedHOPI &&
            generatedHOPIValue.description !== values.hopi
          ? {
              resourceId: generatedHOPIValue.resourceId,
              description: values.hopi,
              encounter: generatedHOPIValue.encounter,
            }
          : null,

      MolecularTestResultData: MolecularTestResultData,
      CheckMolecularTestResult: CheckMolecularTestResult,
      DelMolecularTestResultData: DelMolecularTestResultData,
    };

    let field1 = {
      field: field,
    };
    setLoadingSave(true);
    const { payload } = await props.doSaveEpisodeOfCare(
      saveEpisodeOfCare(field1),
    );
    setLoadingSave(false);

    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      setTimeout(() => {
        history.push({
          pathname: `${ROUTES_CONSTANTS.APPOINTMENT_SUMMARY}/${Id}/${
            props.location.state.detaildata.resourceId
          }`,
          state: {
            type: 'detailed',
            data: props.location && props.location.state.detaildata,
            details: patientDetailsData,
          },
        });
      }, 2000);
    } else if (payload && payload.message) {
      //NOTE: backend response is always in => payload.response.data.message
      //      if response is null then show => payload.message
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
  };
  const [cancleOpen, setcancleOpen] = useState(false);
  const [getValues, setgetValues] = useState(null);

  let checkAllValidation = false;

  if (cancleOpen) {
    const Check = getChangedValues(getValues, INITIAL_FORM_STATE);

    if (
      Object.keys(Check).length !== 0 ||
      CheckComorbidity ||
      CheckAllergy ||
      CheckFamilyHistory ||
      CheckPrevTestResult ||
      CheckImmunization ||
      CheckPrescription ||
      CheckAdvice ||
      CheckPertainingIllness ||
      CheckOtherIllness ||
      CheckGeneralExamination ||
      CheckTreatmentHistory ||
      CheckChiefComplaint ||
      CheckReportedToData
    ) {
      checkAllValidation = true;
    } else {
      history.push({
        pathname: `${ROUTES_CONSTANTS.APPOINTMENT_SUMMARY}/${Id}/${
          props.location.state.detaildata.resourceId
        }`,
        state: {
          type: 'detailed',
          data: props.location && props.location.state.detaildata,
          details: patientDetailsData,
        },
      });
    }
  }
  const modalOpen = value => {
    setcancleOpen(value);
  };
  const handleClose = () => {
    props.click(false);
  };
  const handleGenerateSuccessMessage = (valueObj, type) => {
    if (type === 'success') {
      // setSuccessMessageShowHOPI(true);
      // setGenerateHopiMessage('Generated Successfully');
      setGeneratedHOPI(true);
      setGeneratedHOPIValue(valueObj.response);
      props.snackbarShowMessage(
        valueObj.message ? valueObj.message : 'Generated Successfully',
        'success',
      );
    } else {
      // setErrorMessageShowHOPI(true);
      // setGenerateHopiMessage(valueObj && valueObj.message);
      props.snackbarShowMessage(valueObj && valueObj.message, 'error');
    }
  };

  const [OnLoadcomrbidata, setOnLoadcomrbidata] = useState([]);
  const [OnLoadallergydata, setOnLoadallergydata] = useState([]);
  const [OnLoadComplainses, setOnLoadComplainses] = useState([]);

  useEffect(() => {
    setOnLoadcomrbidata(ComorbidityData);
  }, [ComorbidityData]);
  useEffect(() => {
    setOnLoadallergydata(AllergyData);
  }, [AllergyData]);
  useEffect(() => {
    setOnLoadComplainses(ChiefComplaintData);
  }, [ChiefComplaintData]);

  const [OnLoadprevTestData, setOnLoadprevTestData] = useState([]);
  const [OnLoadprevTreatment, setOnLoadprevTreatment] = useState([]);
  const [OnLoadprevFamily, setOnLoadprevFamily] = useState([]);
  const [OnLoadprevPastPertaining, setOnLoadprevPastPertaining] = useState([]);
  const [OnLoadprevPastOther, setOnLoadprevPastOther] = useState([]);
  const [OnLoadImmunization, setOnLoadImmunization] = useState([]);

  useEffect(() => {
    setOnLoadprevTestData(PrevTestResultData);
  }, [PrevTestResultData]);
  useEffect(() => {
    setOnLoadprevTreatment(TreatmentHistoryData);
  }, [TreatmentHistoryData]);
  useEffect(() => {
    setOnLoadprevFamily(FamilyHistoryData);
  }, [FamilyHistoryData]);
  useEffect(() => {
    setOnLoadprevPastPertaining(PertainingIllnessData);
  }, [PertainingIllnessData]);
  useEffect(() => {
    setOnLoadprevPastOther(OtherIllnessData);
  }, [OtherIllnessData]);

  useEffect(() => {
    setOnLoadImmunization(ImmunizationData);
  }, [ImmunizationData]);

  const [OnLoadTreatmentPlanData, setOnLoadTreatmentPlanData] = React.useState(
    [],
  );

  useEffect(() => {
    setOnLoadTreatmentPlanData(TreatmentData);
  }, [TreatmentData]);

  const { fetchLoading } = props;

  const isAppointment = props.location.state
    ? props.location.state.detaildata.resourceId
    : null;

  return (
    <Fragment>
      {!isAppointment ? (
        <Redirect to={history.goBack()} />
      ) : (
        <UserContext.Provider value={user}>
          <div className={classes.mainRoot}>
            <div className={classes.emptyDiv} />
            <Grid container>
              <Grid item xs={12} md={12} className={classes.stickyHeader}>
                {!TotalLoader ? (
                  <Paper>
                    <Header
                      locationState={props.location.state}
                      setOpenEndOfAppointment={setOpenEndOfAppointment}
                      patientDetails={patientDetailsData}
                      openEndOfAppointment={openEndOfAppointment}
                      modalOpen={modalOpen}
                    />
                  </Paper>
                ) : (
                  <HeaderEOCSkelaton />
                )}
              </Grid>

              <Grid item xs={12} md={12}>
                <Formik
                  initialValues={{
                    ...INITIAL_FORM_STATE,
                  }}
                  enableReinitialize={true}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={onSave}
                >
                  {formProps => {
                    // { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleReset, setFieldValue }
                    return (
                      <Form>
                        {setgetValues(formProps.values)}
                        <Paper className={classes.accordationDiv} elevation={0}>
                          {!TotalLoader ? (
                            <>
                              <ErrorBoundary>
                                <BasicDetailsForm
                                  Option={formProps}
                                  SET_BASIC_DETAIL_INITIAL_STATE={
                                    SET_BASIC_DETAIL_INITIAL_STATE
                                  }
                                />
                              </ErrorBoundary>

                              <ErrorBoundary>
                                <MedicalHistoryForm
                                  Id={Id}
                                  Option={formProps}
                                  OnLoadcomrbidata={OnLoadcomrbidata}
                                  OnLoadallergydata={OnLoadallergydata}
                                  OnLoadComplainses={OnLoadComplainses}
                                />
                              </ErrorBoundary>
                              <ErrorBoundary>
                                <PastHospitalizationHistory
                                  Id={Id}
                                  Option={formProps}
                                  SET_PAST_HISTORY_CHECK_INITIAL_STATE={
                                    SET_PAST_HISTORY_CHECK_INITIAL_STATE
                                  }
                                  SET_FAMILY_HISTORY_CHECK_INITIAL_STATE={
                                    SET_FAMILY_HISTORY_CHECK_INITIAL_STATE
                                  }
                                  OnLoadprevTestData={OnLoadprevTestData}
                                  OnLoadprevTreatment={OnLoadprevTreatment}
                                  OnLoadprevFamily={OnLoadprevFamily}
                                  OnLoadprevPastPertaining={
                                    OnLoadprevPastPertaining
                                  }
                                  OnLoadprevPastOther={OnLoadprevPastOther}
                                />
                              </ErrorBoundary>

                              <ErrorBoundary>
                                <PersonalHistory
                                  Id={Id}
                                  Option={formProps}
                                  SET_LIFESTYLE_INITIAL_STATE={
                                    SET_LIFESTYLE_INITIAL_STATE
                                  }
                                  SET_OBS_GYN_INITIAL_STATE={
                                    SET_OBS_GYN_INITIAL_STATE
                                  }
                                  OnLoadImmunization={OnLoadImmunization}
                                />
                              </ErrorBoundary>
                              <Hopi
                                Option={formProps}
                                SET_HOPI_INITIAL_STATE={SET_HOPI_INITIAL_STATE}
                                ChiefComplaintData={ChiefComplaintData}
                                PrevTestResultData={PrevTestResultData}
                                PertainingIllnessData={PertainingIllnessData}
                                TreatmentHistoryData={TreatmentHistoryData}
                                ComorbidityData={ComorbidityData}
                                appointmentId={
                                  props.location.state.detaildata.resourceId
                                }
                                loginDetail={loginDetail}
                                handleGenerateSuccessMessage={
                                  handleGenerateSuccessMessage
                                }
                                Id={Id}
                              />
                              <ErrorBoundary>
                                <GeneralExamination
                                  Id={Id}
                                  loginDetail={loginDetail}
                                  Option={formProps}
                                  SET_SCORE_INITIAL_STATE={
                                    SET_SCORE_INITIAL_STATE
                                  }
                                  SET_VITAL_INITIAL_STATE={
                                    SET_VITAL_INITIAL_STATE
                                  }
                                  SET_LOCAL_SYSTEMIC_INITIAL_STATE={
                                    SET_LOCAL_SYSTEMIC_INITIAL_STATE
                                  }
                                />
                              </ErrorBoundary>
                              <ErrorBoundary>
                                <DiagnososAndStagingForm
                                  Id={Id}
                                  Option={formProps}
                                  SET_DIAGNOSIS_INITIAL_STATE={
                                    SET_DIAGNOSIS_INITIAL_STATE
                                  }
                                  SET_IMPRESSION_VISIT_INITIAL_STATE={
                                    SET_IMPRESSION_VISIT_INITIAL_STATE
                                  }
                                />
                              </ErrorBoundary>
                              <ErrorBoundary>
                                <AdviceSection
                                  Option={formProps}
                                  dateProp={
                                    props.location.state.detaildata
                                      .startDateTime
                                  }
                                  appointmentId={appointmentId}
                                  patientId={Id}
                                />
                              </ErrorBoundary>
                              <ErrorBoundary>
                                <TreatmentPlan
                                  Id={Id}
                                  Option={formProps}
                                  SET_TREATMENT_PROTOCOL_INITIAL_STATE={
                                    SET_TREATMENT_PROTOCOL_INITIAL_STATE
                                  }
                                  OnLoadTreatmentPlanData={
                                    OnLoadTreatmentPlanData
                                  }
                                />
                              </ErrorBoundary>
                              <ErrorBoundary>
                                <Presciptions
                                  Option={formProps}
                                  appointmentId={appointmentId}
                                  patientId={Id}
                                />
                              </ErrorBoundary>
                              <ErrorBoundary>
                                <Discussion
                                  Id={Id}
                                  appointmentId={appointmentId}
                                  SET_DISCUSSION_INITIAL_STATE={
                                    SET_DISCUSSION_INITIAL_STATE
                                  }
                                  SET_ADDITIONAL_NOTE_INITIAL_STATE={
                                    SET_ADDITIONAL_NOTE_INITIAL_STATE
                                  }
                                />
                              </ErrorBoundary>
                              <ScheduleFollowup
                                Option={formProps}
                                SET_FOLLOW_UP_INITIAL_STATE={
                                  SET_FOLLOW_UP_INITIAL_STATE
                                }
                              />
                            </>
                          ) : (
                            <BasicDetailEOCSkelaton />
                          )}
                        </Paper>

                        {checkAllValidation && cancleOpen && (
                          <ExistModel
                            click={modalOpen}
                            open={cancleOpen}
                            cancel={handleClose}
                            Id={Id}
                            appointmentId={
                              props.location.state.detaildata.resourceId
                            }
                            LoadingSave={LoadingSave}
                            data={
                              props.location && props.location.state.detaildata
                            }
                            details={patientDetailsData}
                          />
                        )}

                        <Paper className={classes.centerPaper}>
                          {!TotalLoader ? (
                            <div className={classes.wrapper}>
                              <ButtonComponent
                                variant="contained"
                                color="primary"
                                disabled={LoadingSave || !formProps.isValid}
                              >
                                Submit
                              </ButtonComponent>
                              {LoadingSave && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </div>
                          ) : (
                            <BasicDetailEOCSkelaton />
                          )}
                        </Paper>
                      </Form>
                    );
                  }}
                </Formik>
              </Grid>
            </Grid>
          </div>
        </UserContext.Provider>
      )}
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    getPatientDetails: payload => dispatch(getPatientDetails(payload)),
    doSaveEpisodeOfCare: payload => dispatch(doSaveEpisodeOfCare(payload)),

    loadMedicalHistory: payload => dispatch(loadMedicalHistory(payload)),
    loadPastHistoryEncounterWise: payload =>
      dispatch(loadPastHistoryEncounterWise(payload)),

    loadPastIllnessData: payload => dispatch(loadPastIllnessData(payload)),
    loadPastOtherIllnessData: payload =>
      dispatch(loadPastOtherIllnessData(payload)),

    loadTypesOfTreatment: payload => dispatch(loadTypesOfTreatment(payload)),
    loadPersonalHistory: payload => dispatch(loadPersonalHistory(payload)),

    loadGeneralExamination: payload =>
      dispatch(loadGeneralExamination(payload)),
    loadPatientVitalData: payload => dispatch(loadPatientVitalData(payload)),

    loadDiagnosis: payload => dispatch(loadDiagnosis(payload)),
    loadAdvice: payload => dispatch(loadAdvice(payload)),
    loadTreatmentPlan: payload => dispatch(loadTreatmentPlan(payload)),
    loadTreatmentProtocol: payload => dispatch(loadTreatmentProtocol(payload)),
    loadEncounterWisePrescription: payload =>
      dispatch(loadEncounterWisePrescription(payload)),
    loadEncounterWiseAdditionalData: payload =>
      dispatch(loadEncounterWiseAdditionalData(payload)),

    loadRefferedTo: payload => dispatch(loadRefferedTo(payload)),
    resetReducerStore: () => dispatch(actionsConfig.resetReducerStore()),

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
)(EpisodeOfCare);
