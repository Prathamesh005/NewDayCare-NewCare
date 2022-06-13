import React from 'react';
import PageNotFoundSVG from '../../images/404.svg';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES_CONSTANTS } from '../../containers/app/routeConstants';

const useStyles = makeStyles(theme => ({
  ApplyButton: {
    ...theme.typography.button,
    ...theme.palette.button.primary,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      width: '100%',
    },
  },
  NotFoundImg: {
    maxHeight: '50%',
    maxWidth: '50%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%',
      maxWidth: '100%',
    },
  },
}));

export default function PageNotFound() {
  const classes = useStyles();
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
        }}
      >
        <img
          className={classes.NotFoundImg}
          src={PageNotFoundSVG}
          alt="NoFiltersApplied"
        />
        <div style={{ paddingTop: 20, fontSize: 14 }}>
          <Button variant="contained" color="primary">
            <Link
              to={ROUTES_CONSTANTS.DASHBOARD}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
