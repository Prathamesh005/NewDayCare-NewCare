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
    width: '50%',
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
    fontWeight: 'bold',
    color: '#494949',
    borderBottom: '1 solid #eaeaea',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
    fontStyle: 'bold',
    paddingLeft: 20,
    fontSize: 10,
  },
  description: {
    width: '100%',
    textAlign: 'center',
    paddingLeft: 6,
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '65%',
    textAlign: 'center',
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  image: {
    textAlign: 'center',
    paddingLeft: 6,
    height: 100,
    width: 150,
  },
});

function PdfSignature(props) {
  return (
    <View style={styles.titleContainer} wrap={false}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <View style={styles.row}>
            <Text style={styles.description} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            {props.signature && props.signature ? (
              <Image
                style={styles.image}
                src={
                  'data:' +
                  props.signatureContentType +
                  ';base64,' +
                  props.signature
                }
              />
            ) : (
              <Text style={styles.description} />
            )}
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>{props.userName || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>(Signature &amp; Stamp)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PdfSignature;
