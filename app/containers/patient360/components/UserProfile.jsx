/*eslint-disable*/
import { useMediaQuery } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import patientProfile from '../../../images/patient_profile.jpg';
import UserProfileCard from './UserProfileCard';

const useStyles = makeStyles(theme => ({
  gridRoot: {
    width: '100%',
    height: 380,
    marginBottom: 20,
    boxShadow: '0px 2px 4px #00000029',
  },
  card: {
    borderRadius: '0',
    backgroundColor: '#fff',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: 400,
  },
  avatar: {
    backgroundColor: '#c4c4c4',
    width: 100,
    height: 100,
    border: '1px solid #EFEFEF',
    borderRadius: '73px',
    boxShadow: '0px 3px 6px #00000029',
    margin: '15px 0px',
  },
}));

export default function RecipeReviewCard(props) {
  // console.log("RecipeReviewCard",props)

  const classes = useStyles();
  const themes = useTheme();
  const smDown = useMediaQuery(themes.breakpoints.down('sm'));

  const {
    age,
    gender,
    first,
    last,
    addressDetail,
    phone,
    occupation,
    maritalStatus,
    image,
    bloodGroup,
  } = props && props.profile;

  let pstate = '';
  let pcity = '-';

  const b = addressDetail.find(val => val.addressType === null || 'Temp');

  if (b != undefined) {
    if (b.addressType === null || 'Temp') {
      pcity =
        b.city === null
          ? '-'
          : b.city.charAt(0).toUpperCase() + b.city.slice(1);
      pstate =
        b.state === null
          ? ''
          : ', ' + b.state.charAt(0).toUpperCase() + b.state.slice(1);
    }
  }

  return (
    <>
      <Grid container spacing={0} className={classes.gridRoot}>
        <Grid item sm={12} md={12}>
          <Card className={classes.card} elevation={0}>
            <CardHeader
              avatar={
                <Avatar
                  className={classes.avatar}
                  src={
                    image != null
                      ? 'data:image/*;base64,' + image
                      : patientProfile
                  }
                />
              }
              title={`${first != null ? first : ''} ${
                last != null ? last : ''
              }`}
              subheader="(DG123G)"
              classes={{
                title: classes.headerTitle,
                subheader: classes.subtitle,
              }}
            />
          </Card>
        </Grid>
        <Grid item sm={6} md={6}>
          <UserProfileCard
            title="Age/Gender"
            value={`${age ? age : '-'} / ${gender ? gender : '-'}`}
          />
        </Grid>
        <Grid item sm={6} md={6}>
          <UserProfileCard
            title="Blood Group"
            value={bloodGroup ? bloodGroup : '-'}
          />
        </Grid>
        <Grid item sm={6} md={6}>
          <UserProfileCard
            title="Occupation"
            value={occupation != null ? occupation : '-'}
          />
        </Grid>
        <Grid item sm={6} md={6}>
          <UserProfileCard
            title="Contact Info"
            value={phone ? `+91 ${phone}` : '-'}
          />
        </Grid>
        <Grid item sm={6} md={6}>
          <UserProfileCard title="Location" value={`${pcity}${pstate} `} />
        </Grid>
        <Grid item sm={6} md={6}>
          <UserProfileCard
            title="Marital Status"
            value={maritalStatus != null ? maritalStatus.display : '-'}
          />
        </Grid>
      </Grid>
    </>
  );
}
