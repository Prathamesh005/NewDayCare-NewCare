import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '0',
    borderRight: '2px solid #eeeeee',
    borderBottom: '2px solid #eeeeee',
    backgroundColor: theme.palette.card.main,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: theme.spacing(3),
  },
  expandMore: {},
  expandMoreInverted: {},

  Title: {
    fontSize: '1rem',
    fontWeight: 400,
    color: theme.palette.primary.common,
    opacity: 0.6,
  },
  subtitle: {
    fontSize: '1.2rem',
    color: theme.palette.text.active,
    fontWeight: '500',
  },
  datetitle: {
    fontSize: '0.8rem',
    color: theme.palette.primary.common,
    opacity: 0.6,
    marginLeft: 5,
    fontWeight: 500,
    width: '95%',

    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
    },
  },
}));

const CardDemo = ({ title, value, subTitle }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className={classes.card} elevation={0}>
      {' '}
      {/* minHeight:150 */}
      {/* <CardHeader
        title={
          <div style={{fontSize:"14px", fontWeight:"bold"}}>
              {
                 title
              }
            </div>
            
          }
        subheader={
          <p style={{fontSize:"18px", fontWeight:"bold", color:"#FF3399", marginTop:20}}>
            {
              value
            }
          </p>
          }
      /> */}
      <CardContent style={{ padding: 0 }}>
        <Typography className={classes.Title}>{title}</Typography>
        <Typography
          className={classes.subtitle}
          component={'span'}
          gutterBottom
        >
          {value}
        </Typography>
        <Typography
          className={classes.datetitle}
          noWrap
          component={'span'}
          gutterBottom
        >
          {subTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDemo;
