import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
    paddingBottom: 15,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 10,
    marginHorizontal: 22,
  },
  leftContainer: {
    width: '100%',
    marginRight: 5,
  },
  rightContainer: {
    width: '50%',
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
    fontWeight: '700',
    // color: "#494949",
    borderBottom: '1 solid #eaeaea',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
  },
  description: {
    textAlign: 'left',
    paddingLeft: 6,
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '65%',
    textAlign: 'left',
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
});

function PdfExam(props) {
  const ecogScore =
    props &&
    props.ScoresDataResult &&
    props.ScoresDataResult &&
    props.ScoresDataResult.valueInteger
      ? props.ScoresDataResult.valueInteger
      : 'N/a';

  const genExam = [];

  if (
    props &&
    props.GenAndSysResult &&
    props.GenAndSysResult.generalExaminations &&
    props.GenAndSysResult.generalExaminations.length != 0
  ) {
    props.GenAndSysResult.generalExaminations.map(item => {
      if (
        item.valueCodeableConcept.code === 'icterus' ||
        item.valueCodeableConcept.code === 'cyanosis' ||
        item.valueCodeableConcept.code === 'pallor' ||
        item.valueCodeableConcept.code === 'oedema' ||
        item.valueCodeableConcept.code === 'clubbing' ||
        item.valueCodeableConcept.code === 'lymphadenopathy'
      ) {
        genExam.push({
          name: item.valueCodeableConcept.display
            ? item.valueCodeableConcept.display
            : 'N/a',
          value: item.description ? item.description : 'N/a',
        });
      }
    });
  }

  const genExamFiltered =
    genExam.length > 1
      ? genExam.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)
      : [];

  const sysExam =
    props && props.GenAndSysResult && props.GenAndSysResult.systemicExaminations
      ? props.GenAndSysResult.systemicExaminations.length > 0
        ? props.GenAndSysResult.systemicExaminations.map(item => {
            return {
              name: item && item.resourceName ? item.resourceName : 'N/a',
              value:
                item && item.valueString ? item && item.valueString : 'N/a',
            };
          })
        : []
      : [];

  const sysExamFiltered =
    sysExam.length > 1
      ? sysExam.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)
      : [];

  const palpation =
    props && props.GenAndSysResult && props.GenAndSysResult.palpation
      ? props.GenAndSysResult.palpation
      : null;
  const inspection =
    props && props.GenAndSysResult && props.GenAndSysResult.inspection
      ? props.GenAndSysResult.inspection
      : null;

  const vitalArray = [];
  if (props && props.vitalDataSuccess) {
    if (props.vitalDataSuccess.bloodPressureData) {
      vitalArray.push({
        name: 'Blood Pressure',
        value:
          props.vitalDataSuccess.bloodPressureData.valueCodeableConcept.text +
          ' ' +
          props.vitalDataSuccess.bloodPressureData.valueCodeableConcept.display,
      });
    }
    if (props.vitalDataSuccess.glucoseData) {
      vitalArray.push({
        name: 'RBS',
        value:
          props.vitalDataSuccess.glucoseData.value.value +
          ' ' +
          props.vitalDataSuccess.glucoseData.value.unit,
      });
    }
    if (props.vitalDataSuccess.heartRateData) {
      vitalArray.push({
        name: 'Heart Rate',
        value:
          props.vitalDataSuccess.heartRateData.value.value +
          ' ' +
          props.vitalDataSuccess.heartRateData.value.unit,
      });
    }
    if (props.vitalDataSuccess.oxygenSaturationData) {
      vitalArray.push({
        name: 'Oxygen Saturation',
        value:
          props.vitalDataSuccess.oxygenSaturationData.value.value +
          ' ' +
          props.vitalDataSuccess.oxygenSaturationData.value.unit,
      });
    }
    if (props.vitalDataSuccess.respirationData) {
      vitalArray.push({
        name: 'Respiration Rate',
        value:
          props.vitalDataSuccess.respirationData.value.value +
          ' ' +
          props.vitalDataSuccess.respirationData.value.unit,
      });
    }
    if (props.vitalDataSuccess.temperatureData) {
      vitalArray.push({
        name: 'Temperature',
        value:
          props.vitalDataSuccess.temperatureData.value.value +
          ' ' +
          props.vitalDataSuccess.temperatureData.value.unit,
      });
    }
    if (props.vitalDataSuccess.weightData) {
      vitalArray.push({
        name: 'Weight',
        value:
          props.vitalDataSuccess.weightData.value.value +
          ' ' +
          props.vitalDataSuccess.weightData.value.unit,
      });
    }
  }
  const viewGenExamArray =
    genExamFiltered &&
    genExamFiltered
      .map((item, index) => {
        return `${item.name} - ${item.value}`;
      })
      .join(', ');

  const viewSysExamArray =
    sysExamFiltered &&
    sysExamFiltered
      .map((item, index) => {
        return `${item.name} - ${item.value}`;
      })
      .join(', ');

  const valueNetArray = [
    viewGenExamArray,
    viewSysExamArray,
    palpation && `${palpation.resourceName}-${palpation.valueString}`,
    inspection && `${inspection.resourceName}-${inspection.valueString}`,
    ecogScore && `ECOG-${ecogScore}`,
  ];
  return (
    <View style={styles.titleContainer} wrap={false}>
      <View style={styles.rowHead}>
        <Text style={styles.descriptionHead}>
          General And Systemic Examination
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {valueNetArray.map(item => {
            if (item) {
              return (
                <View style={styles.row}>
                  <Text style={styles.description}>{item}</Text>
                </View>
              );
            }
          })}

          {vitalArray &&
            vitalArray.map((item, index) => {
              return (
                <View style={styles.row} key={index.toString()}>
                  <Text style={styles.description}>
                    {item.name}-{item.value}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
}

export default PdfExam;
