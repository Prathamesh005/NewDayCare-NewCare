import { CardMedia, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { GrayButton } from '../../../components';
import genderIcon from '../../../images/assets/gender.png';
import patientProfile from '../../../images/RectangularPatientProfile.png';
import {
  deleteKeyFromLocalStorage,
  setToLocalStorage,
} from '../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';

const useStyles = makeStyles(theme => ({
  root: {
    //display: 'flex',
    //flexDirection: 'row',
    overflow: 'auto',
    width: 600,
    maxWidth: '100%',
    alignItems: 'center',
    height: '200px',
    cursor: 'pointer',
  },
  avtar: {
    margin: '10px',
    borderRadius: '0px',
    width: 120,
    //minHeight:"110px",
    margin: '0px !important',
    borderRadius: '5px 0px 0px 5px',
  },

  caption: {
    textTransform: 'uppercase',
  },

  card: {
    display: 'block',
    margin: 5,
    height: '105px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: '120px',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      height: '140px',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      height: '130px',
    },
    borderRadius: 0,
    // height: 'auto',
    paddingBottom: 0,
    borderRadius: 8,
    boxShadow: '0px 2px 4px #00000029',
    cursor: 'pointer',
  },

  media: {
    width: '100%',
    height: '100%',
    maxHeight: '105px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      maxHeight: '120px',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      maxHeight: '140px',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      maxHeight: '130px',
    },
    // [theme.breakpoints.up("sm")]: {
    //   //width: 1500
    // },
    // flexBasis: 200,
    padding: '5px 5px 5px 4px',
    // paddingRight:0,
  },
  profileImg: {
    // objectFit: "contain",
    borderRadius: '6px 0px 0px 6px',
  },

  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&.MuiCardContent-root:last-child': {
      padding: '10px 10px 10px 15px',
    },
  },

  cardText: {
    // flex: '1 0 auto',
    // marginBottom: 15,
    // [theme.breakpoints.up('sm')]: {
    //   marginBottom: 0,
    // },
    // width: '100%',
    // paddingRight: '0px !important',
  },

  title: {
    // width: '90%',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 18,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
  },
  subTitle: {
    // width: '90%',
    fontSize: '0.8rem',
    fontWeight: 400,
    color: '#000000',

    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
  },

  searchScreenIcon: {
    fontSize: 18,
    color: '#959595',
    marginRight: 6,
  },

  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    color: '#444444',
    padding: '0px 12px',
    fontSize: '0.9rem',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontWeight: 400,
    marginLeft: 'auto',
    marginRight: 0,
    borderRadius: 5,
    backgroundColor: '#EFEFEF',

    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
    minHeight: 0,
  },
}));

function SearchPatientCard({
  display,
  resourceId,
  first,
  last,
  age,
  gender,
  address,
  image,
  disease,
}) {
  //console.log(display)
  const classes = useStyles();
  const history = useHistory();
  const raiseInvoiceClicked = () => {
    deleteKeyFromLocalStorage('resourceId');
    setToLocalStorage('resourceId', resourceId);
    history.push(ROUTES_CONSTANTS.PATIENT_EVERYTHING);
  };
  return resourceId != undefined ? (
    <Card
      className={classes.card}
      onClick={() => raiseInvoiceClicked()}
      key={uuidv4()}
    >
      <Grid container>
        <Grid item xs={3} sm={4}>
          <CardMedia className={classes.media}>
            <img
              width="100%"
              height="100%"
              className={classes.profileImg}
              src={
                image !== null && image !== undefined
                  ? 'data:image/*;base64,' + image
                  : patientProfile
              }
            />
          </CardMedia>
        </Grid>
        <Grid item xs={9} sm={8}>
          <CardContent className={classes.content}>
            <div className={classes.cardText}>
              <Typography variant="h3" className={classes.title}>
                {first} {last}
              </Typography>
              <Typography variant="body1" className={classes.subTitle}>
                <LocationOnIcon className={classes.searchScreenIcon} />
                <span>{address}</span>
              </Typography>

              <Typography variant="body1" className={classes.subTitle}>
                <img
                  src={genderIcon}
                  alt="Not Found"
                  style={{ marginRight: 6 }}
                />{' '}
                {age} / {gender}
              </Typography>
            </div>
            <CardActions disableSpacing style={{ width: '100%', padding: 0 }}>
              <GrayButton fullWidth={false} className={classes.expand}>
                {disease == null ? '-' : disease}
              </GrayButton>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  ) : (
    ''
  );
}

export default SearchPatientCard;
