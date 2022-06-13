export const GET_AVAILABLE_TIME_SLOTS = `
query
PatientDataQuery($practitionerID: String!, $fromDate: String!, $toDate: String!){
 data:getAvailableSlots(scheduleSlotSearchCriteriaType:{
 nextResultUrl:null,
 limit:0,
 practitioner:$practitionerID,
 location:"",
 fromDate:$fromDate,
 toDate:$toDate,
 serviceCategory:"",
 serviceType:"",
 speciality:""
 })
 {
     recordCount,
     nextResultUrl
     scheduleSlots
     {
        slot
        {
            resourceId,
            status,
            start,
            end,
            appointmentType
            {
                codeableSystem
                code,
                display,
                text     
            },
            serviceCategory
            {
                codeableSystem
                code,
                display,
                text     
            },
            serviceType
            {
                codeableSystem
                code,
                display,
                text     
            },
            speciality
            {
                codeableSystem
                code,
                display,
                text     
            },
            schedule
            {
               resourceId,
               resourceType,
               resourceReference,
               display
            }
         }
 
      }
}
}
`;

export const GET_PATIENT_DETAILS_FROM_ID = `
query
PatientDataQuery($id: String!){
 data:patientDetails(patientDetailsInput:{
resourceId:$id
 })
 {
    patient
        {
            resourceId,
            first,
            last,
            phone,
            birthDate,
            middle,
            display,
            gender,
            city,
            age,
            nQPatientId,
            addressDetail{
                line,
                city,
                state,
                district,
                addressType,
                postalCode
           }
        }
 }
}
`;

export const LOAD_All_APPOINTMENTS = `query
PatientDataQuery($fromDate:String!,$toDate:String!){
 data:allAppointmentElasticSearch(allAppointmentSearchCriteria:{
nextResultUrls: [],
sortOrder:"",
limit:100,
status:"",
practitioner:"",
fromDate:$fromDate,
toDate:$toDate,
patient:""
criteriaCode:"",
additionalParams:[
    {
        patientSearchParamType:"string",
        patientSearchParamValue:null
    }
 ]
 })
 {
   recordCount,
   nextResultUrls,
    cancerPractitioner
   {
       practitioner
       {
           resourceId,
           first,
           middle,
           display
           cancerPatientAppointments
           {
               resourceId,
               appointmentStatus,
               startDateTime,
               endDateTime,
               serviceType
               {
                   code,
                   text,
                   display
               },
               cancerPatient
               {
                   first,
                   phone,
                   age,
                   gender,
                   resourceId,
                   display
               }
           }
       }
   }
 
 }
}`;

export const GET_All_APPOINTMENTS = (
    practitioner,
    fromDate,
    patinetValue,
) =>
    `query
  PatientDataQuery{
   data:patientAppointmentSearch(patientAppointmentSearchCriteria:{
  nextResultUrls:[],
  noCancelledAppointment:true,
  sortOrder:"",
  limit:100,
  status:"",
  dates:${JSON.stringify(fromDate)},
  practitioner:${JSON.stringify(practitioner)},
  criteriaCode:"",
  additionalParams:[
      {
          patientSearchParamType:"Name",
          patientSearchParamValue:${JSON.stringify(patinetValue)}
      }
   ]
   })
   {
     recordCount,
     nextResultUrls,
     cancerPatientAppointments
     {
         patientAppointment
         {
           appointmentStatus,
           comments,
           startDateTime,
           endDateTime,
           createdDate,
           priority,
           patientInstruction,
            participants
           {
              role,
              actor
              {
  
                  resourceId,
                  identifier,
                  resourceType,
                  resourceReference,
                  display,
              }
          },
          reasonResourceReference
              {
                  resourceId,
                  identifier,
                  resourceType,
                  resourceReference,
                  display,
              }
          speciality
          {
              codeableSystem,
              code,
              text,
              display
          },
           serviceType
          {
              codeableSystem,
              code,
              text,
              display
          },
           serviceCategory
          {
              codeableSystem,
              code,
              text,
              display
          },
             appointmentCancellationReason
          {
              codeableSystem,
              code,
              text,
              display
          },
            appointmentType
          {
              codeableSystem,
              code,
              text,
              display
          },
            reasonCode
          {
              codeableSystem,
              code,
              text,
              display
          },
          resourceId
        }
     }
   
   }
  }
  `;