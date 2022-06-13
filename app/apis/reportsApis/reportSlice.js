import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// FOR REST APIS
import { getConfig } from '../../config/apiConfig';
import ApiService from '../../utils/apiService';
import { useInjectReducer } from '../../utils/injectReducer';
// FOR GRAPHQL APIS
import GQLClient from '../graphql/graphqlClient';
import Routes from '../graphql/routes';
import { URL_CONSTANTS } from '../graphql/urlConstants';




const initialState = {
    upcommingLoader: true,
    upcommingData: [],
};

//---------------- FOR GRAPHQL APIS ----------------
// NOTE : function name => key name => create reducer status name === same and unique



//---------------- FOR REST APIS ----------------
export const fetchAppointmentReportsDateWise = createAsyncThunk(
    'fetchAppointmentReportsDateWise',
    async (payload, thunkAPI) => {
        try {
            const fetchQuotesConfig = getConfig('Auth.getAppointmentReportsDateWise');
            fetchQuotesConfig.data = {
                fromDate: `${payload.fromDate}T00:00`,
                toDate: `${payload.toDate}T23:59`,
            };;
            const apiInstance = new ApiService(fetchQuotesConfig);
            const result = await apiInstance.call();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);
export const fetchReferralReportsDateWise = createAsyncThunk(
    'fetchReferralReportsDateWise',
    async (payload, thunkAPI) => {
        try {
            const fetchQuotesConfig = getConfig('Auth.getReferralReportsDateWise');
            fetchQuotesConfig.data = {
                fromDate: `${payload.fromDate}T00:00`,
                toDate: `${payload.toDate}T23:59`,
            };;
            const apiInstance = new ApiService(fetchQuotesConfig);
            const result = await apiInstance.call();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

//---------------- CREATE SLICE FOR MODULE ----------------
export const reportSlice = createSlice({
    name: 'Reports',
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

export const { actions: actionsConfig } = reportSlice;

export const useReportSlice = () => {
    useInjectReducer({
        key: reportSlice.name,
        reducer: reportSlice.reducer,
    });
};
