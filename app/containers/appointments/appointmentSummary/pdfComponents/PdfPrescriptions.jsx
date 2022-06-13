import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottom: '1 solid #eaeaea',
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#F4F4F4',
  },
  description: {
    width: '30%',
    fontSize: 10,
  },
  qty: {
    fontSize: 9,
    textAlign: 'left',
    marginLeft: 2,
  },
  headerContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
  },

  amount: {
    width: '10%',
  },
  value: {
    // width: `${(columnArray.length).toFixed()}%`,
    // width: "12%",
    //color: "#494949",
    textAlign: 'left',
    paddingLeft: 8,
    fontSize: 9,
  },
  newValue: {
    //color: "#494949",
    fontSize: 9,
    textAlign: 'left',
  },
  medicineValue: {
    paddingLeft: 8,
    flexDirection: 'column',
    alignItems: 'left',
    //color: "#494949",
    textAlign: 'left',
    fontSize: 9,
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomColor: borderColor,
    // borderBottomWidth: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontStyle: 'bold',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    // fontSize: 10,
    // paddingTop: 15,
    // paddingBottom: 15,
  },
  leftContainer: {
    // width: "50%",
    marginRight: 5,
    // border: "1 solid #eaeaea",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  total: {
    flexDirection: 'row',
    borderBottom: '1 solid #eaeaea',
    alignItems: 'center',
    textAlign: 'left',
    fontStyle: 'bold',
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#F4F4F4',
  },
  amountEmpty: {
    width: '75%',
  },
  amount: {
    width: '25%',
    fontSize: 9,
    textAlign: 'left',
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 10,
    marginHorizontal: 22,
    marginBottom: 10,
  },
  descriptionHead: {
    width: '100%',
    textAlign: 'left',
    fontSize: 9,
    fontWeight: '700',
    // color: "#494949",
    borderBottom: '1 solid #eaeaea',
  },
});
const PdfPrescription = props => {
  const durationData = [
    { key: 'D', value: 'days' },
    { key: 'Wk', value: 'weeks' },
    { key: 'Mo', value: 'months' },
    { key: 'A', value: 'annual' },
    { key: 'S', value: 'sec' },
    { key: 'Min', value: 'min' },
    { key: 'H', value: 'hour' },
  ];
  const convertUnit = valString => {
    const obj = durationData.find(item => item.key === valString);
    return obj.value;
  };
  const arrayOfPrescriptions =
    props && props.adviceAndPrescriptionData
      ? props.adviceAndPrescriptionData
        ? props.adviceAndPrescriptionData.map((item, index) => {
            return {
              srNo: (index + 1).toString(),
              medicineForm:
                item && item.medicationCodeableConcept.text
                  ? item.medicationCodeableConcept.text.split('|')[0]
                  : '',
              medicineName:
                item && item.medicationCodeableConcept.display
                  ? item.medicationCodeableConcept.display
                  : '',
              medicineComposititon:
                item && item.medicationCodeableConcept.text
                  ? item.medicationCodeableConcept.text.split('|')[1]
                  : '',
              medicineTiming:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].when &&
                    item.dosageInstruction[0].when.length != 0
                    ? item.dosageInstruction[0].when[0]
                    : ''
                  : '',
              medicineDose:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].code &&
                    item.dosageInstruction[0].code.display
                    ? item.dosageInstruction[0].code.display
                    : ''
                  : '',
              medicineFreq: '',
              medicineSpecialInstruction:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].text
                    ? item.dosageInstruction[0].text
                    : ''
                  : '',
              medicineDuration:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].duration
                    ? item.dosageInstruction[0].duration
                    : ''
                  : '',
              medicineDurationUnit:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].durationUnit
                    ? convertUnit(item.dosageInstruction[0].durationUnit)
                    : ''
                  : '',
            };
          })
        : []
      : [];
  const columnArray = [
    'Rx',
    'Form',
    'Drug Name',
    'Freq',
    'Instruction',
    'Duration',
    'Notes',
  ];
  return (
    <>
      <View style={styles.titleContainer} wrap={false}>
        <View style={styles.rowHead}>
          <Text style={styles.descriptionHead}>Prescription</Text>
        </View>
        {arrayOfPrescriptions && arrayOfPrescriptions.length > 0 && (
          <View style={styles.leftContainer}>
            <View style={styles.container}>
              <Text style={[styles.qty, { width: '5%' }]}>
                {columnArray[0].charAt(0).toUpperCase() +
                  columnArray[0].slice(1)}
              </Text>
              <Text style={[styles.qty, { width: '8%' }]}>
                {columnArray[1].charAt(0).toUpperCase() +
                  columnArray[1].slice(1)}
              </Text>
              <Text style={[styles.qty, { width: '25%' }]}>
                {columnArray[2].charAt(0).toUpperCase() +
                  columnArray[2].slice(1)}
              </Text>
              <Text style={[styles.qty, { width: '15%' }]}>
                {columnArray[3].charAt(0).toUpperCase() +
                  columnArray[3].slice(1)}
              </Text>
              <Text style={[styles.qty, { width: '15%' }]}>
                {columnArray[4].charAt(0).toUpperCase() +
                  columnArray[4].slice(1)}
              </Text>
              <Text style={[styles.qty, { width: '12%' }]}>
                {columnArray[5].charAt(0).toUpperCase() +
                  columnArray[5].slice(1)}
              </Text>
              <Text style={[styles.qty, { width: '20%' }]}>
                {columnArray[6].charAt(0).toUpperCase() +
                  columnArray[6].slice(1)}
              </Text>
            </View>
            {arrayOfPrescriptions.map((item, index) => {
              return (
                <View style={styles.row}>
                  <Text style={[styles.value, { width: '5%' }]}>
                    {item.srNo}
                  </Text>
                  <Text style={[styles.value, { width: '8%' }]}>
                    {item.medicineForm}
                  </Text>
                  {/* <Text style={[styles.value, { width: "25%" }]} >{item.medicineName}</Text> */}
                  <View style={[styles.medicineValue, { width: '25%' }]}>
                    <Text style={[styles.newValue, { width: '100%' }]}>
                      {item.medicineName}
                    </Text>
                    <Text style={[styles.newValue, { width: '100%' }]}>
                      Composition: {item.medicineComposititon}
                    </Text>
                  </View>
                  <Text style={[styles.value, { width: '15%' }]}>
                    {item.medicineDose}
                  </Text>
                  <Text style={[styles.value, { width: '15%' }]}>
                    {item.medicineTiming}
                  </Text>
                  <Text style={[styles.value, { width: '12%' }]}>
                    {item.medicineDuration + ' ' + item.medicineDurationUnit}
                  </Text>
                  <Text style={[styles.value, { width: '20%' }]}>
                    {item.medicineSpecialInstruction}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
};

export default PdfPrescription;
