import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import FitbitIcon from '../../../images/assets/fitbit-icon.png';
import GoogleIcon from '../../../images/assets/google-fit.png';
import DoctorICon from '../../../images/assets/Group 4912.png';
import HospitalIcon from '../../../images/assets/Group 4917.png';
import VitalsCard from './VitalsCard';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    // padding:15,
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.card.main,

    borderRadius: '5px',
    boxShadow: '0px 2px 4px #00000029',
  },
  cardContent: {
    padding: '0px !important',
    height: 410,
  },
  gridRoot: {
    height: '100%',
  },
  headerCard: {
    padding: '0px !important',
    height: 40,
    background: 'white',
    borderBottom: '2px solid #eeeeee',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 15,
  },
}));

export default function Vitals(props) {
  // debugger;
  // console.log(props)

  const classes = useStyles();

  const getIcon = name => {
    let real = '';

    if (name === 'Doctor') {
      real = HospitalIcon;
    } else if (name === 'Patient') {
      real = DoctorICon;
    } else if (name === 'GoogleFit') {
      real = GoogleIcon;
    } else if (name === 'Fitbit') {
      real = FitbitIcon;
    } else {
      real = '';
    }

    return real;
  };

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardHeader
          title="Vitals"
          className={classes.headerCard}
          classes={{
            title: classes.headerTitle,
          }}
        />
        <CardContent className={classes.cardContent}>
          <Grid container spacing={0} className={classes.gridRoot}>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Body Temperature"
                value={
                  props && props.temperatureData != null
                    ? props.temperatureData.value
                    : '-'
                }
                date={
                  props && props.temperatureData != null
                    ? props.temperatureData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.temperatureData != null &&
                    props.temperatureData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Pulse Rate"
                value={
                  props && props.heartRateData != null
                    ? props.heartRateData.value
                    : '-'
                }
                date={
                  props && props.heartRateData != null
                    ? props.heartRateData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.heartRateData != null &&
                    props.heartRateData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Blood Pressure"
                value={
                  props && props.bloodPressureData != null
                    ? props.bloodPressureData.valueCodeableConcept
                    : '-'
                }
                date={
                  props && props.bloodPressureData != null
                    ? props.bloodPressureData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.bloodPressureData != null &&
                    props.bloodPressureData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Respiratory Rate"
                value={
                  props && props.respirationData != null
                    ? props.respirationData.value
                    : '-'
                }
                date={
                  props && props.respirationData != null
                    ? props.respirationData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.respirationData != null &&
                    props.respirationData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Weight"
                value={
                  props && props.weightData != null
                    ? props.weightData.value
                    : '-'
                }
                date={
                  props && props.weightData != null
                    ? props.weightData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.weightData != null &&
                    props.weightData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Oxygen Saturation"
                value={
                  props && props.oxygenSaturationData != null
                    ? props.oxygenSaturationData.value
                    : '-'
                }
                date={
                  props && props.oxygenSaturationData != null
                    ? props.oxygenSaturationData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.oxygenSaturationData != null &&
                    props.oxygenSaturationData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="Height"
                value={
                  props && props.heightData != null
                    ? props.heightData.value
                    : '-'
                }
                date={
                  props && props.heightData != null
                    ? props.heightData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.heightData != null &&
                    props.heightData.recordedBy,
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <VitalsCard
                title="RBS"
                value={
                  props && props.glucoseData != null
                    ? props.glucoseData.value
                    : '-'
                }
                date={
                  props && props.glucoseData != null
                    ? props.glucoseData.effectiveDateTime
                    : '-'
                }
                LocalIcon={getIcon(
                  props &&
                    props.glucoseData != null &&
                    props.glucoseData.recordedBy,
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
