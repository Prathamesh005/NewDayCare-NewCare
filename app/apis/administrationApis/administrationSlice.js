import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { URL_CONSTANTS } from '../graphql/urlConstants';

// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { useInjectReducer } from '../../utils/injectReducer';
import { practionerDelete } from './serviceCalls';
import {
  GET_STAFF_LIST,
  GET_LOCATION_LIST,
  GET_LOCATION_DETAILS,
} from './query';

const initialState = {
  tabIndex: 0,
  tabIndexForConfiguration: 0,

  locationList: [],
  locationDetails: null,
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique

export const getStaffList = createAsyncThunk(
  'getStaffList',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_STAFF_LIST, payload);
      let value =
        response.data &&
        response.data.cancerPractitioner &&
        response.data.cancerPractitioner.length > 0
          ? response.data.cancerPractitioner
          : [];
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getLocationList = createAsyncThunk(
  'getLocationList',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_LOCATION_LIST, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getLocationDetails = createAsyncThunk(
  'getLocationDetails',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_LOCATION_DETAILS, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- FOR REST APIS ----------------
export const doPractionerDelete = createAsyncThunk(
  'doPractionerDelete',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Administration.deletePractioner');
      fetchQuotesConfig.data = practionerDelete(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doPractionerSave = createAsyncThunk(
  'doPractionerSave',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Administration.savePractioner');
      fetchQuotesConfig.data = payload;
      console.log('fetchQuotesConfig.data', fetchQuotesConfig.data);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doPractionerEdit = createAsyncThunk(
  'doPractionerEdit',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Administration.editPractioner');
      fetchQuotesConfig.data = payload;
      console.log('doPractionerEdit', fetchQuotesConfig.data);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doAdminBundleSave = createAsyncThunk(
  'doAdminBundleSave',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Administration.bundleSave');
      fetchQuotesConfig.data = payload;
      console.log('fetchQuotesConfig.data', fetchQuotesConfig.data);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const administrationSlice = createSlice({
  name: 'Administration',
  initialState,
  reducers: {
    resetAdministrationStore() {
      return {
        ...initialState,
      };
    },
    updateAdministrationByKeyVal(state, action) {
      state[action.payload.key] = action.payload.data;
    },
  },

  extraReducers: {
    [`${getLocationList.rejected}`]: (state, action) => {
      state.locationList = [];
      return state;
    },
    [`${getLocationList.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.locationList =
        payload.data && payload.data.cancerLocations
          ? payload.data.cancerLocations &&
            payload.data.cancerLocations.map(ele => ele.location)
          : [];
      return state;
    },

    [`${getLocationDetails.rejected}`]: (state, action) => {
      state.locationDetails = null;
      return state;
    },
    [`${getLocationDetails.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.locationDetails =
        payload.data && payload.data.location ? payload.data.location : null;
      return state;
    },
  },
});

export const { actions: actionsConfig } = administrationSlice;

export const useAdministrationSlice = () => {
  useInjectReducer({
    key: administrationSlice.name,
    reducer: administrationSlice.reducer,
  });
};
