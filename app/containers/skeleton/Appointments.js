import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      width: '100%',
      margin: theme.spacing(2),
    },
    media: {
      height: 190,
    },

    cardsWrapper: {
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'space-between',
      gridGap: '20px',
      flexWrap: 'wrap',
    },
  }),
);

function Appointment() {
  const classes = useStyles();

  return (
    <Grid item sm={12} xs={12} className={classes.main}>
      <Skeleton animation="wave" variant="text" width="50vw" height={40} />
      <div className={classes.cardsWrapper}>
          {[...Array(4)].map((item, index) => (
                <Card key={index} className={classes.card}>
                  <CardHeader
                    avatar={<Skeleton variant="circle" width={40} height={40} />}
                    title={
                      <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
                    }
                    subheader={<Skeleton height={10} width="40%" />}
                  />
                </Card>
            ))}
      </div>
    </Grid>
  );
}

export default function LabellingCard() {
  return <Appointment />;
}
