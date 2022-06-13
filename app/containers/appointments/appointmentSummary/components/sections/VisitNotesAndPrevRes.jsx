import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
}));
function VisitNotesAndPrevRes(props) {
  const classes = useStyles();
  const prevResultArray =
    props && props.prevTestResult && props.prevTestResult
      ? props.prevTestResult.length != 0 &&
        props.prevTestResult.length !== null &&
        props.prevTestResult.length !== undefined
        ? props.prevTestResult.map((item, index) => {
            return {
              nameOfTest:
                item && item.code && item.code.display ? item.code.display : '',
              interpretation: item && item.conclusion ? item.conclusion : '',
              effectiveDateTime:
                item && item.effectiveDateTime ? item.effectiveDateTime : '',
            };
          })
        : ''
      : '';

  // const PrevTumorTestResult = props && props.PrevTumorTestResult && props.PrevTumorTestResult.diagnosticTumorMarkers
  //     ? props.PrevTumorTestResult.diagnosticTumorMarkers.length != 0 && props.PrevTumorTestResult.diagnosticTumorMarkers.length !== null && props.PrevTumorTestResult.diagnosticTumorMarkers.length !== undefined
  //         ? props.PrevTumorTestResult.diagnosticTumorMarkers.map((item, index) => {
  //             return {
  //                 nameOfTest: item && item.code && item.code.display ? item.code.display : "",
  //                 interpretation: item && item.note ? item.note : "",
  //             }
  //         }) : "" : "";
  // const PrevBiospyResult = props && props.PrevBiospyResult && props.PrevBiospyResult.diagnosticProcedures
  //     ? props.PrevBiospyResult.diagnosticProcedures.length != 0 && props.PrevBiospyResult.diagnosticProcedures.length !== null && props.PrevBiospyResult.diagnosticProcedures.length !== undefined
  //         ? props.PrevBiospyResult.diagnosticProcedures.map((item, index) => {
  //             return {
  //                 nameOfTest: item && item.code && item.code.display ? item.code.display : "",
  //                 interpretation: item && item.note ? item.note : "",
  //             }
  //         }) : "" : "";
  const arrayComplete = [...prevResultArray];
  // console.log("AS-prevTestResult", props && props.prevTestResult && props.prevTestResult)
  // console.log("AS-PrevTumorTestResult", props && props.PrevTumorTestResult && props.PrevTumorTestResult)
  // console.log("AS-PrevBiospyResult", props && props.PrevBiospyResult && props.PrevBiospyResult)
  // console.log("ArrayComplete", arrayComplete)
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Previous Test Interpretation
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {arrayComplete &&
            arrayComplete.length != 0 &&
            arrayComplete !== null &&
            arrayComplete !== undefined &&
            arrayComplete.map((item, index) => (
              <Grid item xs={12} key={index.toString()}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  {item.nameOfTest}
                  {item.interpretation && ` - ${item.interpretation}`}{' '}
                  {item.effectiveDateTime &&
                    moment(item.effectiveDateTime).format('YYYY') !== '0001' &&
                    ` - ${moment(item.effectiveDateTime).format('DD-MM-YYYY')}`}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VisitNotesAndPrevRes;
