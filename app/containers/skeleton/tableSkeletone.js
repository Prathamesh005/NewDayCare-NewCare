/*eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '90px',
  },
  tablecontainer: {
    overflowY: 'scroll',
    // height: "500px",
    maxHeight: 300,
    height: 'auto',
  },
  paper: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(0),
    display: 'flex',
    //overflow: "auto",
    flexDirection: 'column',
    background: '#fff',
    minHeight: 400,
    height: 400,
    margin: 20,
  },
  innerDiv: {
    padding: 20,
    borderRadius: 0,
    background: theme.palette.action.hover,
    //height: 400
  },
  SkeletonCss: {
    color: theme.palette.button.paginated.color,
    background: '#fff',
    margin: '0px 40px 0px 40px',
    float: 'right',
    bottom: 10,
    fontSize: 10,
    height: 40,
    width: 40,
  },

  paginatedButtonLeft: {
    color: theme.palette.button.paginated.color,
    background: '#fff',
    margin: '0px 50px 0px 0px',
    float: 'left',
    bottom: 10,
  },
  Bottom: {
    position: 'fixed',
    top: 10,
    right: 20,
  },
  iconClass: {
    color: '#727272',
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#efefef',
    color: '#373737',
    fontWeight: 'bold',
    opacity: 0.9,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fff',
      fontWeight: '500px',
    },
  },
}))(TableRow);

function Tabledata(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      {[...Array(1)].map((row, index) => (
        <Grid
          item
          key={(index + 1).toString()}
          sm={props && props.size}
          xs={12}
        >
          <Paper className={classes.paper}>
            <div className={classes.innerDiv}>
              <div style={{ float: 'left' }}>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="35vw"
                  height={40}
                />
              </div>

              <Skeleton
                animation="wave"
                variant="text"
                width="20vw"
                height={40}
                className={classes.SkeletonCss}
              />

              <TableContainer className={classes.tablecontainer}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align="left"
                        size="medium"
                        style={{ minWidth: 170 }}
                      />
                      <StyledTableCell
                        align="left"
                        size="medium"
                        style={{ minWidth: 120 }}
                      />
                      <StyledTableCell
                        align="left"
                        size="medium"
                        style={{ minWidth: 100 }}
                      />
                      <StyledTableCell align="left" size="medium" />
                      <StyledTableCell align="left" size="medium" />
                      <StyledTableCell align="left" size="medium" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(5)].map((row, index) => (
                      <StyledTableRow key={(index + 1).toString()}>
                        <StyledTableCell align="left" size="small" />
                        <StyledTableCell align="left" size="small" />
                        <StyledTableCell align="left" />
                        <StyledTableCell align="left" />
                        <StyledTableCell align="left" />
                        <StyledTableCell align="left" />
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default function TableSkeletone(props) {
  return <Tabledata size={props && props.size} />;
}
