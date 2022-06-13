import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

export const ThickHorizontalDivider = withStyles(theme => ({
  root: {
    height: '5px',
  },
}))(Divider);
