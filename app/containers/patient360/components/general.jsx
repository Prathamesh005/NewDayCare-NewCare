/*eslint-disable*/
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React from 'react';
import themes from '../../../theme/theme';
import { DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

const theme = themes;
const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '90px',
    padding: 15,
    minHeight: 100,
  },
  tablecontainer: {
    overflowY: 'scroll',
    // height: "500px",
    // maxHeight:"500px"
    height: 'auto',
  },
  timeline: {
    transform: 'rotate(-90deg)',
    marginLeft: 50,
  },
  timelineConnector: {
    height: '20px',
  },
  timelineContentContainer: {
    textAlign: 'left',
  },
  timelineContent: {
    display: 'inline-block',
    transform: 'rotate(90deg)',
    textAlign: 'center',
    minWidth: 50,
  },
  timelineIcon: {
    transform: 'rotate(-90deg)',
  },
  showHide: {
    background: '#f7f6f4',
    color: theme.palette.button.paginated.color,
    margin: '0px 0px 10px 0px',
    float: 'left',
    width: 142,
    borderRadius: '50px',
    '&:focus': {
      background: theme.palette.button.paginated.color,
    },
    '&:hover': {
      background: '#f7f6f4',
    },
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.tabellight,
    color: theme.palette.primary.tabelmain,
    fontWeight: 'medium',
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      fontWeight: '500px',
    },
  },
}))(TableRow);

function Tabledata(props) {
  const classes = useStyles();
  const themes = useTheme();

  const [page, setPages] = React.useState(0);
  const [pageData, setPageData] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    setPageData(props.Data);
  }, [props.Data, props.Id]);

  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };

  const Data =
    pageData && pageData.length > 5
      ? pageData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : pageData;

  return (
    <Paper className={classes.root}>
      {pageData != null && pageData.length > 0 ? (
        <TableContainer className={classes.tablecontainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" size="small">
                  Reason Code
                </StyledTableCell>
                <StyledTableCell align="left" size="small">
                  Date
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData &&
                Data.map((row, index) => {
                  return (
                    <StyledTableRow key={(index + 1).toString()}>
                      <StyledTableCell align="left" size="small">
                        {row.code != null
                          ? row.code.coding.map((i, ind) => {
                              return (
                                <div key={'ind' + (ind + 1).toString()}>
                                  {i.display}
                                </div>
                              );
                            })
                          : null}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {moment(row.onset)
                          .utc()
                          .format(DATE_FORMAT)}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        NO_RECORD
      )}

      {pageData && pageData.length > 5 ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={pageData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ''
      )}
    </Paper>
  );
}

export default Tabledata;
