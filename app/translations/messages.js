/*
 * Components Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'messages';

export default defineMessages({
  layout: {
    dashboard: {
      id: `${scope}.layout.dashboard`,
      defaultMessage: 'Dashboard',
    },
    allPatient: {
      id: `${scope}.layout.allPatient`,
      defaultMessage: 'All Patients',
    },
    searchPatient: {
      id: `${scope}.layout.searchPatient`,
      defaultMessage: 'Search Patients',
    },
    patientRegistration: {
      id: `${scope}.layout.patientRegistration`,
      defaultMessage: 'Register New Patient',
    },
    earlyDetection: {
      id: `${scope}.layout.earlyDetection`,
      defaultMessage: 'Early Detection',
    },
    diagnosis: {
      id: `${scope}.layout.diagnosis`,
      defaultMessage: 'Diagnosis',
    },
    appointments: {
      id: `${scope}.layout.appointments`,
      defaultMessage: 'My Appointments',
    },
    allappointments: {
      id: `${scope}.layout.allappointments`,
      defaultMessage: 'All Appointments',
    },
    onlyappointments: {
      id: `${scope}.layout.onlyappointments`,
      defaultMessage: 'Appointments',
    },
    appointmentReports: {
      id: `${scope}.layout.appointmentReports`,
      defaultMessage: 'Appointment Report',
    },
    referralReports: {
      id: `${scope}.layout.referralReports`,
      defaultMessage: 'Referral Report',
    },
    bookappointment: {
      id: `${scope}.layout.bookappointment`,
      defaultMessage: 'Create Appointment',
    },
    onlysurgeries: {
      id: `${scope}.layout.onlysurgeries`,
      defaultMessage: 'Surgeries',
    },
    surgeries: {
      id: `${scope}.layout.surgeries`,
      defaultMessage: 'My Surgeries',
    },
    allsurgeries: {
      id: `${scope}.layout.allsurgeries`,
      defaultMessage: 'All Surgeries',
    },
    booksurgery: {
      id: `${scope}.layout.booksurgery`,
      defaultMessage: 'Book Surgery',
    },
    crossReferal: {
      id: `${scope}.layout.crossReferal`,
      defaultMessage: 'Cross Referal',
    },

    survivorshipCare: {
      id: `${scope}.layout.survivorshipCare`,
      defaultMessage: 'Survivorship Care',
    },
    onlyAdministration: {
      id: `${scope}.layout.onlyAdministration`,
      defaultMessage: 'Administration',
    },
    administration: {
      id: `${scope}.layout.administration`,
      defaultMessage: 'nuQare Administration',
    },
    clinicalAdministration: {
      id: `${scope}.layout.clinicalAdministration`,
      defaultMessage: 'Hospital Administration',
    },
    organization: {
      id: `${scope}.layout.organization`,
      defaultMessage: 'Organization',
    },
    labMaster: {
      id: `${scope}.layout.labMaster`,
      defaultMessage: 'Lab Master',
    },
    valueSet: {
      id: `${scope}.layout.valueSet`,
      defaultMessage: 'Value Set',
    },

    doctor: {
      id: `${scope}.layout.doctor`,
      defaultMessage: 'Doctor',
    },
    staff: {
      id: `${scope}.layout.staff`,
      defaultMessage: 'Staff',
    },
    Patient: {
      id: `${scope}.layout.Patient`,
      defaultMessage: 'Patient',
    },
    onlyDayCare: {
      id: `${scope}.layout.onlyDayCare`,
      defaultMessage: 'DayCare',
    },
    dayCare: {
      id: `${scope}.layout.dayCare`,
      defaultMessage: 'DayCare',
    },
    dayCareCreate: {
      id: `${scope}.layout.dayCareCreate`,
      defaultMessage: 'Create Day Care',
    },
    Schedule: {
      id: `${scope}.layout.Schedule`,
      defaultMessage: 'Schedule',
    },
    Health: {
      id: `${scope}.layout.Health`,
      defaultMessage: 'Org HealthCare',
    },
    Slot: {
      id: `${scope}.layout.Slot`,
      defaultMessage: 'Slot',
    },
    Location: {
      id: `${scope}.layout.Location`,
      defaultMessage: 'Location',
    },
    Organization: {
      id: `${scope}.layout.Organization`,
      defaultMessage: 'Organization',
    },
    HomeRemedies: {
      id: `${scope}.layout.HomeRemedies`,
      defaultMessage: 'Home Remedies',
    },

    adddoctor: {
      id: `${scope}.layout.adddoctor`,
      defaultMessage: 'Add Doctor',
    },

    updatedoctor: {
      id: `${scope}.layout.updatedoctor`,
      defaultMessage: 'All Practitioner ',
    },

    addpatient: {
      id: `${scope}.layout.addpatient`,
      defaultMessage: 'Add patient',
    },

    updatepatient: {
      id: `${scope}.layout.updatepatient`,
      defaultMessage: 'All Patient',
    },
    addscheduleslot: {
      id: `${scope}.layout.addscheduleslot`,
      defaultMessage: 'Add Schedule',
    },

    updatescheduleslot: {
      id: `${scope}.layout.updatescheduleslot`,
      defaultMessage: 'All Schedule',
    },
    addslot: {
      id: `${scope}.layout.addslot`,
      defaultMessage: 'Add Slot',
    },
    updateslot: {
      id: `${scope}.layout.updateslot`,
      defaultMessage: 'All Slot',
    },
    addlocation: {
      id: `${scope}.layout.addlocation`,
      defaultMessage: 'Add OT',
    },
    updatelocation: {
      id: `${scope}.layout.updatelocation`,
      defaultMessage: 'All OT',
    },
    addbranch: {
      id: `${scope}.layout.addbranch`,
      defaultMessage: 'Add Branch',
    },
    updatebranch: {
      id: `${scope}.layout.updatebranch`,
      defaultMessage: 'All Branch',
    },
    addorg: {
      id: `${scope}.layout.addorg`,
      defaultMessage: 'Hosptal/Clinic',
    },
    updateorg: {
      id: `${scope}.layout.updateorg`,
      defaultMessage: 'All Hosptal/Clinic',
    },
    addhome: {
      id: `${scope}.layout.addhome`,
      defaultMessage: 'Add Home Remdies',
    },
    updatehome: {
      id: `${scope}.layout.updatehome`,
      defaultMessage: 'All Home Remdies',
    },
    addhealth: {
      id: `${scope}.layout.addhealth`,
      defaultMessage: 'Add Org HealthCare Service',
    },
    updatehealth: {
      id: `${scope}.layout.updatehealth`,
      defaultMessage: 'All Org HealthCare Service',
    },
    addPracRole: {
      id: `${scope}.layout.addPracRole`,
      defaultMessage: 'Add Practioner Role',
    },
    updatepracRole: {
      id: `${scope}.layout.updatepracRole`,
      defaultMessage: 'All Practioner Role',
    },
    addvalueset: {
      id: `${scope}.layout.addvalueset`,
      defaultMessage: 'Add ValueSet',
    },
    updatevalueset: {
      id: `${scope}.layout.updatevalueset`,
      defaultMessage: 'All ValueSet',
    },
    addquestioner: {
      id: `${scope}.layout.addquestioner`,
      defaultMessage: 'Add Questionnaire',
    },
    updatequestioner: {
      id: `${scope}.layout.updatequestioner`,
      defaultMessage: 'All Questionnaire',
    },
    billing: {
      id: `${scope}.layout.billing`,
      defaultMessage: 'Billing',
    },
    billReport: {
      id: `${scope}.layout.billReport`,
      defaultMessage: 'Reports',
    },
    generateBill: {
      id: `${scope}.layout.generateBill`,
      defaultMessage: 'Generate Bill',
    },
    analytics: {
      id: `${scope}.layout.analytics`,
      defaultMessage: 'Analytics',
    },
    helpdesk: {
      id: `${scope}.layout.helpdesk`,
      defaultMessage: 'Help Desk',
    },
    treatmentPlan: {
      id: `${scope}.layout.treatmentPlan`,
      defaultMessage: 'Treatment Plan',
    },
  },
  months: {
    jan: {
      id: `${scope}.months.jan`,
      defaultMessage: 'January',
    },
    feb: {
      id: `${scope}.months.feb`,
      defaultMessage: 'February',
    },
    mar: {
      id: `${scope}.months.mar`,
      defaultMessage: 'March',
    },
    apr: {
      id: `${scope}.months.apr`,
      defaultMessage: 'April',
    },
    may: {
      id: `${scope}.months.may`,
      defaultMessage: 'May',
    },
    jun: {
      id: `${scope}.months.jun`,
      defaultMessage: 'June',
    },
    jul: {
      id: `${scope}.months.jul`,
      defaultMessage: 'July',
    },
    aug: {
      id: `${scope}.months.aug`,
      defaultMessage: 'August',
    },
    sep: {
      id: `${scope}.months.sep`,
      defaultMessage: 'September',
    },
    oct: {
      id: `${scope}.months.oct`,
      defaultMessage: 'October',
    },
    nov: {
      id: `${scope}.months.nov`,
      defaultMessage: 'November',
    },
    dec: {
      id: `${scope}.months.dec`,
      defaultMessage: 'December',
    },
  },
  Auth: {
    signin: {
      title: {
        id: `${scope}.Auth.signin.title`,
        defaultMessage: 'Welcome',
      },
      subtitle: {
        id: `${scope}.Auth.signin.subtitle`,
        defaultMessage: 'Please login to your account',
      },
      rememberMe: {
        id: `${scope}.Auth.signin.rememberMe`,
        defaultMessage: 'Remember Me',
      },
    },
    signout: {
      title: {
        id: `${scope}.Auth.signout.title`,
        defaultMessage: 'Welcome',
      },
      subtitle: {
        id: `${scope}.Auth.signout.subtitle`,
        defaultMessage: 'Please login to your account',
      },
      logoutText: {
        id: `${scope}.Auth.signout.logoutText`,
        defaultMessage: 'You have been logged out',
      },
      logoutSubtext: {
        id: `${scope}.Auth.signout.logoutSubtext`,
        defaultMessage: "Don't worry, you can login below",
      },
    },
    sessionExpiry: {
      title: {
        id: `${scope}.Auth.sessionExpiry.title`,
        defaultMessage: 'Welcome',
      },
      subtitle: {
        id: `${scope}.Auth.sessionExpiry.subtitle`,
        defaultMessage: 'Please login to your account',
      },
    },
    phoneno: {
      id: `${scope}.Auth.phoneno`,
      defaultMessage: 'Enter Phone Number *',
    },
    phoneplaceholder: {
      id: `${scope}.Auth.phoneplaceholder`,
      defaultMessage: 'Enter Phone Number *',
    },
    otpword: {
      id: `${scope}.Auth.otpword`,
      defaultMessage: 'Enter OTP',
    },
    login: {
      id: `${scope}.Auth.login`,
      defaultMessage: 'Login',
    },
    logout: {
      id: `${scope}.Auth.logout`,
      defaultMessage: 'Log Out',
    },
    forgotPass: {
      id: `${scope}.Auth.forgotPass`,
      defaultMessage: 'Forgot Password?',
    },
    rightsReservedMessage: {
      id: `${scope}.Auth.rightsReservedMessage`,
      defaultMessage: 'All Copyrights Reserved',
    },
  },
});
