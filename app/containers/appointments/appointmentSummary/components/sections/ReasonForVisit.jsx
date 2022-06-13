import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
}));
function ReasonForVisit(props) {
  const classes = useStyles();
  const { VisitNotesResult } = props;
  const newArray =
    Array.isArray(VisitNotesResult) && [...VisitNotesResult].reverse();
  const reasonsArray = [];
  newArray &&
    newArray.length > 0 &&
    newArray.map(
      item =>
        Array.isArray(item.clinicalComplains) &&
        reasonsArray.push(item.clinicalComplains[0]),
    );
  const note = reasonsArray.join(', ');
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Reason For Visit
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{ fontWeight: 500, color: '#373737' }}
            >
              {note}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReasonForVisit;
