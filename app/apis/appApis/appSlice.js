import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { GET_SAMPLE } from './query';
import { URL_CONSTANTS } from '../graphql/urlConstants';

// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { generateOtp, login } from './serviceCalls';
import { clearLocalStorage } from '../../utils/authHelper';

const initialState = {
  authData: null,
  isSidebarOpen: false,
  updateCount:true
};

//---------------- FOR REST APIS ----------------
export const doLogin = createAsyncThunk(
  'doLogin',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.getAuthentication');
      fetchQuotesConfig.data = login(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const doLogout = createAsyncThunk(
  'doLogout',
  async (payload, thunkAPI) => {
    try {
      clearLocalStorage();
      window.location.reload();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doGenerateOtp = createAsyncThunk(
  'doGenerateOtp',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.getOtp');
      fetchQuotesConfig.data = generateOtp(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const appSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
    resetReducerStore() {
      return {
        ...initialState,
      };
    },

    loginSuccess(state, action) {
      state.authData = action.payload;
    },

    updateGlobelByKeyVal(state, action) {
      state[action.payload.key] = action.payload.data;
    },
  },
  // if you want status
  extraReducers: {
    [`${doLogin.rejected}`]: (state, action) => {
      state.authData = null;
    },
    [`${doLogin.fulfilled}`]: (state, action) => {
      state.authData = action.payload.data;
    },
  },
});

export const { actions: actionsConfig } = appSlice;
