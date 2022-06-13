import { IconButton, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../../../MyStateContext';
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
const SelectChiefCompaint = ({
  id,
  label,
  options,
  code,
  display,
  prevData,
}) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);

  useEffect(() => {
    setStoredData(prevData);
  }, [prevData]);
  useEffect(() => {
    setNoOldData(Boolean(storedData.length == 0));
    user.setChiefComplaintData(storedData);
  }, [storedData]);

  const handleClick = () => {
    setOpenMainAdd(false);
  };
  const handleDelete = (ele, index) => {
    const filteredData = storedData.filter((item, ind) => ind !== index);
    setStoredData(filteredData);

    const deleted = storedData.find((item, ind) => ind === index);
    setdeletedData([...deletedData, deleted]);
    user.setCheckChiefComplaint(true);
  };
  useEffect(() => {
    user.setDelChiefComplaintData(deletedData);
  }, [deletedData]);

  const handleClickBtn = () => {
    setSelectedData();
    setOpenAdd(true);
    setOpenMainAdd(false);
  };
  const handleSaveEach = value => {
    setStoredData([
      ...storedData,
      {
        resourceId: uuidv4(),
        clinicalComplains: [value],
      },
    ]);
    setSelectedData({ code: '', display: '' });

    handleExit();
    user.setCheckChiefComplaint(true);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(true);
  };

  const configTextfield = {
    // fullWidth: true,
    variant: 'outlined',
    size: 'small',
    autoComplete: 'off',
  };

  const InputProps = {
    classes: { notchedOutline: classes.noBorder },
  };
  return (
    <>
      {storedData.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <TextField
              {...configTextfield}
              className={classes.textField}
              InputProps={InputProps}
              style={{ width: 300 }}
              placeholder={label}
              onBlur={e => {
                setNoOldData(false);
                if (e.target.value !== '') {
                  handleSaveEach(e.target.value);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value !== '') {
                  setNoOldData(false);
                  handleSaveEach(e.target.value);
                }
              }}
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
                    {ele.clinicalComplains ? ele.clinicalComplains : '-'}
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
                <TextField
                  {...configTextfield}
                  className={classes.textField}
                  InputProps={InputProps}
                  style={{ width: 300 }}
                  placeholder={label}
                  onBlur={e => {
                    if (e.target.value !== '') {
                      handleSaveEach(e.target.value);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value !== '') {
                      handleSaveEach(e.target.value);
                    }
                  }}
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
export default SelectChiefCompaint;
