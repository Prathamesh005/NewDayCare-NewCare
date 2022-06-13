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
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.96rem',
    },
  },
}));

function ImmunizationHistory(props) {
  const user = React.useContext(UserContext);
  const classes = useStyles();
  const [storedData, setStoredData] = useState([]);
  const [immunizationSetData, setImmunizationSetData] = useState([]);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url: 'http://hl7.org/fhir/ValueSet/vaccine-code',
    });
    setImmunizationSetData(payload && payload.message ? [] : payload);
  };

  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    setStoredData(props.prevImmunizationHistory);
  }, [props.prevImmunizationHistory]);

  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setImmunizationData(data);
  };
  const handleSaveEach = value => {
    setStoredData([
      ...storedData,
      {
        // "occurrence": data.field.immunizationDate,

        resourceId: uuidv4(),
        vaccineCode: {
          CodeableSystem: 'http://hl7.org/fhir/ValueSet/vaccine-code',
          code: value.code,
          text: value.display,
          display: value.display,
        },
      },
    ]);
    user.setCheckImmunization(true);
  };
  const handleSaveEdit = (value, id, editIndex) => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      resourceId: id,
      vaccineCode: {
        CodeableSystem: 'http://hl7.org/fhir/ValueSet/vaccine-code',
        code: value.code,
        text: value.display,
        display: value.display,
      },
    };
    setStoredData([...filteredStoredData]);
    user.setCheckImmunization(true);
  };
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs md={1} className={classes.lebels}>
          Immunization
        </Grid>

        <SelectOnly
          type={'immunization'}
          label={'Select Immunization'}
          options={
            immunizationSetData && immunizationSetData.length !== 0
              ? immunizationSetData
              : []
          }
          data={storedData}
          display="display"
          updateStoredData={handleUpdateStoredData}
          checkAnyUpdate={() => user.setCheckImmunization(true)}
          deleteData={data => user.setDelImmunizationData(data)}
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

export default compose(withConnect)(ImmunizationHistory);
