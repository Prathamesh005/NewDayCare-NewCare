import {
  Chip,
  CircularProgress,
  Fab,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
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
  getPatientDetails,
  useAppointmentSlice,
} from '../../../apis/appointmentsApis/appointmentSlice';
import {
  fetchInvoicesFromDate,
  fetchListOfInvoicesFromSearch,
  savePDFInvoice,
  useBillingSlice,
} from '../../../apis/billingApis/billingSlice';
import { doSharePDF } from '../../../apis/globalApis/globalSlice';
import NoRecord from '../../../components/elements/NoRecordPage';
import SharingPopUp from '../../../components/sharingPopUp/SharingPopUp';
import { MessageComponent } from '../../../components';
import printIcon from '../../../images/print.svg';
import shareIcon from '../../../images/share.svg';
import ShareSMS from '../../../images/SharingSMS.svg';
import { getFromLocalStorage } from '../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import Report from './components/Report';
// import { useReactToPrint } from "react-to-print";
import ReportPdfDesign from './components/ReportPdfDesign';
import SkeletonBilling from './Skeleton';

const useStyles = makeStyles(theme => ({
  containerMain: {
    // height: "78vh",
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
  },
  leftPanel: {
    width: '30%',
    // marginRight: "1rem",
  },
  rightPanel: {
    width: '68%',
  },
  topContainer: {
    backgroundColor: theme.palette.backgroundColor.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    padding: '0.5rem',
  },
  tabHeader: {
    border: '2px solid #eaeaea',
    backgroundColor: '#f0f0f0',
    height: '80vh',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
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
  paginatedButton: {
    background: theme.palette.button.paginated.color,
    color: theme.palette.button.primary.color,
  },
  fabBtn: {
    textAlign: 'center',
    '& .MuiFab-root': {
      boxShadow: 'none',
    },
  },
  tableGroup: {
    margin: '0.7rem',
    overflowY: 'auto',
    height: '85%',
    backgroundColor: '#ffffff',
  },
  tableBody: {
    tableLayout: 'fixed',
    width: '100%',
    borderCollapse: 'collapse',
    padding: '1rem',
    '& td': {
      // borderBottom: "1px solid #F4F4F4",
      // textAlign: "left",
      padding: '0.7rem',
    },
    '& tr': {
      border: '1px solid #F4F4F4',
    },
  },
  printBtn: {
    margin: '5px',
    color: '#cacaca',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '2px',
    fontSize: 'xx-small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    '&:nth-child(4)': {
      borderTop: '0px',
      borderBottom: '0px',
      padding: '2px 5px',
      backgroundColor: '#ffffff',
    },
    cursor: 'pointer',
  },
  pdfSection: {
    display: 'none',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '10%',
    marginTop: -12,
    marginLeft: -24,
  },
}));
function EachReportDetails(props) {
  useBillingSlice();
  useAppointmentSlice();
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const uid = uuidv4();
  const [indexValue, setIndexValue] = useState(null);
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
  const [openPDF, setOpenPDF] = useState(false);
  const { arrayOfInvoices, rowDetails } = props;
  const [arrayOfBilledItems, setArrayOfBilledItems] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [columnArray, setColumnArray] = useState([
    'no',
    'service',
    'amount',
    'discount',
    'netAmount',
  ]);
  const [patientData, setPatientData] = useState(null);
  const [requiredPatientData, setRequiredPatientData] = useState(null);
  const gstn =
    getFromLocalStorage('data').userDetails.organizationDetails[0]['gstin'] ||
    '';
  const [invoiceNum, setInvoiceNum] = useState();
  const invoiceDate = moment().format('DD/MM/YYYY');
  const practitionerData = getFromLocalStorage('data').userDetails;
  const practitionerObj = {
    name: practitionerData.display.split('/')[0],
    mciNum: '',
  };
  const [totalNetAmount, setTotalNetAmount] = useState(0);
  const [totalGrossAmount, setTotalGrossAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [comment, setComment] = useState('');
  const [paymentViaRadioValue, setPaymentViaRadioValue] = useState('');
  const [paymentVia, setPaymentVia] = useState({});
  const [paymentViaValusetSysytem, setPaymentViaValusetSysytem] = useState('');
  const [serviceListSystemUrl, setServiceListSystemUrl] = useState('');
  const [saveSuccessResponse, setSaveSuccessResponse] = useState(null);
  const [newInvoiceNum, setNewInvoiceNum] = useState('');
  const [totalInvoiceData, setTotalInvoiceData] = useState([]);
  const [invoiceFromSearch, setInvoiceFromSearch] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [inputSearch, setInputSearch] = useState('');
  const [patientId, setPatientId] = useState('');
  const [itemDetails, setItemDetails] = useState(rowDetails);
  const { isLoading } = props;
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loaderDisplayOne, setLoaderDisplayOne] = useState(true);
  const [loaderDisplayTwo, setLoaderDisplayTwo] = useState(false);
  const [documentId, setDocumentId] = useState();
  const [clickOption, setClickOption] = useState();
  const [baseString, setBaseString] = useState();
  const [pdfSaveResponse, setPdfSaveResponse] = useState();
  const practitioner =
    rowDetails &&
    rowDetails.billingInvoice &&
    rowDetails.billingInvoice.participants.find(
      item =>
        item.actor &&
        item.actor.resourceType &&
        item.actor.resourceType === 'Practitioner',
    );
  const [isLoadingShare, setIsLoadingShare] = useState(false);

  useEffect(() => {
    if (loaderDisplayOne) {
      setTimeout(() => {
        setLoaderDisplayOne(false);
      }, 2000);
    }
  }, []);
  useEffect(() => {
    if (loaderDisplayTwo) {
      setTimeout(() => {
        setLoaderDisplayTwo(false);
      }, 2000);
    }
  }, [loaderDisplayTwo]);

  useEffect(() => {
    setItemDetails(rowDetails);
    setPatientId(
      rowDetails.billingInvoice.participants[1]['actor']['resourceId'],
    );
    setInvoiceNum(rowDetails.billingInvoice.invoiceNumber);
    setTotalNetAmount(rowDetails.billingInvoice.totalNet);
    setTotalGrossAmount(rowDetails.billingInvoice.totalGross);
    setTotalDiscountAmount(
      rowDetails.billingInvoice.totalPriceComponent[1]['amount'],
    );
    setComment(rowDetails.billingInvoice.note);
    setPaymentVia(rowDetails.billingInvoice.type);
    setDocumentId(
      rowDetails.billingInvoice.document &&
      rowDetails.billingInvoice.document.resourceId,
    );
    // debugger;
  }, []);
  useEffect(() => {
    const dates = { toDate: props.selectedDate, fromDate: props.selectedDate };
    const input = inputSearch;
    if (input) {
      setLoaderDisplayOne(true);
      callFetchListOfInvoicesFromSearch(input);
      setLoaderDisplayOne(false);
    } else {
      callFetchInvoicesFromDate(dates);
    }
  }, [inputSearch]);
  const callFetchListOfInvoicesFromSearch = async input => {
    const { payload } = await props.fetchListOfInvoicesFromSearch({
      toDate: props.selectedDate,
      fromDate: props.selectedDate,
      input,
    });
    if (payload.data) {
      setTotalInvoiceData(payload.data && payload.data.billingInvoices);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };

  useEffect(() => {
    let arr =
      itemDetails &&
      itemDetails.billingInvoice.invoiceLineItem &&
      itemDetails.billingInvoice.invoiceLineItem.length > 0 &&
      itemDetails.billingInvoice.invoiceLineItem.map(item => {
        return {
          service: {
            code: item.chargeItemCodeableConcept.code,
            display: item.chargeItemCodeableConcept.display,
          },
          amount: item.priceComponent[0]['amount'],
          discount: item.priceComponent[1]['amount'],
        };
      });
    setFilteredArray(arr);
  }, [itemDetails]);
  useEffect(() => {
    const dates = { toDate: props.selectedDate, fromDate: props.selectedDate };
    callFetchInvoicesFromDate(dates);
  }, []);

  const callFetchInvoicesFromDate = async dates => {
    const { payload } = await props.fetchInvoicesFromDate(dates);
    if (payload.data) {
      setTotalInvoiceData(payload.data && payload.data.billingInvoices);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const handleArrays = (arrColumn, arrBill) => {
    setColumnArray(arrColumn);
    setFilteredArray(arrBill);
  };
  const handleHover = index => {
    setIndexValue(index);
  };

  const handlePrint = () => {
    setIsLoadingShare(true);
    setNewInvoiceNum(invoiceNum);
    setOpenPDF(true);
  };
  const pdfSaveAPIcall = baseString => {
    // const practitioner = rowDetails.billingInvoice.participants.find(item => item.actor && item.actor.resourceType && item.actor.resourceType === "Practitioner")
    const newObj = {
      invoiceId: rowDetails.billingInvoice.resourceId,
      resourceId: uid,
      recordName: `${rowDetails.billingInvoice.invoiceNumber
        ? rowDetails.billingInvoice.invoiceNumber
        : 'Billing'
        }.pdf`,
      practitioner: practitioner && {
        name:
          practitioner.actor.display &&
          practitioner.actor.display.split('/')[0],
        fhirResourceId: practitioner.actor.resourceId,
        display: practitioner.actor.display,
      },
      patientDetails: {
        details: rowDetails.billingInvoice.cancerPatientResourceReference,
      },
      content: [
        {
          attachment: {
            contentType: 'application/pdf',
            title: `${rowDetails.billingInvoice.invoiceNumber
              ? rowDetails.billingInvoice.invoiceNumber
              : 'Billing'
              }.pdf`,
            data: baseString && baseString.split(',')[1],
          },
        },
      ],
      expense: {
        name: 'Consultation_Fee',
        tag: ['#consultation'],
        date: moment().format('YYYY-MM-DD'),
        expense: rowDetails.billingInvoice.totalNet,
        summary: rowDetails.billingInvoice.note
          ? rowDetails.billingInvoice.note
          : null,
        patientResourceId:
          rowDetails.billingInvoice.cancerPatientResourceReference.resourceId,
      },
    };
    callSavePDFInvoiceAPI(newObj);
  };

  const callSavePDFInvoiceAPI = async data => {
    const { payload } = await props.savePDFInvoice(data);
    if (payload.data) {
      // debugger;
      setPdfSaveResponse(payload.data);
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

  const handleSaveAndSharePdf = blob => {
    // debugger;
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
      var base64String = reader.result;
      // console.log('Base64 String - ', base64String);
      setBaseString(base64String);
    };
  };

  useEffect(() => {
    if (baseString) {
      // debugger;
      pdfSaveAPIcall(baseString);
      setOpenPDF(false);
      setClickOption();
    }
  }, [baseString]);

  useEffect(() => {
    // debugger;
    if (pdfSaveResponse) {
      const field = {
        patientId: pdfSaveResponse && pdfSaveResponse.data.patientId,
        documentId: pdfSaveResponse && pdfSaveResponse.data.documentId,
      };
      callDoPDFShare(field);
    }
  }, [pdfSaveResponse]);
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
  const handleShare = () => {
    setIsLoadingShare(true);
    setNewInvoiceNum(invoiceNum);
    setOpenPDF(true);
    setClickOption('share');
  };
  const handlePaymentURL = val => {
    setPaymentViaValusetSysytem(val);
  };
  const handleServiceURL = val => {
    setServiceListSystemUrl(val);
  };
  const handlePaymentViaObj = val => {
    setPaymentVia(val);
  };
  const handleClosePDF = () => {
    setOpenPDF(false);
  };
  const onChangeHandle = val => {
    setInputSearch(val);
  };

  useEffect(() => {
    const id = patientId;
    // debugger;
    if (id) {
      callFetchPatientDataFrmId(id);
    }
  }, [patientId]);
  const callFetchPatientDataFrmId = async id => {
    const { payload } = await props.getPatientDetails(id);
    if (payload.data) {
      setPatientData(payload.data);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopover',
  });
  useEffect(() => {
    if (patientData && patientData.patient && patientData.patient.display) {
      //debugger;
      let obj = {
        name: patientData && patientData.patient.display.split('/')[0],
        id: patientData && patientData.patient.nQPatientId,
        address: patientData && patientData.patient.addressDetail[0],
        phone: patientData && patientData.patient.display.split('/')[2],
      };
      setRequiredPatientData(obj);
    }
  }, [patientData]);
  const handleRowDetails = item => {
    setLoaderDisplayTwo(true);
    setItemDetails(item);
    setPatientId(item.billingInvoice.participants[1]['actor']['resourceId']);
    setInvoiceNum(item.billingInvoice.invoiceNumber);
    setTotalNetAmount(item.billingInvoice.totalNet);
    setTotalDiscountAmount(
      item.billingInvoice.totalPriceComponent[1]['amount'],
    );
    setComment(item.billingInvoice.note);
    setPaymentVia(item.billingInvoice.type);
    setDocumentId(
      rowDetails.billingInvoice.document &&
      rowDetails.billingInvoice.document.resourceId,
    );
  };

  const handlePrintComment = value => {
    setComment(value);
  };
  const handleSnackBarClose = () => {
    setSnackBar(false);
  };
  const contentDisplay = [
    { type: 'Mobile', content: ShareSMS, height: '10rem', width: '10rem' },
  ];
  // console.log('rowDetails', rowDetails);
  // console.log("totalNetAmount", totalNetAmount)
  return (
    <>
      <Grid container spacing={2} className={classes.containerMain}>
        <Grid item xs={4} className={classes.leftPanel}>
          <Grid container className={classes.tabHeader}>
            <Grid item xs={12} className={classes.topContainer}>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <TextField
                    id="searchInvoice"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: false }}
                    onChange={ev => {
                      // dont fire API if the user delete or not entered anything
                      if (ev.target.value !== '' || ev.target.value !== null) {
                        onChangeHandle(ev.target.value);
                      }
                    }}
                    InputProps={{
                      placeholder: 'Select Invoices',
                      className: classes.input1,
                      classes: { notchedOutline: classes.noBorder },
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <SearchIcon style={{ color: '#d0d0d0' }} />
                          </InputAdornment>
                        </>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={2} className={classes.fabBtn}>
                  <Fab
                    disableRipple
                    aria-label="add"
                    size="small"
                    style={{ fontSize: 14, textTransform: 'capitalize' }}
                    className={classes.paginatedButton}
                    onClick={() =>
                      history.push(ROUTES_CONSTANTS.GENERATE_BILLING)
                    }
                  >
                    {<AddIcon />}
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.tableGroup}>
              <table className={classes.tableBody}>
                <col style={{ width: '60%' }} />
                <col style={{ width: '40%' }} />
                {!loaderDisplayOne ? (
                  totalInvoiceData && totalInvoiceData ? (
                    totalInvoiceData.map((item, index) => {
                      const arr = [];
                      item.billingInvoice &&
                        item.billingInvoice.invoiceLineItem &&
                        item.billingInvoice.invoiceLineItem.forEach(ele =>
                          arr.push(ele.chargeItemCodeableConcept.display),
                        );
                      return (
                        <tr
                          key={index.toString()}
                          onClick={() => handleRowDetails(item)}
                          onMouseEnter={() => handleHover(index)}
                          onMouseLeave={() => setIndexValue(null)}
                          style={
                            index === indexValue
                              ? {
                                cursor: 'pointer',
                                backgroundColor: 'rgb(239, 250, 255, 0.5)',
                              }
                              : {}
                          }
                        >
                          <td>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  style={{ fontWeight: 500, color: '#373737' }}
                                >
                                  {
                                    item.billingInvoice.participants[1][
                                      'actor'
                                    ]['display'].split('/')[0]
                                  }
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  style={{ fontWeight: 400, color: '#6a6a6a' }}
                                >
                                  {item.billingInvoice.invoiceNumber} -{' '}
                                  {moment(item.billingInvoice.date).format(
                                    'DD MMM YYYY',
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </td>
                          <td>
                            <Grid container spacing={2}>
                              <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <Typography
                                  variant="h4"
                                  style={{ fontWeight: 500, color: '#373737' }}
                                >
                                  &#8377; {item.billingInvoice.totalNet}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <Typography
                                  variant="h4"
                                  style={{ fontWeight: 500 }}
                                >
                                  <Chip
                                    size="small"
                                    label={item.billingInvoice.status}
                                    style={
                                      item.billingInvoice.status === 'Pending'
                                        ? {
                                          color: '#FF9900',
                                          backgroundColor:
                                            'rgb(255, 153, 0, 0.1)',
                                        }
                                        : item.billingInvoice.status === 'Draft'
                                          ? {
                                            color: '#727272',
                                            backgroundColor:
                                              'rgb(114, 114, 114, 0.1)',
                                          }
                                          : {
                                            color: '#00B9FF',
                                            backgroundColor:
                                              'rgb(0, 185, 255, 0.1)',
                                          }
                                    }
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <NoRecord />
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <SkeletonBilling />
                    </td>
                  </tr>
                )}
              </table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.rightPanel}>
          <Grid container className={classes.tabHeader}>
            <Grid item xs={12} className={classes.topContainer}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid item xs={8}>
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    #{invoiceNum}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ display: 'flex', justifyContent: 'end' }}
                >
                  {/* <div
                    className={classes.options}
                    style={{ visibility: 'hidden' }}
                  >
                    <img
                      src={editIcon}
                      alt="Share"
                      height="12px"
                      width="12px"
                      className={classes.printBtn}
                    />
                  </div>
                  <div
                    className={classes.options}
                    style={{ visibility: 'hidden' }}
                  >
                    <img
                      src={mailIcon}
                      alt="Print"
                      height="12px"
                      width="12px"
                      className={classes.printBtn}
                    />
                  </div> */}
                  <div className={classes.wrapper}>
                    {isLoadingShare && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                  <div
                    className={classes.options}
                    // onClick={() => handleShare()}
                    {...bindHover(popupState)}
                  >
                    <img
                      src={shareIcon}
                      alt="Print"
                      height="12px"
                      width="12px"
                      className={classes.printBtn}
                    />
                  </div>
                  <div
                    className={classes.options}
                    onClick={() => handlePrint()}
                  >
                    <img
                      src={printIcon}
                      alt="Print"
                      height="12px"
                      width="12px"
                      className={classes.printBtn}
                    />
                  </div>
                  <div className={classes.options} />

                  <div
                    className={classes.options}
                    onClick={() => props.handleCloseEachReportDetails()}
                  >
                    <CloseIcon fontSize="small" />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.tableGroup}
              style={{ border: `1px solid #e6e6e6` }}
            >
              {!loaderDisplayTwo ? (
                <Report
                  handleArrays={handleArrays}
                  details={itemDetails}
                  columnArray={columnArray}
                  filteredArray={filteredArray}
                  orgLogo={orgLogo}
                  orgName={orgName}
                  locName={locName}
                  gstn={gstn}
                  invoiceNum={invoiceNum}
                  invoiceDate={invoiceDate}
                  patientData={requiredPatientData}
                  practitionerDetails={
                    practitioner && {
                      name:
                        practitioner.actor.display &&
                        practitioner.actor.display.split('/')[0],
                      fhirResourceId: practitioner.actor.resourceId,
                      display: practitioner.actor.display,
                    }
                  }
                  totalNetAmount={parseFloat(totalNetAmount).toFixed(2) - 0}
                  totalGrossAmount={parseFloat(totalGrossAmount).toFixed(2) - 0}
                  totalDiscount={parseFloat(totalDiscountAmount).toFixed(2) - 0}
                  comment={comment}
                  paymentVia={paymentVia.code}
                  handlePaymentURL={handlePaymentURL}
                  handleServiceURL={handleServiceURL}
                  handlePaymentViaObj={handlePaymentViaObj}
                  handlePrintComment={handlePrintComment}
                />
              ) : (
                <SkeletonBilling />
              )}
            </Grid>
          </Grid>
        </Grid>
        {openPDF ? (
          <PDFDownloadLink
            document={
              <ReportPdfDesign
                orgLogo={orgLogo}
                orgName={orgName}
                locName={locName}
                gstn={gstn}
                invoiceNum={newInvoiceNum}
                invoiceDate={invoiceDate}
                patientDetails={requiredPatientData}
                practitionerDetails={
                  practitioner && {
                    name:
                      practitioner.actor.display &&
                      practitioner.actor.display.split('/')[0],
                    fhirResourceId: practitioner.actor.resourceId,
                    display: practitioner.actor.display,
                  }
                }
                columnArray={columnArray}
                filteredArray={filteredArray}
                totalNetAmount={parseFloat(totalNetAmount).toFixed(2) - 0}
                totalGrossAmount={parseFloat(totalGrossAmount).toFixed(2) - 0}
                totalDiscount={parseFloat(totalDiscountAmount).toFixed(2) - 0}
                comment={comment}
                paymentVia={paymentVia.display}
              />
            }
            fileName="bill.pdf"
          >
            {({ blob, url, loading, error }) => {
              //debugger;
              loading
                ? 'Loading document...'
                : clickOption === 'share'
                  ? handleSaveAndSharePdf(blob)
                  : printJS({
                    printable: url,
                    onPrintDialogClose: () => {
                      setOpenPDF(false);
                      setIsLoadingShare(false);
                    },
                  });
            }}
          </PDFDownloadLink>
        ) : (
          ''
        )}
        {/* {openPDF ? <PDFViewerDialog
                    open={openPDF}
                    handleClose={handleClosePDF}
                    columnArray={columnArray}
                    filteredArray={filteredArray}
                    orgLogo={orgLogo}
                    orgName={orgName}
                    locName={locName}
                    gstn={gstn}
                    invoiceNum={newInvoiceNum}
                    invoiceDate={invoiceDate}
                    patientDetails={requiredPatientData}
                    practitionerDetails={practitionerObj}
                    totalNetAmount={(parseFloat(totalNetAmount).toFixed(2)) - parseFloat(totalDiscountAmount).toFixed(2)}
                    totalAmount={parseFloat(totalNetAmount).toFixed(2) - 0}
                    totalDiscount={parseFloat(totalDiscountAmount).toFixed(2) - 0}
                    comment={comment}
                    paymentVia={paymentVia.display}
                /> : ""} */}
        {/* {openPDF? <ReportPdfDesign columnArray={columnArray} filteredArray={filteredArray}/>:""} */}
      </Grid>
      <SharingPopUp
        popupState={popupState}
        content={contentDisplay}
        handleAction={handleShare}
        loading={isLoadingShare}
      />
    </>
  );
}

const mapStateToProps = state => state;
export const mapDispatchToProps = dispatch => {
  return {
    getPatientDetails: payload => dispatch(getPatientDetails(payload)),
    fetchInvoicesFromDate: payload => dispatch(fetchInvoicesFromDate(payload)),
    fetchListOfInvoicesFromSearch: payload =>
      dispatch(fetchListOfInvoicesFromSearch(payload)),
    savePDFInvoice: payload => dispatch(savePDFInvoice(payload)),
    doSharePDF: payload => dispatch(doSharePDF(payload)),
  };
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withRouter,
  memo,
  MessageComponent,
)(EachReportDetails);
