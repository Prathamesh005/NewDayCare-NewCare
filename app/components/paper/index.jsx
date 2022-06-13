import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

export const WhitePaper = withStyles(theme => ({
  root: {
    boxShadow: '0px 2px 4px #00000029',
    borderRadius: 5,
  },
}))(Paper);
