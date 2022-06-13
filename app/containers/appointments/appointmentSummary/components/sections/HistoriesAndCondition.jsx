import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
}));
function HistoriesAndCondition(props) {
  const classes = useStyles();
  const comorbidArray =
    (props && props.comorbidDataResult.length != 0) ||
    props.comorbidDataResult.length !== null ||
    props.comorbidDataResult.length !== undefined
      ? props.comorbidDataResult.map((item, index) => {
          return {
            nameOfCondition:
              item && item.code && item.code.display
                ? item.code.display
                : 'Nil',
            note: item && item.note ? item.note : '',
          };
        })
      : [];

  const familyResultArray =
    props && props.familyResult && props.familyResult
      ? props.familyResult.length != 0 ||
        props.familyResult.length !== null ||
        props.familyResult.length !== undefined
        ? props.familyResult.map((item, index) => {
            return {
              relation:
                item && item.relationship && item.relationship.display
                  ? item.relationship.display
                  : 'Nil',
              disease:
                item &&
                item.condition &&
                item.condition.length != 0 &&
                item.condition.length !== null &&
                item.condition.length !== undefined
                  ? item.condition[0]['code'] &&
                    item.condition[0]['code']['display']
                  : 'Nil',
              age:
                item &&
                item.condition &&
                item.condition.length != 0 &&
                item.condition.length !== null &&
                item.condition.length !== undefined
                  ? item.condition[0]['onSetAge']
                    ? item.condition[0]['onSetAge']
                    : 'Nil'
                  : 'Nil',
              status:
                item &&
                item.condition &&
                item.condition.length != 0 &&
                item.condition.length !== null &&
                item.condition.length !== undefined
                  ? item.condition[0]['outcome']
                    ? item.condition[0]['outcome']['display']
                      ? item.condition[0]['outcome']['display']
                      : ''
                    : ''
                  : '',
            };
          })
        : []
      : [];

  const lifeStyleArray = [];
  if (
    props &&
    props.LifestyleResult &&
    props.LifestyleResult &&
    props.LifestyleResult.length > 0
  ) {
    let Smoking = props.LifestyleResult.find(
      item => item.resourceType === 'Smoking',
    );
    let Drinking = props.LifestyleResult.find(
      item => item.resourceType === 'Drinking',
    );
    let Drug = props.LifestyleResult.find(item => item.resourceType === 'Drug');
    if (Smoking && Smoking.use === 'active') {
      lifeStyleArray.push(
        `${Smoking.resourceType}-${
          Smoking.valueCodeableConcept && Smoking.valueCodeableConcept.text
            ? Smoking.valueCodeableConcept.text
            : ''
        }-${
          Smoking.valueCodeableConcept && Smoking.valueCodeableConcept.display
            ? Smoking.valueCodeableConcept.display
            : ''
        }`,
      );
    }
    if (Drinking && Drinking.use === 'active') {
      lifeStyleArray.push(
        `${Drinking.resourceType}-${
          Drinking.valueCodeableConcept && Drinking.valueCodeableConcept.text
            ? Drinking.valueCodeableConcept.text
            : ''
        }`,
      );
    }
    if (Drug && Drug.use === 'active') {
      lifeStyleArray.push(
        `${Drug.resourceType}-${
          Drug.valueCodeableConcept && Drug.valueCodeableConcept.text
            ? Drug.valueCodeableConcept.text
            : ''
        }`,
      );
    }
  }
  const loadAllergy = [];
  if (
    props &&
    props.loadAllergyDataSuccess &&
    props.loadAllergyDataSuccess.length > 0
  ) {
    props.loadAllergyDataSuccess.map(item => {
      let testName =
        item.reaction &&
        item.reaction[0] &&
        item.reaction[0]['substance'] &&
        item.reaction[0]['substance']['display'];
      let note = item.note ? item.note : '';
      let str = '';
      if (!note) str = testName;
      else str = `${testName}${note ? ` - ${note}` : ''}`;
      if (str) loadAllergy.push(str);
    });
  }

  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Histories &amp; Condition
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {(props.summaryType === 'Detailed' ||
            (props.selectedState && props.selectedState.comorbidity)) && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Comorbid History
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  {comorbidArray.length > 0 ? (
                    comorbidArray.map((item, index) => {
                      return (
                        <Grid item xs={12} key={index.toString()}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#373737' }}
                          >
                            {`${item.nameOfCondition}${
                              item.note ? ` - ${item.note}` : ''
                            }`}
                          </Typography>
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      {'Nil'}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </>
          )}

          {(props.summaryType === 'Detailed' ||
            (props.selectedState && props.selectedState.familyHistory)) && (
            <>
              <Grid item xs={4}>
                {' '}
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Family History
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  {familyResultArray.length > 0 ? (
                    familyResultArray.map((item, index) => {
                      return (
                        <Grid item xs={12} key={index.toString()}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#373737' }}
                          >
                            {item.relation} - {item.disease} - {item.age} -{' '}
                            {item.status}
                          </Typography>
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      {'Nil'}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {(props.summaryType === 'Detailed' ||
            (props.selectedState &&
              props.selectedState.lifeStyleIndicators)) && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Lifestyle Indicators
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  {lifeStyleArray.length > 0
                    ? lifeStyleArray.join(', ')
                    : 'Nil'}
                </Typography>
              </Grid>
            </>
          )}
          {(props.summaryType === 'Detailed' ||
            (props.selectedState && props.selectedState.allergy)) && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  Allergy
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 500, color: '#373737' }}
                >
                  {loadAllergy.length > 0 ? loadAllergy.join(', ') : 'Nil'}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HistoriesAndCondition;
