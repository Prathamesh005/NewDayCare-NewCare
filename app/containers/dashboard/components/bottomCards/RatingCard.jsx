import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles(theme => ({
  headerDiv: {
    padding: 15,
    background: '#F5F5F5',
  },
  mainDiv: {
    padding: 15,
    // minHeight:200
  },
  ratingCss: {
    color: '#FF5CAD',
  },
}));

const RatingCard = props => {
  const {} = props;
  const theme = useTheme();
  const classes = useStyles();

  const [value, setValue] = React.useState(4);

  return (
    <Fragment>
      <Paper elevation={2} style={{ width: '100%', height: 250 }}>
        <Grid item xs={12} md={12} className={classes.headerDiv}>
          <Box component="fieldset" borderColor="transparent">
            <Typography
              variant="h4"
              color="textSecondary"
              className={classes.title}
              gutterBottom
            >
              Overall Rating (23 Ratings)
            </Typography>
            <Rating
              name="simple-controlled"
              size="small"
              classes={{
                root: classes.ratingCss,
              }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </Grid>
        <Grid item container xs={12} md={12} className={classes.mainDiv}>
          <Grid item xs={12} md={4} />
          <Divider variant="middle" orientation="vertical" flexItem />
          <Grid item xs={12} md={7} />
        </Grid>
      </Paper>
    </Fragment>
  );
};
const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(RatingCard);
