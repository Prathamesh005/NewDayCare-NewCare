import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: 150,
    boxShadow: '0px 0px 4px #00000033',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  cardContent: {
    '&:last-child': {
      padding: '10px 16px',
    },
  },
}));

const TopCard = props => {
  const { Title, SubTitle, Content } = props;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={Title}
        subheader={SubTitle}
        classes={{
          title: classes.cardTitle,
          subheader: classes.subHeader,
        }}
      />
      <Divider />
      <CardContent classes={{ root: classes.cardContent }}>
        {SubTitle === 'Total Patients' && (
          <ArrowUpwardIcon
            style={{ color: '#2ac22a', fontSize: 18, marginRight: 5 }}
          />
        )}
        <Typography
          variant="h4"
          className={classes.title}
          component={'span'}
          gutterBottom
        >
          {Content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TopCard;
