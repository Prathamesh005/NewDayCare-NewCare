import { InputAdornment, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { doSearchTests } from '../../../apis/globalApis/globalSlice';
import InputSelectAndSearch from '../../../components/hocs/components/InputSelectAndSearch';
import SelectLabTests from '../../../components/hocs/wrappers/SelectLabTests';
import { MessageComponent } from '../../../components';
import UserContext from '../MyStateContext';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import { useDebouncing } from '../../../hooks/useDebouncing';

const filterArrayAuto = createFilterOptions({
  matchFrom: 'any',
  stringify: option => option.testname.raw + option.shortname.raw,
});

const useStyles = makeStyles(theme => ({
  adjustWidth: {
    width: 220,
    [theme.breakpoints.down('md')]: {
      width: 180,
    },
  },
  tableWidth: {
    width: '100%',
  },
  headlabels: {
    fontSize: '1rem',
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
    fontWeight: 400,
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
    borderRadius: '3px',
    padding: '4px',
    fontSize: 'small',
    color: `#9c9c9c`,
    backgroundColor: 'white',
    cursor: 'pointer',
    width: 'fit-content',
    marginLeft: '10px',
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
  noBorder: {
    border: 'none',
  },
  input2: {
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '0px',
    },
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
}));

function AdviceSection(props) {
  const { adviceData } = props;
  const classes = useStyles();
  const [expand1, setExpand1] = React.useState(true);
  const [adviceArray, setAdviceArray] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [selectedData1, setSelectedData1] = useState();
  const [noOldData, setNoOldData] = useState();
  const [noOldData1, setNoOldData1] = useState();
  const [openAdd, setOpenAdd] = useState(true);
  const [openAdd1, setOpenAdd1] = useState(true);
  const [openMainAdd, setOpenMainAdd] = useState(true);
  const [openMainAdd1, setOpenMainAdd1] = useState(true);
  const [whenTime, setWhenTime] = useState();
  const [selectedWhen, setSelectedWhen] = useState({
    key: 'days',
    value: 'days',
  });
  const [finalArray, setFinalArray] = useState([]);
  const [indexValue, setIndexValue] = useState();
  const [arrayIndex, setArrayIndex] = useState();
  const [categoryArr, setCategoryArr] = useState([]);
  const [CategoryArrResponse, setCategoryArrResponse] = useState([]);
  const [selectedAdvice, setSelectedAdvice] = useState();
  const user = React.useContext(UserContext);
  const [advicePrevDataArray, setAdvicePrevDataArray] = useState();
  const [deletedData, setdeletedData] = useState([]);
  const [whenArr, setWhenArr] = useState([]);

  //-----------------API CALLS END---------------
  const calldoSearchTests = async test => {
    const { payload } = await props.doSearchTests(test);

    if (payload && payload.status === 200) {
      const { data } = payload;
      setCategoryArrResponse(data && data.response && data.response.results);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
          payload.response.data &&
          payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
      setCategoryArrResponse([]);
    }
  };
  //-----------------API CALLS END---------------
  useEffect(() => {
    calldoSearchTests({ test: '' });
  }, []);

  const getTestListsFromAPI = inputValue => {
    let field = {
      test: inputValue,
    };
    calldoSearchTests(field);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(getTestListsFromAPI);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  useEffect(() => {
    let value = CategoryArrResponse;

    let res =
      Array.isArray(value) && value.length > 0
        ? value.map(val => {
          return {
            code: val.shortname.raw,
            text: val.testcategoryname.raw,
            display: val.testname.raw,
          };
        })
        : [];

    setCategoryArr(res);
  }, [CategoryArrResponse]);

  useEffect(() => {
    // debugger;
    setAdvicePrevDataArray(adviceData);
  }, [adviceData]);

  useEffect(() => {
    if (advicePrevDataArray) {
      function groupBy(array, f) {
        var groups = {};
        array.forEach(function (o) {
          var group = JSON.stringify(f(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
          return groups[group];
        });
      }

      var result = groupBy(advicePrevDataArray, function (item) {
        return [item.fromDate, item.toDate];
      });
      setFinalArray(result);
    }
  }, [advicePrevDataArray, adviceData]);

  const prevData = [];
  useEffect(() => {
    setFinalArray(prevData);
  }, []);
  useEffect(() => {
    // debugger;
    if (finalArray.length == 0) setIndexValue(0);
    else setIndexValue(finalArray.length - 1);
  }, []);

  useEffect(() => {
    setNoOldData(Boolean(adviceArray.length == 0));
  }, [adviceArray]);
  const handleClick = () => {
    // setStoredData([...storedData, selectedData])
    setOpenMainAdd(false);
  };
  const handleClickBtn = () => {
    setAdviceArray([
      ...adviceArray,
      {
        category: [
          {
            codeableSystem: 'http://snomed.info/sct',
            code: 'Diagnostic Request',
            text: 'Diagnostic Request',
            display: 'Diagnostic Request',
            __typename: 'CancerCodableConcept',
          },
          {
            codeableSystem:
              'http://dataquent.com/fhir/us/custom/ValueSet/custom-tumor-marker-vs',
            code: selectedData.code,
            text: selectedData.display,
            display: selectedData.display,
            __typename: 'CancerCodableConcept',
          },
        ],
      },
    ]);
    // debugger;
    setSelectedData();
    setOpenAdd(true);
    setOpenMainAdd(false);
  };
  const handleExit = () => {
    setOpenAdd(true);
    setOpenMainAdd(true);
  };
  const handleFinalAdviceAdd = i => {
    // debugger;
    setFinalArray([...finalArray, []]);
  };
  const handleClick1 = i => {
    // setStoredData([...storedData, selectedData])
    setIndexValue(i);
    setOpenMainAdd1(false);
  };
  const handleClickBtn1 = i => {
    setOpenAdd1(true);
    setOpenMainAdd1(false);
  };
  const handleExit1 = () => {
    setOpenAdd1(true);
    setOpenMainAdd1(true);
  };
  const handleDelete1 = (ele, index, i) => {
    const arr = [...finalArray];
    // debugger;
    const newArr = [...arr[i]];
    const dataDeletedObj = newArr.find((item, ind) => ind === index);
    const filteredData = newArr.filter((item, ind) => ind !== index);
    if (filteredData.length > 0) {
      arr[i] = filteredData;
      setFinalArray(arr);
    } else {
      const filterFinal = arr.filter((item, inde) => inde !== i);
      setFinalArray(filterFinal);
    }
    setdeletedData([...deletedData, dataDeletedObj]);
    user.setCheckAdvice(true);
    // debugger;
  };
  const handleDelete = i => {
    const arr = [...finalArray];
    const filterFinal = arr.filter((item, inde) => inde !== i);
    const deletedItemsFromArray = arr.find((ele, index) => index === i);
    if (deletedItemsFromArray) {
      setdeletedData([...deletedData, ...deletedItemsFromArray]);
    }
    setFinalArray(filterFinal);
    user.setCheckAdvice(true);
  };

  useEffect(() => {
    user.setDelAdviceData(deletedData);
  }, [deletedData]);

  useEffect(() => {
    whenValues();
    user.setAdviceData(finalArray);
  }, [finalArray]);
  const whenValues = () => {
    let arr = finalArray.map(item => {
      let frmData = item.length > 0 && item[0].fromDate ? item[0].fromDate : props.dateProp;
      let to2Date = item.length > 0 && item[0].fromDate ? item[0].toDate : props.dateProp;
      let a = moment.utc(frmData).local();
      let b = moment.utc(to2Date).local();
      let c = b.diff(a, 'days');
      return c;
    });
    // debugger
    setWhenArr(arr);
  };

  const onExpand = () => {
    setExpand1(!expand1);
  };
  const handleUpdateStoredData = (data, index) => {
    // debugger
    let newArray = [...finalArray];
    newArray[index] = data;
    setFinalArray(newArray);
  };
  const handleSaveEach = (value, index) => {
    let arr = [...finalArray];
    let insideArr = arr[index];
    insideArr.push({
      resourceId: uuidv4(),
      code: {
        codeableSystem:
          'http://dataquent.com/fhir/us/custom/ValueSet/custom-nuqare-dev-lab-tests-vs',
        code: value.code,
        text: value.text,
        display: value.display,
      },
      newEntry: value.newEntry,
      fromDate: arr[index].length > 0 ? arr[index][0].fromDate : moment.utc(props.dateProp).local().format("YYYY-MM-DD"),
      toDate: arr[index].length > 0 ? arr[index][0].toDate : moment.utc(props.dateProp).local().format("YYYY-MM-DD"),
      note: null,
    });
    arr[index] = insideArr;
    setFinalArray(arr);
    user.setCheckAdvice(true);
  };

  const handleSaveEdit = (value, editResourceId, editIndex, index) => {
    let arr = [...finalArray];
    let insideArr = arr[index];
    let editData = {
      resourceId: editResourceId,
      code: {
        codeableSystem:
          'http://dataquent.com/fhir/us/custom/ValueSet/custom-nuqare-dev-lab-tests-vs',
        code: value.code,
        text: value.text,
        display: value.display,
      },
      newEntry: value.newEntry,
      fromDate: arr[index].length > 0 ? arr[index][0].fromDate : null,
      toDate: arr[index].length > 0 ? arr[index][0].toDate : null,
      note: null,
    };
    insideArr[editIndex] = editData;
    arr[index] = insideArr;
    setFinalArray(arr);
    user.setCheckAdvice(true);
  };

  const handleSaveFirstData = value => {
    let arr = [...finalArray];
    arr[0] = [
      {
        resourceId: uuidv4(),
        code: {
          codeableSystem:
            'http://dataquent.com/fhir/us/custom/ValueSet/custom-nuqare-dev-lab-tests-vs',
          code: value.code,
          text: value.newEntry ? 'Other' : value.text,
          display: value.display,
        },
        newEntry: value.newEntry,
        fromDate: moment.utc(new Date()).local().format('YYYY-MM-DD'),
        toDate: moment.utc(new Date()).local().format('YYYY-MM-DD'),
        note: null,
      },
    ];
    setFinalArray(arr);
    user.setCheckAdvice(true);
  };
  // console.log("whenArr", whenArr)
  // console.log("deletedData", deletedData)
  return (
    <Fragment>
      <Accordion expanded={expand1} onChange={onExpand} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Typography className={classes.headlabels}>Advice</Typography>
            </Grid>
            <Grid item xs={12} md={10} className={classes.centerGrid}>
              <Typography className={classes.secondarylabels} />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item xs={12} md={1} className={classes.lebels}>
              Advice
            </Grid>
            <Grid item xs={12} md={11}>
              {/* <Grid container spacing={2}> */}
              <table className={classes.tableWidth}>
                <tbody>
                  {finalArray.length > 0 ? (
                    finalArray.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td style={{ width: '70%' }}>
                              {
                                <SelectLabTests
                                  type={'advice'}
                                  label={'Select Advices'}
                                  options={categoryArr && categoryArr}
                                  data={item || []}
                                  display="display"
                                  updateStoredData={data =>
                                    handleUpdateStoredData(data, index)
                                  }
                                  checkAnyUpdate={() =>
                                    user.setCheckAdvice(true)
                                  }
                                  deleteData={data => {
                                    // debugger
                                    setdeletedData([...deletedData, ...data]);
                                    // user.setDelAdviceData(data)
                                  }
                                  }
                                  saveData={data => handleSaveEach(data, index)}
                                  saveEditData={(
                                    value,
                                    editResourceId,
                                    editIndex,
                                  ) =>
                                    handleSaveEdit(
                                      value,
                                      editResourceId,
                                      editIndex,
                                      index,
                                    )
                                  }
                                  getTestListsFromAPI={e =>
                                    onHandleChange(e.target.value)
                                  }
                                />
                              }
                            </td>
                            <td style={{ width: '5%' }} valign="top">
                              <Grid item xs={12} className={classes.lebels}>
                                When ?
                              </Grid>
                            </td>
                            <td style={{ width: '25%' }} valign="top">
                              <Grid
                                item
                                xs
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                <TextField
                                  name="AdviceDurationText"
                                  // type="number"
                                  className={classes.textField}
                                  style={{
                                    marginTop: '0px',
                                    marginBottom: '0px',
                                    width: '70%',
                                  }}
                                  margin="dense"
                                  variant="outlined"
                                  value={whenArr[index]}
                                  InputLabelProps={{ shrink: false }}
                                  onChange={e => {
                                    let newWhenArr = [...whenArr];
                                    newWhenArr[index] = e.target.value;
                                    setWhenArr(newWhenArr);
                                    user.setCheckAdvice(true);
                                  }}
                                  onBlur={e => {
                                    let arr = [...finalArray];
                                    let val = e.target.value ? e.target.value.replace(
                                      /\D/g,
                                      '',
                                    ) : 0;
                                    // if (val !== '' || val !== 0) {
                                    let insideArr = arr[index].map(itm => {
                                      return {
                                        ...itm,
                                        fromDate: moment.utc(props.dateProp).local().format("YYYY-MM-DD"),
                                        toDate: moment(props.dateProp)
                                          .add(
                                            parseInt(val),
                                            'days',
                                          )
                                          .format('YYYY-MM-DD'),
                                      };
                                    });
                                    arr[index] = insideArr;
                                    setFinalArray(arr);
                                    // }
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Typography
                                          className={classes.textDisplay}
                                        >
                                          Days
                                        </Typography>
                                        <div
                                          className={classes.options}
                                          onClick={() => handleDelete(index)}
                                        >
                                          <CloseIcon />
                                        </div>
                                        <div
                                          style={{
                                            display:
                                              index === finalArray.length - 1
                                                ? 'block'
                                                : 'none',
                                          }}
                                          className={classes.options}
                                          onClick={() =>
                                            handleFinalAdviceAdd(index)
                                          }
                                        >
                                          <AddIcon />
                                        </div>
                                      </InputAdornment>
                                    ),
                                    className: classes.input2,
                                    classes: {
                                      notchedOutline: classes.noBorder,
                                    },
                                    inputProps: {
                                      // pattern: '^[0-9]+$|^$',
                                      // min: 0,
                                    },
                                  }}
                                />

                                {/* {index === finalArray.length - 1 && ( */}

                                {/* )} */}
                              </Grid>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td>
                        <InputSelectAndSearch
                          id="select-1"
                          name="select-1"
                          style={{ width: 300 }}
                          className={classes.adjustWidth}
                          onChange={(e, value) => {
                            if (typeof value === 'string') {
                              handleSaveFirstData({
                                code: value,
                                display: value,
                              });
                            } else if (value && value.inputValue) {
                              handleSaveFirstData({
                                code: value.inputValue,
                                display: value.inputValue,
                              });
                            } else {
                              handleSaveFirstData({
                                ...value,
                                newEntry: false,
                              });
                            }
                          }}
                          options={categoryArr}
                          display="display"
                          renderInput={params => (
                            <TextField
                              {...params}
                              className={classes.textField}
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{ shrink: false }}
                              onChange={e => onHandleChange(e.target.value)}
                              onBlur={e => {
                                if (e.target.value) {
                                  if (typeof e.target.value === 'string') {
                                    handleSaveFirstData({
                                      code: e.target.value,
                                      display: e.target.value,
                                    });
                                  }
                                }
                              }}
                              InputProps={{
                                ...params.InputProps,
                                placeholder: 'Enter Advices',
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
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    doSearchTests: inputTest => dispatch(doSearchTests(inputTest)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(AdviceSection);
