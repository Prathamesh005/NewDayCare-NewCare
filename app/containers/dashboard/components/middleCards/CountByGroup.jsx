import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  loadByAgeData,
  useDashboardSlice,
} from '../../../../apis/dashboardApis/dashboardSlice';
import { MessageComponent } from '../../../../components';
import femaleLogo from '../../../../images/assets/Icon awesome-female.png';
import maleLogo from '../../../../images/assets/Icon awesome-male.png';
import MiddleCancerTypeSkelaton from '../../skelatons/MiddleCancerTypeSkelaton';

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

    // "&:last-child":{
    //   padding:"10px 16px"
    // }
  },

  ageDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  textGroup: {
    fontWeight: 'bold',
  },
}));

const CountByGroup = props => {
  //-------------- using thunk ----------------
  useDashboardSlice();
  //-------------- using thunk ----------------
  const { Id } = props;

  const classes = useStyles();
  const [localLoader, setlocalLoader] = useState(false);
  const [AgeData, setAgeData] = useState([]);

  const callLoadByAgeData = async field => {
    const { payload } = await props.loadByAgeData(field);
    if (payload && payload.data) {
      setAgeData(payload.data);
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setAgeData([]);
    }

    setlocalLoader(true);
  };

  useEffect(() => {
    if (Id !== '') {
      let field = {
        id: Id,
      };
      callLoadByAgeData(field);
    }
  }, [Id]);

  const [AgeGroup, setAgeGroup] = useState([]);
  const [MaleCount, setMaleCount] = useState([]);
  const [FemaleCount, setMemaleCount] = useState([]);
  const [totalCount, settotalCount] = useState([]);

  useEffect(() => {
    let AgeGroup = [];
    let MaleCount = [];
    let FemaleCount = [];
    let totalCount = [];

    if (AgeData.length > 0) {
      AgeData.map(val => {
        AgeGroup.push(val.ageGroup);
        MaleCount.push(val.maleCount !== 0 ? Math.round(val.maleCount) : 0);
        FemaleCount.push(
          val.femaleCount !== 0 ? Math.round(val.femaleCount) : 0,
        );
        totalCount.push(val.cancerPatientCount);
      });
    }
    // debugger
    setAgeGroup(AgeGroup);
    setMaleCount(MaleCount);
    setMemaleCount(FemaleCount);
    settotalCount(totalCount);

    return () => {
      setAgeGroup([]);
      setMaleCount([]);
      setMemaleCount([]);
      settotalCount([]);
    };
  }, [AgeData]);

  const state = {
    series: [
      {
        name: 'Female',
        data: FemaleCount,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        // height: 350
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -25,
        style: {
          fontSize: '10px',
          colors: ['#FFA5D2'],
        },
        formatter: function(val) {
          return Math.round(val);
        },
      },
      colors: ['#FFA5D2'],
      xaxis: {
        categories: AgeGroup,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        reversed: true,
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      // noData: {
      //   text: "No Data Available",
      //   align: "center",
      //   verticalAlign: "middle",
      //   style: {
      //     // color: "#000000",
      //     fontSize: "20px",
      //     fontFamily: "Yantramanav, sans-serif"
      //   }
      // },
      grid: {
        // show: false,      // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false, //or just here to disable only x axis grids
          },
        },
        yaxis: {
          lines: {
            show: false, //or just here to disable only y axis
          },
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return Math.round(val);
          },
        },
      },
    },
  };

  const state1 = {
    series: [
      {
        name: 'Male',
        data: MaleCount,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        // height: 350
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 25,
        style: {
          fontSize: '10px',
          colors: ['#A6CEE3'],
        },
        formatter: function(val) {
          return Math.round(val);
        },
      },
      colors: ['#A6CEE3'],
      xaxis: {
        categories: AgeGroup,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: 'center',
          offsetX: -10,
          style: {
            colors: ['#707070'],
            fontSize: '12px',
            fontWeight: '500',
            fontFamily: 'Yantramanav, sans-serif',
          },
        },
        axisBorder: {
          show: false,
        },
      },
      // noData: {
      //   text: "No Data Available",
      //   align: "center",
      //   verticalAlign: "middle",
      //   style: {
      //     // color: "#000000",
      //     fontSize: "20px",
      //     fontFamily: "Yantramanav, sans-serif"
      //   }
      // },
      grid: {
        // show: false,      // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false, //or just here to disable only x axis grids
          },
        },
        yaxis: {
          lines: {
            show: false, //or just here to disable only y axis
          },
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return Math.round(val);
          },
        },
      },
    },
  };

  return (
    <Fragment>
      {localLoader ? (
        <>
          <Card className={classes.card}>
            <CardHeader
              // action={

              // }
              title="Patient Count By Gender And Age Group"
              className={classes.headerCard}
              classes={{
                title: classes.cardTitle,
                action: classes.cardAction,
              }}
            />
            <Divider />
            <CardContent classes={{ root: classes.cardContent }}>
              <div className={classes.ageDiv}>
                <div style={{ marginLeft: 0 }}>
                  <img alt="Not Found" src={femaleLogo} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h4"
                    className={classes.textGroup}
                    gutterBottom
                  >
                    Age
                  </Typography>
                  <Typography
                    variant="h4"
                    className={classes.textGroup}
                    gutterBottom
                  >
                    Group
                  </Typography>
                </div>
                <div>
                  <img alt="Not Found" src={maleLogo} />
                </div>
              </div>

              <div id="chart" style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={250}
                  />
                </div>

                <div style={{ width: '60%' }}>
                  <ReactApexChart
                    options={state1.options}
                    series={state1.series}
                    type="bar"
                    height={250}
                  />
                </div>
              </div>
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
    loadByAgeData: field => dispatch(loadByAgeData(field)),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(CountByGroup);
