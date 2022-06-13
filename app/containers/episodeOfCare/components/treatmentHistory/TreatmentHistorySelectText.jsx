import { IconButton, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Fragment, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    borderRadius: 5,
    padding: 2,
    // margin: "3px 10px 3px 10px",
    outline: 'none !important',
    backgroundColor: '#F0F0F0',
    color: '#373737',
  },
  accordationDiv: {
    width: '100%',
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  secondarylabels: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
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
  textDisplay: {
    fontSize: '0.8rem',
    fontWeight: 'normal',
  },
  textInsideList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #707070',
    borderRadius: '3px',
    marginRight: '0.5rem',
    padding: '0.1rem',
  },
  noBorder: {
    border: 'none',
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
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    '& .MuiFormControl-marginDense': {
      marginTop: '4px',
    },
    margin: theme.spacing(0.5),
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    '& .MuiFormControl-marginDense': {
      marginTop: '4px',
    },
    margin: theme.spacing(0.5),
  },
  textField2: {
    '& .MuiOutlinedInput-input': {
      fontSize: '0.9rem',
      fontWeight: 'normal',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
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
    // paddingBottom: "0.5rem"
  },
  textDisplay: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
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

  checked: {},
  partition: {
    borderLeft: '0.5px solid #707070',
    padding: '3px 0px',
  },
  alignGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    marginRight: '0px',
  },
  datepick: {
    width: '60px',
    border: 'none',
  },
}));

function TreatmentHistorySelectText({
  id,
  label,
  options,
  code,
  display,
  prevData,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const [expand1, setExpand1] = React.useState(true);
  const [selectedData, setSelectedData] = useState();
  const [treatmentDate, setTreatmentDate] = useState();
  const [treatmentBrief, setTreatmentBrief] = useState('');
  const [treatmentResponse, setTreatmentResponse] = useState('');
  const [openRow, setOpenRow] = useState(false);
  const [finalArray, setFinalArray] = useState([]);
  const [indexValue, setIndexValue] = useState();
  const [arrayIndex, setArrayIndex] = useState();
  const [categoryArr, setCategoryArr] = useState([]);
  const [showAddIcon, setShowAddIcon] = useState(false);

  useEffect(() => {
    setCategoryArr([
      {
        code: 'Radio Therapy',
        display: 'Radio Therapy',
      },
    ]);
  }, []);
  const durationData = [
    { key: 'days', value: 'days' },
    { key: 'month', value: 'month' },
    { key: 'year', value: 'year' },
  ];

  useEffect(() => {
    setFinalArray(prevData);
    setIndexValue(prevData.length - 1);
  }, []);

  const handleClick1 = value => {
    let arr = [...finalArray];
    arr.push({
      typeOfTreatment: {
        code: value,
        display: value,
      },
      date: '',
      brief: '',
      response: '',
    });
    setFinalArray(arr);
  };

  const handleAddNewRow = index => {
    selectedData();
    setOpenRow(true);
  };

  console.log('finalArray', finalArray);
  return (
    <Fragment>
      <Grid item xs={12} md={11}>
        <Grid container spacing={2}>
          {finalArray.length == 0 && !openRow ? (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={8} container>
                  <Grid item xs>
                    {
                      <Autocomplete
                        size="small"
                        disableClearable
                        debug
                        style={{ width: 300 }}
                        onChange={(e, value) => {
                          setSelectedData(value);
                          setOpenRow(true);
                        }}
                        getOptionLabel={option => option.code}
                        options={
                          categoryArr && categoryArr.length !== 0
                            ? categoryArr
                            : []
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{ shrink: false }}
                            // error={ false }
                            // helperText="Required"
                            InputProps={{
                              ...params.InputProps,
                              placeholder: 'Select Treatment',
                              className: classes.input1,
                              classes: { notchedOutline: classes.noBorder },
                            }}
                          />
                        )}
                      />
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            finalArray.map((el, index) => {
              // debugger;
              return (
                <Grid item xs={12} key={index.toString()}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      container
                      className={classes.alignGrid}
                    >
                      <Grid item xs={10}>
                        <Grid container className={classes.textInsideList}>
                          <Grid item xs={6}>
                            <Typography className={classes.textDisplay}>
                              {el.typeOfTreatment.code}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography className={classes.textDisplay}>
                              {el.date}
                            </Typography>
                          </Grid>
                          <Grid item xs={1} className={classes.alignGrid}>
                            <IconButton
                              // onClick={() => handleDelete1(ele, index, i)}
                              edge="end"
                              style={{ padding: '0px 10px' }}
                              className={classes.iconBtn}
                            >
                              <CloseIcon style={{ fontSize: '0.9rem' }} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      {finalArray.length - 1 === index && (
                        <Grid item xs={2} className={classes.alignGrid}>
                          <div
                            className={classes.options}
                            onClick={() => handleAddNewRow(index)}
                          >
                            <AddIcon />
                          </div>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.alignGrid}>
                      <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} className={classes.lebels}>
                          Brief
                        </Grid>
                        <Grid item xs>
                          {el.brief}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.alignGrid}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3} className={classes.lebels}>
                          Response to treatment
                        </Grid>
                        <Grid item xs>
                          {el.response}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          )}
          {openRow && (
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    container
                    className={classes.alignGrid}
                  >
                    <Grid item xs={10}>
                      <Grid container className={classes.textInsideList}>
                        <Grid item xs={6}>
                          <Typography className={classes.textDisplay}>
                            {selectedData.code}
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <DatePicker
                            selected={new Date()}
                            onBlur={date => {
                              let arr = [...finalArray];
                              arr[0] = {
                                typeOfTreatment: {
                                  code: selectedData.code,
                                  display: selectedData.display,
                                },
                                date: date,
                                brief: treatmentBrief,
                                response: treatmentResponse,
                              };
                              setFinalArray(arr);
                            }}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            className={classes.datepick}
                          />
                        </Grid>
                        <Grid item xs={1} className={classes.alignGrid}>
                          <IconButton
                            // onClick={() => handleDelete1(ele, index, i)}
                            edge="end"
                            style={{ padding: '0px 10px' }}
                            className={classes.iconBtn}
                          >
                            <CloseIcon style={{ fontSize: '0.9rem' }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} className={classes.alignGrid}>
                      <div
                        className={classes.options}
                        onClick={() => handleAddNewRow(index)}
                      >
                        <AddIcon />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.alignGrid}>
                    <Grid container spacing={2}>
                      <Grid item xs={4} sm={3} className={classes.lebels}>
                        Brief
                      </Grid>
                      <Grid item xs>
                        <TextField
                          name="treatmentBrief"
                          className={classes.textField}
                          style={{ marginTop: '0px', marginBottom: '0px' }}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: false }}
                          onChange={e => {
                            setTreatmentBrief(e.target.value);
                          }}
                          InputProps={{
                            placeholder: 'Enter Text Here...',
                            className: classes.input2,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.alignGrid}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3} className={classes.lebels}>
                        Response to treatment
                      </Grid>
                      <Grid item xs>
                        <TextField
                          name="responseTreatment"
                          className={classes.textField}
                          style={{ marginTop: '0px', marginBottom: '0px' }}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: false }}
                          onChange={e => {
                            setTreatmentResponse(e.target.value);
                          }}
                          InputProps={{
                            placeholder: 'Enter Text Here...',
                            className: classes.input2,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {openNextRow && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={8} container>
                  <Grid item xs>
                    {
                      <Autocomplete
                        size="small"
                        disableClearable
                        debug
                        style={{ width: 300 }}
                        onChange={(e, value) => {
                          setSelectedData(value);
                          setOpenRow(true);
                        }}
                        getOptionLabel={option => option.code}
                        options={
                          categoryArr && categoryArr.length !== 0
                            ? categoryArr
                            : []
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{ shrink: false }}
                            // error={ false }
                            // helperText="Required"
                            InputProps={{
                              ...params.InputProps,
                              placeholder: 'Select Treatment',
                              className: classes.input1,
                              classes: { notchedOutline: classes.noBorder },
                            }}
                          />
                        )}
                      />
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default TreatmentHistorySelectText;
