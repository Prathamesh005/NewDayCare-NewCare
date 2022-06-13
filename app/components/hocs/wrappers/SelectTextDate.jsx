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
import moment from 'moment';
import { EPISODE_DATE_FORMAT } from '../../../utils/constants';

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
    // padding: '0.4rem',
    marginRight: 5,
    marginLeft: 5,
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
  partition: {
    borderLeft: '0.5px solid #707070',
    marginLeft: '0px 3px',
  },
}));
const SelectTextDate = ({
  id,
  label,
  options,
  data,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
  type,
  getTestListsFromAPI,
}) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [inputNote, setInputNote] = useState('');
  const [dateOfTest, setDateOfTest] = useState(null);
  const [optionsArray, setOptionsArray] = useState([...options]);
  const [editIndex, setEditIndex] = useState('');
  const [editResourceId, setEditResourceId] = useState('');
  const [deletedData, setdeletedData] = useState([]);

  useEffect(() => {
    setOptionsArray([...options]);
  }, [options]);
  useEffect(() => {
    setNoOldData(Boolean(Array.isArray(data) && data.length == 0));
    updateStoredData(data);
  }, [data]);

  const handleClick = () => {
    // setStoredData([...data, selectedData])
    setOpenMainAdd(false);
  };
  const handleDelete = (ele, index) => {
    const filteredData = data.filter((item, ind) => ind !== index);
    updateStoredData(filteredData);

    const deleted = data.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    checkAnyUpdate();
  };
  useEffect(() => {
    deleteData(deletedData);
  }, [deletedData]);

  const handleClickBtn = () => {
    // setStoredData([
    //     ...data,
    //     {
    //         code: {
    //             code: selectedData.code,
    //             display: selectedData.display,
    //         },
    //         note: e.target.value,
    //     },
    // ]);
    // handleExit();
  };
  const handleSaveEditNote = e => {
    saveEditData(
      selectedData,
      inputNote,
      dateOfTest,
      editResourceId,
      editIndex,
    );
    handleExit();
    setEditIndex();
    setEditResourceId('');
    setSelectedData();
    setInputNote();
    setDateOfTest();
    // setOpenAdd(true);
  };

  const handleSubmit = (test, note, dateInput) => {
    // debugger;
    saveData(test, note, dateInput);
    setSelectedData();
    setInputNote();
    setDateOfTest();
    setOpenAdd(true);
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
    if (type === 'hospitalizationTest' || type === 'MolecularTest') {
      setSelectedData(ele.code);
      setInputNote(ele.conclusion);
      setDateOfTest(ele.effectiveDateTime);
      setEditResourceId(ele.resourceId);
    }
  };
  const onNewBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSubmit(selectedData, inputNote, dateOfTest);
    }
  };
  const onEditBlur = e => {
    // debugger
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSaveEditNote(
        selectedData,
        inputNote,
        dateOfTest,
        editIndex,
        editResourceId
      );
      setOpenMainAdd(false);
      setInputNote('');
      setEditIndex('');
      setEditResourceId();
    }
  };
  // console.log("dateOfTest", dateOfTest)
  // console.log('data', data);
  // console.log("type", type)
  return (
    <>
      {Array.isArray(data) && data.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputSelectAndSearch
              id="select-1"
              name="select-1"
              style={{ width: 300 }}
              value={selectedData}
              onChange={(e, value) => {
                if (typeof value === 'string') {
                  type === 'MolecularTest'
                    ? setSelectedData({
                      code: 'MOLECULAR',
                      display: e.target.value,
                      text: e.target.value,
                      newEntry: true,
                    })
                    : setSelectedData({
                      code: value,
                      display: value,
                      text: 'Other',
                      newEntry: true,
                    });
                } else if (value && value.inputValue) {
                  type === 'MolecularTest'
                    ? setSelectedData({
                      code: 'MOLECULAR',
                      display: value.inputValue,
                      text: value.inputValue,
                      newEntry: true,
                    })
                    : setSelectedData({
                      code: value.inputValue,
                      display: value.inputValue,
                      text: 'Other',
                      newEntry: true,
                    });
                } else {
                  setSelectedData({ ...value, newEntry: false });
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
                  onChange={e => getTestListsFromAPI(e)}
                  onBlur={e => {
                    if (e.target.value) {
                      if (typeof e.target.value === 'string') {
                        type === 'MolecularTest'
                          ? setSelectedData({
                            code: 'MOLECULAR',
                            display: e.target.value,
                            text: e.target.value,
                            newEntry: true,
                          })
                          : setSelectedData({
                            code: e.target.value,
                            display: e.target.value,
                            text: 'Other',
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
            {Array.isArray(data) &&
              data.map((ele, index) => {
                return (
                  <li key={index.toString()} className={classes.listItem}>
                    {editIndex !== index ? (
                      <div className={classes.textInsideList}>
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
                        <div className={classes.textInsideList} onBlur={onEditBlur}>
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
                                type === 'MolecularTest'
                                  ? setSelectedData({
                                    code: 'MOLECULAR',
                                    display: e.target.value,
                                    text: e.target.value,
                                    newEntry: true,
                                  })
                                  : setSelectedData({
                                    code: value,
                                    display: value,
                                    text: 'Other',
                                    newEntry: true,
                                  });
                              } else if (value && value.inputValue) {
                                type === 'MolecularTest'
                                  ? setSelectedData({
                                    code: 'MOLECULAR',
                                    display: value.inputValue,
                                    text: value.inputValue,
                                    newEntry: true,
                                  })
                                  : setSelectedData({
                                    code: value.inputValue,
                                    display: value.inputValue,
                                    text: 'Other',
                                    newEntry: true,
                                  });
                              } else {
                                setSelectedData({ ...value, newEntry: false });
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
                                onChange={e => getTestListsFromAPI(e)}
                                onBlur={e => {
                                  const nextSibling = document.querySelector(
                                    `input[name='note1']`,
                                  );
                                  nextSibling.focus();
                                  if (e.target.value) {
                                    if (typeof e.target.value === 'string') {
                                      type === 'MolecularTest'
                                        ? setSelectedData({
                                          code: 'MOLECULAR',
                                          display: e.target.value,
                                          text: e.target.value,
                                          newEntry: true,
                                        })
                                        : setSelectedData({
                                          code: e.target.value,
                                          display: e.target.value,
                                          text: 'Other',
                                          newEntry: true,
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
                              const nextSibling = document.querySelector(
                                `input[name='date1']`,
                              );
                              nextSibling.focus();
                              if (
                                type === 'hospitalizationTest' ||
                                type === 'MolecularTest'
                              ) {
                                setInputNote(e.target.value)
                              }
                            }}
                            onKeyDown={e => {

                              if (e.key === 'Enter') {
                                const nextSibling = document.querySelector(
                                  `input[name='date1']`,
                                );
                                nextSibling.focus();
                                if (
                                  type === 'hospitalizationTest' ||
                                  type === 'MolecularTest'
                                ) {
                                  setInputNote(e.target.value)
                                }
                              }
                            }}
                            placeholder="Enter Note"
                          />
                          <InputTextField
                            classStyle="textField"
                            name="date1"
                            type="date"
                            style={{
                              marginTop: '0px',
                              marginBottom: '0px',
                              marginLeft: '0.5rem',
                              fontSize: '0.4rem',
                              padding: '0px 2px',
                            }}
                            variant="outlined"
                            InputLabelProps={{ shrink: false }}
                            value={moment.utc(dateOfTest).local().format("YYYY-MM-DD")}
                            onChange={e => {
                              if (e.target.value) {
                                setDateOfTest(e.target.value)
                              }
                            }}
                            onBlur={e => {

                              if (e.target.value) {
                                if (
                                  type === 'hospitalizationTest' ||
                                  type === 'MolecularTest'
                                ) {
                                  setDateOfTest(e.target.value);

                                }
                              }
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && e.target.value) {
                                if (
                                  type === 'hospitalizationTest' ||
                                  type === 'MolecularTest'
                                ) {
                                  setDateOfTest(e.target.value);
                                  handleSubmit(
                                    selectedData,
                                    inputNote,
                                    e.target.value,
                                  );
                                }
                              }
                            }}
                            inputProps={{
                              max: moment(new Date()).format('YYYY-MM-DD'),
                            }}
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
                    if (typeof value === 'string') {
                      type === 'MolecularTest'
                        ? setSelectedData({
                          code: 'MOLECULAR',
                          display: e.target.value,
                          text: e.target.value,
                          newEntry: true,
                        })
                        : setSelectedData({
                          code: value,
                          display: value,
                          text: 'Other',
                          newEntry: true,
                        });
                    } else if (value && value.inputValue) {
                      type === 'MolecularTest'
                        ? setSelectedData({
                          code: 'MOLECULAR',
                          display: value.inputValue,
                          text: value.inputValue,
                          newEntry: true,
                        })
                        : setSelectedData({
                          code: value.inputValue,
                          display: value.inputValue,
                          text: 'Other',
                          newEntry: true,
                        });
                    } else {
                      setSelectedData({ ...value, newEntry: false });
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
                      onChange={e => getTestListsFromAPI(e)}
                      onBlur={e => {
                        if (e.target.value) {
                          if (typeof e.target.value === 'string') {
                            type === 'MolecularTest'
                              ? setSelectedData({
                                code: 'MOLECULAR',
                                display: e.target.value,
                                text: e.target.value,
                                newEntry: true,
                              })
                              : setSelectedData({
                                code: e.target.value,
                                display: e.target.value,
                                text: 'Other',
                                newEntry: true,
                              });
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
                <div className={classes.textInsideList} onBlur={onNewBlur}>
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
                      const nextSibling = document.querySelector(
                        `input[name='date2']`,
                      );
                      nextSibling.focus();
                      if (
                        type === 'hospitalizationTest' ||
                        type === 'MolecularTest'
                      ) {
                        setInputNote(e.target.value);
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        const nextSibling = document.querySelector(
                          `input[name='date2']`,
                        );
                        nextSibling.focus();
                        if (
                          type === 'hospitalizationTest' ||
                          type === 'MolecularTest'
                        ) {
                          setInputNote(e.target.value);
                        }
                      }
                    }}
                    placeholder={"Enter Note"}
                  />
                  <InputTextField
                    classStyle="textField"
                    name="date2"
                    type="date"
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    value={dateOfTest}
                    onChange={e => setDateOfTest(e.target.value)}
                    onBlur={e => {
                      if (e.target.value) {
                        if (
                          type === 'hospitalizationTest' ||
                          type === 'MolecularTest'
                        ) {
                          setDateOfTest(e.target.value);
                          handleSubmit(selectedData, inputNote, e.target.value);
                        }
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value) {
                        if (
                          type === 'hospitalizationTest' ||
                          type === 'MolecularTest'
                        ) {
                          setDateOfTest(e.target.value);
                          handleSubmit(selectedData, inputNote, e.target.value);
                        }
                      }
                    }}
                    inputProps={{
                      max: moment(new Date()).format('YYYY-MM-DD'),
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
export default SelectTextDate;
