import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';
import { getTodayDate } from '../../utils/formatHelper';


export async function searchDrugs(data) {
  const fetchQuotesConfig = getConfig('Auth.searchDrugs');
  fetchQuotesConfig.data = {
    query: data.inputDrugsName,
    result_fields: {
      brand_name: {
        raw: {},
      },
      generic_name: {
        raw: {},
      },
    },
  };
  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}

export async function findTreatmentProtocol(data) {
  const fetchQuotesConfig = getConfig('Auth.findTreatmentProtocol');
  fetchQuotesConfig.data = data.payload
  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}


export async function saveTreatmentProtocol(data) {
  const fetchQuotesConfig = getConfig('Auth.saveTreatmentProtocol');
  fetchQuotesConfig.data = data.field
  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}


export async function saveBmiBsa(data) {
  const fetchQuotesConfig = getConfig('Auth.saveBmiBsa');
  fetchQuotesConfig.data = {

    weight:
      data.field.weight !== '' && data.field.weight !== undefined
        ? {
          // code: `/${data.field.weightUnit}`,
          unit: data.field.weightUnit,
          value: data.field.weight,
        }
        : null,
    height:
      data.field.height !== '' && data.field.height !== undefined
        ? {
          // code: `/${data.field.heightUnit}`,
          unit: data.field.heightUnit,
          value: data.field.height,
        }
        : null,
    gender: data.field.gender
  };

  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}

export async function savePDFInvoice(field) {
  const fetchQuotesConfig = getConfig('Auth.savePDFInvoice');
  fetchQuotesConfig.data = {
    "resourceId": field.invoiceId,  // //main obj id
    "cancerDocumentReference": {
      "resourceId": field.resourceId, //UUID
      "recordName": field.recordName, // UUID can we use ?  
      "labOrDoctorName": field.labOrDoctorName,
      "description": "TreatmentPlan", // #treatmentPlan
      "category": [
        {
          "codeableSystem": "http://loinc.org",
          "code": "Clinical Notes",
          "text": "Clinical Notes",
          "display": "Clinical Notes"
        }
      ],
      "author": field.author,
      "authenticator": field.authenticator,
      "cancerPatientResourceReference": field.cancerPatientResourceReference,
      "related": [
        {
          "resourceId": field.invoiceId,//main obj id
          "resourceType": "MedicationRequest",//medReq
          "resourceReference": `MedicationRequest/${field.invoiceId}`
        }
      ],
      "reportedDate": getTodayDate("YYYY-MM-DD"),
      "content": field.content
    },
  }
  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}

export async function sharePDFInvoice(data) {
  const fetchQuotesConfig = getConfig('Auth.sharePDFInvoice');
  fetchQuotesConfig.data = {
    "resourceId": data.documentId, //document id
    "display": data.patientId,   //patient id
    "resourceType": "TreatmentPlan"
  }
  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}
