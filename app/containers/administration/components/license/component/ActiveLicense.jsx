import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState, Fragment } from 'react';
import {
  // PrimaryPinkButton,
  // SecondaryText,
  SemiBoldText,
  SquareIconButton,
  WhitePaper,
  OutlinedChipsWithStatus,
} from '../../../../../components';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';
import ManageLicense from '../../../../../images/assets/manage license.svg';
import LicenseHistory from '../../../../../images/assets/license history.svg';
// import * as qs from 'query-string';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    fontSize: '1rem',
    color: '#727272',
    width: '10rem',
    height: '3rem',
    background: '#F4F4F4',
    margin: '0.9rem',
  },
}));

export default function ActiveLicense() {
  const classes = useStyles();
  const history = useHistory();
  // const query = qs.parse(location.search);
  const location = useLocation();
  const [data, setData] = useState('');
  const status = 'Active';

  useEffect(() => {
    {
      location.state && setData(location.state.licenseData);
    }
  }, [location.state]);

  return (
    <Fragment>
      <WhitePaper className={classes.paper}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '95%' }}>
            <SemiBoldText
              variant="h3"
              style={{ fontSize: '1.1rem', flexGrow: 2 }}
            >
              {data.title}
            </SemiBoldText>
            {status === 'Active' ? (
              <OutlinedChipsWithStatus
                status={'warning'}
                statusText={'Active'}
              />
            ) : status === 'Suspend' ? (
              <OutlinedChipsWithStatus
                status={'default'}
                statusText={'Suspend'}
              />
            ) : status === 'Expired' ? (
              <OutlinedChipsWithStatus
                status={'default'}
                statusText={'Expired'}
              />
            ) : (
              ''
            )}
          </div>

          <Typography variant="h4" style={{ opacity: 0.6, marginBottom: 8 }}>
            {'Expires on 21/04/2022'}
          </Typography>

          <Typography variant="h3" style={{ opacity: 0.8, width: '90%' }}>
            {data.subheader}
          </Typography>

          <div>
            <SquareIconButton
              variant="contained"
              style={{ marginTop: 25 }}
              className={classes.btn}
              onClick={() => {
                history.push({
                  pathname:
                    ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_MANAGE,
                  // search: `?licenseID=${query.licenseID}`,
                  state: { licenseData: data },
                });
              }}
            >
              <img src={ManageLicense} style={{ margin: '0.5rem' }} />
              {'Manage License'}
            </SquareIconButton>
            <SquareIconButton
              variant="contained"
              style={{ marginTop: 25 }}
              className={classes.btn}
              onClick={() => {
                history.push({
                  pathname:
                    ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_HISTORY,
                  // search: `?licenseID=${query.licenseID}`,
                  state: { licenseData: data },
                });
              }}
            >
              <img src={LicenseHistory} style={{ margin: '0.5rem' }} />
              {'License History'}
            </SquareIconButton>
          </div>
        </div>
      </WhitePaper>
    </Fragment>
  );
}
