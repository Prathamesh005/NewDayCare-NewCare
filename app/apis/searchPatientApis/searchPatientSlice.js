import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useInjectReducer } from '../../utils/injectReducer';

// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { GET_SEARCH_PATIENT } from './query';
import { URL_CONSTANTS } from '../graphql/urlConstants';

const initialState = {
  actdata: [],
  id: null,
  searchListLoading: false,
  searchresultdata: [],
  searchresulterror: null,
};

export const loadSearchPatientData = createAsyncThunk(
  'loadSearchPatientData',
  async (payload, thunkAPI) => {
    const id = payload.id;
    const url = payload.url;
    const limit = payload.limit;
    const search = payload.search;
    const value = payload.value;
    const ageValue0 = JSON.stringify(`${payload.ageValue[0]}`);
    const ageValue1 = JSON.stringify(`${payload.ageValue[1]}`);
    const gValue = payload.gValue;
    const ecogValue = JSON.stringify(
      `${payload.ecogValue[0]}-${payload.ecogValue[1]}`,
    );
    const activeScore = payload.activeScore;
    const activeStage = payload.activeStage;

    const activeType = payload.activeType;
    const activeFilter =
      payload.cancerValue != null
        ? [...payload.activeFilter, payload.cancerValue]
        : payload.activeFilter;

    try {
      const client = new GQLClient(Routes.AUTH(URL_CONSTANTS.EMR));
      const response = await client.query(
        GET_SEARCH_PATIENT(
          url,
          limit,
          search,
          value,
          ageValue0,
          ageValue1,
          gValue,
          ecogValue,
          activeScore,
          activeStage,
          activeFilter,
          activeType,
        ),
      );
      return { response, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const searchPatientSlice = createSlice({
  name: 'searchPatient',
  initialState,
  reducers: {
    //this is use only for without hit apis and manage state locally
  },
  extraReducers: {
    // ----------------- search patients start -----------------
    [`${loadSearchPatientData.pending}`]: state => {
      // NOTE : only use when you are using loading in component
      state.searchListLoading = true;
      return state;
    },
    [`${loadSearchPatientData.rejected}`]: (state, action) => {
      // NOTE: only use when you are using loading in component
      state.searchListLoading = false;
      // NOTE: console and check action object for error message path
      state.searchresulterror = action.payload.message;
      return state;
    },
    // NOTE: this run when api request
    [`${loadSearchPatientData.fulfilled}`]: (state, action) => {
      const { id, response } = action.payload;

      let currentdata = [...(state.actdata || [])];
      if (id === 1 && response.data.recordCount !== null) {
        currentdata.push(...response.data.cancerPatients);
      }

      if (id === 0 && response.data.recordCount !== null) {
        currentdata = [];
        currentdata.push(...response.data.cancerPatients);
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
    //----------------- search patients end -----------------
  },
});

export const { actions: actionsConfig } = searchPatientSlice;
/**
 * Let's turn this into a hook style usage.
 * This will inject the slice to redux store and return actions in case you want to use in the component
 */
export const useSearchPatientSlice = () => {
  useInjectReducer({
    key: searchPatientSlice.name,
    reducer: searchPatientSlice.reducer,
  });
};
