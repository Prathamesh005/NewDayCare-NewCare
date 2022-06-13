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

export default function MiddleCancerTypeSkelaton() {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container>
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
    </Fragment>
  );
}
