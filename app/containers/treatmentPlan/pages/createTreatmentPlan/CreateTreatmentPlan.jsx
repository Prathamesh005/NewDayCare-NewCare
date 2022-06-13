import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, Divider, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import {
  SquareIconButton,
  SemiBoldText,
  PrimaryPinkButton,
  GrayButton,
  BoldText,
  PinkText,
  FreeSoloAutoComplete,
  GrayTextInput,
  LabelValueContainer,
  InputLabelWrapper,
  ThickHorizontalDivider,
} from '../../../../components';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
import PrintIcon from '@material-ui/icons/Print';
import { UserInfoHeader } from '../../../../components/headers/UserInfoHeader';
import NewOrderForm from './components/NewOrderForm';

import CountInput from './components/CountInput';
import ShareIcon from '@material-ui/icons/Share';

import TableWrapper from './components/TableWrapper';
import TreatmentOrderPdf from './components/TreatmentOrderPdf';
import { PDFLinkWrapper } from '../../../../components/pdf';
import UserTreatmentContext from '../../MyStateContext';

// api
import * as actions from '../../actions';
import {
  makeLoadDrugsNameValueSetSuccess,
  makeProtocolSetData,
  makeIntentSetData,
  makeFindProtocol,
  makeFindProtocolLoading,
  makePatientDetailsLoading,
  makePatientDetails,
  makeLoadBmiBsaData,
  // discharge
  makeLoadDoseValueSetSuccess,
  makeLoadTImingValueSetSuccess,
  makeLoadDrugFormValueSetSuccess,
  //
  makeLoadDrugUnitsSuccess,
  makeLoadProtocolDrugUnitsSuccess,
  makeSaveProtocolData,
  makeSaveProtocolLoading,
  makeSaveProtocolError,
  //
  makeSelectorGetProtocolLoading,
  makeSelectorGetProtocolError,
  makeSelectorGetProtocolSuccess,
  makeSelectorDoPDFInvoiceSaveSuccess,
  makeSelectorDoPDFInvoiceSaveSuccessMessage,
  makeSelectorDoShareInvoiceSuccessMessage,
  makeFetchPractitionerDataSuccess,
} from '../../selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectReducer } from '../../../../utils/injectReducer';
import { useInjectSaga } from '../../../../utils/injectSaga';
import reducer from '../../reducer';
import saga from '../../saga';
import { EditableTable } from '../../../../components';

import { getQueryStringValByKey } from '../../../../hooks/useQueryParam';
import {
  getFromLocalStorage,
  getPractitionerData,
} from '../../../../utils/localStorageUtils';
import { SelectInputComp } from '../../../../components/input/SelectInputComp';
import { durationData, heightData, weightData } from '../../../../constants';
import WhiteAutoComplete from '../../../../components/input/WhiteAutoComplete';
import { AddInputTable } from './components/AddInputTable';
import { BoxSkeleton } from '../../../../components/skeleton';
import {
  getDateDayFirst,
  getValueSetList,
  getValueSetObj,
} from '../../../../utils/formatHelper';

// ------------------------------------------------------------ share
// import SharingPopUp from '../../../../components/sharingPopUp/SharingPopUp';
import {
  usePopupState,
  bindHover,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import SharingPopUp from '../../../../components/sharingPopUp/SharingPopUp';
import ShareSMS from '../../../../images/SharingSMS.svg';
import { SaveActionButton } from '../../../../components';
import { PDFDownloadLink } from '@react-pdf/renderer';
import printJS from 'print-js';
import ErrorMessageComponent from '../../../layouts/errorMessage/ErrorMessage';
import { MemoizedNoteInput } from '../../components/NoteInput';
import { useDebouncing } from '../../../../hooks/useDebouncing';

// ------------------------------------------------------------ share
const defaultDuration = { unit: 'D', value: 0 };

function CreateTreatmentPlan(props) {
  const key = 'TreatmentPlan';
  useInjectReducer({
    key,
    reducer,
  });
  useInjectSaga({ key, saga });
  const {
    protocolConfig,
    getProtocolData,
    getProtocolLoad,
    protocolLoading,
    fetchPractitionerDataSuccess,
  } = props;

  const patientId = getQueryStringValByKey('patientID');
  const resourceIdQuery = getQueryStringValByKey('resourceId');
  const pageType = getQueryStringValByKey('type');
  const isViewPage = pageType === 'view';
  const isPageLoad = protocolLoading || getProtocolLoad;
  const {
    loadFrequencyValueSetSuccess,
    loadTImingValueSetSuccess,
    loadDrugFormValueSetSuccess,
    loadDrugUnitsSetSuccess,
    loadProtocolDrugUnitsSetSuccess,
  } = props;

  const listDrugFormValueSet = loadDrugFormValueSetSuccess
    ? loadDrugFormValueSetSuccess.valueSets[0]['valueSet']['compose'][
        'include'
      ][0]['concept'] || []
    : [];

  const listTImingValueSet = loadTImingValueSetSuccess
    ? loadTImingValueSetSuccess.valueSets[0]['valueSet']['compose'][
        'include'
      ][0]['concept'] || []
    : [];

  const listFrequencyValueSet = loadFrequencyValueSetSuccess
    ? loadFrequencyValueSetSuccess.valueSets[0]['valueSet']['compose'][
        'include'
      ][0]['concept'] || []
    : [];

  const drugUnitsSet =
    loadDrugUnitsSetSuccess && loadDrugUnitsSetSuccess.valueSets[0]
      ? loadDrugUnitsSetSuccess.valueSets[0]['valueSet']['compose'][
          'include'
        ][0]['concept'] || []
      : [];

  const drugUnitsSetProtocol =
    loadProtocolDrugUnitsSetSuccess &&
    loadProtocolDrugUnitsSetSuccess.valueSets[0]
      ? loadProtocolDrugUnitsSetSuccess.valueSets[0]['valueSet']['compose'][
          'include'
        ][0]['concept'] || []
      : [];

  const [note, setNote] = useState('');

  const [resourceId, setResourceId] = useState(uuidv4());

  // state
  const [treatmentOrderList, setTreatmentOrderList] = useState([]);
  const [dischargeInstructionList, setDischargeInstructionList] = useState([]);

  const [formStep, setFormStep] = useState('add-intent');
  const isTablePage = formStep === 'show-table-data';
  // const [formStep, setFormStep] = useState('show-table-data'); ///test
  const [edit, setEdit] = useState(true);

  // input
  const [intent, setIntent] = useState('');
  const [protocol, setProtocol] = useState('');
  const [date, setDate] = useState('');
  const [calculateFor, setCalculateFor] = useState('');
  const [defaultCalculateFor, setDefaultCalculateFor] = useState('');

  // cycleNumber
  const [cycleNumber, setCycleNumber] = useState(1);

  // height
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const showBmiInfo = weight && weightUnit && height && heightUnit;
  const cycleChange = e => {
    const value = e.target.value;
    setCycleNumber(Number(value));
  };
  const handleCycleArrowButton = key => {
    const cycle = Number(cycleNumber);
    if (cycle < 0) {
      return;
    }
    if (key === 'up') {
      setCycleNumber(cycle + 1);
    } else {
      setCycleNumber(cycle - 1);
    }
  };
  // onchange
  const handleIntentChange = (e, value) => {
    if (typeof value === 'string') {
      setIntent({
        code: value,
        display: value,
      });
    } else if (value && value.inputValue) {
      // Create a new value from the user input
      setIntent({
        code: value.inputValue,
        display: value.inputValue,
      });
    } else {
      setIntent(value);
    }
  };

  const handleProtocolChange = (e, value) => {
    if (typeof value === 'string') {
      setProtocol({
        code: value,
        display: value,
      });
    } else if (value && value.inputValue) {
      // Create a new value from the user input
      setProtocol({
        code: value.inputValue,
        display: value.inputValue,
      });
    } else {
      setProtocol(value);
    }
  };
  const getProtocolList = () => {
    let protocolValueObj = Object.assign(
      {},
      props && props.protocolSetData && props.protocolSetData.valueSets,
    );
    let protocolValue =
      protocolValueObj &&
      protocolValueObj[0] &&
      protocolValueObj[0].valueSet.compose.include[0].concept;

    return protocolValue || [];
  };

  const handleCalculateFor = (e, value) => {
    if (typeof value === 'string') {
      setCalculateFor({
        code: value,
      });
      setDefaultCalculateFor(value);
    } else {
      setCalculateFor(value);
      setDefaultCalculateFor(value.code);
    }
  };

  //pending
  const handleDateChange = e => {
    setDate(e.target.value);
  };

  const setDefaultState = obj => {
    const {
      dischargeInstructions = [],
      dayMedicationProtocols = [],
      therapyProtocol = {},
      treatmentIntent = {},
      note,
      cycle,
      dateAdministration,
      resourceId,
      //weight
      idealBodyWeight,
      bSA,
      bMI,
      height,
      weight,
      calculateFor,
    } = obj;
    // dischargeInstructions

    const dischargeInstructionsUpdate =
      dischargeInstructions &&
      dischargeInstructions.map(obj => {
        return {
          ...obj,
          resourceId: obj.resourceId || uuidv4(),
          // NOTE : update duration to default if not present
          //NOTE :add this check if need only for edit mode  !isViewPage &&
          ...(!isViewPage &&
            obj.duration &&
            !obj.duration.unit && {
              duration: defaultDuration,
            }),
        };
      });
    setDischargeInstructionList(dischargeInstructionsUpdate);

    //dayMedicationProtocols
    const dayMedicationProtocolsUpdate =
      dayMedicationProtocols &&
      dayMedicationProtocols.map(obj => {
        return {
          ...obj,
          resourceId: obj.resourceId || uuidv4(),
          preMedicationProtocols: obj.preMedicationProtocols.map(obj => {
            return {
              ...obj,
              resourceId: obj.resourceId || uuidv4(),
            };
          }),
          supportiveProtocols: obj.supportiveProtocols.map(obj => {
            return {
              ...obj,
              resourceId: obj.resourceId || uuidv4(),
            };
          }),
          therapyOrders: obj.therapyOrders.map(obj => {
            // const { protocolDose, patientDose } = obj;
            return {
              ...obj,
              resourceId: obj.resourceId || uuidv4(),
              // patientDose: getPatientDoseValue(protocolDose, patientDose),
            };
          }),
        };
      });
    setTreatmentOrderList(dayMedicationProtocolsUpdate);

    // other data
    therapyProtocol && setProtocol(therapyProtocol);
    treatmentIntent && setIntent(treatmentIntent);
    note && setNote(note);
    cycle && setCycleNumber(cycle);
    dateAdministration && setDate(dateAdministration);
    resourceId && setResourceId(resourceId);
    //
    // weight , height , bMI  , bSA  , idealBodyWeight
    idealBodyWeight && setIdealBodyWeight(idealBodyWeight);
    bSA && setBsa(bSA);
    bMI && setBmi(bMI);
    height && height.unit && setHeightUnit(height.unit);
    height && height.value && setHeight(height.value);
    weight && weight.unit && setWeightUnit(weight.unit);
    weight && weight.value && setWeight(weight.value);
    setDefaultCalculateFor(calculateFor || '');
  };
  //                                                                  ----------------------- >> api calls <-----------------
  useEffect(() => {
    // case 1 : if id based then show table data in non editable form
    // and call add treatment order or update treatment order api calls based on ids

    // test action
    new Promise((resolve, reject) => {
      props.getSearchDrug('', resolve, reject);
    });
    const {
      protocolSetData,
      intentSetData,
      loadDrugUnitsSetSuccess,
      loadProtocolDrugUnitsSetSuccess,
      loadFrequencyValueSetSuccess,
      loadTImingValueSetSuccess,
      loadDrugFormValueSetSuccess,
      fetchPractitionerDataSuccess,
    } = props;

    new Promise((resolve, reject) => {
      props.protocolSet(
        'http://dataquent.com/fhir/us/custom/ValueSet/treatment-protocol-vs',
        resolve,
        reject,
      );
    });

    _.isEmpty(intentSetData) &&
      new Promise((resolve, reject) => {
        props.intentSet(
          'http://dataquent.com/fhir/us/custom/ValueSet/treatment-intent-vs',
          resolve,
          reject,
        );
      });

    _.isEmpty(loadDrugUnitsSetSuccess) &&
      new Promise((resolve, reject) => {
        props.loadDrugUnitSet(
          'http://dataquent.com/fhir/us/custom/ValueSet/therapy-drug-unit-vs',
          resolve,
          reject,
        );
      });

    _.isEmpty(loadProtocolDrugUnitsSetSuccess) &&
      new Promise((resolve, reject) => {
        props.loadProtocolDrugUnitSet(
          'http://dataquent.com/fhir/us/custom/ValueSet/protocol-dose-unit-vs ',
          resolve,
          reject,
        );
      });

    _.isEmpty(loadFrequencyValueSetSuccess) &&
      new Promise((resolve, reject) => {
        props.loadFrequencyValueSet(resolve, reject);
      });

    //
    _.isEmpty(loadTImingValueSetSuccess) &&
      new Promise((resolve, reject) => {
        props.loadInstructionsValueSet(resolve, reject);
      });

    //
    _.isEmpty(loadDrugFormValueSetSuccess) &&
      new Promise((resolve, reject) => {
        props.loadDrugFormValueSet(resolve, reject);
      });
    // share
    const practitionerId = getPractitionerData().fhirResourceId;

    _.isEmpty(fetchPractitionerDataSuccess) &&
      new Promise((resolve, reject) => {
        props.fetchPractitionerData(practitionerId, resolve, reject);
      }).catch(error => {});
  }, []);

  useEffect(() => {
    if (patientId) {
      new Promise((resolve, reject) => {
        props.getPatientDetails(patientId, resolve, reject);
      });
    }
    if (isViewPage) {
      setEdit(false);
      setFormStep('show-table-data');
    }
    if (isViewPage && patientId && resourceIdQuery) {
      const dataObj = {
        resourceId: resourceIdQuery,
        patientId: patientId,
        search: 'TreatementPlan',
      };
      new Promise((resolve, reject) => {
        props.getProtocol(dataObj, resolve, reject);
      });
    }
  }, [patientId, resourceIdQuery]);

  const protocolObj = isViewPage
    ? getProtocolData
      ? getProtocolData[0]
      : null
    : protocolConfig && protocolConfig.data;

  useEffect(() => {
    if (protocolObj) {
      props.clearOldTreatmentData();
      setDefaultState(protocolObj);
    }
  }, [protocolObj]);
  // ----------------------------------------------------------------------------------------------
  const unitConfigList = [
    {
      unit: 'mg',
      patientUnit: 'mg',
    },
    {
      unit: 'mg/m2',
      patientUnit: 'mg',
    },
    {
      unit: 'mg/kg',
      patientUnit: 'mg',
    },
    {
      unit: 'U/m2',
      patientUnit: 'IU',
    },
    {
      unit: 'gm/m2',
      patientUnit: 'gm',
    },
    {
      unit: 'μg/m2',
      patientUnit: 'μg',
    },
  ];
  const getCalculateFor = unit => {
    if (unit && drugUnitsSetProtocol.length > 0) {
      const unitObj = _.find(drugUnitsSetProtocol, obj => obj.display === unit);
      if (unitObj) {
        return unitObj.code;
      } else {
        return defaultCalculateFor;
      }
    }
  };
  const checkPatientUnit = unit => {
    if (unit && unitConfigList) {
      const unitObj = _.find(unitConfigList, obj => obj.unit === unit);
      if (unitObj) {
        return unitObj.patientUnit;
      }
    }
  };
  const calculateNumberString = (value1, value2) => {
    if (value1 && value2) {
      const result = _.ceil(Number(value1) * Number(value2));
      return `${result}`;
    } else {
      ('0');
    }
  };

  const getPatientDoseValue = protocolDose => {
    // values : H , W , protocolDose , protocolUnit , calculateFor
    // Case 1 : when we have H & W calculate and update  patientDose for chemo list
    // Case 2 : on row change for  protocolDose or protocolUnit update that row patientDose in Chemo list
    // a : if all required values are present then update
    // b : no changes will happen
    // Case 3 : patientDose unit will default user is not allowed to select
    // Case 4 : protocolUnit unit (mg/m2) show default if not present ?? // remove unit disable logic
    // Case 5 : if user change % reduction  >patientDose =  patientDose  - 10 % patientDose
    // Case 6 : use case of calculateFor if not givein for unit
    // BMI:20 kg/m2
    // BSA:0.75 m3
    // Ideal Body Weight:2.32 kg
    // 2.32
    // how to avoid changes in changed  patientDose unit and value ?
    //> if patientDose present then do not update

    // find calculateForValue >>>>>>>>>
    const protocolUnitValue = protocolDose && protocolDose.unit;
    const protocolValue = protocolDose && protocolDose.value;
    if (protocolUnitValue && protocolValue) {
      const calculateForValue = getCalculateFor(protocolUnitValue);
      const patientUnitValue = checkPatientUnit(protocolUnitValue);
      const bsaValue = bsa && bsa.value;
      const bmiValue = bmi && bmi.value;
      const idealBodyWeightValue = idealBodyWeight && idealBodyWeight.value;

      if (calculateForValue === 'BSA' && bsaValue) {
        return {
          unit: patientUnitValue,
          value: calculateNumberString(bsaValue, protocolValue),
        };
      }

      if (calculateForValue === 'IBW' && idealBodyWeightValue) {
        return {
          unit: patientUnitValue,
          value: calculateNumberString(idealBodyWeightValue, protocolValue),
        };
      }

      if (calculateForValue === 'BMI' && bmiValue) {
        return {
          unit: patientUnitValue,
          value: calculateNumberString(bmiValue, protocolValue),
        };
      }
      return null;
    } else {
      return null;
    }

    //  else {
    //   return patientDose;
    // }
  };

  const updateChemoPatientDose = () => {
    const treatmentOrderListUpdated =
      treatmentOrderList &&
      treatmentOrderList.map(obj => {
        return {
          ...obj,
          therapyOrders: obj.therapyOrders.map(obj => {
            const { protocolDose, patientDose } = obj;
            return {
              ...obj,
              patientDose: getPatientDoseValue(protocolDose, patientDose),
            };
            // if (patientDose && patientDose.value && patientDose.unit) {
            // } else {
            // }
          }),
        };
      });
    setTreatmentOrderList(treatmentOrderListUpdated);
  };

  // ----------------------------------------------------------------------------------------------

  // resolve resolve
  //on submit
  const isProtocolPresent = getProtocolList().some(obj => {
    return obj.code === protocol.code;
  });

  useEffect(() => {
    return () => {
      props.clearOldTreatmentData();
    };
  }, []);

  // No change
  const saveProtocol = e => {
    e.preventDefault();
    const stepOneData = {
      protocol: protocol.code,
      dateAdministration: date,
      patient: {
        resourceType: 'Patient',
        resourceId: patientId,
      },
    };
    props.clearOldTreatmentData();
    if (isProtocolPresent) {
      new Promise((resolve, reject) => {
        props.findTreatmentProtocol(stepOneData, resolve, reject);
      }).then(obj => {
        setFormStep('show-table-data');
      });
    } else {
      // setDefaultState({})
      setFormStep('show-table-data');
      handleAddDay();
    }
  };

  const getIntentList = () => {
    let intentValueObj = Object.assign(
      {},
      props && props.intentSetData && props.intentSetData.valueSets,
    );
    let intentValues =
      intentValueObj &&
      intentValueObj[0] &&
      intentValueObj[0].valueSet.compose.include[0].concept;

    return intentValues || [];
  };

  const handleClose = e => {
    e.preventDefault();
    props.history.push(ROUTES_CONSTANTS.TREATMENT_PLAN);
  };

  //------------------------------------------------------>> pdf and share
  // Print and Share--------------------------------------- PDFROOT?
  const [baseString, setBaseString] = useState();
  const showPrintAndShare = !edit && formStep === 'show-table-data';
  const [openPrintWindow, setOpenPrintWindow] = useState(false);
  const [openShareWindow, setOpenShareWindow] = useState(false);

  const [urlToOpen, setUrlToOpen] = useState();
  const [savedData, setSavedData] = useState(null);
  const [ShareSuccessMessageShow, setShareSuccessMessageShow] = useState(false);

  // --------------------------------------------------------------------------- > share
  const handleViewClose = () => {
    setOpenPrintWindow(false);
    setOpenShareWindow(false);
    setUrlToOpen();
    setBaseString();
  };

  const handleSavePDfFunc = (blob, url) => {
    setUrlToOpen(url);
    var reader = new FileReader();
    reader.onload = () => setBaseString(reader.result);
    reader.readAsDataURL(blob);
  };

  const handleShareInvoice = obj => {
    const field = {
      patientId: obj.patientId,
      documentId: obj.documentId,
    };
    new Promise((resolve, reject) => {
      props.doShareInvoice(field, resolve, reject);
    })
      .then(() => {
        setShareSuccessMessageShow(true);
        handleViewClose();
      })
      .catch(error => {
        // setShareErrorMessageShow(true);
        handleViewClose();
      });
  };

  const getPdfTitle = () => {
    return `chemo-${cycleNumber || 0}-${getDateDayFirst(date, 'YYYY-MM-DD') ||
      resourceId ||
      ''}.pdf`;
  };
  useEffect(() => {
    if (baseString) {
      if (savedData) {
        if (openShareWindow) {
          handleShareInvoice(savedData);
        }
        if (openPrintWindow) {
          printJS({
            printable: urlToOpen,
            onPrintDialogClose: handleViewClose(),
            showModal: true,
            type: 'pdf',
          });
        }
      } else {
        const patientDetail =
          props.patientDetails && props.patientDetails.patient
            ? props.patientDetails.patient
            : {};
        const practitionerData = getFromLocalStorage('HKTWQ').userDetails;
        const practitionerPayload = {
          resourceId: practitionerData.fhirResourceId,
          display: practitionerData.display || '',
          resourceReference: `Practitioner/${practitionerData.fhirResourceId}`,
          resourceType: 'Practitioner',
        };

        const payload = {
          invoiceId: resourceId,
          resourceId: uuidv4(),
          recordName: `${resourceId ? resourceId : 'TreatmentPlan'}.pdf`, //clear name ?
          authenticator: practitionerPayload,
          labOrDoctorName: `${practitionerData.first ||
            ''} ${practitionerData.last || ''} `,
          author: [practitionerPayload],
          cancerPatientResourceReference: {
            resourceId: patientDetail.resourceId,
            resourceType: 'Patient',
            display: patientDetail.display || '',
            resourceReference: `Patient/${patientDetail.resourceId}`,
          },
          content: [
            {
              attachment: {
                contentType: 'application/pdf',
                title: getPdfTitle(),
                data: baseString && baseString.split(',')[1],
              },
            },
          ],
        };

        new Promise((resolve, reject) => {
          props.doPDFInvoiceSave(payload, resolve, reject);
        }).then(data => {
          const field = {
            patientId: data.data.patientId,
            documentId: data.data.documentId,
          };
          setSavedData(field);
          if (openShareWindow) {
            handleShareInvoice(field);
          }
          if (openPrintWindow) {
            printJS({
              printable: urlToOpen,
              onPrintDialogClose: handleViewClose(),
              showModal: true,
              type: 'pdf',
            });
          }

          setOpenShareWindow(false);
        });
      }
    }
  }, [baseString]);

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopover',
  });
  const contentDisplay = [
    { type: 'sms', content: ShareSMS, height: '10rem', width: '10rem' },
  ];

  const RightContainer = () => {
    return (
      <>
        {!edit && (
          <SquareIconButton size="small" {...bindHover(popupState)}>
            <ShareIcon fontSize="small" />
          </SquareIconButton>
        )}

        {/* {!edit && (
          <SharingPopUp
            popupState={popupState}
            content={contentDisplay}
            handleAction={() => {
              setOpenShareWindow(true);
            }}
          />
        )} */}

        {!edit && (
          <SquareIconButton
            onClick={() => {
              setOpenPrintWindow(true);
            }}
            size="small"
          >
            <PrintIcon fontSize="small" />
          </SquareIconButton>
        )}
      </>
    );
  };
  //--------------------------------------------------------------------- >share end

  // -------------------------------------------------------- >   Add OBJ
  const getAddNewTableObject = (drugObj = {}, key) => {
    if (key === 'preMedicationProtocols') {
      return {
        patientDose: '',
        administrationDetail: '',
        comment: '',
        resourceId: uuidv4(),
        drugName: drugObj.drugName,
      };
    }
    if (key === 'therapyOrders') {
      return {
        day: 0,
        drugFrom: '',
        drugName: drugObj.drugName,
        resourceId: uuidv4(),
        protocolDose: null,
        // patientDose: { unit: '', value: '' },
        // doseReduction: { unit: '', value: '' },
        patientDose: null,
        doseReduction: null,
        administrationDetail: '',
        previousToxicity: '',
        comment: '',
      };
    }
    if (key === 'supportiveProtocols') {
      return {
        administrationDetail: '',
        comment: '',
        drugName: drugObj.drugName,
        resourceId: uuidv4(),
      };
    }
    if (key === 'dischargeInstructions') {
      return {
        administrationDetail: '',
        comment: '',
        drugName: drugObj.drugName,
        drugFrom: '',
        duration: defaultDuration,
        frequency: '',
        resourceId: uuidv4(),
      };
    }
  };
  const handleAddClick = (key, id, value) => {
    if (key) {
      if (key === 'dischargeInstructions') {
        const updateList = [
          ...dischargeInstructionList,
          getAddNewTableObject(value, key),
        ];
        setDischargeInstructionList(updateList);
      } else {
        const newArr = treatmentOrderList.map(obj => {
          if (obj.resourceId === id) {
            const selectedKeyValue = obj[`${key}`];
            if (selectedKeyValue) {
              return {
                ...obj,
                [key]: [...selectedKeyValue, getAddNewTableObject(value, key)],
              };
            } else {
              return obj;
            }
          }
          return obj;
        });
        setTreatmentOrderList(newArr);
      }
    }
  };
  const handleDrugChange = (e, value, key, id) => {
    if (typeof value === 'string') {
      let obj = {
        drugName: _.trim(value),
      };
      handleAddClick(key, id, obj);
    } else if (value && value.inputValue) {
      let obj = {
        drugName: _.trim(value.inputValue),
      };
      // Create a new value from the user input
      handleAddClick(key, id, obj);
    } else {
      let obj = {
        drugName: _.trim(value.brand_Name.raw || value.generic_Name.raw),
      };
      handleAddClick(key, id, obj);
    }
  };

  // -------------------------------------------------------- >  input change
  const handleInputChange = (e, index, row = {}, id, resourceId, key) => {
    const value = e.target.value;

    const newArr = treatmentOrderList.map(obj => {
      if (obj.resourceId === resourceId) {
        const selectedKeyValues = obj[`${key}`];
        const rowObj = { ...row };
        const updatedObj = _.set(rowObj, id, value);
        const updatedArray = selectedKeyValues.map((obj, keyIndex) => {
          if (index === keyIndex) {
            return updatedObj;
          } else {
            return obj;
          }
        });
        if (selectedKeyValues) {
          return {
            ...obj,
            [key]: updatedArray,
          };
        } else {
          return obj;
        }
      }
      return obj;
    });
    setTreatmentOrderList(newArr);
  };
  const handleDischargeCellChange = (e, index, row, columId, newValue) => {
    const value = e.target.value;
    const updatedList = dischargeInstructionList.map((obj, objKey) => {
      // NOTE : Use id here
      if (index === objKey) {
        const rowObj = { ...row };
        return _.set(rowObj, columId, value);
      } else {
        return obj;
      }
    });
    setDischargeInstructionList(updatedList);
  };

  // function percentageCalculator(amount,percent) {
  //   return
  // }

  const handleChemotherapyInputChange = (
    value,
    index,
    row = {},
    id,
    resourceId,
    key,
    valuesToAdd = null,
  ) => {
    const newArr = treatmentOrderList.map(obj => {
      if (obj.resourceId === resourceId) {
        const selectedKeyValues = obj[`${key}`];
        // update obj in array
        const updatedArray = selectedKeyValues.map((obj, keyIndex) => {
          if (index === keyIndex) {
            if (valuesToAdd) {
              const rowObj = { ...row, ...valuesToAdd };
              return rowObj;
            } else {
              const updatedObj = _.set(row, id, value);
              return updatedObj;
            }
          } else {
            return obj;
          }
        });
        if (selectedKeyValues) {
          return {
            ...obj,
            [key]: updatedArray,
          };
        } else {
          return obj;
        }
      }
      return obj;
    });
    setTreatmentOrderList(newArr);
  };

  const handleDischargeAutocomplete = (
    e,
    newValueString,
    index,
    row,
    headCellId,
    subKey,
  ) => {
    const updatedList = dischargeInstructionList.map((obj, objKey) => {
      if (index === objKey) {
        const rowObj = { ...row };
        if (headCellId === 'duration') {
          return {
            ...rowObj,
            duration: { ...rowObj.duration, [`${subKey}`]: newValueString },
          };
        } else {
          return _.set(rowObj, headCellId, newValueString);
        }
      } else {
        return obj;
      }
    });

    setDischargeInstructionList(updatedList);
  };

  // delete
  const handleDeleteRow = (index, id, key) => {
    if (key) {
      if (key === 'dischargeInstructions') {
        const updatedList = dischargeInstructionList.filter(
          (obj, ind) => ind !== index,
        );
        setDischargeInstructionList(updatedList);
      } else {
        const newArr = treatmentOrderList.map(obj => {
          if (obj.resourceId === id) {
            const selectedKeyValue = obj[`${key}`];
            if (selectedKeyValue) {
              return {
                ...obj,
                [key]: selectedKeyValue.filter((obj, ind) => ind !== index),
              };
            } else {
              return obj;
            }
          }
          return obj;
        });
        setTreatmentOrderList(newArr);
      }
    }
  };

  const handleDayDateChange = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (id) {
      const newArr = treatmentOrderList.map(obj => {
        if (obj.resourceId === id) {
          return {
            ...obj,
            date: e.target.value || '',
          };
        }
        return obj;
      });
      setTreatmentOrderList(newArr);
    }
  };

  const handleAddDay = e => {
    const getLength = treatmentOrderList.length + 1;
    const newDayObj = {
      resourceId: uuidv4(),
      day: getLength,
      date: new Date(),
      therapyOrders: [],
      preMedicationProtocols: [],
      supportiveProtocols: [],
    };
    const updatedArray = [...treatmentOrderList, newDayObj];
    setTreatmentOrderList(updatedArray);
  };

  const handleChangeInput = value => {
    if (value) {
      new Promise((resolve, reject) => {
        props.getSearchDrug(_.trim(value), resolve, reject);
      });
    }
  };

  //using debouncing 26/05
  const onDebounceLoadData = useDebouncing(handleChangeInput);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  //  --------------------------------------------------- >> dischargeInstruction

  const dischargeInstructionHeadCells = [
    {
      id: 'drugFrom',
      label: 'Drug From',
      inputType: 'autocomplete',
      width: '130px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <WhiteAutoComplete
            onChange={(e, newValue) =>
              handleDischargeAutocomplete(
                e,
                newValue.display,
                index,
                row,
                headCellId,
              )
            }
            options={listDrugFormValueSet}
            getOptionLabel={option => option.display || ''}
            value={
              (listDrugFormValueSet &&
                listDrugFormValueSet.find(obj => {
                  return obj.display === value;
                })) || {
                code: '',
                display: '',
              }
            }
          />
        );
      },
    },
    {
      id: 'drugName',
      label: 'Drug Name',
      minWidth: '200px',
      maxWidth: '200px',
    },
    {
      id: 'frequency',
      label: 'Frequency',
      minWidth: '140px',
      maxWidth: '160px',
      inputType: 'autocomplete',
      render: ({ value, row, index, headCellId }) => {
        return (
          <FreeSoloAutoComplete
            autoCompleteType="white"
            fullWidth={true}
            options={listFrequencyValueSet}
            getOptionLabel={option => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.display;
            }}
            objectToPushInOptions={value => {
              return {
                display: value,
              };
            }}
            onChange={(e, value) => {
              if (typeof value === 'string') {
                handleDischargeAutocomplete(e, value, index, row, headCellId);
              } else if (value && value.inputValue) {
                // Create a new value from the user input
                handleDischargeAutocomplete(
                  e,
                  value.inputValue,
                  index,
                  row,
                  headCellId,
                );
              } else {
                handleDischargeAutocomplete(
                  e,
                  value.display,
                  index,
                  row,
                  headCellId,
                );
              }
            }}
            value={
              listFrequencyValueSet &&
              listFrequencyValueSet.find(obj => {
                return obj.display === value;
              })
                ? listFrequencyValueSet.find(obj => {
                    return obj.display === value;
                  })
                : value
                ? { code: value, display: value }
                : {
                    code: '',
                    display: '',
                  }
            }
          />
        );
      },
    },
    {
      id: 'administrationDetail',
      label: 'Instruction',
      minWidth: '160px',
      maxWidth: '200px',
      inputType: 'autocomplete',
      render: ({ value, row, index, headCellId }) => {
        return (
          <FreeSoloAutoComplete
            autoCompleteType="white"
            options={listTImingValueSet}
            getOptionLabel={option => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.display;
            }}
            objectToPushInOptions={value => {
              return {
                display: value,
              };
            }}
            onChange={(e, value) => {
              if (typeof value === 'string') {
                handleDischargeAutocomplete(e, value, index, row, headCellId);
              } else if (value && value.inputValue) {
                // Create a new value from the user input
                handleDischargeAutocomplete(
                  e,
                  value.inputValue,
                  index,
                  row,
                  headCellId,
                );
              } else {
                handleDischargeAutocomplete(
                  e,
                  value.display,
                  index,
                  row,
                  headCellId,
                );
              }
            }}
            value={
              listTImingValueSet &&
              listTImingValueSet.find(obj => {
                return obj.display === value;
              })
                ? listTImingValueSet.find(obj => {
                    return obj.display === value;
                  })
                : value
                ? { code: value, display: value }
                : {
                    code: '',
                    display: '',
                  }
            }
          />
        );
      },
    },
    {
      id: 'duration',
      label: 'Duration',
      inputType: 'autocomplete',
      minWidth: '120px',
      maxWidth: '120px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <Box display="flex">
            <WhiteAutoComplete
              style={{ width: '60px' }}
              onChange={(e, newValue) =>
                handleDischargeAutocomplete(
                  e,
                  newValue,
                  index,
                  row,
                  headCellId,
                  'value',
                )
              }
              getOptionLabel={option => option.toString()}
              options={[...Array(100).keys()].map(i => i + 1)}
              value={value.value}
            />
            <WhiteAutoComplete
              style={{ width: '80px' }}
              onChange={(e, newValue) =>
                handleDischargeAutocomplete(
                  e,
                  newValue.key,
                  index,
                  row,
                  headCellId,
                  'unit',
                )
              }
              options={durationData}
              getOptionLabel={option => option.value || ''}
              // value={value.unit}
              value={
                durationData &&
                durationData.find(obj => {
                  return obj.key === value.unit;
                })
              }
            />
          </Box>
        );
      },
      format: ({ value }) => `${value.value || ''} ${value.unit || ''}`,
    },
    {
      id: 'comment',
      numeric: true,
      disablePadding: false,
      label: 'Comment',
      minWidth: '120px',
      maxWidth: '160px',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: handleDischargeCellChange,
      },
    },
  ];

  // drug list
  const drugListResponse =
    props.loadDrugsNameValueSetSuccess &&
    props.loadDrugsNameValueSetSuccess.response.results
      ? props.loadDrugsNameValueSetSuccess.response.results
      : [];

  //  ------------- Height and Weight ---------------------------------> start

  const [bmi, setBmi] = useState({
    unit: '',
    value: '',
  });
  const [bsa, setBsa] = useState({
    unit: '',
    value: '',
  });
  const [idealBodyWeight, setIdealBodyWeight] = useState({
    unit: '',
    value: '',
  });

  const handleWeight = e => {
    setWeight(e.target.value);
  };
  const handleWeightUnit = e => {
    setWeightUnit(e.target.value);
  };
  const handleHeight = e => {
    setHeight(e.target.value);
  };
  const handleHeightUnit = e => {
    setHeightUnit(e.target.value);
  };

  // get
  useEffect(() => {
    if (showBmiInfo && isTablePage) {
      // if (showBmiInfo) {
      let field = {
        height: height,
        heightUnit: heightUnit,
        weight: weight,
        weightUnit: weightUnit,
        gender: gender,
      };
      new Promise((resolve, reject) => {
        props.loadBmiBSA(field, resolve, reject);
      });
    }
  }, [weight, weightUnit, height, heightUnit, formStep]);

  // set
  useEffect(() => {
    // if (props.bmiBsaData ) {
    if (props.bmiBsaData && edit && isTablePage) {
      const { bmi, bsa, idealBodyWeight } = props.bmiBsaData;
      setBmi(bmi);
      setBsa(bsa);
      setIdealBodyWeight(idealBodyWeight);
      // NEW
      // const isCalculateDose = bmi && bsa && idealBodyWeight;
      // if (isCalculateDose) {
      if (showBmiInfo && edit && isTablePage) {
        updateChemoPatientDose();
      }
    }
  }, [
    props.bmiBsaData,
    height,
    weight,
    edit,
    showBmiInfo,
    formStep,
    bsa.value,
    bmi.value,
    idealBodyWeight.value,
  ]);
  // }, [props.bmiBsaData]);

  //  ------------- Height and Weight ---------------------------------> end
  // ----------------- save action ------------------------------------>start

  // ----------------- ------------------------------------------>patientDetailsLoading
  const { patientDetailsLoading } = props;
  const {
    address = '',
    birthDate = '',
    phone = '',
    last = '',
    first = '',
    image = '',
    gender = '',
    height: heightObj,
    weight: weightObj,
    display = '',
  } = props.patientDetails.patient || {};
  const userInfoList = [
    `${gender || ''}`,
    `${birthDate || ''}`,
    `${phone || ''}`,
    `${address || ''}`,
  ];

  // set
  useEffect(() => {
    heightObj && heightObj.unit && setHeightUnit(heightObj.unit);
    heightObj && heightObj.value && setHeight(heightObj.value);
    weightObj && weightObj.unit && setWeightUnit(weightObj.unit);
    weightObj && weightObj.value && setWeight(weightObj.value);
  }, [heightObj, weightObj]);

  // ----------------- save action ------------------------------------>start
  const getAdditionValueSetDisplay = () => {
    let additionValueSet = [];
    // ---------------------------- >>> protocol handling
    if (protocol && !isProtocolPresent) {
      additionValueSet = [
        ...additionValueSet,
        {
          system: getValueSetObj(props.protocolSetData).resourceId, //ValueSetResourceId,
          Concept: [
            {
              code: protocol.code,
              display: protocol.display,
            },
          ],
        },
      ];
    }

    // --------------------------- >>> frequency handling for dischargeInstructions list
    // if (dischargeInstructionList && dischargeInstructionList.length > 0) {
    if (dischargeInstructionList && dischargeInstructionList.length > 0) {
      const resourceIdFreq = getValueSetObj(loadFrequencyValueSetSuccess)
        .resourceId;

      const frqList = getValueSetList(loadFrequencyValueSetSuccess) || [];

      if (frqList.length > 0) {
        dischargeInstructionList.forEach(frqObj => {
          if (frqObj.frequency) {
            const isExists = frqList.some(obj => {
              return obj.display === frqObj.frequency;
            });
            if (!isExists) {
              const freqNewSetValue = {
                system: resourceIdFreq,
                concept: [
                  {
                    code: frqObj.frequency,
                    display: frqObj.frequency,
                  },
                ],
              };
              additionValueSet = [...additionValueSet, freqNewSetValue];
            }
          }
        });
      }
    }
    return additionValueSet;
  };

  const saveOrder = () => {
    const practitionerData = getFromLocalStorage('HKTWQ').userDetails;
    const practitionerPayload = {
      resourceId: practitionerData.fhirResourceId,
      display: practitionerData.display || '',
      resourceReference: `Practitioner/${practitionerData.fhirResourceId}`,
      resourceType: 'Practitioner',
    };
    const patientDetail =
      props.patientDetails && props.patientDetails.patient
        ? props.patientDetails.patient
        : {};

    const finalObj = {
      resourceId: resourceId,
      note: note,
      protocol: protocol.display,

      cycle: Number(cycleNumber),
      treatmentIntent: {
        codeableSystem:
          'http://dataquent.com/fhir/us/custom/ValueSet/treatment-intent-vs',
        code: intent.code,
        display: intent.display,
        text: intent.display,
      },
      therapyProtocol: {
        codeableSystem:
          'http://dataquent.com/fhir/us/custom/ValueSet/treatment-protocol-vs ',
        code: protocol.code,
        display: protocol.display,
        text: protocol.display,
      },
      // -------------------
      practitioner: practitionerPayload, //use login user data
      patient: {
        resourceId: patientDetail.resourceId,
        resourceType: 'Patient',
        display: patientDetail.display || '',
        resourceReference: `Patient/${patientDetail.resourceId}`,
      },

      // null
      calculateFor:
        !isProtocolPresent && calculateFor.code ? calculateFor.code : null,
      additionValueSetDisplay: null,
      //
      dayMedicationProtocols: treatmentOrderList,
      dischargeInstructions: dischargeInstructionList,
      dateAdministration: date,
      cycle: cycleNumber,

      //NOT PRESENT IN POST EG
      weight: {
        unit: weightUnit,
        value: weight,
      },
      height: {
        unit: heightUnit,
        value: height,
      },
      bMI: {
        value: bmi.value,
        unit: bmi.unit,
      },
      bSA: {
        value: bsa.value,
        unit: bsa.unit,
      },
      idealBodyWeight: {
        value: idealBodyWeight.value,
        unit: idealBodyWeight.unit,
      },
      additionValueSetDisplay:
        getAdditionValueSetDisplay().length > 0
          ? getAdditionValueSetDisplay()
          : null,
    };
    // API Calls
    new Promise((resolve, reject) => {
      props.loadSaveProtocol(finalObj, resolve, reject);
    })
      .then(data => {
        setEdit(false);
      })
      .catch(error => {
        // setShareErrorMessageShow(true);
      });
  };

  // ----------------- save action ------------------------------------>end

  // Additional
  const objectValues = {
    note: note,
    setNote: setNote,
  };
  //weightRef
  const weightRef = useRef();
  const onKeyDown = e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (weightRef.current) {
        weightRef.current.focus();
      }
    }
  };

  return (
    <Box>
      <UserTreatmentContext.Provider value={objectValues}>
        <Paper>
          {/* -----------------------------------------------------> share */}

          {/* -----------------------------------------------------> share  */}
          <UserInfoHeader
            loading={patientDetailsLoading}
            imageUrl={image || ''}
            userName={`${first || ''} ${last || ''}`}
            userInfoList={userInfoList}
            handleClose={handleClose}
            rightContainer={RightContainer}
          />

          <Box width={1} minHeight="90vh">
            {/*------------------------------------------------------------------>  pdf table */}
            {/* {!edit && ( */}
            {/*------------- print ------------------- */}
            {openPrintWindow ? (
              <PDFDownloadLink
                document={
                  <TreatmentOrderPdf
                    treatmentDaysList={treatmentOrderList}
                    dischargeInstructionList={dischargeInstructionList}
                    fetchPractitionerDataSuccess={fetchPractitionerDataSuccess}
                    headerInfo={{
                      intent: intent.display,
                      protocol: protocol.display,
                      cycleNumber: `${cycleNumber || 0}`,
                      dateAdministration: date,
                      note: note || '',
                    }}
                    bmiInfo={{
                      bsa,
                      bmi,
                      weightUnit,
                      weight,
                      heightUnit,
                      height,
                      idealBodyWeight,
                    }}
                    patientDetails={{
                      name: display && display.split('/')[0],
                      id: patientId && patientId,
                      address: address && address,
                      phone: display && display.split('/')[2],
                    }}
                    title={getPdfTitle()}
                  />
                }
              >
                {({ blob, url, loading, error }) => {
                  loading
                    ? 'Loading document...'
                    : blob && handleSavePDfFunc(blob, url, 'print');
                }}
              </PDFDownloadLink>
            ) : (
              ''
            )}

            {/* --------- share  : openShareWindow  --------------- */}
            {openShareWindow ? (
              <PDFDownloadLink
                document={
                  <TreatmentOrderPdf
                    fetchPractitionerDataSuccess={fetchPractitionerDataSuccess}
                    treatmentDaysList={treatmentOrderList}
                    dischargeInstructionList={dischargeInstructionList}
                    headerInfo={{
                      intent: intent.display,
                      protocol: protocol.display,
                      cycleNumber: `${cycleNumber || 0}`,
                      dateAdministration: date,
                      note: note || '',
                    }}
                    bmiInfo={{
                      bsa,
                      bmi,
                      weightUnit,
                      weight,
                      heightUnit,
                      height,
                      idealBodyWeight,
                    }}
                    patientDetails={{
                      name: display && display.split('/')[0],
                      id: patientId && patientId,
                      address: address && address,
                      phone: display && display.split('/')[2],
                    }}
                    title={getPdfTitle()}
                  />
                }
              >
                {({ blob, url, loading, error }) => {
                  loading
                    ? 'Loading document...'
                    : handleSavePDfFunc(blob, url, 'share');
                }}
              </PDFDownloadLink>
            ) : (
              ''
            )}

            {/* test */}
            {formStep === 'add-intent' && !isViewPage ? (
              <>
                <Box width={1} style={{ padding: '20px' }}>
                  <Box width={1} mb={4}>
                    <BoldText>Generate New Chemotherapy Order</BoldText>
                  </Box>
                  <NewOrderForm
                    handleIntentChange={handleIntentChange}
                    handleProtocolChange={handleProtocolChange}
                    handleDateChange={handleDateChange}
                    // values
                    values={{ date, protocol, intent }}
                    handleSave={saveProtocol}
                    protocolArray={getProtocolList()}
                    intentList={getIntentList()}
                    protocolLoading={props.protocolLoading}
                    // calculateFor
                    calculateFor={calculateFor}
                    handleCalculateFor={handleCalculateFor}
                    isProtocolPresent={isProtocolPresent}
                  />
                </Box>
              </>
            ) : formStep === 'show-table-data' ? (
              <Box width={1}>
                {isPageLoad ? (
                  <Box width={1} px={{ xs: 2, md: 3 }} py={4}>
                    <BoxSkeleton height="60px" mb={5} />
                    <BoxSkeleton height="220px" mb={8} />
                    <BoxSkeleton height="220px" mb={8} />
                    <BoxSkeleton height="220px" mb={8} />
                  </Box>
                ) : (
                  <>
                    {/* top bar */}

                    <Box
                      bgcolor="#FFFFFF"
                      width={1}
                      borderTop="1px solid #70707066"
                      borderBottom="1px solid #70707066"
                      minHeight="50px"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      px={{ xs: 2, md: 4 }}
                      py={'0px'}
                    >
                      <Box display="flex">
                        <Box
                          p={3}
                          pl={3}
                          borderRight="1px solid #70707066"
                          display="flex"
                          alignItems="center"
                          minWidth="140px"
                        >
                          <SemiBoldText variant="h4" color="primary">
                            {intent.display}
                          </SemiBoldText>
                        </Box>
                        <Box
                          p={3}
                          pl={3}
                          borderRight="1px solid #70707066"
                          minWidth="80px"
                        >
                          <SemiBoldText variant="h4" color="primary">
                            {protocol.display}
                          </SemiBoldText>
                        </Box>
                        {/* cycle */}
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="h4"
                            color="primary"
                            style={{
                              fontWeight: 500,
                              marginLeft: '10px',
                              minWidth: '100px',
                            }}
                          >
                            Cycle Number
                          </Typography>
                          {edit ? (
                            <Box display="flex">
                              <Box maxWidth="120px">
                                <CountInput
                                  value={cycleNumber}
                                  onChange={cycleChange}
                                  handleArrowClick={handleCycleArrowButton}
                                />
                              </Box>
                            </Box>
                          ) : (
                            <Typography
                              variant="h4"
                              color="primary"
                              style={{
                                fontWeight: 500,
                                marginLeft: '10px',
                                minWidth: '150px',
                              }}
                            >
                              {cycleNumber}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Box>
                        {edit ? (
                          <GrayButton
                            variant="contained"
                            startIcon={<AddIcon fontSize="small" />}
                            onClick={handleAddDay}
                          >
                            Add Day
                          </GrayButton>
                        ) : (
                          <GrayButton
                            variant="contained"
                            startIcon={<EditIcon fontSize="small" />}
                            onClick={() => {
                              setEdit(true);
                              setSavedData(null);
                            }}
                            disableElevation={true}
                          >
                            Edit Order
                          </GrayButton>
                        )}
                      </Box>
                    </Box>
                    {/* BMI   */}
                    {edit ? (
                      <Box px={{ xs: 2, md: 3 }}>
                        {/* py={2} */}
                        <Grid container spacing={1} alignItems="center">
                          {/*  ------------- Height and Weight ---------------------------------> start */}

                          <InputLabelWrapper
                            label="Height"
                            mr={{ md: 4, lg: 6 }}
                          >
                            <Box display="flex" alignItems="center" height={1}>
                              <GrayTextInput
                                style={{
                                  width: '80px',
                                }}
                                name="height"
                                placeholder="Height"
                                value={height}
                                onChange={handleHeight}
                                type="number"
                                onKeyDown={onKeyDown}
                              />
                              <SelectInputComp
                                style={{
                                  width: '70px',
                                }}
                                required
                                fullWidth
                                margin="dense"
                                options={heightData}
                                placeholder="Height"
                                labelId="height-type-label"
                                valueFormat={obj => obj.value}
                                labelFormat={obj => obj.key}
                                value={heightUnit}
                                onChange={handleHeightUnit}
                              />
                            </Box>
                          </InputLabelWrapper>

                          {/* weight  */}

                          <InputLabelWrapper
                            label="Weight"
                            my={{ md: 4, lg: 6 }}
                          >
                            <Box display="flex" alignItems="center" height={1}>
                              <GrayTextInput
                                style={{
                                  width: '80px',
                                }}
                                name="weight"
                                placeholder="Weight"
                                // label="Weight"
                                value={weight}
                                onChange={handleWeight}
                                type="number"
                                inputRef={weightRef}
                              />
                              <SelectInputComp
                                style={{
                                  width: '70px',
                                }}
                                required
                                // variant="outlined"
                                fullWidth
                                margin="dense"
                                options={weightData}
                                placeholder="Weight"
                                labelId="kg-type-label"
                                valueFormat={obj => obj.value}
                                labelFormat={obj => obj.key}
                                value={weightUnit}
                                onChange={handleWeightUnit}
                              />
                            </Box>
                          </InputLabelWrapper>

                          {/* BMI label */}
                          <Grid item>
                            <Box display="flex" alignItems="center">
                              {/* IdealBodyWeight */}
                              <LabelValueContainer
                                label="BMI:"
                                value={
                                  showBmiInfo && bmi.value
                                    ? `${bmi.value || ''} ${bmi.unit || ''}`
                                    : '-'
                                }
                              />
                              <LabelValueContainer
                                label="BSA:"
                                value={
                                  showBmiInfo && bsa.value
                                    ? `${bsa.value || ''} ${bsa.unit || ''}`
                                    : '-'
                                }
                              />
                              <LabelValueContainer
                                label="Ideal Body Weight:"
                                value={
                                  showBmiInfo && idealBodyWeight.value
                                    ? `${idealBodyWeight.value ||
                                        ''} ${idealBodyWeight.unit || ''}`
                                    : '-'
                                }
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    ) : (
                      <Box px={{ xs: 2, md: 3 }}>
                        <Box display="flex" alignItems="center">
                          <Box mr={2} height={1}>
                            <LabelValueContainer
                              label="Height:"
                              value={
                                height
                                  ? `${height || ''}  / ${heightUnit || ''}`
                                  : '-'
                              }
                            />
                          </Box>
                          <Box mr={2} height={1}>
                            <LabelValueContainer
                              label="Weight:"
                              value={
                                weight
                                  ? `${weight || ''}  / ${weightUnit || ''}`
                                  : '-'
                              }
                            />
                          </Box>

                          <Box mr={2} height={1}>
                            <LabelValueContainer
                              label="BMI:"
                              value={
                                showBmiInfo && bmi.value
                                  ? `${bmi.value || ''} ${bmi.unit || ''}`
                                  : '-'
                              }
                            />
                          </Box>

                          <Box mr={2} height={1}>
                            <LabelValueContainer
                              label="BSA:"
                              value={
                                showBmiInfo && bsa.value
                                  ? `${bsa.value || ''} ${bsa.unit || ''}`
                                  : '-'
                              }
                            />
                          </Box>

                          <Box mr={2} height={1}>
                            <LabelValueContainer
                              label="Ideal Body Weight:"
                              value={
                                showBmiInfo && idealBodyWeight.value
                                  ? `${idealBodyWeight.value ||
                                      ''} ${idealBodyWeight.unit || ''}`
                                  : '-'
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    <Divider />

                    {/* TableWrapper */}
                    <Box width={1} px={{ xs: 3, md: 6 }} py={4}>
                      {treatmentOrderList &&
                        treatmentOrderList.map((data, index) => {
                          return (
                            <TableWrapper
                              key={index}
                              {...data}
                              isEdit={edit}
                              handleAddClick={handleAddClick}
                              handleInputChange={handleInputChange}
                              handleDeleteRow={handleDeleteRow}
                              // chemo
                              handleChemotherapyInputChange={
                                handleChemotherapyInputChange
                              }
                              //
                              handleDayDateChange={handleDayDateChange}
                              //
                              drugListResponse={drugListResponse}
                              handleChangeInput={onHandleChange}
                              handleDrugChange={handleDrugChange}
                              AddInput={AddInputTable}
                              //
                              drugUnitsSet={drugUnitsSet}
                              drugUnitsSetProtocol={drugUnitsSetProtocol}
                              //
                              getPatientDoseValue={getPatientDoseValue}
                            />
                          );
                        })}
                    </Box>
                    {/* -------------------------- Discharge Instruction ---------------------- */}
                    <Divider />
                    <Box width={1} px={{ xs: 3, md: 6 }} py={4}>
                      {/* {!hideDischargeInstruction && (
                )} */}
                      <Box width={1} py={2}>
                        <PinkText>On Discharge Instructions</PinkText>
                      </Box>
                      <EditableTable
                        rows={dischargeInstructionList}
                        headCells={dischargeInstructionHeadCells}
                        showAddInputRow={true}
                        addInput={
                          <AddInputTable
                            options={drugListResponse}
                            handleChangeInput={onHandleChange} //
                            handleDrugChange={handleDrugChange} //
                            keyTable={'dischargeInstructions'}
                          />
                        }
                        showDelete={true}
                        editableMode={edit} //handle this based on flag
                        handleDelete={index => {
                          handleDeleteRow(index, '', 'dischargeInstructions');
                        }}
                      />
                    </Box>

                    {/* NOTES  */}
                    <Box width={1} px={{ xs: 3, md: 6 }} py={4} mb={6}>
                      <Box width={1} py={2}>
                        <PinkText>Additional Note </PinkText>
                      </Box>

                      <Grid container spacing={4}>
                        <Grid item xs={12} lg={12}>
                          {edit ? (
                            <MemoizedNoteInput disabled={!edit} />
                          ) : (
                            <SemiBoldText variant="h4" color="primary">
                              {note || '-'}
                            </SemiBoldText>
                          )}
                        </Grid>
                      </Grid>
                    </Box>

                    {/* save button */}
                    {edit && (
                      <Box mt={6}>
                        <ThickHorizontalDivider />
                        <Box
                          width={1}
                          display="flex"
                          justifyContent="center"
                          py={4}
                          pb={10}
                        >
                          <SaveActionButton
                            isLoading={props.saveProtocolLoading}
                            disabled={props.saveProtocolLoading}
                            onClick={saveOrder}
                            style={{ marginRight: '20px' }}
                          >
                            Save
                          </SaveActionButton>
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            ) : null}
          </Box>
        </Paper>
      </UserTreatmentContext.Provider>

      {/*  */}
      {ShareSuccessMessageShow && props.doShareInvoiceSuccessMessage && (
        <ErrorMessageComponent
          SuccessMessageShow={ShareSuccessMessageShow}
          setSuccessMessageShow={setShareSuccessMessageShow}
          SuccessMessage={'Shared successfully with patient'}
        />
      )}
      {/* {ShareSuccessMessageShow && props.saveProtocolError && (
        <ErrorMessageComponent
          ErrorMessageShow={ShareSuccessMessageShow}
          setErrorMessageShow={setShareSuccessMessageShow}
          ErrorMessage={'error'}
        />
      )} */}

      <SharingPopUp
        popupState={popupState}
        content={contentDisplay}
        // handleAction={handleAction}
        handleAction={() => {
          setOpenShareWindow(true);
        }}
      />
    </Box>
  );
}

const mapStateToProps = createStructuredSelector({
  loadDrugsNameValueSetSuccess: makeLoadDrugsNameValueSetSuccess(),
  protocolSetData: makeProtocolSetData(),
  intentSetData: makeIntentSetData(),
  protocolConfig: makeFindProtocol(),
  protocolLoading: makeFindProtocolLoading(),
  patientDetails: makePatientDetails(),
  patientDetailsLoading: makePatientDetailsLoading(),
  bmiBsaData: makeLoadBmiBsaData(),
  //discharge
  loadFrequencyValueSetSuccess: makeLoadDoseValueSetSuccess(),
  loadTImingValueSetSuccess: makeLoadTImingValueSetSuccess(),
  loadDrugFormValueSetSuccess: makeLoadDrugFormValueSetSuccess(),
  //
  loadDrugUnitsSetSuccess: makeLoadDrugUnitsSuccess(),
  loadProtocolDrugUnitsSetSuccess: makeLoadProtocolDrugUnitsSuccess(),
  // save
  saveProtocolData: makeSaveProtocolData(),
  saveProtocolLoading: makeSaveProtocolLoading(),
  saveProtocolError: makeSaveProtocolError(),
  // pdf nad share
  doPDFInvoiceSaveSuccess: makeSelectorDoPDFInvoiceSaveSuccess(),
  doPDFInvoiceSaveSuccessMessage: makeSelectorDoPDFInvoiceSaveSuccessMessage(),
  // doPDFInvoiceSaveError: makeSelectorDoPDFInvoiceSaveError(),
  // doShareInvoiceSucess: makeSelectorDoShareInvoiceSuccess(),
  // doShareInvoiceError: makeSelectorDoShareInvoiceError(),
  doShareInvoiceSuccessMessage: makeSelectorDoShareInvoiceSuccessMessage(),
  // get
  getProtocolLoad: makeSelectorGetProtocolLoading(),
  getProtocolError: makeSelectorGetProtocolError(),
  getProtocolData: makeSelectorGetProtocolSuccess(),
  fetchPractitionerDataSuccess: makeFetchPractitionerDataSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getSearchDrug: (inputDrugsName, resolve, reject) =>
      dispatch(actions.getSearchDrug(inputDrugsName, resolve, reject)),
    intentSet: (inputDrugsName, resolve, reject) =>
      dispatch(actions.intentSet(inputDrugsName, resolve, reject)),
    protocolSet: (inputDrugsName, resolve, reject) =>
      dispatch(actions.protocolSet(inputDrugsName, resolve, reject)),
    findTreatmentProtocol: (inputDrugsName, resolve, reject) =>
      dispatch(actions.findTreatmentProtocol(inputDrugsName, resolve, reject)),
    getPatientDetails: (id, resolve, reject) =>
      dispatch(actions.getPatientDetails(id, resolve, reject)),
    loadBmiBSA: (field, resolve, reject) =>
      dispatch(actions.loadBmiBSA(field, resolve, reject)),
    // discharge

    loadFrequencyValueSet: (resolve, reject) =>
      dispatch(actions.loadDoseValueSet(resolve, reject)),
    loadInstructionsValueSet: (resolve, reject) =>
      dispatch(actions.loadTimingValueSet(resolve, reject)),
    loadDrugFormValueSet: (resolve, reject) =>
      dispatch(actions.loadDrugFormValueSet(resolve, reject)),
    //
    loadDrugUnitSet: (resolve, reject) =>
      dispatch(actions.loadDrugUnitSet(resolve, reject)),
    loadProtocolDrugUnitSet: (resolve, reject) =>
      dispatch(actions.loadProtocolDrugUnitSet(resolve, reject)),

    loadSaveProtocol: (data, resolve, reject) =>
      dispatch(actions.loadSaveProtocol(data, resolve, reject)),
    getProtocol: (resolve, reject) =>
      dispatch(actions.getProtocol(resolve, reject)),
    // save and share
    doPDFInvoiceSave: (fieldValue, resolve, reject) =>
      dispatch(actions.doPDFInvoiceSave(fieldValue, resolve, reject)),
    doShareInvoice: (field, resolve, reject) =>
      dispatch(actions.doShareInvoice(field, resolve, reject)),
    clearOldTreatmentData: () => dispatch(actions.clearOldTreatmentData()),
    fetchPractitionerData: (id, resolve, reject) =>
      dispatch(actions.fetchPractitionerData(id, resolve, reject)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTreatmentPlan);
