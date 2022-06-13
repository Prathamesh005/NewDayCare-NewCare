import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../../MyStateContext';
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
    padding: '0.4rem',
    '& .MuiIconButton-edgeEnd': {
      marginRight: '0px',
    },
  },
  textInsideList1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #707070',
    borderRadius: '3px',
    marginRight: '0.5rem',
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
const OtherIllnessSelectDateText = ({
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
  const [period, setPeriod] = useState(null);
  const [inputNote, setInputNote] = useState('');
  const wrapperRef = useRef(null);

  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);

  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setOtherIllnessData(storedData);
  }, [storedData]);

  const handleDelete = (ele, index) => {
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);
    const deleted = storedData.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    user.setCheckOtherIllness(true);
  };
  useEffect(() => {
    user.setDelsetOtherIllnessData(deletedData);
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
    setStoredData([
      ...storedData,
      {
        note: inputNote !== '' ? inputNote : null,
        description: selectedData,
        effectiveDateTime: period || null,
        resourceId: uuidv4(),
      },
    ]);
    setSelectedData();
    setInputNote();
    setPeriod();
    setOpenAdd(true);
    user.setCheckOtherIllness(true);
  };
  const handleAddNew = () => {
    setOpenMainAdd(false);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(true);
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
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          <TextField
            className={classes.textField}
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            onBlur={e => {
              if (e.target.value) {
                setSelectedData(e.target.value);
                setNoOldData(false);
                setOpenAdd(false);
                setOpenMainAdd(false);
              }
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.target.value !== '') {
                setSelectedData(e.target.value);
                setNoOldData(false);
                setOpenAdd(false);
                setOpenMainAdd(false);
              }
            }}
            InputProps={{
              placeholder: label,
              className: classes.input1,
              classes: { notchedOutline: classes.noBorder },
            }}
          />
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
                    <IconButton
                      onClick={() => handleDelete(ele, index)}
                      edge="end"
                      className={classes.textDisplay}
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
                <TextField
                  className={classes.textField}
                  style={{ marginTop: '0px', marginBottom: '0px' }}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  onBlur={e => {
                    if (e.target.value) {
                      setSelectedData(e.target.value);
                      setOpenAdd(false);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value !== '') {
                      setSelectedData(e.target.value);
                      setNoOldData(false);
                      setOpenAdd(false);
                      setOpenMainAdd(false);
                    }
                  }}
                  InputProps={{
                    placeholder: label,
                    className: classes.input2,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                />
              ) : (
                <div className={classes.textInsideList} ref={wrapperRef}>
                  <Typography className={classes.textDisplay}>
                    {selectedData}
                  </Typography>
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
                    size="small"
                    placeholder="Select Date"
                    onBlur={e => {
                      if (e.target.value) setPeriod(e.target.value);
                      else setPeriod(null);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      type: 'month',
                      placeholder: 'Select Date',
                      className: classes.input3,
                      classes: { notchedOutline: classes.noBorder },
                    }}
                    inputProps={{ max: moment(new Date()).format('YYYY-MM') }}
                    // helperText={touched.appointmentDate && errors.appointmentDate}
                    // error={Boolean(touched.appointmentDate && errors.appointmentDate)}
                  />

                  <div className={classes.partition}>
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
                        if (e.target.value) {
                          setInputNote(e.target.value);
                          setStoredData([
                            ...storedData,
                            {
                              note: e.target.value,
                              description: selectedData,
                              effectiveDateTime: period,
                              resourceId: uuidv4(),
                            },
                          ]);
                          setSelectedData();
                          setInputNote();
                          setPeriod();
                          setOpenAdd(true);
                          user.setCheckOtherIllness(true);
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value) {
                          setInputNote(e.target.value);
                          setStoredData([
                            ...storedData,
                            {
                              note: e.target.value,
                              description: selectedData,
                              effectiveDateTime: period,
                              resourceId: uuidv4(),
                            },
                          ]);
                          setSelectedData();
                          setInputNote();
                          setPeriod();
                          setOpenAdd(true);
                          user.setCheckOtherIllness(true);
                        }
                      }}
                      InputProps={{
                        placeholder: 'Enter Note',
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
export default OtherIllnessSelectDateText;
