import {
  getFromLocalStorage,
  deleteKeyFromLocalStorage,
} from './localStorageUtils';

export const getUserCredentials = () =>
  getFromLocalStorage('HKTWQ') && getFromLocalStorage('HKTWQ').userDetails
    ? getFromLocalStorage('HKTWQ').userDetails
    : {};

//session
//getFromLocalStorage('HKTWQ') &&
// getFromLocalStorage('HKTWQ').tokenExpireTime > Math.floor(Date.now() / 1000)

export const isAuthenticate = () => {
  if (
    getFromLocalStorage('HKTWQ').accessToken &&
    getFromLocalStorage('HKTWQ').refreshToken &&
    getFromLocalStorage('HKTWQ').userDetails
  ) {
    return true;
  } else {
    return false;
  }
};

export const clearLocalStorage = () => {
  deleteKeyFromLocalStorage('HKTWQ');
  deleteKeyFromLocalStorage('TOKEN');
  deleteKeyFromLocalStorage('FHIRRESORCEID');
  deleteKeyFromLocalStorage('USERNAME');
  deleteKeyFromLocalStorage('FNAME');
  deleteKeyFromLocalStorage('LNAME');
  deleteKeyFromLocalStorage('data');
  deleteKeyFromLocalStorage('ORG');
  deleteKeyFromLocalStorage('LOC');
  deleteKeyFromLocalStorage('BDA');
  deleteKeyFromLocalStorage('RWF');
  deleteKeyFromLocalStorage('ROF');
  deleteKeyFromLocalStorage('SUBSCRIPTION');
};

export const checkResponseSuccess = result => {
  if (result.status === 200 || result.data) {
    return true;
  } else {
    return false;
  }
};

export const checkResponseError = result => {
  if (result.status === 400 && result.data.error) {
    return true;
  } else {
    return false;
  }
};

// NOTE: In test
export function handleResponse(result, data) {
  // console.log(result, data)
}

export const checkEitherRWRO = module => {
  const found = true;
  // getFromLocalStorage('RWF').find(item => item === module) ||
  // getFromLocalStorage('ROF').find(item => item === module);
  if (found) return true;
  else return false;
};

export const getOrganizationData = type => {
  let org = getFromLocalStorage('ORG');

  if (org) {
    if (type === 'resourceId') {
      org = org && org.split('|')[0];
    } else if (type === 'organizationName') {
      org = org && org.split('|')[1].split('/')[0];
    }
  }

  return org ? org : null;
};
