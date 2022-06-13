import { v4 as uuidv4 } from 'uuid';
export const saveEpisodeOfCare = data => {
  // console.log(data);
  // debugger
  let loginDetail = data.field.loginDetail;
  let values = data.field.values;
  let Check = data.field.Check;

  let cityState = values.city.split(',');
  let name = values.fullName.split(' ');
  let additionValueSetDisplay = [];
  let drugElasticDatas = [];
  let diagnosticElasticDatas = [];
  let molecularElasticDatas = [];

  function capitalize(input) {
    var words = input.split(' ');
    var CapitalizedWords = [];
    words.forEach(element => {
      CapitalizedWords.push(
        element[0].toUpperCase() + element.slice(1, element.length),
      );
    });
    return CapitalizedWords.join(' ');
  }

  let filterCombid = data.field.DelComorbidityData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'MedicalHistory',
      resourceType: 'Condition',
      resourceId: v.resourceId,
    };
  });
  let filterAllergy = data.field.DelAllergyData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'MedicalHistory',
      resourceType: 'AllergyIntolerance',
      resourceId: v.resourceId,
    };
  });
  let filterFamily = data.field.DelFamilyHistoryData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'MedicalHistory',
      resourceType: 'FamilyMemberHistory',
      resourceId: v.resourceId,
    };
  });
  let filterPrevTest = data.field.DelPrevTestResultData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'PreviousTestResults',
      resourceType: 'DiagnosticReport',
      resourceId: v.resourceId,
    };
  });
  let filterDeletePrescription = data.field.DelPrescriptionData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'AdvicePrescription',
      resourceType: 'MedicationRequest',
      resourceId: v.resourceId,
    };
  });
  let filterPertainingIllness = data.field.DelPertainingIllnessData.filter(
    val => {
      return val.resourceId !== undefined;
    },
  ).map(v => {
    return {
      display: 'PreviousTestResults',
      resourceType: 'Observation',
      resourceId: v.resourceId,
    };
  });
  let filterOtherIllness = data.field.DelOtherIllnessData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'PreviousTestResults',
      resourceType: 'Observation',
      resourceId: v.resourceId,
    };
  });
  let filterImmunization = data.field.DelImmunizationData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'HealthComplaint',
      resourceType: 'Immunization',
      resourceId: v.resourceId,
    };
  });
  let filterPrescriptionData = data.field.prescriptionData.filter(val => {
    return (
      val.dosageInstruction[0]['code']['display'] !== null &&
      val.dosageInstruction[0]['duration'] !== null &&
      val.newChange
      // val.dosageInstruction[0]['when'].length > 0
    );
  });
  let mainAdviceArray = [].concat.apply([], data.field.adviceData);
  let removedEmptyAdviceArray = mainAdviceArray.filter(
    item => item.code.code !== '',
  );
  let filteredAdviceArray = removedEmptyAdviceArray.map(ele => {
    const { newEntry, ...rest } = ele;
    return rest;
  });
  mainAdviceArray.map(item => {
    // debugger;
    if (item.newEntry) {
      diagnosticElasticDatas.push({
        testname: item.code.display,
        shortname: item.code.code,
      });
    }
  });
  data.field.PrevTestResultData &&
    data.field.PrevTestResultData.map(item => {
      if (item.newEntry) {
        diagnosticElasticDatas.push({
          testname: item.code.display,
          shortname: item.code.code,
        });
      }
    });

  let PrevTestResultData =
    data.field.PrevTestResultData &&
    data.field.PrevTestResultData.map(item => {
      const { newEntry, ...rest } = item;
      return rest;
    });

  let TreatmentDataFinal =
    data.field.TreatmentData &&
    data.field.TreatmentData.map(item => {
      const { newEntry, ...rest } = item;
      return rest;
    });

  data.field.TreatmentData &&
    data.field.TreatmentData.map(item => {
      if (item.newEntry) {
        additionValueSetDisplay.push({
          system: 'ec268654-cbd5-4617-96c4-111542080c1d', //ValueSetResourceId,
          Concept: [
            {
              code: item.display.split('/')[0],
              display: item.display.split('/')[1],
            },
          ],
        });
      }
    });
  data.field.TreatmentHistoryData &&
    data.field.TreatmentHistoryData.map(item => {
      // debugger;
      if (item.type && item.type.split('/')[0].split('|')[1] === 'Custom') {
        additionValueSetDisplay.push({
          system: 'ec268654-cbd5-4617-96c4-111542080c1d', //ValueSetResourceId,
          Concept: [
            {
              code: item.type.split('/')[0],
              display: item.type.split('/')[1],
            },
          ],
        });
      }
    });
  data.field.CheckImmunization &&
    data.field.ImmunizationData.map(item => {
      if (item.vaccineCode.code === item.vaccineCode.display) {
        additionValueSetDisplay.push({
          system: 'b20d87b4-bf53-4cf0-b236-983d1b4bedb9', //ValueSetResourceId,
          Concept: [
            {
              code: item['vaccineCode']['code'],
              display: item['vaccineCode']['display'],
            },
          ],
        });
      }
    });
  filterPrescriptionData.map(item => {
    // debugger;
    if (item.newEntry) {
      // debugger;
      drugElasticDatas.push({
        generic_Name: item.medicationCodeableConcept.text.split('|')[1],
      });
    }
    if (item.newEntryDose) {
      // debugger;
      additionValueSetDisplay.push({
        system: '1fa79b6f-154f-4011-9979-600b85a26070', //ValueSetResourceId,
        Concept: [
          {
            code: item.dosageInstruction[0]['code']['code'],
            display: item.dosageInstruction[0]['code']['display'],
          },
        ],
      });
    }
  });

  const prescriptionData = filterPrescriptionData.map(item => {
    const { newEntry, newEntryDose, newChange, ...rest } = item;
    return rest;
  });

  data.field.CheckComorbidity &&
    data.field.ComorbidityData.map((item, index) => {
      if (item['code']['code'] === item['code']['display']) {
        additionValueSetDisplay.push({
          system: '62331090-8c6c-4aa3-862e-ed288bbb1296', //ValueSetResourceId,
          Concept: [
            {
              code: item['code']['code'],
              display: item['code']['display'],
            },
          ],
        });
      }
    });

  data.field.CheckAllergy &&
    data.field.AllergyData.map((item, index) => {
      if (
        item['reaction'][0]['substance']['code'] ===
        item['reaction'][0]['substance']['display']
      ) {
        additionValueSetDisplay.push({
          system: '9eb8069d-c657-4d30-af5d-d435108b5550', //ValueSetResourceId,
          Concept: [
            {
              code: item['reaction'][0]['substance']['code'],
              display: item['reaction'][0]['substance']['display'],
            },
          ],
        });
      }
    });

  Check.checkFinalDiagnosis &&
    values.checkFinalDiagnosis.code !== '' &&
    values.checkFinalDiagnosis.code === values.checkFinalDiagnosis.display &&
    additionValueSetDisplay.push({
      system: '4e5e5897-dd66-4f6c-9b06-77e352dd805d', //ValueSetResourceId,
      Concept: [
        {
          code: values.checkFinalDiagnosis.code.toLowerCase(),
          display: capitalize(values.checkFinalDiagnosis.display),
        },
      ],
    });
  // let filterTreatment =  data.field.DelTreatmentData.filter((val)=>{ return val.resourceId !== undefined }).map(v=>{return {display:"HealthComplaint",resourceType: "Immunization","resourceId":v.resourceId} })
  let filterTreatment = data.field.DelTreatmentData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: 'TreatmentPlanner',
      resourceType: v.display.split('|')[0],
      resourceId: v.resourceId,
    };
  });
  let filterTreatment1 = data.field.DelTreatmentData.filter(val => {
    return val.resourceId !== undefined;
  }).map(v => {
    return {
      display: v.display,
      resourceType: v.resourceType,
      resourceId: v.resourceId,
    };
  });

  let filterTreatmentHistory = data.field.DelTreatmentHistoryData.filter(
    val => {
      return val.resourceId !== undefined;
    },
  ).map(v => {
    return {
      display: 'TreatmentEvent',
      resourceType: v.type.split('|')[0],
      resourceId: v.resourceId,
    };
  });

  let filterGeneralExamination = data.field.DelGeneralExaminationData.map(v => {
    return {
      display: 'GenSystExamination',
      resourceType: 'Observation',
      resourceId: v.resourceId,
    };
  });

  let filterChiefComplaintData = data.field.DelChiefComplaintData.map(v => {
    return {
      display: 'MedicalHistory',
      resourceType: 'Observation',
      resourceId: v.resourceId,
    };
  });

  let filterDelAdviceData = data.field.DelAdviceData.filter(
    (e, i, a) => a.findIndex(d => d.resourceId === e.resourceId) === i,
  ).map(v => {
    return {
      display: 'AdvicePrescription',
      resourceType: 'ServiceRequest',
      resourceId: v.resourceId,
    };
  });

  let newScoreResultData = Object.assign([], data.field.GeriatricResultData);
  let filterScoreResultData = newScoreResultData.map(val => {
    return {
      Question: val.question,
      Response: val.display,
      Score: parseInt(val.code),
    };
  });

  //molecular testing
  data.field.MolecularTestResultData &&
    data.field.MolecularTestResultData.map(item => {
      if (item.newEntry) {
        molecularElasticDatas.push({
          testname: item.code.display,
          shortname: item.code.code,
        });
      }
    });

  let MolecularTestResultData =
    data.field.MolecularTestResultData &&
    data.field.MolecularTestResultData.map(item => {
      const { newEntry, ...rest } = item;
      return rest;
    });

  let filterMolecularTest = data.field.DelMolecularTestResultData.map(v => {
    return {
      display: 'DiagnosisStaging',
      resourceType: 'DiagnosticReport',
      resourceId: v.resourceId,
    };
  });

  //latest regimen and cycle
  let filterRegimen =
    Check.regimen !== undefined && values.regimen.regimen === ''
      ? [
          {
            display: 'DefineProtocol',
            resourceType: 'MedicationRequest',
            resourceId:
              data.field.INITIAL_FORM_STATE.regimen.resourceId !== ''
                ? data.field.INITIAL_FORM_STATE.regimen.resourceId
                : uuidv4(),
          },
        ]
      : [];

  let filterVitals = [
    { vitalName: values.pulseRate, vitalId: values.pulseRateId },
    { vitalName: values.rbs, vitalId: values.rbsId },
    { vitalName: values.bloodPressure, vitalId: values.bloodPressureId },
    { vitalName: values.temperature, vitalId: values.temperatureId },
    { vitalName: values.oxygenSaturation, vitalId: values.oxygenSaturationId },
    { vitalName: values.respiratoryRate, vitalId: values.respiratoryRateId },
  ]
    .filter(ele => {
      return ele.vitalName === '';
    })
    .map(e => {
      return {
        display: 'Vitals',
        resourceType: 'Observation',
        resourceId: e.vitalId,
      };
    });

  const checkDiagnosisValidation = () => {
    if (
      Check.cancerType !== undefined ||
      Check.cancerCode !== undefined ||
      Check.bodySite !== undefined ||
      Check.laterality !== undefined ||
      Check.histopathology !== undefined ||
      Check.grade !== undefined ||
      Check.tnm !== undefined ||
      Check.tumor !== undefined ||
      Check.node !== undefined ||
      Check.metastasis !== undefined ||
      Check.ER !== undefined ||
      Check.PR !== undefined ||
      Check.HER !== undefined ||
      Check.psa !== undefined ||
      Check.checkFinalDiagnosis !== undefined ||
      Check.diagnosisComment !== undefined ||
      Check.stage !== undefined ||
      data.field.CheckMolecularTestResult
    ) {
      return true;
    }
    return false;
  };

  return {
    appointmentId: data.field.appointmentId,
    patient: {
      resourceId: loginDetail.patientId,
      resourceType: 'Patient',
      resourceReference: `Patient/${loginDetail.patientId}`,
      display: loginDetail.patientDisplay,
    },
    practitioner: {
      resourceId: loginDetail.practitionerId,
      resourceType: 'Practitioner',
      resourceReference: `Practitioner/${loginDetail.practitionerId}`,
      display: loginDetail.practitionerDisplay,
    },
    deleteResources: [
      ...filterCombid,
      ...filterAllergy,
      ...filterFamily,
      ...filterPrevTest,
      ...filterPertainingIllness,
      ...filterOtherIllness,

      ...filterImmunization,
      ...filterTreatment,
      ...filterTreatmentHistory,

      ...filterGeneralExamination,
      ...filterChiefComplaintData,
      ...filterDelAdviceData,
      ...filterMolecularTest,
      ...filterRegimen,
      ...filterDeletePrescription,
      ...filterVitals,
    ],
    additionValueSetDisplay:
      additionValueSetDisplay.length > 0 ? additionValueSetDisplay : null,
    diagnosticElasticDatas:
      diagnosticElasticDatas.length > 0 ? diagnosticElasticDatas : null,
    drugElasticDatas: drugElasticDatas.length > 0 ? drugElasticDatas : null,
    molecularElasticDatas:
      molecularElasticDatas.length > 0 ? molecularElasticDatas : null,
    cancerPatient:
      Check.fullName !== undefined ||
      Check.dateOfBirth !== undefined ||
      Check.gender !== undefined ||
      Check.referredBy !== undefined ||
      Check.phone !== undefined ||
      Check.height !== undefined ||
      Check.weight !== undefined ||
      Check.occupation !== undefined ||
      Check.maritalStatus !== undefined ||
      Check.email !== undefined ||
      Check.address !== undefined ||
      Check.city !== undefined ||
      Check.pincode !== undefined ||
      Check.nameOfInsured !== undefined ||
      Check.providerName !== undefined ||
      Check.policyNum !== undefined ||
      Check.bloodGroup !== undefined ||
      Check.dob !== undefined
        ? {
            resourceId: loginDetail.patientId,
            active: true,
            role: 'Patient',
            birthDate: values.dateOfBirth,
            age: values.dob.display !== '' ? parseInt(values.dob.display) : 0,
            gender: values.gender,
            phone: values.phone,
            occupation:
              values.occupation.display !== ''
                ? values.occupation.display
                : null,
            email: values.email,
            first: name && name[0] ? name[0] : null,
            last: name && name[1] ? name[1] : null,
            address:
              !values.address && !(cityState && cityState[0]) && !postalCode
                ? null
                : [
                    {
                      line: values.address ? values.address : null,
                      city: cityState && cityState[0] ? cityState[0] : null,
                      state: cityState && cityState[1] ? cityState[1] : null,
                      postalCode: values.pincode ? values.pincode : null,
                    },
                  ],
            maritalStatus:
              values.maritalStatus.display !== ''
                ? {
                    codeableSystem:
                      'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
                    code: values.maritalStatus.code,
                    text: values.maritalStatus.display,
                    display: values.maritalStatus.display,
                  }
                : null,
            bloodGroup:
              values.bloodGroup.display !== ''
                ? values.bloodGroup.display
                : null,
            weight:
              values.weight !== ''
                ? {
                    code: `/${values.weightUnit}`,
                    unit: values.weightUnit,
                    value: values.weight,
                  }
                : null,
            height:
              values.height !== ''
                ? {
                    code: `/${values.heightUnit}`,
                    unit: values.heightUnit,
                    value: values.height,
                  }
                : null,
            insuranceName: values.nameOfInsured,
            policyNumber: values.policyNum,
            providerName:
              values.providerName.name !== '' ? values.providerName.name : null,
            referredByName: values.referredBy,
            // "referredByContactNumber":"9876543210",
            referredBy: {
              //Login Practitioner
              performer: {
                resourceId: loginDetail.practitionerId,
                resourceType: 'Practitioner',
                resourceReference: `Practitioner/${loginDetail.practitionerId}`,
                display: loginDetail.practitionerDisplay,
              },
            },
            contentType: values.contentType != '' ? values.contentType : null,
            photo: values.image != '' ? values.image : null,
          }
        : null,
    comorbidConditions: data.field.CheckComorbidity
      ? data.field.ComorbidityData
      : null,
    allergyIntolerances: data.field.CheckAllergy
      ? data.field.AllergyData
      : null,

    reasonForVisits: data.field.CheckChiefComplaint
      ? data.field.ChiefComplaintData
      : null,
    familyHistories: data.field.CheckFamilyHistory
      ? data.field.FamilyHistoryData
      : null,

    diagnosticReports: data.field.CheckPrevTestResult
      ? PrevTestResultData
      : null,
    pastHospitalizationPertainingIllness: data.field.CheckPertainingIllness
      ? data.field.PertainingIllnessData
      : null,
    pastHospitalizationOtherIllness: data.field.CheckOtherIllness
      ? data.field.OtherIllnessData
      : null,

    immunizations: data.field.CheckImmunization
      ? data.field.ImmunizationData
      : null,

    lifeStyleIndicators:
      Check.tobaccoType !== undefined ||
      Check.packsPerDay !== undefined ||
      Check.tobaccoDurationText !== undefined ||
      Check.tobaccoDuration !== undefined ||
      Check.alcoholDurationText !== undefined ||
      Check.alcoholDuration !== undefined ||
      Check.drugDurationText !== undefined ||
      Check.drugDuration !== undefined ||
      Check.alcoholConsumeCheck != undefined ||
      Check.drugConsumeCheck != undefined ||
      Check.tobaccoConsumeCheck !== undefined ||
      Check.diet != undefined
        ? [
            {
              resourceId: values.tobaccoId,
              resourceType: 'Smoking',
              use: values.tobaccoConsumeCheck ? 'active' : 'inactive',
              ValueCodeableConcept: values.tobaccoConsumeCheck
                ? {
                    codeableSystem: 'http://snomed.info/sct',
                    code: values.tobaccoConsumeCheck ? 'Yes' : 'No',
                    text: values.packsPerDay.display
                      ? `${values.packsPerDay.display} cigarettes/day`
                      : null, //"5 cigarettes/day"
                    display: `${values.tobaccoDurationText} ${
                      values.tobaccoDuration
                    }`, //"4 Year"
                  }
                : null,
              note: values.tobaccoType,
            },
            {
              resourceId: values.alcoholId,
              resourceType: 'Drinking',
              use: values.alcoholConsumeCheck ? 'active' : 'inactive',
              ValueCodeableConcept: values.alcoholConsumeCheck
                ? {
                    codeableSystem: 'http://snomed.info/sct',
                    code: values.alcoholConsumeCheck ? 'Yes' : 'No', //"Yes"
                    display: values.alcoholDuration, //"year"
                    text: `${values.alcoholDurationText} ${
                      values.alcoholDuration
                    }`, //"6 year"
                  }
                : null,
            },
            {
              resourceId: values.drugId,
              resourceType: 'Drug',
              use: values.drugConsumeCheck ? 'active' : 'inactive',
              ValueCodeableConcept: values.drugConsumeCheck
                ? {
                    codeableSystem: 'http://snomed.info/sct',
                    code: values.drugConsumeCheck ? 'Yes' : 'No', //"Yes"
                    display: values.drugDuration, //"year"
                    text: `${values.drugDurationText} ${values.drugDuration}`, //"6 year"
                  }
                : null,
            },
            {
              resourceId: values.dietId,
              resourceType: 'Food',
              ValueCodeableConcept:
                values.diet != undefined && values.diet.display !== ''
                  ? {
                      codeableSystem:
                        'http://dataquent.com/fhir/us/custom/ValueSet/custom-type-food-given-vs',
                      code: values.diet.code,
                      display: values.diet.display,
                      text: values.diet.display,
                    }
                  : null,
            },
          ]
        : null,

    oBGYNObservation:
      Check.ageAtMenarche !== undefined ||
      (Check.periodsValue !== undefined && values.gender === 'Female')
        ? {
            resourceId: values.oBGYId,
            component: [
              {
                code: {
                  codeableSystem: 'http://snomed.info/sct',
                  code: 'Having Periods',
                  text: 'having periods',
                  display: 'having periods',
                },
                valueCodeableConcept:
                  values.periodsValue != ''
                    ? [
                        {
                          codeableSystem: 'http://snomed.info/sct',
                          code: 'Having Periods',
                          text: values.periodsValue,
                          display: values.periodsValue,
                        },
                      ]
                    : null,
              },
              values.periodsValue === 'Yes'
                ? {
                    code: {
                      codeableSystem: 'http://snomed.info/sct',
                      code: '21840007',
                      text: 'last menstrual period',
                      display: 'last menstrual period',
                    },
                    valueCodeableConcept: [
                      {
                        codeableSystem: 'http://snomed.info/sct',
                        code: 'LMP',
                        text: values.lmp,
                        display: values.lmp,
                      },
                    ],
                  }
                : {
                    code: {
                      codeableSystem: 'http://snomed.info/sct',
                      code: 'Age at menopause',
                      text: 'age at menopause',
                      display: 'age at menopause',
                    },
                    valueQuantity:
                      values.periodsValue != '' && values.ageAtMenopause != ''
                        ? {
                            code: '/yr',
                            unit: 'year',
                            value: values.ageAtMenopause,
                          }
                        : null,
                  },
              {
                code: {
                  codeableSystem: 'http://snomed.info/sct',
                  code: 'Age of first menstrual cycle',
                  text: 'age of first menstrual cycle',
                  display: 'age of first menstrual cycle',
                },
                valueQuantity:
                  values.ageAtMenarche != ''
                    ? {
                        code: '/yr',
                        unit: 'year',
                        value: values.ageAtMenarche,
                      }
                    : null,
              },
            ],
          }
        : null,

    eCOG:
      values.ecogScore.display !== ''
        ? {
            resourceId: values.ecogScoreId,
            valueInteger: values.ecogScore.display,
          }
        : null,
    Karnofsky:
      values.kScore.display !== ''
        ? {
            resourceId: values.kScoreId,
            valueInteger: values.kScore.display,
          }
        : null,

    heartRate:
      values.pulseRate != ''
        ? {
            resourceId: values.pulseRateId,
            value: {
              system: 'http://unitsofmeasure.org',
              code: `/${values.pulseRateUnit}`,
              value: values.pulseRate,
              unit: values.pulseRateUnit,
            },
          }
        : null,
    glucose:
      values.rbs != ''
        ? {
            resourceId: values.rbsId,
            value: {
              system: 'http://unitsofmeasure.org',
              code: `/${values.rbsUnit}`,
              value: values.rbs,
              unit: values.rbsUnit,
            },
          }
        : null,
    bloodPressure:
      values.bloodPressure != ''
        ? {
            resourceId: values.bloodPressureId,
            valueCodeableConcept: {
              codeableSystem: 'http://unitsofmeasure.org',
              code: `/${values.bloodPressureUnit}`,
              text: values.bloodPressure,
              display: values.bloodPressureUnit,
            },
          }
        : null,
    temperature:
      values.temperature != ''
        ? {
            resourceId: values.temperatureId,
            value: {
              system: 'http://unitsofmeasure.org',
              code: `/${values.temperatureUnit}`,
              value: values.temperature,
              unit: values.temperatureUnit,
            },
          }
        : null,
    oxygenSaturation:
      values.oxygenSaturation != ''
        ? {
            resourceId: values.oxygenSaturationId,
            value: {
              system: 'http://unitsofmeasure.org',
              code: '/Percentage',
              value: values.oxygenSaturation,
              unit: values.oxygenSaturationUnit,
            },
          }
        : null,
    respiration:
      values.respiratoryRate != ''
        ? {
            resourceId: values.respiratoryRateId,
            value: {
              system: 'http://unitsofmeasure.org',
              code: `/${values.respiratoryRateUnit}`,
              value: values.respiratoryRate,
              unit: values.respiratoryRateUnit,
            },
          }
        : null,

    generalExamination: data.field.GeneralExaminationData,

    systemicExamination:
      Check.cns !== undefined ||
      Check.cvs !== undefined ||
      Check.respiratory !== undefined ||
      Check.perAbdomen !== undefined
        ? [
            {
              resourceId: values.cnsId,
              resourceName: 'CNS',
              valueString: values.cns,
            },
            {
              resourceId: values.cvsId,
              resourceName: 'CVS',
              valueString: values.cvs,
            },
            {
              resourceId: values.respiratoryId,
              resourceName: 'Respiratory',
              valueString: values.respiratory,
            },
            {
              resourceId: values.perAbdomenId,
              resourceName: 'PerAbdomen',
              valueString: values.perAbdomen,
            },
          ]
        : null,
    inspection:
      values.inspection != ''
        ? {
            resourceId: values.InspectionId,
            valueString: values.inspection,
          }
        : null,
    palpation:
      values.palpation != ''
        ? {
            resourceId: values.PalpationId,
            valueString: values.palpation,
          }
        : null,

    eR:
      checkDiagnosisValidation() &&
      values.cancerType.display === 'Breast Cancer'
        ? values.ER
          ? {
              resourceId: values.ERId,
              note: values.ER ? values.ERText : null,
              code: {
                codeableSystem: 'http://loinc.org',
                code: '40556-3',
                text: 'Estrogen receptor Ag',
                display: 'Estrogen receptor Ag',
              },
              valueCodeableConcept: {
                codeableSystem: 'http://loinc.org',
                code: 'positive',
                text: 'Positive',
                display: 'Positive',
              },
            }
          : {
              resourceId: values.ERId,
              note: values.ER ? values.ERText : null,
              code: {
                codeableSystem: 'http://loinc.org',
                code: '40556-3',
                text: 'Estrogen receptor Ag',
                display: 'Estrogen receptor Ag',
              },
              valueCodeableConcept: {
                codeableSystem: 'http://loinc.org',
                code: 'negative',
                text: 'Negative',
                display: 'Negative',
              },
            }
        : null,

    pR:
      checkDiagnosisValidation() &&
      values.cancerType.display === 'Breast Cancer'
        ? values.PR
          ? {
              resourceId: values.PRId,
              note: values.PR ? values.PRText : null,
              code: {
                codeableSystem: 'http://loinc.org',
                code: '40557-1',
                text: 'Progesterone receptor Ag',
                display: 'Progesterone receptor Ag',
              },
              valueCodeableConcept: {
                codeableSystem: 'http://loinc.org',
                code: 'positive',
                text: 'Positive',
                display: 'Positive',
              },
            }
          : {
              resourceId: values.PRId,
              note: values.PR ? values.PRText : null,
              code: {
                codeableSystem: 'http://loinc.org',
                code: '40557-1',
                text: 'Progesterone receptor Ag',
                display: 'Progesterone receptor Ag',
              },
              valueCodeableConcept: {
                codeableSystem: 'http://loinc.org',
                code: 'negative',
                text: 'Negative',
                display: 'Negative',
              },
            }
        : null,

    hER2:
      checkDiagnosisValidation() &&
      values.cancerType.display === 'Breast Cancer'
        ? values.HER
          ? {
              resourceId: values.HERId,
              note: values.HER ? values.HERText : null,
              code: {
                codeableSystem: 'http://loinc.org',
                Code: '48676-1',
                Text: 'HER2',
                display: 'HER2',
              },
              valueCodeableConcept: {
                codeableSystem: 'http://loinc.org',
                code: 'positive',
                text: 'Positive',
                display: 'Positive',
              },
            }
          : {
              resourceId: values.HERId,
              note: values.HER ? values.HERText : null,
              code: {
                codeableSystem: 'http://loinc.org',
                Code: '48676-1',
                Text: 'HER2',
                display: 'HER2',
              },
              valueCodeableConcept: {
                codeableSystem: 'http://loinc.org',
                code: 'negative',
                text: 'Negative',
                display: 'Negative',
              },
            }
        : null,

    pSA:
      Check.cancerType !== undefined &&
      values.cancerType.display === 'Prostate Cancer'
        ? {
            resourceId: values.psaId,
            code: {
              codeableSystem: 'http://loinc.org',
              Code: '2857-1',
              Text: 'Prostate specific Ag [Mass/volume] in Serum or Plasma',
              display: 'Prostate specific Ag [Mass/volume] in Serum or Plasma',
            },
            valueQuantity:
              values.psa !== ''
                ? {
                    code: 'ng/ml',
                    unit: 'ng/ml',
                    value: values.psa,
                  }
                : null,
          }
        : null,

    primaryCancerCondition:
      checkDiagnosisValidation() && values.cancerType.display !== ''
        ? {
            resourceId: values.primaryCancerConditionId,
            note:
              values.diagnosisComment !== '' ? values.diagnosisComment : null,
            verificationStatus:
              values.checkFinalDiagnosis.code !== ''
                ? {
                    codeableSystem:
                      'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                    code: values.checkFinalDiagnosis.code.toLowerCase(), //confirmed,unconfirmed,provisional
                    text: capitalize(values.checkFinalDiagnosis.display), //Confirmed,Unconfirmed,Provisional
                    display: capitalize(values.checkFinalDiagnosis.display),
                  }
                : null,
            code: {
              codeableSystem: values.cancerType.code,
              code: values.cancerCode.code,
              text: values.cancerCode.display,
              display: values.cancerType.display,
            },
            bodySideWithLaterality:
              values.bodySite.display !== '' && values.laterality.display !== ''
                ? [
                    {
                      bodySite:
                        values.bodySite.display !== ''
                          ? {
                              codeableSystem: 'http://snomed.info/sct',
                              code: values.bodySite.code,
                              text: values.bodySite.display,
                              display: values.bodySite.display,
                            }
                          : null,
                      laterality:
                        values.laterality.display !== ''
                          ? {
                              codeableSystem: 'http://snomed.info/sct',
                              code: values.laterality.code,
                              text: values.laterality.display,
                              display: values.laterality.display,
                            }
                          : null,
                    },
                  ]
                : values.bodySite.display !== '' ||
                  values.laterality.display !== ''
                ? [
                    {
                      bodySite:
                        values.bodySite.display !== ''
                          ? {
                              codeableSystem: 'http://snomed.info/sct',
                              code: values.bodySite.code,
                              text: values.bodySite.display,
                              display: values.bodySite.display,
                            }
                          : null,
                      laterality:
                        values.laterality.display !== ''
                          ? {
                              codeableSystem: 'http://snomed.info/sct',
                              code: values.laterality.code,
                              text: values.laterality.display,
                              display: values.laterality.display,
                            }
                          : null,
                    },
                  ]
                : null,
            histologyMorphologyBehaviour:
              values.histopathology.display !== ''
                ? {
                    codeableSystem: 'http://snomed.info/sct',
                    code: values.histopathology.code,
                    text: values.histopathology.display,
                    display: values.histopathology.display,
                  }
                : null,

            grade:
              values.grade.display !== ''
                ? {
                    codeableSystem: 'http://snomed.info/sct',
                    code: values.grade.code,
                    text: values.grade.display,
                    display: values.grade.display,
                  }
                : null,
            stage:
              data.field.Stage !== '' && data.field.Stage !== 'NS'
                ? [
                    {
                      summary: {
                        codeableSystem: 'http://cancerstaging.org',
                        code: data.field.Stage,
                        text: data.field.Stage,
                        display: data.field.Stage,
                      },
                    },
                  ]
                : values.stage.display !== ''
                ? [
                    {
                      summary: {
                        codeableSystem: 'http://cancerstaging.org',
                        code: values.stage.code,
                        text: values.stage.display,
                        display: values.stage.display,
                      },
                    },
                  ]
                : null,
          }
        : null,
    // //for Clinical tnm
    tNMClinicalStageGroup:
      checkDiagnosisValidation() && values.tnm === 'Clinical'
        ? data.field.Stage !== '' && data.field.Stage !== 'NS'
          ? {
              resourceId: values.tnmGroupId,
              value: {
                codeableSystem: 'http://cancerstaging.org',
                code: data.field.Stage,
                text: data.field.Stage,
                display: data.field.Stage,
              },
            }
          : values.stage.display !== ''
          ? {
              resourceId: values.tnmGroupId,
              value: {
                codeableSystem: 'http://cancerstaging.org',
                code: values.stage.code,
                text: values.stage.display,
                display: values.stage.display,
              },
            }
          : null
        : null,

    tNMClinicalPrimaryTumorCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Clinical' &&
      values.tumor.display !== ''
        ? {
            resourceId: values.tumorId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.tumor.code,
              Text: values.tumor.display,
              display: values.tumor.display,
            },
          }
        : null,
    tNMClinicalRegionalNodesCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Clinical' &&
      values.node.display !== ''
        ? {
            resourceId: values.nodeId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.node.code,
              Text: values.node.display,
              display: values.node.display,
            },
          }
        : null,
    tNMClinicalDistantMetastasisCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Clinical' &&
      values.metastasis.display !== ''
        ? {
            resourceId: values.metastasisId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.metastasis.code,
              Text: values.metastasis.display,
              display: values.metastasis.display,
            },
          }
        : null,

    // //for Pathological tnm

    tNMPathologicalStageGroup:
      checkDiagnosisValidation() && values.tnm === 'Pathological'
        ? data.field.Stage !== '' && data.field.Stage !== 'NS'
          ? {
              resourceId: values.tnmGroupId,
              value: {
                codeableSystem: 'http://cancerstaging.org',
                code: data.field.Stage,
                text: data.field.Stage,
                display: data.field.Stage,
              },
            }
          : values.stage.display !== ''
          ? {
              resourceId: values.tnmGroupId,
              value: {
                codeableSystem: 'http://cancerstaging.org',
                code: values.stage.code,
                text: values.stage.display,
                display: values.stage.display,
              },
            }
          : null
        : null,
    tNMPathologicalPrimaryTumorCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Pathological' &&
      values.tumor.display !== ''
        ? {
            resourceId: values.tumorId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.tumor.code,
              Text: values.tumor.display,
              display: values.tumor.display,
            },
          }
        : null,
    tNMPathologicalRegionalNodesCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Pathological' &&
      values.node.display !== ''
        ? {
            resourceId: values.nodeId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.node.code,
              Text: values.node.display,
              display: values.node.display,
            },
          }
        : null,
    tNMPathologicalDistantMetastasisCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Pathological' &&
      values.metastasis.display !== ''
        ? {
            resourceId: values.metastasisId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.metastasis.code,
              Text: values.metastasis.display,
              display: values.metastasis.display,
            },
          }
        : null,

    //for PostTherapy tnm

    tNMPostTherapyStageGroup:
      checkDiagnosisValidation() && values.tnm === 'Post Therapy'
        ? data.field.Stage !== '' && data.field.Stage !== 'NS'
          ? {
              resourceId: values.tnmGroupId,
              value: {
                codeableSystem: 'http://cancerstaging.org',
                code: data.field.Stage,
                text: data.field.Stage,
                display: data.field.Stage,
              },
            }
          : values.stage.display !== ''
          ? {
              resourceId: values.tnmGroupId,
              value: {
                codeableSystem: 'http://cancerstaging.org',
                code: values.stage.code,
                text: values.stage.display,
                display: values.stage.display,
              },
            }
          : null
        : null,
    tNMPostTherapyPrimaryTumorCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Post Therapy' &&
      values.tumor.display !== ''
        ? {
            resourceId: values.tumorId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.tumor.code,
              Text: values.tumor.display,
              display: values.tumor.display,
            },
          }
        : null,
    tNMPostTherapyRegionalNodesCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Post Therapy' &&
      values.node.display !== ''
        ? {
            resourceId: values.nodeId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.node.code,
              Text: values.node.display,
              display: values.node.display,
            },
          }
        : null,
    tNMPostTherapyDistantMetastasisCategory:
      checkDiagnosisValidation() &&
      values.tnm === 'Post Therapy' &&
      values.metastasis.display !== ''
        ? {
            resourceId: values.metastasisId,
            value: {
              codeableSystem: 'http://cancerstaging.org',
              Code: values.metastasis.code,
              Text: values.metastasis.display,
              display: values.metastasis.display,
            },
          }
        : null,

    advices:
      data.field.CheckAdvice && filteredAdviceArray
        ? filteredAdviceArray
        : null,

    //for prescription
    prescriptions: data.field.CheckPrescription ? prescriptionData : null,

    treatmentPlan:
      data.field.CheckTreatmentData || Check.intentOfTreatment !== undefined
        ? [...TreatmentDataFinal, ...filterTreatment1]
        : null,
    //  Check.intentOfTreatment !== undefined
    treatmentIntent:
      TreatmentDataFinal.length > 0
        ? values.intentOfTreatment === 'Curative'
          ? {
              codeableSystem: 'http://snomed.info/sct',
              code: '373808002',
              text: 'Curative - procedure intent',
              display: 'Curative - procedure intent',
            }
          : values.intentOfTreatment === 'Palliative'
          ? {
              codeableSystem: 'http://snomed.info/sct',
              code: '363676003',
              text: 'Palliative - procedure intent',
              display: 'Palliative - procedure intent',
            }
          : null
        : null,

    latestRegimenCycle:
      Check.regimen !== undefined &&
      values.regimen.regimen !== null &&
      values.regimen.regimen !== ''
        ? {
            resourceId:
              typeof values.regimen.resourceId !== 'number'
                ? values.regimen.resourceId
                : uuidv4(),
            Regimen: values.regimen.regimen,
            // status: values.regimen.regimen === '' ? 'Cancelled' : 'Completed', //Completed,Cancelled
            // cycle:
            //   values.treatmentProtocolCycle !== ''
            //     ? parseInt(values.treatmentProtocolCycle)
            //     : null,
          }
        : null,
    treatmentEvents: data.field.CheckTreatmentHistory
      ? data.field.TreatmentHistoryData
      : null,

    discussion:
      Check.discussion !== undefined && values.discussion !== ''
        ? {
            resourceId: values.discussionId,
            note: values.discussion ? values.discussion : '',
          }
        : null,
    visitNote:
      Check.additionalNote !== undefined && values.additionalNote !== ''
        ? {
            resourceId: values.additionalNoteId,
            description:
              values.additionalNote !== undefined ? values.additionalNote : '',
          }
        : null,
    scheduleFollowUP:
      values.followUpDate !== '' && Check.followUpDate !== undefined
        ? {
            resourceId: values.followUpDateId,
            startDateTime: values.followUpDate,
            endDateTime: values.followUpDate,
          }
        : null,

    geriatricQuestionnaireResponse:
      filterScoreResultData.length > 0 && values.age >= 60
        ? {
            status: 'InProgress',
            subject: {
              display: loginDetail.patientDisplay,
              resourceId: loginDetail.patientId,
              resourceType: 'Patient',
              resourceReference: `Patient/${loginDetail.patientId}`,
            },
            questionnaire: `Questionnaire/${
              data.field.GeriatricQuestionnaireId
            }`,
            author: {
              resourceId: loginDetail.practitionerId,
              resourceType: 'Practitioner',
              resourceReference: `Practitioner/${loginDetail.practitionerId}`,
              display: loginDetail.practitionerDisplay,
            },
            reportedAnswer: filterScoreResultData,
          }
        : null,
    totalGeriatricScore:
      data.field.GeriatricFinalScore !== '' && values.age >= 60
        ? parseInt(data.field.GeriatricFinalScore)
        : 0,
    referralDetail: data.field.CheckReportedToData
      ? data.field.ReportedToData
      : null,

    hopiSummary: data.field.hopi,

    molecularTests:
      data.field.CheckMolecularTestResult && checkDiagnosisValidation()
        ? MolecularTestResultData
        : null,

    diagnosisImpression:
      Check.impressionForVisit !== undefined && values.impressionForVisit !== ''
        ? {
            description: values.impressionForVisit,
            resourceId: values.impressionForVisitId,
          }
        : null,
  };
};

export const generateHOPIviaAI = data => {
  let loginDetail = data.loginDetail;
  return {
    appointmentId: data.appointmentId,
    patient: {
      resourceId: loginDetail.patientId,
      resourceType: 'Patient',
      resourceReference: `Patient/${loginDetail.patientId}`,
      display: loginDetail.patientDisplay,
    },
    practitioner: {
      resourceId: loginDetail.practitionerId,
      resourceType: 'Practitioner',
      resourceReference: `Practitioner/${loginDetail.practitionerId}`,
      display: loginDetail.practitionerDisplay,
    },

    reasonForVisits: data.ChiefComplaintData,
    treatmentEvents: data.TreatmentHistoryData,
    comorbidConditions: data.ComorbidityData,
    diagnosticReports: data.PrevTestResultData,
    pastHospitalizationPertainingIllness: data.PertainingIllnessData,
  };
};

export const saveDiagnosisStage = data => {
  return {
    cancerType: data.localcancerType,
    tumor: data.localtumor,
    node: data.localnode,
    metastasis: data.localmetastasis,
    stagingType: data.localtnm,
    grade: data.localgrade ? data.localgrade : null,
    pSA:
      data.localpsa != '' && data.localpsa != undefined ? data.localpsa : null,
    er:
      data.localER === true && data.localER != undefined
        ? 'Positive'
        : 'Negative',
    pr:
      data.localPR === true && data.localPR != undefined
        ? 'Positive'
        : 'Negative',
    her2:
      data.localHER2 === true && data.localHER2 != undefined
        ? 'Positive'
        : 'Negative',
  };
};
