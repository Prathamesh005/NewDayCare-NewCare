import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MolecularTestSelectTextDate from './components/MolecularTestSelectTextDate';
import { MessageComponent } from '../../../../components';
import UserContext from '../../MyStateContext';
import SelectTextDate from '../../../../components/hocs/wrappers/SelectTextDate';
import { doSearchMolecularTest } from '../../../../apis/globalApis/globalSlice';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncing } from '../../../../hooks/useDebouncing';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
}));

function MolecularTesting(props) {
  const classes = useStyles();
  const { molecularTesting } = props;
  const user = React.useContext(UserContext);
  const [MolecularTestSetResponse, setMolecularTestSetResponse] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const codeableMolecularTesting =
    "'http://dataquent.com/fhir/us/custom/ValueSet/custom-nuqare-dev-lab-tests-vs'";

  useEffect(() => {
    setStoredData(molecularTesting);
  }, [molecularTesting]);
  useEffect(() => {
    callSearchMolecularTest('');
  }, []);
  const callSearchMolecularTest = async test => {
    const { payload } = await props.doSearchMolecularTest(test);

    if (payload && payload.status === 200) {
      const { data } = payload;
      let value = data && data.response && data.response.results;
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
      setMolecularTestSetResponse(res);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
      setMolecularTestSetResponse([]);
    }
  };

  //-----------------API CALLS END---------------
  const getTestListsFromAPI = inputValue => {
    callSearchMolecularTest(inputValue);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(getTestListsFromAPI);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setMolecularTestResultData(data);
  };
  const handleSaveEach = (selectedData, inputNote, dateOfTest) => {
    setStoredData([
      ...storedData,
      {
        code: {
          codeableSystem: codeableMolecularTesting,
          code: 'MOLECULAR',
          text: selectedData.text,
          display: selectedData.display,
        },
        conclusion: inputNote !== '' ? inputNote : null,
        effectiveDateTime: dateOfTest || null,
        resourceId: uuidv4(),
        newEntry: selectedData.newEntry,
      },
    ]);
    user.setCheckMolecularTestResult(true);
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
        codeableSystem: codeableMolecularTesting,
        code: 'MOLECULAR',
        text: selectedData.text,
        display: selectedData.display,
      },
      newEntry: selectedData.newEntry,
      conclusion: inputNote !== '' ? inputNote || null : null,
      effectiveDateTime: dateOfTest || null,
      resourceId: id,
    }),
      setStoredData([...filteredStoredData]);
    user.setCheckMolecularTestResult(true);
  };
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs={12} md={1} className={classes.lebels}>
          Molecular Testing
        </Grid>

        {/* <MolecularTestSelectTextDate
          size="small"
          // options={PrevTestResultSetData && PrevTestResultSetData.length !== 0 ? PrevTestResultSetData : []}
          id="MolecularTest"
          label="Name Of Test"
          code="code"
          display="display"
          prevData={molecularTesting}
        /> */}
        <SelectTextDate
          size="small"
          options={MolecularTestSetResponse}
          type="MolecularTest"
          label="Name Of Test"
          code="code"
          display="display"
          getTestListsFromAPI={e => onHandleChange(e.target.value)}
          data={storedData || []}
          updateStoredData={handleUpdateStoredData}
          checkAnyUpdate={() => user.setCheckMolecularTestResult(true)}
          deleteData={data => user.setDelMolecularTestResultData(data)}
          saveData={handleSaveEach}
          saveEditData={handleSaveEdit}
        />
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;
export function mapDispatchToProps(dispatch) {
  return {
    doSearchMolecularTest: payload => dispatch(doSearchMolecularTest(payload)),
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
)(MolecularTesting);
