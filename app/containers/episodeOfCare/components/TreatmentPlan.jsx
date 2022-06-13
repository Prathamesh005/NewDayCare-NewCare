import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filter } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { doSaveBmiBsa } from '../../../apis/globalApis/globalSlice';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';
import TreatmentForm from './treatmentPlan/TreatmentForm';
import TreatmentProtocol from './treatmentPlan/TreatmentProtocol';

const useStyles = makeStyles(theme => ({
  headlabels: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  primarylabels: {
    fontSize: '1rem',
    fontWeight: 500,
    margin: '0px 4rem 0px 2rem',
  },
  secondarylabels: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnGrid: {
    display: 'flex',
    justifyContent: 'end',
  },
}));

function TreatmentPlanForm(props) {
  const {
    Id,
    Option,
    SET_TREATMENT_PROTOCOL_INITIAL_STATE,
    OnLoadTreatmentPlanData,
  } = props;

  const classes = useStyles();
  const separators = ['\\+', '-', '\\(', '\\)', '\\*', '/', ':', '\\?'];
  const [expand1, setExpand1] = React.useState(true);
  const [OnLoadData, setOnLoadData] = React.useState([]);

  const [
    OnLoadTreatmentProtocolData,
    setOnLoadTreatmentProtocolData,
  ] = React.useState([]);
  const [BMI, setBMI] = React.useState(null);
  const [BSA, setBSA] = React.useState(null);
  const [IdealBodyWeight, setIdealBodyWeight] = React.useState(null);

  const calldoSaveBmiBsa = async field => {
    const { payload } = await props.doSaveBmiBsa(field);

    if (payload && payload.status === 200) {
      const { bmi, bsa, idealBodyWeight } = payload.data;

      setBMI(bmi);
      setBSA(bsa);
      setIdealBodyWeight(idealBodyWeight);
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
    let field = {
      height: '',
      heightUnit: '',
      gender: '',
      weight: '',
      weightUnit: '',
      noOfCiggrette: '',
      noOfYearSmoked: '',
    };

    calldoSaveBmiBsa(field);
  }, []);

  useEffect(() => {
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
        noOfCiggrette:
          Option.values.packsPerDay && Option.values.packsPerDay.display,
        noOfYearSmoked: Option.values.tobaccoDurationText,
      };
      calldoSaveBmiBsa(field);
    }
    return () => {};
  }, [
    Option.values.gender,
    Option.values.height,
    Option.values.heightUnit,
    Option.values.weight,
    Option.values.weightUnit,
  ]);

  useEffect(() => {
    let TreatmentPlan =
      OnLoadTreatmentPlanData.length > 0
        ? OnLoadTreatmentPlanData.map(ele => {
            return ele.display.split('/')[1];
          })
        : [];

    let res = [
      {
        title: 'Treatment Plan',
        subtitle: TreatmentPlan,
        status: OnLoadTreatmentPlanData && OnLoadTreatmentPlanData.length > 0,
        type: 'isSubArray',
      },
      ...OnLoadTreatmentProtocolData,
    ];

    setOnLoadData(filter(res, { status: true }));
  }, [OnLoadTreatmentPlanData, OnLoadTreatmentProtocolData]);

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

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Accordion expanded={expand1} onChange={onExpand} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Typography className={classes.headlabels}>
                Treatment Plan
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              {!expand1 && <OnFollowUpVisitCard OnLoadData={OnLoadData} />}

              {expand1 && (
                <>
                  <Typography
                    component="span"
                    className={classes.secondarylabels}
                  >
                    BMI:
                  </Typography>
                  <Typography
                    component="span"
                    className={classes.primarylabels}
                  >
                    {BMI !== null && BMI !== undefined
                      ? `${BMI.value} ${BMI.unit}`
                      : '-'}
                  </Typography>

                  <Typography
                    component="span"
                    className={classes.secondarylabels}
                  >
                    BSA:
                  </Typography>
                  <Typography
                    component="span"
                    className={classes.primarylabels}
                  >
                    {BSA !== null && BSA !== undefined
                      ? `${BSA.value} ${BSA.unit}`
                      : '-'}
                  </Typography>

                  <Typography
                    component="span"
                    className={classes.secondarylabels}
                  >
                    Ideal Body Weight:
                  </Typography>
                  <Typography
                    component="span"
                    className={classes.primarylabels}
                  >
                    {IdealBodyWeight !== null && IdealBodyWeight !== undefined
                      ? `${IdealBodyWeight.value} ${IdealBodyWeight.unit}`
                      : '-'}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <TreatmentForm Id={Id} />
            <TreatmentProtocol
              Id={Id}
              Option={Option}
              SET_TREATMENT_PROTOCOL_INITIAL_STATE={
                SET_TREATMENT_PROTOCOL_INITIAL_STATE
              }
              setOnLoadTreatmentProtocolData={setOnLoadTreatmentProtocolData}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    doSaveBmiBsa: payload => dispatch(doSaveBmiBsa(payload)),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TreatmentPlanForm);
