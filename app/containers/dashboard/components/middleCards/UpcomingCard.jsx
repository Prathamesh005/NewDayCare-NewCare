import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { MessageComponent, WhiteIconButton } from '../../../../components';
import expandIcon from '../../../../images/assets/expandIcon.png';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
import MiddleCancerTypeSkelaton from '../../skelatons/MiddleCancerTypeSkelaton';
import UpcomingProfileCard from './UpcomingProfileCard';
import {
  loadByUpcomingsData,
  useDashboardSlice,
} from '../../../../apis/dashboardApis/dashboardSlice';
const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '0px',
    boxShadow: '0px 0px 4px #00000033',
  },
  headerCard: {
    padding: '0px !important',
    height: 40,
    // boxShadow: '0px 1px 2px #00000033',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    display: 'inline',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },
  cardsubheader: {
    fontSize: 14,
    fontWeight: 'bold',
    display: 'inline',
    marginLeft: 10,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },
  cardAction: {
    margin: '0px 0px !important',
  },
  cardContent: {
    background: '#F8F8F8',
    maxHeight: 500,
    minHeight: 500,
    padding: 0,
    // "&:last-child":{
    //   padding:"10px 16px"
    // }
  },

  insideCard: {
    boxShadow: 'none',
  },

  inSideCardContent: {
    background: '#F8F8F8',
    // minHeight: 90,

    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    border: '1px solid #c6c6c6',
    '&:last-child': {
      padding: 5,
    },

    [theme.breakpoints.down('md')]: {
      minHeight: 80,
    },
  },
  insideTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#FF3399',
  },
  insideHeader: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },

  root: {
    flexGrow: 1,
  },
}));

const UpcomimgCard = props => {
  //-------------- using thunk ----------------
  useDashboardSlice();
  //-------------- using thunk ----------------
  const { Id, setlocalappointmentLoader } = props;
  const dashboard = props && props.dashboard;

  let UpcomingsData =
    dashboard && dashboard.upcommingData && dashboard.upcommingData.data;
  let localLoader =
    dashboard && dashboard.upcommingLoader && dashboard.upcommingLoader;

  const classes = useStyles();
  const [InnerCardData, SetInnerCardData] = useState({
    clinicAppointment: '',
    videoConsultancy: '',
    homevisit: '',
  });
  const [ProfileData, SetProfileData] = useState([]);

  const callLoadByCancerTypeData = async field => {
    const { payload } = await props.loadByUpcomingsData(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      UpcomingsData = [];
    }
    setlocalappointmentLoader(true);
  };

  useEffect(() => {
    if (Id !== '') {
      let field = {
        id: Id,
      };
      callLoadByCancerTypeData(field);
    }
  }, [Id]);

  useEffect(() => {
    if (
      UpcomingsData &&
      UpcomingsData.recordCount &&
      UpcomingsData.recordCount !== null
    ) {
      let clinicAppointment = '';
      let videoConsultancy = '';
      let homevisit = '';

      const {
        clinicalAppointment,
        videoConsultation,
        homeVisit,
        cancerPatientAppointments,
      } = UpcomingsData;
      clinicAppointment =
        clinicalAppointment !== null ? clinicalAppointment : '';
      videoConsultancy = videoConsultation !== null ? videoConsultation : '';
      homevisit = homeVisit !== null ? homeVisit : '';

      SetInnerCardData({
        clinicAppointment: clinicAppointment,
        videoConsultancy: videoConsultancy,
        homevisit: homevisit,
      });

      if (
        cancerPatientAppointments !== null &&
        cancerPatientAppointments.length > 0
      ) {
        SetProfileData(cancerPatientAppointments.slice(0, 5));
      } else {
        SetProfileData([]);
      }
    }

    return () => {
      SetInnerCardData({
        clinicAppointment: '',
        videoConsultancy: '',
        homevisit: '',
      });

      SetProfileData([]);
    };
  }, [UpcomingsData]);

  const gotoAppointment = () => {
    props.history.push(ROUTES_CONSTANTS.MY_APPOINTMENTS);
  };

  return (
    <Fragment>
      {!localLoader ? (
        <>
          <Card className={classes.card}>
            <CardHeader
              action={
                <WhiteIconButton onClick={gotoAppointment}>
                  <img src={expandIcon} alt="Not Found !" height="13px" />
                </WhiteIconButton>
              }
              title="Today's Appointments"
              subheader={moment().format('DD/MM/YYYY')}
              className={classes.headerCard}
              classes={{
                title: classes.cardTitle,
                subheader: classes.cardsubheader,
                action: classes.cardAction,
              }}
            />
            <Divider />
            <CardContent classes={{ root: classes.cardContent }}>
              <Grid container>
                <Grid container item style={{ padding: 15 }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card className={classes.insideCard}>
                      <CardContent
                        classes={{ root: classes.inSideCardContent }}
                      >
                        <Typography className={classes.insideTitle}>
                          {InnerCardData.clinicAppointment !== ''
                            ? InnerCardData.clinicAppointment
                            : '-'}
                        </Typography>
                        <Typography
                          className={classes.insideHeader}
                          color="textSecondary"
                        >
                          {'Clinic Appointment'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card className={classes.insideCard}>
                      <CardContent
                        classes={{ root: classes.inSideCardContent }}
                      >
                        <Typography className={classes.insideTitle}>
                          {InnerCardData.videoConsultancy !== ''
                            ? InnerCardData.videoConsultancy
                            : '-'}
                        </Typography>
                        <Typography
                          className={classes.insideHeader}
                          color="textSecondary"
                        >
                          {'Video Consultancy'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card className={classes.insideCard}>
                      <CardContent
                        classes={{ root: classes.inSideCardContent }}
                      >
                        <Typography className={classes.insideTitle}>
                          {InnerCardData.homevisit !== ''
                            ? InnerCardData.homevisit
                            : '-'}
                        </Typography>
                        <Typography
                          className={classes.insideHeader}
                          color="textSecondary"
                        >
                          {'Home Visit'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {ProfileData.length > 0 &&
                  ProfileData.map((val, i) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={12}
                        style={{ borderBottom: '10px solid #EBEBEB' }}
                        key={(i + 1).toString()}
                      >
                        <UpcomingProfileCard
                          time={val.startDateTime ? val.startDateTime : ''}
                          image={
                            val.cancerPatient.image
                              ? val.cancerPatient.image
                              : ''
                          }
                          hospitalName={val.participants}
                          name={`${
                            val.cancerPatient.first
                              ? val.cancerPatient.first
                              : ''
                          }  ${
                            val.cancerPatient.last ? val.cancerPatient.last : ''
                          } `}
                          age={
                            val.cancerPatient.age ? val.cancerPatient.age : ''
                          }
                          gender={
                            val.cancerPatient.gender
                              ? val.cancerPatient.gender
                              : ''
                          }
                          status={val.serviceType.length > 0}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </CardContent>
          </Card>
        </>
      ) : (
        <MiddleCancerTypeSkelaton />
      )}
    </Fragment>
  );
};
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    loadByUpcomingsData: field => dispatch(loadByUpcomingsData(field)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  MessageComponent,
)(UpcomimgCard);
