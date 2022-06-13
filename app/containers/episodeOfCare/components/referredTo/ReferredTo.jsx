import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import UserContext from '../../MyStateContext';
const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: 400,
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
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: 'rem',
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
    fontWeight: 500,
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
const ReferredTo = ({
  id,
  label,
  options,
  code,
  display,
  prevData,
  specialityOptions,
  handleFinalData,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(true);
  const [noOldData, setNoOldData] = useState();
  const [inputNote, setInputNote] = useState('');
  const user = React.useContext(UserContext);
  useEffect(() => {
    if (Array.isArray(prevData) && prevData.length > 0) {
      // debugger;
      const prac = prevData[0]['note'];

      setStoredData([
        {
          practitioner: prac,
          specialist: prevData[0]['code']
            ? {
                display: prevData[0]['code'] && prevData[0]['code']['display'],
                code: prevData[0]['code'] && prevData[0]['code']['code'],
              }
            : null,
        },
      ]);
    }
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    handleFinalData(storedData);
  }, [storedData]);

  const handleClick = () => {
    // setStoredData([...storedData, selectedData])
    // setOpenMainAdd(false)
  };
  const handleDelete = (ele, index) => {
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);
    if (filteredData.length == 0) setNoOldData(true);
  };
  const handleClickBtn = () => {
    // setOpenAdd(true)
    // setOpenMainAdd(true)
  };

  const handleExit = () => {
    setSelectedData(null);
    setOpenAdd(true);
    setOpenMainAdd(true);
  };
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <TextField
              className={classes.textField}
              style={{ width: 250 }}
              variant="outlined"
              // defaultValue={item['dosageInstruction'][0]['doseQuantity'][0]['value']}
              size="small"
              onBlur={e => {
                if (e.target.value) {
                  setSelectedData(e.target.value);
                  setNoOldData(false);
                  setOpenAdd(false);
                  setOpenMainAdd(false);
                  user.setCheckReportedToData(true);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value !== '') {
                  setSelectedData(e.target.value);
                  setNoOldData(false);
                  setOpenAdd(false);
                  setOpenMainAdd(false);
                  user.setCheckReportedToData(true);
                }
              }}
              InputProps={{
                placeholder: 'Enter Name',
                className: classes.input1,
                classes: { notchedOutline: classes.noBorder },
              }}
            />
            //     <Autocomplete
            //     size="small"
            //     disableClearable
            //     debug
            //     style={{ width: 300 }}
            //     onChange={(e, value) => {
            //         setSelectedData(value)
            //         setNoOldData(false)
            //         setOpenAdd(false)
            //         setOpenMainAdd(false)
            //     }}
            //     getOptionLabel={(option) => option.display}
            //     options={options}
            //     renderInput={params => (
            //         <TextField
            //             {...params}
            //             className={classes.textField}
            //             margin="dense"
            //             variant="outlined"
            //             InputLabelProps={{ shrink: false }}
            //             // error={ false }
            //             // helperText="Required"
            //             InputProps={{
            //                 ...params.InputProps,
            //                 placeholder: label,
            //                 className: classes.input1,
            //                 classes: { notchedOutline: classes.noBorder },
            //             }}
            //         />
            //     )}
            // />
          }
        </Grid>
      ) : (
        <Grid item xs>
          <Paper elevation={0} component="ul" className={classes.root}>
            {storedData.map((ele, index) => {
              // debugger;
              return (
                <li key={index.toString()} className={classes.listItem}>
                  <div className={classes.textInsideList}>
                    <Typography className={classes.textDisplay}>
                      <span>{ele.practitioner}</span>
                      <span>
                        {ele.specialist ? ` - ${ele.specialist.display}` : ''}
                      </span>
                    </Typography>
                    {/* <IconButton
                                        onClick={() => handleDelete(ele, index)}
                                        edge="end"
                                        style={{ padding: "0px 10px" }}
                                    >
                                        <CloseIcon style={{ fontSize: "0.9rem" }} />
                                    </IconButton> */}
                  </div>
                </li>
              );
            })}
            <li className={classes.listItem}>
              {openAdd && openMainAdd ? (
                <div
                  className={classes.options}
                  onClick={handleClick}
                  style={{ visibility: 'hidden' }}
                >
                  <AddIcon />
                </div>
              ) : openAdd ? (
                <TextField
                  className={classes.textField}
                  fullWidth
                  variant="outlined"
                  // defaultValue={item['dosageInstruction'][0]['doseQuantity'][0]['value']}
                  size="small"
                  onBlur={e => {
                    if (e.target.value) {
                      setSelectedData(e.target.value);
                      setOpenAdd(false);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setSelectedData(e.target.value);
                      setOpenAdd(false);
                    }
                  }}
                  InputProps={{
                    placeholder: 'Enter Name',
                    className: classes.input1,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                />
              ) : (
                // <Autocomplete
                //     size="small"
                //     disableClearable
                //     debug
                //     onChange={(e, value) => {
                //         setSelectedData(value)
                //         setOpenAdd(false)
                //     }}
                //     getOptionLabel={(option) => option.display}
                //     options={options}
                //     renderInput={params => (
                //         <TextField
                //             {...params}
                //             className={classes.textField}
                //             style={{ marginTop: "0px", marginBottom: "0px" }}
                //             margin="dense"
                //             variant="outlined"
                //             InputLabelProps={{ shrink: false }}
                //             // error={ false }
                //             // helperText="Required"
                //             InputProps={{
                //                 ...params.InputProps,
                //                 placeholder: label,
                //                 className: classes.input2,
                //                 classes: { notchedOutline: classes.noBorder },
                //             }}
                //         />
                //     )}
                // />
                <div className={classes.textInsideList}>
                  <Typography className={classes.textDisplay}>
                    {selectedData}
                  </Typography>
                  <Autocomplete
                    size="small"
                    openOnFocus
                    disableClearable
                    onChange={(e, value) => {
                      setStoredData([
                        ...storedData,
                        {
                          practitioner: selectedData,
                          specialist: value,
                        },
                      ]);
                      setSelectedData(null);
                      setOpenAdd(true);
                      setOpenMainAdd(true);
                      user.setCheckReportedToData(true);
                    }}
                    getOptionLabel={option => option.display}
                    options={specialityOptions}
                    renderInput={params => (
                      <TextField
                        {...params}
                        autoFocus
                        className={classes.textField2}
                        style={{
                          marginTop: '0px',
                          marginBottom: '0px',
                          marginLeft: '0.5rem',
                          fontSize: '0.4rem',
                          padding: '0px 2px',
                          width: 'auto',
                        }}
                        // inputRef={input => {
                        //   inputRef = input;
                        // }}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        onBlur={e => {
                          debugger;
                          if (e.target.value === '') {
                            debugger;
                            setStoredData([
                              ...storedData,
                              {
                                practitioner: selectedData,
                                specialist: e.target.value,
                              },
                            ]);
                            setSelectedData(null);
                            setOpenAdd(true);
                            setOpenMainAdd(true);
                            user.setCheckReportedToData(true);
                          }
                        }}
                        // error={ false }
                        // helperText="Required"
                        InputProps={{
                          ...params.InputProps,
                          placeholder: 'Select Speciality',
                          className: classes.input3,
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    )}
                  />
                  {/* <IconButton
                                            onClick={() => handleExit()}
                                            edge="end"
                                            style={{ padding: "0px 10px" }}
                                        >
                                            <CloseIcon style={{ fontSize: "0.9rem" }} />
                                        </IconButton> */}
                </div>
              )}
            </li>
            {!openAdd && !openMainAdd && (
              <li className={classes.listItem} style={{ visibility: 'hidden' }}>
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
export default ReferredTo;
