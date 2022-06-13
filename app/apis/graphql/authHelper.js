import { getFromLocalStorage } from '../../utils/localStorageUtils';

// const token = getFromLocalStorage('TOKEN');
// console.log('token',getFromLocalStorage('TOKEN'));

// class AuthHelper {
//   getAuthHeaders() {
//     return {
//       Authorization: `Bearer ${token.accessToken}`,
//     };
//   }
// }

// export default new AuthHelper();

const getToken = () => {
  const token = getFromLocalStorage('HKTWQ');
  return token ? `Bearer ${token.accessToken}` : '';
};

const getOrg = () => {
  const org = getFromLocalStorage('ORG');
  return org ? org : '';
};
const getLoc = () => {
  const loc = getFromLocalStorage('LOC');
  return loc ? loc : '';
};

class AuthHelper {
  getAuthHeaders() {
    return {
      Authorization: getToken(),
      Organization: getOrg(),
      Location: getLoc(),
      'Accept-Encoding': 'gzip',
    };
  }
}

export default new AuthHelper();
