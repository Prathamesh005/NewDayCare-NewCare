import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  mainDiv: {
    '& .MuiSkeleton-wave': {
      borderRadius: 10,
    },
  },
}));

export default function NewDashboard() {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} className={classes.mainDiv}>
          <Skeleton
            animation="wave"
            variant="rect"
            // width={300}
            height={150}
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.mainDiv}>
          <Skeleton
            animation="wave"
            variant="rect"
            // width={300}
            height={150}
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.mainDiv}>
          <Skeleton
            animation="wave"
            variant="rect"
            // width={300}
            height={150}
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.mainDiv}>
          <Skeleton
            animation="wave"
            variant="rect"
            // width={300}
            height={150}
          />
        </Grid>

        <Grid container item xs={4}>
          <Grid item xs={12} md={12} className={classes.mainDiv}>
            <Skeleton
              animation="wave"
              variant="rect"
              // width={300}
              height={40}
            />
          </Grid>
          <Grid item xs={12} md={12} className={classes.mainDiv}>
            <Skeleton
              animation="wave"
              variant="rect"
              // width={300}
              height={500}
            />
          </Grid>
        </Grid>

        <Grid container item xs={4}>
          <Grid item xs={12} md={12} className={classes.mainDiv}>
            <Skeleton
              animation="wave"
              variant="rect"
              // width={300}
              height={40}
            />
          </Grid>
          <Grid item xs={12} md={12} className={classes.mainDiv}>
            <Skeleton
              animation="wave"
              variant="rect"
              // width={300}
              height={500}
            />
          </Grid>
        </Grid>

        <Grid container item xs={4}>
          <Grid item xs={12} md={12} className={classes.mainDiv}>
            <Skeleton
              animation="wave"
              variant="rect"
              // width={300}
              height={40}
            />
          </Grid>
          <Grid item xs={12} md={12} className={classes.mainDiv}>
            <Skeleton
              animation="wave"
              variant="rect"
              // width={300}
              height={500}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
