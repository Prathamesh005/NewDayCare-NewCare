import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
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

function PdfPrevTest(props) {
  const prevResultArray =
    props && props.prevTestResult
      ? props.prevTestResult.length != 0 &&
        props.prevTestResult.length !== null &&
        props.prevTestResult.length !== undefined
        ? props.prevTestResult.map((item, index) => {
            return {
              nameOfTest:
                item && item.code && item.code.display ? item.code.display : '',
              interpretation: item && item.conclusion ? item.conclusion : '',
              effectiveDateTime:
                item && item.effectiveDateTime ? item.effectiveDateTime : '',
            };
          })
        : ''
      : '';
  const arrayComplete = [...prevResultArray];
  return (
    <View style={styles.titleContainer} wrap={false}>
      <View style={styles.rowHead}>
        <Text style={styles.descriptionHead}>Previous Test Interpretation</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {arrayComplete &&
            arrayComplete.length != 0 &&
            arrayComplete !== null &&
            arrayComplete !== undefined &&
            arrayComplete.map((item, index) => (
              <View style={styles.row}>
                <Text style={styles.description}>
                  {item.nameOfTest}
                  {item.interpretation && ` - ${item.interpretation}`}
                  {moment(item.effectiveDateTime).format('YYYY') !== '0001' &&
                    ` - ${moment(item.effectiveDateTime).format('DD-MM-YYYY')}`}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

export default PdfPrevTest;
