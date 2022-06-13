import React, { useState, useEffect, Fragment } from 'react';
import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { OuterBoxPaper, SemiBoldText } from '../../../../../../components';
import { SquareIconButton } from '../../../../../../components/button';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../../app/routeConstants';
import Ellipse from '../../../../../../images/Ellipse.svg';
import CustomizeLicense from '../../../../../../images/assets/customize license.svg';
import SuspendLicense from '../../../../../../images/assets/suspend license.svg';
import UpgradeLicense from '../../../../../../images/assets/upgrade license.svg';
import CancelReasonDialog from '../../component/suspendDialogbox/DialogBox';

const useStyles = makeStyles(theme => ({
  btn: {
    fontSize: '1rem',
    color: '#727272',
    background: '#FFFFFF',
    width: '12rem',
    height: '4rem',
    boxShadow: '0px 0px 10px #00000029',
    borderRadius: '5px',
    display: 'block',
    margin: '1rem',
    '&:hover': {
      background: '#ffffff',
    },
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  subheader: {
    opacity: 0.8,
    width: '40rem',
    [theme.breakpoints.down('xs')]: {
      width: '22rem',
    },
  },

  scroll: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },
}));

const ManageLicense = () => {
  const classes = useStyles();
  const history = useHistory();
  // const query = qs.parse(location.search);
  const location = useLocation();
  const [data, setData] = useState('');
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const cancelReasonValueSet = [
    { code: '', display: 'reason1', description: '' },
    { code: '', display: 'reason2', description: '' },
  ];

  useEffect(() => {
    {
      location.state && setData(location.state.licenseData);
    }
  }, [location.state]);

  const Close = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL,
      // search: `?licenseID=${query.licenseID}`,
      state: { licenseData: data },
    });
  };

  const BottomComponent = () => {
    return (
      <>
        <CancelReasonDialog
          open={openCancelDialog}
          //   id={cancelAppointmentID}
          options={cancelReasonValueSet}
          cancel={() => setOpenCancelDialog(false)}
          //   onClose={handleSaveClose}
        />

        <Grid container>
          {/* License Info component */}

          <Grid item xs={12} md={9} lg={7}>
            <Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h3">Active License</Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <SemiBoldText variant="h3" style={{ fontSize: '1.1rem' }}>
                    {data.title}
                  </SemiBoldText>
                </Grid>

                <Grid item container spacing={3} xs={12} md={12}>
                  <Grid item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h3" component={'span'}>
                        Activation Date -
                      </Typography>
                      <Typography variant="h3" component={'span'}>
                        12/05/2022
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h3" component={'span'}>
                        Expiry Date -
                      </Typography>
                      <Typography variant="h3" component={'span'}>
                        12/05/2022
                      </Typography>
                    </div>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography variant="h3" className={classes.subheader}>
                    {data.subheader}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <div
                    style={{
                      borderBottom: '1px solid #707070',
                      opacity: 0.4,
                      width: '40rem',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h3"
                    style={{ opacity: 0.8, color: '#404040' }}
                  >
                    Includes:
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12} className={classes.scroll}>
                  <Box style={{ width: '40rem' }}>
                    {data &&
                      data.parameters.map((ele3, index) => {
                        return (
                          <Fragment key={index}>
                            <Grid container spacing={8} alignItems="center">
                              <Grid item xs={1} md={1} lg={1}>
                                <img src={Ellipse} style={{ opacity: 0.6 }} />
                              </Grid>
                              <Grid item xs={5} md={5} lg={5}>
                                <Typography
                                  variant="h3"
                                  style={{ opacity: 0.8 }}
                                >
                                  {ele3.parameter}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} md={6} lg={6}>
                                <Typography
                                  variant="h3"
                                  component={'span'}
                                  style={{ marginRight: '1rem' }}
                                >
                                  -
                                </Typography>
                                <Typography variant="h3" component={'span'}>
                                  120/
                                </Typography>
                                <Typography variant="h3" component={'span'}>
                                  {ele3.price}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Fragment>
                        );
                      })}
                  </Box>
                </Grid>
              </Grid>
            </Fragment>
          </Grid>

          {/* Button components */}

          <Grid item xs={12} md={3} lg={5}>
            <SquareIconButton
              className={classes.btn}
              onClick={() => {
                history.push({
                  pathname:
                    ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_EDIT,
                  //   search: `?licenseID=${query.licenseID}`,
                  state: { licenseData: data },
                });
              }}
            >
              <img src={CustomizeLicense} style={{ margin: '0.5rem' }} />
              Customize License
            </SquareIconButton>

            <SquareIconButton
              className={classes.btn}
              onClick={() => {
                history.push({
                  pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE,
                  //   search: `?licenseID=${query.licenseID}`,
                  state: { licenseData: data },
                });
              }}
            >
              <img src={UpgradeLicense} style={{ margin: '0.5rem' }} />
              Upgrade License
            </SquareIconButton>

            <SquareIconButton
              className={classes.btn}
              onClick={() => {
                setOpenCancelDialog(true);
              }}
            >
              <img src={SuspendLicense} style={{ margin: '0.5rem' }} />
              Suspend License
            </SquareIconButton>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Fragment>
      <OuterBoxPaper
        title={'Manage License Pack'}
        handleClose={Close}
        bottomComponent={BottomComponent()}
        bottomHeight={'75vh'}
      />
    </Fragment>
  );
};

export default ManageLicense;
