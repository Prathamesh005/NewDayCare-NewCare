import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontStyle: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  leftContainer: {
    width: '48%',
    border: '1 solid #eaeaea',
    paddingBottom:20,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  rightContainer: {
    width: '48%',
    paddingBottom:20,
    border: '1 solid #eaeaea',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  middleContainer: {
    width: '4%',
    paddingBottom:20,

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
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    fontSize: 10,
  },
  rowAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 5,
    fontStyle: 'bold',
    paddingLeft:10,
    paddingRight:10,
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
  },
  description: {
    width: '38%',
    textAlign: 'left',
    paddingLeft: 5,
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
    flexWrap:'wrap',

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
    paddingLeft: 13,
  },
});

const PatientPractitionerDetails = props => {
  // debugger;
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

        <View style={styles.row}>
          <Text style={styles.description}>Address</Text>
          {/* <View style={styles.colm}> */}
          <View style={styles.values}>
                  <Text style={styles.colmDescription}>{props.patientDetails?props.patientDetails.address :''}</Text>
                </View>
            {/* {addressArr.length > 0 &&
              addressArr.map((item, index) => (
                <View style={styles.values}>
                  <Text style={styles.colmDescription}>{item}</Text>
                </View>
              ))} */}
          {/* </View> */}
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

export default PatientPractitionerDetails;
