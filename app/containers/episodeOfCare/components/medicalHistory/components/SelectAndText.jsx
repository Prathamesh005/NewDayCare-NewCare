import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../../../MyStateContext';
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
      fontWeight: '400',
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
  textInsideList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #707070',
    borderRadius: '3px',
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
}));
const SelectAndText = ({ id, label, options, code, display, prevData }) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(true);
  const [noOldData, setNoOldData] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [inputNote, setInputNote] = useState('');
  const [optionsArray, setOptionsArray] = useState([...options]);

  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);

  useEffect(() => {
    setOptionsArray([...options]);
  }, [options]);
  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setComorbidityData(storedData);
  }, [storedData]);

  const handleClick = () => {
    // setStoredData([...storedData, selectedData])
    setOpenMainAdd(false);
  };
  const handleDelete = (ele, index) => {
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);

    const deleted = storedData.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    user.setCheckComorbidity(true);
  };
  useEffect(() => {
    user.setDelComorbidityData(deletedData);
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

  const handleSaveNote = e => {
    // debugger
    setInputNote(e.target.value);
    setStoredData([
      ...storedData,
      {
        resourceId: uuidv4(),
        code: {
          codeableSystem:
            'http://dataquent.com/fhir/us/custom/ValueSet/custom-comorbid-condition-vs',
          code: selectedData.code,
          display: selectedData.display,
          text: selectedData.display,
        },
        note: e.target.value,
      },
    ]);
    handleExit();
    user.setCheckComorbidity(true);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(true);
    setSelectedData();
  };

  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <Autocomplete
              freeSolo
              size="small"
              disableClearable
              autoFocus
              id="comorbid-select-1"
              style={{ width: 300 }}
              value={selectedData}
              onChange={(e, value) => {
                //top
                // debugger;
                if (typeof value === 'string') {
                  setSelectedData({ code: value, display: value });
                } else if (value && value.inputValue) {
                  setSelectedData({
                    code: value.inputValue,
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
              options={optionsArray}
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
                          code: e.target.value,
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
            {storedData.map((ele, index) => (
              <li key={index.toString()} className={classes.listItem}>
                <div className={classes.textInsideList}>
                  <Typography className={classes.textDisplay}>
                    {id === 'comorbid' &&
                      `${ele.code.display} ${ele.note ? `- ${ele.note}` : ''}`}
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
            ))}
            <li className={classes.listItem}>
              {openAdd && openMainAdd ? (
                <div className={classes.options} onClick={handleClick}>
                  <AddIcon />
                </div>
              ) : openAdd ? (
                <Autocomplete
                  freeSolo
                  size="small"
                  autoFocus
                  disableClearable
                  id="comorbid-select"
                  onChange={(e, value) => {
                    //btm
                    // debugger
                    if (typeof value === 'string') {
                      setSelectedData({ code: value, display: value });
                    } else if (value && value.inputValue) {
                      setSelectedData({
                        code: value.inputValue,
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
                  options={optionsArray}
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
                        if (e.target.value) {
                          if (typeof e.target.value === 'string') {
                            setSelectedData({
                              code: e.target.value,
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
                        placeholder: label,
                        className: classes.input2,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  )}
                />
              ) : (
                <div className={classes.textInsideList}>
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
                      handleSaveNote(e);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSaveNote(e);
                      }
                    }}
                    InputProps={{
                      placeholder: 'Enter Note',
                      className: classes.input3,
                      classes: { notchedOutline: classes.noBorder },
                    }}
                  />
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
                <div className={classes.options} onClick={handleClickBtn}>
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
export default SelectAndText;
