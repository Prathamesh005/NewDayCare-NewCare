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
  GET_BILL_SUMMARY_FROM_DATE,
  GET_INVOICES_FROM_DATE,
  GET_INVOICES_FROM_SEARCH,
  GET_NEWSERVICE_VALUESET,
} from './query';
import { saveFinilizeBillService, savePDFInvoiceService } from './serviceCalls';

const initialState = {
  upcommingLoader: true,
  upcommingData: [],
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique

export const fetchInvoicesFromDate = createAsyncThunk(
  'fetchInvoicesFromDate',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_INVOICES_FROM_DATE, {
        toDate: payload.toDate,
        fromDate: payload.fromDate,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchSummaryDataFromDate = createAsyncThunk(
  'fetchSummaryDataFromDate',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_BILL_SUMMARY_FROM_DATE, {
        toDate: payload.toDate,
        fromDate: payload.fromDate,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchListOfInvoicesFromSearch = createAsyncThunk(
  'fetchListOfInvoicesFromSearch',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_INVOICES_FROM_SEARCH, {
        toDate: payload.toDate,
        fromDate: payload.fromDate,
        input: payload.input,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchPatientDataFrmId = createAsyncThunk(
  'fetchPatientDataFrmId',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_INVOICES_FROM_SEARCH, {
        toDate: payload.toDate,
        fromDate: payload.fromDate,
        input: payload.input,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchNewServiceValueSet = createAsyncThunk(
  'fetchNewServiceValueSet',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_NEWSERVICE_VALUESET);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- FOR REST APIS ----------------
export const savePDFInvoice = createAsyncThunk(
  'savePDFInvoice',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.savePDF');
      fetchQuotesConfig.data = savePDFInvoiceService(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const saveFinilizeBill = createAsyncThunk(
  'saveFinilizeBill',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.saveFinilizeBill');
      fetchQuotesConfig.data = saveFinilizeBillService(payload);
      const apiInstance = new ApiService(fetchQuotesConfig);
      const result = await apiInstance.call();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const billingSlice = createSlice({
  name: 'Billing',
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

export const { actions: actionsConfig } = billingSlice;

export const useBillingSlice = () => {
  useInjectReducer({
    key: billingSlice.name,
    reducer: billingSlice.reducer,
  });
};
