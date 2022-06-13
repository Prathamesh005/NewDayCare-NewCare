import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import {
  makeStyles,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  success: {
    background: theme.palette.utils.success,
  },
  error: {
    background: theme.palette.utils.error,
  },
  info: {
    background: theme.palette.utils.info,
  },
  warning: {
    background: theme.palette.utils.warning,
  },
}));

//NOTE => Place Message component inside
// 1.compose (export default compose(MessageComponent)(Dashboard);)
// 2.use as props for ex props.snackbarShowMessage('Display message','message Type')
// success | error | warning | info

export const MessageComponent = WrappedComponent => {
  return props => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [duration, setDuration] = useState(2000);
    const [severity, setSeverity] = useState('info');
    const classes = useStyles();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const showMessage = (message, severity = 'info', duration = 3000) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: (smDown && 'top') || 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={severity}
            className={classes[severity]}
          >
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};
