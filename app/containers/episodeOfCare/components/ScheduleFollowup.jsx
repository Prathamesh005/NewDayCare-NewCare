import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import DateTimePickerField from '../../layouts/formTemplate/DateTimePickerField';

const useStyles = makeStyles(theme => ({
  discussionDiv: {
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '15px',
    },
  },
  headlabels: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  secondarylabels: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
}));

function ScheduleFollowUp(props) {
  const { SET_FOLLOW_UP_INITIAL_STATE, scheduleFollowUpData } = props;
  const classes = useStyles();
  useEffect(() => {
    let followUpDate = '';
    let followUpDateId = uuidv4();
    if (scheduleFollowUpData && scheduleFollowUpData) {
      followUpDate = moment(
        scheduleFollowUpData && scheduleFollowUpData.startDateTime,
      )
        .utc()
        .format('YYYY-MM-DD');
      followUpDateId = scheduleFollowUpData && scheduleFollowUpData.resourceId;
    }

    const INITIAL_FORM_STATE = {
      followUpDate: followUpDate,
      followUpDateId: followUpDateId,
    };

    SET_FOLLOW_UP_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [scheduleFollowUpData]);

  return (
    <Fragment>
      <Grid container xs={12} spacing={2} className={classes.discussionDiv}>
        <Grid item xs={12}>
          <Typography className={classes.headlabels}>
            Schedule Follow Up
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} lg={1} className={classes.lebels}>
          Follow Up Date
        </Grid>
        <Grid item xs={12} md={2}>
          <DateTimePickerField
            name="followUpDate"
            type="date"
            // placeholder="Date Of Birth"
            minDate={new Date()}
            maxDate={''}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ScheduleFollowUp);
