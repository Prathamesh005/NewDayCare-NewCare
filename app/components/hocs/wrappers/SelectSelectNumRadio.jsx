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
import InputRadioButton from '../components/InputRadioButton';

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
const SelectSelectNumRadio = ({
  optionsSelectOne,
  optionsSelectTwo,
  type,
  labelSelectOne,
  labelSelectTwo,
  numPlaceHolder,
  display,
  data,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
  mandatory,
  ...props
}) => {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [optionsArrayOne, setOptionsArrayOne] = useState([]);
  const [optionsArrayTwo, setOptionsArrayTwo] = useState([]);
  const [editIndex, setEditIndex] = useState('');
  const [editResourceId, setEditResourceId] = useState('');
  const [deletedData, setdeletedData] = useState([]);
  const [selectedDataOne, setSelectedDataOne] = useState();
  const [selectedDataTwo, setSelectedDataTwo] = useState();
  const [num, setNum] = useState(null);
  const [radioStatus, setRadioStatus] = useState({
    code: 'Alive',
    display: 'Alive',
  });
  const [statusArray, setStatusArray] = useState([
    { code: 'Alive', display: 'Alive' },
    { code: 'Deceased', display: 'Deceased' },
  ]);
  const mandatoryField =
    mandatory === 'selectedDataOne' ? selectedDataOne : selectedDataTwo;
  useEffect(() => {
    setOptionsArrayOne([...optionsSelectOne]);
  }, [optionsSelectOne]);
  useEffect(() => {
    setOptionsArrayTwo([...optionsSelectTwo]);
  }, [optionsSelectTwo]);
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
  const handleChangeStatus = e => {
    let status = statusArray.find(item => item.code === e.target.value);
    setRadioStatus(status);
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
  const handleSaveEdit = (
    selectedDataOne,
    selectedDataTwo,
    num,
    radioStatus,
    editResourceId,
    editIndex,
  ) => {
    saveEditData(
      selectedDataOne,
      selectedDataTwo,
      num,
      radioStatus,
      editResourceId,
      editIndex,
    );
    handleExit();
    setEditIndex();
    setNum('');
    setRadioStatus({ code: 'Alive', display: 'Alive' });
    setEditResourceId('');
  };

  const handleSubmit = (selectedDataOne, selectedDataTwo, num, radioStatus) => {
    saveData(selectedDataOne, selectedDataTwo, num, radioStatus);
    setSelectedDataOne();
    setSelectedDataTwo();
    setNum('');
    setRadioStatus({ code: 'Alive', display: 'Alive' });
    setOpenAdd(true);
  };

  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
    setSelectedDataOne();
    setSelectedDataTwo();
  };
  const handleEdit = (e, index, ele) => {
    setOpenMainAdd(true);
    setNum('');
    setRadioStatus({ code: 'Alive', display: 'Alive' });
    setEditIndex(index);
    if (type === 'familyHistory') {
      setSelectedDataOne(ele.relationship);
      setSelectedDataTwo(ele.condition && ele.condition[0]['code']);
      setNum(ele.condition && ele.condition[0]['onSetAge']);
      setRadioStatus(ele.condition && ele.condition[0]['outcome']);
      setEditResourceId(ele.resourceId);
    }
  };
  const onNewBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSubmit(selectedDataOne, selectedDataTwo, num, radioStatus);
    }
  };
  const onEditBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSaveEdit(
        selectedDataOne,
        selectedDataTwo,
        num,
        radioStatus,
        editResourceId,
        editIndex,
      );
    }
  };
  return (
    <>
      {data.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputSelectAndSearch
              id="selectOne-1"
              name="selectOne-1"
              style={{ width: 300 }}
              value={selectedDataOne}
              onChange={(e, value) => {
                setSelectedDataOne(value);
                setNoOldData(false);
                setOpenAdd(false);
                setOpenMainAdd(false);
              }}
              options={optionsArrayOne}
              display="display"
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  InputProps={{
                    ...params.InputProps,
                    placeholder: labelSelectOne,
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
                        {ele.relationship.display} -{' '}
                        {ele.condition && ele.condition[0].code.display} - Age :{' '}
                        {ele.condition && ele.condition[0].onSetAge
                          ? ele.condition[0].onSetAge
                          : 'N/a'}{' '}
                        -{' '}
                        {ele.condition &&
                          ele.condition[0].outcome &&
                          ele.condition[0].outcome.display}
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
                      <div
                        className={classes.textInsideList}
                        onBlur={onEditBlur}
                      >
                        <InputSelectAndSearch
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          id="selectOne-2"
                          name="selectOne-2"
                          value={selectedDataOne}
                          onChange={(e, value) => {
                            setSelectedDataOne(value);
                          }}
                          options={optionsArrayOne}
                          display="display"
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
                              autoFocus
                              InputLabelProps={{ shrink: false }}
                              onBlur={e => {
                                if (e.target.value) {
                                  if (typeof e.target.value === 'string') {
                                    setSelectedDataOne({
                                      code: e.target.value,
                                      display: e.target.value,
                                    });
                                  } else {
                                    setSelectedDataOne(e.target.value);
                                  }
                                }
                              }}
                              InputProps={{
                                ...params.InputProps,
                                placeholder: labelSelectTwo,
                                className: classes.input2,
                                classes: { notchedOutline: classes.noBorder },
                              }}
                            />
                          )}
                        />
                        <InputSelectAndSearch
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          id="selectTwo2"
                          name="selectTwo2"
                          value={selectedDataTwo}
                          onChange={(e, value) => {
                            if (typeof value === 'string') {
                              setSelectedDataTwo({
                                code: value,
                                display: value,
                              });
                            } else if (value && value.inputValue) {
                              setSelectedDataTwo({
                                code: value.inputValue,
                                display: value.inputValue,
                              });
                            } else {
                              setSelectedDataTwo(value);
                            }
                          }}
                          options={optionsArrayTwo}
                          display="display"
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
                                const nextSibling = document.querySelector(
                                  `input[name='numTwo']`,
                                );
                                nextSibling.focus();
                                if (e.target.value) {
                                  if (typeof e.target.value === 'string') {
                                    setSelectedDataTwo({
                                      code: e.target.value,
                                      display: e.target.value,
                                    });
                                  } else {
                                    setSelectedDataTwo(e.target.value);
                                  }
                                }
                              }}
                              InputProps={{
                                ...params.InputProps,
                                placeholder: labelSelectTwo,
                                className: classes.input2,
                                classes: { notchedOutline: classes.noBorder },
                              }}
                            />
                          )}
                        />
                        <InputTextField
                          classStyle="textField"
                          name="numTwo"
                          type="number"
                          placeholder={numPlaceHolder}
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            marginLeft: '0.5rem',
                            fontSize: '0.4rem',
                            padding: '2px 5px',
                            border: '0.8px solid #cacaca',
                          }}
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          value={num}
                          onChange={e => setNum(e.target.value)}
                          onBlur={e => {
                            const nextSibling = document.querySelector(
                              `input[name='radio2']`,
                            );
                            nextSibling.focus();
                            if (e.target.value) {
                              if (type === 'familyHistory') {
                                setNum(e.target.value);
                              }
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && e.target.value) {
                              const nextSibling = document.querySelector(
                                `input[name='radio2']`,
                              );
                              nextSibling.focus();
                              if (type === 'familyHistory') {
                                setNum(e.target.value);
                              }
                            }
                          }}
                          inputProps={{
                            max: 150,
                            min: 0,
                          }}
                        />
                        <InputRadioButton
                          name="radio2"
                          statusArray={statusArray}
                          onChange={handleChangeStatus}
                          style={{ marginLeft: '15px' }}
                          row
                          value={radioStatus.code}
                          disabling={
                            mandatoryField === null ||
                            mandatoryField === undefined
                          }
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
                  id="selectOne2"
                  name="selectOne2"
                  value={selectedDataOne}
                  onChange={(e, value) => {
                    setSelectedDataOne(value);
                    setOpenAdd(false);
                  }}
                  options={optionsArrayOne}
                  display="display"
                  renderInput={params => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      InputProps={{
                        ...params.InputProps,
                        placeholder: labelSelectOne,
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
              ) : (
                <div className={classes.textInsideList} onBlur={onNewBlur}>
                  <Typography className={classes.textDisplay}>
                    {selectedDataOne.display}
                  </Typography>
                  <InputSelectAndSearch
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    id="selectTwo1"
                    name="selectTwo1"
                    value={selectedDataTwo}
                    onChange={(e, value) => {
                      if (typeof value === 'string') {
                        setSelectedDataTwo({
                          code: value,
                          display: value,
                        });
                      } else if (value && value.inputValue) {
                        setSelectedDataTwo({
                          code: value.inputValue,
                          display: value.inputValue,
                        });
                      } else {
                        setSelectedDataTwo(value);
                      }
                      setOpenAdd(false);
                    }}
                    options={optionsArrayTwo}
                    display="display"
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
                            const nextSibling = document.querySelector(
                              `input[name='numOne']`,
                            );
                            nextSibling.focus();
                            setSelectedDataTwo({
                              code: e.target.value,
                              display: e.target.value,
                            });

                            setOpenAdd(false);
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          placeholder: labelSelectTwo,
                          className: classes.input2,
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    )}
                  />
                  <InputTextField
                    classStyle="textField"
                    name="numOne"
                    type="number"
                    placeholder={numPlaceHolder}
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '2px 5px',
                      border: '0.8px solid #cacaca',
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    value={num}
                    onChange={e => setNum(e.target.value)}
                    onBlur={e => {
                      const nextSibling = document.querySelector(
                        `input[name='radio1']`,
                      );
                      nextSibling.focus();
                      if (e.target.value) {
                        if (type === 'familyHistory') {
                          setNum(e.target.value);
                        }
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value) {
                        const nextSibling = document.querySelector(
                          `input[name='radio1']`,
                        );
                        nextSibling.focus();
                        if (type === 'familyHistory') {
                          setNum(e.target.value);
                        }
                      }
                    }}
                    inputProps={{
                      max: 150,
                      min: 0,
                    }}
                  />
                  <InputRadioButton
                    name={'radio1'}
                    statusArray={statusArray}
                    onChange={handleChangeStatus}
                    style={{ marginLeft: '15px' }}
                    row
                    value={radioStatus.code}
                    disabling={
                      mandatoryField === null || mandatoryField === undefined
                    }
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
export default SelectSelectNumRadio;
