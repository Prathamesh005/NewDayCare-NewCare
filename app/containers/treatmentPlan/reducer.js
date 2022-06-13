/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as actionType from './constants';

export const initialState = {
  loading: false,
  loadingSave: false,
  loadingFetch: false,
  loadingSearchDrug: false,
  loadingPushNotification:false,
  pushNotificationSuccess: null,
  pushNotificationError: null,

  //precription
  loadDrugsNameValueSetSuccess: null,
  loadDrugsNameValueSetError: null,
  //
  intentSetData: [],
  intentSetDataFail: null,
  protocolSetData: [],
  protocolSetDataFail: null,

  treatmentProtocols:[],
  treatmentProtocolsError:null,
  treatmentProtocolsLoad:false,

  patientDetails:[],
  patientDetailsLoad:null,
  patientDetailsError:false,

  drugUnitsError:null,
  drugUnits:null,
  drugUnitsProtocol: null,
  drugUnitsProtocolError:null,

  loadSaveProtocolData : null , 
  loadSaveProtocolLoading  : false , 
  loadSaveProtocolError : null,
  // share
  doPDFInvoiceSaveSuccess: null,
  doPDFInvoiceSaveSuccessMessage: null,
  doPDFInvoiceSaveError: null,
  doShareInvoiceSuccess: null,
  doShareInvoiceSuccessMessage: null,
  doShareInvoiceError: null,
  loadingShareInvoice:false,
  loaderPDFSave:false,
  // get protocol
  getProtocolLoading:false, 
  getProtocolError:null, 
  getProtocolSuccess:null, 
  // dr id
  fetchPractitionerDataSuccess: [],
  fetchPractitionerDataError: null,
  
};

const TreatmentReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case actionType.LOADING:
        draft.loading = true;
        break;
      case actionType.LOADING_SAVE:
        draft.loadingSave = true;
        break;
      case actionType.LOADING_FETCH:
        draft.loadingFetch = true;
        break;
      case actionType.LOADING_SEARCH_DRUG:
        draft.loadingSearchDrug = true;
        break;

        //Notification
      //  case actionType.LOADING_PUSH_NOTIFICATION:
      //  draft.loadingPushNotification = true;
      //  break;

      //  case actionType.PUSH_NOTIFICATION_SUCCESS:
      //    draft.pushNotificationSuccess = action.result.data;
      //    draft.loadingPushNotification = false;
      //    draft.pushNotificationError = null;
      //    break;
         
      // case actionType.PUSH_NOTIFICATION_ERROR:
      //    draft.pushNotificationSuccess = null;
      //    draft.loadingPushNotification = false;
      //    draft.pushNotificationError = action.error.message;
      //    break;

      //prescription
      case actionType.LOAD_DRUGS_NAME_VALUESET_SUCCESS:
        draft.loadDrugsNameValueSetSuccess = action.result.data;
        draft.loadingSearchDrug = false;
        draft.loadDrugsNameValueSetError = null;
        break;
      case actionType.LOAD_DRUGS_NAME_VALUESET_FAIL:
        draft.loadDrugsNameValueSetSuccess = null;
        draft.loadingSearchDrug = false;
        draft.loadDrugsNameValueSetError = action.error.message;
        break;

        //
        case actionType.APPOINTMENT_INTENT_SET_DATA_SUCCESS:
          draft.intentSetData = action.result.data;
          draft.loading = false;
          draft.intentSetDataFail = null;
          break;
        case actionType.APPOINTMENT_INTENT_SET_DATA_FAIL:
          draft.intentSetData = [];
          draft.loading = false;
          draft.intentSetDataFail = action.error.message;
          break;
        
        case actionType.APPOINTMENT_PROTOCOL_SET_DATA_SUCCESS:
          draft.protocolSetData = action.result.data;
          draft.loading = false;
          draft.protocolSetDataFail = null;
          break;
        case actionType.APPOINTMENT_PROTOCOL_SET_DATA_FAIL:
          draft.protocolSetData = [];
          draft.loading = false;
          draft.protocolSetDataFail = action.error.message;
          break;

          // find protocol
          case actionType.FIND_TREATMENT_PROTOCOL_LOADING:
            draft.treatmentProtocolsLoad = true;
            break;
          case actionType.FIND_TREATMENT_PROTOCOL_SUCCESS:
            draft.treatmentProtocols = action.result.data;
            draft.treatmentProtocolsLoad = false;
            draft.treatmentProtocolsError = null;
            break;
          case actionType.FIND_TREATMENT_PROTOCOL_FAIL:
            draft.treatmentProtocols = [];
            draft.treatmentProtocolsLoad = false;
            draft.treatmentProtocolsError = action.error.message;
            break;

            // patientDetails 
            case actionType.TREATMENT_PATIENT_DETAILS_LOADING:
              draft.patientDetailsLoad = true;
              break;
            case actionType.TREATMENT_PATIENT_DETAILS_SUCCESS:
              draft.patientDetails = action.result.data;
              draft.patientDetailsLoad = false;
              draft.patientDetailsError = null;
              break;
            case actionType.TREATMENT_PATIENT_DETAILS_FAIL:
              draft.patientDetails = [];
              draft.patientDetailsLoad = false;
              draft.patientDetailsError = action.error.message;
              break;
             //


            //  loadBmiBsa
             case actionType.TREATMENT_LOAD_BMI_BSA_SUCCESS:
              draft.loadBmiBsaData = action.result.data;
              draft.loadingSave = false;
              draft.loadBmiBsaDataError = null;
              break;
            case actionType.TREATMENT_LOAD_BMI_BSA_FAIL:
              draft.loadBmiBsaData = null;
              draft.loadingSave = false;
              draft.loadBmiBsaDataError = action.error.message;
              break;

              //dis
              case actionType.TREATMENT_LOAD_DOSE_VALUESET_SUCCESS:
                draft.loadDoseValueSetSuccess = action.result.data;
                draft.loading = false;
                draft.loadDoseValueSetError = null;
                break;
              case actionType.TREATMENT_LOAD_DOSE_VALUESET_FAIL:
                draft.loadDoseValueSetSuccess = null;
                draft.loading = false;
                draft.loadDoseValueSetError = action.error.message;
                break;
                
              case actionType.TREATMENT_LOAD_TIMING_VALUESET_SUCCESS:
                draft.loadTImingValueSetSuccess = action.result.data;
                draft.loading = false;
                draft.loadTImingValueSetError = null;
                break;
              case actionType.TREATMENT_LOAD_TIMING_VALUESET_FAIL:
                draft.loadTImingValueSetSuccess = null;
                draft.loading = false;
                draft.loadTImingValueSetError = action.error.message;
                break;
                
              case actionType.TREATMENT_LOAD_DRUG_FORM_VALUESET_SUCCESS:
                draft.loadDrugFormValueSetSuccess = action.result.data;
                draft.loading = false;
                draft.loadDrugFormValueSetError = null;
                break;
              case actionType.TREATMENT_LOAD_DRUG_FORM_VALUESET_FAIL:
                draft.loadDrugFormValueSetSuccess = null;
                draft.loading = false;
                draft.loadDrugFormValueSetError = action.error.message;
                break;
               
                // unit set
                case actionType.TREATMENT_UNIT_SET_DATA_SUCCESS:
                  draft.drugUnits = action.result.data;
                  draft.drugUnitsError = null;
                  break;
                case actionType.TREATMENT_UNIT_SET_DATA_FAIL:
                  draft.drugUnits = null;
                  draft.drugUnitsError = action.error.message;
                  break;
                //  drug unit
                case actionType.TREATMENT_PROTOCOL_UNIT_SET_DATA_SUCCESS:
                  draft.drugUnitsProtocol = action.result.data;
                  draft.drugUnitsProtocolError = null;
                  break;
                case actionType.TREATMENT_PROTOCOL_UNIT_SET_DATA_FAIL:
                  draft.drugUnitsProtocol = null;
                  draft.drugUnitsProtocolError = action.error.message;
                  break;

                  // save protocol
                  case actionType.TREATMENT_SAVE_PROTOCOL__SUCCESS:
                    draft.loadSaveProtocolData = action.result.data;
                    draft.loadSaveProtocolLoading  = false;
                    draft.loadSaveProtocolError = null;
                    break;
                  case actionType.TREATMENT_SAVE_PROTOCOL_FAIL:
                    draft.loadSaveProtocolData = null;
                    draft.loadSaveProtocolLoading = false;
                    draft.loadSaveProtocolError = action.error.message;
                    break;
                    case actionType.TREATMENT_SAVE_PROTOCOL_LOADING:
                      draft.loadSaveProtocolLoading = true;
                      break;

                      // share
                      case actionType.TREATMENT_DO_PDF_INVOICE_SAVE_SUCCESS:
                        draft.doPDFInvoiceSaveSuccess = action.result.data;
                        draft.doPDFInvoiceSaveSuccessMessage = action.result.data.message;
                        draft.loaderPDFSave = false;
                        draft.doPDFInvoiceSaveError = null;
                        break;
                    case actionType.TREATMENT_DO_PDF_INVOICE_SAVE_FAIL:
                        draft.doPDFInvoiceSaveSuccess = null;
                        draft.loaderPDFSave = false;
                        draft.doPDFInvoiceSaveError = action.error.message;
                        break;
                    case actionType.TREATMENT_DO_SHARE_INVOICE_SUCCESS:
                        draft.doShareInvoiceSuccess = action.result;
                        draft.doShareInvoiceSuccessMessage = action.result.data.message;
                        draft.
                        loadingShareInvoice = false;
                        draft.doShareInvoiceError = null;
                        break;
                    case actionType.TREATMENT_DO_SHARE_INVOICE_FAIL:
                        draft.doShareInvoiceSuccess = null;
                        draft.loadingShareInvoice = false;
                        draft.doShareInvoiceError = action.error.message;
                        break;
                 
                        // get protocol 
                         case actionType.TREATMENT_GET_PROTOCOL_LOAD:
                          draft.getProtocolLoading = true;
                          break;

                          case actionType.TREATMENT_GET_PROTOCOL_SUCCESS:
                            draft.getProtocolSuccess = action.result;
                            draft.getProtocolLoading = false;
                            draft.getProtocolError = null; 
                            break;

                          case actionType.TREATMENT_GET_PROTOCOL_FAIL:
                            draft.getProtocolSuccess = null;
                            draft.getProtocolLoading = false;
                            draft.getProtocolError = action.error.message;
                            break;
                            case actionType.TREATMENT_CLEAR_DATA:
                              draft.treatmentProtocols = [];
                              draft.getProtocolSuccess = null;
                              draft.loadBmiBsaData = null;
                              break;
                              // get dr id
                              case actionType.TREATMENT_FETCH_PRACTITIONER_DATABASE_SUCCESS:
                                draft.fetchPractitionerDataSuccess = action.result.data;
                                draft.fetchPractitionerDataError = null;
                                break;
                              case actionType.TREATMENT_FETCH_PRACTITIONER_DATABASE_FAIL:
                                draft.fetchPractitionerDataSuccess = [];
                                draft.fetchPractitionerDataError = action.error.message;
                                break;
    }
  });

export default TreatmentReducer;
