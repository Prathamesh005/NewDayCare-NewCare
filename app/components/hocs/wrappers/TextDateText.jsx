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
const TextDateText = ({
  type,
  placeholderOne,
  placeholderTwo,
  display,
  data,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
}) => {
  const classes = useStyles();
  const [reasonInput, setReasonInput] = useState();
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [inputNote, setInputNote] = useState('');
  const [dateOfHospzn, setDateOfHospzn] = useState(null);
  const [editIndex, setEditIndex] = useState('');
  const [editResourceId, setEditResourceId] = useState('');
  const [deletedData, setdeletedData] = useState([]);

  useEffect(() => {
    setNoOldData(Boolean(data.length == 0));
    updateStoredData(data);
  }, [data]);

  const handleClick = () => {
    // setStoredData([...data, reasonInput])
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
    //             code: reasonInput.code,
    //             display: reasonInput.display,
    //         },
    //         note: e.target.value,
    //     },
    // ]);
    // handleExit();
  };
  const handleSaveEdit = () => {
    saveEditData(
      reasonInput,
      dateOfHospzn,
      inputNote,
      editResourceId,
      editIndex,
    );
    handleExit();
    setReasonInput('');
    setEditIndex();
    setInputNote('');
    setEditResourceId('');
  };

  const handleSubmit = (reasonInput, dateInput, inputNote) => {
    saveData(reasonInput, dateInput, inputNote);
    setReasonInput();
    setInputNote();
    setDateOfHospzn();
    setOpenAdd(true);
  };

  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
    setReasonInput();
  };
  const handleEdit = (e, index, ele) => {
    setOpenMainAdd(true);
    setInputNote('');
    setEditIndex(index);
    if (
      type === 'pastHospitalPresentIllness' ||
      type === 'pastHospitalOtherIllness'
    ) {
      setReasonInput(ele.description);
      setInputNote(ele.note);
      setDateOfHospzn(ele.effectiveDateTime);
      setEditResourceId(ele.resourceId);
    }
  };
  const onNewBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSubmit(reasonInput, dateOfHospzn, inputNote);
    }
  };
  const onEditBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSaveEdit();
    }
  };
  // console.log("type", type)
  // console.log("data", data)
  // console.log("type", type)
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
              value={reasonInput}
              onChange={e => setReasonInput(e.target.value)}
              InputLabelProps={{ shrink: false }}
              onBlur={e => {
                if (e.target.value) {
                  setNoOldData(false);
                  setOpenAdd(false);
                  setOpenMainAdd(false);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value) {
                  setNoOldData(false);
                  setOpenAdd(false);
                  setOpenMainAdd(false);
                }
              }}
              placeholder={placeholderOne}
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
                        {ele.description}

                        {ele.effectiveDateTime &&
                        moment(ele.effectiveDateTime).format('YYYY') !== '0001'
                          ? ` - ${moment(ele.effectiveDateTime).format(
                              'MMM, YYYY',
                            )}`
                          : ''}
                      </Typography>
                      {ele.note && (
                        <div className={classes.partition}>
                          <Typography className={classes.textDisplay}>
                            {ele.note}
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
                          value={reasonInput}
                          onChange={e => setReasonInput(e.target.value)}
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            if (e.target.value) {
                              setReasonInput(e.target.value);
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && e.target.value) {
                              const nextSibling = document.querySelector(
                                `input[name='date2']`,
                              );
                              nextSibling.focus();
                            }
                          }}
                          placeholder={placeholderOne}
                        />
                        <InputTextField
                          classStyle="textField"
                          name="date2"
                          type="month"
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            marginLeft: '0.5rem',
                            fontSize: '0.4rem',
                            padding: '0px 2px',
                          }}
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          value={moment(dateOfHospzn).format('yyyy-MM')}
                          onChange={e => setDateOfHospzn(e.target.value)}
                          onBlur={e => {
                            if (e.target.value) {
                              if (
                                type === 'pastHospitalPresentIllness' ||
                                type === 'pastHospitalOtherIllness'
                              ) {
                                setDateOfHospzn(e.target.value);
                                const nextSibling = document.querySelector(
                                  `input[name='note2']`,
                                );
                                nextSibling.focus();
                              }
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && e.target.value) {
                              if (
                                type === 'pastHospitalPresentIllness' ||
                                type === 'pastHospitalOtherIllness'
                              ) {
                                setDateOfHospzn(e.target.value);
                                const nextSibling = document.querySelector(
                                  `input[name='note2']`,
                                );
                                nextSibling.focus();
                              }
                            }
                          }}
                          inputProps={{
                            max: moment(new Date()).format('YYYY-MM'),
                          }}
                        />
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
                          value={inputNote}
                          onChange={e => setInputNote(e.target.value)}
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            if (
                              type === 'pastHospitalPresentIllness' ||
                              type === 'pastHospitalOtherIllness'
                            ) {
                              handleSaveEdit(e);
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              if (
                                type === 'pastHospitalPresentIllness' ||
                                type === 'pastHospitalOtherIllness'
                              ) {
                                handleSaveEdit(e);
                              }
                            }
                          }}
                          placeholder={placeholderTwo}
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
                <InputTextField
                  classStyle="textFieldNormal"
                  name="texts-2"
                  variant="outlined"
                  value={reasonInput}
                  onChange={e => setReasonInput(e.target.value)}
                  InputLabelProps={{ shrink: false }}
                  onBlur={e => {
                    if (e.target.value) {
                      setOpenAdd(false);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value) {
                      setOpenAdd(false);
                    }
                  }}
                  placeholder={placeholderOne}
                />
              ) : (
                <div className={classes.textInsideList} onBlur={onNewBlur}>
                  <Typography className={classes.textDisplay}>
                    {reasonInput}
                  </Typography>
                  <InputTextField
                    classStyle="textField"
                    name="date1"
                    type="month"
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    autoFocus
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    value={moment(dateOfHospzn).format('yyyy-MM')}
                    onChange={e => setDateOfHospzn(e.target.value)}
                    onBlur={e => {
                      const nextSibling = document.querySelector(
                        `input[name='note1']`,
                      );
                      nextSibling.focus();
                      if (e.target.value) {
                        if (
                          type === 'pastHospitalPresentIllness' ||
                          type === 'pastHospitalOtherIllness'
                        ) {
                          setDateOfHospzn(e.target.value);
                        }
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value) {
                        const nextSibling = document.querySelector(
                          `input[name='note1']`,
                        );
                        nextSibling.focus();
                        if (
                          type === 'pastHospitalPresentIllness' ||
                          type === 'pastHospitalOtherIllness'
                        ) {
                          setDateOfHospzn(e.target.value);
                        }
                      }
                    }}
                    inputProps={{
                      max: moment(new Date()).format('YYYY-MM'),
                    }}
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
                    InputLabelProps={{ shrink: false }}
                    value={inputNote}
                    onChange={e => setInputNote(e.target.value)}
                    onBlur={e => {
                      if (
                        type === 'pastHospitalPresentIllness' ||
                        type === 'pastHospitalOtherIllness'
                      ) {
                        setInputNote(e.target.value);
                        handleSubmit(reasonInput, dateOfHospzn, e.target.value);
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (
                          type === 'pastHospitalPresentIllness' ||
                          type === 'pastHospitalOtherIllness'
                        ) {
                          setInputNote(e.target.value);
                          handleSubmit(
                            reasonInput,
                            dateOfHospzn,
                            e.target.value,
                          );
                        }
                      }
                    }}
                    placeholder={placeholderTwo}
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
export default TextDateText;
