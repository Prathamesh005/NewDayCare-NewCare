import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
}));
export default function PatientInfo(props) {
  const classes = useStyles();
  const [patientDetails, setPatientDetails] = useState(null);
  useEffect(() => {
    setPatientDetails(props.patientDetails);
  }, [props.patientDetails]);
  const patientName =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[0]
      : '';
  const patientAge =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[3]
      : '';
  const patientGender =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.gender === 'Male'
        ? 'M'
        : patientDetails.patient.gender === 'Female'
        ? 'F'
        : patientDetails.patient.gender === 'Other'
        ? 'O'
        : ''
      : '';
  const patientPhoneNo =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.display.split('/')[2]
      : '';
  const patientReferredBy =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.referredByName
      : 'N/a';
  const patientReferredByContactNo =
    patientDetails && patientDetails.patient
      ? patientDetails.patient.referredByContactNumber
      : '';
  const encounterDate =
    props.appointmentSummaryDate && props.appointmentSummaryDate;

  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      {/* <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Patient Information
        </Typography>
        <Divider />
      </Grid> */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2}>
            <Typography variant="h4" style={{ fontWeight: 500 }}>
              Patient Name
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" style={{ color: '#373737' }}>
              {patientName + ' ' + '(' + patientAge + '/' + patientGender + ')'}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h4" style={{ fontWeight: 500 }}>
              Contact No.
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h4">+91 {patientPhoneNo}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h4"
              style={{
                fontWeight: 500,
                textAlign: 'right',
                marginRight: '1rem',
              }}
            >
              Consult Date :
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h4">
              {encounterDate && moment.utc(encounterDate).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          {patientReferredBy && (
            <>
              {' '}
              <Grid item xs={2}>
                <Typography variant="h4" style={{ fontWeight: 500 }}>
                  Referred By
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4">{patientReferredBy}</Typography>
                {/* <Typography variant="h4" style={{color: "#373737"}}>(OncoWin - Clinic)</Typography> */}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
