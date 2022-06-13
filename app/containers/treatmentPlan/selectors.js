import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTreatmentPlan = state => state.TreatmentPlan || initialState;

const makeLoadDrugsNameValueSetSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadDrugsNameValueSetSuccess,
  );

//----------------------
const makeIntentSetData = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.intentSetData,
  );
const makeIntentSetDataFail = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.intentSetDataFail,
  );

const makeProtocolSetData = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.protocolSetData,
  );
const makeProtocolSetDataFail = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.protocolSetDataFail,
  );

const makeFindProtocol = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.treatmentProtocols,
  );
const makeFindProtocolFail = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.treatmentProtocolsError,
  );
const makeFindProtocolLoading = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.treatmentProtocolsLoad,
  );

const makePatientDetails = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.patientDetails,
  );
const makePatientDetailsFail = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.patientDetailsError,
  );

const makePatientDetailsLoading = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.patientDetailsLoad,
  );

const makeLoadBmiBsaData = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadBmiBsaData,
  );
// loadDrugFormValueSetSuccess
// loadTImingValueSetSuccess
// loadDoseValueSetSuccess
//discharge
const makeLoadDrugFormValueSetSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadDrugFormValueSetSuccess,
  );
const makeLoadTImingValueSetSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadTImingValueSetSuccess,
  );
const makeLoadDoseValueSetSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadDoseValueSetSuccess,
  );

const makeLoadDrugUnitsSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.drugUnits,
  );
const makeLoadProtocolDrugUnitsSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.drugUnitsProtocol,
  );

const makeSaveProtocolData = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadSaveProtocolData,
  );
const makeSaveProtocolError = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadSaveProtocolError,
  );

const makeSaveProtocolLoading = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.loadSaveProtocolLoading,
  );

// share
const makeSelectorDoPDFInvoiceSaveSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.doPDFInvoiceSaveSuccess,
  );
const makeSelectorDoPDFInvoiceSaveSuccessMessage = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.doPDFInvoiceSaveSuccessMessage,
  );

const makeSelectorDoPDFInvoiceSaveError = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.doPDFInvoiceSaveError,
  );
const makeSelectorDoShareInvoiceSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.doShareInvoiceSuccess,
  );
const makeSelectorDoShareInvoiceSuccessMessage = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.doShareInvoiceSuccessMessage,
  );

const makeSelectorDoShareInvoiceError = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.doShareInvoiceError,
  );

// get protocol
const makeSelectorGetProtocolLoading = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.getProtocolLoading,
  );

const makeSelectorGetProtocolError = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.getProtocolError,
  );

const makeSelectorGetProtocolSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan =>
      treatmentPlan.getProtocolSuccess &&
      treatmentPlan.getProtocolSuccess.data &&
      treatmentPlan.getProtocolSuccess.data.treatmentPlanProtocols &&
      treatmentPlan.getProtocolSuccess.data.treatmentPlanProtocols,
  );

const makeFetchPractitionerDataSuccess = () =>
  createSelector(
    selectTreatmentPlan,
    treatmentPlan => treatmentPlan.fetchPractitionerDataSuccess,
  );

export {
  makeLoadDrugsNameValueSetSuccess,
  makeIntentSetData,
  makeIntentSetDataFail,
  makeProtocolSetData,
  makeProtocolSetDataFail,
  makeFindProtocol,
  makeFindProtocolFail,
  makeFindProtocolLoading,
  makePatientDetails,
  makePatientDetailsFail,
  makePatientDetailsLoading,
  //  makeSaveProtocol,
  //  makeSaveProtocolFail,
  //  makeSaveProtocolLoading,
  makeLoadBmiBsaData,
  //dis
  makeLoadDoseValueSetSuccess,
  makeLoadTImingValueSetSuccess,
  makeLoadDrugFormValueSetSuccess,
  //
  makeLoadDrugUnitsSuccess,
  makeLoadProtocolDrugUnitsSuccess,
  //
  makeSaveProtocolData,
  makeSaveProtocolError,
  makeSaveProtocolLoading,
  // share
  makeSelectorDoPDFInvoiceSaveSuccess,
  makeSelectorDoPDFInvoiceSaveSuccessMessage,
  makeSelectorDoPDFInvoiceSaveError,
  makeSelectorDoShareInvoiceSuccess,
  makeSelectorDoShareInvoiceSuccessMessage,
  makeSelectorDoShareInvoiceError,
  // get protocol
  makeSelectorGetProtocolLoading,
  makeSelectorGetProtocolError,
  makeSelectorGetProtocolSuccess,
  makeFetchPractitionerDataSuccess,
};
