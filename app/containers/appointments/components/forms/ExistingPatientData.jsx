import { Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { GrayButton } from '../../../../components/button';
import profileImageDefault from '../../../../images/profile-Image.png';

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
    fontWeight: 400,
    color: '#373737',
    opacity: 0.8,
  },
  sublebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
  },
  bottomGrid: {
    backgroundColor: '#F2F5FA',
    padding: '1.2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
}));
function ExisitingPatientData(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    firstName,
    lastName,
    phone,
    city,
    gender,
    image,
    contentType,
    dateOfBirth,
    age,
  } = props.patientData;
  const patientID = props.patientID;
  const data = {
    ...props.patientData,
    id: props.patientID,
    nQPatientId: props.patientNQId,
  };
  const patientNQId = props.patientNQId;
  const nQPatientId = props.patientData.nQPatientId;
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={4}>
            <img
              src={
                image === '' || image === null || image === undefined
                  ? profileImageDefault
                  : 'data:image/*;base64,' + image
              }
              alt="Not Found"
              height="100px"
              width="100px"
              style={{ borderRadius: 5 }}
            />
          </Grid>

          <Grid item xs={8}>
            <GrayButton
              fullWidth={false}
              onClick={() => props.handleEditPatientData(data)}
              style={{ color: '#727272', float: 'right' }}
            >
              <EditIcon style={{ fontSize: 16, marginRight: 5 }} /> Edit{' '}
            </GrayButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Patient Name :
          </Grid>
          <Grid item xs={8} className={classes.sublebels}>
            {firstName + ' ' + `${lastName ? lastName : ''}`}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Age / Date of Birth :
          </Grid>
          <Grid item xs={8} className={classes.sublebels}>
            {dateOfBirth}
            &nbsp; &nbsp; {` (${age} years)`}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Gender :
          </Grid>
          <Grid item xs={8} className={classes.sublebels}>
            {gender}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            City/Town/Village :
          </Grid>
          <Grid item xs={8} className={classes.sublebels}>
            {city}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.lebels}>
            Contact Number :
          </Grid>
          <Grid item xs={8} className={classes.sublebels}>
            {phone}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component={'span'}
              style={{
                fontWeight: 400,
                color: '#373737',
                opacity: 0.8,
                fontSize: '1rem',
              }}
            >
              Patient ID :
            </Typography>
            <span style={{ fontWeight: 500, fontSize: 20 }}>
              {patientNQId || nQPatientId}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ExisitingPatientData;
