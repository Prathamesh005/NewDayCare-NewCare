import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ROUTES_CONSTANTS } from '../../containers/app/routeConstants';
import PageNotFoundSVG from '../../images/403.svg';

const useStyles = makeStyles(theme => ({
  ApplyButton: {
    ...theme.typography.button,
    ...theme.palette.button.primary,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      width: '100%',
    },
  },
}));

const checkVal = (x, r) => {
  let temp;
  if (x && x.includes('session-overview')) {
    temp = 'Session Overview';
  }
  if (x && x.includes('dashboard')) {
    temp = 'Dashboard';
  }
  if (r && r.includes('Dashboard')) {
    temp = ROUTES_CONSTANTS.DASHBOARD;
  }
  if (r && r.includes('Session Overview')) {
    temp = '/session-overview';
  }
  return temp;
};

function AccessDenied({ history }) {
  const redirectToProperUrl = () => {
    // const { resource } = userAccess.access[0];
    // if (document.referrer) {
    //   const res = new URL(document.referrer);
    //   const temp = checkVal(res.pathname, null);
    //   if (resource.includes(temp)) {
    //     window.location.href = res.href;
    //   } else {
    //     const t = checkVal(null, resource[0]);
    //     history.push(t);
    //   }
    // } else {
    //   const t = checkVal(null, resource[0]);
    //   history.push(t);
    // }
    history.push(ROUTES_CONSTANTS.DASHBOARD);
  };
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          padding: '40px',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          color: '#9A9A9A',
        }}
      >
        <div>
          <img
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            src={PageNotFoundSVG}
            alt="NoFiltersApplied"
          />
          <Typography variant="h1">ACCESS DENIED</Typography>
          <br />
          <Typography variant="h3" style={{ width: '100%', margin: 'auto' }}>
            Sorry! You don't have a permission to access this page. <br />
            Please contact the system administrator.
          </Typography>
          <div style={{ paddingTop: 20, fontSize: 14 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToProperUrl}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state.globalNew;

const withConnect = connect(mapStateToProps);
export default compose(
  withConnect,
  withRouter,
)(AccessDenied);
