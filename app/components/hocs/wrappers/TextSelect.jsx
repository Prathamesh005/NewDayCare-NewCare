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
const TextSelect = ({
  type,
  data,
  placeholder,
  label,
  options,
  display,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
  ...props
}) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [inputNote, setInputNote] = useState('');
  const [optionsArray, setOptionsArray] = useState([...options]);
  const [editIndex, setEditIndex] = useState('');
  const [editResourceId, setEditResourceId] = useState('');
  const [deletedData, setdeletedData] = useState([]);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    setOptionsArray([...options]);
  }, [options]);
  useEffect(() => {
    setNoOldData(Boolean(data.length == 0));
    updateStoredData(data);
  }, [data]);

  const handleClick = () => {
    // setStoredData([...storedData, selectedData])
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

  const handleSaveEdit = (
    inputData,
    selectedData,
    editResourceId,
    editIndex,
  ) => {
    saveEditData(inputData, selectedData, editResourceId, editIndex);
    handleExit();
    setEditIndex();
    setEditResourceId('');
  };

  const handleSaveEach = (inputNote, selectedData) => {
    saveData(inputNote, selectedData);
    handleExit();
  };
  const handleExit = () => {
    setOpenAdd(false);
    setInputData();
    setSelectedData({});
  };
  const handleEdit = (ele, index) => {
    setInputData('');
    setSelectedData({});
    setEditIndex(index);
    if (type === 'referredTo') {
      setInputData(ele.practitioner);
      setSelectedData({
        code: ele.specialist.code,
        display: ele.specialist.display,
        newEntry: true,
      });
      setEditResourceId(ele.resourceId);
    }
  };
  const onNewBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSaveEach(inputData, selectedData);
    }
  };
  const onEditBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSaveEdit(inputData, selectedData, editResourceId, editIndex);
    }
  };
  // console.log("selectedData", selectedData)
  return (
    <>
      {data.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputTextField
              classStyle="textFieldNormal"
              name="texts-1"
              style={{ width: 300 }}
              variant="outlined"
              value={inputData}
              onChange={e => setInputData(e.target.value)}
              InputLabelProps={{ shrink: false }}
              onBlur={e => {
                if (e.target.value) {
                  setNoOldData(false);
                  setOpenAdd(true);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value) {
                  setNoOldData(false);
                  setOpenAdd(true);
                }
              }}
              placeholder={placeholder}
            />
          }
        </Grid>
      ) : (
        <Grid item xs>
          <Paper elevation={0} component="ul" className={classes.root}>
            {data.map((ele, index) => {
              return (
                <li key={index.toString()} className={classes.listItem}>
                  {editIndex !== index ? (
                    <div className={classes.textInsideList}>
                      <Typography className={classes.textDisplay}>
                        <span>{ele.practitioner}</span>
                        <span>
                          {ele.specialist ? ` - ${ele.specialist.display}` : ''}
                        </span>
                      </Typography>
                      <EditIconSquareButton
                        onClick={e => handleEdit(ele, index)}
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
                      <div
                        className={classes.textInsideList}
                        onBlur={onEditBlur}
                      >
                        <InputTextField
                          classStyle="textField"
                          name="texts-3"
                          autoFocus
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            marginLeft: '0.5rem',
                            fontSize: '0.4rem',
                            padding: '0px 2px',
                          }}
                          variant="outlined"
                          value={inputData}
                          onChange={e => setInputData(e.target.value)}
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            if (e.target.value) {
                              setInputData(e.target.value);
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && e.target.value) {
                              const nextSibling = document.querySelector(
                                `input[name='select3']`,
                              );
                              nextSibling.focus();
                              setInputData(e.target.value);
                            }
                          }}
                          placeholder={placeholder}
                        />
                        <InputSelectAndSearch
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          value={selectedData}
                          id="select3"
                          name="select3"
                          onChange={(e, value) => {
                            if (typeof value === 'string') {
                              setSelectedData({
                                code: value,
                                display: value,
                                newEntry: true,
                              });
                            } else if (value && value.inputValue) {
                              setSelectedData({
                                code: value.inputValue,
                                display: value.inputValue,
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
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{ shrink: false }}
                              onBlur={e => {
                                if (e.target.value) {
                                  if (typeof e.target.value === 'string') {
                                    setSelectedData({
                                      code: e.target.value,
                                      display: e.target.value,
                                      newEntry: true,
                                    });
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
                      </div>
                    </>
                  )}
                </li>
              );
            })}
            {openAdd && (
              <li className={classes.listItem}>
                <div className={classes.textInsideList} onBlur={onNewBlur}>
                  <Typography className={classes.textDisplay}>
                    {inputData}
                  </Typography>
                  <InputSelectAndSearch
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: '0.5rem',
                    }}
                    value={selectedData}
                    id="select-2"
                    name="select-2"
                    onChange={(e, value) => {
                      if (typeof value === 'string') {
                        setSelectedData({
                          code: value,
                          display: value,
                          newEntry: true,
                        });
                      } else if (value && value.inputValue) {
                        setSelectedData({
                          code: value.inputValue,
                          display: value.inputValue,
                          newEntry: true,
                        });
                      } else {
                        setSelectedData({ ...value, newEntry: false });
                      }
                    }}
                    display={display}
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
                          if (e.target.value) {
                            if (typeof e.target.value === 'string') {
                              setSelectedData({
                                code: e.target.value,
                                display: e.target.value,
                                newEntry: true,
                              });
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
                  {/* <IconButton
                    onClick={() => handleExit()}
                    edge="end"
                    style={{ padding: '0px 10px' }}
                  >
                    <CloseIcon style={{ fontSize: '0.9rem' }} />
                  </IconButton> */}
                </div>
              </li>
            )}
          </Paper>
        </Grid>
      )}
    </>
  );
};
export default TextSelect;
