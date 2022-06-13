export const ROUTES_CONSTANTS = Object.freeze({
  LOGIN: '/login',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',

  SEARCH_PATIENTS: '/patients',
  CREATE_PATIENTS: '/patients/create',
  PATIENT_EVERYTHING: '/patients/patient/everything',

  MY_APPOINTMENTS: '/opd/appointments/doctor',
  ALL_APPOINTMENTS: '/opd/appointments',
  CREATE_APPOINTMENTS: '/opd/appointments/create',
  APPOINTMENT_REPORTS: '/reports/listing/appointment',
  REFERRAL_REPORTS: '/reports/listing/referral',

  EPISODE_OF_CARE: '/opd/eoc',
  APPOINTMENT_SUMMARY: '/opd/eoc/summary',

  BILLING: '/billing',
  GENERATE_BILLING: '/billing/generate',
  REPORTS: '/reports/listing/billing',

  ADMINISTRATION_HOSPITAL: '/administration/hospital',
  ADMINISTRATION_HOSPITALS: '/administration/hospitals',
  ADMINISTRATION_HOSPITAL_CREATE: '/administration/hospital/create',
  ADMINISTRATION_HOSPITAL_EDIT: '/administration/hospital/edit',

  ADMINISTRATION_HOSPITAL_LICENSE: '/administration/hospital/license',
  ADMINISTRATION_HOSPITAL_LICENSE_EDIT: '/administration/hospital/license/edit',
  ADMINISTRATION_HOSPITAL_LICENSE_MANAGE:
    '/administration/hospital/license/manage',
  ADMINISTRATION_HOSPITAL_LICENSE_HISTORY:
    '/administration/hospital/license/history',

  ADMINISTRATION_DOCTORS: '/administration/doctors',
  ADMINISTRATION_DOCTOR_CREATE: '/administration/doctor/create',
  ADMINISTRATION_DOCTOR_EDIT: '/administration/doctor/edit',

  ADMINISTRATION_STAFF: '/administration/staff',
  ADMINISTRATION_STAFF_CREATE: '/administration/staff/create',
  ADMINISTRATION_STAFF_EDIT: '/administration/staff/edit',

  ADMINISTRATION_LOCATION_CREATE: '/administration/location/create',
  ADMINISTRATION_LOCATION_EDIT: '/administration/location/edit',

  ADMINISTRATION_LAB_MASTER: '/administration/lab-master',
  ADMINISTRATION_LAB_MASTER_EDIT: '/administration/lab-master/edit',
  ADMINISTRATION_LAB_MASTER_UPLOAD: '/administration/lab-master/upload',

  ADMINISTRATION_SCHEDULES: '/administration/schedules',
  ADMINISTRATION_SLOTS: '/administration/slots',

  TREATMENT_PLAN: '/planner/treatment',
  TREATMENT_PLAN_CREATE: '/planner/treatment/chemo/order',
  VIDEO_CONSULTATION: '/video-consultation',

  NOTIFICATION: '/notification',

  ADMINISTRATION_PROFILE: '/administration/profile',
  ADMINISTRATION_PROFILE_ADD_REFERENCE_LINK:
    '/administration/profile/addReferenceLink',
  ADMINISTRATION_PROFILE_EDIT_REFERENCE_LINK:
    '/administration/profile/editReferenceLink',
  ADMINISTRATION_PROFILE_CONFIGURE: '/administration/profile/configure',
  ADMINISTRATION_PROFILE_CONFIGURE_ADD_NEW_SLOT:
    '/administration/profile/configure/slot_add',
  ADMINISTRATION_PROFILE_CONFIGURE_EDIT_SLOT:
    '/administration/profile/configure/slot_edit',
  ADMINISTRATION_PROFILE_CONFIGURE_ADD_BLOCK_CALENDER:
    '/administration/profile/configure/blockCalender_add',
  ADMINISTRATION_PROFILE_CONFIGURE_EDIT_BLOCK_CALENDER:
    '/administration/profile/configure/blockCalender_edit',
});
