import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  contactDetails: {
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
    opacity: '0.8',
    backgroundColor: '#F4F4F4',
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
}));
function Footer(props) {
  const classes = useStyles();
  const encounterDate =
    props.appointmentSummaryDate && props.appointmentSummaryDate;
  return (
    !props.headerToggle && (
      <>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid
            item
            xs={8}
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          />
          <Grid
            item
            xs={4}
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                {props.userDetailsForHeader.signature ? (
                  <img
                    src={
                      'data:' +
                      props.userDetailsForHeader.signatureContentType +
                      ';base64,' +
                      props.userDetailsForHeader.signature
                    }
                    alt="signature"
                    height="100px"
                    width="150px"
                  />
                ) : (
                  ''
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  {props.userDetailsForHeader.userName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  (Signature &amp; Stamp)
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.contactDetails}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Powered By nuQare&trade;
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {encounterDate &&
                  moment.utc(encounterDate).format('DD MMM YYYY') && (
                    <Typography
                      variant="body2"
                      style={{
                        fontWeight: 500,
                        color: '#373737',
                        textAlign: 'right',
                      }}
                    >
                      {moment.utc(encounterDate).format('DD MMM YYYY')}
                    </Typography>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  );
}

export default Footer;
