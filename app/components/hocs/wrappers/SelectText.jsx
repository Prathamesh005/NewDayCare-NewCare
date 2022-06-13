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
import InputTextField from '../components/InputTextField';
import EditIcon from '@material-ui/icons/Edit';
import {
  CloseIconButton,
  EditIconButton,
  EditIconSquareButton,
} from '../../button';
import InputSelectAndSearch from '../components/InputSelectAndSearch';

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
  textField1: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: '400',
      padding: '0px',
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
const SelectText = ({
  id,
  label,
  options,
  code,
  display,
  prevData,
  codeableURL,
  type,
  ...props
}) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [inputNote, setInputNote] = useState('');
  const [optionsArray, setOptionsArray] = useState([...options]);
  const [editIndex, setEditIndex] = useState('');
  const [editResourceId, setEditResourceId] = useState('');
  const [deletedData, setdeletedData] = useState([]);

  useEffect(() => {
    setOptionsArray([...options]);
  }, [options]);
  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    props.setFinalStoredData(storedData);
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
    props.setFinalCheckData(true);
  };
  useEffect(() => {
    props.setFinalDeletedData(deletedData);
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
  const handleSaveEditNote = e => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      resourceId: editResourceId,
      code: {
        codeableSystem: codeableURL,
        code: selectedData.code,
        display: selectedData.display,
        text: selectedData.display,
      },
      note: e.target.value,
    };
    setStoredData([...filteredStoredData]);
    handleExit();
    setEditIndex();
    setInputNote('');
    setEditResourceId('');
    props.setFinalCheckData(true);
  };
  const handleSaveEditAllergyNote = e => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      resourceId: editResourceId,
      reaction: [
        {
          substance: {
            code: selectedData.code,
            codeableSystem: codeableURL,
            display: selectedData.display,
            text: selectedData.display,
          },
        },
      ],
      note: e.target.value,
    };
    setStoredData([...filteredStoredData]);
    handleExit();
    setEditIndex();
    setInputNote('');
    setEditResourceId('');
    props.setFinalCheckData(true);
  };
  const handleSaveNote = e => {
    debugger;
    setInputNote(e.target.value);
    setStoredData([
      ...storedData,
      {
        resourceId: uuidv4(),
        code: {
          codeableSystem: codeableURL,
          code: selectedData.code,
          display: selectedData.display,
          text: selectedData.display,
        },
        note: e.target.value,
      },
    ]);
    handleExit();
    props.setFinalCheckData(true);
  };
  const handleSaveAllergyNote = e => {
    debugger;
    setInputNote(e.target.value);
    setStoredData([
      ...storedData,
      {
        resourceId: uuidv4(),
        reaction: [
          {
            substance: {
              code: selectedData.code,
              codeableSystem: codeableURL,
              display: selectedData.display,
              text: selectedData.display,
            },
          },
        ],
        note: e.target.value,
      },
    ]);
    handleExit();
    props.setFinalCheckData(true);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
    setSelectedData();
  };
  const handleEdit = (e, index, ele) => {
    setOpenMainAdd(true);
    setInputNote('');
    setEditIndex(index);
    if (type === 'comorbid') {
      setSelectedData(ele.code);
      setInputNote(ele.note);
      setEditResourceId(ele.resourceId);
    } else if (type === 'allergy') {
      setSelectedData(ele.reaction[0]['substance']);
      setInputNote(ele.note);
      setEditResourceId(ele.resourceId);
    }
  };
  // console.log("type", type)
  // console.log("storedData", storedData)
  // console.log("type", type)
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputSelectAndSearch
              id="select-1"
              name="select-1"
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
              options={optionsArray}
              display="display"
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
            {storedData.map((ele, index) => {
              return (
                <li key={index.toString()} className={classes.listItem}>
                  {editIndex !== index ? (
                    <div className={classes.textInsideList}>
                      <Typography className={classes.textDisplay}>
                        {type === 'comorbid' &&
                          `${ele.code.display} ${
                            ele.note ? `- ${ele.note}` : ''
                          }`}
                        {type === 'allergy' &&
                          `${
                            ele.reaction[0].substance
                              ? ele.reaction[0].substance.display
                              : ''
                          } ${ele.note ? `- ${ele.note}` : ''}`}
                      </Typography>
                      <EditIconSquareButton
                        onClick={e => handleEdit(e, index, ele)}
                        edge="end"
                        iconProps={{ style: { width: '14px' } }}
                        style={{ height: '20px', margin: '0px 5px' }}
                      />
                      <CloseIconButton
                        onClick={() => handleDelete(ele, index)}
                        edge="end"
                        iconProps={{ style: { width: '14px' } }}
                        style={{ height: '20px' }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className={classes.textInsideList}>
                        <InputSelectAndSearch
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          value={selectedData}
                          id="select-2"
                          name="select-2"
                          onChange={(e, value) => {
                            const nextSibling = document.querySelector(
                              `input[name='note1']`,
                            );
                            nextSibling.focus();
                            if (typeof value === 'string') {
                              debugger;
                              setSelectedData({ code: value, display: value });
                            } else if (value && value.inputValue) {
                              debugger;
                              setSelectedData({
                                code: value.inputValue,
                                display: value.inputValue,
                              });
                            } else {
                              setSelectedData(value);
                            }
                          }}
                          display="display"
                          options={optionsArray}
                          renderInput={params => (
                            <TextField
                              {...params}
                              className={classes.textField1}
                              style={{
                                marginTop: '0px',
                                marginBottom: '0px',
                                padding: '0px',
                              }}
                              autoFocus
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{ shrink: false }}
                              onBlur={e => {
                                const nextSibling = document.querySelector(
                                  `input[name='note1']`,
                                );
                                nextSibling.focus();
                                if (e.target.value) {
                                  if (typeof e.target.value === 'string') {
                                    setSelectedData({
                                      code: e.target.value,
                                      display: e.target.value,
                                    });
                                  } else {
                                    setSelectedData(e.target.value);
                                  }
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
                        <InputTextField
                          classStyle="textField"
                          name="note1"
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            marginLeft: '0.5rem',
                            fontSize: '0.4rem',
                            padding: '0px 2px',
                          }}
                          variant="outlined"
                          value={inputNote}
                          onChange={e => setInputNote(e.target.value)}
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            if (type === 'comorbid') {
                              handleSaveEditNote(e);
                            } else if (type === 'allergy') {
                              handleSaveEditAllergyNote(e);
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              if (type === 'comorbid') {
                                handleSaveEditNote(e);
                              } else if (type === 'allergy') {
                                handleSaveEditAllergyNote(e);
                              }
                            }
                          }}
                          placeholder="Enter Note"
                        />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
            <li className={classes.listItem}>
              {openAdd && openMainAdd ? (
                <div className={classes.options} onClick={handleClick}>
                  <AddIcon />
                </div>
              ) : openAdd ? (
                <InputSelectAndSearch
                  id="select-3"
                  name="select-3"
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
                    setInputNote('');
                  }}
                  options={optionsArray}
                  display="display"
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
                          setInputNote('');
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
                  <InputTextField
                    classStyle="textField"
                    name="note2"
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    autoFocus
                    value={inputNote}
                    onChange={e => setInputNote(e.target.value)}
                    onBlur={e => {
                      if (type === 'comorbid') {
                        handleSaveNote(e);
                      } else if (type === 'allergy') {
                        handleSaveAllergyNote(e);
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (type === 'comorbid') {
                          handleSaveNote(e);
                        } else if (type === 'allergy') {
                          handleSaveAllergyNote(e);
                        }
                      }
                    }}
                    placeholder="Enter Note"
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
export default SelectText;
