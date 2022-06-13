import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { valueSetSearch } from '../../../../apis/globalApis/globalSlice';
import SelectOnly from '../../../../components/hocs/wrappers/SelectOnly';
import UserContext from '../../MyStateContext';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
}));

function TreatmentForm(props) {
  const { treatmentPlanData } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [treatmentSetData, settreatmentSetData] = useState([]);
  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-treatment-type-vs',
    });
    settreatmentSetData(payload && payload.message ? [] : payload);
  };
  //-----------------API CALLS END---------------
  useEffect(() => {
    callValueSetSearch();
  }, []);

  const [storedData, setStoredData] = useState([]);
  useEffect(() => {
    setStoredData(treatmentPlanData);
  }, [treatmentPlanData]);

  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setTreatmentData(data);
  };
  const handleSaveEach = value => {
    // debugger;
    setStoredData([
      ...storedData,
      {
        display: value.newEntry
          ? `ServiceRequest|Custom/${value.display}`
          : `${value.code}/${value.display}`,
        resourceId: uuidv4(),
        newEntry: value.newEntry,
        // "resourceReference":"61a86857-968a-433f-894f-9210611cc154"
      },
    ]);
    user.setCheckTreatmentData(true);
  };
  const handleSaveEdit = (value, id, editIndex) => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      display: value.newEntry
        ? `ServiceRequest|Custom/${value.display}`
        : `${value.code}/${value.display}`,
      resourceId: id,
      newEntry: value.newEntry,
    };
    setStoredData([...filteredStoredData]);
    user.setCheckTreatmentData(true);
  };
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs={12} md={1} className={classes.lebels}>
          Treatment
        </Grid>
        <SelectOnly
          type={'treatment'}
          label={'Select Treatment'}
          options={
            treatmentSetData && treatmentSetData.length !== 0
              ? treatmentSetData
              : []
          }
          display="display"
          data={storedData}
          updateStoredData={handleUpdateStoredData}
          checkAnyUpdate={() => user.setCheckTreatmentData(true)}
          deleteData={data => user.setDelTreatmentData(data)}
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
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TreatmentForm);
