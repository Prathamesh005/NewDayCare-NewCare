/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
// import globalReducer from './containers/app/reducer';
import languageProviderReducer from './containers/languageProvider/reducer';
import { globalSlice } from './apis/globalApis/globalSlice';
import { appSlice } from './apis/appApis/appSlice';

// import appointmentReducer from './containers/Appointments/reducer';
// import SearchpatientReducer from './containers/SearchPatient/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // global: globalReducer,
    globalNew: appSlice.reducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    globalReducerThunk: globalSlice.reducer,
    ...injectedReducers,
  });

  return rootReducer;
}
