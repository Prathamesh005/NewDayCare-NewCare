/*eslint-disable*/
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React from 'react';
import themes from '../../../theme/theme';
import { DATE_FORMAT } from '../../../utils/constants';

const theme = themes;
const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '90px',
  },
  tablecontainer: {
    overflowY: 'scroll',
    // height: "500px",
    // maxHeight:"500px"
    height: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  showHide: {
    color: theme.palette.button.paginated.color,
    background: '#fff !important',
    margin: '10px 0px 0px 40px',
    float: 'right',
    bottom: 20,
    fontSize: '12px',
    height: 20,
    float: 'right',
    width: '180px',
    borderRadius: 0,
    //background:'transparent',
    outline: 'none !important',
    boxShadow: 'none !important',
  },

  th: {
    fontWeight: 'bold',
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
      // fontWeight:'500px'
    },
  },
}))(TableRow);

const BodySiteTable = props => {
  const classes = useStyles();
  const theme = useTheme();

  //console.log('props',props)
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.tablecontainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableBody
          // onClick={() => modalOpen(true, 1)}
          >
            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.th}
              >
                Body Site
              </StyledTableCell>
              <StyledTableCell align="left">
                {props.bodySite != null &&
                props.bodySite != [] &&
                props.bodySite != '-'
                  ? props.bodySite.map((i, index) => {
                      return (
                        <div key={(index + 1).toString()}>
                          {i.bodySite.display}
                        </div>
                      );
                    })
                  : null}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.th}
              >
                Laterality
              </StyledTableCell>
              <StyledTableCell align="left">
                {props.laterality != null &&
                props.laterality != [] &&
                props.laterality != '-'
                  ? props.laterality.map((i, index) => {
                      return (
                        <div key={(index + 1).toString()}>
                          {i.laterality != null ? i.laterality.display : ''}
                        </div>
                      );
                    })
                  : null}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.th}
              >
                Verification Status
              </StyledTableCell>
              <StyledTableCell align="left">
                {props && props.verification.display}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.th}
              >
                Clinical Status
              </StyledTableCell>
              <StyledTableCell align="left">
                {props && props.status.display}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.th}
              >
                Onset
              </StyledTableCell>
              <StyledTableCell align="left">
                {props.onset != null
                  ? moment(props.onset)
                      .utc()
                      .format(DATE_FORMAT)
                  : '-'}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.th}
              >
                Code
              </StyledTableCell>
              <StyledTableCell align="left">{props.code.text}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BodySiteTable;
