import React, { Fragment } from 'react';
import { Avatar, Card, CardHeader, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { TIME } from '../../../../utils/constants';

const useStyles = makeStyles({
  card: {
    boxShadow: 'none',
    background: '#F8F8F8',
  },
  cardTitle: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#7f7575',
  },
  headerCard: {
    padding: '10px 17px',
  },
  cardsubheader: {
    // fontSize:"0.9rem",
    // fontWeight:"bold",
    // color:"black"
  },
  cardAction: {
    margin: '0px 0px !important',
  },
});

const UpcomingProfileCard = ({
  time,
  hospitalName,
  name,
  age,
  gender,
  status,
  image,
}) => {
  const classes = useStyles();

  const separators = ['\\+', '-', '\\(', '\\)', '\\*', '/', ':', '\\?'];

  let newHospitalNam = hospitalName
    .filter(function(c) {
      return c.actor.resourceType == 'Location';
    })
    .map(c =>
      c.actor.display !== null
        ? c.actor.display.split(new RegExp(separators.join('|'), 'g'))[0]
        : '',
    );

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              src={'data:image/*;base64,' + image}
              className={classes.avatar}
            />
          }
          action={
            <span style={{ color: '#ff3399' }}>
              {status.length > 0 ? status.display : '-'}
            </span>
          }
          title={
            <>
              <span style={{ marginRight: 10 }}>
                {moment(time)
                  .utc()
                  .format(TIME)}
              </span>{' '}
              <span>{newHospitalNam}</span>
            </>
          }
          subheader={
            <>
              <b style={{ color: 'black', marginRight: 10 }}>{name}</b>{' '}
              <b>
                {age}/{gender[0]}
              </b>
            </>
          }
          className={classes.headerCard}
          classes={{
            title: classes.cardTitle,
            subheader: classes.cardsubheader,
            action: classes.cardAction,
          }}
        />
      </Card>
    </Fragment>
  );
};

export default UpcomingProfileCard;
