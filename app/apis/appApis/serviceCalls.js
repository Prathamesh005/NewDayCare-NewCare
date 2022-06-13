export const login = payload => {
  return {
    phone: payload.phoneno,
    otp: payload.otp,
    deviceId: payload.uid,
  };
};

export const generateOtp = payload => {
  return {
    phone: payload.phoneno,
    deviceId: payload.uid,
  };
};
