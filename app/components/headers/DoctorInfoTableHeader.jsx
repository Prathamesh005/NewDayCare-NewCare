import { Avatar, Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { SemiBoldText } from '../index';

const useStyles = makeStyles(theme => ({
  avatarImg: {
    color: theme.palette.button.paginated.color,
    background: theme.palette.backgroundColor.main,
    marginRight: 5,
  },
}));

export function DoctorInfoTableHeader(props) {
  const { name, src, RightSideComponent } = props;
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
    >
      <Box display="flex" alignItems="center">
        {name && (
          <>
            {' '}
            <Avatar alt="" src={src} className={classes.avatarImg} />
            <SemiBoldText variant="h3" component="span">
              {name}
            </SemiBoldText>
          </>
        )}
      </Box>

      <Box>{RightSideComponent}</Box>
    </Box>
  );
}
