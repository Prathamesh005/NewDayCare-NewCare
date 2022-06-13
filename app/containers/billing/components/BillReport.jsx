import { Avatar, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchInvoicesFromDate,
  fetchSummaryDataFromDate,
  useBillingSlice,
} from '../../../apis/billingApis/billingSlice';
import {
  PageTitleText,
  PDFLinkWrapper,
  WhiteCloseIconButton,
  GrayButton,
  MessageComponent,
} from '../../../components';
import ReportWrapper from '../../../components/report/ReportWrapper';
import pdfDownload from '../../../images/pdf-svgrepo-com.svg';
import printIcon from '../../../images/print.svg';
import { DATE_FORMAT } from '../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import PdfBillReport from './listingComponents/PdfBillReport';

const useStyles = makeStyles(theme => ({
  buttonIcon: {
    '& .MuiButton-startIcon': {
      marginLeft: '0px',
      marginRight: '0px',
    },
    border: '0.5px solid #cacaca',
    backgroundColor: `${theme.palette.backgroundColor.main}!important`,
  },
  small: {
    height: '25px',
    width: '25px',
  },
}));
function BillReport(props) {
  useBillingSlice();
  const theme = useTheme();
  const classes = useStyles();
  let history = useHistory();
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [totalInvoiceData, setTotalInvoiceData] = useState([]);
  const [totalSummaryData, setTotalSummaryData] = useState();
  const [openPrintWindow, setOpenPrintWindow] = useState(false);
  const [loader, setLoader] = useState(false);
  let cardNames = [
    { card: 'Total Transactions', amount: 0 },
    { card: 'Total Amount', amount: 0 },
    { card: 'Total Amount Paid', amount: 0 },
    { card: 'Amount Unpaid', amount: 0, noOfTransac: 0 },
  ];
  const headCellSummary = [
    {
      id: 'totalINVTransaction',
      label: 'Total Transactions',
    },
    {
      id: 'totalINVAmount',
      label: 'Total Amount',
    },
    {
      id: 'totalINVAmountPaid',
      label: 'Total Amount Paid',
    },
    {
      id: 'totalINVAmountUnPaid',
      label: 'Amount Unpaid',
    },
  ];

  const tableHeaders = [
    { colName: 'Date', colWidth: '15%' },
    { colName: 'Billing Number', colWidth: '25%' },
    { colName: 'Patient Name', colWidth: '20%' },
    { colName: 'Amount', colWidth: '15%' },
    { colName: 'Payment', colWidth: '25%' },
  ];
  const headCell = [
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'billNo',
      label: 'Bill No.',
    },
    {
      id: 'patientName',
      label: 'Patient Name',
    },
    {
      id: 'amount',
      label: 'Amount',
    },
    {
      id: 'payment',
      label: 'Payment',
    },
  ];
  const tableContents = [];

  const handleSelectedDate = (fromDate, toDate) => {
    setSelectedFromDate(fromDate);
    setSelectedToDate(toDate);
  };
  useEffect(() => {
    const dates = { toDate: selectedToDate, fromDate: selectedFromDate };
    setLoader(true);
    Promise.all([
      callFetchInvoicesFromDate(dates),
      callFetchSummaryDataFromDate(dates),
    ])
      .then(function(values) {
        setLoader(false);
      })
      .catch(error => console.log(error))
      .finally(() => setLoader(false));
  }, [selectedFromDate, selectedToDate]);

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
  const callFetchSummaryDataFromDate = async dates => {
    const { payload } = await props.fetchSummaryDataFromDate(dates);
    if (payload.data) {
      setTotalSummaryData(payload.data);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };

  totalInvoiceData &&
    totalInvoiceData.map(item => {
      tableContents.push({
        date: item.billingInvoice.date
          ? moment.utc(item.billingInvoice.date).format(DATE_FORMAT)
          : '',
        billNo: item.billingInvoice.invoiceNumber
          ? item.billingInvoice.invoiceNumber
          : '',
        patientName: item.billingInvoice.participants
          ? item.billingInvoice.participants.find(
              ele => ele.actor.resourceType === 'Patient',
            ) &&
            item.billingInvoice.participants
              .find(ele => ele.actor.resourceType === 'Patient')
              .actor.display.split('/')[0]
          : '',
        amount: `₹ ${item.billingInvoice.totalNet}`,
        payment: item.billingInvoice.status,
      });
    });
  const downloadPdf = async () => {
    const blob = await pdf(
      <PdfBillReport
        tableHeaders={headCell}
        tableContents={tableContents}
        summaryContent={[totalSummaryData]}
        headCellSummary={headCellSummary}
        date={`${moment(selectedFromDate).format('DD MMM YYYY')} - ${moment(
          selectedToDate,
        ).format('DD MMM YYYY')}`}
      />,
    ).toBlob();
    saveAs(blob, 'BillReport');
  };
  if (totalSummaryData) {
    cardNames = [
      {
        card: 'Total Transactions',
        amount: (totalSummaryData && totalSummaryData.totalINVTransaction) || 0,
      },
      {
        card: 'Total Amount',
        amount: (totalSummaryData && totalSummaryData.totalINVAmount) || 0,
      },
      {
        card: 'Total Amount Paid',
        amount: (totalSummaryData && totalSummaryData.totalINVAmountPaid) || 0,
      },
      {
        card: 'Amount Unpaid',
        amount:
          (totalSummaryData && totalSummaryData.totalINVAmountUnPaid) || 0,
        noOfTransac:
          (totalSummaryData && totalSummaryData.totalINVUnPaidTrans) || '',
      },
    ];
  }

  let rows = tableContents || [];
  const defaultHeadCells = [
    {
      id: 'date',
      label: 'Date',
      // width: 100,
      format: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'billNo',
      label: 'Billing Number',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'patientName',
      label: 'Patient Name',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'amount',
      label: 'Amount',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'payment',
      label: 'Payment',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
  ];
  return (
    <>
      <div className="">
        <Grid container>
          <Grid item xs sm={4} md={2} style={{ marginBottom: 10 }}>
            <PageTitleText> Billing Report </PageTitleText>
          </Grid>
          <Grid item xs sm={8} md={10}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs md={8} lg={2} />
              <Grid item xs md={1}>
                <GrayButton
                  // children={``}
                  onClick={() => downloadPdf()}
                  className={classes.buttonIcon}
                  startIcon={
                    <Avatar
                      src={pdfDownload}
                      variant="rounded"
                      className={classes.small}
                      alt="PDF Download"
                    />
                  }
                />
              </Grid>
              <Grid item xs md={1}>
                <GrayButton
                  // children={`Print`}
                  onClick={() => setOpenPrintWindow(true)}
                  className={classes.buttonIcon}
                  startIcon={
                    <Avatar
                      src={printIcon}
                      variant="rounded"
                      className={classes.small}
                      alt="Print"
                    />
                  }
                />
              </Grid>
              <Grid item xs sm={1} style={{ textAlign: 'right' }}>
                <WhiteCloseIconButton
                  onClick={() => history.push(`${ROUTES_CONSTANTS.BILLING}`)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ border: '1px solid #cacaca' }}>
            <ReportWrapper
              cardNames={cardNames}
              selectedDate={handleSelectedDate}
              loader={loader}
              rows={rows}
              defaultHeadCells={defaultHeadCells}
            />
          </Grid>
        </Grid>
      </div>

      {openPrintWindow && (
        <PDFLinkWrapper
          onClose={() => {
            setOpenPrintWindow(false);
          }}
          document={
            <PdfBillReport
              tableHeaders={headCell}
              tableContents={tableContents}
              summaryContent={[totalSummaryData]}
              headCellSummary={headCellSummary}
              date={`${moment(selectedFromDate).format(
                'DD MMM YYYY',
              )} - ${moment(selectedToDate).format('DD MMM YYYY')}`}
            />
          }
        />
      )}
    </>
  );
}
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoicesFromDate: payload => dispatch(fetchInvoicesFromDate(payload)),
    fetchSummaryDataFromDate: payload =>
      dispatch(fetchSummaryDataFromDate(payload)),
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
)(BillReport);
