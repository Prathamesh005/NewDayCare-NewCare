import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../../MyStateContext';
const filterArray = createFilterOptions();

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    marginRight: '0px',
  },
  datepick: {
    width: '70px',
    border: 'none',
    textAlign: 'center',
    marginLeft: '10px',
  },
}));
const SelectTextTreatmentHistory = ({
  id,
  label,
  options,
  code,
  display,
  prevData,
  cancerTypeArr,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(true);
  const [noOldData, setNoOldData] = useState();
  const [treatmentMonth, setTreatmentMonth] = useState(null);
  const [treatmentBrief, setTreatmentBrief] = useState(null);
  const [treatmentResponse, setTreatmentResponse] = useState(null);
  const [ageAtDiagnosis, setAgeAtDiagnosis] = useState(null);
  const [statusArray, setStatusArray] = useState([
    { code: 'Alive', display: 'Alive' },
    { code: 'Deceased', display: 'Deceased' },
  ]);
  const [inputNote, setInputNote] = useState('');
  const wrapperRef = useRef(null);

  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);
  // console.log("storedData",storedData)
  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setTreatmentHistoryData(storedData);
  }, [storedData]);

  const handleDelete = (ele, index) => {
    // debugger;
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);

    if (filteredData.length === 0) {
      // debugger;
      setNoOldData(true);
      setOpenAdd(true);
    }

    const deleted = storedData.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    user.setCheckTreatmentHistory(true);
  };
  useEffect(() => {
    user.setDelTreatmentHistoryData(deletedData);
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
    // debugger;
    setStoredData([
      ...storedData,
      {
        resourceId: uuidv4(),
        type: `${selectedData.code}/${selectedData.display}`,
        date: treatmentMonth || null,
        briefTreatment: treatmentBrief !== '' ? treatmentBrief : null,
        rECISTObservation:
          treatmentResponse !== ''
            ? {
                resourceId: uuidv4(),
                code: {
                  codeableSystem:
                    'http://dataquent.com/fhir/us/custom/ValueSet/custom-recist-vs',
                  code: 'PR',
                  display: 'Partial Response (PR)',
                  text: 'Partial Response (PR)',
                },
                description: treatmentResponse || null,
              }
            : null,
      },
    ]);
    setSelectedData(null);
    setTreatmentMonth(null);
    setTreatmentBrief(null);
    setTreatmentResponse(null);
    setOpenAdd(true);
    // debugger;
    user.setCheckTreatmentHistory(true);
  };
  const handleAddNew = () => {
    setOpenMainAdd(false);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
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

  const onNewBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSubmit();
    }
  };
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
              id={'select-treatment-history'}
              style={{ width: 300 }}
              onChange={(e, value) => {
                if (typeof value === 'string') {
                  setSelectedData({
                    code: 'ServiceRequest|Custom',
                    display: value,
                  });
                } else if (value && value.inputValue) {
                  setSelectedData({
                    code: 'ServiceRequest|Custom',
                    display: value.inputValue,
                  });
                } else {
                  setSelectedData(value);
                }
                setNoOldData(false);
                setOpenAdd(false);
                setOpenMainAdd(false);
              }}
              filterOptions={(optionsArray, params) => {
                const filtered = filterArray(optionsArray, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    display: `Add "${params.inputValue}"`,
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
                  return option.inputValue;
                }
                return option.display;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={options}
              renderOption={option => option.display}
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  onBlur={e => {
                    // debugger;
                    if (e.target.value) {
                      if (typeof e.target.value === 'string') {
                        setSelectedData({
                          code: 'ServiceRequest|Custom',
                          display: e.target.value,
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
                      <span>{ele.type.split('/')[1]}</span>{' '}
                      <span>
                        {ele.date && moment(ele.date).format('YYYY') !== '0001'
                          ? `- ${moment(ele.date).format('YYYY-MM-DD')}`
                          : ''}
                      </span>{' '}
                      - <span>Brief:</span>{' '}
                      {ele.briefTreatment ? ele.briefTreatment : 'N/a'} -{' '}
                      <span>Response:</span>{' '}
                      {ele.rECISTObservation &&
                      ele.rECISTObservation.description
                        ? ele.rECISTObservation.description
                        : 'N/a'}
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
                  freeSolo
                  size="small"
                  disableClearable
                  autoFocus
                  id="select-treatment-history-2"
                  onChange={(e, value) => {
                    if (typeof value === 'string') {
                      setSelectedData({
                        code: 'ServiceRequest|Custom',
                        display: value,
                      });
                    } else if (value && value.inputValue) {
                      setSelectedData({
                        code: 'ServiceRequest|Custom',
                        display: value.inputValue,
                      });
                    } else {
                      setSelectedData(value);
                    }
                    setOpenAdd(false);
                  }}
                  filterOptions={(optionsArray, params) => {
                    const filtered = filterArray(optionsArray, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        display: `Add "${params.inputValue}"`,
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
                      return option.inputValue;
                    }
                    return option.display;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={options}
                  renderOption={option => option.display}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      style={{ marginTop: '0px', marginBottom: '0px' }}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      onBlur={e => {
                        // debugger;
                        if (e.target.value) {
                          if (typeof e.target.value === 'string') {
                            setSelectedData({
                              code: 'ServiceRequest|Custom',
                              display: e.target.value,
                            });
                          } else {
                            setSelectedData(e.target.value);
                          }
                          setOpenAdd(false);
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        placeholder: 'Select Treatment Type',
                        className: classes.input2,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  )}
                />
              ) : (
                <div className={classes.textInsideList} onBlur={onNewBlur}>
                  <Typography className={classes.textDisplay}>
                    {selectedData.display}
                  </Typography>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0rem',
                    }}
                  >
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
                      autoFocus
                      size="small"
                      placeholder="Select Date"
                      onChange={e => {
                        setTreatmentMonth(e.target.value);
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
                      // helperText={touched.appointmentDate && errors.appointmentDate}
                      // error={Boolean(touched.appointmentDate && errors.appointmentDate)}
                    />
                    {/* <CalendarTodayIcon style={{ fontSize: "15px", margin: "0px 10px" }} /> */}
                  </label>

                  <div className={classes.partition}>
                    <TextField
                      className={classes.textField2}
                      style={{
                        margin: '0px 0.2rem',
                        fontSize: '0.4rem',
                        padding: '6px 2px',
                        width: '250px',
                        border: '0.5px solid #cacaca',
                        borderRadius: '2px',
                      }}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      // disabled={Boolean(treatmentMonth !== null || treatmentMonth !== undefined )}
                      onChange={e => {
                        // debugger;
                        setTreatmentBrief(e.target.value);
                      }}
                      InputProps={{
                        placeholder: 'Enter Brief Note',
                        className: classes.input3,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                    <TextField
                      className={classes.textField2}
                      style={{
                        margin: '0px 0.2rem',
                        fontSize: '0.4rem',
                        padding: '6px 2px',
                        width: '250px',
                        border: '0.5px solid #cacaca',
                        borderRadius: '2px',
                      }}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      // disabled={Boolean(treatmentMonth !== null || treatmentMonth !== undefined )}
                      onChange={e => {
                        // debugger;
                        setTreatmentResponse(e.target.value);
                      }}
                      InputProps={{
                        placeholder: 'Enter Treatment Response',
                        className: classes.input3,
                        classes: { notchedOutline: classes.noBorder },
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
export default SelectTextTreatmentHistory;
