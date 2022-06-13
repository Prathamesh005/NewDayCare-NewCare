import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filter } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  doSearchTests,
  valueSetSearch,
} from '../../../apis/globalApis/globalSlice';
import { SquareAddIconButton } from '../../../components/button';
import SelectDateTextText from '../../../components/hocs/wrappers/SelectDateTextText';
import SelectTextDate from '../../../components/hocs/wrappers/SelectTextDate';
import { MessageComponent } from '../../../components';
import UserContext from '../MyStateContext';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import CheckBoxField from './forms/CheckBoxField';
import PopperComponent from './forms/PopperComponent';
import FamilyHistory from './medicalHistory/FamilyHistory';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';
import PastHospOtherIllness from './pastHistory/PastHospOtherIllness';
import PastHospPresentIllness from './pastHistory/PastHospPresentIllness';
import { useDebouncing } from '../../../hooks/useDebouncing';

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
    fontWeight: '400',
  },
}));

function PastHospitalizationHistory(props) {
  const user = React.useContext(UserContext);
  const {
    Option,
    SET_PAST_HISTORY_CHECK_INITIAL_STATE,
    SET_FAMILY_HISTORY_CHECK_INITIAL_STATE,
    OnLoadprevTestData,
    OnLoadprevTreatment,
    OnLoadprevFamily,
    OnLoadprevPastPertaining,
    OnLoadprevPastOther,
    prevTestResultData,
    familyHistoryData,
    pastPertainingIllnessData,
    pastOtherIllnessData,
    typesOfTreatment,
    pastOtherIllnessLoader,
  } = props;

  const classes = useStyles();

  const [expand1, setExpand1] = React.useState(true);
  const [OnLoadData, setOnLoadData] = React.useState([]);
  const [PrevTestResultSetData, setPrevTestResultSetData] = useState([]);
  const [PrevTestResultResponse, setPrevTestResultResponse] = useState([]);
  const [treatmentSetData, settreatmentSetData] = useState(null);
  const [storedData, setStoredData] = useState([]);
  const [storedDataTreatment, setStoredDataTreatment] = useState([]);
  const [open, setOpen] = React.useState(false);
  const codeableURL = {
    prevTest:
      'http://dataquent.com/fhir/us/custom/ValueSet/custom-nuqare-dev-lab-tests-vs',
    treatmentHistory:
      'http://dataquent.com/fhir/us/custom/ValueSet/custom-recist-vs',
  };
  const handleClick = toggle => event => {
    setOpen(toggle);
  };
  const checkBoxData = () => (
    <>
      <div>
        <CheckBoxField name="familyHistoryCheck" label="Family History" />
      </div>
      <div>
        <CheckBoxField
          name="pastHistoryPertainingIllnessCheck"
          label="Past Hospitalization Pertaining To Illness"
        />
      </div>
      <div>
        <CheckBoxField
          name="pastHistoryOtherIllnessCheck"
          label="Past Hospitalization Other Illness"
        />
      </div>
    </>
  );

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-treatment-type-vs',
    });
    settreatmentSetData(payload && payload.message ? [] : payload);
  };

  const calldoSearchTests = async test => {
    const { payload } = await props.doSearchTests(test);

    if (payload && payload.status === 200) {
      const { data } = payload;
      setPrevTestResultResponse(data && data.response && data.response.results);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
      setPrevTestResultResponse([]);
    }
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
    let field = {
      test: '',
    };
    calldoSearchTests(field);
  }, []);

  const getTestListsFromAPI = inputValue => {
    let field = {
      test: inputValue,
    };
    calldoSearchTests(field);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(getTestListsFromAPI);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  useEffect(() => {
    let value = PrevTestResultResponse;
    let res =
      value && value
        ? value.map(val => {
            return {
              code: val.shortname.raw,
              text: val.testcategoryname.raw,
              display: val.testname.raw,
            };
          })
        : [];
    setPrevTestResultSetData(res);
  }, [PrevTestResultResponse]);

  useEffect(() => {
    let pastPertainingIllnessCheck = false;
    let pastOtherIllnessCheck = false;

    if (pastPertainingIllnessData && pastPertainingIllnessData.length > 0) {
      pastPertainingIllnessCheck = true;
    }
    if (pastOtherIllnessData && pastOtherIllnessData.length > 0) {
      pastOtherIllnessCheck = true;
    }

    const INITIAL_FORM_STATE = {
      pastHistoryPertainingIllnessCheck: pastPertainingIllnessCheck,
      pastHistoryOtherIllnessCheck: pastOtherIllnessCheck,
    };

    SET_PAST_HISTORY_CHECK_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [pastPertainingIllnessData, pastOtherIllnessData]);

  useEffect(() => {
    let checkFamily = false;

    if (familyHistoryData && familyHistoryData.length > 0) {
      checkFamily = true;
    }
    const INITIAL_FORM_STATE = {
      familyHistoryCheck: checkFamily,
    };
    SET_FAMILY_HISTORY_CHECK_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [familyHistoryData]);

  useEffect(() => {
    if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
      setExpand1(false);
    } else {
      setExpand1(true);
    }
  }, [Option && Option.values && Option.values.checkFollowUp]);

  const onExpand = () => {
    setExpand1(!expand1);
  };

  useEffect(() => {
    let prevTestData =
      Array.isArray(OnLoadprevTestData) && OnLoadprevTestData.length > 0
        ? OnLoadprevTestData.map(ele => {
            return {
              condition: ele.code.display,
              note: ele.conclusion ? ele.conclusion : 'n/a',
            };
          })
        : [];

    let prevTreatment =
      Array.isArray(OnLoadprevTreatment) && OnLoadprevTreatment.length > 0
        ? OnLoadprevTreatment.map(ele => {
            return {
              condition: ele.type.split('/')[1],
              note: ele.briefTreatment ? ele.briefTreatment : 'n/a',
            };
          })
        : [];
    let prevFamily =
      Array.isArray(OnLoadprevFamily) && OnLoadprevFamily.length > 0
        ? OnLoadprevFamily.map(ele => {
            return {
              condition: ele.relationship.display,
              note:
                ele.condition &&
                ele.condition[0].code &&
                ele.condition[0].code.display,
            };
          })
        : [];

    let prevPastPertaining =
      Array.isArray(OnLoadprevPastPertaining) &&
      OnLoadprevPastPertaining.length > 0
        ? OnLoadprevPastPertaining.map(ele => {
            return {
              condition: ele.description ? ele.description : 'n/a',
              note: ele.note ? ele.note : 'n/a',
            };
          })
        : [];
    let prevPastOther =
      Array.isArray(OnLoadprevPastOther) && OnLoadprevPastOther.length > 0
        ? OnLoadprevPastOther.map(ele => {
            return {
              condition: ele.description ? ele.description : 'n/a',
              note: ele.note ? ele.note : 'n/a',
            };
          })
        : [];

    let res = [
      {
        title: 'Previous Test Results',
        subtitle: prevTestData,
        status: OnLoadprevTestData && OnLoadprevTestData.length > 0,
        type: 'isSubArrayAndNote',
      },
      {
        title: 'Type Of Treatment',
        subtitle: prevTreatment,
        status: OnLoadprevTreatment && OnLoadprevTreatment.length > 0,
        type: 'isSubArrayAndNote',
      },
      {
        title: 'Family History',
        subtitle: prevFamily,
        status: OnLoadprevFamily && OnLoadprevFamily.length > 0,
        type: 'isSubArrayAndNote',
      },
      {
        title: 'Present Illness',
        subtitle: prevPastPertaining,
        status: OnLoadprevPastPertaining && OnLoadprevPastPertaining.length > 0,
        type: 'isSubArrayAndNote',
      },
      {
        title: 'Other Illness',
        subtitle: prevPastOther,
        status: OnLoadprevPastOther && OnLoadprevPastOther.length > 0,
        type: 'isSubArrayAndNote',
      },
    ];

    setOnLoadData(filter(res, { status: true }));
  }, [
    OnLoadprevTestData,
    OnLoadprevTreatment,
    OnLoadprevFamily,
    OnLoadprevPastPertaining,
    OnLoadprevPastOther,
  ]);
  useEffect(() => {
    setStoredData(prevTestResultData);
  }, [prevTestResultData]);
  useEffect(() => {
    setStoredDataTreatment(typesOfTreatment);
  }, [typesOfTreatment]);
  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setPrevTestResultData(data);
  };
  const handleUpdateStoredDataTreatment = data => {
    setStoredDataTreatment(data);
    user.setTreatmentHistoryData(data);
  };
  const handleSaveEach = (selectedData, inputNote, dateOfTest) => {
    setStoredData([
      ...storedData,
      {
        code: {
          codeableSystem: codeableURL.prevTest,
          code: selectedData.code,
          text: selectedData.newEntry ? 'Other' : selectedData.text,
          display: selectedData.display,
        },
        newEntry: selectedData.newEntry,
        conclusion: inputNote !== '' ? inputNote || null : null,
        effectiveDateTime: dateOfTest || null,
        resourceId: uuidv4(),
      },
    ]);
    user.setCheckPrevTestResult(true);
  };

  const handleSaveEachTreatment = (
    selectedData,
    treatmentMonth,
    treatmentBrief,
    treatmentResponse,
  ) => {
    setStoredDataTreatment([
      ...storedDataTreatment,
      {
        resourceId: uuidv4(),
        type: `${selectedData.code}/${selectedData.display}`,
        date:
          treatmentMonth === 'Invalid date'
            ? null
            : treatmentMonth
            ? treatmentMonth
            : null,
        briefTreatment: treatmentBrief !== '' ? treatmentBrief : null,
        rECISTObservation:
          treatmentResponse !== ''
            ? {
                resourceId: uuidv4(),
                code: {
                  codeableSystem: codeableURL.treatmentHistory,
                  code: 'PR',
                  display: 'Partial Response (PR)',
                  text: 'Partial Response (PR)',
                },
                description: treatmentResponse || null,
              }
            : null,
      },
    ]);
    user.setCheckTreatmentHistory(true);
  };
  const handleSaveEdit = (
    selectedData,
    inputNote,
    dateOfTest,
    id,
    editIndex,
  ) => {
    const filteredStoredData = [...storedData];
    (filteredStoredData[editIndex] = {
      code: {
        codeableSystem: codeableURL.prevTest,
        code: selectedData.code,
        text: selectedData.newEntry ? 'Other' : selectedData.text,
        display: selectedData.display,
      },
      newEntry: selectedData.newEntry,
      conclusion: inputNote !== '' ? inputNote || null : null,
      effectiveDateTime: dateOfTest || null,
      resourceId: id,
    }),
      setStoredData([...filteredStoredData]);
    user.setCheckPrevTestResult(true);
  };
  const handleSaveEditTreatment = (
    selectedData,
    treatmentMonth,
    treatmentBrief,
    treatmentResponse,
    id1,
    id2,
    editIndex,
  ) => {
    const filteredStoredDataTreatment = [...storedDataTreatment];
    filteredStoredDataTreatment[editIndex] = {
      resourceId: id1,
      type: `${selectedData.code}/${selectedData.display}`,
      date:
        treatmentMonth === 'Invalid date'
          ? null
          : treatmentMonth
          ? treatmentMonth
          : null,
      briefTreatment: treatmentBrief !== '' ? treatmentBrief : null,
      rECISTObservation:
        treatmentResponse !== ''
          ? {
              resourceId: id2,
              code: {
                codeableSystem: codeableURL.treatmentHistory,
                code: 'PR',
                display: 'Partial Response (PR)',
                text: 'Partial Response (PR)',
              },
              description: treatmentResponse || null,
            }
          : null,
    };
    setStoredDataTreatment([...filteredStoredDataTreatment]);
    user.setCheckTreatmentHistory(true);
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
            <Grid item xs={12} md={2}>
              <Typography className={classes.headlabels}>
                Past History
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              {!expand1 ? (
                pastOtherIllnessLoader ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  <OnFollowUpVisitCard OnLoadData={OnLoadData} />
                )
              ) : (
                ''
              )}

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
            <Grid item container xs={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Previous Test Results
              </Grid>

              <SelectTextDate
                size="small"
                options={
                  PrevTestResultSetData && PrevTestResultSetData.length !== 0
                    ? PrevTestResultSetData
                    : []
                }
                type="hospitalizationTest"
                label="Name Of Test"
                code="code"
                display="display"
                getTestListsFromAPI={e => onHandleChange(e.target.value)}
                data={storedData || []}
                updateStoredData={handleUpdateStoredData}
                checkAnyUpdate={() => user.setCheckPrevTestResult(true)}
                deleteData={data => user.setDelPrevTestResultData(data)}
                saveData={handleSaveEach}
                saveEditData={handleSaveEdit}
              />
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Type Of Treatment
              </Grid>
              <SelectDateTextText
                size="small"
                options={
                  treatmentSetData && treatmentSetData.length > 0
                    ? treatmentSetData
                    : []
                }
                type="treatmentHistory"
                label="Select Treatment Type"
                labelBrief="Enter Brief Note"
                labelResponse="Enter Treatment Response"
                code="code"
                display="display"
                data={storedDataTreatment || []}
                updateStoredData={handleUpdateStoredDataTreatment}
                checkAnyUpdate={() => user.setCheckTreatmentHistory(true)}
                deleteData={data => {
                  user.setDelTreatmentHistoryData(data);
                }}
                saveData={handleSaveEachTreatment}
                saveEditData={handleSaveEditTreatment}
              />
            </Grid>

            {Option.values.familyHistoryCheck && (
              <FamilyHistory prevFamilyHistory={familyHistoryData} />
            )}

            {Option.values.pastHistoryPertainingIllnessCheck && (
              <Grid item container xs={12}>
                <Grid item xs={12} md={2} className={classes.lebels}>
                  Past Hospitalization Pertaining To Present Illness
                </Grid>
                <PastHospPresentIllness prevData={pastPertainingIllnessData} />
              </Grid>
            )}
            {Option.values.pastHistoryOtherIllnessCheck && (
              <Grid item container xs={12}>
                <Grid item xs={12} md={2} className={classes.lebels}>
                  Past Hospitalization Other Illness
                </Grid>
                <PastHospOtherIllness prevData={pastOtherIllnessData} />
              </Grid>
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
    doSearchTests: payload => dispatch(doSearchTests(payload)),
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
)(PastHospitalizationHistory);
