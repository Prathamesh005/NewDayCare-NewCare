export const GET_BY_CANCER_TYPE_DATA = `
query
PatientDataQuery($id:String!){
data:patientCancerTypeReport(commonSearchCriteria:{
fromDate:"",
toDate:"",
resourceId:$id
})
 {  
     name,
     metric,
     value
 }
}
`;

export const GET_BY_AGE_DATA = `
query
PatientDataQuery($id:String!){
data:patientGenderAgeGroupReport(commonSearchCriteria:{
fromDate:"",
toDate:"",
resourceId:$id
})
 {  
     ageGroup,
     cancerPatientCount,
     maleCount,
     femaleCount
 }
}
`;

export const GET_BY_UPCOMINGS_DATA = `
query
PatientDataQuery($id:String!){
 data:patientAppointmentSearch(patientAppointmentSearchCriteria:{
nextResultUrl: null,
sortOrder:"",
status:"",
resourceId:$id
 })
 {
   recordCount,
   nextResultUrl,
   todayAppointment,
   thisWeekAppointment,
   clinicalAppointment,
   videoConsultation,
   homeVisit
   cancerPatientAppointments
   {
         cancerPatient
         {
             active,
             image,
             age,
             gender,
             contentType,
             first,
             last
         },
         appointmentStatus,
         startDateTime,
         endDateTime,
         createdDate,
          participants
         {
            actor
            {
                resourceId,
                identifier,
                resourceType,
                resourceReference,
                display,
            }
        },
         serviceType
        {
            codeableSystem,
            code,
            text,
            display
        }
   }
 
 }
}
`;

export const GET_BY_TOTAL_DATA = `
query
PatientDataQuery($id:String!){
 data:totalPatientReport(totalPatientReportCriteria:{
nextResultUrl: null,
sortOrder:"",
status:"",
resourceId:$id
 })
 {
   totalPatient,
   lastWeekPatient
 }
}`;

export const GET_BY_TOTAL_INCOME_DATA = `
query
PatientDataQuery($id:String!){
  data:totalInvoiceReport(totalInvoiceReportCriteria:{
nextResultUrl: null,
sortOrder:"",
status:"",
resourceId:$id
 })
 {
   thisMonthIncome,
   lastWeekIncome
 }
}
`;

export const GET_BY_TOTAL_REFERRAL_DATA = `
query
PatientDataQuery($id:String!){
  data:totalRefferalReport(totalRefferalReportCriteria:{
nextResultUrl: null,
sortOrder:"",
status:"",
resourceId:$id
 })
 {
   totalRefferals,
   lastWeekRefferals
 }
}`;
