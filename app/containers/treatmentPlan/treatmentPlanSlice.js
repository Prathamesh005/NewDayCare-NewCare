import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useInjectReducer } from '../../utils/injectReducer';

// for gql call
import GQLClient from '../../apis/graphql/graphqlClient';
import Routes from './routes';
import { GET_SET_LIST } from './query';

//for rest call
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';

// import {
//     handleResponse, postRequest, preRequest,
// } from "../../../../utils/APIHandler";

const initialState = {
  intentList: [],
  intentError: null,
  intentLoading: true,
  isImpersonateLogin: true,

  //
  gteDATaPending: false,
};

// NOTE : function name and key name should me unique and same name we user to crate reducer using same name
// Key Name:  "listCourses"
export const listCourses = createAsyncThunk(
  'listCourses',
  async (payload, thunkAPI) => {
    try {
      const client = new GQLClient(Routes.AUTH.GET_INTENT_SET);
      const response = await client.query(GET_SET_LIST, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// NOTE : REST API CALL
// PENDING : Test is pending
export const findTreatmentProtocol = createAsyncThunk(
  'findTreatmentProtocol',
  async (payload, thunkAPI) => {
    try {
      const fetchQuotesConfig = getConfig('Auth.findTreatmentProtocol');
      fetchQuotesConfig.data = payload;
      const apiInstance = new ApiService(fetchQuotesConfig);
      return apiInstance.call();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const treatmentPlanSlice = createSlice({
  name: 'treatmentPlan',
  initialState,
  reducers: {
    clearImpersonateLogin(state, action) {
      state.name = action.name;
      state.id = action.id;
      state.isMenu = action.isMenu;
      state.isImpersonateLogin = false;
      return { ...state, ...action };
    },
  },
  extraReducers: {
    // List Courses Status

    [`${listCourses.pending}`]: state => {
      // NOTE : only use when you are using loading in component
      state.listCoursesPending = true;
      return state;
    },
    [`${listCourses.rejected}`]: (state, action) => {
      // NOTE: only use when you are using loading in component
      state.listCoursesPending = false;
      // NOTE: console and  check action object for error message path
      state.error = action.error.message;
      return state;
    },

    // NOTE: this run when api request
    [`${listCourses.fulfilled}`]: (state, action) => {
      const { payload } = action;
      state.listCoursesPending = payload;
      console.log('actions-->>>  listCourses  >>  fulfilled', payload);
      return state;
    },

    //findTreatmentProtocol
    [`${findTreatmentProtocol.pending}`]: state => {
      state.listCoursesPending = true;
      console.log('actions-->>>  listCourses  >>  pending');
      return state;
    },
    [`${findTreatmentProtocol.rejected}`]: (state, action) => {
      state.listCoursesPending = false;
      state.error = action.error.message;
      console.log('actions-->>>  listCourses  >>  rejected', action);
      return state;
    },
    [`${findTreatmentProtocol.fulfilled}`]: (state, action) => {
      state.listCoursesPending = payload;
      state.userList = action.payload.data.intentList || [];
      console.log('actions-->>>  listCourses  >>  fulfilled', payload);
      return state;
    },
  },
});

export const { actions: actionsConfig } = treatmentPlanSlice;
/**
 * Let's turn this into a hook style usage.
 * This will inject the slice to redux store and return actions in case you want to use in the component
 */
export const useTreatmentPlanSlice = () => {
  useInjectReducer({
    key: treatmentPlanSlice.name,
    reducer: treatmentPlanSlice.reducer,
  });
};
