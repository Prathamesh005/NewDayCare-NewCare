import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MessageComponent } from '../../../../components';
import MiddleCancerTypeSkelaton from '../../skelatons/MiddleCancerTypeSkelaton';
import {
  loadByCancerTypeData,
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
    fontSize: '1rem',
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
}));

const CountByCancerType = props => {
  //-------------- using thunk ----------------
  useDashboardSlice();
  //-------------- using thunk ----------------

  const { Id } = props;
  const classes = useStyles();
  const [CancerName, setCancerName] = useState([]);
  const [CancerValue, setCancerValue] = useState([]);
  const [localLoader, setlocalLoader] = useState(false);
  const [CancerTypeData, setCancerTypeData] = useState([]);

  const callLoadByCancerTypeData = async field => {
    const { payload } = await props.loadByCancerTypeData(field);

    if (payload && payload.data) {
      setCancerTypeData(payload.data);
    } else if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
      setCancerTypeData([]);
    }

    setlocalLoader(true);
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
    let name = [];
    let value = [];

    if (CancerTypeData.length > 0) {
      CancerTypeData.map(val => {
        name.push(val.name);
        value.push(val.value);
      });
    }

    setCancerName(name);
    setCancerValue(value);
  }, [CancerTypeData]);

  const state = {
    series: [
      {
        name: 'Count',
        data: CancerValue,
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
          colors: ['#B2DF8A'],
        },
      },
      colors: ['#B2DF8A'],
      xaxis: {
        categories: CancerName,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: CancerTypeData.length > 0 ? true : false,
          align: 'left',
          style: {
            colors: ['#707070'],
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'Yantramanav, sans-serif',
          },
        },
        axisBorder: {
          show: false,
        },
      },
      noData: {
        text: 'No Data Available',
        align: 'center',
        verticalAlign: 'middle',
        style: {
          // color: "#000000",
          fontSize: '20px',
          fontFamily: 'Yantramanav, sans-serif',
        },
      },
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
    },
  };

  return (
    <Fragment>
      {localLoader ? (
        <Card className={classes.card}>
          <CardHeader
            // action={

            // }
            title="Patient Count By Cancer Type"
            className={classes.headerCard}
            classes={{
              title: classes.cardTitle,
              action: classes.cardAction,
            }}
          />
          <Divider />
          <CardContent classes={{ root: classes.cardContent }}>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={450}
            />
          </CardContent>
        </Card>
      ) : (
        <MiddleCancerTypeSkelaton />
      )}
    </Fragment>
  );
};
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    loadByCancerTypeData: field => dispatch(loadByCancerTypeData(field)),
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
)(CountByCancerType);
