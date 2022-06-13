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
import InputTextField from '../components/InputTextField';
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
const TextOnly = ({
  name,
  label,
  data,
  updateStoredData,
  checkAnyUpdate,
  deleteData,
  saveData,
  saveEditData,
}) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState();
  const [openAdd, setOpenAdd] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(false);
  const [noOldData, setNoOldData] = useState();
  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);
  const [editIndex, setEditIndex] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [editResourceId, setEditResourceId] = useState('');

  useEffect(() => {
    setNoOldData(Boolean(Array.isArray(data) && data.length == 0));
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
    setSelectedData();
    setOpenAdd(true);
    setOpenMainAdd(false);
  };
  const handleSaveEach = value => {
    saveData(value);
    handleExit();
  };
  const handleSaveEdit = value => {
    // debugger;
    saveEditData(value, editResourceId, editIndex);
    handleExit();
    setEditIndex();
    setInputNote('');
    setEditResourceId('');
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(false);
    setInputNote('');
  };
  const handleEdit = (e, index, ele) => {
    setOpenMainAdd(true);
    setInputNote('');
    setEditIndex(index);
    if (name === 'chiefComplaint') {
      setInputNote(ele.clinicalComplains);
      setEditResourceId(ele.resourceId);
    }
  };
  return (
    <>
      {Array.isArray(data) && data.length == 0 && noOldData ? (
        <Grid item xs>
          {
            <InputTextField
              classStyle="textFieldNormal"
              name="texts-1"
              style={{ width: 300 }}
              variant="outlined"
              value={inputNote}
              onChange={e => setInputNote(e.target.value)}
              InputLabelProps={{ shrink: false }}
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
              placeholder={label}
            />
          }
        </Grid>
      ) : (
        <Grid item xs>
          <Paper elevation={0} component="ul" className={classes.root}>
            {Array.isArray(data) &&
              data.map((ele, index) => (
                <li key={index.toString()} className={classes.listItem}>
                  {editIndex !== index ? (
                    <div className={classes.textInsideList}>
                      <Typography className={classes.textDisplay}>
                        {name === 'chiefComplaint' && ele.clinicalComplains
                          ? ele.clinicalComplains
                          : '-'}
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
                      <InputTextField
                        classStyle="textField"
                        name="texts-2"
                        variant="outlined"
                        autoFocus
                        value={inputNote}
                        onChange={e => setInputNote(e.target.value)}
                        InputLabelProps={{ shrink: false }}
                        onBlur={e => {
                          if (e.target.value !== '') {
                            handleSaveEdit(e.target.value);
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && e.target.value !== '') {
                            handleSaveEdit(e.target.value);
                          }
                        }}
                        placeholder={label}
                      />
                    </div>
                  )}
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
                <InputTextField
                  classStyle="textFieldNormal"
                  name="texts-3"
                  style={{ width: 300 }}
                  variant="outlined"
                  autoFocus
                  value={inputNote}
                  onChange={e => setInputNote(e.target.value)}
                  InputLabelProps={{ shrink: false }}
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
                  placeholder={label}
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
export default TextOnly;
