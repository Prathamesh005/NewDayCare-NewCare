import React, { Fragment, memo, useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {ROUTES_CONSTANTS} from '../../../../app/routeConstants'
import { useHistory } from 'react-router-dom';
import { loadNotification } from '../../../../../apis/globalApis/globalSlice';
import { getFromLocalStorage } from '../../../../../utils/localStorageUtils';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  iconBtn: {
    padding: 12,
    outline: 'none !important',
    backgroundColor: '#FEF0FF',
    color: '#FF3399',
    border: '1px solid #FF5CAD1A',
    '&:hover': {
      background: '#FEF0FF',
    },
  },
  normalBtn: {
    padding: '0px 15px',
    borderRadius: 17,
    background: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 400,
    // color: 'black',
    border: '0.5px solid #707070',
    '&:hover': {
      background: '#ffffff',
    },
  },
  bottomDiv: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '100%',
    padding: '15px',
    textAlign: 'end',
    border: '2px solid',
    background: '#ffffff',
  },
}));

 function NotificationCard(props) {
  // debugger
  const classes = useStyles();
const history=useHistory()
  const { Icon, title, time, description, name, linksArray, status } = props;

  const myAppointment=async()=>{
    history.push({
      pathname: ROUTES_CONSTANTS.MY_APPOINTMENTS,
    })
    const resourceId = getFromLocalStorage('data').userDetails.fhirResourceId;
    const limit = 20
    const url = ''
    const id = 0
    const { payload } = await props.loadNotification({
      url,
      limit,
      id,
      resourceId,
    });
  }

  const patientEverything=async()=>{
    history.push({
      pathname: ROUTES_CONSTANTS.PATIENT_EVERYTHING,
    })
    const resourceId = getFromLocalStorage('data').userDetails.fhirResourceId;
    const limit = 20
    const url = ''
    const id = 0
    const { payload } = await props.loadNotification({
      url,
      limit,
      id,
      resourceId,
    });
  }

  return (
    <Fragment>
      <Grid container
        style={{
          padding: 15,
          background: `${status === 'InProgress' ? '#FFFFFF' : '#F4F4F4'}`
        }}
      >
        <Grid item xs={12} md={2} lg={2}>
          <IconButton
            aria-label="show 17 new notifications"
            className={classes.iconBtn}
          >
            {/* <Icon style={{ fontSize: '1rem' }} /> */}
            <img src={Icon} style={{ fontSize: '1rem' }} />
          </IconButton>
        </Grid>
        <Grid item container xs={12} md={10} lg={10} spacing={2}>
          <Grid item xs={12} className={classes.centerGrid}>
            <Typography variant="h3" style={{ fontWeight: '500' }}>
              {title}
            </Typography>
            <Typography variant="h4" style={{ fontWeight: '500' }}>
              {time}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3">
              {description}
              </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <Typography variant="h3">{name}</Typography> */}
          </Grid>

          {linksArray && linksArray.length > 0 && linksArray.map((v, i) => {
            return (
              <Grid item xs={6} key={(i + 1).toString()}>
                <Button
                  // variant="contained"
                  className={classes.normalBtn}
                  onClick={v.titleName==='My Appointment'?myAppointment:patientEverything}
                >
                  {v.titleName}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Divider style={{ height: 4 }} />
    </Fragment>
  );
}


const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    loadNotification: payload => dispatch(loadNotification(payload)),
   
    
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

)(NotificationCard);