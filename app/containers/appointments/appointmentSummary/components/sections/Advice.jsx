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
function Advice(props) {
  const classes = useStyles();
  const arrayOfAdvices =
    props && props.adviceAndPrescriptionData
      ? props.adviceAndPrescriptionData.map(item => item.code.display)
      : [];
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Advice
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
              {arrayOfAdvices.join(', ')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Advice;
