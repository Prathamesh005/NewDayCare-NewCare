import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { useInjectReducer } from '../../utils/injectReducer';
// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { URL_CONSTANTS } from '../graphql/urlConstants';
import {
  GET_All_APPOINTMENTS,
  GET_AVAILABLE_TIME_SLOTS,
  GET_PATIENT_DETAILS_FROM_ID,
  LOAD_All_APPOINTMENTS,
} from './query';
import {
  cancelAppointmentService,
  createAppointmentService,
  editAppointmentService,
} from './serviceCalls';

const initialState = {
  upcommingLoader: true,
  upcommingData: [],
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique

export const fetchAllAppointments = createAsyncThunk(
  'fetchAllAppointments',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(LOAD_All_APPOINTMENTS, {
        fromDate: payload.fromDate,
        toDate: payload.toDate,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchAppointments = createAsyncThunk(
  'fetchAppointments',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_All_APPOINTMENTS(
          payload.practitioner,
          payload.dates,
          payload.patinetValue,
        ),
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchAppointmentSlots = createAsyncThunk(
  'fetchAppointmentSlots',
  async ({ practitionerID, fromDate, toDate }, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_AVAILABLE_TIME_SLOTS, {
        practitionerID,
        fromDate,
        toDate,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getPatientDetails = createAsyncThunk(
  'getPatientDetails',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_PATIENT_DETAILS_FROM_ID, {
        id: payload,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- FOR REST APIS ----------------
export const createAppointment = createAsyncThunk(
  'createAppointment',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveAppointment');
      fetchQuotesConfig.data = createAppointmentService(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const updateAppointment = createAsyncThunk(
  'updateAppointment',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.updateAppointment');
      fetchQuotesConfig.data = editAppointmentService(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const cancelReasonSubmit = createAsyncThunk(
  'cancelReasonSubmit',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.updateAppointment');
      fetchQuotesConfig.data = cancelAppointmentService(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const handleApproveAppointment = createAsyncThunk(
  'handleApproveAppointment',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.updateAppointment');
      fetchQuotesConfig.data = {
        resourceId: payload,
        appointmentStatus: 'Booked',
      };
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const handleMarkAsArrived = createAsyncThunk(
  'handleMarkAsArrived',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.updateAppointment');
      fetchQuotesConfig.data = {
        resourceId: payload,
        appointmentStatus: 'Arrived',
      };
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const appointmentSlice = createSlice({
  name: 'Appointment',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
  },
  // if you want status
  extraReducers: {
    // [`${loadByUpcomingsData.pending}`]: state => {
    //   state.upcommingLoader = true;
    //   return state;
    // },
    // [`${loadByUpcomingsData.rejected}`]: (state, action) => {
    //   const { payload } = action;
    //   state.upcommingLoader = false;
    //   state.upcommingData = [];
    //   return state;
    // },
    // [`${loadByUpcomingsData.fulfilled}`]: (state, action) => {
    //   const { payload } = action;
    //   state.upcommingLoader = false;
    //   state.upcommingData = payload;
    //   return state;
    // },
  },
});

export const { actions: actionsConfig } = appointmentSlice;

export const useAppointmentSlice = () => {
  useInjectReducer({
    key: appointmentSlice.name,
    reducer: appointmentSlice.reducer,
  });
};
