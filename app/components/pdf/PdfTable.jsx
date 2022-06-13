import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import _ from 'lodash';
// import PropTypes from 'prop-types';

const PdfTable = props => {
  const {
    headCells = [],
    rows = [],
    hideSrNumber = false,
    tableTitle = '',
  } = props;

  const getTableCellWidth = () => {
    // NOTE : Due to sr number cell we are taking 95 as full width
    const value = headCells.length ? 95 / headCells.length : 20;
    return `${value}%`;
  };

  const getTableCellValue = (column, value, row, index) => {
    const getValue = value => {
      return _.isNumber(value) ? value : _.isEmpty(value) ? '' : value;
    };
    return column.format
      ? getValue(
          column.format({
            value,
            row,
            index,
          }),
        )
      : getValue(value);
  };

  // UI Styles
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
      width: '100%',
    },
    qty: {
      fontSize: 9,
      paddingLeft: 8,
    },

    row: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: '1 solid #eaeaea',
      borderLeft: '1 solid #eaeaea',
      borderRight: '1 solid #eaeaea',
      width: '100%',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontStyle: 'bold',
      width: '100%',
      marginTop: 20,
    },
    leftContainer: {
      width: '100%',
      marginRight: 5,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,
    },
    tableLabel: {
      fontSize: 10,
      paddingBottom: 10,
    },
    bodyValue: {
      color: '#494949',
      paddingLeft: 8,
      fontSize: 9,
    },
  });

  return (
    <View style={styles.titleContainer}>
      {tableTitle ? (
        <View>
          <Text style={styles.tableLabel}>{tableTitle}</Text>
        </View>
      ) : null}

      <View style={styles.leftContainer}>
        {/* head */}
        <View style={styles.container}>
          {!hideSrNumber && (
            <Text
              style={[
                styles.qty,
                {
                  width: '5%',
                  textAlign: 'left',
                },
              ]}
            >
              Sr.
            </Text>
          )}
          {/* HEAD */}
          {headCells.map((col, index) => {
            const { label, headStyle = {}, headAlign } = col;
            return (
              <Text
                key={index}
                style={[
                  styles.qty,
                  {
                    // width: '20%',
                    width: getTableCellWidth(),
                    textAlign: headAlign || 'left',
                    ...headStyle,
                  },
                ]}
              >
                {label || ''}
              </Text>
            );
          })}
        </View>

        {/*  BODY */}
        {rows.map((row, index) => {
          return (
            <View style={styles.row} key={index}>
              {!hideSrNumber && (
                <Text
                  style={[
                    styles.bodyValue,
                    {
                      width: '5%',
                      textAlign: 'left',
                    },
                  ]}
                >
                  {`${index + 1}`}
                </Text>
              )}

              {/* Row render */}
              {headCells.map((column, index) => {
                const value = _.get(row, column.id);
                const { render, bodyStyle = {}, align } = column;
                return (
                  <Fragment key={index}>
                    {/* NOTE : Only render pdf components here */}
                    {render ? (
                      render(value, row, index)
                    ) : value ? (
                      <Text
                        style={[
                          styles.bodyValue,
                          {
                            // width: '20%',
                            width: getTableCellWidth(),
                            textAlign: align || 'left',
                            ...bodyStyle,
                          },
                        ]}
                      >
                        {getTableCellValue(column, value, row, index)}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.bodyValue,
                          {
                            //  width: '20%'
                            width: getTableCellWidth(),
                            textAlign: align || 'left',
                            ...bodyStyle,
                          },
                        ]}
                      >
                        -
                      </Text>
                    )}
                  </Fragment>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

// PdfTable.propTypes = {
//   headCells: PropTypes.array,
//   rows: PropTypes.array,
//   hideSrNumber: PropTypes.bool,
//   tableLabel: PropTypes.string,
// };

export default PdfTable;
