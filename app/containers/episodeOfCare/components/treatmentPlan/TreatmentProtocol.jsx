import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { treatmentProtocolValueset } from '../../../../apis/globalApis/globalSlice';
import AutoCompleteTextSearchAdmin from '../forms/AutoCompleteTextSearchAdmin';
import RadioButton from '../forms/RadioButton';

const filterArray = createFilterOptions();
const useStyles = makeStyles(theme => ({
  lebels: {
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
  iconButton: {
    padding: '0px 0px 0px 15px',
  },
  noBorder: {
    border: 'none',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#ffffff',
      fontSize: '1rem',
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  input1: {
    background: '#ffffff',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#ffffff !important',
    },
    '&:active': {
      background: '#ffffff !important',
    },
    '&:hover': {
      background: '#ffffff !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  centerDiv: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function TreatmentProtocol(props) {
  const {
    Option,
    SET_TREATMENT_PROTOCOL_INITIAL_STATE,
    treatmentProtocolData,
    treatmentIntentData,
  } = props;

  const classes = useStyles();
  const [lastTreatmentArr, setLastTreatmentArr] = useState([]);

  const [
    treatmentProtocolCycleData,
    settreatmentProtocolCycleData,
  ] = React.useState([]);

  const callValueSetSearch = async id => {
    const { payload } = await props.treatmentProtocolValueset({
      id: id,
    });
    setLastTreatmentArr(
      payload.message ? [] : payload.data.cancerMedicationRequests,
    );
  };

  useEffect(() => {
    if (props.Id != '') {
      callValueSetSearch(props.Id);
    }
  }, [props.Id]);

  useEffect(() => {
    let intentOfTreatment = '';
    let regimen = { resourceId: '', regimen: '' };
    let cycle = '';
    let editTreatmentAdminId = '';

    if (
      treatmentProtocolData !== [] &&
      treatmentProtocolData &&
      treatmentProtocolData.recordCount != null
    ) {
      const { regimenProtocolRequests } = treatmentProtocolData;

      if (regimenProtocolRequests.length > 0) {
        if (regimenProtocolRequests[0].cycle != null) {
          cycle = regimenProtocolRequests[0].cycle;
        }

        if (regimenProtocolRequests[0].regimen) {
          regimen = {
            resourceId: regimenProtocolRequests[0].resourceId,
            regimen: regimenProtocolRequests[0].regimen,
          };
        }
      }
    }

    if (treatmentIntentData) {
      if (
        treatmentIntentData &&
        treatmentIntentData.display === 'Curative - procedure intent'
      ) {
        intentOfTreatment = 'Curative';
      }
      if (
        treatmentIntentData &&
        treatmentIntentData.display === 'Palliative - procedure intent'
      ) {
        intentOfTreatment = 'Palliative';
      }
    }

    const INITIAL_FORM_STATE = {
      intentOfTreatment: intentOfTreatment,
      regimen: regimen,
      treatmentProtocolCycle: cycle,
    };

    SET_TREATMENT_PROTOCOL_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [treatmentProtocolData, treatmentIntentData]);

  useEffect(() => {
    const { regimen, intentOfTreatment } = Option.values;

    props.setOnLoadTreatmentProtocolData([
      {
        title: 'Treatment Protocol',
        subtitle: regimen && regimen.regimen,
        status: regimen && regimen.regimen && regimen.regimen !== '',
      },
      {
        title: 'Treatment Type',
        subtitle: intentOfTreatment && intentOfTreatment,
        status: intentOfTreatment && intentOfTreatment !== '',
      },
    ]);
  }, [Option.values]);

  useEffect(() => {
    function generateValue() {
      var res = [];
      for (var i = 0; i <= 30; i += 1) {
        res.push(i);
      }
      return res;
    }

    var result = generateValue();
    let res = [];

    result.forEach(val => {
      res.push({ code: val, display: `${val}` });
    });

    settreatmentProtocolCycleData(res);
  }, []);

  const choices = [
    { key: 'Curative', value: 'Curative' },
    { key: 'Palliative', value: 'Palliative' },
  ];
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item container xs={12} md={4}>
          <Grid item xs={12} md={3} className={classes.lebels}>
            Treatment Protocol
          </Grid>
          <Grid item xs={12} md={8} className={classes.centerDiv}>
            <div
              style={{
                display: 'flex',
                boxShadow: '0px 0px 2px 0px grey',
                borderRadius: 5,
              }}
            >
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>

              <AutoCompleteTextSearchAdmin
                id="regimen"
                options={
                  lastTreatmentArr && lastTreatmentArr.length !== 0
                    ? lastTreatmentArr
                    : []
                }
                label="Select Regimen"
                name="regimen"
                value={Option.values.regimen}
                code="resourceId"
                display="regimen"
                filterOptions={(optionsArray, params) => {
                  const filtered = filterArray(optionsArray, params);
                  // debugger;
                  // Suggest the creation of a new value
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      regimen: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                getOptionLabel={option => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.regimen;
                  }
                  return option.regimen;
                }}
                onChange={(e, value) => {
                  if (value) {
                    if (typeof value === 'string') {
                      Option.setFieldValue('regimen', {
                        resourceId: parseInt(''),
                        regimen: value,
                      });
                    } else if (value && value.inputValue) {
                      Option.setFieldValue('regimen', {
                        resourceId: parseInt(''),
                        regimen: value.inputValue,
                      });
                    } else
                      Option.setFieldValue('regimen', {
                        resourceId: value['resourceId'],
                        regimen: value['regimen'],
                      });
                    // debugger
                  }
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.textField}
                    style={{ marginTop: '0px', marginBottom: '0px' }}
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    onBlur={e => {
                      if (e.target.value) {
                        if (typeof e.target.value === 'string') {
                          Option.setFieldValue('regimen', {
                            resourceId: parseInt(''),
                            regimen: e.target.value,
                          });
                        }
                      } else if (e.target.value === '') {
                        Option.setFieldValue('regimen', {
                          resourceId: parseInt(''),
                          regimen: '',
                        });
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      placeholder: 'Select Regimen',
                      className: classes.input1,
                      classes: { notchedOutline: classes.noBorder },
                    }}
                  />
                )}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={4}>
          <Grid item xs={12} md={4} className={classes.lebels}>
            Treatment Type
          </Grid>
          <Grid item xs={12} md={8} className={classes.centerDiv}>
            <RadioButton
              row={true}
              name="intentOfTreatment"
              value={Option.values.intentOfTreatment}
              options={choices}
              onChange={Option.handleChange}
            />
          </Grid>
        </Grid>

        {/* <Grid item xs={12} md={1} className={classes.lebels}>
            Number of Cycles
        </Grid>
        <Grid item xs={12} md={2}>
          <Textfield 
            name="treatmentProtocolCycle"
            placeholder=""
            type="number"
            style={{boxShadow: '0px 0px 2px 0px grey',borderRadius: 2}}
          />
            
        </Grid>
        <Grid item xs={12} md={1}></Grid> */}
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    treatmentProtocolValueset: payload =>
      dispatch(treatmentProtocolValueset(payload)),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TreatmentProtocol);
