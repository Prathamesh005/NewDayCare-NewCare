import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import moment from 'moment';
import printJS from 'print-js';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  fetchNewServiceValueSet,
  saveFinilizeBill,
  savePDFInvoice,
  useBillingSlice,
} from '../../../apis/billingApis/billingSlice';
import {
  doSharePDF,
  getPatientList,
  getPractitionerList,
  valueSetSearch,
} from '../../../apis/globalApis/globalSlice';
import SharingPopUp from '../../../components/sharingPopUp/SharingPopUp';
import { MessageComponent } from '../../../components';
import printIcon from '../../../images/print.svg';
import shareIcon from '../../../images/share.svg';
import ShareSMS from '../../../images/SharingSMS.svg';
import { getFromLocalStorage } from '../../../utils/localStorageUtils';
import { URLS } from '../../../utils/urls';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import ReportPdfDesign from './components/ReportPdfDesign';
import ReportTable from './components/ReportTable';

const useStyles = makeStyles(theme => ({
  saveBtn: {
    color: '#ffffff',
    background: theme.palette.button.paginated.color,
    padding: '0px 20px',
    '&:hover': {
      background: theme.palette.button.paginated.color,
      // opacity: 0.9,
    },
    marginRight: '1rem',
  },
  finilizeBtn: {
    color: '#ffffff',
    background: theme.palette.button.paginated.color,
    padding: '0px 40px',
    '&:hover': {
      background: theme.palette.button.paginated.color,
      // opacity: 0.9,
    },
    marginRight: '1rem',
  },
  disabledBtn: {
    color: '#ffffff',
    textAlign: 'right',
    background: theme.palette.button.paginated.color,
    padding: '0px 40px',
    '&:hover': {
      background: theme.palette.button.paginated.color,
      // opacity: 0.9,
    },
    marginRight: '1rem',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    // color: theme.palette.button.paginated.color,
    color: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '10%',
    marginTop: -12,
    marginLeft: -12,
  },
  disFinalBtn: {
    padding: '0px 40px',
    marginRight: '1rem',
  },
  reportSectionStyle: {
    [theme.breakpoints.up('lg')]: {
      margin: '5rem 20rem 1rem 20rem',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      margin: '5rem 15rem 1rem 15rem',
    },
    [theme.breakpoints.down('md')]: {
      margin: '5rem 5rem 1rem 5rem',
    },
    border: `1px solid ${theme.palette.lineBorderColor.main}`,
    backgroundColor: '#ffffff',
    // -webkit-box-shadow: "0 0 10px #fff",
    boxShadow: '0 0 10px #000000',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    textDecoration: 'underline',
  },
  orgImg: {
    objectFit: 'contain',
  },
  columnSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  },
  topContainer: {
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.lineBorderColor.main}`,
    margin: 0,
    width: '100%',
  },
  clinicDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  },
  numDateContainer: {
    backgroundColor: '#F7F6F4',
    borderBottom: `1px solid ${theme.palette.lineBorderColor.main}`,
    padding: '0.5rem 3rem',
    margin: 0,
    width: '100%',
  },
  invoiceDate: {
    textAlign: 'right',
  },
  toByContainer: {
    padding: '1.5rem 2.5rem',
    margin: 0,
    width: '100%',
    height: 'auto',
  },
  billTo: {
    border: `1px solid ${theme.palette.lineBorderColor.main}`,
    height: '100%',
    padding: '1rem',
    borderRadius: '5px',
  },
  prescribedBy: {
    border: `1px solid ${theme.palette.lineBorderColor.main}`,
    height: '100%',
    padding: '1rem',
    borderRadius: '5px',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkBoxStyle: {
    '& .MuiTypography-body1': {
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.button.paginated.color,
    },
  },
  tableBorder: {
    border: `1px solid ${theme.palette.lineBorderColor.main}`,
    margin: 0,
    width: '100%',
  },
  tableWrapper: {
    margin: 0,
    width: '100%',
  },
  tableContainer: {
    padding: '0.5rem 2.5rem',
    margin: 0,
    width: '100%',
  },
  addServiceStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    margin: '0.5rem 1rem',
    border: `0.5px dashed ${theme.palette.button.paginated.color}`,
    color: theme.palette.button.paginated.color,
    borderRadius: '3px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ffe9f4',
    },
  },
  addServiceFontStyle: {
    color: theme.palette.button.paginated.color,
    fontSize: '10px',
  },
  totalAmountStyle: {
    border: `1px solid ${theme.palette.lineBorderColor.main}`,
    padding: '8px',
    textAlign: 'right',
  },
  paymentInfoStyle: {
    // border: `1px solid ${theme.palette.lineBorderColor.main}`,
    height: '100%',
    borderRadius: '5px',
    padding: '1rem 0',
    display: 'flex',
    alignItems: 'center',
  },
  paymentInfoLayout: {
    padding: '0 1rem',
  },
  smallRadioButton: {
    '& svg': {
      width: '1rem',
      height: '1rem',
    },
    marginBottom: '0px',
  },
  radio: {
    color: theme.palette.button.paginated.color,
    '&$checked': {
      color: theme.palette.button.paginated.color,
    },
  },
  checked: {},
  textField: {
    // width: "300px",
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '2px',
    fontSize: 'small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    cursor: 'pointer',
    marginRight: '1rem',
  },
  snackBarSuccess: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.utils.success,
  },
  snackBarInfo: {
    backgroundColor: theme.palette.utils.info,
  },
  snackBarError: {
    backgroundColor: theme.palette.utils.error,
  },
  snackBarWarning: {
    backgroundColor: theme.palette.utils.warning,
  },
  actionIcon: {
    margin: theme.spacing(1),
  },
  actionIconInfo: {
    position: 'absolute',
    left: '0px',
    margin: theme.spacing(0, 1, 0, 4),
  },
  headerDiv: {
    position: 'fixed',
    zIndex: 1,
    width: '93%',
    backgroundColor: '#F7F6F4',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '2px',
    fontSize: 'xx-small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    cursor: 'pointer',
  },
  printBtn: {
    margin: '3px',
    color: '#cacaca',
  },
}));
function GenerateBill(props) {
  useBillingSlice();
  const theme = useTheme();
  const classes = useStyles();
  const org = getFromLocalStorage('ORG');
  const loc = getFromLocalStorage('LOC');
  const orgName = org !== null ? org.split('|')[1].split('/')[0] : null;
  const locName =
    org !== null
      ? loc
          .split('|')[1]
          .split('/')
          .pop()
      : null;
  const orgLogo = getFromLocalStorage('data').userDetails
    .organizationDetails[0]['organizationLogo'];
  const gstn = getFromLocalStorage('data').userDetails.organizationDetails[0][
    'gstin'
  ];
  const [invoiceNum, setInvoiceNum] = useState('');
  const invoiceDate = moment().format('DD/MM/YYYY');
  const [patientList, setPatientList] = useState([]);
  const [columnArray, setColumnArray] = useState([
    'no',
    'service',
    'amount',
    'discount',
    'net Amount',
  ]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [openAddNewRowInput, setOpenAddNewRowInput] = useState(false);
  const [serviceListArray, setServiceListArray] = useState([]);
  const [serviceListSystemUrl, setServiceListSystemUrl] = useState('');
  const [paymentViaValuset, setPaymentViaValuset] = useState([]);
  const [paymentViaValusetSysytem, setPaymentViaValusetSystem] = useState('');
  const [paymentViaRadioValue, setPaymentViaRadioValue] = useState('cash');
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBilledAmount, setTotalBilledAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [comment, setComment] = useState('');
  const [patientListFromSearch, setPatientListFromSearch] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openPrac, setOpenPrac] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [optionsPrac, setOptionsPrac] = React.useState([]);
  const loading = open && options.length > 0;
  const loadingPrac = openPrac && optionsPrac.length > 0;
  const [practitionerListFromSearch, setPractitionerListFromSearch] = useState(
    [],
  );
  const [selectedPractitioner, setSelectedPractitioner] = useState({});
  const history = useHistory();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSnackBar, setSnackBar] = useState(false);
  const [errorMessageType, setErrorMessageType] = useState('snackBarInfo');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading } = props;
  const [openPDF, setOpenPDF] = useState(false);
  const [paymentDisplay, setPaymentDisplay] = useState('cash');
  const [openPatientDataDisplay, setOpenPatientDataDisplay] = useState(false);
  const [
    openPractitionerDataDisplay,
    setOpenPractitionerDataDisplay,
  ] = useState(false);
  const [saveSuccessResponse, setSaveSuccessResponse] = useState();
  const [patientError, setPatientError] = useState(false);
  const [practitionerError, setPractitionerError] = useState(false);
  const [editable, setEditable] = useState(true);
  const [isLoader, setLoader] = useState(false);
  const [SuccessMessageShow, setSuccessMessageShow] = useState(false);
  const [ErrorMessageShow, setErrorMessageShow] = useState(false);
  const [ShareErrorMessageShow, setShareErrorMessageShow] = useState(false);
  const [ShareSuccessMessageShow, setShareSuccessMessageShow] = useState(false);
  const [openPrintWindow, setOpenPrintWindow] = useState(false);
  const practitionerData = getFromLocalStorage('data').userDetails;
  const [pdfSaveResponse, setPdfSaveResponse] = useState();
  const [blobPdf, setBlobPdf] = useState();
  const [baseString, setBaseString] = useState();
  const [shareSuccessMessage, setShareSuccessMessage] = useState();
  const [invoiceId, setInvoiceId] = useState();
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const uid = uuidv4();

  useEffect(() => {
    const obj =
      paymentViaValuset &&
      paymentViaValuset.find(item => item.code === paymentViaRadioValue);
    setPaymentDisplay(obj && obj.display ? obj.display : '');
  }, [paymentViaRadioValue, paymentViaValuset]);
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  useEffect(() => {
    if (!openPrac) {
      setOptionsPrac([]);
    }
  }, [openPrac]);

  useEffect(() => {
    if (baseString) {
      //debugger;
      const newObj = {
        invoiceId: invoiceId,
        resourceId: uid,
        recordName: `${invoiceNum ? invoiceNum : 'Billing'}.pdf`,
        practitioner: selectedPractitioner,
        patientDetails: { details: selectedPatient },
        content: [
          {
            attachment: {
              contentType: 'application/pdf',
              title: `${invoiceNum ? invoiceNum : 'Billing'}.pdf`,
              data: baseString && baseString.split(',')[1],
            },
          },
        ],
        expense: {
          name: 'Consultation_Fee',
          tag: ['#consultation'],
          date: moment().format('YYYY-MM-DD'),
          expense:
            (+totalBilledAmount).toFixed(2) - (+totalDiscountAmount).toFixed(2),
          summary: comment ? comment : null,
          patientResourceId: selectedPatient.resourceId,
        },
      };
      callSavePDFInvoiceAPI(newObj);
      handleClose();
    }
  }, [baseString]);

  const handleAddNewService = () => {
    setOpenAddNewRowInput(true);
  };
  const handleFilteredArrayOfBilledItems = arr => {
    // console.log(arr);
    setFilteredArray([...arr]);
  };

  useEffect(() => {
    callFetchNewServiceValueSet();
    callFetchPayentViaValueSet();
    callGetPatientList('');
    callFetchPractitionerListArray();
  }, []);

  const callFetchNewServiceValueSet = async () => {
    const { payload } = await props.fetchNewServiceValueSet();
    if (payload.data) {
      setServiceListArray(
        payload.data.chargeItemDefinitionGroups &&
          payload.data.chargeItemDefinitionGroups[0] &&
          payload.data.chargeItemDefinitionGroups[0][
            'chargeItemDefinitionGroup'
          ] &&
          payload.data.chargeItemDefinitionGroups[0][
            'chargeItemDefinitionGroup'
          ]['propertyComponents'] &&
          payload.data.chargeItemDefinitionGroups[0][
            'chargeItemDefinitionGroup'
          ]['propertyComponents'][0] &&
          payload.data.chargeItemDefinitionGroups[0][
            'chargeItemDefinitionGroup'
          ]['propertyComponents'][0]['priceComponents'],
      );
      setServiceListSystemUrl(
        payload.data.chargeItemDefinitionGroups &&
          payload.data.chargeItemDefinitionGroups.length > 0 &&
          payload.data.chargeItemDefinitionGroups[0][
            'chargeItemDefinitionGroup'
          ]['url'],
      );
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const callFetchPayentViaValueSet = async () => {
    const { payload } = await props.valueSetSearch({
      url: URLS.PAYMENT_VIA,
      systemUrl: true,
    });
    if (payload) {
      setPaymentViaValuset(payload.concept);
      setPaymentViaValusetSystem(payload.system);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const callGetPatientList = async input => {
    const { payload } = await props.getPatientList({ patientName: input });
    if (payload.data) {
      setPatientListFromSearch(payload.data.cancerPatients);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const callFetchPractitionerListArray = async () => {
    const { payload } = await props.getPractitionerList('');
    if (payload.data) {
      setPractitionerListFromSearch(payload.data.cancerPractitioner);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const handleTotalAmount = value => {
    setTotalAmount(value);
  };
  const handleTotalBilledAmount = value => {
    setTotalBilledAmount(value);
  };
  const handleTotalDiscountAmount = value => {
    setTotalDiscountAmount(value);
  };
  const handleSaveComment = e => {
    setComment(e.target.value);
  };
  const handleChangePaymentViaType = event => {
    setPaymentViaRadioValue(event.target.value);
  };
  const handleSelectionPatient = val => {
    const obj = {
      name: val.patient.display.split('/')[0],
      id: val.patient.nQPatientId,
      address: {
        line: val.patient.address,
        city: val.patient.city,
        district: val.patient.district,
        state: val.patient.state,
        postalCode: val.patient.postalCode,
      },
      phone: val.patient.phone,
      resourceId: val.patient.resourceId,
      display: val.patient.display,
      details: val.patient,
    };
    setSelectedPatient(obj);
    setOpenPatientDataDisplay(true);
  };
  const handleSelectionPractitioner = val => {
    // console.log(val);
    const obj = {
      name: val.practitioner.display.split('/')[0],
      fhirResourceId: val.practitioner.resourceId,
      display: val.practitioner.display,
      details: val.practitioner,
      mciNum: val.practitioner.mciNum ? val.practitioner.mciNum : '',
    };
    setSelectedPractitioner(obj);
    setOpenPractitionerDataDisplay(true);
  };
  const obj = {
    note: comment,
    totalGross: (+totalBilledAmount).toFixed(2) - 0,
    totalNet:
      (+totalBilledAmount).toFixed(2) - (+totalDiscountAmount).toFixed(2),
    totalDiscount: (+totalDiscountAmount).toFixed(2) - 0,
    columnArray: columnArray,
    filteredArray: filteredArray,
    invoiceDate: invoiceDate,
    patientDetails: { details: selectedPatient },
    practitionerDetails: selectedPractitioner,
    loc: loc,
    organization: getFromLocalStorage('data').userDetails
      .organizationDetails[0],
    paymentVia: paymentViaValuset.find(
      item => item.code === paymentViaRadioValue,
    ),
    paymentViaSystem: paymentViaValusetSysytem,
    serviceListSystemUrl: serviceListSystemUrl,
    status: paymentViaRadioValue === 'pending' ? 'Issued' : 'Balanced',
  };
  const handleSavePDfFunc = blob => {
    //debugger;
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function() {
      var base64String = reader.result;
      // console.log('Base64 String - ', base64String);
      setBaseString(base64String);
    };
  };
  const handleFinalize = async () => {
    const field = {
      ...obj,
    };
    // console.log(field);
    if (
      Object.keys(selectedPatient).length === 0 &&
      Object.keys(selectedPractitioner).length === 0
    ) {
      setPatientError(true);
      setPractitionerError(true);
    } else if (Object.keys(selectedPatient).length === 0) {
      setPatientError(true);
    } else if (Object.keys(selectedPractitioner).length === 0) {
      setPractitionerError(true);
    } else if (field.filteredArray.length > 0) {
      //debugger;
      setLoader(true);
      callSaveFinaliseBill(field);
    } else {
      props.snackbarShowMessage('No service added', 'error');
    }
  };
  const callSaveFinaliseBill = async field => {
    const { payload } = await props.saveFinilizeBill(field);
    setLoader(false);
    //debugger
    if (payload.data) {
      props.snackbarShowMessage(payload.data.message, 'success');
      setInvoiceId(
        payload.data && payload.data.invoiceId ? payload.data.invoiceId : '',
      );
      setInvoiceNum(
        payload.data && payload.data.invoiceNumber
          ? payload.data.invoiceNumber
          : '',
      );
      //debugger
      setOpenPDF(true);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const callSavePDFInvoiceAPI = async data => {
    //debugger
    const { payload } = await props.savePDFInvoice(data);
    if (payload.data) {
      setPdfSaveResponse(payload.data);
      setBaseString();
      props.snackbarShowMessage(payload.data.message, 'success');
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
      setIsLoadingShare(false);
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setIsLoadingShare(false);
    } else {
      props.snackbarShowMessage(payload, 'error');
      setIsLoadingShare(false);
    }
  };

  const handleOpenPatientDataDisplay = () => {
    setOpenPatientDataDisplay(false);
    setSelectedPatient({});
  };
  const handleOpenPractitionerDataDisplay = () => {
    setOpenPractitionerDataDisplay(false);
    setSelectedPractitioner({});
  };
  const handleClose = () => {
    setOpenPDF(false);
    setEditable(false);
  };
  const handleShareInvoice = actionType => {
    const field = {
      patientId: pdfSaveResponse.data.patientId,
      documentId: pdfSaveResponse.data.documentId,
    };
    setIsLoadingShare(true);
    callDoPDFShare(field);
    setIsLoadingShare(false);
  };
  const callDoPDFShare = async field => {
    const { payload } = await props.doSharePDF({
      ...field,
      resourceType: 'Billing',
    });
    if (payload.data) {
      props.snackbarShowMessage(payload.data.message, 'success');
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
    setIsLoadingShare(false);
  };
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopover',
  });
  const contentDisplay = [
    { type: 'Mobile', content: ShareSMS, height: '50px', width: '50px' },
  ];

  return (
    <>
      <Grid container spacing={4} style={{ marginTop: '-20px' }}>
        <Grid item xs={12} className={classes.headerDiv}>
          <Grid container>
            <Grid
              item
              xs={6}
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              style={{ marginTop: 5, alignItems: 'center' }}
            >
              <h2 style={{ fontWeight: 'bold' }}>Generate Bill</h2>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              style={{
                marginTop: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {/* <Button onClick={() => handleSaveAsDraft()} className={classes.saveBtn}>Save As Draft</Button> */}
              {editable ? (
                <div className={classes.wrapper}>
                  {!isLoader ? (
                    <Button
                      onClick={() => handleFinalize()}
                      className={classes.finilizeBtn}
                    >
                      Finalize{' '}
                    </Button>
                  ) : (
                    <Button className={classes.disabledBtn}>
                      Finalizing...
                    </Button>
                  )}
                  {isLoader && (
                    <CircularProgress
                      size={20}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className={classes.wrapper}>
                    {isLoadingShare && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                        style={{ marginLeft: '-24px', color: '#ff3399' }}
                      />
                    )}
                  </div>
                  <div
                    className={classes.options}
                    // onClick={() => handleShareInvoice()}
                    {...bindHover(popupState)}
                    style={{ padding: '2px 25px' }}
                  >
                    <img
                      src={shareIcon}
                      alt="Share"
                      height="20px"
                      width="20px"
                      className={classes.printBtn}
                    />
                  </div>
                  <div
                    className={classes.options}
                    onClick={() => setOpenPrintWindow(true)}
                    style={{ padding: '2px 25px' }}
                  >
                    <img
                      src={printIcon}
                      alt="Print"
                      height="20px"
                      width="20px"
                      className={classes.printBtn}
                    />
                  </div>
                </>
              )
              // <Button className={classes.finilizeBtn} onClick={()=> setOpenPrintWindow(true)}>Print</Button>
              }
              <div
                className={classes.options}
                onClick={() => history.push(ROUTES_CONSTANTS.BILLING)}
              >
                <CloseIcon fontSize="medium" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.reportSectionStyle}>
          <Grid container spacing={2} className={classes.topContainer}>
            <Grid item xs={4}>
              <img
                height="100"
                width="100"
                src={'data:image/*;base64,' + orgLogo.split('|')[1]}
                alt="icon"
                className={classes.orgImg}
              />
            </Grid>
            <Grid item xs={4} className={classes.titleContainer}>
              <Typography variant="h2" style={{ fontWeight: 500 }}>
                Bill-Cum-Receipt
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.clinicDetailsContainer}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {orgName}, {locName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {gstn ? `GSTN ${gstn}` : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.numDateContainer}>
            <Grid item xs={6} className={classes.invoiceNo}>
              <Typography
                variant="h4"
                style={{ fontWeight: 500, color: '#373737' }}
              >
                Invoice Number : <b>{!editable ? invoiceNum : ''}</b>
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.invoiceDate}>
              <Typography
                variant="h4"
                style={{ fontWeight: 500, color: '#373737' }}
              >
                Invoice Date : <b>{invoiceDate}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.toByContainer}>
            <Grid item xs={6}>
              <Grid container className={classes.billTo}>
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      Bill To
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    {openPatientDataDisplay && editable ? (
                      <Button onClick={handleOpenPatientDataDisplay}>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: 500, color: '#373737' }}
                        >
                          Change
                        </Typography>
                      </Button>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
                {!openPatientDataDisplay ? (
                  <Grid item xs={12}>
                    <Autocomplete
                      id="selectPatient"
                      size="small"
                      fullWidth
                      options={
                        patientListFromSearch ? patientListFromSearch : []
                      }
                      open={open}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      loading={loading}
                      defaultValue={selectedPatient}
                      renderOption={option => {
                        const optionValue =
                          option && option.patient && option.patient;
                        const nameValue = optionValue.display.split('/')[0];
                        const age = optionValue.display.split('/')[3];
                        const gender =
                          optionValue.display.split('/')[1] === 'Male'
                            ? 'M'
                            : optionValue.display.split('/')[1] === 'Female'
                            ? 'F'
                            : 'O';
                        const mobile = optionValue.display.split('/')[2];
                        const nQPatientId = optionValue.nQPatientId;
                        return (
                          <Grid
                            container
                            style={{ fontSize: '1.2rem', color: '#373737' }}
                          >
                            <Grid item xs={9}>
                              <Typography variant="h4">
                                {nameValue} - {age}/{gender}
                              </Typography>
                              <Typography variant="h6">
                                (+91&nbsp; {mobile})
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              style={{ textAlign: 'right', color: '#B4B4B4' }}
                            >
                              <Typography variant="h4">
                                {nQPatientId}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      }}
                      onChange={(event, newValue) => {
                        handleSelectionPatient(newValue);
                      }}
                      getOptionLabel={option =>
                        (option &&
                          option.patient &&
                          option.patient.display &&
                          option.patient.display.split('/')[0]) ||
                        ''
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textField}
                          margin="dense"
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          error={patientError}
                          helperText={patientError ? 'Required' : ''}
                          onChange={ev => {
                            // dont fire API if the user delete or not entered anything
                            if (
                              ev.target.value !== '' ||
                              ev.target.value !== null
                            ) {
                              onChangeHandle(ev.target.value);
                            }
                          }}
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select Patient',
                            className: classes.input1,
                            classes: { notchedOutline: classes.noBorder },
                            startAdornment: (
                              <>
                                <InputAdornment position="start">
                                  <SearchIcon style={{ color: '#d0d0d0' }} />
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Grid container>
                        {
                          <>
                            <Grid item xs={6}>
                              <Typography
                                variant="h4"
                                style={{ fontWeight: 500, color: '#444444' }}
                              >
                                Patient Name
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant="h4"
                                style={{ fontWeight: 500, color: '#444444' }}
                              >
                                {selectedPatient.name}
                              </Typography>
                            </Grid>
                          </>
                        }
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            Patient Id
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            {selectedPatient.id}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            Address
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          {selectedPatient &&
                          selectedPatient.address &&
                          selectedPatient.address.line ? (
                            <Typography
                              variant="h4"
                              style={{ fontWeight: 500, color: '#444444' }}
                            >
                              {selectedPatient.address.line}
                            </Typography>
                          ) : (
                            ''
                          )}
                          {selectedPatient &&
                          selectedPatient.address &&
                          selectedPatient.address.city ? (
                            <Typography
                              variant="h4"
                              style={{ fontWeight: 500, color: '#444444' }}
                            >
                              {selectedPatient.address.city}
                            </Typography>
                          ) : (
                            ''
                          )}
                          {selectedPatient &&
                          selectedPatient.address &&
                          selectedPatient.address.district ? (
                            <Typography
                              variant="h4"
                              style={{ fontWeight: 500, color: '#444444' }}
                            >
                              {selectedPatient.address.district}
                            </Typography>
                          ) : (
                            ''
                          )}
                          {selectedPatient &&
                          selectedPatient.address &&
                          selectedPatient.address.state ? (
                            <Typography
                              variant="h4"
                              style={{ fontWeight: 500, color: '#444444' }}
                            >
                              {selectedPatient.address.state}
                            </Typography>
                          ) : (
                            ''
                          )}
                          {selectedPatient &&
                          selectedPatient.address &&
                          selectedPatient.address.postalCode ? (
                            <Typography
                              variant="h4"
                              style={{ fontWeight: 500, color: '#444444' }}
                            >
                              {selectedPatient.address.postalCode}
                            </Typography>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            Mobile No.
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            +91 {selectedPatient.phone}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container className={classes.prescribedBy}>
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <Grid item xs={8}>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      Prescribing Physician
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    {openPractitionerDataDisplay && editable ? (
                      <Button onClick={handleOpenPractitionerDataDisplay}>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: 500, color: '#373737' }}
                        >
                          Change
                        </Typography>
                      </Button>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
                {!openPractitionerDataDisplay ? (
                  <Grid item xs={12}>
                    <Autocomplete
                      id="selectPractitioner"
                      size="small"
                      fullWidth
                      options={
                        practitionerListFromSearch
                          ? practitionerListFromSearch
                          : []
                      }
                      open={openPrac}
                      onOpen={() => {
                        setOpenPrac(true);
                      }}
                      onClose={() => {
                        setOpenPrac(false);
                      }}
                      loading={loadingPrac}
                      defaultValue={selectedPractitioner}
                      renderOption={option => {
                        const optionValue =
                          option && option.practitioner && option.practitioner;
                        const nameValue = optionValue.display.split('/')[0];
                        const mobile = optionValue.display.split('/')[2];
                        return (
                          <Grid
                            container
                            style={{ fontSize: '1.2rem', color: '#373737' }}
                          >
                            <Grid item xs={6}>
                              <Typography variant="h4">{nameValue}</Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              style={{ textAlign: 'right', color: '#B4B4B4' }}
                            >
                              <Typography variant="h5">
                                (+91&nbsp; {mobile})
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      }}
                      onChange={(event, newValue) => {
                        handleSelectionPractitioner(newValue);
                      }}
                      getOptionLabel={option =>
                        (option &&
                          option.practitioner &&
                          option.practitioner.display &&
                          option.practitioner.display.split('/')[0]) ||
                        ''
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textField}
                          margin="dense"
                          variant="outlined"
                          error={practitionerError}
                          helperText={practitionerError ? 'Required' : ''}
                          InputLabelProps={{ shrink: false }}
                          onChange={ev => {
                            // dont fire API if the user delete or not entered anything
                            if (
                              ev.target.value !== '' ||
                              ev.target.value !== null
                            ) {
                              onChangeHandle(ev.target.value);
                            }
                          }}
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select Practitioner',
                            className: classes.input1,
                            classes: { notchedOutline: classes.noBorder },
                            startAdornment: (
                              <>
                                <InputAdornment position="start">
                                  <SearchIcon style={{ color: '#d0d0d0' }} />
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            Physician Name -
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            {selectedPractitioner.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            MCI Number -
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#444444' }}
                          >
                            {selectedPractitioner.mciNum}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant="h4" style={{ fontWeight: 500, color: "#444444" }}>
                                                        Mobile Number -
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="h4" style={{ fontWeight: 500, color: "#444444" }}>
                                                        +91 9874563210
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                    <Grid item xs={12}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={12}>
                      &nbsp;
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.tableContainer}>
            <Grid item xs={12} className={classes.tableWrapper}>
              <Grid container className={classes.tableBorder}>
                <Grid item xs={12}>
                  <ReportTable
                    column={columnArray}
                    arrayOfBilledItems={filteredArray}
                    openAddNewRowInput={openAddNewRowInput}
                    serviceListArray={serviceListArray}
                    handleTotalAmount={handleTotalAmount}
                    handleTotalBilledAmount={handleTotalBilledAmount}
                    handleTotalDiscountAmount={handleTotalDiscountAmount}
                    handleFilteredArrayOfBilledItems={
                      handleFilteredArrayOfBilledItems
                    }
                    disabled={editable}
                  />
                </Grid>
                {/* <Grid item xs={12} className={classes.addServiceStyle} onClick={() => handleAddNewService()}>
                                    <Typography variant="h4" style={{ fontWeight: 500, }}><AddRoundedIcon className={classes.addServiceFontStyle} />Add service</Typography>
                                </Grid> */}
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10} className={classes.totalAmountStyle}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#373737' }}
                      >
                        Total Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.totalAmountStyle}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#373737' }}
                      >
                        &#8377;{' '}
                        {parseFloat(
                          totalBilledAmount - totalDiscountAmount,
                        ).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.toByContainer}>
            <Grid item xs={6}>
              <Grid
                container
                className={classes.billTo}
                style={{ border: 'none' }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: 500,
                      color: '#373737',
                      marginBottom: '15px',
                    }}
                  >
                    Add Comment
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography variant="h4" style={{ fontWeight: 500, color: "#444444" }}> */}
                  <TextField
                    className={classes.textField}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={5}
                    disabled={!editable}
                    size="small"
                    onBlur={e => {
                      handleSaveComment(e);
                    }}
                    InputProps={{
                      placeholder: 'Enter Comment',
                      className: classes.input1,
                      classes: { notchedOutline: classes.noBorder },
                    }}
                  />
                  {/* </Typography> */}
                </Grid>
                <Grid item xs={12}>
                  &nbsp;
                </Grid>
                <Grid item xs={12}>
                  &nbsp;
                </Grid>
                <Grid item xs={12}>
                  &nbsp;
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container className={classes.paymentInfoStyle}>
                <Grid item xs={12} className={classes.paymentInfoLayout}>
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: 500,
                      color: '#373737',
                      marginBottom: '15px',
                    }}
                  >
                    Payment Information
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.paymentInfoLayout}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        Billed Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        {parseFloat(totalBilledAmount).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.paymentInfoLayout}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        Discount
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        {parseFloat(totalDiscountAmount).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    backgroundColor: '#F7F6F4',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                  }}
                  className={classes.paymentInfoLayout}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        <b>Total Payable Amount</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        <b>
                          &#8377;{' '}
                          {parseFloat(
                            totalBilledAmount - totalDiscountAmount,
                          ).toFixed(2)}
                        </b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.paymentInfoLayout}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 500, color: '#444444' }}
                      >
                        Amount paid via
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="paymentVia"
                          name="paymentVia"
                          value={paymentViaRadioValue}
                          onChange={handleChangePaymentViaType}
                        >
                          {paymentViaValuset &&
                            paymentViaValuset.map((item, index) => {
                              return (
                                <FormControlLabel
                                  value={item.code}
                                  control={
                                    <Radio
                                      disabled={!editable}
                                      classes={{
                                        root: classes.radio,
                                        checked: classes.checked,
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      variant="h4"
                                      style={{
                                        fontWeight: 500,
                                        color: '#444444',
                                      }}
                                    >
                                      {item.display}
                                    </Typography>
                                  }
                                  key={index.toString()}
                                  className={classes.smallRadioButton}
                                />
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openPDF && invoiceNum ? (
        <PDFDownloadLink
          document={
            <ReportPdfDesign
              orgLogo={orgLogo}
              orgName={orgName}
              locName={locName}
              gstn={gstn}
              invoiceNum={invoiceNum}
              invoiceDate={invoiceDate}
              patientDetails={{ details: selectedPatient, ...selectedPatient }}
              practitionerDetails={selectedPractitioner}
              columnArray={columnArray}
              filteredArray={filteredArray}
              totalNetAmount={
                parseFloat(totalBilledAmount).toFixed(2) -
                parseFloat(totalDiscountAmount).toFixed(2)
              }
              totalGrossAmount={parseFloat(totalBilledAmount).toFixed(2) - 0}
              totalDiscount={parseFloat(totalDiscountAmount).toFixed(2) - 0}
              comment={comment}
              paymentVia={paymentDisplay}
            />
          }
          fileName="Bill.pdf"
        >
          {({ blob, url, loading, error }) => {
            //debugger
            loading ? 'Loading document...' : handleSavePDfFunc(blob);
          }}
        </PDFDownloadLink>
      ) : (
        ''
      )}
      {openPrintWindow ? (
        <PDFDownloadLink
          document={
            <ReportPdfDesign
              orgLogo={orgLogo}
              orgName={orgName}
              locName={locName}
              gstn={gstn}
              invoiceNum={invoiceNum}
              invoiceDate={invoiceDate}
              patientDetails={{ details: selectedPatient, ...selectedPatient }}
              practitionerDetails={selectedPractitioner}
              columnArray={columnArray}
              filteredArray={filteredArray}
              totalNetAmount={
                parseFloat(totalBilledAmount).toFixed(2) -
                parseFloat(totalDiscountAmount).toFixed(2)
              }
              totalGrossAmount={parseFloat(totalBilledAmount).toFixed(2) - 0}
              totalDiscount={parseFloat(totalDiscountAmount).toFixed(2) - 0}
              comment={comment}
              paymentVia={paymentDisplay}
            />
          }
          fileName="Bill.pdf"
        >
          {({ blob, url, loading, error }) => {
            //debugger;
            loading
              ? 'Loading document...'
              : setTimeout(() => {
                  printJS({
                    printable: url,
                    onPrintDialogClose: () => setOpenPrintWindow(false),
                  });
                }, 1000);
          }}
        </PDFDownloadLink>
      ) : (
        ''
      )}
      <SharingPopUp
        popupState={popupState}
        content={contentDisplay}
        handleAction={handleShareInvoice}
      />
    </>
  );
}
const mapStateToProps = state => state;
export function mapDispatchToProps(dispatch) {
  return {
    fetchNewServiceValueSet: () => dispatch(fetchNewServiceValueSet()),
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    getPatientList: payload => dispatch(getPatientList(payload)),
    getPractitionerList: payload => dispatch(getPractitionerList(payload)),
    saveFinilizeBill: payload => dispatch(saveFinilizeBill(payload)),
    savePDFInvoice: payload => dispatch(savePDFInvoice(payload)),
    doSharePDF: payload => dispatch(doSharePDF(payload)),
    dispatch,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withRouter,
  memo,
  MessageComponent,
)(GenerateBill);
