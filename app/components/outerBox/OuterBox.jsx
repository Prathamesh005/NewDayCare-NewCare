import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: '#f0f0f0',
  },
  topContainer: {
    backgroundColor: theme.palette.backgroundColor.main,
    padding: '1.5rem',
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

export default function OuterBox(props) {
  const {
    topComponent = null,
    bottomComponent = null,
    mainCss,
    topCss,
    bottomCss,
  } = props;
  const classes = useStyles(props);

  return (
    <Box className={clsx(classes.mainContainer, mainCss && mainCss)}>
      <Paper className={clsx(classes.topContainer, topCss && topCss)}>
        {topComponent}
      </Paper>
      <Box className={clsx(classes.bottomContainer, bottomCss && bottomCss)}>
        {bottomComponent}
      </Box>
    </Box>
  );
}
