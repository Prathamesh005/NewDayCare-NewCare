import { LOADING ,
  LOADING_SEARCH_DRUG,
  LOAD_DRUGS_NAME_VALUESET,
  APPOINTMENT_PROTOCOL_SET_DATA,
  APPOINTMENT_INTENT_SET_DATA,
  FIND_TREATMENT_PROTOCOL_LOAD,
  TREATMENT_PATIENT_DETAILS_LOAD,
  FIND_TREATMENT_PROTOCOL_LOADING,
  TREATMENT_PATIENT_DETAILS_LOADING,
  TREATMENT_LOAD_BMI_BSA,
  // dis
  TREATMENT_LOAD_DOSE_VALUESET,
TREATMENT_LOAD_DRUG_FORM_VALUESET,
TREATMENT_LOAD_TIMING_VALUESET,
//
TREATMENT_UNIT_SET_DATA,
TREATMENT_PROTOCOL_UNIT_SET_DATA,


TREATMENT_SAVE_PROTOCOL,
TREATMENT_SAVE_PROTOCOL_LOADING,
TREATMENT_GET_PROTOCOL,
TREATMENT_GET_PROTOCOL_LOAD,
TREATMENT_CLEAR_DATA,
TREATMENT_FETCH_PRACTITIONER_DATABASE
} from './constants';
import * as actionType from './constants';

export const loadingSearchDrug = () => ({
  type: LOADING_SEARCH_DRUG,
});


export function getSearchDrug(inputDrugsName, resolve, reject) {
  return {
    type: LOAD_DRUGS_NAME_VALUESET,
    inputDrugsName,
    resolve,
    reject,
  };
}

export function loadingStart() {
  return {
    type: LOADING,
  };
}


export function intentSet(url, resolve, reject) {
  return {
    type: APPOINTMENT_INTENT_SET_DATA,
    url,
    resolve,
    reject,
  };
}

export function protocolSet(url, resolve, reject) {
  return {
    type: APPOINTMENT_PROTOCOL_SET_DATA,
    url,
    resolve,
    reject,
  };
}

export function findTreatmentProtocol(payload, resolve, reject) {
  return {
    type: FIND_TREATMENT_PROTOCOL_LOAD,
    payload,
    resolve,
    reject,
  };
}

export function loadingStartProtocols() {
  return {
    type: FIND_TREATMENT_PROTOCOL_LOADING,
  };
}


export function getPatientDetails(id, resolve, reject) {
  return {
    type: TREATMENT_PATIENT_DETAILS_LOAD,
    id,
    resolve,
    reject,
  };
}

export function loadingPatientDetails() {
  return {
    type: TREATMENT_PATIENT_DETAILS_LOADING,
  };
}


export function loadBmiBSA(field, resolve, reject) {
  return {
    type: TREATMENT_LOAD_BMI_BSA,
    field,
    resolve,
    reject,
  };
}

//dis
export function loadDrugFormValueSet(resolve, reject) {
  return {
    type: TREATMENT_LOAD_DRUG_FORM_VALUESET,
    resolve,
    reject,
  };
}

export function loadDoseValueSet(resolve, reject) {
  return {
    type: TREATMENT_LOAD_DOSE_VALUESET,
    resolve,
    reject,
  };
}

export function loadTimingValueSet(resolve, reject) {
  return {
    type: TREATMENT_LOAD_TIMING_VALUESET,
    resolve,
    reject,
  };
}

export function loadDrugUnitSet(url, resolve, reject) {
  return {
    type: TREATMENT_UNIT_SET_DATA,
    url,
    resolve,
    reject,
  };
}

export function loadProtocolDrugUnitSet(url, resolve, reject) {
  return {
    type: TREATMENT_PROTOCOL_UNIT_SET_DATA,
    url,
    resolve,
    reject,
  };
}


// save
export function loadingSaveProtocol() {
  return {
    type: TREATMENT_SAVE_PROTOCOL_LOADING,
  };
}
export function loadSaveProtocol(field, resolve, reject) {
  return {
    type: TREATMENT_SAVE_PROTOCOL,
    field,
    resolve,
    reject,
  };
}

// save and share
export function doPDFInvoiceSave(fieldValue, resolve, reject) {
  return {
      type: actionType.TREATMENT_DO_PDF_INVOICE_SAVE,
      fieldValue,
      resolve,
      reject
  }
}
export function doShareInvoice(field, resolve, reject) {
  return {
      type: actionType.TREATMENT_DO_SHARE_INVOICE,
      field,
      resolve,
      reject
  }
}
export const loadingPdfSave = () => ({
  type: actionType.TREATMENT_LOADING_PDF_SAVE,
});
export const loadingShareInvoice = () => ({
  type: actionType.TREATMENT_LOADING_SHARE_INVOICE,
});


export function getProtocol(data, resolve, reject) {
  return {
    type: TREATMENT_GET_PROTOCOL,
    data,
    resolve,
    reject,
  };
}
export function loadingGetProtocol() {
  return {
    type: TREATMENT_GET_PROTOCOL_LOAD,
  };
}


export function clearOldTreatmentData() {
  return {
    type: TREATMENT_CLEAR_DATA
  };
}

export function fetchPractitionerData(id, resolve, reject) {
  return {
    type: TREATMENT_FETCH_PRACTITIONER_DATABASE,
    id,
    resolve,
    reject,
  };
}





