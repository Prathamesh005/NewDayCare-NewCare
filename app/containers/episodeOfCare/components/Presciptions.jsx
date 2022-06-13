import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  doSearchDrug,
  valueSetSearch,
} from '../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../components';
import { useDebouncing } from '../../../hooks/useDebouncing';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import PrescriptionTable from './prescription/PrescriptionTable';

const useStyles = makeStyles(theme => ({
  headlabels: {
    fontSize: '1rem',
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
    fontWeight: '500',
  },
}));

function Presciption(props) {
  // debugger
  const { prescriptionLoader, prescriptionData } = props;
  const classes = useStyles();
  const [expand1, setExpand1] = React.useState(true);
  const [openAddNewRowInput, setOpenAddNewRowInput] = useState(false);
  const columnArray = [
    'Form',
    'Drug Name',
    'Frequency',
    'Instruction',
    'Duration',
    'Notes',
    '',
  ];
  const [prescriptionArray, setPrescriptionArray] = useState([]);
  const [frequencyValueSet, setFrequencyValueSet] = useState([]);

  const [instructionsValueSet, setInstructionsValueSet] = useState([]);
  const [drugFormValueSet, setDrugFormValueSet] = useState([]);
  const [drugFormSystemURL, setDrugFormSystemURL] = useState('');
  const [arrOfDrugsName, setArrOfDrugsName] = useState([]);
  const [drugsNameSystemURL, setDrugsNameSystemURL] = useState('');
  const [drugsNameResourceId, setDrugsNameResourceId] = useState('');
  const [frquencySystemURL, setFrequencySystemURL] = useState('');
  const [inputDrugsName, setInputDrugsName] = useState('');

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const frequencyValueSet = await props.valueSetSearch({
      url: 'http://hl7.org/fhir/ValueSet/timing-abbreviation',
      systemUrl: true,
    });

    setFrequencyValueSet(
      frequencyValueSet && frequencyValueSet.payload.message
        ? []
        : frequencyValueSet.payload.concept,
    );
    setFrequencySystemURL(
      frequencyValueSet && frequencyValueSet.payload.message
        ? []
        : frequencyValueSet.payload.system,
    );

    const instructionsValueSet = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/prescription-instruction-timing',
      systemUrl: true,
    });

    setInstructionsValueSet(
      instructionsValueSet && instructionsValueSet.payload.message
        ? []
        : instructionsValueSet.payload.concept,
    );

    const drugFormValueSet = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/ValueSet/forms-of-drug-vs',
      systemUrl: true,
    });

    setDrugFormValueSet(
      drugFormValueSet && drugFormValueSet.payload.message
        ? []
        : drugFormValueSet.payload.concept,
    );
    setDrugFormSystemURL(
      drugFormValueSet && drugFormValueSet.payload.message
        ? []
        : drugFormValueSet.payload.system,
    );
  };

  const calldoDrugTests = async field => {
    const { payload } = await props.doSearchDrug(field);

    if (payload && payload.status === 200) {
      const { data } = payload;
      setArrOfDrugsName(data && data.response && data.response.results);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
      setArrOfDrugsName([]);
    }
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    if (inputDrugsName !== null) {
      let field = {
        drug: inputDrugsName,
      };
      calldoDrugTests(field);
    }

    callValueSetSearch();
  }, []);

  useEffect(() => {
    if (inputDrugsName !== null) {
      let field = {
        drug: inputDrugsName,
      };
      calldoDrugTests(field);
    }
  }, [inputDrugsName]);
  useEffect(() => {
    if (prescriptionData && prescriptionData.length > 0) {
      // debugger;
      setPrescriptionArray(prescriptionData);
    }
  }, [prescriptionData]);
  const handleChangeInput = value => {
    console.log('value', value);
    setInputDrugsName(value);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(handleChangeInput);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  return (
    <Fragment>
      <Accordion
        expanded={expand1}
        onChange={() => setExpand1(!expand1)}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Typography className={classes.headlabels}>
                Prescription
              </Typography>
            </Grid>
            <Grid item xs={12} md={10} className={classes.centerGrid}>
              <Typography className={classes.secondarylabels} />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            {!prescriptionLoader ? (
              <Grid item container xs={12}>
                <PrescriptionTable
                  column={columnArray}
                  arrOfDrugsName={arrOfDrugsName}
                  arrayOfPrescribedMedicine={prescriptionArray}
                  frequencyValueSet={frequencyValueSet}
                  instructionsValueSet={instructionsValueSet}
                  openAddNewRowInput={openAddNewRowInput}
                  drugFormValueSet={drugFormValueSet}
                  handleChangeInput={onHandleChange}
                  disabled={true}
                />
              </Grid>
            ) : (
              <Skeleton variant="rect" width="100%" height="200px" />
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;
export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    doSearchDrug: payload => dispatch(doSearchDrug(payload)),

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
)(Presciption);
