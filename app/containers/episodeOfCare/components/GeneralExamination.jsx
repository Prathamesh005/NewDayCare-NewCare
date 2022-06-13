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
import Textfield from '../components/forms/TextField';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import CheckBoxField from './forms/CheckBoxField';
import PopperComponent from './forms/PopperComponent';
import GenExamination from './generalExamination/GenExamination';
import ScoresForm from './generalExamination/ScoresForm';
import VitalsForm from './generalExamination/VitalsForm';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';

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
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  centerDiv: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function GeneralExamination(props) {
  // console.log('GeneralExamination', props);

  const {
    Option,
    SET_SCORE_INITIAL_STATE,
    SET_VITAL_INITIAL_STATE,
    SET_LOCAL_SYSTEMIC_INITIAL_STATE,
    SET_GENERAL_EXAM_INITIAL_STATE,
    Id,
    loginDetail,
    generalExaminationData,
  } = props;

  const classes = useStyles();

  const [expand1, setExpand1] = React.useState(true);
  const [OnLoadData, setOnLoadData] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [generalExamData, setgeneralExamData] = React.useState([]);

  const handleClick = toggle => event => {
    setOpen(toggle);
  };
  const checkBoxData = () => (
    <>
      <div>
        <CheckBoxField name="kScoreCheck" label="K Score" />
      </div>
      <div>
        <CheckBoxField
          name="systemicExaminationCheck"
          label="Systemic Examination"
        />
      </div>
      <div>
        <CheckBoxField name="localExaminationCheck" label="Local Examination" />
      </div>
    </>
  );

  useEffect(() => {
    let Inspection = '';
    let Palpation = '';
    let cns = '';
    let cvs = '';
    let respiratory = '';
    let perAbdomen = '';
    let systemicExaminationCheck = false;
    let localExaminationCheck = false;

    let InspectionId = uuidv4();
    let PalpationId = uuidv4();
    let cnsId = uuidv4();
    let cvsId = uuidv4();
    let respiratoryId = uuidv4();
    let perAbdomenId = uuidv4();

    if (generalExaminationData && generalExaminationData.recordCount != null) {
      const {
        systemicExaminations,
        inspection,
        palpation,
        generalExaminations,
      } = generalExaminationData;

      if (inspection != null) {
        Inspection = inspection.valueString;
        localExaminationCheck = true;
        InspectionId = inspection.resourceId;
      }
      if (palpation != null) {
        Palpation = palpation.valueString;
        localExaminationCheck = true;
        PalpationId = palpation.resourceId;
      }

      if (systemicExaminations.length > 0) {
        systemicExaminationCheck = true;

        let perAbdomenData = systemicExaminations.find(
          val => val.resourceName === 'PerAbdomen',
        );
        let cnsData = systemicExaminations.find(
          val => val.resourceName === 'CNS',
        );
        let cvsData = systemicExaminations.find(
          val => val.resourceName === 'CVS',
        );
        let respiratoryData = systemicExaminations.find(
          val => val.resourceName === 'Respiratory',
        );

        if (perAbdomenData !== undefined) {
          perAbdomen = perAbdomenData.valueString;
          perAbdomenId = perAbdomenData.resourceId;
        }
        if (cnsData !== undefined) {
          cns = cnsData.valueString;
          cnsId = cnsData.resourceId;
        }
        if (cvsData !== undefined) {
          cvs = cvsData.valueString;
          cvsId = cvsData.resourceId;
        }
        if (respiratoryData !== undefined) {
          respiratory = respiratoryData.valueString;
          respiratoryId = respiratoryData.resourceId;
        }
      }

      if (generalExaminations.length > 0) {
        setgeneralExamData(generalExaminations);
      } else {
        setgeneralExamData([]);
      }

      // debugger
    }

    const INITIAL_FORM_STATE = {
      cns: cns,
      cvs: cvs,
      respiratory: respiratory,
      perAbdomen: perAbdomen,

      inspection: Inspection,
      palpation: Palpation,

      systemicExaminationCheck: systemicExaminationCheck,
      localExaminationCheck: localExaminationCheck,

      InspectionId: InspectionId,
      PalpationId: PalpationId,
      cnsId: cnsId,
      cvsId: cvsId,
      respiratoryId: respiratoryId,
      perAbdomenId: perAbdomenId,
    };
    // debugger
    SET_LOCAL_SYSTEMIC_INITIAL_STATE(INITIAL_FORM_STATE);

    return () => {};
  }, [generalExaminationData]);

  useEffect(() => {
    // let prevImmunization =
    //   prevImmunizationHistory.length > 0
    //     ? prevImmunizationHistory.flatMap(i => i.vaccineCode.display)
    //     : [];
    const {
      ecogScore,
      kScore,
      temperature,
      temperatureUnit,
      pulseRate,
      pulseRateUnit,
      bloodPressure,
      bloodPressureUnit,
      respiratoryRate,
      respiratoryRateUnit,
      oxygenSaturation,
      oxygenSaturationUnit,
      rbs,
      rbsUnit,
    } = Option.values;

    let res = [
      {
        title: 'ECOG',
        subtitle: ecogScore && ecogScore.display,
        status: ecogScore && ecogScore.display !== '',
      },
      {
        title: 'K Score',
        subtitle: kScore && kScore.display,
        status: kScore && kScore.display !== '',
      },
      {
        title: 'Temperature',
        subtitle: `${temperature && temperature} ${temperatureUnit}`,
        status: temperature && temperature !== '',
      },
      {
        title: 'Pulse',
        subtitle: `${pulseRate && pulseRate} ${pulseRateUnit}`,
        status: pulseRate && pulseRate !== '',
      },
      {
        title: 'Blood Pressure',
        subtitle: `${bloodPressure && bloodPressure} ${bloodPressureUnit}`,
        status: bloodPressure && bloodPressure !== '',
      },
      {
        title: 'Respiratory Rate',
        subtitle: `${respiratoryRate &&
          respiratoryRate} ${respiratoryRateUnit}`,
        status: respiratoryRate && respiratoryRate !== '',
      },
      {
        title: 'Oxygen Saturation',
        subtitle: `${oxygenSaturation &&
          oxygenSaturation} ${oxygenSaturationUnit}`,
        status: oxygenSaturation && oxygenSaturation !== '',
      },
      {
        title: 'RBS',
        subtitle: `${rbs && rbs} ${rbsUnit}`,
        status: rbs && rbs !== '',
      },
    ];

    // debugger;
    setOnLoadData(filter(res, { status: true }));
  }, [Option.values]);

  useEffect(() => {
    if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
      setExpand1(false);
    } else {
      setExpand1(true);
    }
  }, [Option.values.checkFollowUp]);
  // console.log('Option.values.checkFollowUp', Option.values.checkFollowUp);
  const onExpand = () => {
    setExpand1(!expand1);
  };
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
            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Typography className={classes.headlabels}>
                General Examination
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
            <ScoresForm
              Id={Id}
              loginDetail={loginDetail}
              Option={Option}
              SET_SCORE_INITIAL_STATE={SET_SCORE_INITIAL_STATE}
            />
            <VitalsForm SET_VITAL_INITIAL_STATE={SET_VITAL_INITIAL_STATE} />
            <GenExamination generalExamData={generalExamData} Option={Option} />

            {Option.values.systemicExaminationCheck && (
              <>
                <Grid item container xs={12} md={12}>
                  <Grid
                    item
                    container
                    xs={6}
                    md={6}
                    className={classes.centerDiv}
                  >
                    <Grid item xs={12} md={2} className={classes.lebels}>
                      Systemic Examination
                    </Grid>

                    <Grid item xs={12} md={1} className={classes.lebels}>
                      CNS
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Textfield name="cns" placeholder="Enter Value Here" />
                    </Grid>

                    <Grid item xs={12} md={1} />

                    <Grid item xs={12} md={1} className={classes.lebels}>
                      CVS
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Textfield name="cvs" placeholder="Enter Value Here" />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={6}
                    md={6}
                    className={classes.centerDiv}
                  >
                    <Grid item xs={12} md={2} className={classes.lebels}>
                      Respiratory
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Textfield
                        name="respiratory"
                        placeholder="Enter Value Here"
                      />
                    </Grid>

                    <Grid item xs={12} md={1} />

                    <Grid item xs={12} md={2} className={classes.lebels}>
                      Per abdomen
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Textfield
                        name="perAbdomen"
                        placeholder="Enter Value Here"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}

            {Option.values.localExaminationCheck && (
              <>
                <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  className={classes.centerDiv}
                >
                  <Grid item xs={12} md={1} className={classes.lebels}>
                    Local Examination
                  </Grid>
                  <Grid item xs={12} md={1} className={classes.lebels}>
                    Inspection
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Textfield
                      name="inspection"
                      placeholder="Enter Value Here"
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={1} className={classes.lebels}>
                    Palpation
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Textfield
                      name="palpation"
                      placeholder="Enter Value Here"
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(GeneralExamination);
