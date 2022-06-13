/*
 *
 * LanguageToggle
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  MenuItem,
  Button,
  ClickAwayListener,
  Paper,
  MenuList,
  Popper,
  Grow,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import { CustomSVG } from '../../icons';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

const useStyles = makeStyles(theme => ({
  languageButton: {
    ...theme.typography.h4,
    color: theme.palette.button.secondary.text,
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.button.secondary.border}`,
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      height: 35,
    },
  },
  languageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(3, 0),
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  icon2: {
    marginRight: theme.spacing(1),
    margin: 5,
    width: 66,
    borderRadius: '100%',
    boxShadow: '0px 0px 6px #00000029',
  },
  dropdownIcon: {
    marginLeft: 3,
  },
  dropdownListLi: {
    ...theme.typography.h4,
    minHeight: '40px',
  },
  dropdownListIcon: {
    marginRight: theme.spacing(2),
  },
  langPaper: {
    marginTop: 37,
  },
  langCircle: {
    backgroundColor: theme.palette.text.white,
    cursor: 'pointer',
    height: 30,
    width: 30,
  },
}));

export function LocaleToggle(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setOpen(prevOpen => !prevOpen);
  }

  const handleClose = event => {
    if (
      event &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  const languageSelection = l => {
    props.onLocaleToggle({ target: { value: l } });
    handleClose();
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={classes.languageContainer}>
      <Button
        onClick={handleClick}
        className={clsx({
          [classes.languageButton]: !props.onlyIcon,
          [classes.langCircle]: props.onlyIcon,
        })}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
      >
        {props.locale && (
          <CustomSVG
            className={classes.icon}
            className={clsx({
              [classes.icon]: !props.onlyIcon,
              [classes.icon2]: props.onlyIcon,
            })}
            name={props.locale}
            height="25"
            width="25"
          />
        )}
        {props.locale &&
          !props.onlyIcon &&
          (props.locale === 'de' ? 'Deutsch' : 'English' || 'Select Language')}
        <CustomSVG
          className={classes.dropdownIcon}
          name="dropdown"
          height="15"
          width="15"
          fill={theme.palette.text.dark}
        />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {appLocales.map(l => (
                    <MenuItem
                      key={l}
                      onClick={() => languageSelection(l)}
                      className={classes.dropdownListLi}
                    >
                      <CustomSVG
                        className={classes.dropdownListIcon}
                        name={l}
                        height="18"
                        width="18"
                      />
                      {l === 'de' ? 'Deutsch' : 'English'}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
