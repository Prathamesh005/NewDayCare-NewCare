import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    fontStyle: 'bold',
    width: 'auto',
    paddingTop: 5,
    marginRight: 10,
  },
  label: {
    fontSize: 9,
    fontStyle: 'bold',
    marginRight: 4,
  },
  value: {
    color: '#494949',
    fontSize: 9,
  },
});

export function PdfValueLabel(props) {
  const { labelProps = {}, valueProps = {}, label, value } = props;
  return (
    <View style={styles.root}>
      {label && <Text style={styles.label}>{label || ''}</Text>}
      {value && <Text style={styles.value}>{value || ''}</Text>}
    </View>
  );
}
