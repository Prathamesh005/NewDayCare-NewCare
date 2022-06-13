import {
  CircularProgress,
  Hidden,
  TextField,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  actionsConfig,
  doGenerateOtp,
  doLogin,
} from '../../../apis/appApis/appSlice';
import { PrimaryPinkButton, WhiteButton } from '../../../components/button';
import { MessageComponent } from '../../../components';
import EditIcon from '../../../images/editMobile.svg';
import flag from '../../../images/flag.png';
import helpIcon from '../../../images/helpIcon.svg';
import NuquareLogo from '../../../images/newNuquareLoginLogo.png';
import messages from '../../../translations/messages';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../utils/localStorageUtils';
import SelectHospital from '../../layouts/selectHospital';

const useStyles = makeStyles(theme => ({
  innerLogo: {
    position: 'absolute',
    // top: '275px',
    // display: 'flex',
    // flexDirection: 'column',

    width: '55% !important',
    height: '12% !important',
    backgroundImage: `url(${NuquareLogo}) `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80% 47%',
    backgroundPosition: 'center',
    'backdrop-filter': ' blur(5px)',
    background: '#f9f9f9',
  },
  loginHeader: ({ loginImageSm }) => ({
    padding: `10% 8% ${theme.spacing(0)}`,
    minHeight: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 7, 4),
      background: `url(${loginImageSm}) no-repeat ${
        theme.palette.secondary.light
      }`,
      backgroundSize: 'cover',
      backgroundPosition: 'left center',
      // height: '240px'
    },
  }),
  loginTitle: {
    ...theme.typography.subtitle1,
    // marginTop: 'auto',
    marginTop: '20%',
    color: '#000000',
    fontWeight: 'normal',
    fontSize: '40px',
    opacity: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '48px',
      color: '#000000',
      marginTop: '26%',
    },
  },
  loginSubTitle: {
    ...theme.typography.subtitle2,
    marginTop: theme.spacing(1),
    color: '#000000',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      // fontSize: theme.typography.fontSize,
      color: '#000000',
      fontWeight: '400',
    },
    fontSize: '18px',
    fontWeight: '400',
    opacity: 0.7,
    letterSpacing: '0px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: `7% 8% ${theme.spacing(0)}`,
    // minHeight: '60%',
    height: 'calc(69% - 70px)',
    backgroundColor: theme.palette.backgroundColor.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 7),
      flex: 1,
      height: '100%',
    },
  },
  textField: {
    background: '#F4F4F4',
    borderBottom: '0px solid transparent',
    width: '100%',
    borderRadius: '0px 5px 5px 0px',
    '& .MuiInputBase-input': {
      fontSize: '1.1rem',
      fontWeight: '500',
    },
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
  },
  textIcon: {
    background: '#F4F4F4',
    borderRadius: '5px 0px 0px 5px',
  },
  borderBottom: {
    borderBottom: '0px solid transparent',
    outline: 'none !important',
    padding: '5px 0px',
    '&:hover': {
      borderBottom: '0px solid transparent',
      outline: 'none !important',
    },
    '&:focus': {
      borderBottom: '0px solid transparent',
      outline: 'none !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },

  copyright: {
    color: '#000000',
    opacity: 0.5,
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alignRight: {
    display: 'block',
    width: '100%',
    textAlign: 'right',
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 18,
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  left: {
    [theme.breakpoints.down('sm')]: {
      left: 0,
      right: 0,
      width: '95%',
      margin: '0 auto',
    },
  },
  help: {
    position: 'absolute',
    top: 20,
    right: 15,
    fontWeight: 'bold',
    color: '#8d8d8d',
    boxShadow: 'none',
    '&:hover': {
      cursor: 'pointer',
      background: '#F4F4F4',
      color: '#000000',
      boxShadow: 'none',
    },
  },
  helpImg: {
    opacity: 0.5,
    width: '20px',
    height: '20px',
    marginRight: '10px',
    borderRadius: '100%',
    '&:hover': {
      opacity: 1,
    },
  },
  linkCss: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
  },

  flagImg: {
    opacity: 1,
    width: '25px',
    height: '20px',
    // marginRight: '10px',
    background: '#eeeeee',
    borderRadius: '0% !important',
  },
  flagDiv: {
    margin: '0px 0px 0px 20px',
    [theme.breakpoints.down('md')]: {
      margin: '0px 0px 0px 10px',
    },
  },
  otpInput: {
    '&:active': {
      background: '#F4F4F4',
    },
  },
  otpBtn: {
    fontWeight: 'bold',
    color: '#8d8d8d',
    boxShadow: 'none',
    '&:hover': {
      cursor: 'pointer',
      background: '#F4F4F4',
      color: '#000000',
    },
  },
  contactUsText: {
    fontWeight: '500',
    '&:hover': {
      color: '#FF3399',
      cursor: 'pointer',
      // textDecoration: 'underline',
    },
  },
  wrapper: {
    marginBottom: 25,
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Login = props => {
  const { logoPath } = props;
  // useInjectReducer({ key, reducer });
  const classes = useStyles();

  const history = useHistory();
  const [phoneno, setPhoneno] = useState('');
  const [uid, setUid] = useState(uuidv4());
  const [otp, setOtp] = useState('');

  const [isErrorphoneno] = useState(false);
  const [otpField, setOtpField] = useState(false);
  const [focusField, setFocusField] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [openSelectHospital, setOpenSelectHospital] = useState(false);
  const [onShowEdit, setonShowEdit] = useState(false);
  const [onLoader, setonLoader] = useState(false);
  React.useEffect(() => {
    if (
      getFromLocalStorage('checkbox') &&
      getFromLocalStorage('PHONE') !== ''
    ) {
      setPhoneno(getFromLocalStorage('PHONE'));
      setIsChecked(true);
    }
  }, []);

  if (isChecked && phoneno != '') {
    setToLocalStorage('checkbox', isChecked);
  }

  const onFocusField = () => {
    setFocusField(true);
  };

  const onBlurField = () => {
    setFocusField(false);
  };

  useEffect(() => {
    // props.resetStore();
    props.resetReducerStore();
  }, []);

  const callGenerateOtp = async () => {
    setonLoader(true);
    const { payload } = await props.doGenerateOtp({
      phoneno: phoneno,
      uid: uid,
    });
    setonLoader(false);

    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');
      setOtpField(true);
    } else if (payload && payload.message) {
      let m = 'Invalid Phone Number !';
      props.snackbarShowMessage(m, 'error');
    }
  };

  const callDoLogin = async () => {
    setonLoader(true);
    const { payload } = await props.doNewLogin({
      phoneno: phoneno,
      otp: otp,
      uid: uid,
    });
    setonLoader(false);

    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');

      setTimeout(() => {
        setOpenSelectHospital(true);
      }, [2000]);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
  };

  const createOtp = e => {
    e.preventDefault();
    callGenerateOtp();
  };

  const resendOtp = () => {
    callGenerateOtp();
  };

  const submit = e => {
    e.preventDefault();
    callDoLogin();
  };

  const keyPress = e => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  const handleChange = e => {
    setIsChecked(e.target.checked);
  };
  const handleCloseDialog = () => {
    history.push('/');
  };

  const [helpopen, sethelpopen] = React.useState(false);

  const handleClickOpen = () => {
    sethelpopen(true);
  };

  const handleHelpClose = () => {
    sethelpopen(false);
  };

  return !openSelectHospital ? (
    <Fragment>
      <header className={classes.loginHeader}>
        <Hidden smUp>
          <div className={classes.innerLogo} />
        </Hidden>

        <Hidden smDown>
          <Link
            className={classes.linkCss}
            to={{
              pathname: '/helpdesk',
            }}
          >
            <WhiteButton variant="contained" className={classes.help}>
              <img className={classes.helpImg} src={helpIcon} alt="Needelp" />
              Need Help?
            </WhiteButton>
          </Link>
        </Hidden>

        <Typography
          variant="h4"
          gutterBottom={false}
          className={classes.loginTitle}
          align="left"
        >
          Welcome
        </Typography>
        <Typography variant="h6" className={classes.loginSubTitle} align="left">
          Please login to your account
        </Typography>
      </header>

      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={!otpField ? createOtp : submit}
      >
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          style={{ marginBottom: 25 }}
        >
          <Grid item xs={3} sm={3} md={3}>
            <TextField
              id="standard-phoneno-input"
              className={classes.textIcon}
              value={''}
              required
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start" className={classes.flagDiv}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                      +91
                    </span>{' '}
                    &nbsp;
                    <img className={classes.flagImg} src={flag} alt="Needelp" />
                  </InputAdornment>
                ),
                className: classes.borderBottom,
              }}
            />
          </Grid>
          <Grid item xs={9} sm={9} md={9}>
            <TextField
              disabled={otpField}
              id="standard-phoneno-input"
              className={classes.textField}
              value={phoneno}
              onChange={e => {
                let t = e.target.value;
                setPhoneno(t.trim());
              }}
              InputProps={{
                style: {
                  paddingLeft: 15,
                },
                className: classes.borderBottom,

                endAdornment: onShowEdit && otpField && (
                  <InputAdornment
                    position="start"
                    style={{
                      height: 30,
                      width: 35,
                      background: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOtpField(false)}
                  >
                    <img height={20} width={20} src={EditIcon} />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter Phone Number"
              error={isErrorphoneno}
              onKeyPress={keyPress}
              helperText={
                isErrorphoneno ? (
                  <span className={classes.alignRight}>phonenoError</span>
                ) : (
                  ''
                )
              }
              onFocus={() => onFocusField()}
              onBlur={() => onBlurField()}
              onMouseEnter={() => setonShowEdit(true)}
              onMouseLeave={() => setonShowEdit(false)}
            />
          </Grid>
        </Grid>
        {otpField && (
          <OtpInput
            isInputNum={true}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span />}
            inputStyle={{
              // padding:"10px",
              width: '46px',
              height: '46px',
              // margin: "0px 18px 0px 0px",
              border: '1px solid #373737',
              borderRadius: '5px',
              background: '#fff',
              fontWeight: 500,
            }}
            containerStyle={{
              fontWeight: 'bold !important',
              justifyContent: 'space-between',
              marginBottom: 25,
            }}
            focusStyle={{ background: '#F4F4F4', border: '1px solid #707070' }}
            className={classes.otpInput}
            shouldAutoFocus
          />
        )}

        <div className={classes.wrapper}>
          <PrimaryPinkButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              !(
                phoneno &&
                phoneno.length >= 10 &&
                phoneno &&
                phoneno.length <= 10
              ) || onLoader
            }
            style={{ fontSize: 20, boxShadow: 'none' }}
          >
            {!otpField ? 'Generate OTP' : 'Login'}
          </PrimaryPinkButton>

          {onLoader && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>

        {!otpField && (
          <div>
            <span style={{ display: 'contents', fontWeight: '500' }}>
              New to nuQare?&nbsp;
            </span>
            <span
              className={classes.contactUsText}
              onClick={() => history.push('/helpdesk')}
            >
              Contact us for free Demo
            </span>
          </div>
        )}

        <div className={classes.bottomSection}>
          {otpField && (
            <>
              <WhiteButton
                variant="contained"
                onClick={resendOtp}
                className={classes.otpBtn}
                disabled={
                  !(
                    phoneno &&
                    phoneno.length >= 6 &&
                    phoneno &&
                    phoneno.length <= 12
                  )
                }
              >
                Resend OTP
              </WhiteButton>
            </>
          )}
        </div>
      </form>

      <div className={classes.copyright}>
        {moment().format('YYYY')} {' | '}
        <FormattedMessage {...messages.Auth.rightsReservedMessage} />
      </div>
    </Fragment>
  ) : (
    <SelectHospital handleCloseDialog={handleCloseDialog} />
  );
};
const mapStateToProps = state => state.globalNew;

export function mapDispatchToProps(dispatch) {
  return {
    doGenerateOtp: payload => dispatch(doGenerateOtp(payload)),
    doNewLogin: payload => dispatch(doLogin(payload)),
    resetReducerStore: () => dispatch(actionsConfig.resetReducerStore()),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
  MessageComponent,
)(Login);
