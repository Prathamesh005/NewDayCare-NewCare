import React, { Fragment, useState, useEffect } from 'react';
import { Box, Typography, Grid, makeStyles } from '@material-ui/core';
import {
  WhitePaper,
  SemiBoldText,
  SecondaryText,
} from '../../../../../components';
import { PrimaryPinkButton } from '../../../../../components/button';
import Ellipse from '../../../../../images/Ellipse.svg';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';
// import * as qs from 'query-string';

const useStyles = makeStyles(theme => ({
  paperprops: {
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
    width: '20rem',
    borderRadius: '10px',
  },
  boxprops: {
    background: '#F4F4F4',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    borderBottom: '1px solid #707070',
  },
  checkbox: {
    color: '#ff3399',
    fontSize: '1.3rem',
  },
  bottombox: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

const LicenseCard = props => {
  const classes = useStyles();
  const [selectedLicense, setSelectedLicense] = useState('');
  const { data, handleLicense, id, state } = props;
  const history = useHistory();
  // const query = qs.parse(location.search);
  const location = useLocation();

  useEffect(() => {
    {
      location.state && setSelectedLicense(location.state.licenseData);
    }
  }, [location.state]);

  return (
    <Fragment>
      <WhitePaper
        className={classes.paperprops}
        style={{
          border: `${
            !(selectedLicense.id == data.id && !id) && !(id == data.id)
              ? '1px solid #707070'
              : 'solid 1px #FF3399'
          }`,
        }}
        onClick={() => handleLicense(data.id, data)}
      >
        <Box className={classes.boxprops} p={'1rem'}>
          <Grid container>
            <Grid item xs={10} md={11}>
              <SemiBoldText variant="h2">{data.title}</SemiBoldText>
            </Grid>
            <Grid item xs={1} md={1}>
              {!(selectedLicense.id == data.id && !id) && !(id == data.id) ? (
                ''
              ) : (
                <CheckCircleIcon className={classes.checkbox} />
              )}
            </Grid>
          </Grid>
          <SecondaryText variant="h4" style={{ opacity: '0.6' }}>
            Price ₹{data.price}
          </SecondaryText>
          <br />
          <Typography variant="h3" style={{ opacity: '0.8' }}>
            {data.subheader}
          </Typography>
        </Box>

        <Box flexGrow={2} p={'1rem'} className={classes.bottombox}>
          <Typography variant="h3" style={{ opacity: '0.8' }}>
            Includes:
          </Typography>
          <Box pl={3}>
            {data.parameters.map((ele, index) => {
              return (
                <Grid key={index} container spacing={3}>
                  <Grid item xs={1} md={1} lg={1}>
                    <img src={Ellipse} />
                  </Grid>
                  <Grid item xs={7} md={7} lg={7}>
                    <Typography variant="h3" style={{ opacity: '0.8' }}>
                      {ele.parameter}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1} lg={1}>
                    <Typography variant="h3">-</Typography>
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
                    <Typography variant="h3">{ele.price}</Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        </Box>

        <Box p={'1rem'}>
          {!(selectedLicense.id == data.id) ? (
            <PrimaryPinkButton
              style={{ width: '100%' }}
              disabled={!(id == data.id)}
              onClick={() => {
                history.push({
                  pathname:
                    ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_EDIT,
                  //   search: `?licenseID=${id || query.licenseID}`,
                  state: { licenseData: state },
                });
              }}
            >
              Link Licence
            </PrimaryPinkButton>
          ) : (
            ''
          )}
        </Box>
      </WhitePaper>
    </Fragment>
  );
};

export default LicenseCard;
