import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import { isArray } from 'lodash';

const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
  subHeadingStyle: { fontWeight: 500, color: '#373737' },
}));
function Diagnosis(props) {
  const classes = useStyles();
  // const finalChoices = [
  //     { key: "Suspected", value: "unconfirmed" },
  //     { key: "Provisional", value: "provisional" },
  //     { key: "Final Diagnosis", value: "confirmed" },
  // ]
  const verify =
    props &&
    props.diagnosisData &&
    props.diagnosisData.diagnosisCondition &&
    props.diagnosisData.diagnosisCondition.verificationStatus &&
    props.diagnosisData.diagnosisCondition.verificationStatus.display;
  // const status = finalChoices.find(item => item.value === verify)
  const cancerType =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.code
        ? props.diagnosisData.diagnosisCondition.code.display
        : ''
      : '';
  const cancerCode =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.code
        ? props.diagnosisData.diagnosisCondition.code.text
        : ''
      : '';
  const bodySideWithLaterality = props &&
    props.diagnosisData &&
    props.diagnosisData.diagnosisCondition &&
    props.diagnosisData.diagnosisCondition.bodySideWithLaterality &&
    props.diagnosisData.diagnosisCondition.bodySideWithLaterality &&
    props.diagnosisData.diagnosisCondition.bodySideWithLaterality.length >
    0 && {
    bodySite:
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .bodySite &&
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .bodySite.display,
    laterality:
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .laterality &&
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .laterality.display,
  };
  const grade =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.grade
        ? props.diagnosisData.diagnosisCondition.grade.display
        : ''
      : '';
  const tnm =
    props && props.diagnosisData && props.diagnosisData.tNMClinicalStageGroup
      ? 'Clinical'
      : props.diagnosisData.tNMPathologicalStageGroup
        ? 'Pathological'
        : props.diagnosisData.tNMPostTherapyStageGroup
          ? 'Post Therapy'
          : '';
  let tcategory = '';
  let ncategory = '';
  let mcategory = '';
  if (tnm === 'Clinical') {
    (tcategory = 'tNMClinicalPrimaryTumorCategory'),
      (ncategory = 'tNMClinicalRegionalNodesCategory'),
      (mcategory = 'tNMClinicalDistantMetastasesCategory');
  } else if (tnm === 'Pathological') {
    (tcategory = 'tNMPathologicalPrimaryTumorCategory'),
      (ncategory = 'tNMPathologicalRegionalNodesCategory'),
      (mcategory = 'tNMPathologicalDistantMetastasesCategory');
  } else if (tnm === 'Post Therapy') {
    (tcategory = 'tNMPostTherapyPrimaryTumorCategory'),
      (ncategory = 'tNMPostTherapyRegionalNodesCategory'),
      (mcategory = 'tNMPostTherapyDistantMetastasesCategory');
  }
  const tumor =
    props &&
      props.diagnosisData &&
      props.diagnosisData[`${tcategory}`] &&
      props.diagnosisData[`${tcategory}`].value &&
      props.diagnosisData[`${tcategory}`].value.display
      ? props.diagnosisData[`${tcategory}`].value.display.split(':')[0]
      : '';
  const node =
    props &&
      props.diagnosisData &&
      props.diagnosisData[`${ncategory}`] &&
      props.diagnosisData[`${ncategory}`].value &&
      props.diagnosisData[`${ncategory}`].value.display
      ? props.diagnosisData[`${ncategory}`].value.display.split(':')[0]
      : '';
  const metastasis =
    props &&
      props.diagnosisData &&
      props.diagnosisData[`${mcategory}`] &&
      props.diagnosisData[`${mcategory}`].value &&
      props.diagnosisData[`${mcategory}`].value.display
      ? props.diagnosisData[`${mcategory}`].value.display.split(':')[0]
      : '';
  const psa =
    props &&
    props.diagnosisData &&
    props.diagnosisData.tumorMarkers &&
    props.diagnosisData.tumorMarkers.length > 0 &&
    props.diagnosisData.tumorMarkers[0]['valueQuantity'] &&
    props.diagnosisData.tumorMarkers[0]['valueQuantity']['value'] &&
    `${props.diagnosisData.tumorMarkers[0]['valueQuantity']['value']}${props
      .diagnosisData.tumorMarkers[0]['valueQuantity']['unit'] &&
    ` ${props.diagnosisData.tumorMarkers[0]['valueQuantity']['unit']}`}`;
  const staging =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.stage
        ? props.diagnosisData.diagnosisCondition.stage.length != 0
          ? props.diagnosisData.diagnosisCondition.stage[0].summary
            ? props.diagnosisData.diagnosisCondition.stage[0].summary.display
              ? props.diagnosisData.diagnosisCondition.stage[0].summary.display
              : ''
            : ''
          : ''
        : ''
      : '';
  const histologyMorphologyBehaviour =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData &&
        props.diagnosisData.diagnosisCondition.histologyMorphologyBehaviour
        ? props.diagnosisData &&
          props.diagnosisData.diagnosisCondition.histologyMorphologyBehaviour
            .display
          ? props.diagnosisData &&
          props.diagnosisData.diagnosisCondition.histologyMorphologyBehaviour
            .display
          : ''
        : ''
      : '';
  const note =
    props &&
    props.diagnosisData &&
    props.diagnosisData.diagnosisCondition &&
    props.diagnosisData.diagnosisCondition.note;
  const molecularTestArray =
    props &&
      props.diagnosisData &&
      props.diagnosisData.molecularTests &&
      Array.isArray(props.diagnosisData.molecularTests) &&
      props.diagnosisData.molecularTests.length > 0
      ? props.diagnosisData.molecularTests
        .map(
          item =>
            `${item.code.display}${item.conclusion ? ` - ${item.conclusion}` : ''
            }`,
        )
        .join(', ')
      : null;
  // const cancerClinicalImpressions = props.VisitNotesResult && props.VisitNotesResult.cancerClinicalImpressions
  // console.log("molecularOne", molecularTestArray)
  // console.log("diagnosis", props && props.diagnosisData)
  let ER = false;
  let PR = false;
  let HER = false;

  let ERText = '';
  let PRText = '';
  let HERText = '';
  const erPrArray = [];
  if (
    props.diagnosisData.tumorMarkers &&
    props.diagnosisData.tumorMarkers.length > 0
  ) {
    let ERData = props.diagnosisData.tumorMarkers.find(
      v =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.code === 'positive' &&
        v.code.code === '40556-3',
    );
    let PRData = props.diagnosisData.tumorMarkers.find(
      v =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.code === 'positive' &&
        v.code.code === '40557-1',
    );
    let HERData = props.diagnosisData.tumorMarkers.find(
      v =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.code === 'positive' &&
        v.code.code === '48676-1',
    );

    if (ERData !== undefined) {
      // ER = true;
      // ERText = ERData.note ? ERData.note : '';
      erPrArray.push(`ER ${ERData.note ? `- ${ERData.note}` : '+'}`);
    } else {
      erPrArray.push(`ER : Negative`);
    }
    if (PRData !== undefined) {
      // PR = true;
      // PRText = PRData.note ? PRData.note : '';
      erPrArray.push(`PR ${PRData.note ? `- ${PRData.note}` : '+'}`);
    } else {
      erPrArray.push(`PR : Negative`);
    }
    if (HERData !== undefined) {
      // HER = true;
      // HERText = HERData.note ? HERData.note : '';
      erPrArray.push(`HER ${HERData.note ? `- ${HERData.note}` : '+'}`);
    } else {
      erPrArray.push(`HER : Negative`);
    }
  }
  // console.log('ER', erPrArray)
  // console.log('tumor', tumor);
  // console.log('node', node);
  // console.log('metastasis', metastasis);
  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" className={classes.subHeadingStyle}>
          Diagnosis
        </Typography>
        <Divider className={classes.subHeadingStyle} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4" className={classes.subHeadingStyle}>
              {verify ? `${verify} - ${cancerType}` : cancerType}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {bodySideWithLaterality && bodySideWithLaterality.laterality && (
              <Typography variant="h4" className={classes.subHeadingStyle}>
                Laterality :{' '}
                <span style={{ fontWeight: 'normal' }}>{` ${bodySideWithLaterality.laterality
                  }`}</span>
              </Typography>
            )}
          </Grid>
          {cancerCode && (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.subHeadingStyle}>
                  Cancer Code :{' '}
                  <span style={{ fontWeight: 'normal' }}>{cancerCode}</span>
                </Typography>
              </Grid>
            </>
          )}
          {(histologyMorphologyBehaviour || grade) && (
            <>
              {histologyMorphologyBehaviour && (
                <Grid item xs={grade ? 6 : 12}>
                  <Typography variant="h4" className={classes.subHeadingStyle}>
                    Histomorphology :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {histologyMorphologyBehaviour}
                    </span>
                  </Typography>
                </Grid>
              )}
              {grade && (
                <Grid item xs={histologyMorphologyBehaviour ? 6 : 12}>
                  <Typography variant="h4" className={classes.subHeadingStyle}>
                    Grade :{' '}
                    <span style={{ fontWeight: 'normal' }}>{grade}</span>
                  </Typography>
                </Grid>
              )}
            </>
          )}
          {(tnm || tumor || node || metastasis || staging) && (
            <>
              {(tnm || tumor || node || metastasis) && (
                <Grid item xs={staging ? 6 : 12}>
                  <Typography variant="h4" className={classes.subHeadingStyle}>
                    TNM :{' '}
                    <span
                      style={{ fontWeight: 'normal' }}
                    >{`${tnm} - ${tumor}${node}${metastasis}`}</span>
                  </Typography>
                </Grid>
              )}
              {staging && (
                <Grid item xs={tnm || tumor || node || metastasis ? 6 : 12}>
                  <Typography variant="h4" className={classes.subHeadingStyle}>
                    Stage :{' '}
                    <span style={{ fontWeight: 'normal' }}>{staging}</span>
                  </Typography>
                </Grid>
              )}
            </>
          )}
          {molecularTestArray && (
            <>
              <Grid item xs={6}>
                <Typography variant="h4" className={classes.subHeadingStyle}>
                  Molecular Test
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" style={{ fontWeight: 'normal' }}>
                  {molecularTestArray}
                </Typography>
              </Grid>
            </>
          )}
          {psa && (
            <>
              <Grid item xs={6}>
                <Typography variant="h4" className={classes.subHeadingStyle}>
                  PSA : <span style={{ fontWeight: 'normal' }}>{psa}</span>
                </Typography>
              </Grid>
            </>
          )}
          {erPrArray && cancerType === 'Breast Cancer' && (
            <>
              <Grid item xs={6}>
                <Typography variant="h4" className={classes.subHeadingStyle}>
                  Hormone Receptors :{' '}
                  <span style={{ fontWeight: 'normal' }}>
                    {erPrArray.map(item => item).join(', ')}
                  </span>
                </Typography>
              </Grid>
            </>
          )}
          {note && (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.subHeadingStyle}>
                  Note : <span style={{ fontWeight: 'normal' }}>{note}</span>
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Diagnosis;
