import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
      fontWeight: 400,
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
    fontWeight: '500',
  },
  textInsideList1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #707070',
    borderRadius: '3px',
    marginRight: '0.5rem',
    padding: '0.5rem',
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
const SelectTextRadio = ({
  id,
  label,
  options,
  code,
  display,
  prevData,
  cancerTypeArr,
}) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(true);
  const [noOldData, setNoOldData] = useState();
  const [status, setStatus] = useState('Alive');
  const [selectedCancerType, setSelectedCancerType] = useState(null);
  const [ageAtDiagnosis, setAgeAtDiagnosis] = useState(null);
  const [statusArray, setStatusArray] = useState([
    { code: 'Alive', display: 'Alive' },
    { code: 'Deceased', display: 'Deceased' },
  ]);
  const [inputNote, setInputNote] = useState('');
  const wrapperRef = useRef(null);

  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);

  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setFamilyHistoryData(storedData);
  }, [storedData]);

  const handleDelete = (ele, index) => {
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);
    const deleted = storedData.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    user.setCheckFamilyHistory(true);
  };
  useEffect(() => {
    user.setDelFamilyHistoryData(deletedData);
  }, [deletedData]);
  const handleClickBtn = () => {
    setStoredData([
      ...storedData,
      {
        code: {
          code: selectedData.code,
          display: selectedData.display,
        },
        note: e.target.value,
      },
    ]);
    handleExit();
  };
  const handleSubmit = () => {
    if (selectedCancerType) {
      setStoredData([
        ...storedData,
        {
          resourceId: uuidv4(),
          relationship: {
            codeableSystem:
              'http://dataquent.com/fhir/us/custom/ValueSet/custom-family-relationship-vs',
            code: selectedData.code,
            text: selectedData.display,
            display: selectedData.display,
          },
          condition: [
            {
              code: {
                codeableSystem:
                  'http://dataquent.com/fhir/us/custom/ValueSet/custom-cancer-type-vs',
                code: selectedCancerType.code,
                text: selectedCancerType.display,
                display: selectedCancerType.display,
              },
              outcome:
                status === 'Alive'
                  ? {
                      codeableSystem:
                        'http://dataquent.com/fhir/us/custom/ValueSet/custom-primary-condition-clinical-status-vs',
                      code: 'alive',
                      text: 'Alive',
                      display: 'Alive',
                    }
                  : {
                      codeableSystem:
                        'http://dataquent.com/fhir/us/custom/ValueSet/custom-primary-condition-clinical-status-vs',
                      code: 'deceased',
                      text: 'Deceased',
                      display: 'Deceased',
                    },
              onSetAge: ageAtDiagnosis,
            },
          ],
        },
      ]);
    }
    setSelectedCancerType();
    setSelectedData();
    setAgeAtDiagnosis();
    setStatus('Alive');
    setOpenAdd(true);
    user.setCheckFamilyHistory(true);
    // debugger;
  };
  const handleAddNew = () => {
    setOpenMainAdd(false);
  };
  const handleExit = () => {
    setSelectedCancerType();
    setSelectedData();
    setAgeAtDiagnosis();
    setStatus('Alive');
    setOpenAdd(true);
    setOpenMainAdd(true);
  };
  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };
  // useEffect(() => {
  //     function handleClickOutside(event) {
  //         if ( wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //             alert("You clicked outside of me!");
  //         }
  //     }
  //     // Bind the event listener
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //         // Unbind the event listener on clean up
  //         document.removeEventListener("mousedown", handleClickOutside);
  //     };
  // }, [wrapperRef]);
  // console.log(selectedCancerType)
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <Autocomplete
              size="small"
              disableClearable
              debug
              style={{ width: 300 }}
              onChange={(e, value) => {
                setSelectedData(value);
                setNoOldData(false);
                setOpenAdd(false);
                setOpenMainAdd(false);
              }}
              getOptionLabel={option => option.display}
              options={options}
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  // error={ false }
                  // helperText="Required"
                  InputProps={{
                    ...params.InputProps,
                    placeholder: label,
                    className: classes.input1,
                    classes: { notchedOutline: classes.noBorder },
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
                      {ele.relationship.display} -{' '}
                      {ele.condition[0].code.display} - Age :{' '}
                      {ele.condition[0].onSetAge
                        ? ele.condition[0].onSetAge
                        : 'N/a'}{' '}
                      -{' '}
                      {ele.condition[0].outcome &&
                        ele.condition[0].outcome.display}
                    </Typography>
                    <IconButton
                      onClick={() => handleDelete(ele, index)}
                      edge="end"
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
                  size="small"
                  disableClearable
                  debug
                  onChange={(e, value) => {
                    setSelectedData(value);
                    setOpenAdd(false);
                  }}
                  getOptionLabel={option => option.display}
                  options={options}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      style={{ marginTop: '0px', marginBottom: '0px' }}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      // error={ false }
                      // helperText="Required"
                      InputProps={{
                        ...params.InputProps,
                        placeholder: label,
                        className: classes.input2,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  )}
                />
              ) : (
                <div className={classes.textInsideList} ref={wrapperRef}>
                  <Typography className={classes.textDisplay}>
                    {selectedData.display}
                  </Typography>
                  <Autocomplete
                    size="small"
                    disableClearable
                    debug
                    onChange={(e, value) => {
                      setSelectedCancerType(value);
                    }}
                    getOptionLabel={option => option.display}
                    options={cancerTypeArr}
                    renderInput={params => (
                      <TextField
                        {...params}
                        className={classes.textField2}
                        style={{
                          marginTop: '0px',
                          marginBottom: '0px',
                          marginLeft: '0.5rem',
                          fontSize: '0.4rem',
                          padding: '0px 2px',
                          width: 'auto',
                        }}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        // error={ false }
                        // helperText="Required"
                        InputProps={{
                          ...params.InputProps,
                          placeholder: 'Cancer Type',
                          className: classes.input3,
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    )}
                  />
                  <div className={classes.partition}>
                    {!selectedCancerType ? (
                      <TextField
                        className={classes.textField2}
                        style={{
                          margin: '0px 0.2rem',
                          fontSize: '0.4rem',
                          padding: '6px 2px',
                          width: '110px',
                          border: '0.5px solid #cacaca',
                          borderRadius: '3px',
                        }}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        disabled
                        InputProps={{
                          placeholder: 'Age at Diagnosis',
                          className: classes.input3,
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    ) : (
                      <TextField
                        className={classes.textField2}
                        style={{
                          margin: '0px 0.2rem',
                          fontSize: '0.4rem',
                          padding: '6px 2px',
                          width: '110px',
                          border: '0.5px solid #cacaca',
                          borderRadius: '3px',
                        }}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        autoFocus
                        onBlur={e => {
                          // debugger;
                          setAgeAtDiagnosis(e.target.value);
                        }}
                        InputProps={{
                          placeholder: 'Enter Age',
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography
                                variant="h4"
                                style={{
                                  fontWeight: 500,
                                  color: '#444444',
                                  opacity:
                                    selectedCancerType === null ? 0.5 : 0.9,
                                }}
                              >
                                Years
                              </Typography>
                            </InputAdornment>
                          ),
                          className: classes.input3,
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    )}
                  </div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="status"
                      name="status"
                      value={status}
                      onChange={handleChangeStatus}
                      style={{ marginLeft: '15px' }}
                    >
                      {statusArray &&
                        statusArray.map((item, index) => {
                          return (
                            <FormControlLabel
                              value={item.code}
                              control={
                                <Radio
                                  disabled={Boolean(
                                    selectedCancerType === null ||
                                      selectedCancerType === undefined,
                                  )}
                                  classes={{
                                    root: classes.radio,
                                    checked: classes.checked,
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  variant="h4"
                                  style={{
                                    fontWeight: 500,
                                    color: '#444444',
                                    opacity:
                                      selectedCancerType === null ? 0.5 : 0.9,
                                  }}
                                >
                                  {item.display}
                                </Typography>
                              }
                              key={index.toString()}
                              className={classes.smallRadioButton}
                            />
                          );
                        })}
                    </RadioGroup>
                  </FormControl>
                  <IconButton
                    onClick={() => handleExit()}
                    edge="end"
                    style={{ padding: '0px 10px' }}
                  >
                    <CloseIcon style={{ fontSize: '0.9rem' }} />
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
export default SelectTextRadio;
