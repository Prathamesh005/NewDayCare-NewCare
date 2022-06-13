import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box } from '@material-ui/core';

export function UserHeaderSkeleton() {
  return (
    <Box width={1} display="flex">
      <Skeleton
        animation="wave"
        variant="circle"
        width={40}
        height={40}
        style={{ marginRight: '20px', paddingLeft: '5px' }}
      />
      <Skeleton variant="rect" width={'100%'} height={40} />
    </Box>
  );
}

export function ListSkeleton({ count = 4 }) {
  return (
    <Box width={1}>
      {[...Array(parseInt(count))].map(key => (
        <Skeleton
          key={key}
          variant="rect"
          width={'100%'}
          height={40}
          style={{ marginBottom: '5px' }}
        />
      ))}
    </Box>
  );
}

export function BoxSkeleton(props) {
  const { skeletonProps, ...propsBox } = props;
  return (
    <Box width={1} {...propsBox}>
      <Skeleton
        variant="rect"
        width={'100%'}
        height={'100%'}
        {...skeletonProps}
      />
    </Box>
  );
}
