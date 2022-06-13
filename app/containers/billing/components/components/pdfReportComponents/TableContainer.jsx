import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const TableContainer = ({ columnArray, filteredArray, totalNetAmount }) => {
  const borderColor = '#707070';
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderTop: '1 solid #eaeaea',
      borderBottom: '1 solid #eaeaea',
      borderLeft: '1 solid #eaeaea',
      borderRight: '1 solid #eaeaea',
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
      color: '#494949',
      textAlign: 'center',
      paddingLeft: 8,
      fontSize: 9,
    },
    row: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: '1 solid #eaeaea',
      borderLeft: '1 solid #eaeaea',
      borderRight: '1 solid #eaeaea',
      // borderBottomColor: borderColor,
      // borderBottomWidth: 1,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontStyle: 'bold',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      // fontSize: 10,
      // paddingTop: 15,
      // paddingBottom: 15,
      marginTop: 90,
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
      borderLeft: '1 solid #eaeaea',
      borderRight: '1 solid #eaeaea',
      alignItems: 'center',
      // textAlign: 'left',
      flexGrow: 1,
      padding: 10,
      // backgroundColor: "#F4F4F4"
    },
    amountEmpty: {
      textAlign: 'right',
      paddingRight: 40,
      fontSize: 9,
    },
  });
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.container}>
            <Text style={[styles.qty, { width: '10%' }]}>
              {columnArray[0].charAt(0).toUpperCase() + columnArray[0].slice(1)}
            </Text>
            <Text
              style={[
                styles.qty,
                { width: '30%', textAlign: 'left', paddingRight: 40 },
              ]}
            >
              {columnArray[1].charAt(0).toUpperCase() + columnArray[1].slice(1)}
            </Text>
            <Text
              style={[
                styles.qty,
                { width: '20%', textAlign: 'right', paddingRight: 40 },
              ]}
            >
              {columnArray[2].charAt(0).toUpperCase() + columnArray[2].slice(1)}
            </Text>
            <Text
              style={[
                styles.qty,
                { width: '20%', textAlign: 'right', paddingRight: 40 },
              ]}
            >
              {columnArray[3].charAt(0).toUpperCase() + columnArray[3].slice(1)}
            </Text>
            <Text
              style={[
                styles.qty,
                { width: '20%', textAlign: 'right', paddingRight: 40 },
              ]}
            >
              {columnArray[4].charAt(0).toUpperCase() + columnArray[4].slice(1)}
            </Text>
          </View>
          {filteredArray.map((item, index) => {
            return (
              <View style={styles.row}>
                <Text style={[styles.value, { width: '10%' }]}>
                  {index + 1}
                </Text>
                {item.hasOwnProperty('service') ? (
                  <Text
                    style={[styles.value, { width: '30%', textAlign: 'left' }]}
                  >
                    {item.service.display}
                  </Text>
                ) : (
                  <Text style={[styles.value, { width: '30%' }]}>-</Text>
                )}
                {item.hasOwnProperty('amount') ? (
                  <Text
                    style={[
                      styles.value,
                      { width: '20%', textAlign: 'right', paddingRight: 40 },
                    ]}
                  >
                    {item.amount}
                  </Text>
                ) : (
                  <Text style={[styles.value, { width: '20%' }]}>-</Text>
                )}
                {item.hasOwnProperty('discount') ? (
                  <Text
                    style={[
                      styles.value,
                      { width: '20%', textAlign: 'right', paddingRight: 40 },
                    ]}
                  >
                    {item.discount}
                  </Text>
                ) : (
                  <Text style={[styles.value, { width: '20%' }]}>-</Text>
                )}
                {item.hasOwnProperty('service') ? (
                  <Text
                    style={[
                      styles.value,
                      { width: '20%', textAlign: 'right', paddingRight: 40 },
                    ]}
                  >
                    {item.hasOwnProperty('discount')
                      ? parseFloat(item.amount) - parseFloat(item.discount)
                      : item.amount}
                  </Text>
                ) : (
                  <Text style={[styles.value, { width: '20%' }]}>-</Text>
                )}
              </View>
            );
          })}
          <View style={styles.total}>
            <Text style={[styles.amountEmpty, { width: '10%' }]} />
            <Text style={[styles.amountEmpty, { width: '30%' }]} />
            <Text style={[styles.amountEmpty, { width: '20%' }]} />
            <Text style={[styles.amountEmpty, { width: '20%' }]}>
              Total Amount
            </Text>
            <Text
              style={[styles.amountEmpty, { width: '20%', fontStyle: 'bold' }]}
            >{`INR ${totalNetAmount}`}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default TableContainer;
