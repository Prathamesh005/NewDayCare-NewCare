import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
}));
function FollowUp(props) {
  const classes = useStyles();
  const scheduledFollowup = props.scheduleFollowUp
    ? props.scheduleFollowUp
      ? props.scheduleFollowUp.startDateTime
        ? moment(props.scheduleFollowUp.startDateTime).format('DD MMM YYYY')
        : 'N/a'
      : 'N/a'
    : 'N/a';
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Follow Up
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography
              variant="h4"
              style={{ fontWeight: 500, color: '#373737' }}
            >
              {scheduledFollowup}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FollowUp;
