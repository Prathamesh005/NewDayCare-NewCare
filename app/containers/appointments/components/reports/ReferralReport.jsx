import { Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pdf } from '@react-pdf/renderer';
// import { PDFLinkWrapper } from '../../../components';
// import PdfBillReport from './listingComponents/PdfBillReport';
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fetchReferralReportsDateWise } from '../../../../apis/reportsApis/reportSlice';
import {
  PageTitleText,
  PDFLinkWrapper,
  WhiteCloseIconButton,
  GrayButton,
} from '../../../../components';
import ReportWrapper from '../../../../components/report/ReportWrapper';
import pdfDownload from '../../../../images/pdf-svgrepo-com.svg';
import printIcon from '../../../../images/print.svg';
import { DATE_FORMAT } from '../../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
import PdfRererralList from './PdfRererralList';

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
function ReferralReport(props) {
  const classes = useStyles();
  let history = useHistory();
  const [payloadData, setPayloadData] = useState();
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [totalReferralData, setTotalReferralData] = useState([]);
  const [totalSummaryData, setTotalSummaryData] = useState([
    {
      totalAppointments: 0,
      totalReferralAppointment: 0,
    },
  ]);
  const [openPrintWindow, setOpenPrintWindow] = useState(false);
  const [tableContents, setTableContents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cardNames, setCardNames] = useState([
    { card: 'Total Appointments', amount: 0 },
    { card: 'Total Referral Appointments', amount: 0 },
  ]);

  const summaryContent = [];
  const headCellSummary = [
    {
      id: 'totalAppointments',
      label: 'Total Appointments',
    },
    {
      id: 'totalReferralAppointment',
      label: 'Total Referral Appointments',
    },
  ];

  const tableHeaders = [
    { colName: 'Date', colWidth: '20%' },
    { colName: 'Name Of Patient', colWidth: '20%' },
    { colName: 'Age', colWidth: '15%' },
    { colName: 'Gender', colWidth: '15%' },
    { colName: 'Referred By', colWidth: '30%' },
  ];
  const headCell = [
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'patientName',
      label: 'Name Of Patient',
    },
    {
      id: 'age',
      label: 'Age',
    },
    {
      id: 'gender',
      label: 'Gender',
    },
    {
      id: 'referredBy',
      label: 'Referred By',
    },
  ];

  const handleSelectedDate = (fromDate, toDate) => {
    setSelectedFromDate(fromDate);
    setSelectedToDate(toDate);
  };
  useEffect(() => {
    callReferralReport();
  }, [selectedFromDate, selectedToDate]);

  const callReferralReport = async () => {
    const dates = { toDate: selectedToDate, fromDate: selectedFromDate };
    if (selectedToDate && selectedFromDate) {
      setLoader(true);
      const { payload } = await props.fetchReferralReportsDateWise(dates);
      setLoader(false);
      if (payload.data) {
        setPayloadData(payload.data);
      } else {
        console.log('payloadError', payload.message);
      }
    }
  };

  useEffect(() => {
    setTotalReferralData(
      payloadData && payloadData.data && payloadData.data.referralList,
    );
  }, [payloadData]);

  useEffect(() => {
    setTotalSummaryData(
      payloadData &&
        payloadData.data && [
          {
            totalAppointments: payloadData.data.totalAppointment,
            totalReferralAppointment: payloadData.data.totalReferralAppointment,
          },
        ],
    );
    setCardNames(
      payloadData &&
        payloadData.data && [
          {
            card: 'Total Appointments',
            amount: payloadData.data.totalAppointment || 0,
          },
          {
            card: 'Total Referral Appointments',
            amount: payloadData.data.totalReferralAppointment || 0,
          },
        ],
    );
  }, [payloadData]);

  useEffect(() => {
    if (totalReferralData) {
      const totalReferrals = [];
      totalReferralData.map(item => {
        totalReferrals.push({
          date:
            item.appointment_start && item.appointment_start.raw
              ? moment.utc(item.appointment_start.raw).format(DATE_FORMAT)
              : '',
          patientName: item.patient_name && item.patient_name.raw,
          age: item.age && item.age.raw,
          gender: item.gender && item.gender.raw,
          referredBy: item.referredby_name && item.referredby_name.raw,
        });
      });

      setTableContents(totalReferrals);
    }
  }, [totalReferralData]);

  const downloadPdf = async () => {
    const blob = await pdf(
      <PdfRererralList
        tableHeaders={headCell}
        tableContents={tableContents}
        summaryContent={totalSummaryData}
        headCellSummary={headCellSummary}
        date={`${moment(selectedFromDate).format('DD MMM YYYY')} - ${moment(
          selectedToDate,
        ).format('DD MMM YYYY')}`}
      />,
    ).toBlob();
    saveAs(blob, 'ReferralList');
  };

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
      id: 'patientName',
      label: 'Name Of Patient',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'age',
      label: 'Age',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'gender',
      label: 'Gender',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'referredBy',
      label: 'Referred By',
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
          <Grid item xs sm={4} md={5} style={{ marginBottom: 10 }}>
            <PageTitleText>Referral Report</PageTitleText>
          </Grid>
          <Grid item xs sm={8} md={7}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs md={8} lg={2}>
                {/* <GrayButton children={`Excel Download`} className={classes.buttonIcon} /> */}
              </Grid>
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
                  onClick={() =>
                    history.push(`${ROUTES_CONSTANTS.ALL_APPOINTMENTS}`)
                  }
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
            <PdfRererralList
              tableHeaders={headCell}
              tableContents={tableContents}
              summaryContent={totalSummaryData}
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
    fetchReferralReportsDateWise: payload =>
      dispatch(fetchReferralReportsDateWise(payload)),
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
)(ReferralReport);
