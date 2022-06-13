// Structure

/* eslint-disable no-unused-vars */
import { getFromLocalStorage } from '../utils/localStorageUtils';

const MockApiConstants = {
  moduleName: {
    apiName: {
      apiConfig: {
        url: '/api/policymgmt/updatePolicy/{policyRefId}',
        method: 'POST',
      },
      config: {
        pathVariables: {
          policyRefId: '', // Value to be set in the component
        },
        urlParams: {
          sampleParamKey: '', // Key value to be set in the component
        },
        headers: {
          sampleParamKey: '', // Key value to be set in the component
          // Authorization: ' ',
        },
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },
  },
};
/* eslint-enable no-unused-vars */

const ApiConstants = {
  Auth: {
    // 16/09/2021
    saveReportsDownloadData: {
      apiConfig: {
        url: '/you/patient/health/download-document',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    getAuthentication: {
      apiConfig: {
        url: '/emr/login/validate-otp',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: true, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },
    getOtp: {
      apiConfig: {
        url: '/emr/login/generate-otp',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: true, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },

    readNotification: {
      apiConfig: {
        url: '/emr/patient/notification-read',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    getAppointment: {
      apiConfig: {
        url: '/emr/patient/appointment/practitioner/scheduled',
        method: 'POST',
        // headers:{
        //   Authorization: `Bearer ${getFromLocalStorage('TOKEN')}`,
        // }
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },
    getSpeciality: {
      apiConfig: {
        url: '/platform/master-data/valueset/search',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveAppointment: {
      apiConfig: {
        url: '/emr/patient/appointment/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    getAppointmentCancel: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/delete',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    updateAppointment: {
      apiConfig: {
        url: '/emr/patient/appointment/update',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    cancelAppointment: {
      apiConfig: {
        url: '/emr/patient/appointment/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    checkAuth: {
      apiConfig: {
        url: '/emr/api/user/refresh-token',
        method: 'POST',
      },
      // config:{
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // },
      attachPrefix: true,
      skipAuth: true, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },

    savePrevTestResultSet: {
      apiConfig: {
        url: '/platform/master-data/valueset/diagnostic-test',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveEpisodeOfCare: {
      apiConfig: {
        url: '/emr/patient/episode-of-care/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveGenerateHopi: {
      apiConfig: {
        url: '/emr/patient/episode-of-care/generate-ai-hopi',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveBmiBsa: {
      apiConfig: {
        url: '/emr/patient/calculate-body-structure',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    //Adminstraion session SNT 12032021
    savePatient: {
      apiConfig: {
        url: '/emr/patient/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    saveScoreResult: {
      apiConfig: {
        url: '/emr/patient/episode-of-care/calculate-geriatric-score',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    saveDiagnosisStage: {
      apiConfig: {
        url: '/emr/patient/get-diagnostic-stage',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    searchDrugs: {
      apiConfig: {
        url: '/platform/master-data/valueset/drug',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    findTreatmentProtocol: {
      apiConfig: {
        url: '/emr/treatment/protocol/get',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveTreatmentProtocol: {
      apiConfig: {
        url: '/emr/treatment/planner',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    searchTests: {
      apiConfig: {
        url: '/platform/master-data/valueset/diagnostic-test',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    searchMolecularTest: {
      apiConfig: {
        url: '/platform/master-data/valueset/molecular-test',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    saveSchedule: {
      apiConfig: {
        url: '/emr/patient/schedule/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveLocation: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/create/CancerLocation',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveSlot: {
      apiConfig: {
        url: '/emr/patient/schedule/slot/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveHome: {
      apiConfig: {
        url: '/you/patient/health/home-remedies',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveHealth: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/create/CancerHealthcareService',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savePracRole: {
      apiConfig: {
        url: '/emr/patient/practitioner/practitioner-role',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveQuestioner: {
      apiConfig: {
        url: '/patient/pro/questionnaire/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveValueSet: {
      apiConfig: {
        url: '/platform/master-data/valueset/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveOrganization: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/create/CancerOrganization',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveBodydata: {
      apiConfig: {
        url: '/emr/patient/condition/primary/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveSecondaryConditionUpdate: {
      apiConfig: {
        url: '/emr/patient/condition/secondary/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savecomorbidConditionUpdate: {
      apiConfig: {
        url: '/emr/patient/condition/comorbid/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savenonConditionUpdate: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/domainresource/create/Condition',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savenSurgicalTreatment: {
      apiConfig: {
        url: '/emr/patient/procedure/surgical/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savenRadiationTreatment: {
      apiConfig: {
        url: '/emr/patient/procedure/radiation/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savenonCancerTreatment: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/domainresource/create/Procedure',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    updateUserProfile: {
      apiConfig: {
        url: '/emr/patient/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveVitals: {
      apiConfig: {
        url: '/emr/patient/observation/vital-sign/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveTumorUpdate: {
      apiConfig: {
        url: '/emr/patient/observation/tumor-marker/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveFamilyUpdate: {
      apiConfig: {
        url:
          '/emr/patient/restricted/resource/create/CancerFamilyMemberHistory',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveImmunoUpdate: {
      apiConfig: {
        url: '/emr/patient/immunization/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveAllergies: {
      apiConfig: {
        url: '/emr/patient/allergy-intolerance/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveLifeStyleUpdate: {
      apiConfig: {
        url: '/emr/patient/restricted/resource/create/SmokingStatus',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    cancelHomeRemedies: {
      apiConfig: {
        url: '/you/patient/health/home-remedies/soft-delete',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    saveGeneratedBill: {
      apiConfig: {
        url: '/emr/patient/billing/save',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveFinilizeBill: {
      apiConfig: {
        url: '/emr/patient/billing/save',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savePDF: {
      apiConfig: {
        url: '/you/patient/health/emr-upload-document',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    sharePDF: {
      apiConfig: {
        url: '/emr/patient/episode-of-care/share-document-reference',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savePdf: {
      apiConfig: {
        url: '/you/patient/health/emr-upload-document',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savePDFInvoice: {
      apiConfig: {
        url: '/you/patient/health/emr-upload-document',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    sharePDFInvoice: {
      apiConfig: {
        url: '/emr/patient/episode-of-care/share-document-reference',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveAppointmentPdf: {
      apiConfig: {
        url: '/you/patient/health/emr-upload-document',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    shareAppointmentPdf: {
      apiConfig: {
        url: '/emr/patient/episode-of-care/share-document-reference',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    getAppointmentReportsDateWise: {
      apiConfig: {
        url: '/emr/dashboard/OPD/appointment-report',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    getReferralReportsDateWise: {
      apiConfig: {
        url: '/emr/dashboard/OPD/referral-report',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    saveHelpDesk: {
      apiConfig: {
        url: '/emr/user/contact-us',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: true, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    sendVideoNotification: {
      apiConfig: {
        url: '/you/patient/push-notification',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
  },

  Administration: {
    deletePractioner: {
      apiConfig: {
        url: '/emr/patient/practitioner/delete',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    savePractioner: {
      apiConfig: {
        url: '/emr/patient/practitioner/create',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
    editPractioner: {
      apiConfig: {
        url: '/emr/patient/practitioner/update',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },

    bundleSave: {
      apiConfig: {
        url: '/emr/org/bundle/save',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Def
    },
  },
};

export default ApiConstants;
