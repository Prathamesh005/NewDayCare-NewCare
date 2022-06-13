import { Avatar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { CloseIconButton } from '../../../components';
import IconCalender from '../../../images/assets/Icon calendar.svg';
import IconClock from '../../../images/assets/Icon clock.svg';
import { DATE_FORMAT, TIME } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  mainRoot: {
    // height:'100%'
  },
  profileImg: {
    marginLeft: 15,
  },
  icon2: {
    // height:10,
    width: 10,
    margin: '-2px -2px 0px 10px',
  },
  topTexts: {
    margin: '0px 10px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  headerleft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'end',
  },

  iconBtn: {
    borderRadius: 5,
    padding: 2,
    // margin: "3px 10px 3px 10px",
    outline: 'none !important',
    backgroundColor: '#F0F0F0',
    color: '#373737',
  },
  linkCss: {
    textDecoration: 'none',
    color: '#000000DE',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000DE',
    },
  },
}));

export default function Header(props) {
  const { patientDetails, locationState, modalOpen } = props;
  const classes = useStyles();
  const [prevData, setPrevData] = useState({
    first: '',
    last: '',
    age: '',
    gender: '',
    phone: '',
    display: '',
    resourceId: '',
    nQPatientId: '',
    image: '',
  });

  const [prevAddressData, setPrevAddressData] = useState({
    tline: '',
    tcity: '',
    tstate: '',
    tpostalCode: '',
  });

  useEffect(() => {
    if (patientDetails && patientDetails.patient) {
      const {
        first,
        last,
        age,
        gender,
        phone,
        addressDetail,
        display,
        resourceId,
        nQPatientId,
        image,
      } = patientDetails.patient;

      if (addressDetail != null) {
        const a = addressDetail.find(val => val.addressType === null || 'Temp');

        if (a != undefined) {
          if (a.addressType === null || 'Temp') {
            setPrevAddressData({
              ...prevAddressData,
              tline: a.line === null ? '' : a.line,
              tcity: a.city === null ? '' : a.city,
              tstate: a.state === null ? '' : ',' + a.state,
              tpostalCode: a.postalCode === null ? '' : a.postalCode,
            });
          }
        }
      }

      setPrevData({
        ...prevData,
        first: first === null ? '' : first,
        last: last === null ? '' : last,
        age: age === null ? '' : age,
        gender: gender === null ? '' : gender,
        phone: phone === null ? '' : phone,
        display: display === null ? '' : display,
        resourceId: resourceId === null ? '' : resourceId,
        nQPatientId: nQPatientId === null ? '' : nQPatientId,
        image: image === null ? '' : image,
      });
    }

    return () => {
      setPrevData({
        first: '',
        last: '',
        age: '',
        gender: '',
        phone: '',
        display: '',
        resourceId: '',
        nQPatientId: '',
        image: '',
      });

      setPrevAddressData({
        tline: '',
        tcity: '',
        tstate: '',
        tpostalCode: '',
      });
    };
  }, [patientDetails]);
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} md={7} lg={8} className={classes.headerleft}>
          <Avatar
            src={'data:image/*;base64,' + prevData.image}
            className={classes.profileImg}
          />

          <Typography
            variant="h3"
            style={{
              margin: '0px 10px',
              textTransform: 'capitalize',
              fontWeight: 500,
            }}
            component="span"
            gutterBottom
          >
            {prevData.first != '' ? prevData.first + ' ' + prevData.last : '-'}
          </Typography>

          <FiberManualRecordIcon className={classes.icon2} />
          <Typography
            variant="h4"
            className={classes.topTexts}
            color="textSecondary"
            component="span"
            gutterBottom
          >
            {prevData.age === '' ? '-' : prevData.age}
            {'/'}
            {prevData.gender === '' ? '-' : prevData.gender}
          </Typography>

          <FiberManualRecordIcon className={classes.icon2} />
          <Typography
            variant="h4"
            className={classes.topTexts}
            color="textSecondary"
            component="span"
            gutterBottom
          >
            {prevData.phone === '' ? '-' : '+91 ' + prevData.phone}
          </Typography>

          <FiberManualRecordIcon className={classes.icon2} />
          <Typography
            variant="h4"
            className={classes.topTexts}
            color="textSecondary"
            component="span"
            gutterBottom
          >
            {prevAddressData.tcity != '' ? prevAddressData.tcity : '-'}{' '}
            {prevAddressData.tstate != '' ? prevAddressData.tstate : ''}
          </Typography>
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <Grid container className={classes.headerRight}>
            <img src={IconCalender} height={20} alt="Not Found!" />
            <Typography
              variant="h4"
              style={{ margin: '0px 20px', fontWeight: '500' }}
              component="span"
              gutterBottom
            >
              {locationState != undefined
                ? moment
                    .utc(locationState.detaildata.startDateTime)
                    .format(DATE_FORMAT)
                : '00/00/0000'}
            </Typography>
            <img src={IconClock} height={20} alt="Not Found!" />
            <Typography
              variant="h4"
              style={{ margin: '0px 20px', fontWeight: '500' }}
              component="span"
              gutterBottom
            >
              {locationState != undefined
                ? moment
                    .utc(locationState.detaildata.startDateTime)
                    .format(TIME) +
                  '-' +
                  moment.utc(locationState.detaildata.endDateTime).format(TIME)
                : '00:00 PM-00:00 PM'}
            </Typography>

            <Divider orientation="vertical" flexItem />

            <CloseIconButton
              style={{ margin: '3px 10px 3px 10px' }}
              onClick={() => modalOpen(true)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
