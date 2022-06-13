import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { valueSetSearch } from '../../../../apis/globalApis/globalSlice';
import AutoCompleteField from '../../../layouts/formTemplate/AutoCompleteField';
import Model from './ScoresComprehensiveAssessment';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  centerGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  calculateBtn: {
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    // marginBottom:40,
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
}));

function ScoresForm(props) {
  // console.log(props);
  const {
    Option,
    SET_SCORE_INITIAL_STATE,
    Id,
    loginDetail,
    generalExaminationData,
    cancerGeriatricAssResultStore,
    cancerGeriatricAssessmentResult,
  } = props;

  const classes = useStyles();
  const [EcogData, setEcogData] = React.useState([]);
  const [kSData, setkSData] = React.useState([]);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/ValueSet/ecog-vs',
    });
    setEcogData(payload && payload.message ? [] : payload);
  };

  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    let ecogScore = '';
    let kScore = '';
    let kScoreCheck = false;

    let ecogScoreId = uuidv4();
    let kScoreId = uuidv4();

    if (
      generalExaminationData &&
      generalExaminationData.recordCount !== undefined &&
      generalExaminationData.recordCount != null
    ) {
      const {
        eCOGPerformanceStatus,
        karnofskyPerformanceStatus,
      } = generalExaminationData;

      ecogScore =
        eCOGPerformanceStatus && eCOGPerformanceStatus.valueInteger != null
          ? eCOGPerformanceStatus.valueInteger
          : '';
      kScore =
        karnofskyPerformanceStatus &&
        karnofskyPerformanceStatus.valueInteger != null
          ? karnofskyPerformanceStatus.valueInteger
          : '';

      kScoreCheck =
        karnofskyPerformanceStatus &&
        karnofskyPerformanceStatus.valueInteger != null;

      if (eCOGPerformanceStatus && eCOGPerformanceStatus.resourceId != null) {
        ecogScoreId = eCOGPerformanceStatus.resourceId;
      }
      if (
        karnofskyPerformanceStatus &&
        karnofskyPerformanceStatus.resourceId != null
      ) {
        kScoreId = karnofskyPerformanceStatus.resourceId;
      }
    }

    const INITIAL_FORM_STATE = {
      kScore: { code: 0, display: kScore },
      ecogScore: { code: 0, display: ecogScore },
      kScoreCheck: kScoreCheck,

      ecogScoreId: ecogScoreId,
      kScoreId: kScoreId,
    };

    SET_SCORE_INITIAL_STATE(INITIAL_FORM_STATE);

    return () => {};
  }, [generalExaminationData]);

  useEffect(() => {
    function generateValue() {
      var res = [];
      for (var i = 0; i < 100; i += 10) {
        res.push(i);
      }
      return res;
    }

    var result = generateValue();
    let res = [];

    result.forEach(val => {
      res.push({ id: val, display: `${val}` });
    });

    setkSData(res);
  }, []);

  const [showResultPage, setshowResultPage] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(Option.values.ecogScore);
  return (
    <Fragment>
      <Grid item container xs={12} spacing={4}>
        <Grid item xs={12} md={1} className={classes.lebels}>
          ECOG
        </Grid>
        <Grid item xs={12} md={3} className={classes.centerGrid}>
          <AutoCompleteField
            id="ecogScore"
            size="small"
            options={EcogData && EcogData.length !== 0 ? EcogData : []}
            label="Score"
            name="ecogScore"
            val={Option.values.ecogScore}
            code="code"
            display="display"
          />
        </Grid>

        {Option.values.kScoreCheck && (
          <>
            <Grid item xs={12} md={1} className={classes.lebels}>
              K Score
            </Grid>
            <Grid item xs={12} md={3} className={classes.centerGrid}>
              <AutoCompleteField
                id="kScore"
                size="small"
                options={kSData && kSData.length !== 0 ? kSData : []}
                label="Score"
                name="kScore"
                val={Option.values.kScore}
                code="id"
                display="display"
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid item container xs={12}>
        {Option.values.age >= 60 && (
          <>
            <Grid item xs={12} md={2} style={{ fontWeight: 400 }}>
              <div>Comprehensive</div> Geriatric Assessment
            </Grid>

            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Button
                variant="contained"
                className={classes.calculateBtn}
                // onClick={()=>setQuestionShow(!questionShow)}
                onClick={handleClickOpen}
              >
                Calculate Score
              </Button>
            </Grid>

            <Grid item xs={12} md={2} className={classes.lebels}>
              {showResultPage
                ? `Total Score = ${cancerGeriatricAssResultStore} points`
                : cancerGeriatricAssessmentResult &&
                  cancerGeriatricAssessmentResult.value
                ? `Previous Total Score = ${
                    cancerGeriatricAssessmentResult.value
                  } points`
                : ''}
            </Grid>
            <Grid item xs={12} md={6} className={classes.lebels}>
              {showResultPage
                ? cancerGeriatricAssResultStore <= 14 &&
                  'A score of 14 or low indicates a need to undergo full geriatric evaluation.'
                : cancerGeriatricAssessmentResult &&
                  cancerGeriatricAssessmentResult &&
                  cancerGeriatricAssessmentResult.value <= 14
                ? 'A score of 14 or low indicates a need to undergo full geriatric evaluation.'
                : ''}
            </Grid>
          </>
        )}
      </Grid>

      {open && (
        <Model
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          Id={Id}
          patientInfo={loginDetail}
          setshowResultPage={setshowResultPage}
        />
      )}
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ScoresForm);
