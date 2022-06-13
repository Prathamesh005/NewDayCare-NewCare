import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { GrayTextInput, GrayButton } from '../../../../../components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonIcon: {
    padding: '1px',
    height: '16px',
    width: '40px',
    minWidth: 'auto',
    minHeight: 'auto',
    border: 'none',
  },
}));

export default function CountInput(props) {
  const classes = useStyles();
  const { onChange, handleArrowClick, ...inputProps } = props;

  return (
    <Box display="flex">
      <GrayTextInput onChange={onChange} type="number" {...inputProps} />
      <Box display="flex" flexDirection="column" ml={1}>
        <GrayButton
          className={classes.buttonIcon}
          onClick={() => handleArrowClick('up')}
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </GrayButton>
        <GrayButton
          className={classes.buttonIcon}
          onClick={() => handleArrowClick('down')}
          style={{ marginTop: '4px' }}
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </GrayButton>
      </Box>
    </Box>
  );
}
