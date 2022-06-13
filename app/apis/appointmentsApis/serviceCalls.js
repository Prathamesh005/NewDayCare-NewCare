import moment from 'moment';

export const createAppointmentService = data => {
  const instructionString = `${
    data.instructions.eatHealthyFood ? 'Eat Healthy Food' : ''
  },${data.instructions.restBody ? 'Rest Body' : ''}`;
  const fromDate = data.appointmentTimeSlot
    ? data.appointmentTimeSlot.slot.start.slice(0, 16)
    : moment(data.appointmentDate).format('YYYY-MM-DD');
  const toDate = data.appointmentTimeSlot
    ? data.appointmentTimeSlot.slot.end.slice(0, 16)
    : moment(data.appointmentDate).format('YYYY-MM-DD');
  const typeOfAppointment = {
    url: 'http://hl7.org/fhir/ValueSet/service-type',
    code:
      data.typeOfAppointment === 'walkIn'
        ? '630'
        : data.typeOfAppointment === 'videoCall'
        ? '631'
        : null,
    display:
      data.typeOfAppointment === 'walkIn'
        ? 'Clinic Appointment'
        : data.typeOfAppointment === 'videoCall'
        ? 'Video Consultation'
        : null,
  };
  return {
    appointmentStatus:
      fromDate == 'instant' || data.appointmentTimeSlot === null
        ? 'Arrived'
        : 'Pending',
    appointmentCancellationReason: null,
    slot:
      fromDate === 'instant' || data.appointmentTimeSlot === null
        ? null
        : {
            resourceType: 'Slot',
            display: `${fromDate} To ${toDate}`,
            resourceReference: `Slot/${
              data.appointmentTimeSlot.slot.resourceId
            }`,
            resourceId: data.appointmentTimeSlot.slot.resourceId,
          },
    reminderDateTime:
      fromDate == 'instant' || data.appointmentTimeSlot === null
        ? null
        : moment(`${data.appointmentTimeSlot.slot.start}`)
            .utc()
            .format(), //pass as universal 24 hr time depend on local time
    comments: data.comment,
    startDateTime: fromDate,
    endDateTime: toDate,
    createdDate: moment(new Date()).format('YYYY-MM-DD'),
    priority: data.vip ? 1 : 0,
    patientInstruction: instructionString,
    participants: [
      {
        role: 'Patient',
        actor: {
          display: data.patientData.display,
          resourceReference: `${data.patientData.role}/${
            data.patientData.fhirResourceId
          }`,
        },
        required: 'Required',
        participationStatus: 'NeedsAction',
      },
      {
        role: 'Practitioner',
        actor: {
          resourceReference: `Practitioner/${
            data.practitioner.practitioner.resourceId
          }`,
          display: data.practitioner.practitioner.display,
        },
        required: 'Required',
        participationStatus: 'NeedsAction',
      },
    ],
    serviceType:
      typeOfAppointment.code === null
        ? null
        : [
            {
              codeableSystem: typeOfAppointment.url,
              code: typeOfAppointment.code,
              text: typeOfAppointment.display,
              display: typeOfAppointment.display,
            },
          ],
  };
};

export const editAppointmentService = data => {
  const instructionString = `${
    data.instructions.eatHealthyFood ? 'Eat Healthy Food' : ''
  },${data.instructions.restBody ? 'Rest Body' : ''}`;
  const fromDate = data.appointmentTimeSlot.slot.start.slice(0, 16);
  return {
    resourceId: data.appointmentResourceId,
    appointmentStatus:
      fromDate == 'instant' ? 'Arrived' : data.appointmentStatus,
    appointmentCancellationReason: null,
    serviceType: [
      {
        codeableSystem: data.patientData.serviceType
          ? data.patientData.serviceType.codeableSystem
          : null,
        code: data.patientData.serviceType
          ? data.patientData.serviceType.code
          : null,
        text: data.patientData.serviceType
          ? data.patientData.serviceType.text
          : null,
        display: data.patientData.serviceType
          ? data.patientData.serviceType.display
          : null,
      },
    ],
    slot:
      fromDate == 'instant'
        ? null
        : {
            resourceType: 'Slot',
            display: `${data.appointmentTimeSlot.slot.start} To ${
              data.appointmentTimeSlot.slot.end
            }`,
            resourceReference: `Slot/${
              data.appointmentTimeSlot.slot.resourceId
            }`,
            resourceId: data.appointmentTimeSlot.slot.resourceId,
          },
    comments: data.comment,
    startDateTime: data.appointmentTimeSlot.slot.start,
    endDateTime: data.appointmentTimeSlot.slot.end,
    createdDate: moment(new Date()).format('YYYY-MM-DD'),
    priority: data.vip ? 1 : 0,
    patientInstruction: instructionString,
    participants: [
      {
        role: 'Patient',
        actor: {
          display: data.patientData.display,
          resourceReference: `Patient/${data.patientData.fhirResourceId}`,
        },
        required: 'Required',
        participationStatus: 'NeedsAction',
      },
      {
        role: 'Practitioner',
        actor: {
          resourceReference: `Practitioner/${
            data.practitioner.practitioner.resourceId
          }`,
          display: data.practitioner.practitioner.display,
        },
        required: 'Required',
        participationStatus: 'NeedsAction',
      },
    ],
  };
};

export const cancelAppointmentService = data => {
  return {
    resourceId: data.id,
    appointmentStatus: 'Cancelled',
    reasonCode: [
      {
        codeableSystem: data.url,
        code: data.code,
        text: data.display,
        display: data.display,
      },
    ],
  };
};

export const saveAppointmentPdf = field => {
  return {
    cancerDocumentReference: {
      resourceId: field.resourceId,
      recordName: field.recordName,
      labOrDoctorName: field.practitioner.name,
      description: 'AppointmentSummary',
      category: [
        {
          codeableSystem: 'http://loinc.org',
          code: 'Clinical Notes',
          text: 'Clinical Notes',
          display: 'Clinical Notes',
        },
      ],
      author: [
        {
          resourceId: field.practitioner.resourceId,
          resourceType: 'Practitioner',
          resourceReference: `Practitioner/${field.practitioner.resourceId}`,
          display: field.practitioner.display,
        },
      ],
      authenticator: {
        resourceId: field.practitioner.resourceId,
        resourceType: 'Practitioner',
        resourceReference: `Practitioner/${field.practitioner.resourceId}`,
        display: field.practitioner.display,
      },
      cancerPatientResourceReference: {
        resourceId: field.patientDetails.details.resourceId,
        resourceType: 'Patient',
        resourceReference: `Patient/${field.patientDetails.details.resourceId}`,
        display: field.patientDetails.details.display,
      },
      reportedDate: moment().format('YYYY-MM-DD'),
      content: field.content,
    },
  };
};
