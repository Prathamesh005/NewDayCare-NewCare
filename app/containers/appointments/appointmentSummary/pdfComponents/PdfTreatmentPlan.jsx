import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
    marginBottom: 4,
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
    height: 15,
    marginTop: 1,
    fontStyle: 'bold',
    paddingLeft: 17,
    paddingRight: 17,
    fontSize: 10,
  },
  description: {
    textAlign: 'left',
    paddingLeft: 6,
    //color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '65%',
    textAlign: 'left',
    //color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  rowNew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    fontStyle: 'bold',
    paddingLeft: 17,
    paddingRight: 17,
    fontSize: 10,
  },
  descriptionNew: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 6,
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  valuesNew: {
    width: '65%',
    textAlign: 'left',
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
});

function PdfTreatmentPlan(props) {
  const arrayOfTreatment = [];
  const protocolData =
    props.treatmentProtocolData &&
    props.treatmentProtocolData.regimenProtocolRequests &&
    props.treatmentProtocolData.regimenProtocolRequests.length > 0 &&
    props.treatmentProtocolData.regimenProtocolRequests[0] &&
    props.treatmentProtocolData.regimenProtocolRequests[0].regimen;

  props &&
    props.TreatmentData &&
    props.TreatmentData.treatmentPlans &&
    props.TreatmentData.treatmentPlans.map((item, index) => {
      // if (item.display.split('/')[1] == 'Chemotherapy' && protocolData) {
      //     arrayOfTreatment.push(
      //         `${index + 1}. ${item.display.split('/')[1]} - ${protocolData}`,
      //     );
      // } else {
      arrayOfTreatment.push(` ${index + 1}. ${item.display.split('/')[1]}`);
      // }
    });
  const treatmentIntent =
    props.TreatmentData &&
    props.TreatmentData.treatmentIntent &&
    props.TreatmentData.treatmentIntent.display;
  return (
    <View style={styles.titleContainer} wrap={false}>
      <View style={styles.rowHead}>
        <Text style={styles.descriptionHead}>Treatment Plan</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <View style={styles.row}>
            <Text style={styles.description}>
              {arrayOfTreatment &&
                arrayOfTreatment.length > 0 &&
                arrayOfTreatment.join(', ')}
            </Text>
          </View>
          {protocolData && (
            <View style={styles.rowNew}>
              <Text style={styles.descriptionNew}>Treatment Protocol</Text>
              <Text style={styles.valuesNew}>{protocolData}</Text>
            </View>
          )}
          {treatmentIntent && (
            <View style={styles.rowNew}>
              <Text style={styles.descriptionNew}>Treatment Intent</Text>
              <Text style={styles.valuesNew}>{treatmentIntent}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default PdfTreatmentPlan;
