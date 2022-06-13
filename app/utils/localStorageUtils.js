import lscache from 'lscache';

export const setToLocalStorage = (key, data) => {
  if (data) {
    lscache.flushExpired();
    lscache.set(key, btoa(JSON.stringify(data)), 43200 * 3); // 30days->43200;
  }
};

export const setToLocalStoragePromise = (key, data) =>
  new Promise((resolve, reject) => {
    try {
      setToLocalStorage(key, data);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });

export const getFromLocalStorage = key => {
  let data = null;
  if (key) {
    const criteriaStr = lscache.get(key);
    if (criteriaStr) {
      data = JSON.parse(atob(criteriaStr));
    }
  }
  return data;
};

export const getFromLocalStoragePromise = key =>
  new Promise((resolve, reject) => {
    try {
      resolve(getFromLocalStorage(key));
    } catch (e) {
      reject(e);
    }
  });

export const deleteKeyFromLocalStorage = key => {
  if (key) {
    lscache.remove(key);
    lscache.flushExpired();
  }
};

export const deleteKeyFromLocalStoragePromise = key => {
  new Promise((resolve, reject) => {
    try {
      deleteKeyFromLocalStorage(key);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

export const getOrganizationDetails = () => {
  const org = getFromLocalStorage('ORG');
  const loc = getFromLocalStorage('LOC');
  const loginUserDetails = getFromLocalStorage('data').userDetails;
  const orgLogo = getFromLocalStorage('data').userDetails
    .organizationDetails[0]['organizationLogo'];
  const gstn = getFromLocalStorage('data').userDetails.organizationDetails[0][
    'gstin'
  ];

  const orgName = org !== null ? org.split('|')[1].split('/')[0] : null;
  const locName =
    org !== null
      ? loc
          .split('|')[1]
          .split('/')
          .pop()
      : null;

  return {
    orgName: orgName || '',
    locName: locName || '',
    gstn: gstn || '',
    orgLogo: orgLogo || '',
    email: loginUserDetails.email || '',
    phone: loginUserDetails.phone || '',
    endpoint: loginUserDetails.organizationDetails
      ? loginUserDetails.organizationDetails[0]['endpoint'] || ''
      : '',
  };
};

export const getPractitionerData = () => {
  return getFromLocalStorage('data').userDetails || {};
};
