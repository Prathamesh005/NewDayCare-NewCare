import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChipSet } from '@material/react-chips';
import React from 'react';

const useStyles = makeStyles(theme => ({
  onSelectcircleClass: {
    background: `${theme.palette.chip.selection} !important`,
    color: `${theme.palette.chip.common} !important`,
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    margin: 5,
    borderRadius: '100%',
  },
  circleClass: {
    background: theme.palette.chip.light,
    color: theme.palette.blackShades.d2,
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    margin: 5,
    borderRadius: '100%',
    '&:hover': {
      backgroundColor: theme.palette.chip.light,
    },
    '&:focus': {
      backgroundColor: theme.palette.chip.light,
    },
  },
}));

export function CircularChips(props) {
  const { options = [], selectedChips = [], setSelectedChips } = props;
  const classes = useStyles();

  const onHandleClick = filter => {
    if (selectedChips.includes(filter)) {
      const filterIndex = selectedChips.indexOf(filter);
      const newFilter = [...selectedChips];
      newFilter.splice(filterIndex, 1);
      setSelectedChips(newFilter);
    } else {
      setSelectedChips([...selectedChips, filter]);
    }
  };

  return (
    <ChipSet filter>
      {options.map((ele, index) => {
        return (
          <Chip
            key={(index + 1).toString()}
            id={ele.value}
            label={ele.label}
            className={
              selectedChips.includes(ele.value)
                ? classes.onSelectcircleClass
                : classes.circleClass
            }
            checked={selectedChips.includes(ele.value)}
            onClick={() => onHandleClick(ele.value)}
          />
        );
      })}
    </ChipSet>
  );
}

const useOutlinedChipsStyle = makeStyles(theme => ({
  success: {
    background: `${theme.palette.success.light} !important`,
    border: 'none',
    color: `${theme.palette.success.main} !important`,
  },
  error: {
    background: `${theme.palette.error.light} !important`,
    border: 'none',
    color: `${theme.palette.error.main} !important`,
  },
  warning: {
    background: `${theme.palette.warning.light} !important`,
    border: 'none',
    color: `${theme.palette.warning.main} !important`,
  },
  default: {
    background: `${'rgba(114,114,114,0.1)'} !important`,
    border: 'none',
     color: `${'rgba(114,114,114,1)'} !important`,
  },
}));

export function OutlinedChipsWithStatus(props) {
  const { status = 'success', statusText } = props;
  const classes = useOutlinedChipsStyle();
  let text = '';
  if (status === 'success') {
    text = statusText || 'Success';
  } else if (status === 'error') {
    text = statusText || 'Failed';
  } else if (status === 'warning') {
    text = statusText || 'Inprogress';
  }else if (status === 'default') {
    text = statusText || 'Expired';
  }
  return (
    <>
      <Chip
        variant="outlined"
        label={text}
        color="primary"
        classes={{
          colorPrimary:
            status === 'success'
              ? classes.success
              : status === 'error'
              ? classes.error
              : status === 'warning'
              ? classes.warning
              : status === 'default'
              ? classes.default
              : classes.success,
        }}
      />
    </>
  );
}
