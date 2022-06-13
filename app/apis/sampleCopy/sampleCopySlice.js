import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//NOTE => Copy this folder and use as per user module name
// Delete unwanted code => if use graphql apis only then remove => rest apis code

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { GET_SAMPLE } from './query';
import { URL_CONSTANTS } from '../graphql/urlConstants';

// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { useInjectReducer } from '../../utils/injectReducer';

const initialState = {
  sampleDataPending: false,
  sampleDataError: null,
  sampleData: null,
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique

export const loadSampleData = createAsyncThunk(
  'loadSampleData',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(GET_SAMPLE, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//---------------- FOR REST APIS ----------------
export const doSampleSave = createAsyncThunk(
  'doSampleSave',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.doSampleSave');
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
export const sampleCopySlice = createSlice({
  name: 'sampleCopy',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
  },
  // if you want status
  extraReducers: {
    // [`${loadSampleData.pending}`]: state => {},
    // [`${loadSampleData.rejected}`]: (state, action) => {},
    // [`${loadSampleData.fulfilled}`]: (state, action) => {},
  },
});

export const { actions: actionsConfig } = sampleCopySlice;

export const usesampleCopySlice = () => {
  useInjectReducer({
    key: sampleCopySlice.name,
    reducer: sampleCopySlice.reducer,
  });
};
