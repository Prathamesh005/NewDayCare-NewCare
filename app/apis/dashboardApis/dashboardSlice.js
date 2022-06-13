import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import {
  GET_BY_CANCER_TYPE_DATA,
  GET_BY_AGE_DATA,
  GET_BY_UPCOMINGS_DATA,
  GET_BY_TOTAL_DATA,
  GET_BY_TOTAL_INCOME_DATA,
  GET_BY_TOTAL_REFERRAL_DATA,
} from './query';
import { useInjectReducer } from '../../utils/injectReducer';
import { URL_CONSTANTS } from '../graphql/urlConstants';

const initialState = {
  upcommingLoader: true,
  upcommingData: [],
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique

export const loadByCancerTypeData = createAsyncThunk(
  'loadByCancerTypeData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD));
      const response = await client.query(GET_BY_CANCER_TYPE_DATA, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadByAgeData = createAsyncThunk(
  'loadByAgeData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD));
      const response = await client.query(GET_BY_AGE_DATA, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadByUpcomingsData = createAsyncThunk(
  'loadByUpcomingsData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD));
      const response = await client.query(GET_BY_UPCOMINGS_DATA, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadByTotalData = createAsyncThunk(
  'loadByTotalData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD));
      const response = await client.query(GET_BY_TOTAL_DATA, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const loadByTotalIncomeData = createAsyncThunk(
  'loadByTotalIncomeData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD));
      const response = await client.query(GET_BY_TOTAL_INCOME_DATA, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const loadByTotalReferralData = createAsyncThunk(
  'loadByTotalReferralData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR_DASHBOARD));
      const response = await client.query(GET_BY_TOTAL_REFERRAL_DATA, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
  },
  // if you want status
  extraReducers: {
    [`${loadByUpcomingsData.pending}`]: state => {
      state.upcommingLoader = true;
      return state;
    },
    [`${loadByUpcomingsData.rejected}`]: (state, action) => {
      const { payload } = action;
      state.upcommingLoader = false;
      state.upcommingData = [];
      return state;
    },
    [`${loadByUpcomingsData.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.upcommingLoader = false;
      state.upcommingData = payload;
      return state;
    },
  },
});

export const { actions: actionsConfig } = dashboardSlice;

export const useDashboardSlice = () => {
  useInjectReducer({
    key: dashboardSlice.name,
    reducer: dashboardSlice.reducer,
  });
};
