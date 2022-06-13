import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useState, useEffect } from 'react';
import {
  actionsConfig,
  useAdministrationSlice,
} from '../../../../apis/administrationApis/administrationSlice';

import { actionsConfig as globalActionsConfig } from '../../../../apis/globalApis/globalSlice';
import { useLocation } from 'react-router-dom';
import ActiveLicense from '../license/component/ActiveLicense';
const License = React.lazy(() => import('./pages/License'));
const TabList = React.lazy(() => import('./pages/tabsComponent'));
const HospitalInfo = React.lazy(() => import('./pages/hospital/HospitalInfo'));
// import * as qs from 'query-string';
import { connect } from 'react-redux';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    flexGrow: 1,
  },
  leftContainer: {
    minHeight: 220,
  },
  rightContainer: {
    minHeight: 220,
  },
}));

function Hospital(props) {
  useAdministrationSlice();
  const { resetAdministrationStore, resetReducerStore } = props;
  const classes = useStyles();
  // const query = qs.parse(location.search);
  const location = useLocation();
  const [data, setData] = useState('');

  useEffect(() => {
    resetAdministrationStore();
    resetReducerStore();
  }, []);

  useEffect(() => {
    {
      location.state && setData(location.state.licenseData);
    }
  }, [location.state]);

  return (
    <Fragment>
      <div className={classes.mainContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} className={classes.leftContainer}>
            <HospitalInfo />
          </Grid>
          <Grid item xs={12} md={5} className={classes.rightContainer}>
            {data && data.id ? <ActiveLicense /> : <License />}
          </Grid>
          <Grid item xs={12} md={12}>
            <TabList />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => state.Administration;

export function mapDispatchToProps(dispatch) {
  return {
    resetAdministrationStore: () =>
      dispatch(actionsConfig.resetAdministrationStore()),

    resetReducerStore: () => dispatch(globalActionsConfig.resetReducerStore()),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Hospital);
