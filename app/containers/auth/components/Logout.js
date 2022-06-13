import React, { Fragment } from 'react';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Typography, Hidden, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FormattedMessage } from 'react-intl';
import messages from '../../../translations/messages';
import { Logo } from '../../../components/elements';
import { PrimaryPinkButton } from '../../../components/button';

const useStyles = makeStyles(theme => ({
  loginHeader: ({ loginImageSm }) => ({
    padding: `10% 18% ${theme.spacing(0)}`,
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
    },
  }),
  loginTitle: {
    ...theme.typography.subtitle1,
    color: theme.palette.text.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
      color: theme.palette.text.white,
    },
  },
  loginSubTitle: {
    ...theme.typography.subtitle2,
    marginTop: theme.spacing(2),
    color: theme.palette.text.light,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      fontSize: theme.typography.fontSize,
      color: theme.palette.text.white,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: `20% 8% 0px`, //10% 18% ${theme.spacing(0)}
    // marginTop: '10%',
    backgroundColor: theme.palette.backgroundColor.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 7),
      height: '100%',
      maxHeight: '65%',
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
  loginSection: {
    textAlign: 'left',
    fontWeight: 'bold',
    width: '80%',
    color: theme.palette.primary.main,
    margin: '35px auto 0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: 21,
    },
  },
}));

export default function Logout({ logoPath }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Hidden smDown>
        <div className={classes.container}>
          <Typography
            variant="h4"
            gutterBottom={false}
            className={classes.loginTitle}
            align="left"
          >
            <FormattedMessage {...messages.Auth.signout.logoutText} />.
          </Typography>
          <Typography
            variant="h6"
            className={classes.loginSubTitle}
            align="left"
          >
            <FormattedMessage {...messages.Auth.signout.logoutSubtext} />.
          </Typography>
          <Link to="/" className={classes.linkCss}>
            <PrimaryPinkButton
              variant="contained"
              fullWidth
              style={{ fontSize: 20, boxShadow: 'none', marginTop: 25 }}
            >
              Login
            </PrimaryPinkButton>
          </Link>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.loginSection}>
          <FormattedMessage {...messages.Auth.signout.logoutText} />
        </div>
        <div
          style={{
            textAlign: 'left',
            width: '80%',
            color: '#9A9A9A',
            margin: '10px auto 0 auto',
          }}
        >
          <FormattedMessage {...messages.Auth.signout.logoutSubtext} />.
        </div>
        <Link to="/" className={classes.linkCss}>
          <PrimaryPinkButton
            variant="contained"
            fullWidth
            style={{ fontSize: 20, boxShadow: 'none', marginTop: 25 }}
          >
            Login
          </PrimaryPinkButton>
        </Link>
      </Hidden>
    </Fragment>
  );
}
