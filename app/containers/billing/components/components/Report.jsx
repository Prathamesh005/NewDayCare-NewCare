import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchNewServiceValueSet,
  useBillingSlice,
} from '../../../../apis/billingApis/billingSlice';
import { valueSetSearch } from '../../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../../components';
import { URLS } from '../../../../utils/urls';
import ReportTableEach from './ReportTableEach';
const useStyles = makeStyles(theme => ({
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
  titleContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    textDecoration: 'underline',
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
    borderRadius: '5px',
    padding: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  paymentInfoLayout: {
    padding: '0 1rem',
  },
  textField: {
    // width: "300px",
    '& .MuiOutlinedInput-input': {
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
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
  input2: {
    outline: 'none !important',
    // paddingRight: 18,
    disableUnderline: true,
  },
  smallRadioButton: {
    '& svg': {
      width: '1rem',
      height: '1rem',
    },
  },
  radio: {
    color: theme.palette.button.paginated.color,
    '&$checked': {
      color: theme.palette.button.paginated.color,
    },
  },
  checked: {},
}));
function Report(props) {
  useBillingSlice();
  const classes = useStyles();
  const {
    orgLogo,
    orgName,
    locName,
    gstn,
    invoiceNum,
    invoiceDate,
    patientData,
    practitionerDetails,
    details,
  } = props;
  const [billedItems, setBilledItems] = useState([]);
  const [status, setStatus] = useState(details.billingInvoice.status);
  const [columnArray, setColumnArray] = useState([
    'no',
    'service',
    'amount',
    'discount',
    'net Amount',
  ]);
  const [serviceListArray, setServiceListArray] = useState([]);
  const [serviceListSystemUrl, setServiceListSystemUrl] = useState('');
  const [totalNetAmount, setTotalNetAmount] = useState(0);
  const [totalGrossAmount, setTotalGrossAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [comment, setComment] = useState('');
  const [paymentViaRadioValue, setPaymentViaRadioValue] = useState('');
  const [paymentViaValuset, setPaymentViaValuset] = useState([]);
  const [paymentViaValusetSysytem, setPaymentViaValusetSystem] = useState('');
  const [state, setState] = React.useState({
    no: true,
    service: true,
    hsnCode: false,
    amount: true,
    cgst: false,
    sgst: false,
    discount: true,
    netAmount: true,
  });
  useEffect(() => {
    setStatus(details.billingInvoice.status);
  }, [details]);
  useEffect(() => {
    setBilledItems(props.filteredArray);
  }, [props.filteredArray]);
  useEffect(() => {
    setTotalDiscountAmount(props.totalDiscount);
  }, [props.totalDiscount]);
  useEffect(() => {
    setTotalGrossAmount(props.totalGrossAmount);
  }, [props.totalGrossAmount]);
  useEffect(() => {
    setTotalNetAmount(props.totaNetAmount);
  }, [props.totalNetAmount]);
  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);
  useEffect(() => {
    setPaymentViaRadioValue(props.paymentVia);
  }, [props.paymentVia]);

  useEffect(() => {
    callFetchNewServiceValueSet();
    callFetchPayentViaValueSet();
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
      props.handleServiceURL(
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
      props.handlePaymentURL(payload.system);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };

  const handleTotalNetAmount = value => {
    setTotalNetAmount(value);
  };
  const handleTotalGrossAmount = value => {
    setTotalGrossAmount(value);
  };
  const handleTotalDiscountAmount = value => {
    setTotalDiscountAmount(value);
  };
  const handleFilteredArrayOfBilledItems = value => {};
  const handleChangePaymentViaType = event => {
    setPaymentViaRadioValue(event.target.value);
    const obj =
      paymentViaValuset &&
      paymentViaValuset.find(item => item.code === event.target.value);
    props.handlePaymentViaObj(obj);
  };

  const handleSaveComment = e => {
    setComment(e.target.value);
    props.handlePrintComment(e.target.value);
    // debugger;
  };
  // console.log("totalNetAmount", totalNetAmount)
  return (
    <>
      <Grid container spacing={2} className={classes.topContainer}>
        <Grid item xs={4} className={classes.iconContainer}>
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
                {gstn}
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
            Invoice Number : <b>{invoiceNum}</b>
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
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 500,
                  color: '#373737',
                  marginBottom: '15px',
                }}
              >
                Bill To
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Patient Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    {patientData && patientData.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Patient Id
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    {patientData && patientData.id}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Address
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {patientData &&
                  patientData.address &&
                  patientData.address.line ? (
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 500,
                        color: '#444444',
                        opacity: 0.9,
                      }}
                    >
                      {patientData && patientData.address.line}
                    </Typography>
                  ) : (
                    ''
                  )}
                  {patientData &&
                  patientData.address &&
                  patientData.address.city ? (
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 500,
                        color: '#444444',
                        opacity: 0.9,
                      }}
                    >
                      {patientData && patientData.address.city}
                    </Typography>
                  ) : (
                    ''
                  )}
                  {patientData &&
                  patientData.address &&
                  patientData.address.district ? (
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 500,
                        color: '#444444',
                        opacity: 0.9,
                      }}
                    >
                      {patientData && patientData.address.district}
                    </Typography>
                  ) : (
                    ''
                  )}
                  {patientData &&
                  patientData.address &&
                  patientData.address.state ? (
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 500,
                        color: '#444444',
                        opacity: 0.9,
                      }}
                    >
                      {patientData && patientData.address.state}
                    </Typography>
                  ) : (
                    ''
                  )}
                  {patientData &&
                  patientData.address &&
                  patientData.address.postalCode ? (
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 500,
                        color: '#444444',
                        opacity: 0.9,
                      }}
                    >
                      {patientData && patientData.address.postalCode}
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
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Mobile No.
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    +91 {patientData && patientData.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container className={classes.prescribedBy}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 500,
                  color: '#373737',
                  marginBottom: '15px',
                }}
              >
                Prescribing Physicians
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Physician Name -
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    {practitionerDetails && practitionerDetails.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    MCI Number -
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    {practitionerDetails && practitionerDetails.mciNum}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="h4" style={{ fontWeight: 500, color: "#444444", opacity: 0.9 }}>
                                        Mobile Number -
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h4" style={{ fontWeight: 500, color: "#444444", opacity: 0.9 }}>
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
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.tableContainer}>
        {/* <Grid item container xs={12}>
                    {openColumnOption ? <Grid item xs={11}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox size="small" checked={hsnCode} onChange={handleChangeCheck} name="hsnCode" />}
                                    label="HSN Code"
                                    className={classes.checkBoxStyle}
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" checked={cgst} onChange={handleChangeCheck} name="cgst" />}
                                    label="CGST"
                                    className={classes.checkBoxStyle}
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" checked={sgst} onChange={handleChangeCheck} name="sgst" />}
                                    label="SGST"
                                    className={classes.checkBoxStyle}
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" checked={discount} onChange={handleChangeCheck} name="discount" />}
                                    label="Discount"
                                    className={classes.checkBoxStyle}
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid> : ""}
                    <Grid item xs={openColumnOption ? 1 : 12} className={classes.columnSelector}>
                        <ViewColumnIcon fontSize="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                    </Grid>
                </Grid> */}
        <Grid item xs={12} className={classes.tableWrapper}>
          <Grid container className={classes.tableBorder}>
            <Grid item xs={12}>
              <ReportTableEach
                column={columnArray}
                arrayOfBilledItems={billedItems && billedItems}
                serviceListArray={serviceListArray && serviceListArray}
                handleTotalAmount={handleTotalNetAmount}
                handleTotalBilledAmount={handleTotalGrossAmount}
                handleTotalDiscountAmount={handleTotalDiscountAmount}
                handleFilteredArrayOfBilledItems={
                  handleFilteredArrayOfBilledItems
                }
                status={status}
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
                    &#8377; {totalNetAmount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.toByContainer}>
        <Grid item xs={6}>
          <Grid container className={classes.billTo}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 500,
                  color: '#373737',
                  height: '40px',
                }}
              >
                {status === 'Issued' ? 'Comment' : 'Add Comment'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ fontWeight: 500, color: '#6a6a6a' }}
              >
                <TextField
                  className={classes.textField}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  disabled={true}
                  defaultValue={comment}
                  size="small"
                  onBlur={e => {
                    handleSaveComment(e);
                  }}
                  InputProps={{
                    placeholder: 'Type Here',
                    className: classes.input2,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                />
              </Typography>
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
                  height: '40px',
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
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Billed Amount
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    {totalGrossAmount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.paymentInfoLayout}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Discount
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    {totalDiscountAmount}
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
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    <b>Total Payable Amount</b>
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    <b>&#8377; {totalNetAmount}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.paymentInfoLayout}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#444444', opacity: 0.9 }}
                  >
                    Amount paid Via
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
                              disabled={true}
                              control={
                                <Radio
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
                                    opacity: 0.9,
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
    </>
  );
}
const mapStateToProps = state => state;
export function mapDispatchToProps(dispatch) {
  return {
    fetchNewServiceValueSet: () => dispatch(fetchNewServiceValueSet()),
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
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
)(Report);
