import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import moment from 'moment';
import React from 'react';
import { NO_RECORD } from '../../../../utils/constants';

const useStyles = makeStyles(theme => ({
  mainTimeline: {
    height: '100%',
    overflowY: 'auto',
  },
  opposition: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 0,
    paddingRight: '1rem',
    marginLeft: '-5rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: '-3.5rem',
    },
  },
  seperator: {
    // paddingTop: 60,
    // marginBottom:-65,
    // marginLeft: -15,
  },
  timelineContent: {
    marginBottom: 20,
    padding: '0px 0px 0px 16px',
    marginRight: -5,
  },
  coloring: {
    background: '#FF3399',
  },
  paper: {
    padding: '5px 10px',
  },
}));

export default function RightSidebarTimeline(props) {
  // console.log(props)

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {props.TimelineData.length > 0 && props.TimelineData != [] ? (
        <div className={classes.mainTimeline}>
          <Timeline align="left" style={{ padding: '6px 16px 6px 0px' }}>
            {props && props.TimelineData != []
              ? props.TimelineData.map((data, index) => {
                  return (
                    <TimelineItem
                      key={(index + 1).toString()}
                      // onClick={() =>
                      //       timelineModalOpen(true, data)
                      // }
                    >
                      <TimelineOppositeContent className={classes.opposition}>
                        <Typography
                          variant="h4"
                          style={{ fontSize: '0.8rem', color: '#444444' }}
                          gutterBottom
                        >
                          Date
                        </Typography>
                        <Typography
                          variant="h4"
                          style={{ fontSize: '0.7rem', color: '#444444' }}
                          gutterBottom
                        >
                          {data.date != null
                            ? moment(data.date).format('DD/MM/YYYY')
                            : '-'}
                        </Typography>
                      </TimelineOppositeContent>

                      <TimelineSeparator className={classes.seperator}>
                        <TimelineConnector />

                        <TimelineDot
                          className={
                            index % 2 == 0 ? classes.coloring : classes.normal
                          }
                        />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent className={classes.timelineContent}>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography
                            variant="h4"
                            style={{ fontSize: '0.8rem', fontWeight: 500 }}
                            gutterBottom
                          >
                            {data.metric}
                          </Typography>
                          <Typography
                            variant="h4"
                            style={{ fontSize: '0.8rem' }}
                            gutterBottom
                          >
                            {data.subMetric}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })
              : ''}
          </Timeline>
        </div>
      ) : (
        NO_RECORD
      )}
    </>
  );
}
