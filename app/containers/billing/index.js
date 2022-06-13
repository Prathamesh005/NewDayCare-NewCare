import { Chip, Grid, Paper, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchInvoicesFromDate,
  fetchListOfInvoicesFromSearch,
  useBillingSlice,
} from '../../apis/billingApis/billingSlice';
import {
  PageTitleText,
  PinkAddCircleButton,
  ViewTable,
  MessageComponent,
} from '../../components';
import NoRecord from '../../components/elements/NoRecordPage';
import { useDebouncing } from '../../hooks/useDebouncing';
import { EPISODE_DATE_FORMAT } from '../../utils/constants';
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import DateWithNextAndPrev from '../layouts/searchWrappers/DateWithNextAndPrev';
import EachReportDetails from './components/EachReportDetails';
import SkeletonBilling from './components/Skeleton';

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
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
  mainContainer: {
    // border: '2px solid #eaeaea',
    height: '78vh',
    backgroundColor: '#f0f0f0',
  },
  topContainer: {
    backgroundColor: theme.palette.backgroundColor.main,
    padding: '0.7rem 0rem',
  },
  dateSelect: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textFieldGrid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  generateBillIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'right',
    '& .MuiFab-root': {
      boxShadow: 'none',
    },
  },
  cursorInner: {
    color: '#888888',
    cursor: 'pointer',
    padding: '0.3rem',
  },

  tableBody: {
    tableLayout: 'fixed',
    width: '100%',
    borderCollapse: 'collapse',
    padding: '1rem',
    '& td': {
      borderBottom: '1px solid #F4F4F4',
      // textAlign: "left",
      padding: '0.7rem',
    },
    '& tr': {
      border: '1px solid #F4F4F4',
    },
  },

  tableGroup: {
    margin: '0.7rem',
    height: '80%',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: 5,
  },
}));
function Billing(props) {
  useBillingSlice();
  const theme = useTheme();
  const classes = useStyles();
  let history = useHistory();
  const { isLoading } = props;
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [openGenerateBillScreen, setOpenGenerateBillScreen] = useState(false);
  const [arrayOfInvoices, setArrayOfInvoices] = useState([]);
  const [rowDetails, setRowDetails] = useState(null);
  const [openEachReportDetails, setOpenEachReportDetails] = useState(false);
  const [totalInvoiceData, setTotalInvoiceData] = useState([]);
  const [invoiceFromSearch, setInvoiceFromSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  const handleInvoiceDateChange = e => {
    setSelectedDate(e.target.value);
  };
  const handleSubtractDate = () => {
    setSelectedDate(
      moment(selectedDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD'),
    );
  };
  const handleAddDate = () => {
    setSelectedDate(
      moment(selectedDate)
        .add(1, 'days')
        .format('YYYY-MM-DD'),
    );
  };
  const handleRowDetails = val => {
    setRowDetails(val);
    setOpenEachReportDetails(true);
  };
  useEffect(() => {
    const input = inputSearch;
    if (input) {
      callFetchListOfInvoicesFromSearch(input);
    } else {
      callFetchInvoicesFromDate();
    }
  }, [inputSearch]);
  const callFetchListOfInvoicesFromSearch = async input => {
    const { payload } = await props.fetchListOfInvoicesFromSearch({
      toDate: selectedDate,
      fromDate: selectedDate,
      input,
    });
    if (payload.data) {
      setTotalInvoiceData(payload.data && payload.data.billingInvoices);
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };
  const onChangeHandle = val => {
    setInputSearch(val);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(onChangeHandle);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  const handleSelection = newValue => {
    const resourceIdOfPatient = newValue.billingInvoice.resourceId;
  };

  const handleCloseEachReportDetails = () => {
    setOpenEachReportDetails(false);
  };
  useEffect(() => {
    callFetchInvoicesFromDate();
  }, [selectedDate]);

  const callFetchInvoicesFromDate = async () => {
    const { payload } = await props.fetchInvoicesFromDate({
      toDate: selectedDate,
      fromDate: selectedDate,
    });
    if (payload.data) {
      setTotalInvoiceData(payload.data && payload.data.billingInvoices);
    } else {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  let rows = totalInvoiceData || [];
  const defaultHeadCells = [
    {
      id: 'billingInvoice',
      label: 'Date',
      // width: 100,
      format: ({ value, row }) => {
        return (
          <span onClick={() => handleRowDetails(row)}>
            {value.date
              ? moment(value.date)
                  .utc()
                  .format(EPISODE_DATE_FORMAT)
              : '-'}
          </span>
        );
      },
    },
    {
      id: 'billingInvoice',
      label: 'Billing Number',
      // width: 100,
      render: ({ value, row }) => {
        return (
          <span onClick={() => handleRowDetails(row)}>
            {value.invoiceNumber}
          </span>
        );
      },
    },
    {
      id: 'billingInvoice',
      label: 'Patient Name',
      // width: 100,
      render: ({ value, row }) => {
        return (
          <span onClick={() => handleRowDetails(row)}>
            {value.participants[1]['actor']['display'].split('/')[0]}
          </span>
        );
      },
    },
    {
      id: 'billingInvoice',
      label: 'Services',
      // width: 100,
      render: ({ value, row }) => {
        const arr = [];
        value &&
          value.invoiceLineItem &&
          value.invoiceLineItem.length > 0 &&
          value.invoiceLineItem.forEach(ele =>
            arr.push(ele.chargeItemCodeableConcept.display),
          );
        return <span onClick={() => handleRowDetails(row)}>{arr.join()}</span>;
      },
    },
    {
      id: 'billingInvoice',
      label: 'Amount',
      // width: 100,
      render: ({ value, row }) => {
        return (
          <span onClick={() => handleRowDetails(row)}>{value.totalNet}</span>
        );
      },
    },
    {
      id: 'billingInvoice',
      label: 'Status',
      // width: 100,
      render: ({ value, row }) => {
        return (
          <Typography
            variant="h4"
            style={{ fontWeight: 500 }}
            onClick={() => handleRowDetails(row)}
          >
            <Chip
              size="small"
              label={value.status}
              style={
                value.status === 'Pending'
                  ? {
                      color: '#FF9900',
                      backgroundColor: 'rgb(255, 153, 0, 0.1)',
                    }
                  : value.status === 'Draft'
                  ? {
                      color: '#727272',
                      backgroundColor: 'rgb(114, 114, 114, 0.1)',
                    }
                  : {
                      color: '#00B9FF',
                      backgroundColor: 'rgb(0, 185, 255, 0.1)',
                    }
              }
            />
          </Typography>
        );
      },
    },
  ];

  return (
    <div className={classes.main}>
      <Grid container>
        <Grid item xs={12} sm={4} style={{ marginBottom: 10 }}>
          <PageTitleText>Billing</PageTitleText>
        </Grid>
        {!openEachReportDetails ? (
          <Grid item xs={12} className={classes.mainContainer}>
            <Paper variant="outlined" square className={classes.topContainer}>
              <Grid
                container
                spacing={3}
                style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
              >
                <Grid item xs={5} lg={3}>
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
                        onHandleChange(ev.target.value);
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
                <Grid item xs={4} lg={3} className={classes.dateSelect}>
                  <DateWithNextAndPrev
                    handleLeft={handleSubtractDate}
                    handleRight={handleAddDate}
                    value={selectedDate}
                    handleDateChange={event => handleInvoiceDateChange(event)}
                  />
                </Grid>
                <Grid item xs={3} lg={6} className={classes.generateBillIcon}>
                  <PinkAddCircleButton
                    title={'Generate Bill'}
                    size="small"
                    onClick={() =>
                      history.push(ROUTES_CONSTANTS.GENERATE_BILLING)
                    }
                    style={{
                      width: 150,
                      borderRadius: 20,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Grid item xs={12} className={classes.tableGroup}>
              {!isLoading ? (
                rows && rows.length > 0 ? (
                  <ViewTable
                    rows={rows}
                    headCells={defaultHeadCells}
                    headBackground={'#f0f0f0'}
                    pagination={false}
                  />
                ) : (
                  <NoRecord />
                )
              ) : (
                <SkeletonBilling count={8} />
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <EachReportDetails
              rowDetails={rowDetails}
              arrayOfInvoices={arrayOfInvoices}
              handleCloseEachReportDetails={handleCloseEachReportDetails}
              selectedDate={selectedDate}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
const mapStateToProps = state => state;
export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoicesFromDate: payload => dispatch(fetchInvoicesFromDate(payload)),
    fetchListOfInvoicesFromSearch: payload =>
      dispatch(fetchListOfInvoicesFromSearch(payload)),
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
)(Billing);
