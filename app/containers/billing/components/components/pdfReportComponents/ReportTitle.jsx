import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    // backgroundColor: '#FEF4FA',
    borderBottom: '1 solid #eaeaea',
    opacity: 1,
    height: 60,
    alignItems: 'center',
    flexWrap: 'wrap',
    // paddingRight: 40,
    // paddingLeft: 20,
    // paddingHorizontal:20
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
  },
  logo: {
    height: 50,
    width: 'auto',
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
    color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
  },
});

const ReportTitle = props => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Image
            style={styles.logo}
            src={'data:image/*;base64,' + props.logo.split('|')[1]}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.reportTitle}>{`${props.loc}`}</Text>
          <Text style={styles.reportTitleDate}>
            {props.gstNo ? `GSTN ${props.gstNo}` : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReportTitle;
