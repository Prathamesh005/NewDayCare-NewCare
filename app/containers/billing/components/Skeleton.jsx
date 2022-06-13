import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

function SkeletonBilling({ count }) {
  return (
    <Grid container spacing={1}>
      {[...Array(count ? count : 2)].map((val, i) => {
        return (
          <Grid item xs={12} key={(i + 1).toString()}>
            <Skeleton
              variant="rect"
              width="100%"
              height={50}
              animation={i % 2 === 0 ? false : 'wave'}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SkeletonBilling;
