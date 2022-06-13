import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import nodata from '../../images/nodata.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'transparent',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootContainer: {
    // marginTop: '150px',
  },
  image: {
    height: 128,
  },
  img: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

//NOTE => Always give height to parent component to align div center
export default function NoRecord() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12}>
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignItems="center"
            >
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={nodata} />
              </ButtonBase>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3} style={{ width: '100%' }} />

          <Grid item xs={12} sm={6} style={{ width: '100%' }}>
            <Typography variant="h2" align="center" color="textSecondary">
              No Data Available
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3} style={{ width: '100%' }} />
        </Grid>
      </Container>
    </div>
  );
}
