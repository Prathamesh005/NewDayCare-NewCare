import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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
    height: 15,
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

function PdfAdvice(props) {
  const arrayOfAdvices =
    props && props.adviceAndPrescriptionData
      ? props.adviceAndPrescriptionData.map(item => item.code.display)
      : [];
  return (
    <View style={styles.titleContainer} wrap={false}>
      <View style={styles.rowHead}>
        <Text style={styles.descriptionHead}>Advice</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <View style={styles.row}>
            <Text style={styles.description}>
              {arrayOfAdvices &&
                arrayOfAdvices.length > 0 &&
                arrayOfAdvices.join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default PdfAdvice;
