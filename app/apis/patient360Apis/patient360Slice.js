import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//NOTE => Copy this folder and use as per user module name
// Delete unwanted code => if use graphql apis only then remove => rest apis code

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import {
  GET_PATIENT_EVERYTHING,
  GET_TIMELINE,
  GET_PROTOCOL_LIST,
  GET_CRITICAL_EVENTS,
  GET_RELATED_CASES,
  GET_PATIENT_OUTCOMES,
  GET_REPORTS,
} from './query';
import { URL_CONSTANTS } from '../graphql/urlConstants';

// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { useInjectReducer } from '../../utils/injectReducer';

const initialState = {
  patient360Loader: true,
  patient360Result: null,

  relatedCasesData: null,
  patientOutcomesData: null,

  reportsLoader: true,
  reportsData: null,
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique

export const loadPatientEverything = createAsyncThunk(
  'loadPatientEverything',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PATIENT_EVERYTHING, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadPatientTimelineData = createAsyncThunk(
  'loadPatientTimelineData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_TIMELINE, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadCriticalEventsData = createAsyncThunk(
  'loadCriticalEventsData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_YOU));
      const response = await client.query(GET_CRITICAL_EVENTS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getTreatmentList = createAsyncThunk(
  'getTreatmentList',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PROTOCOL_LIST, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadRelatedCasesData = createAsyncThunk(
  'loadRelatedCasesData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_RELATED_CASES, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadPatientOutcomesData = createAsyncThunk(
  'loadPatientOutcomesData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_YOU));
      const response = await client.query(GET_PATIENT_OUTCOMES, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadReportsData = createAsyncThunk(
  'loadReportsData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_REPORTS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- FOR REST APIS ----------------
export const doReportsDownloadData = createAsyncThunk(
  'doReportsDownloadData',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveReportsDownloadData');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const patient360Slice = createSlice({
  name: 'patient360',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
  },
  extraReducers: {
    [`${loadPatientEverything.pending}`]: state => {
      state.patient360Loader = true;
      return state;
    },
    [`${loadPatientEverything.rejected}`]: (state, action) => {
      const { payload } = action;
      state.patient360Loader = false;
      state.patient360Result = null;
      return state;
    },
    [`${loadPatientEverything.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.patient360Loader = false;
      state.patient360Result = payload.data;
      return state;
    },

    //Related Cases
    [`${loadRelatedCasesData.rejected}`]: (state, action) => {
      const { payload } = action;
      state.relatedCasesData = null;
      return state;
    },
    [`${loadRelatedCasesData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.relatedCasesData = payload.data;
      return state;
    },

    // Patient Outcomes
    [`${loadPatientOutcomesData.rejected}`]: (state, action) => {
      const { payload } = action;
      state.patientOutcomesData = null;
      return state;
    },
    [`${loadPatientOutcomesData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.patientOutcomesData = payload.data;
      return state;
    },

    //Reports
    [`${loadReportsData.pending}`]: state => {
      state.reportsLoader = true;
      return state;
    },
    [`${loadReportsData.rejected}`]: (state, action) => {
      const { payload } = action;
      state.reportsLoader = false;
      state.reportsData = null;
      return state;
    },
    [`${loadReportsData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.reportsLoader = false;
      state.reportsData = payload.data;
      return state;
    },
  },
});

export const { actions: actionsConfig } = patient360Slice;

export const usePatient360Slice = () => {
  useInjectReducer({
    key: patient360Slice.name,
    reducer: patient360Slice.reducer,
  });
};
