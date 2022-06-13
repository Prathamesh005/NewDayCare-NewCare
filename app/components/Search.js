import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import { CustomSVG } from '../../icons';

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.dark, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    minWidth: 230,
    height: 40,
    border: `1px solid ${theme.palette.lineBorderColor.light}`,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    },
    // fontSize: '14px',
    // color: '#9A9A9A'
  },
}));

export default function SearchShortcut({
  inputProps,
  props,
  placeholder,
  searchInputHandler,
}) {
  const classes = useStyles();

  return (
    <div className={classes.search} {...props}>
      <div className={classes.searchIcon}>
        <CustomSVG name="search" height="13" width="13" fill="currentColor" />
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        {...inputProps}
        onChange={searchInputHandler}
      />
    </div>
  );
}

SearchShortcut.propTypes = {
  inputProps: PropTypes.object,
  props: PropTypes.any,
  placeholder: PropTypes.string,
  searchInputHandler: PropTypes.func,
};
