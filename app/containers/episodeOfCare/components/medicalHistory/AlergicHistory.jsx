import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { valueSetSearch } from '../../../../apis/globalApis/globalSlice';
import SelectText from '../../../../components/hocs/wrappers/SelectText';
import UserContext from '../../MyStateContext';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
}));

function AllergicHistory(props) {
  const { allergyData } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [finalStoredData, setFinalStoredData] = useState();
  const [finalDeletedData, setFinalDeletedData] = useState();
  const [finalCheckData, setFinalCheckData] = useState(false);
  const [allergySymptomData, setAllergySymptomData] = useState([]);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-allergy-trigger-factor-vs',
    });
    setAllergySymptomData(payload && payload.message ? [] : payload);
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    user.setDelAllergyData(finalDeletedData);
  }, [finalDeletedData]);
  useEffect(() => {
    user.setAllergyData(finalStoredData);
  }, [finalStoredData]);
  useEffect(() => {
    if (finalCheckData) user.setCheckAllergy(true);
  }, [finalCheckData]);

  // console.log("allergy", finalStoredData)
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs={12} md={1} className={classes.lebels}>
          Allergy
        </Grid>
        <SelectText
          size="small"
          options={
            allergySymptomData && allergySymptomData.length !== 0
              ? allergySymptomData
              : []
          }
          type="allergy"
          label="Select Allergy"
          code="code"
          display="display"
          prevData={allergyData && allergyData}
          codeableURL="http://dataquent.com/fhir/us/custom/ValueSet/custom-allergy-trigger-factor-vs"
          setFinalCheckData={check => setFinalCheckData(check)}
          setFinalStoredData={data => setFinalStoredData(data)}
          setFinalDeletedData={del => setFinalDeletedData(del)}
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

export default compose(withConnect)(AllergicHistory);
