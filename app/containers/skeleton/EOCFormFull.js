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

  iconClass: {
    color: '#727272',
  },
  mainBlock: {
    // width: '315px',
    // height: '200px',
    padding: '25px 20px',

    // margin: '50px auto',
  },
  cardContainer: {
    display: 'flex',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  cardMiddle: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px 10px 10px',
    '& .MuiSkeleton-text': {
      borderRadius: '20px',
    },
  },
  cardBottom: {
    padding: '0px 10px 0px 10px',
  },
  innerBlock: {
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    margin: '50px 10px 10px 0',
    minWidth: '24%',
  },
  circle: {
    marginRight: '10px',
  },
  linePad: {
    marginRight: '10px',
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
    <Grid container>
      <Skeleton animation="wave" variant="text" width="50vw" height={40} />
      {[...Array(props.numberOfrows)].map((row, index) => (
        <Grid item key={(index + 1).toString()} xs={12}>
          <Grid container className={classes.mainBlock}>
            {[...Array(props.size)].map((col, ind) => (
              <Grid
                item
                className={classes.cardContainer}
                key={(ind + 1).toString()}
              >
                <div className={classes.innerBlock}>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width={220}
                    height={100}
                  />
                  <div className={classes.cardTop}>
                    <div>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={80}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className={classes.cardMiddle}>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={80}
                      height={20}
                      className={classes.linePad}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                  </div>
                  <div className={classes.cardBottom}>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={80}
                      height={20}
                    />

                    {/* <Skeleton
                                            animation="wave"
                                            variant="text"
                                            width={100}
                                            height={20}
                                        /> */}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default function EOCFormFull(props) {
  return (
    <Tabledata size={props && props.size} numberOfrows={props && props.row} />
  );
}
