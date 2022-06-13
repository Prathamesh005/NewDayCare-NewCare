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
  TablePagination,
  TableFooter,
} from '@material-ui/core';

// ---------------------------------------------------------------------Head

const StyledTableCell = withStyles(theme => ({
  head: {
    fontWeight: 500,
    padding: '10px',
    border: 'none',
    [theme.breakpoints.down('md')]: {
      padding: '10px 0px 10px 10px',
    },
  },
  body: {
    padding: '10px',
    fontWeight: 400,
    color: '#373737',
    border: 'none',
    // [theme.breakpoints.down('md')]: {
    //   padding: '4px',
    // },
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#F7F6F4',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
    },
  },
}))(TableRow);

function EnhancedTableHead(props) {
  const { headCells, headBackground } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => {
          const { headAlign, subLabel } = headCell;
          return (
            <StyledTableCell
              size="small"
              key={i} //fix id key
              align={headAlign ? headAlign : 'left'}
              style={{
                minWidth: headCell.minWidth || 'auto',
                maxWidth: headCell.maxWidth || 'auto',
                width: headCell.width || 'auto',
                backgroundColor: headBackground ? headBackground : 'Red',
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
        })}
      </TableRow>
    </TableHead>
  );
}

// ------------------- ViewTable -------------------
// always give height to parent div of {classes.root}
const useTableStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  tablecontainer: {
    width: '100%',
    maxHeight: props => (props.pagination === false ? '100%' : '85%'),
    overflowY: 'auto',
    background: 'transparent',
    padding: '0px 2px 2px 2px',
  },
  table: {
    // minWidth: 350,
  },
  tableFooter: {
    padding: '0px',
    fontSize: '1rem',
    border: 'none',
  },
});

// rows,headCells,headBackground is mendotory
export default function ViewTable(props) {
  const classes = useTableStyles(props);
  const {
    rows = [],
    headCells = [],
    pagination = true,
    withoutHeader = false,
    footer,
    headBackground,
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

  const [page, setPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };
  let rowsData =
    rows && rows.length > 5 && pagination
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tablecontainer}>
        <Table
          className={classes.table}
          aria-label="enhanced table"
          stickyHeader
        >
          {!withoutHeader && (
            <EnhancedTableHead
              headCells={headCells}
              headBackground={headBackground}
            />
          )}
          <TableBody style={{ boxShadow: '0px 1px 3px #00000029' }}>
            {rowsData.map((row, index) => {
              return (
                <React.Fragment key={`${index}_${row._id || index}`}>
                  <StyledTableRow tabIndex={-1} key={`${index}_${index}`}>
                    {/* headcell mapping */}
                    {headCells.map((column, i) => {
                      const value = _.get(row, column.id);
                      const { id, maxWidth, width, render } = column;

                      return (
                        <StyledTableCell
                          key={`${id}` + i}
                          // size="small"
                          align={column.align || 'left'}
                          style={{
                            maxWidth: maxWidth,
                            overflowWrap: 'break-word',
                            width: width || 'auto',
                          }}
                        >
                          {/* check if use render or default table cell */}
                          {/* check id we need editableMode check here  */}
                          {render ? (
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
                          ) : (
                            <Box
                              width={1}
                              height={1}
                              display="flex"
                              alignItems="center"
                            >
                              <Typography variant="h3">
                                {getTableCellValue(column, value, row)}
                              </Typography>
                            </Box>
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                </React.Fragment>
              );
            })}
          </TableBody>

          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={headCells.length}
                  className={classes.tableFooter}
                >
                  {footer}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

      {rows && rows.length > 5 && pagination ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ''
      )}
    </div>
  );
}
