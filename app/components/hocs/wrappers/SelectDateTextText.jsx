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
    fontWeight: '400',
    // padding: '0.4rem',
    marginRight: 5,
    marginLeft: 5,
    '& span': {
      fontWeight: 500,
    },
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
const SelectDateTextText = ({
  id,
  label,
  labelBrief,
  labelResponse,
  options,
  data,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
  type,
  ...props
}) => {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [optionsArray, setOptionsArray] = useState([...options]);
  const [editIndex, setEditIndex] = useState('');
  const [editResourceId, setEditResourceId] = useState('');
  const [deletedData, setdeletedData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [treatmentMonth, setTreatmentMonth] = useState(null);
  const [treatmentBrief, setTreatmentBrief] = useState(null);
  const [treatmentResponse, setTreatmentResponse] = useState(null);
  const [nestedEditResourceId, setNestedEditResourceId] = useState(null);

  useEffect(() => {
    setOptionsArray([...options]);
  }, [options]);
  useEffect(() => {
    setNoOldData(Boolean(data.length == 0));
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
  const handleSaveEdit = (
    selectedData,
    treatmentMonth,
    treatmentBrief,
    treatmentResponse,
    editResourceId,
    nestedEditResourceId,
    editIndex,
  ) => {
    saveEditData(
      selectedData,
      treatmentMonth,
      treatmentBrief,
      treatmentResponse,
      editResourceId,
      nestedEditResourceId,
      editIndex,
    );
    handleExit();
    setEditIndex();
    setTreatmentBrief('');
    setTreatmentResponse('');
    setTreatmentMonth('');
    setEditResourceId('');
    setNestedEditResourceId('');
  };

  const handleSubmit = (
    selectedData,
    treatmentMonth,
    treatmentBrief,
    treatmentResponse,
  ) => {
    saveData(selectedData, treatmentMonth, treatmentBrief, treatmentResponse);
    setSelectedData();
    setTreatmentMonth();
    setTreatmentBrief();
    setTreatmentResponse();
    setOpenAdd(true);
  };

  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
    setSelectedData();
  };
  const handleEdit = (e, index, ele) => {
    setOpenMainAdd(true);
    setTreatmentBrief('');
    setTreatmentResponse('');
    setEditIndex(index);
    if (type === 'treatmentHistory') {
      setSelectedData({
        code: ele && ele.type.split('/')[0],
        display: ele && ele.type.split('/')[1],
      });
      setTreatmentBrief(ele.briefTreatment);
      setTreatmentResponse(
        ele.rECISTObservation && ele.rECISTObservation.description,
      );
      setTreatmentMonth(
        moment(ele.date).format('YYYY') === '0001'
          ? ''
          : moment(ele.date).format('yyyy-MM-DD'),
      );
      setEditResourceId(ele.resourceId);
      setNestedEditResourceId(
        ele.rECISTObservation && ele.rECISTObservation.resourceId,
      );
    }
  };
  const onNewBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSubmit(
        selectedData,
        treatmentMonth,
        treatmentBrief,
        treatmentResponse,
      );
    }
  };
  const onEditBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSaveEdit(
        selectedData,
        treatmentMonth,
        treatmentBrief,
        treatmentResponse,
        editResourceId,
        nestedEditResourceId,
        editIndex,
      );
    }
  };
  // console.log("type", type)
  // console.log("data", data)
  // console.log("treatmentMonth", treatmentMonth)
  return (
    <>
      {data.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputSelectAndSearch
              id="select-1"
              name="select-1"
              style={{ width: 300 }}
              value={selectedData}
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
              // debugger
              return (
                <li key={index.toString()} className={classes.listItem}>
                  {editIndex !== index ? (
                    <div className={classes.textInsideList}>
                      <Typography className={classes.textDisplay}>
                        <span>{ele.type.split('/')[1]}</span>{' '}
                        <span>
                          {ele.date === null ||
                          ele.date === 'Invalid date' ||
                          (ele.date &&
                            moment(ele.date).format('YYYY') === '0001')
                            ? ''
                            : ele.date &&
                              `- ${moment(ele.date).format('YYYY-MM-DD')}`}
                        </span>{' '}
                        - <span>Brief:</span>{' '}
                        {ele.briefTreatment ? ele.briefTreatment : 'N/a'} -{' '}
                        <span>Response:</span>{' '}
                        {ele.rECISTObservation &&
                        ele.rECISTObservation.description
                          ? ele.rECISTObservation.description
                          : 'N/a'}
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
                          value={selectedData}
                          id="select-2"
                          name="select-2"
                          onChange={(e, value) => {
                            const nextSibling = document.querySelector(
                              `input[name='date1']`,
                            );
                            nextSibling.focus();
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
                                  `input[name='date1']`,
                                );
                                nextSibling.focus();
                                if (e.target.value) {
                                  if (typeof e.target.value === 'string') {
                                    setSelectedData({
                                      code: 'ServiceRequest|Custom',
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
                          name="date1"
                          type="date"
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            marginLeft: '0.5rem',
                            fontSize: '0.4rem',
                            padding: '0px 2px',
                          }}
                          value={treatmentMonth}
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          onChange={e => setTreatmentMonth(e.target.value)}
                          onBlur={e => {
                            const nextSibling = document.querySelector(
                              `input[name='note1']`,
                            );
                            nextSibling.focus();
                            if (e.target.value) {
                              if (type === 'treatmentHistory') {
                                setTreatmentMonth(e.target.value);
                              }
                            }
                          }}
                          // onKeyDown={e => {
                          //     if (e.key === 'Enter' && e.target.value) {
                          //         const nextSibling = document.querySelector(`input[name='note1']`)
                          //         nextSibling.focus()
                          //         if (type === "treatmentHistory") {
                          //             setTreatmentMonth(e.target.value);
                          //         }
                          //     }
                          // }}
                          inputProps={{
                            max: moment(new Date()).format('YYYY-MM-DD'),
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
                          value={treatmentBrief}
                          onChange={e => setTreatmentBrief(e.target.value)}
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            const nextSibling = document.querySelector(
                              `input[name='note2']`,
                            );
                            nextSibling.focus();
                            if (type === 'treatmentHistory') {
                              setTreatmentBrief(e.target.value);
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              const nextSibling = document.querySelector(
                                `input[name='note2']`,
                              );
                              nextSibling.focus();
                              if (type === 'treatmentHistory') {
                                setTreatmentBrief(e.target.value);
                              }
                            }
                          }}
                          placeholder={labelBrief}
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
                          value={treatmentResponse}
                          onChange={e => setTreatmentResponse(e.target.value)}
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            if (type === 'treatmentHistory') {
                              setTreatmentResponse(e.target.value);
                              // handleSaveEdit(selectedData, treatmentMonth, treatmentBrief, e.target.value, editResourceId, nestedEditResourceId, editIndex)
                            }
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && e.target.value) {
                              if (type === 'treatmentHistory') {
                                setTreatmentResponse(e.target.value);
                                // handleSaveEdit(selectedData, treatmentMonth, treatmentBrief, e.target.value, editResourceId, nestedEditResourceId, editIndex)
                              }
                            }
                          }}
                          placeholder={labelResponse}
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
                    name="date2"
                    type="date"
                    autoFocus
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    value={treatmentMonth}
                    onChange={e => setTreatmentMonth(e.target.value)}
                    onBlur={e => {
                      const nextSibling = document.querySelector(
                        `input[name='note3']`,
                      );
                      nextSibling.focus();
                      if (e.target.value) {
                        if (type === 'treatmentHistory') {
                          setTreatmentMonth(e.target.value);
                        }
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value) {
                        const nextSibling = document.querySelector(
                          `input[name='note3']`,
                        );
                        nextSibling.focus();
                        if (type === 'treatmentHistory') {
                          setTreatmentMonth(e.target.value);
                        }
                      }
                    }}
                    inputProps={{
                      max: moment(new Date()).format('YYYY-MM-DD'),
                    }}
                  />
                  <InputTextField
                    classStyle="textField"
                    name="note3"
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    value={treatmentBrief}
                    onChange={e => setTreatmentBrief(e.target.value)}
                    onBlur={e => {
                      const nextSibling = document.querySelector(
                        `input[name='note4']`,
                      );
                      nextSibling.focus();
                      if (type === 'treatmentHistory') {
                        setTreatmentBrief(e.target.value);
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        const nextSibling = document.querySelector(
                          `input[name='note4']`,
                        );
                        nextSibling.focus();
                        if (type === 'treatmentHistory') {
                          setTreatmentBrief(e.target.value);
                        }
                      }
                    }}
                    placeholder={labelBrief}
                  />
                  <InputTextField
                    classStyle="textField"
                    name="note4"
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                      marginLeft: '0.5rem',
                      fontSize: '0.4rem',
                      padding: '0px 2px',
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    value={treatmentResponse}
                    onChange={e => setTreatmentResponse(e.target.value)}
                    onBlur={e => {
                      if (type === 'treatmentHistory') {
                        setTreatmentResponse(e.target.value);
                        handleSubmit(
                          selectedData,
                          treatmentMonth,
                          treatmentBrief,
                          e.target.value,
                        );
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value !== '') {
                        if (type === 'treatmentHistory') {
                          setTreatmentResponse(e.target.value);
                          handleSubmit(
                            selectedData,
                            treatmentMonth,
                            treatmentBrief,
                            e.target.value,
                          );
                        }
                      }
                    }}
                    placeholder={labelResponse}
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
export default SelectDateTextText;
