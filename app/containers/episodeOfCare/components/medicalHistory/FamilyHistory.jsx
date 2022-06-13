import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { valueSetSearch } from '../../../../apis/globalApis/globalSlice';
import SelectSelectNumRadio from '../../../../components/hocs/wrappers/SelectSelectNumRadio';
import UserContext from '../../MyStateContext';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
}));

function FamilyHistory(props) {
  const classes = useStyles();
  const [familyRelationData, setfamilyRelationData] = useState([]);
  const [familyMedicalData, setfamilyMedicalData] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const user = React.useContext(UserContext);
  const codeableURL = {
    familyRelation:
      'http://dataquent.com/fhir/us/custom/ValueSet/custom-family-relationship-vs',
    cancerType:
      'http://dataquent.com/fhir/us/custom/ValueSet/custom-cancer-type-vs',
    outcome:
      'http://dataquent.com/fhir/us/custom/ValueSet/custom-primary-condition-clinical-status-vs',
  };
  const handleSaveEach = (
    selectedRelation,
    selectedCancerType,
    age,
    status,
  ) => {
    if (selectedCancerType) {
      setStoredData([
        ...storedData,
        {
          resourceId: uuidv4(),
          relationship: {
            codeableSystem: codeableURL.familyRelation,
            code: selectedRelation.code,
            text: selectedRelation.display,
            display: selectedRelation.display,
          },
          condition: [
            {
              code: {
                codeableSystem: codeableURL.cancerType,
                code: selectedCancerType.code,
                text: selectedCancerType.display,
                display: selectedCancerType.display,
              },
              outcome: {
                codeableSystem: codeableURL.outcome,
                code: status.code,
                text: status.display,
                display: status.display,
              },
              onSetAge: age,
            },
          ],
        },
      ]);
      user.setCheckFamilyHistory(true);
    }
  };
  const handleSaveEdit = (
    selectedRelation,
    selectedCancerType,
    age,
    status,
    id,
    editIndex,
  ) => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      resourceId: id,
      relationship: {
        codeableSystem: codeableURL.familyRelation,
        code: selectedRelation.code,
        text: selectedRelation.display,
        display: selectedRelation.display,
      },
      condition: [
        {
          code: {
            codeableSystem: codeableURL.cancerType,
            code: selectedCancerType.code,
            text: selectedCancerType.display,
            display: selectedCancerType.display,
          },
          outcome: {
            codeableSystem: codeableURL.outcome,
            code: status.code,
            text: status.display,
            display: status.display,
          },
          onSetAge: age,
        },
      ],
    };
    setStoredData([...filteredStoredData]);
    user.setCheckFamilyHistory(true);
  };
  useEffect(() => {
    setStoredData(props.prevFamilyHistory);
  }, [props.prevFamilyHistory]);
  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setFamilyHistoryData(data);
  };

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const relationValueSetData = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-family-relationship-vs',
    });
    setfamilyRelationData(
      relationValueSetData && relationValueSetData.payload.message
        ? []
        : relationValueSetData.payload,
    );

    const cancerValueSetData = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/ValueSet/custom-cancer-type-vs',
    });
    setfamilyMedicalData(
      cancerValueSetData && cancerValueSetData.payload.message
        ? []
        : cancerValueSetData.payload,
    );
  };
  //-----------------API CALLS END---------------
  useEffect(() => {
    callValueSetSearch();
  }, []);

  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs md={1} className={classes.lebels}>
          Family History
        </Grid>

        <SelectSelectNumRadio
          size="small"
          optionsSelectOne={
            familyRelationData && familyRelationData.length !== 0
              ? familyRelationData
              : []
          }
          optionsSelectTwo={
            familyMedicalData && familyMedicalData.length !== 0
              ? familyMedicalData
              : []
          }
          type="familyHistory"
          labelSelectOne="Select Relation"
          labelSelectTwo="Cancer Type"
          numPlaceHolder="Age"
          code="code"
          display="display"
          data={storedData}
          updateStoredData={handleUpdateStoredData}
          checkAnyUpdate={() => user.setCheckFamilyHistory(true)}
          deleteData={data => {
            user.setDelFamilyHistoryData(data);
          }}
          saveData={handleSaveEach}
          saveEditData={handleSaveEdit}
          mandatory={'selectedDataTwo'}
        />
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FamilyHistory);
