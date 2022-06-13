import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 90,
  },
  leftContainer: {
    width: '48%',
    height: 180,
    border: '1 solid #eaeaea',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  rightContainer: {
    width: '48%',
    height: 180,
    border: '1 solid #eaeaea',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  middleContainer: {
    width: '4%',
    height: 180,
  },
  logo: {
    height: 50,
    width: 140,
    marginRight: 'auto',
  },
  reportTitle: {
    textAlign: 'right',
    fontSize: 10,
    flexBasis: '100%',
  },
  reportTitleDate: {
    textAlign: 'right',
    color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
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
  rowAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
  },
  colm: {
    width: '65%',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
    fontSize: 9,
    marginTop: 5,
  },
  colmInside: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
    fontSize: 9,
    height: 15,
  },
  description: {
    width: '38%',
    textAlign: 'left',
    paddingLeft: 8,
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '62%',
    textAlign: 'left',
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  colmDescription: {
    width: '100%',
    textAlign: 'left',
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
    marginTop: 5,
    fontWeight: 500,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 10,
    borderBottom: '1 solid #eaeaea',
  },
  descriptionHead: {
    width: '100%',
    textAlign: 'left',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#494949',
    paddingLeft: 28,
  },
});

const ToByContainer = props => {
  let addressObj = (props.patientDetails && props.patientDetails.address) || {};
  let selectedAddress = {
    line: addressObj.line ? addressObj.line : '',
    city: addressObj.city ? addressObj.city : '',
    district: addressObj.district ? addressObj.district : '',
    state: addressObj.state
      ? addressObj.postalCode
        ? `${addressObj.state}-${addressObj.postalCode}`
        : addressObj.state
      : addressObj.postalCode
      ? addressObj.postalCode
      : '',
  };
  let addressArr = Object.values(selectedAddress).filter(Boolean);
  return (
    <View style={styles.titleContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.rowHead}>
          <Text style={styles.descriptionHead}>Bill To</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Patient Name: </Text>
          <Text style={styles.values}>
            {props.patientDetails && props.patientDetails.name}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Patient Id</Text>
          <Text style={styles.values}>
            {props.patientDetails && props.patientDetails.id}
          </Text>
        </View>

        <View style={styles.rowAddress}>
          <Text style={styles.description}>Address</Text>
          <View style={styles.colm}>
            {addressArr.length > 0 &&
              addressArr.map((item, index) => (
                <View style={styles.colmInside}>
                  <Text style={styles.colmDescription}>{item}</Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.description}>Mobile No.</Text>
          <Text style={styles.values}>
            {props.patientDetails && props.patientDetails.phone
              ? props.patientDetails.phone
              : ''}
          </Text>
        </View>
      </View>
      <View style={styles.middleContainer} />
      <View style={styles.rightContainer}>
        <View style={styles.rowHead}>
          <Text style={styles.descriptionHead}>Prescribed Physicians</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Physician Name :</Text>
          <Text style={styles.values}>{props.practitionerDetails.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>MCI Number :</Text>
          <Text style={styles.values}>{props.practitionerDetails.mciNum}</Text>
        </View>
        {/* <View style={styles.row}>
                <Text style={styles.description}>Mobile Number :</Text>
                <Text style={styles.values}>+91 9874563210</Text>
            </View> */}
      </View>
    </View>
  );
};

export default ToByContainer;
