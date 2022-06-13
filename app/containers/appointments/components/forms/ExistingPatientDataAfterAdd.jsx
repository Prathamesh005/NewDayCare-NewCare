import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import profileImageDefault from '../../../../images/patient_profile.jpg';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  photoBtn: {
    marginLeft: 20,
    background: '#ffffff',
    color: '#000000',
    '&:hover': {
      background: '#f4f4f4',
      opacity: 0.9,
    },
  },
  bottomGrid: {
    backgroundColor: '#F2F5FA',
    padding: '1.2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
}));
function ExistingPatientDataAfterAdd(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    setDetails(props.patientData && props.patientData);
  }, [props.patientData]);
  const nQPatientId =
    details && details.nQPatientId ? details.nQPatientId : null;
  const nqPatientId =
    details && details.nqPatientId ? details.nqPatientId : null;
  const city =
    details &&
    details.display &&
    details.display.split('/')[details.display.split('/').length - 1];
  const patientID = props.patientID && props.patientID;
  const data = {
    firstName: details && details.first,
    lastName: details && details.last,
    dateOfBirth: details && details.birthDate,
    age: details && details.age,
    gender: details && details.gender,
    phone: details && details.phone,
    image: details && details.image,
    city: city,
    contentType: details && details.contentType,
    display: details && details.display,
    email: details && details.email,
    middle: details && details.middle,
    fhirResourceId: patientID,
    nQPatientId: nQPatientId || nqPatientId,
  };
  // console.log("props", props)
  // console.log("details", details)
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <img
              src={
                data.image === '' ||
                data.image === null ||
                data.image === undefined
                  ? profileImageDefault
                  : 'data:image/*;base64,' + data.image
              }
              alt="Not Found"
              height="100px"
              width="100px"
              style={{ borderRadius: 5 }}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.photoBtn}
              onClick={() => props.handleEditPatientData(data)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Patient Name
          </Grid>
          <Grid item xs={8}>
            {data.firstName + ' ' + `${data.lastName ? data.lastName : ''}`}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Date of Birth
          </Grid>
          <Grid item xs={8}>
            {data.dateOfBirth}
            &nbsp; &nbsp; {` (${data.age} years)`}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Gender
          </Grid>
          <Grid item xs={8}>
            {data.gender}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            City/Town/Village
          </Grid>
          <Grid item xs={8}>
            {data.city}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Contact Number
          </Grid>
          <Grid item xs={8}>
            {data.phone}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Patient ID
          </Grid>
          <Grid item xs={8}>
            <b>{nQPatientId || nqPatientId}</b>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ExistingPatientDataAfterAdd;
