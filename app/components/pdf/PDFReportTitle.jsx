import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    borderBottom: '1 solid #eaeaea',
    opacity: 1,
    height: 60,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
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
          <Text style={styles.reportTitle}>{`${props.title || ''}`}</Text>
          <Text style={styles.reportTitleDate}>
            {props.subTitle ? `${props.subTitle}` : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReportTitle;
