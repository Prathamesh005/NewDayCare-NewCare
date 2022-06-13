import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  loadByTotalData,
  loadByTotalIncomeData,
  loadByTotalReferralData,
  useDashboardSlice,
} from '../../apis/dashboardApis/dashboardSlice';
import { MessageComponent } from '../../components';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import TopBarSkelaton from './skelatons/TopBarSkelaton';

const TopCard = React.lazy(() => import('./components/topCards/TopCard'));
const CountByCancerType = React.lazy(() =>
  import('./components/middleCards/CountByCancerType'),
);
const CountByGroup = React.lazy(() =>
  import('./components/middleCards/CountByGroup'),
);
const UpcomingCard = React.lazy(() =>
  import('./components/middleCards/UpcomingCard'),
);

const useStyles = makeStyles(theme => ({
  container: {},
}));

const Dashboard = props => {
  //-------------- using thunk ----------------
  useDashboardSlice();
  //-------------- using thunk ----------------
  const classes = useStyles();

  const [localLoader, setlocalLoader] = useState(false);
  const [localIncomeLoader, setlocalIncomeLoader] = useState(false);
  const [localReferralLoader, setlocalReferralLoader] = useState(false);
  const [localappointmentLoader, setlocalappointmentLoader] = useState(false);

  const [appointmentData, setappointmentData] = useState({
    appointmentWeek: '',
    appointmentToday: '',
  });

  const [practitioner, setPractioner] = React.useState({
    resourceId: '',
    display: '',
  });

  useEffect(() => {
    const practitioner = getFromLocalStorage('data');
    setPractioner({
      resourceId: practitioner.userDetails.fhirResourceId,
      display: practitioner.userDetails.display,
    });
  }, []);

  let UpcomingsData =
    props.dashboard &&
    props.dashboard.upcommingData &&
    props.dashboard.upcommingData.data;
  const [ByTotalData, SetByTotalData] = useState([]);
  const [ByTotalIncomeData, SetByTotalIncomeData] = useState([]);
  const [ByTotalReferralData, SetByTotalReferralData] = useState([]);

  const callLoadByTotalData = async field => {
    const { payload } = await props.loadByTotalData(field);
    SetByTotalData(payload.data);
    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      SetByTotalData([]);
    }
    setlocalLoader(true);
  };
  const callLoadByTotalIncomeData = async field => {
    const { payload } = await props.loadByTotalIncomeData(field);
    SetByTotalIncomeData(payload.data);
    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      SetByTotalIncomeData([]);
    }
    setlocalIncomeLoader(true);
  };
  const callLoadByTotalReferralData = async field => {
    const { payload } = await props.loadByTotalReferralData(field);
    SetByTotalReferralData(payload.data);
    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      SetByTotalReferralData([]);
    }
    setlocalReferralLoader(true);
  };

  useEffect(() => {
    if (practitioner.resourceId !== '') {
      let field = {
        id: practitioner.resourceId,
      };

      callLoadByTotalData(field);
      callLoadByTotalIncomeData(field);
      callLoadByTotalReferralData(field);
    }
  }, [practitioner]);

  const [TotalPatientData, setTotalPatientData] = useState({
    bytotalPatient: '',
    bylastWeekPatient: '',
  });

  useEffect(() => {
    // console.log("ByTotalData",ByTotalData)

    let bytotalPatient = '-';
    let bylastWeekPatient = '-';

    if (ByTotalData && ByTotalData.totalPatient !== null) {
      bytotalPatient = ByTotalData.totalPatient;
    }
    if (ByTotalData && ByTotalData.lastWeekPatient !== null) {
      bylastWeekPatient = ByTotalData.lastWeekPatient;
    }
    setTotalPatientData({
      bytotalPatient: bytotalPatient,
      bylastWeekPatient: bylastWeekPatient,
    });

    return () => {
      setTotalPatientData({
        bytotalPatient: '',
        bylastWeekPatient: '',
      });
    };
  }, [ByTotalData]);

  const [TotalIncomeData, setTotalIncomeData] = useState({
    bythisMonthIncome: '',
    bylastWeekIncome: '',
  });

  useEffect(() => {
    // console.log("ByTotalIncomeData",ByTotalIncomeData)

    let bythisMonthIncome = '-';
    let bylastWeekIncome = '-';

    if (ByTotalIncomeData && ByTotalIncomeData.thisMonthIncome !== null) {
      bythisMonthIncome = ByTotalIncomeData.thisMonthIncome;
    }
    if (ByTotalIncomeData && ByTotalIncomeData.lastWeekIncome !== null) {
      bylastWeekIncome = ByTotalIncomeData.lastWeekIncome;
    }
    setTotalIncomeData({
      bythisMonthIncome: bythisMonthIncome,
      bylastWeekIncome: bylastWeekIncome,
    });

    return () => {
      setTotalIncomeData({
        bythisMonthIncome: '',
        bylastWeekIncome: '',
      });
    };
  }, [ByTotalIncomeData]);

  const [TotalReferralData, setTotalReferralData] = useState({
    bytotalRefferals: '',
    bylastWeekRefferals: '',
  });

  useEffect(() => {
    // console.log("ByTotalReferralData",ByTotalReferralData)

    let bytotalRefferals = '-';
    let bylastWeekRefferals = '-';

    if (ByTotalReferralData && ByTotalReferralData.totalRefferals !== null) {
      bytotalRefferals = ByTotalReferralData.totalRefferals;
    }
    if (ByTotalReferralData && ByTotalReferralData.lastWeekRefferals !== null) {
      bylastWeekRefferals = ByTotalReferralData.lastWeekRefferals;
    }
    setTotalReferralData({
      bytotalRefferals: bytotalRefferals,
      bylastWeekRefferals: bylastWeekRefferals,
    });

    return () => {
      setTotalReferralData({
        bythisMonthIncome: '',
        bylastWeekRefferals: '',
      });
    };
  }, [ByTotalReferralData]);

  useEffect(() => {
    // console.log("UpcomingsData",UpcomingsData)

    let appointmentWeek = '-';
    let appointmentToday = '-';

    if (
      UpcomingsData &&
      UpcomingsData.recordCount &&
      UpcomingsData.recordCount !== null
    ) {
      const { thisWeekAppointment, todayAppointment } = UpcomingsData;

      appointmentWeek =
        thisWeekAppointment !== null ? thisWeekAppointment : '-';
      appointmentToday = todayAppointment !== null ? todayAppointment : '-';
    }

    setappointmentData({
      appointmentWeek: appointmentWeek,
      appointmentToday: appointmentToday,
    });

    return () => {
      setappointmentData({
        appointmentWeek: '',
        appointmentToday: '',
      });
    };
  }, [UpcomingsData]);

  return (
    <Fragment>
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item container spacing={4}>
            {localLoader ? (
              <Grid item xs={12} md={3}>
                <TopCard
                  Title={TotalPatientData.bytotalPatient}
                  SubTitle={'Total Patients'}
                  Content={
                    TotalPatientData.bylastWeekPatient + ' Patient Last Week'
                  }
                />
              </Grid>
            ) : (
              <TopBarSkelaton />
            )}
            {localIncomeLoader ? (
              <Grid item xs={12} md={3}>
                <TopCard
                  Title={TotalIncomeData.bythisMonthIncome}
                  SubTitle={'Income This Week'}
                  Content={TotalIncomeData.bylastWeekIncome + ' Last Week'}
                />
              </Grid>
            ) : (
              <TopBarSkelaton />
            )}

            {localReferralLoader ? (
              <Grid item xs={12} md={3}>
                <TopCard
                  Title={TotalReferralData.bytotalRefferals}
                  SubTitle={'Total Referrals'}
                  Content={
                    TotalReferralData.bylastWeekRefferals +
                    ' Referrals Last Week'
                  }
                />
              </Grid>
            ) : (
              <TopBarSkelaton />
            )}

            {localappointmentLoader ? (
              <Grid item xs={12} md={3}>
                <TopCard
                  Title={appointmentData.appointmentWeek}
                  SubTitle={'Appointment This Week'}
                  Content={
                    appointmentData.appointmentToday + ' Appointments Today'
                  }
                />
              </Grid>
            ) : (
              <TopBarSkelaton />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <CountByCancerType Id={practitioner.resourceId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CountByGroup Id={practitioner.resourceId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <UpcomingCard
              Id={practitioner.resourceId}
              setlocalappointmentLoader={setlocalappointmentLoader}
            />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    loadByTotalData: field => dispatch(loadByTotalData(field)),
    loadByTotalIncomeData: field => dispatch(loadByTotalIncomeData(field)),
    loadByTotalReferralData: field => dispatch(loadByTotalReferralData(field)),

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
)(Dashboard);
