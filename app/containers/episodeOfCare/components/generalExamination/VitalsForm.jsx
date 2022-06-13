import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import Textfield from '../forms/TextField';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  centerGrid: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function VitalForm(props) {
  const { SET_VITAL_INITIAL_STATE, vitalData } = props;
  const classes = useStyles();

  useEffect(() => {
    let temperature = '';
    let respiratoryRate = '';
    let heartRate = '';
    let oxygenSaturation = '';
    let bloodPressure = '';
    let rbs = '';

    let temperatureId = uuidv4();
    let respiratoryRateId = uuidv4();
    let heartRateId = uuidv4();
    let oxygenSaturationId = uuidv4();
    let bloodPressureId = uuidv4();
    let rbsId = uuidv4();

    if (vitalData && vitalData) {
      const {
        temperatureData,
        respirationData,
        heartRateData,
        oxygenSaturationData,
        bloodPressureData,
        weightData,
        glucoseData,
      } = vitalData;

      if (temperatureData != null) {
        temperature = temperatureData.value.value;
        temperatureId = temperatureData.resourceId;
      }
      if (respirationData != null) {
        respiratoryRate = respirationData.value.value;
        respiratoryRateId = respirationData.resourceId;
      }
      if (heartRateData != null) {
        heartRate = heartRateData.value.value;
        heartRateId = heartRateData.resourceId;
      }
      if (oxygenSaturationData != null) {
        oxygenSaturation = oxygenSaturationData.value.value;
        oxygenSaturationId = oxygenSaturationData.resourceId;
      }
      if (bloodPressureData != null) {
        bloodPressure = bloodPressureData.valueCodeableConcept.text;
        bloodPressureId = bloodPressureData.resourceId;
      }
      if (glucoseData != null) {
        rbs = glucoseData.value.value;
        rbsId = glucoseData.resourceId;
      }
      // debugger
    }

    const INITIAL_FORM_STATE = {
      temperature: temperature,
      pulseRate: heartRate,
      bloodPressure: bloodPressure,
      respiratoryRate: respiratoryRate,
      oxygenSaturation: oxygenSaturation,
      rbs: rbs,

      temperatureId: temperatureId,
      respiratoryRateId: respiratoryRateId,
      pulseRateId: heartRateId,
      oxygenSaturationId: oxygenSaturationId,
      bloodPressureId: bloodPressureId,
      rbsId: rbsId,
    };
    // debugger
    SET_VITAL_INITIAL_STATE(INITIAL_FORM_STATE);

    return () => {};
  }, [vitalData]);

  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item container xs={12} md={6} className={classes.centerGrid}>
          <Grid item xs={12} md={2} className={classes.lebels}>
            Temperature
          </Grid>
          <Grid item xs={12} md={3}>
            <Textfield
              name="temperature"
              // placeholder="Temperature"
              style={{ width: '50%' }}
            />
            <Textfield
              name="temperatureUnit"
              disabled
              style={{ width: '50%' }}
            />
          </Grid>
          <Grid item xs={12} md={1} />

          <Grid item xs={12} md={2} className={classes.lebels}>
            Pulse
          </Grid>
          <Grid item xs={12} md={3}>
            <Textfield
              name="pulseRate"
              // placeholder="Pulse"
              style={{ width: '50%' }}
            />
            <Textfield name="pulseRateUnit" disabled style={{ width: '50%' }} />
          </Grid>

          <Grid item xs={12} md={1} />
        </Grid>
        <Grid item container xs={12} md={6} className={classes.centerGrid}>
          <Grid item xs={12} md={2} className={classes.lebels}>
            Blood Pressure
          </Grid>
          <Grid item xs={12} md={3}>
            <Textfield
              name="bloodPressure"
              // placeholder="Blood Pressure"
              style={{ width: '50%' }}
            />
            <Textfield
              name="bloodPressureUnit"
              disabled
              style={{ width: '50%' }}
            />
          </Grid>
          <Grid item xs={12} md={1} />

          <Grid item xs={12} md={2} className={classes.lebels}>
            Respiratory Rate
          </Grid>
          <Grid item xs={12} md={3}>
            <Textfield
              name="respiratoryRate"
              // placeholder="Respiratory Rate"
              style={{ width: '40%' }}
            />
            <Textfield
              name="respiratoryRateUnit"
              disabled
              style={{ width: '60%' }}
            />
          </Grid>

          <Grid item xs={12} md={1} />
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Grid item container xs={12} md={6} className={classes.centerGrid}>
          <Grid item xs={12} md={2} className={classes.lebels}>
            Oxygen Saturation
          </Grid>
          <Grid item xs={12} md={3}>
            <Textfield
              name="oxygenSaturation"
              // placeholder="Oxygen Saturation"
              style={{ width: '50%' }}
            />
            <Textfield
              name="oxygenSaturationUnit"
              disabled
              style={{ width: '50%' }}
            />
          </Grid>
          <Grid item xs={12} md={1} />

          <Grid item xs={12} md={2} className={classes.lebels}>
            RBS
          </Grid>
          <Grid item xs={12} md={3}>
            <Textfield
              name="rbs"
              // placeholder="RBS"
              style={{ width: '46%' }}
            />
            <Textfield name="rbsUnit" disabled style={{ width: '54%' }} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(VitalForm);
