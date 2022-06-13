import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import dqLogo from '../../images/dqLogo.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from "@material-ui/core/Container";
import somthingWrong from '../../images/somthingWrong.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.backgroundColor.primary,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color:theme.palette.text.common,
  },
  toolBar: {
    background: theme.palette.backgroundColor.primary,
    minHeight: theme.spacing(11),
    height: theme.spacing(11),
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },

  rootContainer: {
    marginTop: '150px',
  },
  image: {
    //width: 500,
    height: 128,
  },
  img: {
    //margin: 'auto',
    display: 'block',
    width: '410px',
    height: '250px',
    //maxWidth: '100%',
    //maxHeight: '100%',
  },

  head:{
    textAlign: 'left',
    fontSize: '40px',
    opacity: 1,
    fontWeight: 'medium',
    color:theme.palette.text.error,

  },

  subHead:{
    textAlign: 'left',
    fontSize: '20px',
    opacity: 1,
    fontWeight: 'normal',
    color:theme.palette.text.error,
  },
  Button:{
    color:theme.palette.button.common.color,
    border:'1px solid'+theme.palette.button.common.color
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Toolbar classes={{ root: classes.toolBar }}>
          <Typography variant="h6" className={classes.title}>
            <img src={dqLogo} height="40px" alt="icon" />
          </Typography>
          <Button size="large">Home</Button>
          <Button size="large">Support?</Button>
        </Toolbar>
      </AppBar>

      <div className={classes.rootContainer}>
        <Container maxWidth="md">
          <Grid container spacing={2}  justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} >

            <Grid container spacing={0}  justifyContent="center" alignItems="center">
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={somthingWrong}
                />
              </ButtonBase>
              </Grid>
            </Grid>


            <Grid item xs={12} sm={6} style={{width:'100%'}}>
              <Typography
                component="h1"
                variant="h1"
                align="left"
                color="textPrimary"
                gutterBottom
                className={classes.head}
              >
                There's Something Wrong
              </Typography>
              <Typography
                variant="h5"
                align="left"
                color="textSecondary"
                paragraph
                className={classes.subHead}
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not
                too short so folks don't simply skip over it entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifyContent="left">
                  <Grid item>
                    <Button variant="outlined"   className={classes.Button}>
                      Take Me Back
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
