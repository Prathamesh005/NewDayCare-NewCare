import { URLS } from '../../utils/urls';
import _ from 'lodash';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const practionerDelete = payload => {
  return {
    resourceType: payload.resourceType,
    resourceId: payload.id,
  };
};

export const practionerSave = payload => {
  console.log('payload', payload);
  const {
    firstName = null,
    middleName = null,
    lastName = null,
    dateOfBirth = null,
    gender = null,
    about = null,
    phone = null,
    email = null,
    speciality = null,
    language = [],
    qualification = [],
    experienceYear = null,
    registrationDetails = null,
    channelLink = null,
    signatureText = null,
  } = payload.values;

  const {
    role = null,
    resourceName = null,
    profileContentT = null,
    profileSelectedFile = null,
    signatureContentT = null,
    signatureSelectedFile = null,
    languageData,
    practionerId,
  } = payload;

  let languageArray =
    language &&
    language.map(ele => {
      let getCode = languageData.find(val => val.code === ele);
      return {
        codeableSystem: URLS.LANGUAGE,
        code: getCode.code,
        display: ele,
        text: ele,
      };
    });

  let qualificationCodeString =
    qualification && _.map(qualification, 'code').join(',');

  let qualificationDisplayString =
    qualification && _.map(qualification, 'display').join(',');

  return {
    resourceId: practionerId || null,
    role: role,
    birthDate: dateOfBirth || null,
    gender: gender || null,
    phone: phone,
    email: email || null,
    photo: profileSelectedFile || null,
    contentType: profileContentT || null,
    first: firstName,
    last: middleName,
    middle: lastName,
    signature: signatureSelectedFile || null,
    signatureContentType: signatureContentT || null,
    experience: (experienceYear && experienceYear.display) || null,
    // medicalRegistration: 'MMC',
    registrationNo: registrationDetails || null,
    about: about || null,
    channel: channelLink || null,
    // expertiseIn:'His expertise include breast cancer, lung, colon and GI cancers, neuroendocrine tumors, gynecological and genitourinary/prostate cancers, lymphoma, myeloma, and other hematolymphoid malignancies',
    languages: languageArray,
    qualifications:
      qualification.length > 0
        ? [
            {
              code: {
                codeableSystem: URLS.QUALIFICATION,
                code: qualificationCodeString,
                text: qualificationDisplayString,
                display: qualificationDisplayString,
              },
              qualification: qualificationDisplayString,
            },
          ]
        : [],
    practitionerRoleInOrganization: [
      {
        speciality: [
          {
            codeableSystem: URLS.SPECIALITY,
            code: speciality.code,
            text: speciality.display,
            display: speciality.display,
          },
        ],
      },
    ],
  };
};

export const locationAddEdit = payload => {
  const {
    hospitalName,
    serviceType,
    status,
    address,
    city,
    pincode,
    email,
    phone,
    startTime,
    endTime,
  } = payload.values;
  const { organization, selectedDays, Id } = payload;

  let cityState = (city && city.split(',')) || null;
  debugger;

  return {
    locations: [
      {
        resourceId: Id ? Id : uuidv4(),
        name: hospitalName || null,
        status: (status && status.display) || null,
        email: email || null,
        phone: phone || null,
        organization:
          organization && organization.resourceId ? organization : null,
        address:
          !address && !(cityState && cityState[0]) && !pincode
            ? null
            : {
                line: address ? address : null,
                city: cityState && cityState[0] ? cityState[0] : null,
                state: cityState && cityState[1] ? cityState[1] : null,
                postalCode: pincode ? pincode : null,
              },
        serviceType: [],
        startTime: moment(startTime, 'hmmss').format('HH:mm:ss'), //'08:30:0'
        endTime: moment(endTime, 'hmmss').format('HH:mm:ss'), //'12:30:00'
        weeks: selectedDays,
      },
    ],
  };
};

export const hospitalAdd = payload => {
  debugger;
  return {};
};

export const hospitalEdit = payload => {
  debugger;
  return {};
};
