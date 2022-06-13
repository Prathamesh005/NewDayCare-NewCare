import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
  },
}));

function SkeletonChildrenDemo(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" alignItems="center">
        {/* <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar />
          </Skeleton>
        </Box> */}
        <Box width="100%" margin={1}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton width="95%">
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton width="90%">
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton width="85%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height="100%">
        <Skeleton
          variant="rect"
          width="20%"
          style={{ margin: '10px', height: '67vh' }}
        >
          <img
            className={classes.image}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mNk+M+AFzCOKgADALyGCQGyq8YeAAAAAElFTkSuQmCC"
            alt=""
          />
        </Skeleton>

        <Skeleton
          variant="rect"
          width="60%"
          style={{ margin: '10px', height: '67vh' }}
        >
          <img
            className={classes.image}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mNk+M+AFzCOKgADALyGCQGyq8YeAAAAAElFTkSuQmCC"
            alt=""
          />
        </Skeleton>

        <Skeleton
          variant="rect"
          width="20%"
          style={{ margin: '10px', height: '67vh' }}
        >
          <img
            className={classes.image}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mNk+M+AFzCOKgADALyGCQGyq8YeAAAAAElFTkSuQmCC"
            alt=""
          />
        </Skeleton>
      </Box>
    </div>
  );
}

SkeletonChildrenDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function Patient360() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <SkeletonChildrenDemo loading />
      </Grid>
    </Grid>
  );
}
