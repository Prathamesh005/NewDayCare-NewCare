import { Avatar, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { pdf } from '@react-pdf/renderer';
// import { PDFLinkWrapper } from '../../../components';
// import PdfBillReport from './listingComponents/PdfBillReport';
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchAppointmentReportsDateWise,
  useReportSlice,
} from '../../../../apis/reportsApis/reportSlice';
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
import PdfAppointmentList from './PdfAppointmentList';

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
function AppoinmentReport(props) {
  useReportSlice();
  const theme = useTheme();
  const classes = useStyles();
  let history = useHistory();
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [totalAppointmentData, setTotalAppointmentData] = useState([]);
  const [tableContents, setTableContents] = useState([]);
  const [totalSummaryData, setTotalSummaryData] = useState([
    {
      totalAppointments: 0,
      totalPatients: 0,
      newPatients: 0,
      followUpPatients: 0,
    },
  ]);
  const [payloadData, setPayloadData] = useState();
  const [loader, setLoader] = useState(false);
  const [openPrintWindow, setOpenPrintWindow] = useState(false);
  const [cardNames, setCardNames] = useState([
    { card: 'Total Appointments', amount: 658 },
    { card: 'Total Patients', amount: 1267721 },
    { card: 'New Patients', amount: 1009550 },
    { card: 'Follow up Patients', amount: 133261 },
  ]);

  const summaryContent = [];
  const headCellSummary = [
    {
      id: 'totalAppointments',
      label: 'Total Appointments',
    },
    {
      id: 'totalPatients',
      label: 'Total Patients',
    },
    {
      id: 'newPatients',
      label: 'New Patients',
    },
    {
      id: 'followUpPatients',
      label: 'Follow up Patients',
    },
  ];

  const tableHeaders = [
    { colName: 'Date', colWidth: '15%' },
    { colName: 'Name Of Patient', colWidth: '20%' },
    { colName: 'Age', colWidth: '10%' },
    { colName: 'Gender', colWidth: '15%' },
    { colName: 'Patient Type', colWidth: '20%' },
    { colName: 'Cancer Type', colWidth: '20%' },
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
      id: 'typeOfPatient',
      label: 'Patient Type',
    },
    {
      id: 'typeOfCancer',
      label: 'Cancer Type',
    },
  ];

  const handleSelectedDate = (fromDate, toDate) => {
    setSelectedFromDate(fromDate);
    setSelectedToDate(toDate);
  };
  useEffect(() => {
    callAppointmentReport();
  }, [selectedFromDate, selectedToDate]);

  const callAppointmentReport = async () => {
    const dates = { toDate: selectedToDate, fromDate: selectedFromDate };
    if (selectedToDate && selectedFromDate) {
      setLoader(true);
      const { payload } = await props.fetchAppointmentReportsDateWise(dates);
      setLoader(false);
      if (payload.data) {
        setPayloadData(payload.data);
      } else {
        console.log('payloadError', payload.message);
      }
    }
  };
  useEffect(() => {
    // debugger
    setTotalAppointmentData(
      payloadData && payloadData.data && payloadData.data.appointmentList,
    );
  }, [payloadData]);

  useEffect(() => {
    setTotalSummaryData(
      payloadData &&
        payloadData.data && [
          {
            totalAppointments: payloadData.data.totalAppointment,
            totalPatients: payloadData.data.totalPatient,
            newPatients: payloadData.data.newPatient,
            followUpPatients: payloadData.data.followupPatient,
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
            card: 'Total Patients',
            amount: payloadData.data.totalPatient || 0,
          },
          {
            card: 'New Patients',
            amount: payloadData.data.newPatient || 0,
          },
          {
            card: 'Follow up Patients',
            amount: payloadData.data.followupPatient || 0,
          },
        ],
    );
  }, [payloadData]);

  useEffect(() => {
    if (totalAppointmentData) {
      const totalAppointment = [];
      totalAppointmentData.map(item => {
        // debugger;
        totalAppointment.push({
          date:
            item.appointment_start && item.appointment_start.raw
              ? moment.utc(item.appointment_start.raw).format(DATE_FORMAT)
              : '',
          patientName: item.patient_name && item.patient_name.raw,
          age: item.age && item.age.raw,
          gender: item.gender && item.gender.raw,
          typeOfPatient: item.patient_type && item.patient_type.raw,
          typeOfCancer: item.cancer_type && item.cancer_type.raw,
        });
      });
      setTableContents(totalAppointment);
    }
  }, [totalAppointmentData]);

  const downloadPdf = async () => {
    const blob = await pdf(
      <PdfAppointmentList
        tableHeaders={headCell}
        tableContents={tableContents}
        summaryContent={totalSummaryData}
        headCellSummary={headCellSummary}
        date={`${moment(selectedFromDate).format('DD MMM YYYY')} - ${moment(
          selectedToDate,
        ).format('DD MMM YYYY')}`}
      />,
    ).toBlob();
    saveAs(blob, 'AppointmentList');
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
      id: 'typeOfPatient',
      label: 'Patient Type',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value}</span>;
      },
    },
    {
      id: 'typeOfCancer',
      label: 'Cancer Type',
      // width: 100,
      render: ({ value, row }) => {
        return <span>{value || '-'}</span>;
      },
    },
  ];
  return (
    <>
      <div className="">
        <Grid container>
          <Grid item xs sm={4} md={5} style={{ marginBottom: 10 }}>
            <PageTitleText>Appointment Report</PageTitleText>
          </Grid>
          <Grid item xs sm={8} md={7}>
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
            <PdfAppointmentList
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
    fetchAppointmentReportsDateWise: payload =>
      dispatch(fetchAppointmentReportsDateWise(payload)),
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
)(AppoinmentReport);
