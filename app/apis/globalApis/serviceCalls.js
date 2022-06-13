export const searchTests = payload => {
  return {
    query: payload.test,
    page: {
      size: 100,
    },
    result_fields: {
      testname: {
        raw: {},
      },
      shortname: {
        raw: {},
      },
      testcategoryname: {
        raw: {},
      },
    },
  };
};
export const searchMolecularTest = payload => {
  return {
    search: payload,
  };
};
export const searchDrugs = payload => {
  return {
    query: payload.drug,
    page: {
      size: 100,
    },
    result_fields: {
      brand_name: {
        raw: {},
      },
      generic_name: {
        raw: {},
      },
    },
  };
};

export const saveBmiBsa = data => {
  return {
    noOfCiggrette:
      data.noOfCiggrette !== '' && data.noOfCiggrette !== undefined
        ? parseInt(data.noOfCiggrette)
        : 0,
    noOfYearSmoked:
      data.noOfYearSmoked !== '' && data.noOfYearSmoked !== undefined
        ? parseInt(data.noOfYearSmoked)
        : 0,

    gender: data.gender !== '' ? data.gender : null,
    weight:
      data.weight !== '' && data.weight !== undefined
        ? {
            code: `/${data.weightUnit}`,
            unit: data.weightUnit,
            value: data.weight,
          }
        : null,
    height:
      data.height !== '' && data.height !== undefined
        ? {
            code: `/${data.heightUnit}`,
            unit: data.heightUnit,
            value: data.height,
          }
        : null,
  };
};

export const saveCancerGeriatricAssessment = data => {
  return {
    status: 'InProgress',
    subject: {
      display: data.display,
      resourceId: data.resourceId,
      resourceType: 'Patient',
      resourceReference: `Patient/${data.resourceId}`,
    },
    questionnaire: 'Questionnaire/ef37c984-92a1-404c-8e9c-8887946cb3b8',
    author: {
      display: data.praDisplay,
      resourceId: data.praResourceId,
      resourceType: 'Practitioner',
      resourceReference: `Practitioner/${data.praResourceId}`,
    },
    reportedAnswer: data.resultData.map(val => {
      return {
        Question: val.question,
        Response: val.display,
        Score: parseInt(val.code),
      };
    }),
  };
};
export const savePatient = payload => {
  return {
    active: false,
    sendInvite: payload.sendInvite,
    role: 'Patient',
    resourceId: null,
    birthDate: payload.dateOfBirth,
    age: payload.dob,
    gender: payload.gender,
    phone: payload.phone,
    photo: payload.image !== '' ? payload.image : null,
    contentType: payload.contentType !== '' ? payload.contentType : null,
    first: payload.firstName,
    last: payload.lastName,
    address: [
      {
        line: payload.city,
        city: payload.city,
      },
    ],
  };
};

export const updatePatient = payload => {
  return {
    role: 'Patient',
    resourceId: payload.id,
    birthDate: payload.dateOfBirth,
    age: payload.dob,
    gender: payload.gender,
    phone: payload.phone,
    photo: payload.image !== '' ? payload.image : null,
    contentType: payload.contentType,
    first: payload.firstName,
    last: payload.lastName,
    address: [
      {
        line: payload.city,
        city: payload.city,
      },
    ],
  };
};
