import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    // '&:before': {
    //     display: 'none',
    // },
    // '&$expanded': {
    //     margin: 'auto',
    // },
    width: '100%',
  },

  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
    borderRadius: 'inherit',

    opacity: 1,
  },
  content: {
    '&>p': {
      fontSize: '14px !important',
      fontWeight: 'bold !important',
      color: ' #000000',
    },
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles(theme => ({
  accordionTabStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '0.8rem',
    width: '95%',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkBoxStyle: {
    '& .MuiTypography-body1': {
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.button.paginated.color,
    },
  },
}));
export default function AccordionTab(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('');
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    // debugger;
    if (props.open == true) {
      // debugger;
      setExpanded('panel1');
    }
  }, []);
  useEffect(() => {
    if (props.close === true) {
      setExpanded('');
    }
  }, [props.close]);
  const [state, setState] = React.useState({
    reasonForVisit: true,
    historyOfPresentIllness: true,
    generalAndSystemicExam: true,
    treatmentPlan: true,
    discussion: true,
    additionalNote: true,
    impressionForVisit: true,
    referredTo: true,
    comorbidity: true,
    familyHistory: true,
    lifeStyleIndicators: true,
    allergy: true,
    previousTestResults: true,
  });
  const {
    reasonForVisit,
    historyOfPresentIllness,
    historiesAndConditions,
    generalAndSystemicExam,
    treatmentPlan,
    discussion,
    additionalNote,
    impressionForVisit,
    referredTo,
    comorbidity,
    familyHistory,
    lifeStyleIndicators,
    allergy,
    previousTestResults,
  } = state;
  useEffect(() => {
    props.handleSelectChange(state);
  }, [state]);
  const handleChangeCheck = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  return (
    <Accordion
      square
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      className={classes.accordionTabStyle}
      onClick={() => props.handleClick()}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Customized Summary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* <FormControl required error={error} component="fieldset" className={classes.formControl}> */}
        <FormControl component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend">Pick two</FormLabel> */}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasonForVisit}
                  onChange={handleChangeCheck}
                  name="reasonForVisit"
                />
              }
              label="Reason For Visit"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={historyOfPresentIllness}
                  onChange={handleChangeCheck}
                  name="historyOfPresentIllness"
                />
              }
              label="History of Present Illness"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={comorbidity}
                  onChange={handleChangeCheck}
                  name="comorbidity"
                />
              }
              label="Comorbidity History"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={familyHistory}
                  onChange={handleChangeCheck}
                  name="familyHistory"
                />
              }
              label="Family History"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={lifeStyleIndicators}
                  onChange={handleChangeCheck}
                  name="lifeStyleIndicators"
                />
              }
              label="Lifestyle Indicators"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={allergy}
                  onChange={handleChangeCheck}
                  name="allergy"
                />
              }
              label="Allergy History"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={generalAndSystemicExam}
                  onChange={handleChangeCheck}
                  name="generalAndSystemicExam"
                />
              }
              label="General & Systemic Examination"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={impressionForVisit}
                  onChange={handleChangeCheck}
                  name="impressionForVisit"
                />
              }
              label="Impression For Visit"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={previousTestResults}
                  onChange={handleChangeCheck}
                  name="previousTestResults"
                />
              }
              label="Previous Test Interpretations"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={treatmentPlan}
                  onChange={handleChangeCheck}
                  name="treatmentPlan"
                />
              }
              label="Treatment Plan"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={discussion}
                  onChange={handleChangeCheck}
                  name="discussion"
                />
              }
              label="Discussion"
              className={classes.checkBoxStyle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={additionalNote}
                  onChange={handleChangeCheck}
                  name="additionalNote"
                />
              }
              label="Additional Note"
              className={classes.checkBoxStyle}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={referredTo}
                  onChange={handleChangeCheck}
                  name="referredTo"
                />
              }
              label="Referred To"
              className={classes.checkBoxStyle}
            />
          </FormGroup>
          {/* <FormHelperText>You can display an error</FormHelperText> */}
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}
