/*eslint-disable*/
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  loadPastIllnessData,
  loadPastOtherIllnessData,
} from '../../../apis/globalApis/globalSlice';
import { EPISODE_DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles({
  root: {
    marginBottom: 15,
  },
  CardText: {
    fontSize: '0.95rem',
    fontWeight: '400',
  },
  subDiv: {
    marginTop: 10,
  },
});

function PastHospitalization(props) {
  console.log(props);
  const classes = useStyles();
  const themes = useTheme();
  const {
    pastPertainingIllnessLoader,
    pastPertainingIllnessData,
    pastOtherIllnessLoader,
    pastOtherIllnessData,
  } = props;

  const callLoadPastIllnessData = async field => {
    const { payload } = await props.loadPastIllnessData(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };
  const callLoadPastOtherIllnessData = async field => {
    const { payload } = await props.loadPastOtherIllnessData(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    if (props.Id && props.Id.resourceId) {
      let field = {
        id: props.Id.resourceId,
      };

      callLoadPastIllnessData(field);
      callLoadPastOtherIllnessData(field);
    }
  }, [props.Id]);

  return (
    <>
      <Typography variant="h3" style={{ fontSize: '1rem' }} gutterBottom>
        Past Hospitalization Pertaining To Present Illness :
      </Typography>
      {!pastPertainingIllnessLoader &&
      pastPertainingIllnessData &&
      pastPertainingIllnessData.length > 0 ? (
        <>
          {pastPertainingIllnessData.map((val, index) => {
            return (
              <Card className={classes.root} key={(index + 1).toString()}>
                <CardContent>
                  <Typography
                    variant="h4"
                    component="span"
                    fontWeight={400}
                    className={classes.CardText}
                    gutterBottom
                  >
                    {moment(val.effectiveDateTime)
                      .utc()
                      .format(EPISODE_DATE_FORMAT)}
                  </Typography>

                  <div className={classes.subDiv}>
                    <Typography variant="h4" gutterBottom>
                      {val.description ? val.description : '-'}
                    </Typography>
                  </div>

                  <div className={classes.subDiv}>
                    <Typography
                      variant="h3"
                      component="span"
                      style={{ fontSize: '1rem' }}
                      gutterBottom
                    >
                      {'Note - '}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="span"
                      className={classes.CardText}
                      gutterBottom
                    >
                      {val.note ? val.note : 'N/A'}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        !pastPertainingIllnessLoader && NO_RECORD
      )}
      <Typography variant="h3" style={{ fontSize: '1rem' }} gutterBottom>
        Past Hospitalization Other Illness :
      </Typography>
      {!pastOtherIllnessLoader &&
      pastOtherIllnessData &&
      pastOtherIllnessData.length > 0 ? (
        <>
          {pastOtherIllnessData.map((val, index) => {
            return (
              <Card className={classes.root} key={(index + 1).toString()}>
                <CardContent>
                  <Typography
                    variant="h4"
                    component="span"
                    fontWeight={400}
                    className={classes.CardText}
                    gutterBottom
                  >
                    {moment(val.effectiveDateTime)
                      .utc()
                      .format(EPISODE_DATE_FORMAT)}
                  </Typography>

                  <div className={classes.subDiv}>
                    <Typography variant="h4" gutterBottom>
                      {val.description ? val.description : '-'}
                    </Typography>
                  </div>

                  <div className={classes.subDiv}>
                    <Typography
                      variant="h3"
                      component="span"
                      style={{ fontSize: '1rem' }}
                      gutterBottom
                    >
                      {'Note - '}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="span"
                      className={classes.CardText}
                      gutterBottom
                    >
                      {val.note ? val.note : 'N/A'}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        !pastOtherIllnessLoader && NO_RECORD
      )}
    </>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  // debugger;

  return {
    loadPastIllnessData: id => dispatch(loadPastIllnessData(id)),
    loadPastOtherIllnessData: id => dispatch(loadPastOtherIllnessData(id)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PastHospitalization);
