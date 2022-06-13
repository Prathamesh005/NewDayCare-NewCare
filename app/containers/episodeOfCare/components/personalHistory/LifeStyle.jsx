import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  doSaveBmiBsa,
  valueSetSearch,
} from '../../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../../components';
import AutoCompleteField from '../forms/AutoCompleteField';
import SelectField from '../forms/SelectField';
import SwitchFieldWrapper from '../forms/SwitchField';
import Textfield from '../forms/TextField';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.96rem',
    },
  },
  centerGrid: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function LifeStyle(props) {
  const { Option, SET_LIFESTYLE_INITIAL_STATE, lifestyleIndicatorData } = props;

  const classes = useStyles();
  const [DietSetData, setDietSetData] = useState([]);
  const [PackCalculation, setPackCalculation] = useState(null);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-type-food-given-vs',
    });
    setDietSetData(payload && payload.message ? [] : payload);
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    let tobaccoType = '';
    let packsPerDay = '';
    let tobaccoDurationText = '';
    let tobaccoDuration = 'year';
    let tobaccoId = uuidv4();

    let alcoholDurationText = '';
    let alcoholDuration = 'year';
    let alcoholId = uuidv4();

    let drugDurationText = '';
    let drugDuration = 'year';
    let drugId = uuidv4();

    let tobaccoConsumeCheck = '';
    let alcoholConsumeCheck = '';
    let drugConsumeCheck = '';

    let diet = { code: '', display: '' };
    let dietCheck = false;
    let dietId = uuidv4();

    if (lifestyleIndicatorData && lifestyleIndicatorData.length > 0) {
      let SmokingData = lifestyleIndicatorData.find(
        val => val.resourceType === 'Smoking',
      );
      //   console.log("SmokingData",SmokingData)

      if (SmokingData != undefined) {
        // user = SmokingData.use
        tobaccoType = SmokingData.note != null ? SmokingData.note : '';
        tobaccoDurationText =
          SmokingData.valueCodeableConcept != null &&
          SmokingData.valueCodeableConcept.display != null
            ? SmokingData.valueCodeableConcept.display.split(' ')[0]
            : '';
        packsPerDay =
          SmokingData.valueCodeableConcept != null &&
          SmokingData.valueCodeableConcept.text != null
            ? SmokingData.valueCodeableConcept.text.split(' ')[0]
            : '';
        tobaccoDuration =
          SmokingData.valueCodeableConcept != null &&
          SmokingData.valueCodeableConcept.display != null
            ? SmokingData.valueCodeableConcept.display.split(' ')[1]
            : 'year';

        tobaccoConsumeCheck =
          SmokingData.valueCodeableConcept != null &&
          SmokingData.valueCodeableConcept.code === 'Yes'
            ? SmokingData.valueCodeableConcept.code
            : '';
        tobaccoId = SmokingData.resourceId;
      }
      // debugger
      let DrinkingData = lifestyleIndicatorData.find(
        val => val.resourceType === 'Drinking',
      );
      //   console.log("DrinkingData",DrinkingData)

      if (DrinkingData !== undefined) {
        // alcoholUse = DrinkingData.use
        alcoholDurationText =
          DrinkingData.valueCodeableConcept != null &&
          DrinkingData.valueCodeableConcept.code === 'Yes' &&
          DrinkingData.valueCodeableConcept.text !== null
            ? DrinkingData.valueCodeableConcept.text.split(' ')[0]
            : '';
        alcoholDuration =
          DrinkingData.valueCodeableConcept != null &&
          DrinkingData.valueCodeableConcept.display != null
            ? DrinkingData.valueCodeableConcept.display
            : 'year';

        alcoholConsumeCheck =
          DrinkingData.valueCodeableConcept != null &&
          DrinkingData.valueCodeableConcept.code === 'Yes'
            ? DrinkingData.valueCodeableConcept.code
            : '';
        alcoholId = DrinkingData.resourceId;
      }
      //   debugger
      let DrugData = lifestyleIndicatorData.find(
        val => val.resourceType === 'Drug',
      );
      //   console.log("DrugData",DrugData)

      if (DrugData !== undefined) {
        // drugUse = DrugData.use
        drugDurationText =
          DrugData.valueCodeableConcept != null &&
          DrugData.valueCodeableConcept.code === 'Yes' &&
          DrugData.valueCodeableConcept.text !== null
            ? DrugData.valueCodeableConcept.text.split(' ')[0]
            : '';
        drugDuration =
          DrugData.valueCodeableConcept != null &&
          DrugData.valueCodeableConcept.display != null
            ? DrugData.valueCodeableConcept.display
            : 'year';

        drugConsumeCheck =
          DrugData.valueCodeableConcept != null &&
          DrugData.valueCodeableConcept.code === 'Yes'
            ? DrugData.valueCodeableConcept.code
            : '';
        drugId = DrugData.resourceId;
      }

      let FoodData = lifestyleIndicatorData.find(
        val => val.resourceType === 'Food',
      );

      if (FoodData !== undefined) {
        // drugUse = FoodData.use
        dietCheck = true;
        diet =
          FoodData.valueCodeableConcept != null &&
          FoodData.valueCodeableConcept.display != null
            ? {
                code: FoodData.valueCodeableConcept.code,
                display: FoodData.valueCodeableConcept.display,
              }
            : { code: '', display: '' };
        dietId = FoodData.resourceId;
      }
    }

    const INITIAL_FORM_STATE = {
      tobaccoType: tobaccoType,
      packsPerDay: { id: '', display: packsPerDay },
      tobaccoDurationText: tobaccoDurationText,
      tobaccoDuration: tobaccoDuration,

      alcoholDurationText: alcoholDurationText,
      alcoholDuration: alcoholDuration,

      drugDurationText: drugDurationText,
      drugDuration: drugDuration,

      tobaccoConsumptionCheck: tobaccoConsumeCheck === 'Yes' ? true : false,
      alcoholConsumptionCheck: alcoholConsumeCheck === 'Yes' ? true : false,
      drugConsumptionCheck: drugConsumeCheck === 'Yes' ? true : false,

      tobaccoConsumeCheck: tobaccoConsumeCheck === 'Yes' ? true : false,
      alcoholConsumeCheck: alcoholConsumeCheck === 'Yes' ? true : false,
      drugConsumeCheck: drugConsumeCheck === 'Yes' ? true : false,

      dietCheck: dietCheck,
      diet: diet,

      tobaccoId: tobaccoId,
      alcoholId: alcoholId,
      drugId: drugId,
      dietId: dietId,
    };

    SET_LIFESTYLE_INITIAL_STATE(INITIAL_FORM_STATE);

    return () => {};
  }, [lifestyleIndicatorData]);

  const calldoSaveBmiBsa = async field => {
    const { payload } = await props.doSaveBmiBsa(field);

    if (payload && payload.status === 200) {
      setPackCalculation(payload.data.packYear);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
  };

  useEffect(() => {
    // debugger

    if (
      Option.values.height !== '' &&
      Option.values.height !== undefined &&
      (Option.values.heightUnit !== '' &&
        Option.values.heightUnit !== undefined) &&
      (Option.values.weight !== '' && Option.values.weight !== undefined) &&
      (Option.values.weightUnit !== '' &&
        Option.values.weightUnit !== undefined) &&
      (Option.values.gender !== '' && Option.values.gender !== undefined)
    ) {
      let field = {
        height: Option.values.height,
        heightUnit: Option.values.heightUnit,
        gender: Option.values.gender,
        weight: Option.values.weight,
        weightUnit: Option.values.weightUnit,
        noOfCiggrette: Option.values.packsPerDay.display,
        noOfYearSmoked: Option.values.tobaccoDurationText,
      };

      calldoSaveBmiBsa(field);
    }
  }, [
    Option.values.gender,
    Option.values.height,
    Option.values.heightUnit,
    Option.values.weight,
    Option.values.weightUnit,
  ]);

  useEffect(() => {
    let packYearN = null;
    if (props.BmiBsaData && props.BmiBsaData) {
      const { packYear } = props.BmiBsaData;

      packYearN = packYear;
    }

    return () => {};
  }, [props.BmiBsaData]);

  const choices = [
    { key: 'Cigarette', value: 'Cigarette' },
    { key: 'Chew', value: 'Chew' },
    { key: 'Both', value: 'Both' },
  ];

  const durationData = [
    { key: 'month', value: 'month' },
    { key: 'year', value: 'year' },
  ];

  const [numOfCigaratte, setNumOfCigaratte] = React.useState([]);

  useEffect(() => {
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    }

    var result = range(0, 30);
    let res = [];

    result.forEach(val => {
      res.push({ id: val, display: `${val}` });
    });

    setNumOfCigaratte(res);
  }, []);

  useEffect(() => {
    const {
      packsPerDay,
      alcoholDurationText,
      alcoholDuration,
      drugDurationText,
      drugDuration,
      diet,
    } = Option.values;

    props.setOnLoadLifestyleData([
      {
        title: 'Tobacco',
        subtitle: `${packsPerDay && packsPerDay.display} cigarettes/day`,
        status: packsPerDay && packsPerDay.display !== '',
      },
      {
        title: 'Alcohol',
        subtitle: `${alcoholDurationText &&
          alcoholDurationText}/${alcoholDuration && alcoholDuration}`,
        status: alcoholDurationText && alcoholDurationText !== '',
      },
      {
        title: 'Drug',
        subtitle: `${drugDurationText && drugDurationText}/${drugDuration &&
          drugDuration}`,
        status: drugDurationText && drugDurationText !== '',
      },
      {
        title: 'Diet',
        subtitle: `${diet && diet.display}`,
        status: diet && diet.display !== '',
      },
    ]);
  }, [Option.values]);

  return (
    <Fragment>
      {Option.values.tobaccoConsumptionCheck && (
        <Grid item container xs={12}>
          <Grid item xs={12} md={1} className={classes.lebels}>
            Tobacco Consumption
          </Grid>
          <Grid item container xs={11}>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} md={2} className={classes.lebels}>
                  Tobacco Type
                </Grid>
                <Grid item xs={12} md={3}>
                  <SelectField
                    name="tobaccoType"
                    value={Option.values.tobaccoType}
                    options={choices}
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} md={1} />

                <Grid item xs={12} md={2} className={classes.lebels}>
                  Cigarettes / Day
                </Grid>
                <Grid item xs={12} md={3}>
                  <AutoCompleteField
                    id="packsPerDay"
                    size="small"
                    options={
                      numOfCigaratte && numOfCigaratte.length !== 0
                        ? numOfCigaratte
                        : []
                    }
                    label="Per Day"
                    name="packsPerDay"
                    val={Option.values.packsPerDay}
                    code="id"
                    display="display"
                  />
                </Grid>
                <Grid item xs={12} md={1} />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} md={2} className={classes.lebels}>
                  Duration
                </Grid>
                <Grid item xs={12} md={3}>
                  <Textfield
                    name="tobaccoDurationText"
                    placeholder="Select Duration"
                    style={{ width: '70%' }}
                  />
                  <SelectField
                    name="tobaccoDuration"
                    value={Option.values.tobaccoDuration}
                    options={durationData}
                    width="30%"
                  />
                </Grid>
                <Grid item xs={12} md={1} />

                <Grid item xs={12} md={2} className={classes.lebels}>
                  Still Consume ?
                </Grid>
                <Grid item xs={12} md={4} className={classes.centerGrid}>
                  <SwitchFieldWrapper name="tobaccoConsumeCheck" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {PackCalculation ? (
        <Grid item container xs={12}>
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={11}>
            Pack Year Calculation: Your smoking exposure is {PackCalculation}{' '}
            year
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      {Option.values.alcoholConsumptionCheck && (
        <Grid item container xs={12}>
          <Grid item xs={12} md={1} className={classes.lebels}>
            Alcohol Consumption
          </Grid>
          <Grid item xs={12} md={1} className={classes.lebels}>
            Duration
          </Grid>
          <Grid item xs={12} md={2}>
            <Textfield
              name="alcoholDurationText"
              placeholder="Select Duration"
              style={{ width: '70%' }}
            />
            <SelectField
              name="alcoholDuration"
              value={Option.values.alcoholDuration}
              options={durationData}
              width="30%"
            />
          </Grid>

          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={2} className={classes.lebels}>
            Still Consumes ?
          </Grid>
          <Grid item xs={12} md={2} className={classes.centerGrid}>
            <SwitchFieldWrapper name="alcoholConsumeCheck" />
          </Grid>
        </Grid>
      )}

      {Option.values.drugConsumptionCheck && (
        <Grid item container xs={12}>
          <Grid
            item
            xs={12}
            md={1}
            className={classes.lebels}
            style={{ fontSize: '0.94rem' }}
          >
            Drug Consumption
          </Grid>
          <Grid item xs={12} md={1} className={classes.lebels}>
            Duration
          </Grid>

          <Grid item xs={12} md={2}>
            <Textfield
              name="drugDurationText"
              placeholder="Select Duration"
              style={{ width: '70%' }}
            />
            <SelectField
              name="drugDuration"
              value={Option.values.drugDuration}
              options={durationData}
              width="30%"
            />
          </Grid>

          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={2} className={classes.lebels}>
            Still Consumes ?
          </Grid>
          <Grid item xs={12} md={2}>
            <SwitchFieldWrapper name="drugConsumeCheck" />
          </Grid>
        </Grid>
      )}
      {Option.values.dietCheck && (
        <Grid item container xs={12}>
          <Grid item xs={12} md={1} className={classes.lebels}>
            Diet
          </Grid>
          <Grid item xs={12} md={2}>
            <AutoCompleteField
              id="diet"
              size="small"
              options={
                DietSetData && DietSetData.length !== 0 ? DietSetData : []
              }
              // label="Per Day"
              name="diet"
              val={Option.values.diet}
              code="code"
              display="display"
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    doSaveBmiBsa: payload => dispatch(doSaveBmiBsa(payload)),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(LifeStyle);
