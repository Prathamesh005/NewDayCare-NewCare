import { Grid, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getPatientList } from '../../../apis/globalApis/globalSlice';
import { useDebouncing } from '../../../hooks/useDebouncing';
import IconSearch from '../../../images/assets/Search icon.svg';
import {
  deleteKeyFromLocalStorage,
  setToLocalStorage,
} from '../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';

const useStyles = makeStyles(theme => ({
  textField: {
    border: '1.5px solid #c1c1c1',
    borderRadius: 5,
    '& .MuiOutlinedInput-input': {
      padding: '6px 6px 6px 6px',
      background: '#ffffff',
      fontSize: '0.9rem',
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  noBorder: {
    border: 'none',
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
}));

const IndexSearch = props => {
  const { patientListData } = props;
  const classes = useStyles();
  const history = useHistory();
  const raiseInvoiceClicked = Id => {
    deleteKeyFromLocalStorage('resourceId');
    setToLocalStorage('resourceId', Id);
    history.push(ROUTES_CONSTANTS.PATIENT_EVERYTHING);
  };

  const [selectedPatient, setSelectedPatient] = useState({});
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options && options.length > 0;

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  useEffect(() => {
    setOptions(patientListData);
  }, [patientListData]);

  const getPatientDataFromAPI = async inputData => {
    const { payload } = await props.getPatientList({
      patientName: inputData,
    });
    if (payload.data) {
      setOptions(payload.data.cancerPatients);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
    setOpen(true);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(getPatientDataFromAPI);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  const handleSelection = newValue => {
    if (newValue) {
      raiseInvoiceClicked(newValue.patient.resourceId);
      setSelectedPatient({});
    }
  };

  return (
    <>
      <Autocomplete
        id="patientSearch"
        size="small"
        options={(options && options) || []}
        open={open}
        onOpen={() => {
          _.isEmpty(patientListData)
            ? getPatientDataFromAPI('')
            : setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        value={selectedPatient}
        renderOption={option => {
          const optionValue = option && option.patient && option.patient;
          const nameValue = optionValue.display.split('/')[0];
          const age = optionValue.display.split('/')[3];
          const gender =
            optionValue.display.split('/')[1] === 'Male'
              ? 'M'
              : optionValue.display.split('/')[1] === 'Female'
              ? 'F'
              : 'O';
          const mobile = optionValue.display.split('/')[2];
          const nQPatientId = optionValue.nQPatientId;
          return (
            <Grid container style={{ fontSize: '1rem', color: '#373737' }}>
              <Grid item xs={8}>
                {nameValue} - {age}/{gender} &nbsp; &nbsp;
              </Grid>
              <Grid
                item
                xs={4}
                style={{ textAlign: 'right', color: '#B4B4B4' }}
              >
                {nQPatientId}
              </Grid>
              <Grid item xs={12}>
                (+91- {mobile})
              </Grid>
            </Grid>
          );
        }}
        onChange={(event, newValue) => {
          handleSelection(newValue);
        }}
        getOptionLabel={option =>
          (option &&
            option.patient &&
            option.patient.display &&
            option.patient.display.split('/')[0]) ||
          ''
        }
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Search Patient"
            variant="outlined"
            onChange={e => onHandleChange(e.target.value)}
            className={classes.textField}
            InputProps={{
              ...params.InputProps,
              className: classes.input1,
              classes: { notchedOutline: classes.noBorder },
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <img src={IconSearch} height="16px" width="16px" />
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    getPatientList: payload => dispatch(getPatientList(payload)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withRouter,
  memo,
)(IndexSearch);
