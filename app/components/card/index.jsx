import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

export const WhiteCard = withStyles(theme => ({
  root: {
    backgroundColor: 'white',
  },
}))(Card);
