import { Button, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/elements';
import { deleteKeyFromLocalStoragePromise } from '../../../utils/localStorageUtils';

const useStyles = makeStyles(theme => ({
  loginHeader: ({ loginImageSm }) => ({
    padding: `10% 16% ${theme.spacing(0)}`,
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
    marginTop: '20%',
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
      marginTop: theme.spacing(1),
      fontSize: theme.typography.fontSize,
      color: theme.palette.text.white,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: `7% 16% ${theme.spacing(0)}`,
    // minHeight: '60%',
    height: 'calc(69% - 70px)',
    backgroundColor: theme.palette.backgroundColor.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 7),
      flex: 1,
      height: '100%',
    },
  },
  LoginformButton: {
    marginTop: theme.spacing(10),
    width: '100%',
    padding: theme.spacing(2, 0),
    textTransform: 'capitalize',
    backgroundColor: theme.palette.button.primary.backgroundColor,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.button.primary.backgroundColor,
    },
    '& a': {
      ...theme.typography.button,
      color: `${theme.palette.button.primary.color} !important `,
      display: 'inline-block',
      width: '100%',
      textDecoration: 'none',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.fontSize,
      },
    },
  },
}));

export default function Signout({ logoPath, loginImageSm }) {
  const classes = useStyles();
  // const { t } = useTranslation();
  useEffect(() => {
    deleteKeyFromLocalStoragePromise('HKTWQ');
  }, []);
  return (
    <Fragment>
      <header className={classes.loginHeader}>
        <Hidden mdUp>
          <Logo md path={logoPath} />
        </Hidden>
        <Hidden smDown>
          <Logo lg path={logoPath} />
        </Hidden>
      </header>
      <div className={classes.container}>
        <Typography
          variant="h4"
          gutterBottom={false}
          className={classes.loginTitle}
          align="left"
        >
          Session Expired
        </Typography>
        <Typography variant="h6" className={classes.loginSubTitle} align="left">
          Don't Worry, you can login below.
        </Typography>
        <Button variant="contained" className={classes.LoginformButton}>
          <Link to="/">Log In</Link>
        </Button>
      </div>
    </Fragment>
  );
}
