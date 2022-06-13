import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles(() => ({
  mainDiv: {
    '& .MuiSkeleton-wave': {
      borderRadius: 10,
    },
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
  },
  inputElement: {
    height: 65,
  },
}));

export default function BasicDetailEOCSkelaton() {
  const classes = useStyles();
  return (
    <Grid container style={{ padding: '25px 35px 0px' }}>
      {/* <Grid item xs={12} md={6} className={classes.mainDiv}>
          <Skeleton
            animation="wave"
            variant="rect"
            // width={300}
            height={250}
          />
        </Grid> */}
      <Grid item container xs={12} spacing={4}>
        <Grid item xs={12} md={12} className={classes.lebels}>
          <Skeleton width={'15%'}>
            <Typography>.</Typography>
          </Skeleton>
        </Grid>
        {[...Array(9)].map((val, i) => {
          return (
            <React.Fragment key={(i + 1).toString()}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                <Skeleton width={'100%'}>
                  <Typography>.</Typography>
                </Skeleton>
              </Grid>
              <Grid item xs={12} md={2}>
                <Skeleton className={classes.inputElement} />
              </Grid>
              <Grid item xs={12} md={1} />
            </React.Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
}
