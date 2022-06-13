export default class Routes {
  static AUTH = class {
    //--------------------------

    static GET_MEDICAL_HISTORY_SET = {
      endPoint: 'platform/master-data/graphql',
      method: 'POST',
      cache: 'no-cache',
      requireAuth: true,
    };

    static GET_INTENT_SET = {
      endPoint: 'platform/master-data/graphql',
      method: 'POST',
      cache: 'no-cache',
      requireAuth: true,
    };

    static GET_PROTOCOL_SET = {
      endPoint: 'platform/master-data/graphql',
      method: 'POST',
      cache: 'no-cache',
      requireAuth: true,
    };

    static GET_PATIENT_DETAILS = {
      endPoint: 'emr/patient/graphql',
      method: 'POST',
      cache: 'no-cache',
      requireAuth: true,
    };

    static GET_PROTOCOL_LIST = {
      endPoint: 'emr/treatment/graphql',
      method: 'POST',
      cache: 'no-cache',
      requireAuth: true,
    };

    static GET_PATIENT_DETAILS_FROM_ID = {
      endPoint: 'emr/patient/graphql',
      method: 'POST',
      cache: 'no-cache',
      requireAuth: 'true',
    };
  };
}
