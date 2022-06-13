import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../../../containers/episodeOfCare/MyStateContext';
import { CloseIconButton, EditIconSquareButton } from '../../button';
import InputSelectAndSearch from '../components/InputSelectAndSearch';
import InputTextField from '../components/InputTextField';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

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
const SelectLabTests = ({
  type,
  label,
  data,
  options,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
  getTestListsFromAPI,
  display,
}) => {
  const classes = useStyles();
  const [optionsArray, setOptionsArray] = useState([...options]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);
  const [editIndex, setEditIndex] = useState('');
  const [selectedObj, setSelectedObj] = useState({});
  const [editResourceId, setEditResourceId] = useState('');

  useEffect(() => {
    setOptionsArray([...options]);
  }, [options]);
  useEffect(() => {
    setNoOldData(Boolean(data.length == 0));
    updateStoredData(data);
  }, [data]);

  const handleClick = () => {
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
    setSelectedObj({});
    setOpenAdd(true);
    setOpenMainAdd(false);
  };
  const handleSaveEach = value => {
    // debugger;
    saveData(value);
    handleExit();
  };
  const handleSaveEdit = value => {
    saveEditData(value, editResourceId, editIndex);
    handleExit();
    setEditIndex();
    setSelectedObj({});
    setEditResourceId('');
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
    setSelectedObj({});
  };
  const handleEdit = (e, index, ele) => {
    setOpenMainAdd(true);
    setSelectedObj({});
    setEditIndex(index);
    if (type === 'advice') {
      setSelectedObj({
        code: ele.code && ele.code.code,
        display: ele.code && ele.code.display,
        text: ele.code && ele.code.text,
        newEntry: false,
      });
      setEditResourceId(ele.resourceId);
    }
  };
  return (
    <>
      {data.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputSelectAndSearch
              id="select-1"
              name="select-1"
              style={{ width: 300 }}
              onChange={(e, value) => {
                if (typeof value === 'string') {
                  handleSaveEach({
                    code: value,
                    display: value,
                    text: 'Other',
                    newEntry: true,
                  });
                } else if (value && value.inputValue) {
                  handleSaveEach({
                    code: value.inputValue,
                    display: value.inputValue,
                    text: 'Other',
                    newEntry: true,
                  });
                } else {
                  handleSaveEach({ ...value, newEntry: false });
                }
                setNoOldData(false);
              }}
              options={optionsArray}
              display={display}
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
                        handleSaveEach({
                          code: e.target.value,
                          display: e.target.value,
                          text: 'Other',
                          newEntry: true,
                        });
                      }
                      setNoOldData(false);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value) {
                      handleSaveEach({
                        code: e.target.value,
                        display: e.target.value,
                        text: 'Other',
                        newEntry: true,
                      });
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
            {data.map((ele, index) => {
              return (
                <li key={index.toString()} className={classes.listItem}>
                  {editIndex !== index ? (
                    <div className={classes.textInsideList}>
                      <Typography className={classes.textDisplay}>
                        {type === 'advice' && ele.code.display}
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
                    <div className={classes.textInsideList}>
                      <InputSelectAndSearch
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        value={selectedObj}
                        id="select-2"
                        name="select-2"
                        onChange={(e, value) => {
                          if (typeof value === 'string') {
                            handleSaveEdit({
                              code: value,
                              display: value,
                              text: 'Other',
                              newEntry: true,
                            });
                          } else if (value && value.inputValue) {
                            handleSaveEdit({
                              code: value.inputValue,
                              display: value.inputValue,
                              text: 'Other',
                              newEntry: true,
                            });
                          } else {
                            handleSaveEdit({ ...value, newEntry: false });
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
                            onChange={e => getTestListsFromAPI(e)}
                            onBlur={e => {
                              if (e.target.value) {
                                if (typeof e.target.value === 'string') {
                                  handleSaveEdit({
                                    code: e.target.value,
                                    display: e.target.value,
                                    text: 'Other',
                                    newEntry: true,
                                  });
                                }
                              }
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && e.target.value) {
                                handleSaveEdit({
                                  code: e.target.value,
                                  display: e.target.value,
                                  text: 'Other',
                                  newEntry: true,
                                });
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
                  )}
                </li>
              );
            })}
            <li className={classes.listItem}>
              {openAdd && openMainAdd && (
                <div className={classes.options} onClick={handleClick}>
                  {' '}
                  <AddIcon />{' '}
                </div>
              )}
              {openAdd && !openMainAdd && (
                <InputSelectAndSearch
                  id="select3"
                  name="select3"
                  style={{ width: 300 }}
                  value={selectedObj}
                  onChange={(e, value) => {
                    if (typeof value === 'string') {
                      handleSaveEach({
                        code: value,
                        display: value,
                        text: 'Other',
                        newEntry: true,
                      });
                    } else if (value && value.inputValue) {
                      handleSaveEach({
                        code: value.inputValue,
                        display: value.inputValue,
                        text: 'Other',
                        newEntry: true,
                      });
                    } else {
                      handleSaveEach({ ...value, newEntry: false });
                    }
                  }}
                  options={optionsArray}
                  display={display}
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
                            handleSaveEach({
                              code: e.target.value,
                              display: e.target.value,
                              text: 'Other',
                              newEntry: true,
                            });
                          }
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value) {
                          handleSaveEach({
                            code: e.target.value,
                            display: e.target.value,
                            text: 'Other',
                            newEntry: true,
                          });
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
export default SelectLabTests;
