import { Tab, Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import RightAdvice from './RightAdvice';
import RightPresciption from './RightPresciption';

const useStyles = makeStyles(theme => ({
  mainDiv: {
    height: '100%',
    overflowY: 'auto',
  },
  mainTab: {
    fontWeight: 'bold',
    color: '#000000',
  },
  active_tabStyle: {
    fontWeight: 'bold',
    color: '#FF3399 !important',
    minWidth: 'auto',
  },
  rootTab: {
    background: '#f7f6f4 !important',
  },
}));

export default function RightSidebarTreatmentPlans() {
  const classes = useStyles();
  const theme = useTheme();

  const [mainIndex1, setMainIndex1] = useState(0);
  const handleMainChange1 = (event, value) => {
    setMainIndex1(value);
  };
  const handleMainChangeIndex1 = index => {
    setMainIndex1(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <AppBar style={{ position: 'sticky', top: 0, zIndex: 1 }} elevation={0}>
        <Tabs
          value={mainIndex1}
          onChange={handleMainChange1}
          variant="fullWidth"
          aria-label="full width tabs example"
          TabIndicatorProps={{ style: { background: '#FF3399' } }}
          classes={{ root: classes.rootTab }}
        >
          <Tab
            {...a11yProps(0)}
            style={{ minWidth: 90 }}
            className={
              mainIndex1 === 0 ? classes.active_tabStyle : classes.mainTab
            }
            label="Advice"
          />
          <Tab
            {...a11yProps(1)}
            style={{ minWidth: 120 }}
            className={
              mainIndex1 === 1 ? classes.active_tabStyle : classes.mainTab
            }
            label="Prescriptions"
          />
        </Tabs>
      </AppBar>

      <div className={classes.mainDiv}>
        <SwipeableViews
          enableMouseEvents
          index={mainIndex1}
          onChangeIndex={handleMainChangeIndex1}
        >
          <TabPanel value={mainIndex1} index={0}>
            <RightAdvice />
          </TabPanel>

          <TabPanel value={mainIndex1} index={1}>
            <RightPresciption />
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
}
