import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { WhiteCloseIconButton } from '../button';
import { SemiBoldText } from '../typography';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    boxShadow: '0px 0px 6px #00000029',
  },
  topContainer: {},
  bottomContainer: {
    height: props => props && props.bottomHeight,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

export default function OuterBoxPaper(props) {
  const {
    title,
    handleClose,
    hideCloseIcon = false,
    leftContainer = null,
    rightContainer = null,
    bottomComponent = null,
    topCss,
    bottomCss,
    mainCss,
  } = props;
  const classes = useStyles(props);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Paper className={clsx(classes.mainContainer, mainCss && mainCss)}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={smDown ? 4 : 8}
        py={smDown ? 2 : 4}
        className={clsx(classes.topContainer, topCss && topCss)}
      >
        {/* left */}
        <Box display="flex">
          {smDown ? (
            <SemiBoldText variant="h3">{title}</SemiBoldText>
          ) : (
            <Typography variant="h2">{title}</Typography>
          )}
          <Box display="flex">{leftContainer && leftContainer}</Box>
        </Box>

        {/* right */}
        <Box display="flex" alignItems="center">
          <Box display="flex">{rightContainer && rightContainer}</Box>
          {!hideCloseIcon && (
            <Box pl={3}>
              <WhiteCloseIconButton onClick={handleClose} />
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        px={8}
        py={4}
        className={clsx(classes.bottomContainer, bottomCss && bottomCss)}
      >
        {bottomComponent && bottomComponent}
      </Box>
    </Paper>
  );
}
