import { call, all, put, takeLatest, delay } from 'redux-saga/effects';
import {
  loadingSearchDrug,
  loadingStart,
  loadingStartProtocols,
  loadingPatientDetails,
  loadingSaveProtocol,
  loadingPdfSave,
  loadingShareInvoice,
  loadingGetProtocol,
} from './actions';
import * as actionType from './constants';
import {
  //prescription
  LOAD_DRUGS_NAME_VALUESET,
  LOAD_DRUGS_NAME_VALUESET_SUCCESS,
  LOAD_DRUGS_NAME_VALUESET_FAIL,
  APPOINTMENT_INTENT_SET_DATA,
  APPOINTMENT_INTENT_SET_DATA_SUCCESS,
  APPOINTMENT_INTENT_SET_DATA_FAIL,
  APPOINTMENT_PROTOCOL_SET_DATA,
  APPOINTMENT_PROTOCOL_SET_DATA_SUCCESS,
  APPOINTMENT_PROTOCOL_SET_DATA_FAIL,
  FIND_TREATMENT_PROTOCOL_LOAD,
  FIND_TREATMENT_PROTOCOL_SUCCESS,
  FIND_TREATMENT_PROTOCOL_FAIL,
  TREATMENT_PATIENT_DETAILS_LOAD,
  TREATMENT_PATIENT_DETAILS_SUCCESS,
  TREATMENT_PATIENT_DETAILS_FAIL,
  TREATMENT_LOAD_BMI_BSA,
  TREATMENT_LOAD_BMI_BSA_SUCCESS,
  TREATMENT_LOAD_BMI_BSA_FAIL,

  //dis
  TREATMENT_LOAD_TIMING_VALUESET,
  TREATMENT_LOAD_DOSE_VALUESET,
  TREATMENT_LOAD_DRUG_FORM_VALUESET,
  TREATMENT_LOAD_DRUG_FORM_VALUESET_SUCCESS,
  TREATMENT_LOAD_DRUG_FORM_VALUESET_FAIL,
  TREATMENT_LOAD_DOSE_VALUESET_SUCCESS,
  TREATMENT_LOAD_DOSE_VALUESET_FAIL,
  TREATMENT_LOAD_TIMING_VALUESET_SUCCESS,
  TREATMENT_LOAD_TIMING_VALUESET_FAIL,
  //
  TREATMENT_UNIT_SET_DATA,
  TREATMENT_UNIT_SET_DATA_SUCCESS,
  TREATMENT_UNIT_SET_DATA_FAIL,
  TREATMENT_PROTOCOL_UNIT_SET_DATA,
  TREATMENT_PROTOCOL_UNIT_SET_DATA_SUCCESS,
  TREATMENT_PROTOCOL_UNIT_SET_DATA_FAIL,
  //save
  TREATMENT_SAVE_PROTOCOL,
  TREATMENT_SAVE_PROTOCOL__SUCCESS,
  TREATMENT_SAVE_PROTOCOL_FAIL,
  TREATMENT_FETCH_PRACTITIONER_DATABASE_SUCCESS,
  TREATMENT_FETCH_PRACTITIONER_DATABASE_FAIL,
  TREATMENT_FETCH_PRACTITIONER_DATABASE,
} from './constants';
import {
  searchDrugs,
  findTreatmentProtocol,
  saveBmiBsa,
  saveTreatmentProtocol,
  savePDFInvoice,
  sharePDFInvoice,
} from './serviceCalls';
import GQLClient from '../../apis/graphql/graphqlClient';
import Routes from './routes';
import {
  GET_SET_LIST,
  GET_PATIENT_DETAIL,
  GET_MEDICAL_HISTORY_SET,
  GET_TREATMENT_PLAN,
  GET_PRACTITIONER_DETAILS,
} from './query';
import {
  checkResponseError,
  checkResponseSuccess,
  handleResponse,
} from '../../utils/authHelper';

export function* getSearchDrug(data) {
  yield put(loadingSearchDrug());
  try {
    const result = yield call(searchDrugs, data);
    if (checkResponseSuccess(result)) {
      yield put({ type: LOAD_DRUGS_NAME_VALUESET_SUCCESS, result });
      // handleResponse(result , data)
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: LOAD_DRUGS_NAME_VALUESET_FAIL, error });
      // handleResponse(result , data)
      data.reject();
    }
  } catch (error) {
    yield put({ type: LOAD_DRUGS_NAME_VALUESET_FAIL, error });
    data.reject();
    // handleResponse(result , data)
  }
}

export function* intentSet(data) {
  const url = data.url;
  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_INTENT_SET);
    const result = yield client.query(GET_SET_LIST, { url });
    if (checkResponseSuccess(result)) {
      yield put({ type: APPOINTMENT_INTENT_SET_DATA_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: APPOINTMENT_INTENT_SET_DATA_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: APPOINTMENT_INTENT_SET_DATA_FAIL, error });
    data.reject();
  }
}

export function* protocolSet(data) {
  const url = data.url;

  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_PROTOCOL_SET);
    const result = yield client.query(GET_SET_LIST, { url });

    if (checkResponseSuccess(result)) {
      yield put({ type: APPOINTMENT_PROTOCOL_SET_DATA_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: APPOINTMENT_PROTOCOL_SET_DATA_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: APPOINTMENT_PROTOCOL_SET_DATA_FAIL, error });
    data.reject();
  }
}

export function* drugUnitSet(data) {
  const url = data.url;

  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_PROTOCOL_SET);
    const result = yield client.query(GET_SET_LIST, { url });

    if (checkResponseSuccess(result)) {
      yield put({ type: TREATMENT_UNIT_SET_DATA_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: TREATMENT_UNIT_SET_DATA_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_UNIT_SET_DATA_FAIL, error });
    data.reject();
  }
}

export function* drugProtocolUnitSet(data) {
  const url = data.url;

  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_PROTOCOL_SET);
    const result = yield client.query(GET_SET_LIST, { url });
    if (checkResponseSuccess(result)) {
      yield put({ type: TREATMENT_PROTOCOL_UNIT_SET_DATA_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: TREATMENT_PROTOCOL_UNIT_SET_DATA_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_PROTOCOL_UNIT_SET_DATA_FAIL, error });
    data.reject();
  }
}

export function* findTreatmentProtocols(data) {
  yield put(loadingStartProtocols());
  try {
    const result = yield call(findTreatmentProtocol, data);
    if (checkResponseSuccess(result)) {
      yield put({ type: FIND_TREATMENT_PROTOCOL_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: FIND_TREATMENT_PROTOCOL_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: FIND_TREATMENT_PROTOCOL_FAIL, error });
    data.reject();
  }
}

export function* makePatientDetails(data) {
  const id = data.id;
  yield put(loadingPatientDetails());
  try {
    const client = new GQLClient(Routes.AUTH.GET_PATIENT_DETAILS);
    const result = yield client.query(GET_PATIENT_DETAIL, { id });
    if (checkResponseSuccess(result)) {
      yield put({ type: TREATMENT_PATIENT_DETAILS_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: TREATMENT_PATIENT_DETAILS_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_PATIENT_DETAILS_FAIL, error });
    data.reject();
  }
}

// CHECK REQUIRED
export function* saveTreatmentProtocols(data) {
  yield put(loadingSaveProtocol());
  try {
    const result = yield call(saveTreatmentProtocol, data);
    if (checkResponseSuccess(result)) {
      yield put({ type: TREATMENT_SAVE_PROTOCOL__SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: TREATMENT_SAVE_PROTOCOL_FAIL, error });
      data.reject(result);
    }
  } catch (error) {
    yield put({ type: TREATMENT_SAVE_PROTOCOL_FAIL, error });
    data.reject(error);
  }
}

export function* loadBmiBSA(data) {
  yield put(loadingStart());
  try {
    const result = yield call(saveBmiBsa, data);
    if (result.status === 200) {
      yield put({ type: TREATMENT_LOAD_BMI_BSA_SUCCESS, result });
      data.resolve();
    } else if (result.status === 400 && result.data.error) {
      const { error } = result.data;
      yield put({ type: TREATMENT_LOAD_BMI_BSA_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_LOAD_BMI_BSA_FAIL, error });
    data.reject();
  }
}

//dis
export function* loadDrugFormValueSet(data) {
  const url = 'http://dataquent.com/fhir/us/custom/ValueSet/forms-of-drug-vs';
  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_MEDICAL_HISTORY_SET);
    const result = yield client.query(GET_MEDICAL_HISTORY_SET, { url });

    if (result.status === 200 || result.data) {
      yield put({ type: TREATMENT_LOAD_DRUG_FORM_VALUESET_SUCCESS, result });
      data.resolve();
    } else if (result.status === 400 && result.data.error) {
      const { error } = result.data;
      yield put({ type: TREATMENT_LOAD_DRUG_FORM_VALUESET_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_LOAD_DRUG_FORM_VALUESET_FAIL, error });
    data.reject();
  }
}
export function* loadDoseValueSet(data) {
  const url = 'http://hl7.org/fhir/ValueSet/timing-abbreviation';
  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_MEDICAL_HISTORY_SET);
    const result = yield client.query(GET_MEDICAL_HISTORY_SET, { url });

    if (result.status === 200 || result.data) {
      yield put({ type: TREATMENT_LOAD_DOSE_VALUESET_SUCCESS, result });
      data.resolve();
    } else if (result.status === 400 && result.data.error) {
      const { error } = result.data;
      yield put({ type: TREATMENT_LOAD_DOSE_VALUESET_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_LOAD_DOSE_VALUESET_FAIL, error });
    data.reject();
  }
}
export function* loadTimingValueSet(data) {
  const url =
    'http://dataquent.com/fhir/us/custom/ValueSet/prescription-instruction-timing';
  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_MEDICAL_HISTORY_SET);
    const result = yield client.query(GET_MEDICAL_HISTORY_SET, { url });

    if (result.status === 200 || result.data) {
      yield put({ type: TREATMENT_LOAD_TIMING_VALUESET_SUCCESS, result });
      data.resolve();
    } else if (result.status === 400 && result.data.error) {
      const { error } = result.data;
      yield put({ type: TREATMENT_LOAD_TIMING_VALUESET_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: TREATMENT_LOAD_TIMING_VALUESET_FAIL, error });
    data.reject();
  }
}

// save and share
export function* doPDFInvoiceSave(data) {
  const value = data.fieldValue;
  yield put(loadingPdfSave());
  try {
    const result = yield call(savePDFInvoice, value);
    if (result.status === 200 || result.data) {
      yield put({
        type: actionType.TREATMENT_DO_PDF_INVOICE_SAVE_SUCCESS,
        result,
      });
      data.resolve(result);
    } else if (result.status === 400 && result.data.error) {
      const { error } = result.data;
      yield put({ type: actionType.TREATMENT_DO_PDF_INVOICE_SAVE_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: actionType.TREATMENT_DO_PDF_INVOICE_SAVE_FAIL, error });
    data.reject();
  }
}
export function* doShareInvoice(data) {
  const value = {
    documentId: data.field.documentId,
    patientId: data.field.patientId,
  };
  yield put(loadingShareInvoice());
  try {
    const result = yield call(sharePDFInvoice, value);
    if (result.status === 200 || result.data) {
      yield put({
        type: actionType.TREATMENT_DO_SHARE_INVOICE_SUCCESS,
        result,
      });
      data.resolve();
    } else if (result.status === 400 && result.data.error) {
      const { error } = result.data;
      yield put({ type: actionType.TREATMENT_DO_SHARE_INVOICE_FAIL, error });
      data.reject();
    }
  } catch (error) {
    yield put({ type: actionType.TREATMENT_DO_SHARE_INVOICE_FAIL, error });
    data.reject();
  }
}

// list protocol
export function* getTreatmentPlan(data) {
  // resourceId, patientId,search
  yield put(loadingGetProtocol());
  try {
    const client = new GQLClient(Routes.AUTH.GET_PROTOCOL_LIST);
    const payload = data.data;
    const result = yield client.query(GET_TREATMENT_PLAN, payload);
    if (checkResponseSuccess(result)) {
      yield put({ type: actionType.TREATMENT_GET_PROTOCOL_SUCCESS, result });
      data.resolve();
    } else if (checkResponseError(result)) {
      const { error } = result.data;
      yield put({ type: actionType.TREATMENT_GET_PROTOCOL_FAIL, error });
    }
  } catch (error) {
    yield put({ type: actionType.TREATMENT_GET_PROTOCOL_FAIL, error });
  }
}

export function* fetchPractitionerData(data) {
  const id = data.id;
  yield put(loadingStart());
  try {
    const client = new GQLClient(Routes.AUTH.GET_PATIENT_DETAILS_FROM_ID);
    const result = yield client.query(GET_PRACTITIONER_DETAILS, { id });
    if (result.status === 200 || result.data) {
      yield put({
        type: TREATMENT_FETCH_PRACTITIONER_DATABASE_SUCCESS,
        result,
      });
      data.resolve();
    } else if (result.status === 400 && result.data.error) {
      // debugger;
      const { error } = result.data;
      yield put({ type: TREATMENT_FETCH_PRACTITIONER_DATABASE_FAIL, error });
      data.reject();
    }
  } catch (error) {
    // debugger;
    yield put({ type: TREATMENT_FETCH_PRACTITIONER_DATABASE_FAIL, error });
    data.reject();
  }
}

export default function* rootSaga() {
  // yield all([takeLatest(LOADING_SEARCH_DATA, loadSearchData)]);
  yield all([
    takeLatest(LOAD_DRUGS_NAME_VALUESET, getSearchDrug),
    takeLatest(APPOINTMENT_INTENT_SET_DATA, intentSet),
    takeLatest(APPOINTMENT_PROTOCOL_SET_DATA, protocolSet),
    takeLatest(FIND_TREATMENT_PROTOCOL_LOAD, findTreatmentProtocols),
    takeLatest(TREATMENT_PATIENT_DETAILS_LOAD, makePatientDetails),
    takeLatest(TREATMENT_SAVE_PROTOCOL, saveTreatmentProtocols),
    takeLatest(TREATMENT_LOAD_BMI_BSA, loadBmiBSA),
    //dis
    takeLatest(TREATMENT_LOAD_DRUG_FORM_VALUESET, loadDrugFormValueSet),
    takeLatest(TREATMENT_LOAD_DOSE_VALUESET, loadDoseValueSet),
    takeLatest(TREATMENT_LOAD_TIMING_VALUESET, loadTimingValueSet),
    //
    takeLatest(TREATMENT_UNIT_SET_DATA, drugUnitSet),
    takeLatest(TREATMENT_PROTOCOL_UNIT_SET_DATA, drugProtocolUnitSet),

    takeLatest(actionType.TREATMENT_DO_PDF_INVOICE_SAVE, doPDFInvoiceSave),
    takeLatest(actionType.TREATMENT_DO_SHARE_INVOICE, doShareInvoice),
    takeLatest(actionType.TREATMENT_GET_PROTOCOL, getTreatmentPlan),

    takeLatest(TREATMENT_FETCH_PRACTITIONER_DATABASE, fetchPractitionerData),
  ]);
}
