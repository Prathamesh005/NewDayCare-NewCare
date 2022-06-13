import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@material-ui/core';
import { CloseIconButton } from '../button';
import WhiteAutoComplete from '../input/WhiteAutoComplete';
import { WhiteInput } from '../input';

// ---------------------------------------------------------------------Head

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#F4F5F7',
    border: '0.5px solid #70707099',
    padding: '5px 5px',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const BodyTableCell = withStyles(theme => ({
  root: {
    border: '0.5px solid #70707099',
    padding: '5px 5px',
    color: '#373737',
    fontWeight: '500',
    verticalAlign: 'inherit',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function EnhancedTableHead(props) {
  const { headCells, hideSrNumber, showDelete, editableMode } = props;

  return (
    <TableHead>
      <TableRow>
        {!hideSrNumber && (
          <StyledTableCell
            align="center"
            style={{
              width: '40px',
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontWeight: 500,
                color: '#373737',
              }}
            >
              No.
            </Typography>
          </StyledTableCell>
        )}
        {headCells.map((headCell, i) => {
          const { headAlign, subLabel } = headCell;
          if (!headCell.hideInTable) {
            return (
              <StyledTableCell
                key={i} //fix id key
                align={headAlign ? headAlign : 'left'}
                style={{
                  minWidth: headCell.minWidth || 'auto',
                  maxWidth: headCell.maxWidth || 'auto',
                  width: headCell.width || 'auto',
                }}
              >
                {headCell.label}
                {subLabel && (
                  <Typography
                    variant="h4"
                    style={{
                      lineHeight: 'initial',
                    }}
                  >
                    {subLabel}
                  </Typography>
                )}
              </StyledTableCell>
            );
          }
        })}

        {showDelete && editableMode && (
          <StyledTableCell
            align="center"
            style={{
              minWidth: '40px',
              width: '50px',
            }}
          />
        )}
      </TableRow>
    </TableHead>
  );
}

// ------------------- EditableTable ------------
const useTableStyles = makeStyles({
  table: {
    minWidth: 750,
  },
});

// EditableTable  in testing
export function EditableTable(props) {
  const classes = useTableStyles();
  const {
    rows = [],
    headCells = [],
    showAddInputRow,
    addInput,
    hideSrNumber,
    handleDelete,
    showDelete,
    editableMode,
  } = props;
  //   IN USE
  const getTableCellValue = (column, value, row) => {
    const getValue = value => {
      return _.isNumber(value) ? value : _.isEmpty(value) ? '' : value;
    };
    return column.format
      ? getValue(
          column.format({
            value,
            row,
          }),
        )
      : getValue(value);
  };

  return (
    <TableContainer
    //   style={{ maxHeight: props.Height || 'auto' }}
    >
      <Table
        className={classes.table}
        // id={props.tableId}
        aria-labelledby="tableTitle"
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          headCells={headCells}
          hideSrNumber={hideSrNumber}
          showDelete={showDelete}
          editableMode={editableMode}
        />
        <TableBody>
          {rows &&
            rows.map((row, index) => {
              return (
                <React.Fragment key={`${index}_${row._id || index}`}>
                  <TableRow tabIndex={-1} key={`${index}_${index}`}>
                    {/* hover */}
                    {!hideSrNumber && (
                      <BodyTableCell align="center">{index + 1}</BodyTableCell>
                    )}

                    {/* headcell mapping */}
                    {headCells.map((column, i) => {
                      if (!column.hideInTable) {
                        const value = _.get(row, column.id);
                        const {
                          id,
                          maxWidth,
                          width,
                          render,
                          inputType,
                          minWidth,
                          inputProps = {},
                        } = column;

                        const { onChange, ...inputPropsEtc } = inputProps;

                        return (
                          <BodyTableCell
                            key={`${id}` + i}
                            //   align={column.align || 'center'}
                            style={{
                              // verticalAlign: 'baseline',
                              maxWidth: maxWidth,
                              overflowWrap: 'break-word',
                              width: width || 'auto',
                              minWidth: minWidth || 'auto',
                            }}
                          >
                            {/* check if use render or default table cell */}
                            {/* check id we need editableMode check here  */}
                            {render && editableMode ? (
                              render({
                                column,
                                value,
                                row,
                                index,
                                headCellId: id,
                                stringValue: getTableCellValue(
                                  column,
                                  value,
                                  row,
                                ),
                              })
                            ) : inputType === 'text' && editableMode ? (
                              <WhiteInput
                                type="text"
                                value={getTableCellValue(column, value, row)}
                                onChange={e => {
                                  onChange && onChange(e, index, row, id);
                                }}
                                rows={1}
                                maxRows={6}
                                multiline
                                {...inputPropsEtc}
                              />
                            ) : inputType === 'number' && editableMode ? (
                              <WhiteInput
                                type="number"
                                value={getTableCellValue(column, value, row)}
                                onChange={e => {
                                  onChange && onChange(e, index, row, id);
                                }}
                                {...inputPropsEtc}
                              />
                            ) : inputType === 'autocomplete' && editableMode ? (
                              <WhiteAutoComplete
                                value={getTableCellValue(column, value, row)}
                                onChange={(e, newValue) => {
                                  onChange &&
                                    onChange(
                                      e,
                                      index,
                                      row,
                                      id,
                                      newValue,
                                      'autocomplete',
                                    );
                                }}
                                {...inputPropsEtc}
                              />
                            ) : (
                              <Box
                                width={1}
                                height={1}
                                display="flex"
                                alignItems="center"
                              >
                                <Typography variant="h4">
                                  {getTableCellValue(column, value, row)}
                                </Typography>
                              </Box>
                            )}
                          </BodyTableCell>
                        );
                      }
                    })}

                    {/* delete button */}
                    {showDelete && editableMode && (
                      <BodyTableCell align="center">
                        <CloseIconButton
                          onClick={() => handleDelete(index, row)}
                          iconProps={{ style: { width: '14px' } }}
                          style={{ height: '20px' }}
                        />
                      </BodyTableCell>
                    )}
                  </TableRow>
                </React.Fragment>
              );
            })}

          {showAddInputRow && editableMode && (
            <TableRow>
              <BodyTableCell align="center">
                {rows && rows.length > 0 ? rows.length + 1 : 1}
              </BodyTableCell>
              <BodyTableCell
                colSpan={
                  showDelete
                    ? props.headCells.length + 1
                    : props.headCells.length
                }
              >
                {addInput}
              </BodyTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
