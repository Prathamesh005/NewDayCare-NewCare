import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: '#f0f0f0',
    width: 'inherit',
  },
  topContainer: {
    backgroundColor: theme.palette.backgroundColor.main,
    boxShadow: '0px 2px 4px #00000029',
  },
  bottomContainer: {
    padding: '1rem',
    height: props => props && props.bottomHeight,
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: 5,
    border: '1px solid #7070704D',
  },
}));
export default function OuterBoxWithTabs(props) {
  const { topComponent = null, bottomComponent = null, tabIndex } = props;
  const theme = useTheme();
  const classes = useStyles(props);
  const [value, setValue] = React.useState(tabIndex ? tabIndex : 0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={clsx(classes.mainContainer)}>
      <Paper className={clsx(classes.topContainer)}>
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            // variant="fullWidth"
            aria-label="full width tabs example"
            TabIndicatorProps={{
              style: { background: '#FF3399' },
            }}
          >
            {topComponent &&
              topComponent.map((item, index) => (
                <Tab
                  label={item.tabName}
                  key={index.toString()}
                  {...a11yProps(index)}
                />
              ))}
          </Tabs>
        </div>
      </Paper>
      <Box className={clsx(classes.bottomContainer)}>
        {topComponent &&
          topComponent.map((item, index) => (
            <TabPanel
              value={value}
              index={index}
              key={index.toString()}
              style={{ height: '100%' }}
            >
              {item.render()}
            </TabPanel>
          ))}
      </Box>
    </Box>
  );
}
