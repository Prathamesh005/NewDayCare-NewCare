import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import {
  GET_BY_VALUESET,
  GET_BY_DIAGNOSIS_VALUESET,
  GET_PROVIDER_NAME,
  GET_PATIENT_VITAL,
  GET_HOPI,
  GET_HOPI_ENCOUNTER_WISE,
  GET_PAST_ILLNESS,
  GET_PAST_OTHER_ILLNESS,
  GET_MEDICAL_HISTORY,
  GET_PAST_HISTORY_ENCOUNTER_WISE,
  GET_TYPES_OF_TREATMENT,
  GET_PERSONAL_HISTORY,
  GET_PATIENT_LIST_FROM_SEARCH,
  GET_PRACTITIONER_LIST,
  GET_GENERAL_EXAMINATION,
  CANCER_GERIATRIC_ASSESSMENT_SET,
  GET_DIAGNOSIS,
  GET_ADVICE,
  GET_TREATMENT_PLAN,
  GET_TREATMENT_PROTOCOL,
  GET_TREATMENT_PROTOCOL_VALUESET,
  GET_ENCOUNTER_WISE_PRESCRIBED,
  GET_ENCOUNTER_WISE_ADDITIONAL_DATA,
  GET_REFERRED_TO,
  GET_PATIENT_DETAILS,
  GET_PATIENT_VITAL_ENCOUNTER_WISE,
  GET_PRACTITIONER_DETAILS,
  GET_APPOINTMENT_DETAILS,
  GET_GENERAL_EXAMINATION_ENCOUNTER_WISE,
  GET_NOTIFICATION_DETAILS,
} from './query';

// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { URL_CONSTANTS } from '../graphql/urlConstants';
import {
  searchMolecularTest,
  searchTests,
  searchDrugs,
  saveBmiBsa,
} from './serviceCalls';

//directly access from const mapStateToProps = state => state.globalReducerThunk;
const initialState = {
  patientListData: [],
  patientDetails: null,
  patientDetailsData: null,

  practitionerList: [],
  practitionerDetails: null,

  appointmentDetailsData: null,

  HOPILoader: true,
  HOPIData: null,
  HOPIDescription: null,

  HOPIEncounterWiseData: null,
  HOPIEncounterWiseDescription: null,

  pastPertainingIllnessLoader: true,
  pastPertainingIllnessData: [],

  pastOtherIllnessLoader: true,
  pastOtherIllnessData: [],

  comorbidData: [],
  allergyData: [],
  familyHistoryData: [],

  chiefComplaintData: [],
  prevTestResultData: [],
  impressionForVisitData: [],
  appointmentSummaryDate: null,

  typesOfTreatment: [],

  immunizationData: [],
  obsGynData: null,
  lifestyleIndicatorData: [],

  generalExaminationData: null,
  ecogData: null,
  kScoreData: null,
  inspectionData: null,
  palpationData: null,
  cancerGeriatricAssessmentResult: null,

  genAndSysExaminationDataEncounter: null,
  ecogDataEncounter: null,
  kScoreDataEncounter: null,

  vitalData: null,
  vitalDataEncounterWise: null,

  cancerGeriatricAssResultStore: null,

  diagnosisData: null,
  molecularTesting: [],

  adviceData: [],
  treatmentPlanData: [],
  treatmentIntentData: null,
  treatmentPlanTotalData: null,

  treatmentProtocolData: null,

  prescriptionData: null,
  prescriptionLoader: true,

  discussionData: null,
  additionalNoteData: null,
  scheduleFollowUpData: null,

  refferedToData: [],

  //notification
  actdata: [],
  id: null,
  searchListLoading: false,
  searchresultdata: [],
  searchresulterror: null,
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same

// -------valuesets -------
export const valueSetSearch = createAsyncThunk(
  'valueSetSearch',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.MASTER_DATA));
      const response = await client.query(GET_BY_VALUESET, payload);
      let value = Object.assign({}, response.data && response.data.valueSets);
      if (payload && payload.systemUrl) {
        return (
          (value &&
            value[0] &&
            value[0].valueSet &&
            value[0].valueSet.compose &&
            value[0].valueSet.compose.include &&
            value[0].valueSet.compose.include[0]) ||
          ''
        );
      } else {
        return (
          (value &&
            value[0] &&
            value[0].valueSet &&
            value[0].valueSet.compose &&
            value[0].valueSet.compose.include &&
            value[0].valueSet.compose.include[0] &&
            value[0].valueSet.compose.include[0].concept) ||
          []
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const diagnosisValueSetSearch = createAsyncThunk(
  'diagnosisValueSetSearch',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.MASTER_DATA));
      const response = await client.query(GET_BY_DIAGNOSIS_VALUESET(payload));
      let value = Object.assign({}, response.data && response.data.valueSet);
      return (
        (value &&
          value.compose &&
          value.compose.include[0] &&
          value.compose.include[0].concept) ||
        []
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//insurance provider
export const providerNameSet = createAsyncThunk(
  'providerNameSet',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PROVIDER_NAME, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Geriatric Assessment Questions Set
export const cancerGeriatricAssessmentQuestionSet = createAsyncThunk(
  'cancerGeriatricAssessmentQuestionSet',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_YOU));
      const response = await client.query(
        CANCER_GERIATRIC_ASSESSMENT_SET,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Treatment Protocol Valueset
export const treatmentProtocolValueset = createAsyncThunk(
  'treatmentProtocolValueset',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_TREATMENT));
      const response = await client.query(
        GET_TREATMENT_PROTOCOL_VALUESET,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// -------valuesets  end-------

//----------------------------get patient list with search-------------------------------
export const getPatientList = createAsyncThunk(
  'getPatientList',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_PATIENT_LIST_FROM_SEARCH,
        payload,
      );
      let value = Object.assign({}, response && response);
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//----------------------------get patient information-------------------------------
export const getPatientDetails = createAsyncThunk(
  'getPatientDetails',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PATIENT_DETAILS, payload);
      let value = Object.assign({}, response && response);
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//----------------------------get practitioner list with search-------------------------------
export const getPractitionerList = createAsyncThunk(
  'getPractitionerList',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PRACTITIONER_LIST, { payload });
      let value = Object.assign({}, response && response);
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//----------------------------get practitioner details-------------------------------
export const getPractitionerDetails = createAsyncThunk(
  'getPractitionerDetails',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PRACTITIONER_DETAILS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//----------------------------get Appointment details-------------------------------
export const getAppointmentDetails = createAsyncThunk(
  'getAppointmentDetails',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_APPOINTMENT_DETAILS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//vitals
export const loadPatientVitalData = createAsyncThunk(
  'loadPatientVitalData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_YOU));
      const response = await client.query(GET_PATIENT_VITAL, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//encounter wise vitals
export const loadPatientVitalEncounterWise = createAsyncThunk(
  'loadPatientVitalEncounterWise',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_YOU));
      const response = await client.query(
        GET_PATIENT_VITAL_ENCOUNTER_WISE,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//hopi loadHOPISummary=>loadHOPI
export const loadHOPI = createAsyncThunk(
  'loadHOPI',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_HOPI, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadHOPIEncounterWise = createAsyncThunk(
  'loadHOPIEncounterWise',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_HOPI_ENCOUNTER_WISE, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Past Pertaining Illness
export const loadPastIllnessData = createAsyncThunk(
  'loadPastIllnessData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PAST_ILLNESS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Past Other Illness
export const loadPastOtherIllnessData = createAsyncThunk(
  'loadPastOtherIllnessData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PAST_OTHER_ILLNESS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Medical history
export const loadMedicalHistory = createAsyncThunk(
  'loadMedicalHistory',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_MEDICAL_HISTORY, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Past History Encounter Wise
// ---prev test result,chief complaint,impression of visit
export const loadPastHistoryEncounterWise = createAsyncThunk(
  'loadPastHistoryEncounterWise',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_PAST_HISTORY_ENCOUNTER_WISE,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Type of treatment
export const loadTypesOfTreatment = createAsyncThunk(
  'loadTypesOfTreatment',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_TYPES_OF_TREATMENT, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//personal history
export const loadPersonalHistory = createAsyncThunk(
  'loadPersonalHistory',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PERSONAL_HISTORY, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//General examination
export const loadGeneralExamination = createAsyncThunk(
  'loadGeneralExamination',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_GENERAL_EXAMINATION, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//General examination encounter wise
export const loadGeneralExaminationEncounterWise = createAsyncThunk(
  'loadGeneralExaminationEncounterWise',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_GENERAL_EXAMINATION_ENCOUNTER_WISE,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Diagnosis
export const loadDiagnosis = createAsyncThunk(
  'loadDiagnosis',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_DIAGNOSIS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//advice
export const loadAdvice = createAsyncThunk(
  'loadAdvice',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_ADVICE, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Treatment Plan
export const loadTreatmentPlan = createAsyncThunk(
  'loadTreatmentPlan',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_TREATMENT_PLAN, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Treatment Protocol
export const loadTreatmentProtocol = createAsyncThunk(
  'loadTreatmentProtocol',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_TREATMENT_PROTOCOL, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Encounter Wise Prescription
export const loadEncounterWisePrescription = createAsyncThunk(
  'loadEncounterWisePrescription',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_ENCOUNTER_WISE_PRESCRIBED,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Encounter Wise Additional Data
export const loadEncounterWiseAdditionalData = createAsyncThunk(
  'loadEncounterWiseAdditionalData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_ENCOUNTER_WISE_ADDITIONAL_DATA,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Referred To
export const loadRefferedTo = createAsyncThunk(
  'loadRefferedTo',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_REFERRED_TO, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//notification

export const loadNotification = createAsyncThunk(
  'loadNotification',
  async (payload, thunkAPI) => {
    const id = payload.id;
    const url = payload.url;
    const limit = payload.limit;
    const resourceId = payload.resourceId;
    try {
      const client = new GQLClient(
        Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD_NOTIFICATION),
      );
      const response = await client.query(
        GET_NOTIFICATION_DETAILS(url, limit, resourceId),
      );
      return { response, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- FOR REST APIS ----------------
export const doPatientSave = createAsyncThunk(
  'doPatientSave',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.savePatient');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doNotificationRead = createAsyncThunk(
  'doNotificationRead',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.readNotification');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSearchTests = createAsyncThunk(
  'doSearchTests',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.searchTests');
      fetchQuotesConfig.data = searchTests(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSearchMolecularTest = createAsyncThunk(
  'doSearchMolecularTest',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.searchMolecularTest');
      fetchQuotesConfig.data = searchMolecularTest(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSearchDrug = createAsyncThunk(
  'doSearchDrug',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.searchDrugs');
      fetchQuotesConfig.data = searchDrugs(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSaveEpisodeOfCare = createAsyncThunk(
  'doSaveEpisodeOfCare',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveEpisodeOfCare');
      fetchQuotesConfig.data = payload;
      console.log(JSON.stringify(fetchQuotesConfig.data));
      // debugger
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSaveBmiBsa = createAsyncThunk(
  'doSaveBmiBsa',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveBmiBsa');
      fetchQuotesConfig.data = saveBmiBsa(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doGenerateHOPIviaAI = createAsyncThunk(
  'doGenerateHOPIviaAI',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveGenerateHopi');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSaveCancerGeriatricAssessment = createAsyncThunk(
  'doSaveCancerGeriatricAssessment',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveScoreResult');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSaveDiagnosisStage = createAsyncThunk(
  'doSaveDiagnosisStage',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveDiagnosisStage');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const doSharePDF = createAsyncThunk(
  'doSharePDF',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.sharePDF');
      fetchQuotesConfig.data = {
        resourceId: payload.documentId, //document id
        display: payload.patientId, //patient id
        resourceType: payload.resourceType,
      };
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doSavePDF = createAsyncThunk(
  'doSavePDF',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.savePdf');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const globalSlice = createSlice({
  name: 'globalApp',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
    resetReducerStore() {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: {
    [`${getPatientList.rejected}`]: (state, action) => {
      state.patientListData = [];
      return state;
    },
    [`${getPatientList.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.patientListData = payload.data.cancerPatients
        ? payload.data.cancerPatients
        : [];
      return state;
    },

    [`${getPatientDetails.rejected}`]: (state, action) => {
      state.patientDetails = null;
      state.patientDetailsData = null;
      return state;
    },
    [`${getPatientDetails.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.patientDetails = payload.data.patient;
      state.patientDetailsData = payload.data;
      return state;
    },

    [`${getPractitionerList.rejected}`]: (state, action) => {
      state.practitionerList = [];
      return state;
    },
    [`${getPractitionerList.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.practitionerList =
        payload.data &&
        payload.data.cancerPractitioner &&
        payload.data.cancerPractitioner.length > 0
          ? payload.data.cancerPractitioner
          : [];
      return state;
    },

    [`${getPractitionerDetails.rejected}`]: (state, action) => {
      state.practitionerDetails = null;
      return state;
    },
    [`${getPractitionerDetails.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.practitionerDetails =
        payload.data && payload.data.practitioner
          ? payload.data.practitioner
          : null;

      return state;
    },

    [`${getAppointmentDetails.rejected}`]: (state, action) => {
      state.appointmentDetailsData = null;
      return state;
    },
    [`${getAppointmentDetails.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.appointmentDetailsData = payload.data;
      return state;
    },

    //hopi
    [`${loadHOPI.pending}`]: state => {
      state.HOPILoader = true;
      return state;
    },
    [`${loadHOPI.rejected}`]: (state, action) => {
      const { payload } = action;
      state.HOPILoader = false;
      state.HOPIData = null;
      state.HOPIDescription = null;
      return state;
    },
    [`${loadHOPI.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.HOPILoader = false;
      state.HOPIData =
        payload.data &&
        payload.data.cancerDocumentReferences &&
        payload.data.cancerDocumentReferences.length > 0
          ? payload.data.cancerDocumentReferences[0]
            ? payload.data.cancerDocumentReferences[0].cancerDocumentReference
            : null
          : null;
      state.HOPIDescription =
        payload.data &&
        payload.data.cancerDocumentReferences &&
        payload.data.cancerDocumentReferences.length > 0
          ? payload.data.cancerDocumentReferences[0]
            ? payload.data.cancerDocumentReferences[0].cancerDocumentReference
              ? payload.data.cancerDocumentReferences[0].cancerDocumentReference
                  .description
                ? payload.data.cancerDocumentReferences[0]
                    .cancerDocumentReference.description
                : null
              : null
            : null
          : null;
      return state;
    },
    //hopi end

    //hopi Encounter Wise
    [`${loadHOPIEncounterWise.rejected}`]: (state, action) => {
      state.HOPIEncounterWiseData = null;
      state.HOPIEncounterWiseDescription = null;
      return state;
    },
    [`${loadHOPIEncounterWise.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.HOPIEncounterWiseData =
        payload.data &&
        payload.data.cancerDocumentReferences &&
        payload.data.cancerDocumentReferences.length > 0
          ? payload.data.cancerDocumentReferences[0]
            ? payload.data.cancerDocumentReferences[0].cancerDocumentReference
            : null
          : null;
      state.HOPIEncounterWiseDescription =
        payload.data &&
        payload.data.cancerDocumentReferences &&
        payload.data.cancerDocumentReferences.length > 0
          ? payload.data.cancerDocumentReferences[0]
            ? payload.data.cancerDocumentReferences[0].cancerDocumentReference
              ? payload.data.cancerDocumentReferences[0].cancerDocumentReference
                  .description
                ? payload.data.cancerDocumentReferences[0]
                    .cancerDocumentReference.description
                : null
              : null
            : null
          : null;

      return state;
    },
    //hopi Encounter Wise end

    //Past Pertaining Illness
    [`${loadPastIllnessData.pending}`]: state => {
      state.pastPertainingIllnessLoader = true;
      return state;
    },
    [`${loadPastIllnessData.rejected}`]: (state, action) => {
      const { payload } = action;
      state.pastPertainingIllnessLoader = false;
      state.pastPertainingIllnessData = [];
      return state;
    },
    [`${loadPastIllnessData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.pastPertainingIllnessLoader = false;
      state.pastPertainingIllnessData =
        payload.data.pastHospitalizationPertainingIllness;
      return state;
    },
    //Past Pertaining Illness end

    //Past Pertaining Illness
    [`${loadPastOtherIllnessData.pending}`]: state => {
      state.pastOtherIllnessLoader = true;
      return state;
    },
    [`${loadPastOtherIllnessData.rejected}`]: (state, action) => {
      const { payload } = action;
      state.pastOtherIllnessLoader = false;
      state.pastOtherIllnessData = [];
      return state;
    },
    [`${loadPastOtherIllnessData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.pastOtherIllnessLoader = false;
      state.pastOtherIllnessData = payload.data.pastHospitalizationOtherIllness;
      return state;
    },
    //Past Pertaining Illness end

    //Medical History
    [`${loadMedicalHistory.rejected}`]: (state, action) => {
      state.comorbidData = [];
      state.allergyData = [];
      state.familyHistoryData = [];
      return state;
    },
    [`${loadMedicalHistory.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.comorbidData = payload.data.comorbidConditions;
      state.allergyData = payload.data.cancerAllergyIntolerances;
      state.familyHistoryData = payload.data.familyMemberHistories;
      return state;
    },
    //Medical History end

    //Past History Encounter Wise
    [`${loadPastHistoryEncounterWise.rejected}`]: (state, action) => {
      state.chiefComplaintData = [];
      state.prevTestResultData = [];
      state.impressionForVisitData = [];
      state.appointmentSummaryDate = null;
      return state;
    },
    [`${loadPastHistoryEncounterWise.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.chiefComplaintData = payload.data.clinicalComplainses;
      state.prevTestResultData = payload.data.cancerDiagnosticReports;
      state.impressionForVisitData = payload.data.cancerClinicalImpressions;
      state.appointmentSummaryDate = payload.data.appointmentSummaryDate;
      return state;
    },
    //Past History Encounter Wise end

    //Types Of Treatment
    [`${loadTypesOfTreatment.rejected}`]: (state, action) => {
      state.typesOfTreatment = [];
      return state;
    },
    [`${loadTypesOfTreatment.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.typesOfTreatment = payload.data.treatmentEvents;
      return state;
    },
    //Types Of Treatment end

    //personal history
    [`${loadPersonalHistory.rejected}`]: (state, action) => {
      state.immunizationData = [];
      state.obsGynData = null;
      state.lifestyleIndicatorData = [];
      return state;
    },
    [`${loadPersonalHistory.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.immunizationData = payload.data.cancerImmunizations;
      state.obsGynData = payload.data.oBGYNObservation;
      state.lifestyleIndicatorData = payload.data.lifeStyleIndicators;
      return state;
    },
    //personal history end

    //General examination
    [`${loadGeneralExamination.rejected}`]: (state, action) => {
      state.generalExaminationData = null;
      state.ecogData = null;
      state.kScoreData = null;
      state.inspectionData = null;
      state.palpationData = null;
      state.cancerGeriatricAssessmentResult = null;

      return state;
    },
    [`${loadGeneralExamination.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.generalExaminationData = payload.data;
      state.ecogData = payload.data.eCOGPerformanceStatus;
      state.kScoreData = payload.data.karnofskyPerformanceStatus;
      state.inspectionData = payload.data.inspection;
      state.palpationData = payload.data.palpation;
      state.cancerGeriatricAssessmentResult =
        payload.data.cancerGeriatricAssessment;
      return state;
    },
    //General examination end

    //General examination encounter wise
    [`${loadGeneralExaminationEncounterWise.rejected}`]: (state, action) => {
      state.genAndSysExaminationDataEncounter = null;
      state.ecogDataEncounter = null;
      state.kScoreDataEncounter = null;
      return state;
    },
    [`${loadGeneralExaminationEncounterWise.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.genAndSysExaminationDataEncounter = payload.data;
      state.ecogDataEncounter = payload.data.eCOGPerformanceStatus;
      state.kScoreDataEncounter = payload.data.karnofskyPerformanceStatus;
      return state;
    },
    //General examination encounter wise end

    //Vital
    [`${loadPatientVitalData.rejected}`]: (state, action) => {
      state.vitalData = null;
      return state;
    },
    [`${loadPatientVitalData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.vitalData = payload.data;
      return state;
    },
    //Vital end

    //Vital encounter wise
    [`${loadPatientVitalEncounterWise.rejected}`]: (state, action) => {
      state.vitalDataEncounterWise = null;
      return state;
    },
    [`${loadPatientVitalEncounterWise.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.vitalDataEncounterWise = payload.data;
      return state;
    },
    //Vital encounter wise end

    //Cancer Geriatric Assessment
    [`${doSaveCancerGeriatricAssessment.rejected}`]: (state, action) => {
      state.cancerGeriatricAssResultStore = null;
      return state;
    },
    [`${doSaveCancerGeriatricAssessment.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.cancerGeriatricAssResultStore = payload.data.totalScore;
      return state;
    },
    //Cancer Geriatric Assessment end

    //diagnosis
    [`${loadDiagnosis.rejected}`]: (state, action) => {
      state.diagnosisData = null;
      state.molecularTesting = [];
      return state;
    },
    [`${loadDiagnosis.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.diagnosisData = payload.data;
      state.molecularTesting = payload.data.molecularTests;
      return state;
    },
    //diagnosis end

    //Advice
    [`${loadAdvice.rejected}`]: (state, action) => {
      state.adviceData = [];
      return state;
    },
    [`${loadAdvice.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.adviceData = payload.data.cancerServiceRequests;
      return state;
    },
    //Advice end

    //Treatment plan
    [`${loadTreatmentPlan.rejected}`]: (state, action) => {
      state.treatmentPlanData = [];
      state.treatmentIntentData = null;
      state.treatmentPlanTotalData = null;
      return state;
    },
    [`${loadTreatmentPlan.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.treatmentPlanData = payload.data.treatmentPlans;
      state.treatmentIntentData = payload.data.treatmentIntent;
      state.treatmentPlanTotalData = payload.data;
      return state;
    },
    //Treatment plan end

    //Treatment plan
    [`${loadTreatmentProtocol.rejected}`]: (state, action) => {
      state.treatmentProtocolData = null;
      return state;
    },
    [`${loadTreatmentProtocol.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.treatmentProtocolData = payload.data;
      return state;
    },
    //Treatment plan end

    //Encounter Wise Prescription
    [`${loadEncounterWisePrescription.pending}`]: state => {
      state.prescriptionLoader = true;
      return state;
    },
    [`${loadEncounterWisePrescription.rejected}`]: (state, action) => {
      state.prescriptionData = null;
      state.prescriptionLoader = false;
      return state;
    },
    [`${loadEncounterWisePrescription.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.prescriptionData = payload.data.cancerMedicationRequests;
      state.prescriptionLoader = false;
      return state;
    },
    //Encounter Wise Prescription end

    //Encounter Wise Additional Data
    [`${loadEncounterWiseAdditionalData.rejected}`]: (state, action) => {
      state.discussionData = null;
      state.additionalNoteData = null;
      state.scheduleFollowUpData = null;
      return state;
    },
    [`${loadEncounterWiseAdditionalData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.discussionData = payload.data.discussionCommunication;
      state.additionalNoteData = payload.data.visitNote;
      state.scheduleFollowUpData = payload.data.scheduledFollowup;
      return state;
    },
    //Encounter Wise Additional Data end

    // Referred To Data
    [`${loadRefferedTo.rejected}`]: (state, action) => {
      state.refferedToData = [];
      return state;
    },
    [`${loadRefferedTo.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.refferedToData = payload.data.refferedTo;
      return state;
    },
    // Referred To Data end

    //notification
    [`${loadNotification.rejected}`]: (state, action) => {
      state.searchListLoading = false;
      // NOTE: console and check action object for error message path
      state.searchresulterror = action.payload && action.payload.message;
      return state;
    },
    [`${loadNotification.fulfilled}`]: (state, action) => {
      const { id, response } = action.payload;
      let currentdata = [...(state.actdata || [])];
      if (id === 1 && response.data.recordCount !== null) {
        currentdata.push(...response.data.communications);
      }

      if (id === 0 && response.data.recordCount !== null) {
        currentdata = [];
        currentdata.push(...response.data.communications);
      }
      if (response.data.recordCount === null) {
        currentdata = [];
      }
      state.actdata = currentdata;
      state.searchresultdata = response.data;
      state.searchListLoading = false;
      state.searchresulterror = null;
      return state;
    },
  },
});

export const { actions: actionsConfig } = globalSlice;
