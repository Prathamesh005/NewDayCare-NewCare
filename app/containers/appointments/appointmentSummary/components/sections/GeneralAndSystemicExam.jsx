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
function GeneralAndSystemicExam(props) {
  const classes = useStyles();
  const ecogScore =
    props && props.ScoresDataResult && props.ScoresDataResult.valueInteger
      ? props.ScoresDataResult.valueInteger
      : 'N/a';
  const genExam = [];

  if (
    props &&
    props.GenAndSysResult &&
    props.GenAndSysResult.generalExaminations &&
    props.GenAndSysResult.generalExaminations.length != 0
  ) {
    props.GenAndSysResult.generalExaminations.map(item => {
      if (
        item.valueCodeableConcept.code === 'icterus' ||
        item.valueCodeableConcept.code === 'cyanosis' ||
        item.valueCodeableConcept.code === 'pallor' ||
        item.valueCodeableConcept.code === 'oedema' ||
        item.valueCodeableConcept.code === 'clubbing' ||
        item.valueCodeableConcept.code === 'lymphadenopathy'
      ) {
        genExam.push({
          name: item.valueCodeableConcept.display
            ? item.valueCodeableConcept.display
            : 'N/a',
          value: item.description ? item.description : 'N/a',
        });
      }
    });
  }

  const genExamFiltered =
    genExam.length > 0
      ? genExam.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)
      : [];

  const sysExam =
    props && props.GenAndSysResult && props.GenAndSysResult.systemicExaminations
      ? props.GenAndSysResult.systemicExaminations.length > 0
        ? props.GenAndSysResult.systemicExaminations.map(item => {
            return {
              name: item && item.resourceName ? item.resourceName : 'N/a',
              value:
                item && item.valueString ? item && item.valueString : 'N/a',
            };
          })
        : []
      : [];

  const sysExamFiltered =
    sysExam.length > 0
      ? sysExam.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)
      : [];

  const palpation =
    props && props.GenAndSysResult && props.GenAndSysResult.palpation
      ? props.GenAndSysResult.palpation
      : null;
  const inspection =
    props && props.GenAndSysResult && props.GenAndSysResult.inspection
      ? props.GenAndSysResult.inspection
      : null;

  const vitalArray = [];
  if (props && props.vitalDataSuccess) {
    if (props.vitalDataSuccess.bloodPressureData) {
      vitalArray.push({
        name: 'Blood Pressure',
        value:
          props.vitalDataSuccess.bloodPressureData.valueCodeableConcept.text +
          ' ' +
          props.vitalDataSuccess.bloodPressureData.valueCodeableConcept.display,
      });
    }
    if (props.vitalDataSuccess.glucoseData) {
      vitalArray.push({
        name: 'RBS',
        value:
          props.vitalDataSuccess.glucoseData.value.value +
          ' ' +
          props.vitalDataSuccess.glucoseData.value.unit,
      });
    }
    if (props.vitalDataSuccess.heartRateData) {
      vitalArray.push({
        name: 'Heart Rate',
        value:
          props.vitalDataSuccess.heartRateData.value.value +
          ' ' +
          props.vitalDataSuccess.heartRateData.value.unit,
      });
    }
    if (props.vitalDataSuccess.oxygenSaturationData) {
      vitalArray.push({
        name: 'Oxygen Saturation',
        value:
          props.vitalDataSuccess.oxygenSaturationData.value.value +
          ' ' +
          props.vitalDataSuccess.oxygenSaturationData.value.unit,
      });
    }
    if (props.vitalDataSuccess.respirationData) {
      vitalArray.push({
        name: 'Respiration Rate',
        value:
          props.vitalDataSuccess.respirationData.value.value +
          ' ' +
          props.vitalDataSuccess.respirationData.value.unit,
      });
    }
    if (props.vitalDataSuccess.temperatureData) {
      vitalArray.push({
        name: 'Temperature',
        value:
          props.vitalDataSuccess.temperatureData.value.value +
          ' ' +
          props.vitalDataSuccess.temperatureData.value.unit,
      });
    }
    if (props.vitalDataSuccess.weightData) {
      vitalArray.push({
        name: 'Weight',
        value:
          props.vitalDataSuccess.weightData.value.value +
          ' ' +
          props.vitalDataSuccess.weightData.value.unit,
      });
    }
  }

  const newArray = [];
  genExamFiltered &&
    genExamFiltered.map((item, index) => {
      newArray.push(`${item.name} - ${item.value}`);
    });
  sysExamFiltered &&
    sysExamFiltered.map((item, index) => {
      newArray.push(`${item.name} - ${item.value}`);
    });
  palpation &&
    newArray.push(`${palpation.resourceName}-${palpation.valueString}`);
  inspection &&
    newArray.push(`${inspection.resourceName}-${inspection.valueString}`);
  ecogScore && newArray.push(`ECOG-${ecogScore}`);

  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          General And Systemic Examination
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid container>
            <Grid item xs={12}>
              {newArray &&
                newArray.map(item => (
                  <Typography
                    key={item.toString()}
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item}
                  </Typography>
                ))}
            </Grid>
            {vitalArray &&
              vitalArray.map((item, index) => {
                return (
                  <Grid item xs={12} key={index.toString()}>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      {item.name}-{item.value}
                    </Typography>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GeneralAndSystemicExam;
