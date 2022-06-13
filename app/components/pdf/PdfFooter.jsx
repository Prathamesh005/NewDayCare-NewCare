import React from 'react';
import {
  View,
  Text,
  Page,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import moment from 'moment';

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
function PdfFooter(props) {
  const { rightText, leftText, footerMessage, hideFooterMsg } = props;
  return (
    <View style={styles.pageNumber} fixed>
      {!hideFooterMsg && (
        <View style={styles.middleContainer}>
          <Text style={styles.bottomText}>
            {footerMessage ||
              'This is a computer-generated document. No signature is required'}
          </Text>
        </View>
      )}

      <View style={[styles.bottomFooter, { width: '100%' }]}>
        <View style={styles.leftContainer}>
          <Text style={styles.invoiceNum}>Powered By nuQare&trade;</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.invoiceDate}>{rightText}</Text>
        </View>
      </View>
    </View>
  );
}

export default PdfFooter;
