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
function TreatmentPlan(props) {
  const classes = useStyles();
  const arrayOfTreatment = [];
  let protocolData;
  if (
    props.treatmentProtocolData !== [] &&
    props.treatmentProtocolData &&
    props.treatmentProtocolData.recordCount != null
  ) {
    const { regimenProtocolRequests } = props.treatmentProtocolData;

    if (regimenProtocolRequests.length > 0) {
      if (regimenProtocolRequests[0].regimen) {
        protocolData = regimenProtocolRequests[0].regimen;
      }
    }
  }
  props &&
    props.TreatmentData &&
    props.TreatmentData.treatmentPlans &&
    props.TreatmentData.treatmentPlans.map((item, index) => {
      // if (item.display.split("/")[1] == "Chemotherapy" && protocolData) {
      //     arrayOfTreatment.push(`${index + 1}. ${item.display.split("/")[1]} - ${protocolData}`)
      // } else {
      arrayOfTreatment.push(` ${index + 1}. ${item.display.split('/')[1]}`);
      // }
    });

  const treatmentIntent =
    props.TreatmentData &&
    props.TreatmentData.treatmentIntent &&
    props.TreatmentData.treatmentIntent.display;
  // console.log("protocolData", arrayOfTreatment)
  // console.log("protocolData", props.treatmentProtocolData)
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Treatment Plan
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
              {arrayOfTreatment.join(', ')}
            </Typography>
          </Grid>
          {protocolData && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Treatment Protocol :{' '}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4" style={{ color: '#373737' }}>
                  {protocolData}
                </Typography>
              </Grid>
            </>
          )}
          {treatmentIntent && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Treatment Intent :{' '}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4" style={{ color: '#373737' }}>
                  {treatmentIntent}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TreatmentPlan;
