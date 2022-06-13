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
}));

export default function HeaderEOCSkelaton() {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12} className={classes.mainDiv}>
        <Skeleton
          animation="wave"
          variant="rect"
          // width={300}
          height={55}
        />
      </Grid>
    </Grid>
  );
}
