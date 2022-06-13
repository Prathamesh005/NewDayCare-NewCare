import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 100,
  },
  leftContainer: {
    width: '50%',
    marginRight: 5,
    height: 170,
    // border: "1 solid #eaeaea",
    // borderTopLeftRadius: 3,
    // borderTopRightRadius: 3,
    // borderBottomRightRadius: 3,
    // borderBottomLeftRadius: 3
  },
  rightContainer: {
    width: '50%',
    marginLeft: 5,
    paddingHorizontal: 10,
    height: 170,
    // border: "1 solid #eaeaea",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  logo: {
    height: 50,
    width: 140,
    marginRight: 'auto',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 15,
    marginTop: 5,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
  },
  description: {
    width: '50%',
    textAlign: 'left',
    paddingLeft: 4,
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '50%',
    textAlign: 'left',
    color: '#494949',
    fontSize: 9,
    opacity: 0.9,
  },
  rowComment: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
    marginTop: 5,
    fontWeight: 500,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 10,
  },

  descriptionHead: {
    width: '50%',
    textAlign: 'left',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#494949',
    paddingLeft: 4,
  },
  comment: {
    color: '#494949',
    opacity: 0.9,
    fontSize: 9,
    textAlign: 'justify',
    margin: 12,
    marginTop: 50,
  },
  rowTotalPayable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
    marginTop: 5,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
    backgroundColor: '#F7F6F4',
  },
});

const FinalPaymentContainer = props => (
  <View style={styles.titleContainer} wrap={false}>
    <View style={styles.leftContainer}>
      {props.comment ? (
        <>
          <View>
            <Text style={styles.descriptionHead}>Note:</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.comment}>{props.comment}</Text>
          </View>
        </>
      ) : (
        <View />
      )}
    </View>
    <View style={styles.rightContainer}>
      <View style={styles.row}>
        <Text
          style={[
            styles.description,
            { marginBottom: 5, opacity: 1, fontWeight: 'bold' },
          ]}
        >
          Payment information
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Billed amount :</Text>
        <Text style={[styles.values, { textAlign: 'right', paddingRight: 40 }]}>
          {props.totalAmount}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Discount :</Text>
        <Text style={[styles.values, { textAlign: 'right', paddingRight: 40 }]}>
          {props.totalDiscount}
        </Text>
      </View>
      <View style={styles.rowTotalPayable}>
        <Text style={[styles.description]}>Total payable amount :</Text>
        <Text
          style={[
            styles.values,
            {
              fontWeight: 'bold',
              opacity: 1,
              textAlign: 'right',
              paddingRight: 40,
            },
          ]}
        >{`INR ${props.totalNetAmount}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Amount paid via</Text>
        <Text style={[styles.values, { textAlign: 'right', paddingRight: 40 }]}>
          {props.paymentVia}
        </Text>
      </View>
    </View>
  </View>
);

export default FinalPaymentContainer;
