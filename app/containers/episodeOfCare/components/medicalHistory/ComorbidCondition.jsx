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

function ComorbidCondition(props) {
  const { comorbidData } = props;
  const classes = useStyles();
  const [comorbidSetData, setcomorbidSetData] = useState([]);
  const user = React.useContext(UserContext);
  const [finalStoredData, setFinalStoredData] = useState();
  const [finalDeletedData, setFinalDeletedData] = useState();
  const [finalCheckData, setFinalCheckData] = useState(false);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-comorbid-condition-vs',
    });
    setcomorbidSetData(payload && payload.message ? [] : payload);
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    user.setDelComorbidityData(finalDeletedData);
  }, [finalDeletedData]);
  useEffect(() => {
    user.setComorbidityData(finalStoredData);
  }, [finalStoredData]);
  useEffect(() => {
    if (finalCheckData) user.setCheckComorbidity(true);
  }, [finalCheckData]);
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs={12} md={1} className={classes.lebels}>
          Comorbidity
        </Grid>
        <Grid item xs>
          <SelectText
            size="small"
            options={
              comorbidSetData && comorbidSetData.length !== 0
                ? comorbidSetData
                : []
            }
            type="comorbid"
            label="Select Condition"
            code="code"
            display="display"
            prevData={comorbidData && comorbidData}
            codeableURL="http://dataquent.com/fhir/us/custom/ValueSet/custom-comorbid-condition-vs"
            setFinalCheckData={check => setFinalCheckData(check)}
            setFinalStoredData={data => setFinalStoredData(data)}
            setFinalDeletedData={del => setFinalDeletedData(del)}
          />
        </Grid>
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

export default compose(withConnect)(ComorbidCondition);
