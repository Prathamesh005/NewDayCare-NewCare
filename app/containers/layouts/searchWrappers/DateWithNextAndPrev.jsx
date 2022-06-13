import { Fab, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import React from 'react';
const useStyles = makeStyles(theme => ({
  cursorInner: {
    fontSize: '20px',
  },
  cursor: {
    borderRadius: '0px',
    margin: '0px 15px',
    padding: '10px',
    boxShadow: 'none',
    border: 'none',
    height: 40,
    color: '#727272',
    background: 'transparent',
    // '&:focus': {
    //   background: theme.palette.button.primary.color,
    //   color: 'black',
    // },
    '&:hover': {
      background: theme.palette.button.primary.color,
      color: 'black',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#ffffff',
      fontSize: '1rem',
      fontWeight: '400',
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#ffffff',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    '&:focus': {
      background: '#ffffff !important',
    },
    '&:active': {
      background: '#ffffff !important',
    },
    '&:hover': {
      background: '#ffffff !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
    '& ::-webkit-calendar-picker-indicator': {
      marginLeft: 0,
    },
  },
}));

export default function DateWithNextAndPrev({
  handleLeft,
  handleRight,
  value,
  handleDateChange,
}) {
  const classes = useStyles();

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Fab aria-label="add" className={classes.cursor} onClick={handleLeft}>
          <ArrowBackIosIcon className={classes.cursorInner} />
        </Fab>

        <TextField
          id="dateOfBirth"
          name="dateOfBirth"
          className={classes.textField}
          // margin="dense"
          variant="outlined"
          fullWidth
          size="small"
          value={value}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            type: 'date',
            placeholder: 'dd-mm-yyyy',
            className: classes.input1,
            classes: { notchedOutline: classes.noBorder },
          }}
          // inputProps={{
          //   min: moment(new Date()).format('YYYY-MM-DD'),
          // }}
        />
        <Fab aria-label="add" className={classes.cursor} onClick={handleRight}>
          <ArrowForwardIosIcon className={classes.cursorInner} />
        </Fab>
      </div>
    </>
  );
}
