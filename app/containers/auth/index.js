import React from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Container, Hidden, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Login from './components/Login';
import Logout from './components/Logout';
import SessionExpired from './components/SessionExpired';
import logo from '../../images/logo.png';
import NuquareLogo from '../../images/newNuquareLoginLogo.png';
import loginBackground from '../../images/loginBackground.png';

import messages from '../../translations/messages';
import { ROUTES_CONSTANTS } from '../app/routeConstants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    height: '100vh',
  },
  mainWrapper: {
    height: '100%',
  },
  mainContainer: {
    // width: '100vw',
    maxWidth: '100vw',
    padding: '0',
  },
  loginArea: {
    width: '100%',
    height: '100%',
    // textAlign: 'center',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      height: history => history.location.pathname.includes('login') && '90%',
    },
  },
  heightControl: {
    [theme.breakpoints.down('sm')]: {
      height: history =>
        (history.location.pathname.includes('logout') ||
          history.location.pathname.includes('sessionexpired')) &&
        '50%',
    },
  },
  imageArea: {
    backgroundImage: `url(${loginBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundSize: '100% 100%',
    // backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  inner: {
    position: 'relative',
    display: 'flex',
    width: '100% !important',
    height: '85% !important',
    textAlign: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 60,
    color: '#fff',
    letterSpacing: '0px',
    opacity: 1,
    fontWeight: '300px',
    fontFamily: 'normal normal 300 32px/41px Yantramanav !important',
    fontSize: '20px',
  },
  innerLogo: {
    position: 'relative',
    display: 'flex',
    width: '34% !important',
    height: '15% !important',
    flexDirection: 'column',
    top: '275px',
    backgroundImage: `url(${NuquareLogo}) `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '70% 40%',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },

    'backdrop-filter': ' blur(5px)',
    background: 'rgb(255 255 255 / 60%)',
  },
}));

function Auth({ match, history }) {
  const classes = useStyles(history);
  const logoPath = logo;
  const loginImageSm = logo;

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.root}>
        <Grid container className={classes.mainWrapper} direction="row">
          <Grid item xs={12} md={8} className={classes.imageArea}>
            <div className={classes.innerLogo} />

            <div className={classes.inner}>
              {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e, no sea takimata sanctus est */}
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.heightControl}>
            <section className={classes.loginArea}>
              <Switch>
                <Route
                  exact
                  path={ROUTES_CONSTANTS.LOGIN}
                  render={props => (
                    <Login loginImageSm={loginImageSm} logoPath={logoPath} />
                  )}
                />
                <Route
                  exact
                  path={ROUTES_CONSTANTS.LOGOUT}
                  render={props => (
                    <Logout loginImageSm={loginImageSm} logoPath={logoPath} />
                  )}
                />
                <Route
                  exact
                  path="/sessionexpired"
                  render={props => (
                    <SessionExpired
                      loginImageSm={loginImageSm}
                      logoPath={logoPath}
                    />
                  )}
                />
                <Redirect from="/" to={ROUTES_CONSTANTS.LOGIN} />
              </Switch>
            </section>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default withRouter(Auth);
