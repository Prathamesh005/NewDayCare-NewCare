import { Card, makeStyles, Typography } from '@material-ui/core';
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
    boxShadow: '0px 0px 0.7px 0px',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const UserProfileoldCard = ({ title, value }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={classes.card}>
      {' '}
      {/* minHeight:150 */}
      <div style={{ margin: '0px 10px' }}>
        <Typography
          style={{ fontSize: '0.85rem', fontWeight: 500 }}
          noWrap
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          style={{ fontSize: '0.9rem', fontWeight: 500 }}
          noWrap
          gutterBottom
        >
          {value}
        </Typography>
      </div>
    </Card>
  );
};

export default UserProfileoldCard;
