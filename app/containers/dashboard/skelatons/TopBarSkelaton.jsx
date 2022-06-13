import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  mainDiv:{
    "& .MuiSkeleton-wave":{
      borderRadius:10
    }
  }
}));

export default function TopBarSkelaton() {
  const classes = useStyles();
  return (
      <Fragment>
        <Grid item xs={12} md={3} className={classes.mainDiv}>
          <Skeleton
            animation="wave"
            variant="rect"
            // width={300}
            height={150}
          />
        </Grid>
      </Fragment>
  );
}
