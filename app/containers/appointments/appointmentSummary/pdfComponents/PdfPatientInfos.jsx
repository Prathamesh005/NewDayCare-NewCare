import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 5,
    marginTop: 10,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 10,
    marginHorizontal: 22,
  },
  leftContainer: {
    width: '33%',
    marginRight: 5,
  },
  rightContainer: {
    width: '33%',
    marginLeft: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionHead: {
    width: '100%',
    textAlign: 'left',
    fontSize: 9,
    fontWeight: 700,
    // color: "#494949",
    borderBottom: '1 solid #eaeaea',
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
    width: '45%',
    textAlign: 'left',
    paddingLeft: 6,
    //color: "#494949",
    fontSize: 9,
    fontWeight: 800,
    // opacity: 0.9
  },
  values: {
    width: '55%',
    textAlign: 'left',
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
});

function PdfPatientInfos(props) {
  const patientDetails = props.propsData;
  const patientName =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[0]
      : '';
  const patientAge =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[3]
      : '';
  const patientGender =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[1] === 'Male'
        ? 'M'
        : patientDetails.patient.display.split('/')[1] === 'Female'
        ? 'F'
        : ''
      : '';
  const patientPhoneNo =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[2]
      : '';
  const patientReferredBy =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.referredByName
      : 'N/a';
  const patientReferredByContactNo =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.referredByContactNumber
      : '';
  const encounterDate =
    props.appointmentSummaryDate && props.appointmentSummaryDate;
  return (
    <View style={styles.titleContainer} wrap={false}>
      {/* <View style={styles.rowHead} >
                <Text style={styles.descriptionHead}>Patient Information</Text>
            </View> */}
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <View style={styles.row}>
            <Text style={styles.description}>Patient Name: </Text>
            <Text style={styles.values}>
              {`${patientName} (${patientAge}/${patientGender})`}
            </Text>
          </View>
          {patientReferredBy && (
            <View style={styles.row}>
              <Text style={styles.description}>Referred By:</Text>
              <Text style={styles.values}>{patientReferredBy}</Text>
            </View>
          )}
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.description}>Contact No. </Text>
            <Text style={styles.values}>{patientPhoneNo}</Text>
          </View>
          {patientReferredBy && (
            <View style={styles.row}>
              <Text style={styles.description} />
              <Text style={styles.values} />
            </View>
          )}
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.description}>Consult Date </Text>
            <Text style={styles.values}>
              {encounterDate &&
                moment
                  .utc(encounterDate)
                  .local()
                  .format('DD MMM YYYY')}
            </Text>
          </View>
          {patientReferredBy && (
            <View style={styles.row}>
              <Text style={styles.description} />
              <Text style={styles.values} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default PdfPatientInfos;
