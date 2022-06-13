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
function ImpressionForVisit(props) {
  const classes = useStyles();
  const cancerClinicalImpressions =
    props.VisitNotesResult && props.VisitNotesResult;
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Impression For Visit
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: '#373737' }}>
              {cancerClinicalImpressions[0]['description']
                ? cancerClinicalImpressions[0]['description']
                : 'N/a'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ImpressionForVisit;
