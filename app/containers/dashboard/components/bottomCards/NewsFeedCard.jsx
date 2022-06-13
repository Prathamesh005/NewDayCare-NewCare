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
    minHeight: 200,
  },
}));

const NewsFeedCard = props => {
  const {} = props;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Fragment>
      <Paper elevation={2} style={{ width: '100%', height: 250 }}>
        <Grid item container xs={12} md={12} className={classes.mainDiv}>
          <Grid item xs={12} md={4} />
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

NewsFeedCard.propTypes = {};
export default compose(
  withConnect,
  withRouter,
)(NewsFeedCard);
