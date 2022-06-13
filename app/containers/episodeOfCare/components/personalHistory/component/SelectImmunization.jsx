import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
const SelectImmunization = ({
  id,
  label,
  options,
  code,
  display,
  prevData,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  // console.log("storedData",storedData)
  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);

  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setImmunizationData(storedData);
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
    user.setCheckImmunization(true);
  };
  useEffect(() => {
    user.setDelImmunizationData(deletedData);
  }, [deletedData]);

  const handleClickBtn = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
  };
  const handleSaveEach = value => {
    setStoredData([
      ...storedData,
      {
        // "occurrence": data.field.immunizationDate,

        resourceId: uuidv4(),
        vaccineCode: {
          CodeableSystem: 'http://hl7.org/fhir/ValueSet/vaccine-code',
          code: value.code,
          text: value.display,
          display: value.display,
        },
      },
    ]);
    setOpenAdd(true);
    setOpenMainAdd(false);
    user.setCheckImmunization(true);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(true);
  };
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <Autocomplete
              freeSolo
              size="small"
              autoFocus
              disableClearable
              id={'select-immune-1'}
              style={{ width: 300 }}
              onChange={(e, value) => {
                if (typeof value === 'string') {
                  handleSaveEach({ code: value, display: value });
                } else if (value && value.inputValue) {
                  handleSaveEach({
                    code: value.inputValue,
                    display: value.inputValue,
                  });
                } else {
                  handleSaveEach(value);
                }
                setNoOldData(false);
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
              options={options}
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
                        handleSaveEach({
                          code: e.target.value,
                          display: e.target.value,
                        });
                      } else {
                        handleSaveEach(e.target.value);
                      }
                      setNoOldData(false);
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
                    {ele.vaccineCode.display}
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
              {openAdd && openMainAdd && (
                <div className={classes.options} onClick={handleClick}>
                  {' '}
                  <AddIcon />{' '}
                </div>
              )}
              {openAdd && !openMainAdd && (
                <Autocomplete
                  freeSolo={true}
                  size="small"
                  disableClearable
                  autoFocus
                  value={{ code: '', display: '' }}
                  id="select-immune-2"
                  onChange={(e, value) => {
                    if (typeof value === 'string') {
                      handleSaveEach({ code: value, display: value });
                    } else if (value && value.inputValue) {
                      handleSaveEach({
                        code: value.inputValue,
                        display: value.inputValue,
                      });
                    } else {
                      handleSaveEach(value);
                    }
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
                  options={options}
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
                            handleSaveEach({
                              code: e.target.value,
                              display: e.target.value,
                            });
                          } else {
                            handleSaveEach(e.target.value);
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
export default SelectImmunization;
