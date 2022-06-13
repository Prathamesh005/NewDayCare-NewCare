import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
// import ReportTable from './ReportTable';
import AddIcon from '@material-ui/icons/Add';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import {
  View,
  Text,
  Page,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import ReportTitle from './pdfReportComponents/ReportTitle';
import ToByContainer from './pdfReportComponents/ToByContainer';
import TableContainer from './pdfReportComponents/TableContainer';
import FinalPaymentContainer from './pdfReportComponents/FinalPaymentContainer';
import moment from 'moment';

function ReportPdfDesign(props) {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      paddingTop: 20,
      paddingBottom: 150,
      paddingHorizontal: 10,
      // marginHorizontal: 15,
    },
    headerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 10,
    },
    headerText: {
      color: '#ED3295',
    },
    line: {
      height: 2,
      background:
        'linear-gradient(to bottom, transparent 2, #ED3295 2, #ED3295 3, transparent 3)',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 15,
      marginTop: 5,
      fontStyle: 'bold',
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 10,
    },
    description: {
      width: '20%',
      textAlign: 'left',
      paddingLeft: 8,
    },
    values: {
      width: '80%',
      textAlign: 'left',
      paddingLeft: 8,
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    invoiceDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 15,
      fontStyle: 'bold',
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 10,
      backgroundColor: '#F7F6F4',
      paddingTop: 15,
      paddingBottom: 15,
      borderBottom: '1 solid #eaeaea',
    },
    leftContainer: {
      width: '50%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'left',
    },
    middleContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
    },
    rightContainer: {
      width: '50%',
      alignItems: 'right',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    invoiceNum: {
      textAlign: 'left',
      color: '#494949',
      fontSize: 9,
      flexBasis: '100%',
    },
    bottomText: {
      textAlign: 'center',
      color: '#494949',
      fontSize: 9,
      flexBasis: '100%',
    },
    invoiceDate: {
      textAlign: 'right',
      color: '#494949',
      fontSize: 9,
      flexBasis: '100%',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 50,
      left: 0,
      right: 0,
      flexDirection: 'column',
      alignItems: 'center',
      fontStyle: 'bold',
      textAlign: 'center',
      // backgroundColor: "#F7F6F4",
      // borderBottom: "1 solid #eaeaea",
    },
    bottomFooter: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#F7F6F4',
      borderBottom: '1 solid #eaeaea',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
    },
  });
  const {
    columnArray,
    filteredArray,
    orgLogo,
    orgName,
    locName,
    gstn,
    invoiceNum,
    invoiceDate,
    patientDetails,
    practitionerDetails,
    totalNetAmount,
    totalGrossAmount,
    totalDiscount,
    comment,
    paymentVia,
  } = props;

  // console.log('columns', props.columnArray);
  // console.log('filteredBill', props.filteredArray);
  // console.log(props);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <ReportTitle
            logo={orgLogo}
            loc={`${orgName}, ${locName}`}
            gstNo={gstn}
          />
          <View style={styles.invoiceDetails}>
            <View style={styles.leftContainer}>
              <Text style={styles.invoiceNum}>
                Invoice Number: {invoiceNum}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.invoiceDate}>
                Invoice Date : {invoiceDate}
              </Text>
            </View>
          </View>
          <ToByContainer
            patientDetails={patientDetails}
            practitionerDetails={practitionerDetails}
          />
          <TableContainer
            columnArray={columnArray}
            filteredArray={filteredArray}
            totalNetAmount={totalNetAmount}
          />
          <FinalPaymentContainer
            totalNetAmount={totalNetAmount}
            totalAmount={totalGrossAmount}
            totalDiscount={totalDiscount}
            comment={comment}
            paymentVia={paymentVia}
          />
          <View
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => (
              <>
                <View style={styles.middleContainer}>
                  <Text style={styles.bottomText}>
                    This is a computer-generated document. No signature is
                    required
                  </Text>
                </View>
                <View style={styles.bottomFooter}>
                  <View style={styles.leftContainer}>
                    <Text style={styles.invoiceNum}>Powered By nuQare</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={styles.invoiceDate}>
                      {moment().format('DD MMM YYYY')}
                    </Text>
                  </View>
                </View>
              </>
            )}
            fixed
          />
        </Page>
      </Document>
    </>
  );
}

export default ReportPdfDesign;
