import { Snackbar, SnackbarContent, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import CustomSVG from '../../../icons/CustomSVG';

const useStyles = makeStyles(theme => ({
  snackBarSuccess: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.utils.success,
  },
  snackBarInfo: {
    backgroundColor: theme.palette.utils.info,
  },
  snackBarError: {
    backgroundColor: theme.palette.utils.error,
  },
  snackBarWarning: {
    backgroundColor: theme.palette.utils.warning,
  },
  actionIcon: {
    margin: theme.spacing(1),
  },
  actionIconInfo: {
    position: 'absolute',
    left: '0px',
    margin: theme.spacing(0, 1, 0, 4),
  },
}));

export default function ErrorMessageComponent(props) {
  // console.log('ErrorMessageComponent',props)
  const {
    SuccessMessageShow,
    setSuccessMessageShow,
    SuccessMessage,
    ErrorMessageShow,
    setErrorMessageShow,
    ErrorMessage,
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSnackBar, setSnackBar] = useState(false);
  const [errorMessageType, setErrorMessageType] = useState('snackBarInfo');
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');

  const handleSnackBarClose = () => {
    setSnackBar(false);
  };

  // console.log('LocalSuccessMsgShow',LocalSuccessMsgShow)
  const handleError = (SnackBar, MessageType, ErrorMessage) => {
    setSnackBar(SnackBar);
    setErrorMessageType(MessageType);
    setErrorMessage(ErrorMessage);
  };

  useEffect(() => {
    if (SuccessMessage !== undefined) {
      let m = SuccessMessage;
      handleError(true, 'snackBarSuccess', m);
      setTimeout(function() {
        setSuccessMessageShow(false);
      }, 3000);
    }
  }, [SuccessMessageShow, SuccessMessage]);

  useEffect(() => {
    if (ErrorMessage !== undefined) {
      let m = ErrorMessage;
      handleError(true, 'snackBarError', m);
      setTimeout(function() {
        setErrorMessageShow(false);
      }, 3000);
    }
  }, [ErrorMessageShow, ErrorMessage]);

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: (smDown && 'top') || 'bottom',
          horizontal: 'right',
        }}
        open={isSnackBar}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
        classes={{ root: classes.left }}
      >
        <SnackbarContent
          className={classes[errorMessageType]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {errorMessage}
            </span>
          }
          action={[
            <CustomSVG
              key="action-icon"
              name="precitec_info"
              className={classes.actionIconInfo}
              fill={theme.palette.text.white}
              height="23"
              width="23"
              onClick={handleSnackBarClose}
            />,
            <CustomSVG
              key="action-close"
              name="close"
              className={classes.actionIcon}
              fill={theme.palette.text.white}
              height="14"
              width="14"
              onClick={handleSnackBarClose}
            />,
          ]}
        />
      </Snackbar>
    </Fragment>
  );
}
