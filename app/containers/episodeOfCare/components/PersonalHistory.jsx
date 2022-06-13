import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filter } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { SquareAddIconButton } from '../../../components/button';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import CheckBoxField from './forms/CheckBoxField';
import PopperComponent from './forms/PopperComponent';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';
import ImmunizationHistory from './personalHistory/ImmunizationHistory';
import LifeStyle from './personalHistory/LifeStyle';
import ObsGynHistory from './personalHistory/ObsGynHistory';

const useStyles = makeStyles(theme => ({
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  secondarylabels: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  centerHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
}));

function PersonalHistory(props) {
  const {
    Option,
    SET_LIFESTYLE_INITIAL_STATE,
    SET_OBS_GYN_INITIAL_STATE,
    OnLoadImmunization,
    immunizationData,
    obsGynData,
  } = props;

  const classes = useStyles();

  const [expand1, setExpand1] = React.useState(true);
  const [OnLoadData, setOnLoadData] = React.useState([]);
  const [OnLoadLifestyleData, setOnLoadLifestyleData] = React.useState([]);
  const [OnLoadObsGynData, setOnLoadObsGynData] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClick = toggle => event => {
    setOpen(toggle);
  };

  const checkBoxData = () => (
    <>
      <div>
        <CheckBoxField
          name="tobaccoConsumptionCheck"
          label="Tobacco Consumption"
        />
      </div>
      <div>
        <CheckBoxField
          name="alcoholConsumptionCheck"
          label="Alcohol Consumption"
        />
      </div>
      <div>
        <CheckBoxField name="drugConsumptionCheck" label="Drug Consumption" />
      </div>
      <div>
        <CheckBoxField name="dietCheck" label="Diet" />
      </div>
      {Option.values && Option.values.gender === 'Female' && (
        <div>
          <CheckBoxField name="obsGynHistoryCheck" label="Obs Gyn History" />
        </div>
      )}
    </>
  );

  useEffect(() => {
    let periodsValue = '';
    let lmp = '';
    let ageAtMenopause = '';
    let firstMenstrual = '';
    let isCheck = false;
    let oBGYId = uuidv4();
    // debugger

    if (obsGynData && obsGynData) {
      isCheck = obsGynData !== null ? true : false;
      let newoBGYNObservation =
        obsGynData !== undefined && obsGynData !== null ? [obsGynData] : [];

      if (newoBGYNObservation && newoBGYNObservation.length > 0) {
        oBGYId = newoBGYNObservation[0].resourceId;
        let searchoBGY = newoBGYNObservation[0].component;

        let periodsValueSample = searchoBGY.find(
          val => val.code.display === 'having periods',
        );
        let lmpSample = searchoBGY.find(
          val => val.code.display === 'last menstrual period',
        );
        let ageAtMenopauseSample = searchoBGY.find(
          val => val.code.display === 'age at menopause',
        );
        let firstMenstrualSample = searchoBGY.find(
          val => val.code.display === 'age of first menstrual cycle',
        );

        if (
          periodsValueSample != undefined &&
          periodsValueSample.valueCodeableConcept !== null
        ) {
          periodsValue = periodsValueSample.valueCodeableConcept[0].display;
        }
        if (lmpSample != undefined && lmpSample.valueCodeableConcept !== null) {
          lmp = lmpSample.valueCodeableConcept[0].display;
        }
        if (
          ageAtMenopauseSample != undefined &&
          ageAtMenopauseSample.valueQuantity !== null
        ) {
          ageAtMenopause = ageAtMenopauseSample.valueQuantity.value;
        }
        if (
          firstMenstrualSample != undefined &&
          firstMenstrualSample.valueQuantity !== null
        ) {
          firstMenstrual = firstMenstrualSample.valueQuantity.value;
        }
      }
    }

    const INITIAL_FORM_STATE = {
      ageAtMenarche: firstMenstrual,
      periodsValue: periodsValue,
      ageAtMenopause: ageAtMenopause,
      lmp: lmp,
      obsGynHistoryCheck: isCheck,
      oBGYId: oBGYId,
    };
    // debugger
    SET_OBS_GYN_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [obsGynData]);

  useEffect(() => {
    if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
      setExpand1(false);
    } else {
      setExpand1(true);
    }
  }, [Option.values.checkFollowUp]);

  const onExpand = () => {
    setExpand1(!expand1);
  };

  useEffect(() => {
    const { ageAtMenarche, periodsValue, lmp, ageAtMenopause } = Option.values;

    setOnLoadObsGynData([
      {
        title: 'Age At Menarche',
        subtitle: `${ageAtMenarche && ageAtMenarche} Years`,
        status: ageAtMenarche && ageAtMenarche !== '',
      },
      {
        title: 'Having Periods?',
        subtitle: `${periodsValue && periodsValue}`,
        status: periodsValue && periodsValue !== '',
      },
      periodsValue && periodsValue === 'Yes'
        ? {
            title: 'LMP',
            subtitle: `${lmp && lmp}`,
            status: lmp && lmp !== '',
          }
        : {
            title: 'Age At Menopause',
            subtitle: `${ageAtMenopause && ageAtMenopause} Years`,
            status: ageAtMenopause && ageAtMenopause !== '',
          },
    ]);
  }, [Option.values]);

  useEffect(() => {
    let prevImmunization =
      OnLoadImmunization.length > 0
        ? OnLoadImmunization.flatMap(i => i.vaccineCode.display)
        : [];

    let res = [
      {
        title: 'Immunization',
        subtitle: prevImmunization,
        status: OnLoadImmunization && OnLoadImmunization.length > 0,
        type: 'isSubArray',
      },
      ...OnLoadLifestyleData,
      ...OnLoadObsGynData,
    ];
    // debugger;
    setOnLoadData(filter(res, { status: true }));
  }, [OnLoadImmunization, OnLoadLifestyleData, OnLoadObsGynData]);

  return (
    <Fragment>
      {open && (
        <PopperComponent
          open={open}
          handleClick={handleClick}
          checkBoxData={checkBoxData()}
        />
      )}
      <Accordion expanded={expand1} onChange={onExpand} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12} md={2}>
              <Typography className={classes.headlabels}>
                Personal History
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              {!expand1 && <OnFollowUpVisitCard OnLoadData={OnLoadData} />}

              {expand1 && (
                <SquareAddIconButton
                  style={{ float: 'right', padding: 2 }}
                  onMouseEnter={handleClick(true)}
                />
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <ImmunizationHistory prevImmunizationHistory={immunizationData} />
            <LifeStyle
              Option={Option}
              SET_LIFESTYLE_INITIAL_STATE={SET_LIFESTYLE_INITIAL_STATE}
              setOnLoadLifestyleData={setOnLoadLifestyleData}
            />
            {Option.values.obsGynHistoryCheck && (
              <ObsGynHistory Option={Option} />
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PersonalHistory);
