import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { doSearchMolecularTest } from '../../../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../../../components';
import { EPISODE_DATE_FORMAT } from '../../../../../utils/constants';
import UserContext from '../../../MyStateContext';

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: '400',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 500,
    },
    '& .MuiFormControl-marginDense': {
      marginTop: '4px',
    },
    margin: theme.spacing(0.5),
  },
  textField2: {
    '& .MuiOutlinedInput-input': {
      fontSize: '1rem',
      fontWeight: 'normal',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
    },
    '& .MuiFormControl-marginDense': {
      marginTop: '4px',
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: '0.1px 0.5px',
    },
    margin: theme.spacing(0.5),
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  input2: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  input3: {
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: '2px',
    // '&:focus': {
    //     background: "#F4F4F4 !important",
    // },
    // '&:active': {
    //     background: "#F4F4F4 !important",
    // },
    // '&:hover': {
    //     background: "#F4F4F4 !important",
    // },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '2px',
    },
    disableUnderline: true,
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '4px',
    fontSize: 'small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    cursor: 'pointer',
    width: 'fit-content',
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: 'transparent',
    paddingLeft: '0px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
  },
  textDisplay: {
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '0.4rem',
    '& .MuiIconButton-edgeEnd': {
      marginRight: '0px',
    },
  },
  textInsideList1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #707070',
    borderRadius: '3px',
    marginRight: '0.5rem',
  },
  textInsideList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #707070',
    borderRadius: '3px',
    marginRight: '0.5rem',
    padding: '0px 5px',
  },
  smallRadioButton: {
    '& svg': {
      width: '1rem',
      height: '1rem',
    },
    marginBottom: '0px',
  },
  radio: {
    color: theme.palette.button.paginated.color,
    padding: '3px',
    '&$checked': {
      color: theme.palette.button.paginated.color,
    },
  },
  checked: {},
  partition: {
    borderLeft: '0.5px solid #707070',
    padding: '3px 0px',
  },
}));
const MolecularTestSelectTextDate = props => {
  const { id, label, code, display, prevData, cancerTypeArr } = props;

  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(true);
  const [noOldData, setNoOldData] = useState();
  const [status, setStatus] = useState('Alive');
  const [dateOfTest, setDateOfTest] = useState(null);
  const [inputNote, setInputNote] = useState('');
  const wrapperRef = useRef(null);
  const [loadValueSet, setLoadValueSet] = useState(true);
  const [MolecularTestSetData, setMolecularTestSetData] = useState([]);
  const [MolecularTestSetResponse, setMolecularTestSetResponse] = useState([]);

  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);

  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setMolecularTestResultData(storedData);
  }, [storedData]);

  const handleDelete = (ele, index) => {
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);

    const deleted = storedData.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    user.setCheckMolecularTestResult(true);
  };
  useEffect(() => {
    user.setDelMolecularTestResultData(deletedData);
  }, [deletedData]);

  const handleSubmit = () => {
    setStoredData([
      ...storedData,
      {
        code: {
          codeableSystem:
            'http://dataquent.com/fhir/us/custom/ValueSet/custom-nuqare-dev-lab-tests-vs',
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
    setSelectedData();
    setInputNote();
    setDateOfTest();
    setOpenAdd(true);
    user.setCheckMolecularTestResult(true);
  };
  const handleAddNew = () => {
    setOpenMainAdd(false);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(true);
  };
  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };

  //-----------------API CALLS ---------------
  const callSearchMolecularTest = async test => {
    const { payload } = await props.doSearchMolecularTest(test);

    if (payload && payload.status === 200) {
      const { data } = payload;
      setMolecularTestSetResponse(
        data && data.response && data.response.results,
      );
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

  const getPatientDataFromAPI = e => {
    let inputValue = e.target.value;
    // debugger
    callSearchMolecularTest(inputValue);
  };
  useEffect(() => {
    callSearchMolecularTest('');
  }, []);
  useEffect(() => {
    let value = MolecularTestSetResponse;
    let res =
      value !== null
        ? value.map(val => {
            return {
              code: val.testcategoryname.raw,
              text: val.shortname.raw,
              display: val.testname.raw,
            };
          })
        : [];

    setMolecularTestSetData(res);
  }, [MolecularTestSetResponse]);
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <Autocomplete
              freeSolo
              size="small"
              autoFocus
              disableClearable
              id={'prev-test-result'}
              style={{ width: 220 }}
              onChange={(e, value) => {
                if (typeof value === 'string') {
                  setSelectedData({
                    code: 'MOLECULAR',
                    display: e.target.value,
                    text: e.target.value,
                    newEntry: true,
                  });
                } else if (value && value.inputValue) {
                  setSelectedData({
                    code: 'MOLECULAR',
                    display: value.inputValue,
                    text: value.inputValue,
                    newEntry: true,
                  });
                } else {
                  setSelectedData({ ...value, newEntry: false });
                }

                setNoOldData(false);
                setOpenAdd(false);
                setOpenMainAdd(false);
              }}
              filterOptions={(x, s) => {
                // debugger;
                const matchingValueArr = [];
                x &&
                  x.length > 0 &&
                  x.forEach(ele => {
                    if (
                      ele.display &&
                      ele.display
                        .toLowerCase()
                        .includes(s['inputValue'].toLowerCase())
                    )
                      matchingValueArr.push(ele);
                    else if (
                      ele.code &&
                      ele.code
                        .toLowerCase()
                        .includes(s['inputValue'].toLowerCase())
                    )
                      matchingValueArr.push(ele);
                  });
                if (s.inputValue !== '') {
                  if (
                    x.find(item =>
                      item.display
                        .toLowerCase()
                        .includes(s['inputValue'].toLowerCase()),
                    ) === undefined &&
                    x.find(item =>
                      item.code
                        .toLowerCase()
                        .includes(s['inputValue'].toLowerCase()),
                    ) === undefined
                  ) {
                    matchingValueArr.push({
                      inputValue: s.inputValue,
                      display: `Add "${s.inputValue}"`,
                    });
                  }
                }
                // debugger;
                return matchingValueArr;
              }}
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.display;
                }
                return option.display;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={
                MolecularTestSetData && MolecularTestSetData.length !== 0
                  ? MolecularTestSetData
                  : []
              }
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  // error={ false }
                  // helperText="Required"
                  onChange={e => getPatientDataFromAPI(e)}
                  onBlur={e => {
                    if (e.target.value) {
                      if (typeof e.target.value === 'string') {
                        setSelectedData({
                          code: 'MOLECULAR',
                          display: e.target.value,
                          text: e.target.value,
                          newEntry: true,
                        });
                      } else {
                        setSelectedData(e.target.value);
                      }
                      setNoOldData(false);
                      setOpenAdd(false);
                      setOpenMainAdd(false);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    placeholder: label,
                    className: classes.input1,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
            />
          }
        </Grid>
      ) : (
        <Grid item xs>
          <Paper elevation={0} component="ul" className={classes.root}>
            {storedData.map((ele, index) => {
              // debugger;
              return (
                <li key={index.toString()} className={classes.listItem}>
                  <div className={classes.textInsideList1}>
                    <Typography className={classes.textDisplay}>
                      {ele.code.display}

                      {ele.conclusion ? ` - ${ele.conclusion}` : ''}
                    </Typography>

                    {ele.effectiveDateTime &&
                      moment(ele.effectiveDateTime).format('YYYY') !==
                        '0001' && (
                        <div className={classes.partition}>
                          <Typography
                            className={classes.textDisplay}
                            style={{ minWidth: 85 }}
                          >
                            {moment(ele.effectiveDateTime).format(
                              EPISODE_DATE_FORMAT,
                            )}
                          </Typography>
                        </div>
                      )}

                    <IconButton
                      onClick={() => handleDelete(ele, index)}
                      edge="end"
                      className={classes.textDisplay}
                      style={{ padding: '0px 10px' }}
                    >
                      <CloseIcon style={{ fontSize: '1rem' }} />
                    </IconButton>
                  </div>
                </li>
              );
            })}
            <li className={classes.listItem}>
              {openAdd && openMainAdd ? (
                <div className={classes.options} onClick={handleAddNew}>
                  <AddIcon />
                </div>
              ) : openAdd ? (
                <Autocomplete
                  freeSolo
                  size="small"
                  autoFocus
                  disableClearable
                  id={'prev-test-result-1'}
                  // loading={loadValueSet}
                  onChange={(e, value) => {
                    if (typeof value === 'string') {
                      setSelectedData({
                        code: 'MOLECULAR',
                        display: e.target.value,
                        text: e.target.value,
                        newEntry: true,
                      });
                    } else if (value && value.inputValue) {
                      setSelectedData({
                        code: 'MOLECULAR',
                        display: value.inputValue,
                        text: value.inputValue,
                        newEntry: true,
                      });
                    } else {
                      setSelectedData({ ...value, newEntry: false });
                    }
                    setOpenAdd(false);
                  }}
                  filterOptions={(x, s) => {
                    // debugger;
                    const matchingValueArr = [];
                    x &&
                      x.length > 0 &&
                      x.forEach(ele => {
                        if (
                          ele.display &&
                          ele.display
                            .toLowerCase()
                            .includes(s['inputValue'].toLowerCase())
                        )
                          matchingValueArr.push(ele);
                        else if (
                          ele.code &&
                          ele.code
                            .toLowerCase()
                            .includes(s['inputValue'].toLowerCase())
                        )
                          matchingValueArr.push(ele);
                      });
                    if (s.inputValue !== '') {
                      if (
                        x.find(item =>
                          item.display
                            .toLowerCase()
                            .includes(s['inputValue'].toLowerCase()),
                        ) === undefined &&
                        x.find(item =>
                          item.code
                            .toLowerCase()
                            .includes(s['inputValue'].toLowerCase()),
                        ) === undefined
                      ) {
                        matchingValueArr.push({
                          inputValue: s.inputValue,
                          display: `Add "${s.inputValue}"`,
                        });
                      }
                    }
                    return matchingValueArr;
                  }}
                  getOptionLabel={option => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.display;
                    }
                    return option.display;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={
                    MolecularTestSetData && MolecularTestSetData.length !== 0
                      ? MolecularTestSetData
                      : []
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      style={{ marginTop: '0px', marginBottom: '0px' }}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      onChange={e => getPatientDataFromAPI(e)}
                      // error={ false }
                      // helperText="Required"
                      onBlur={e => {
                        if (e.target.value) {
                          if (typeof e.target.value === 'string') {
                            setSelectedData({
                              code: 'MOLECULAR',
                              display: e.target.value,
                              text: e.target.value,
                              newEntry: true,
                            });
                          } else {
                            setSelectedData(e.target.value);
                          }
                          setOpenAdd(false);
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        placeholder: label,
                        className: classes.input2,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                    />
                  )}
                />
              ) : (
                <div className={classes.textInsideList} ref={wrapperRef}>
                  <Typography className={classes.textDisplay}>
                    {selectedData.display}
                  </Typography>
                  <TextField
                    className={classes.textField2}
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    autoFocus
                    onBlur={e => {
                      setInputNote(e.target.value);
                    }}
                    InputProps={{
                      placeholder: 'Enter Note',
                      className: classes.input3,
                      classes: { notchedOutline: classes.noBorder },
                    }}
                  />
                  <div className={classes.partition}>
                    <TextField
                      className={classes.textField2}
                      style={{
                        margin: '0px 0.2rem',
                        fontSize: '0.4rem',
                        padding: '6px 2px',
                        width: 'auto',
                      }}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="Select Date"
                      onBlur={e => {
                        setDateOfTest(e.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        type: 'date',
                        placeholder: 'Select Date',
                        className: classes.input3,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                      inputProps={{
                        max: moment(new Date()).format('YYYY-MM-DD'),
                      }}
                    />
                  </div>
                  <IconButton
                    onClick={() => handleExit()}
                    edge="end"
                    style={{ padding: '0px 10px' }}
                  >
                    <CloseIcon style={{ fontSize: '1rem' }} />
                  </IconButton>
                </div>
              )}
            </li>
            {!openAdd && !openMainAdd && (
              <li className={classes.listItem}>
                <div className={classes.options} onClick={handleSubmit}>
                  <AddIcon />
                </div>
              </li>
            )}
          </Paper>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({});

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
)(MolecularTestSelectTextDate);
