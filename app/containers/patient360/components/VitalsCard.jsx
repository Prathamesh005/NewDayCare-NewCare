import { Card, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';

const useStyles = makeStyles({
  footerActionRight: {
    marginLeft: 'auto',
  },
  expandMore: {
    transition: 'transform 0.5s ease',
  },
  expandMoreInverted: {
    transform: 'rotate(180deg)',
  },
  card: {
    borderRadius: '0',
    backgroundColor: '#fff',
    borderTop: '2px solid #eeeeee',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileImg: {
    // border:"2px solid"
  },
});

const VitalsCard = ({ title, value, date, LocalIcon }) => {
  const newDate = moment(date).format('DD/MM/YYYY');

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={classes.card}>
      {' '}
      {/* minHeight:150 */}
      <div style={{ margin: '5px 10px' }}>
        <Typography
          style={{ fontSize: '0.8rem', fontWeight: 400, color: '#727272' }}
        >
          {title}
        </Typography>
        <Typography style={{ fontSize: '0.9rem', fontWeight: 500 }}>
          {value.value && value.unit
            ? `${value.value} ${value.unit}`
            : value.text && value.display
            ? `${value.text} ${value.display}`
            : '-'}
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            style={{
              fontSize: '0.8rem',
              // marginTop: 5,
              fontWeight: 400,
              color: '#727272',
            }}
          >
            ({newDate !== 'Invalid date' ? newDate : '-'})
          </Typography>

          <div>
            {LocalIcon !== '' && (
              <img
                src={LocalIcon}
                width="15px"
                height="15px"
                className={classes.profileImg}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VitalsCard;
