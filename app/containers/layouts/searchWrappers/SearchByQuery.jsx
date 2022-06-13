import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import IconSearch from '../../../images/assets/Search icon.svg';
import { CloseIconButton } from '../../../components';
const useStyles = makeStyles(theme => ({
  paperroot: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 400,
    boxShadow: '0px 2px 4px #00000029',
    borderRadius: '0px 5px 5px 0px',
  },
  paperinput: {
    marginLeft: theme.spacing(3),
    flex: 1,
    '& .MuiInputBase-input': {
      fontWeight: '400',
      fontSize: '1rem',
    },
  },
  iconButton: {
    // background: '#F4F4F4 !important',
    borderRadius: 0,
    padding: 13,
  },
  papericonButton: {
    padding: 2,
    borderRadius: 5,
    marginRight: 15,
    opacity: 0.6,
    background: 'transparent',
    '&:hover': {
      background: '#F4F4F4',
      opacity: 1,
    },
  },
  paperdivider: {
    height: 38,
    margin: 4,
  },
}));

export default function SearchByOuery({ onChange, onClick }) {
  const classes = useStyles();

  const onEnterPress = ev => {
    // console.log(`Pressed keyCode ${ev.key}`);
    if (ev.key === 'Enter') {
      // Do code here
      ev.preventDefault();
    }
  };

  return (
    <>
      <Paper component="form" className={classes.paperroot} elevation={0}>
        <Divider className={classes.paperdivider} orientation="vertical" />

        <IconButton className={classes.iconButton} aria-label="menu" disabled>
          {/* <SearchIcon  /> */}
          <img src={IconSearch} height="21px" width="18px" />
        </IconButton>

        <InputBase
          className={classes.paperinput}
          placeholder="Enter Keyword Here"
          onChange={onChange}
          onKeyPress={onEnterPress}
          inputProps={{ 'aria-label': 'search google maps' }}
        />

        <CloseIconButton
          type="reset"
          aria-label="clear-search"
          className={classes.papericonButton}
          onClick={onClick}
          iconProps={{ style: { fontSize: '27px' } }}
        />
      </Paper>
    </>
  );
}
