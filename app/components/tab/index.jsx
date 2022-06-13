import React from 'react';
import { Box, withStyles, Tab, Tabs } from '@material-ui/core';

export function TabPanelBox(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export const SimpleTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    width: '-webkit-fill-available',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(props => (
  <Tabs {...props} TabIndicatorProps={{ style: { background: '#ff3399' } }} />
));

export const SimpleTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    minWidth: 100,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: '#F8F8F8',
    borderRight: '1px solid #70707066',
    '&:hover': {
      color: '#fc81be',
      opacity: 1,
    },
    '&$selected': {
      color: '#373737',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#fc81be',
    },
  },
  selected: {},
  disabled: {
    color: '#444444',
  },
}))(props => <Tab disableRipple {...props} />);
