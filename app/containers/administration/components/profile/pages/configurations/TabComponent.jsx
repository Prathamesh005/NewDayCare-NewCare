import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import {
  actionsConfig,
  useAdministrationSlice,
} from '../../../../../../apis/administrationApis/administrationSlice';
import {
  MessageComponent,
  PageTitleText,
  WhiteCloseIconButton,
} from '../../../../../../components';
import OuterBoxWithTabs from '../../../../../../components/outerBox/OuterBoxWithTabs';
import Billing from './components/billing';
import BlockCalender from './components/blockCalender';
import Organizations from './components/organizations';
import Permissions from './components/permissions';
import SlotManagement from './components/slotManagement';

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
  },
}));

function TabComponent(props) {
  useAdministrationSlice();
  const { tabIndexForConfiguration, resetAdministrationStore } = props;
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    resetAdministrationStore();
  }, []);

  const tabArray = [
    {
      tabName: 'Clinic/Hospitals',
      render: () => {
        return <Organizations />;
      },
    },
    {
      tabName: 'Permissions',
      render: () => {
        return <Permissions />;
      },
    },
    {
      tabName: 'Billing',
      render: () => {
        return <Billing />;
      },
    },
    {
      tabName: 'Slot Management',
      render: () => {
        return <SlotManagement />;
      },
    },
    {
      tabName: 'Block Calender',
      render: () => {
        return <BlockCalender />;
      },
    },
  ];
  return (
    <div className={classes.main}>
      <Grid container>
        <Grid container style={{ marginBottom: 25 }}>
          <Grid item xs sm={4}>
            <PageTitleText>Configurations</PageTitleText>
          </Grid>
          <Grid
            item
            xs
            sm={8}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <WhiteCloseIconButton onClick={() => history.goBack()} />
          </Grid>
        </Grid>

        <OuterBoxWithTabs
          topComponent={tabArray}
          bottomHeight="70vh"
          tabIndex={tabIndexForConfiguration}
        />
      </Grid>
    </div>
  );
}

const mapStateToProps = state => state.Administration;

export function mapDispatchToProps(dispatch) {
  return {
    resetAdministrationStore: () =>
      dispatch(actionsConfig.resetAdministrationStore()),
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
)(TabComponent);
