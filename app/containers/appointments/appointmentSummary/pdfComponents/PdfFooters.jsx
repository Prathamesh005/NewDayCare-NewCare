import { StyleSheet, Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
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
    paddingLeft: 20,
    paddingRight: 20,
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
    //color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
  },
  bottomText: {
    textAlign: 'center',
    //color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
  },
  invoiceDate: {
    textAlign: 'right',
    //color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 50,
    left: 0,
    right: 0,
    width: 575,
    flexDirection: 'row',
    alignItems: 'center',
    fontStyle: 'bold',
    flexWrap: 'wrap',
    // backgroundColor: "#F7F6F4",
    // borderBottom: "1 solid #eaeaea",
  },
  bottomFooter: {
    // width: "100%",
    flexDirection: 'row',
    backgroundColor: '#F7F6F4',
    borderBottom: '1 solid #eaeaea',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
function PdfFooter(props) {
  const encounterDate =
    props.appointmentSummaryDate && props.appointmentSummaryDate;
  return (
    <View
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) => (
        <>
          <View style={[styles.bottomFooter, { width: 575 }]}>
            <View style={styles.leftContainer}>
              <Text style={styles.invoiceNum}>Powered By nuQare&trade; </Text>
            </View>
            <View style={styles.rightContainer}>
              {encounterDate && (
                <Text style={styles.invoiceDate}>
                  {moment
                    .utc(encounterDate)
                    .local()
                    .format('DD MMM YYYY')}
                </Text>
              )}
            </View>
          </View>
        </>
      )}
      fixed
    />
  );
}

export default PdfFooter;
