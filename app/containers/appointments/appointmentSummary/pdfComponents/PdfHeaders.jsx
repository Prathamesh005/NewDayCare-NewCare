import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    // backgroundColor: '#FEF4FA',
    // borderBottom: "1 solid #eaeaea",
    position: 'absolute',
    top: 20,
    opacity: 1,
    height: 60,
    width: 575,
    marginBottom: 50,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    // height: 60,
  },
  leftContainer: {
    width: '50%',
  },
  rightContainer: {
    width: '50%',
    alignItems: 'right',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  logo: {
    height: 50,
    width: 140,
    marginRight: 'auto',
    objectFit: 'contain',
  },
  reportTitle: {
    textAlign: 'right',
    fontSize: 10,
    flexBasis: '100%',
  },
  reportTitleDate: {
    textAlign: 'right',
    //color: "#494949",
    fontSize: 9,
    flexBasis: '100%',
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

    borderBottom: '1 solid #eaeaea',
  },
  leftRibbonContainer: {
    width: '33.3%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'left',
  },
  middleRibbonContainer: {
    width: '33.3%',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
  },
  rightRibbonContainer: {
    width: '33.3%',
    alignItems: 'right',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  invoiceNum: {
    textAlign: 'left',
    //color: "#494949",
    fontSize: 9,
    flexBasis: '100%',
  },
  email: {
    textAlign: 'center',
    //color: "#494949",
    fontSize: 9,
    flexBasis: '100%',
    alignSelf: 'center',
  },
  invoiceDate: {
    textAlign: 'right',
    //color: "#494949",
    fontSize: 9,
    flexBasis: '100%',
    alignSelf: 'right',
  },
});
function PdfHeaders(props) {
  return (
    <View style={styles.titleContainer}>
      <View style={[styles.row, { width: 575 }]}>
        <View style={styles.leftContainer}>
          <Image
            style={styles.logo}
            src={
              'data:image/*;base64,' +
              props.propsData.organizationLogo.split('|')[1]
            }
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.reportTitle}>{`${
            props.propsData.userName
          }`}</Text>
          <Text style={styles.reportTitleDate}>
            {props.propsData.qualification
              ? `${props.propsData.qualification.join(', ')}`
              : ''}
          </Text>
          <Text style={styles.reportTitleDate}>
            {props.propsData.organization}
          </Text>
        </View>
      </View>
      <View style={[styles.invoiceDetails, { width: 575 }]}>
        <View style={styles.leftRibbonContainer}>
          <Text style={styles.invoiceNum}>
            Mob: +91 {props.propsData.mobileNumber}{' '}
          </Text>
        </View>
        <View style={styles.middleRibbonContainer}>
          <Text style={styles.email}>Email: {props.propsData.email}</Text>
        </View>
        <View style={styles.rightRibbonContainer}>
          <Text style={styles.invoiceDate}>
            Website: {props.propsData.website}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default PdfHeaders;
