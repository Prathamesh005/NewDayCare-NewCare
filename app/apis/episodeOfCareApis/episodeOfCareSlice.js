import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { GET_SAMPLE } from './query';
import { URL_CONSTANTS } from '../graphql/urlConstants';

// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { useInjectReducer } from '../../utils/injectReducer';

const initialState = {};

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

//---------------- CREATE SLICE FOR MODULE ----------------
export const episodeOfCareSlice = createSlice({
  name: 'EpisodeOfCare',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
  },
  extraReducers: {},
});

export const { actions: actionsConfig } = episodeOfCareSlice;

export const useEpisodeOfCareSlice = () => {
  useInjectReducer({
    key: episodeOfCareSlice.name,
    reducer: episodeOfCareSlice.reducer,
  });
};
