import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid, Hidden, Button, Menu, MenuItem } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import { CustomSVG } from '../icons';

const useStyles = makeStyles(theme => ({
  mainTabContainer: {
    height: 95,
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.backgroundColor.main,
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 3),
      height: 'unset',
    },
    [theme.breakpoints.only('md')]: {
      height: 'auto',
      flexWrap: 'wrap',
      flexBasis: '100%',
      padding: theme.spacing(4, 5),
    },
  },
  mainTabArea: {
    height: 60,
    padding: theme.spacing(0, 6),

    [theme.breakpoints.down('sm')]: {
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '100%',
      height: 58,
      padding: theme.spacing(0, 3),
    },
    [theme.breakpoints.only('md')]: {
      height: 'auto',
      width: '100%',
      marginBottom: theme.spacing(4),
    },
  },
  mainTab: {
    height: '100%',
    color: theme.palette.text.extraLight,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    borderRadius: theme.spacing(1),
    border: `0.5px solid ${theme.palette.scroll.dBorder}`,
    '& a': {
      color: theme.palette.text.extraLight,
    },
    [theme.breakpoints.only('md')]: {
      marginLeft: theme.spacing(0),
      width: '100%',
    },
  },
  innerTabAll: {
    padding: theme.spacing(3, 5),
    backgroundColor: theme.palette.primary.main,
  },
  innerTabContainer: {
    padding: theme.spacing(0),
    border: 0,
    [theme.breakpoints.only('md')]: {
      flexGrow: 1,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 95,
      fontSize: 14,
    },
  },
  selectedTab: {
    background: 'none !important',
    color: `${theme.palette.text.primary} !important`,

    '& $innerTab': {
      color: `${theme.palette.text.primary} !important`,
      '&:after': {
        backgroundColor: theme.palette.text.primary,
      },
    },
  },
  innerTab: {
    padding: theme.spacing(0, 3),
    textTransform: 'capitalize',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    color: theme.palette.text.extraLight,
    fontWeight: theme.typography.fontWeightBold,
    height: 45,
    '&:after': {
      content: '""',
      width: '100%',
      height: 4,
      display: 'block',
      position: 'absolute',
      bottom: -3,
      backgroundColor: 'none',
      borderRadius: 5,
    },
  },
  selectOption: {
    ...theme.typography.h5,
    color: theme.palette.text.main,
    padding: theme.spacing(2, 3),
    minHeight: 38,
    '&:not(:last-child)': {
      borderBottom: `1px dashed ${theme.palette.scroll.light}`,
    },
  },
  deviceStatusMenu: {
    width: '100%',
    '& > ul': {
      padding: 0,
    },
  },
  NativeSelect: {
    ...theme.typography.h5,
    width: '100%',
    height: theme.spacing(7),
    border: `0.5px solid ${theme.palette.scroll.dBorder}`,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
    '&:before': {
      borderBottom: 'unset !important',
    },
    '& .MuiSelect-select': {
      paddingLeft: theme.spacing(3),
      '&:focus': {
        background: 'unset',
      },
    },
    '&:after': {
      borderBottom: 'none',
    },
  },
  toggleButtonRoot: {
    [theme.breakpoints.down('sm')]: {
      width: 48,
    },
  },
}));

export default function ScrollSpyTabs({
  options,
  activeState,
  setActiveState,
  handleTabClick,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item className={classes.mainTabArea} id="scrollTabs">
      <Fragment>
        {/* <Hidden smDown> */}
        <ToggleButtonGroup
          value={activeState}
          exclusive
          onChange={(elm, val) => {
            if (val !== activeState) {
              setActiveState(val);
              handleTabClick(val);
            }
            if (val === null) {
              setActiveState(activeState);
            }
          }}
          className={classes.mainTab}
        >
          {options &&
            options.map((option, i) => (
              <ToggleButton
                // key={ln.id}
                value={`scrollTab_${i}`}
                className={classes.innerTabContainer}
                classes={{
                  selected: classes.selectedTab,
                }}
              >
                <div className={classes.innerTab}>{option.text}</div>
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
        {/* </Hidden> */}
        {/* <Hidden mdUp>
          <Button
            // color="inherit"
            className={classes.NativeSelect}
            aria-owns={anchorEl ? 'Options' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            disabled={options && options.length === 0}
          >
            {activeState}
            <CustomSVG
              className={classes.icon}
              // fill={theme.palette.primary.light}
              name="dropdown"
              height="12"
              width="12"
            />
          </Button>
          <Menu
            id="Options"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ paper: classes.deviceStatusMenu }}
          >
            {options &&
              options.map((option, id) => (
                <MenuItem
                  className={classes.selectOption}
                  onClick={() => {
                    setAnchorEl(null);
                    handleTabClick(`scrollTab_${id}`);
                  }}
                  selected={`scrollTab_${id}` === activeState}
                >
                  {option.text}
                </MenuItem>
              ))}
          </Menu>
        </Hidden> */}
      </Fragment>
    </Grid>
  );
}

ScrollSpyTabs.propTypes = {
  // inputProps: PropTypes.object,
  // props: PropTypes.any,
  // placeholder: PropTypes.string,
  // searchInputHandler: PropTypes.func,
};
