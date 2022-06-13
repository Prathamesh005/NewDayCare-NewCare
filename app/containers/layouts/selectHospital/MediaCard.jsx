import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getFromLocalStorage } from '../../../utils/localStorageUtils';
import tick from '../../../images/tick.png';
import tickWhite from '../../../images/tickWhite.png';
import { Grid } from '@material-ui/core';
const styles = {
  card: {
    maxWidth: 170,
    // width: 150,
    border: '1px solid #d1d1d1',
    borderRadius: '5px',
    opacity: 1,
    '& .MuiCardActionArea-root': {
      textAlign: '-webkit-center',
      margin: '5px',
    },
    cursor: 'pointer',
  },
  card1: {
    maxWidth: 170,
    // width: 150,
    borderRadius: '5px',
    opacity: 1,
    border: '2px solid #FF5CAD',
    '& .MuiCardActionArea-root': {
      textAlign: '-webkit-center',
      margin: '5px',
    },
    cursor: 'pointer',
  },
  media: {
    height: 60,
    width: 70,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tickSection: {
    marginBottom: '5px',
    textAlign: 'right',
    paddingRight: '5px',
  },
  imageSet: {
    textAlign: 'center',
    paddingBottom: '15px',
  },
  imageSec: {
    objectFit: 'contain',
  },
  nameOrg: {
    fontWeight: 500,
    fontSize: 13,
  },
  locOrg: {
    fontWeight: 400,
    color: '#707070',
  },
  bottom: {
    padding: '10px 5px',
    backgroundColor: '#f4f4f4',
  },
};

function MediaCard(props) {
  const { classes, item } = props;
  const orgName = item.org.split('|')[1].split('/')[0];
  const orgLoc = item.loc.split('/').pop();
  const orgLogoBase64 = item.logo && item.logo.split('|')[1];
  const contentType = item.org.split('|')[0];
  const orgID = item.org.split('|')[0];
  const handleClick = (e, org, loc) => {
    props.handleSelectedHospital({ org, loc });
  };
  // console.log(props.item);
  const selected = getFromLocalStorage('LOC');
  // <img src={selectedFile === null ? "data:image/*;base64," + props.registrationDetailsResult.patient.image : selectedFile} alt="Not Found" height="100px" width="100px" style={{ borderRadius: 50 }} />
  return selected !== props.item.loc ? (
    <Card className={classes.card}>
      <Grid
        container
        onClick={e => handleClick(e, props.item.org, props.item.loc)}
      >
        <Grid item xs={12}>
          <div className={classes.tickSection}>
            <img src={tickWhite} height="15px" width="15px" />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.imageSet}>
            <img
              src={'data:image/*;base64,' + orgLogoBase64}
              height="85px"
              width="70px"
              className={classes.imageSec}
            />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.bottom}>
          <Typography variant="h5" align="center" className={classes.nameOrg}>
            {orgName}
          </Typography>
          <Typography variant="h5" align="center" className={classes.locOrg}>
            {orgLoc}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  ) : (
    <Card className={classes.card1}>
      <Grid
        container
        onClick={e => handleClick(e, props.item.org, props.item.loc)}
      >
        <Grid item xs={12}>
          <div className={classes.tickSection}>
            <img src={tick} height="15px" width="15px" />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.imageSet}>
            <img
              src={'data:image/*;base64,' + orgLogoBase64}
              height="85px"
              width="70px"
              className={classes.imageSec}
            />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.bottom}>
          <Typography variant="h5" align="center" className={classes.nameOrg}>
            {orgName}
          </Typography>
          <Typography variant="h5" align="center" className={classes.locOrg}>
            {orgLoc}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
