import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { useState, useEffect } from 'react';
import tick from '../../../../images/tick.png';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UserContext from '../../MyStateContext';

const filterArrayAuto = createFilterOptions({
  matchFrom: 'any',
  stringify: option =>
    option['brand_Name']['raw'] + option['generic_Name']['raw'],
});
const filterArrayFreq = createFilterOptions();
const useStyles = makeStyles(theme => ({
  tableRoot: {
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    width: '100%',
    '& th, td': {
      border: '1px solid #F4F4F4',
      textAlign: 'left',
      padding: '8px',
    },
    '& th:nth-child(1), td:nth-child(1)': {
      textAlign: 'center',
    },
    '& th': {
      backgroundColor: '#F4F4F4',
      fontWeight: 500,
    },
  },
  textField: {
    // width: "300px",
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  textField1: {
    // width: "300px",
    '& .MuiOutlinedInput-input': {
      // background: "#F4F4F4",
      fontSize: '1rem',
      fontWeight: 400,
      color: '#6E6E6E',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
    },
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
  textField2: {
    // width: "300px",
    '& .MuiOutlinedInput-input': {
      // background: "#F4F4F4",
      fontSize: '1rem',
      fontWeight: 400,
      color: '#6E6E6E',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#6E6E6E',
    },
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
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
    // background: "#F4F4F4",
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    // paddingRight: 18,
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
  input3: {
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
  addDiscount: {
    color: theme.palette.button.paginated.color,
    cursor: 'pointer',
    fontWeight: 500,
  },
  discountHover: {
    '&:hover': {
      '& span': {
        color: theme.palette.button.paginated.color,
      },
    },
    '& span': {
      color: '#f0f0f0',
    },
  },
  deleteBtn: {
    '&:hover': {
      '& span': {
        color: theme.palette.button.paginated.color,
      },
    },
    '& span': {
      color: 'pink',
    },
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: '1px',
    fontSize: 'small',
    color: `#9c9c9c`,
    backgroundColor: '#F4F4F4',
    cursor: 'pointer',
    width: 'fit-content',
  },

  textFieldForm: {
    '& .MuiOutlinedInput-input': {
      // background: "#F4F4F4",
      fontSize: '1rem',
      fontWeight: 400,
      [theme.breakpoints.down('md')]: {
        padding: '10.5px 5px',
        fontSize: '0.9rem',
      },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.9rem',
      },
    },
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
}));
function PrescriptionTable(props) {
  const classes = useStyles();
  const { column, openAddNewRowInput } = props;
  const [arrayOfPrescribedMedicine, setArrayOfPrescribedMedicine] = useState(
    props.arrayOfPrescribedMedicine,
  );
  const [medicineArr, setMedicineArr] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState({
    brand_Name: {
      raw: '',
    },
    generic_Name: {
      raw: '',
    },
  });
  const [selectedServiceInputValue, setSelectedServiceInputValue] = useState(
    '',
  );
  const [selectedMedicineType, setSelectedMedicineType] = useState({
    code: '',
    display: '',
  });
  const [frequencyArray, setFrequencyArray] = useState([]);
  const [instructionArray, setInstructionArray] = useState([]);
  const [drugFormValueSet, setDrugFormValueSet] = useState([]);
  const [deletedData, setdeletedData] = useState([]);
  const user = React.useContext(UserContext);
  const durationData = [
    { key: 'D', value: 'days' },
    { key: 'Wk', value: 'weeks' },
    { key: 'Mo', value: 'months' },
  ];

  useEffect(() => {
    setMedicineArr(props.arrOfDrugsName);
  }, [props.arrOfDrugsName]);

  useEffect(() => {
    setFrequencyArray(props.frequencyValueSet && props.frequencyValueSet);
  }, [props.frequencyValueSet]);
  useEffect(() => {
    setInstructionArray(
      props.instructionsValueSet && props.instructionsValueSet,
    );
  }, [props.instructionsValueSet]);
  useEffect(() => {
    setDrugFormValueSet(props.drugFormValueSet);
  }, [props.drugFormValueSet]);

  const handleAddNewService = value => {
    const obj = {
      resourceId: uuidv4(),
      medicationCodeableConcept: {
        codeableSystem:
          'http://dataquent.com/fhir/us/custom/ValueSet/india-drug-brand-master-vs',
        code: value['brand_Name']['raw'],
        text: `${selectedMedicineType.display}|${value['generic_Name']['raw']}`,
        display: value['brand_Name']['raw'],
      },
      newEntry: value.newEntry,
      newChange: true,
      dosageInstruction: [
        {
          text: null,
          duration: null,
          durationUnit: 'D',
          code: {
            codeableSystem: null,
            code: null,
            text: null,
            display: null,
          },
          when: [],
          doseQuantity: null,
          // [
          //     {
          //         "code": "qty",
          //         "unit": "qty",
          //         "value": null
          //     }
          // ]
        },
      ],
    };
    // arrayOfPrescribedMedicine.push(obj)
    setArrayOfPrescribedMedicine([...arrayOfPrescribedMedicine, obj]);
    setSelectedMedicine({
      brand_Name: {
        raw: '',
      },
      generic_Name: {
        raw: '',
      },
    });
    setSelectedMedicineType({ code: '', display: '' });
    user.setCheckPrescription(true);
  };

  const handleDeleteRow = index => {
    const filterArray = arrayOfPrescribedMedicine.filter(
      (obj, ind) => ind !== index,
    );
    const deleted = arrayOfPrescribedMedicine.find(
      (item, ind) => ind === index,
    );

    setArrayOfPrescribedMedicine([...filterArray]);
    setdeletedData([...deletedData, deleted]);

    user.setCheckPrescription(true);
  };
  useEffect(() => {
    user.setDelPrescriptionData(deletedData);
  }, [deletedData]);
  useEffect(() => {
    setArrayOfPrescribedMedicine(props.arrayOfPrescribedMedicine);
  }, [props.arrayOfPrescribedMedicine]);
  useEffect(() => {
    user.setPrescriptionData(arrayOfPrescribedMedicine);
  }, [arrayOfPrescribedMedicine]);

  const days = durationData.map(item => item.value);
  // console.log(days)
  // console.log("medicineArr", arrayOfPrescribedMedicine)
  return (
    <>
      <table className={classes.tableRoot}>
        <col style={{ width: '8%' }} />
        <col style={{ width: '26%' }} />
        <col style={{ width: '17%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        {/* <col style={{ width: "12%" }} /> */}
        <col style={{ width: '4%' }} />
        {/* <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} /> */}
        <tr>
          {column.map(item => (
            <th key={item.toString()}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </th>
          ))}
        </tr>

        {arrayOfPrescribedMedicine && arrayOfPrescribedMedicine.length > 0
          ? arrayOfPrescribedMedicine.map((item, index) => {
              const freqValue =
                item['dosageInstruction'] &&
                item['dosageInstruction'][0]['code']['display'];
              const durationUnitValue =
                durationData &&
                durationData.find(e => {
                  let val =
                    item['dosageInstruction'] &&
                    item['dosageInstruction'][0] &&
                    item['dosageInstruction'][0]['durationUnit'];
                  return e.key === val;
                });
              // console.log('DDD', durationUnitValue);
              return (
                <tr key={index.toString()}>
                  <td>
                    <Autocomplete
                      id="drugForm"
                      size="small"
                      disableClearable
                      value={
                        (item.medicationCodeableConcept &&
                          item.medicationCodeableConcept.text
                            .split('|')[0]
                            .trim()) || { code: '', display: '' }
                        // (drugFormValueSet &&
                        //   drugFormValueSet !== null &&
                        //   drugFormValueSet !== undefined &&
                        //   drugFormValueSet.find(
                        //     i => {
                        //       i.display === (item.medicationCodeableConcept && item.medicationCodeableConcept.text.split('|')[0].trim())
                        //     }
                        //   )) || { code: '', display: '' }
                      }
                      renderOption={option => {
                        return (
                          <Grid
                            container
                            style={{ fontSize: '1rem', color: '#373737' }}
                          >
                            <Grid item xs={12}>
                              <Typography variant="h4">
                                {option.display}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      }}
                      onChange={(e, value) => {
                        let arr = [...arrayOfPrescribedMedicine];
                        const composition = item.medicationCodeableConcept.text.split(
                          '|',
                        )[1];
                        // debugger;
                        arr[index] = {
                          ...arr[index],
                          medicationCodeableConcept: {
                            ...arr[index].medicationCodeableConcept,
                            text: `${value.display}|${composition}`,
                          },
                          newChange: true,
                        };
                        // arr[index]['medicationCodeableConcept'].text = `${value.display}|${composition}`;
                        setArrayOfPrescribedMedicine(arr);
                        user.setCheckPrescription(true);
                      }}
                      getOptionLabel={option => option.display || option}
                      options={(drugFormValueSet && drugFormValueSet) || []}
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textFieldForm}
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            width: 'auto',
                          }}
                          margin="dense"
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          // error={ false }
                          // helperText="Required"
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select',
                            className: classes.input2,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} style={{ alignSelf: 'center' }}>
                            <Typography
                              variant="h4"
                              style={{ fontWeight: 500, color: '#373737' }}
                            >
                              {item.medicationCodeableConcept &&
                              item.medicationCodeableConcept.display
                                ? item.medicationCodeableConcept.display ===
                                  'Unknown'
                                  ? item.medicationCodeableConcept.text.split(
                                      '|',
                                    )[1]
                                  : item.medicationCodeableConcept.display
                                : ''}
                            </Typography>
                          </Grid>
                          {/* <Grid item xs={3} style={{ alignSelf: "center", textAlign:"right" }}>
                                            <Typography variant="h6" style={{ fontWeight: 500, color: "#373737" }}>{`Taper Dose`}</Typography>
                                        </Grid> */}
                          <Grid item xs={12}>
                            <Typography
                              variant="h4"
                              style={{ color: '#373737' }}
                            >
                              Composition:{' '}
                              {item.medicationCodeableConcept &&
                              item.medicationCodeableConcept.text
                                ? item.medicationCodeableConcept.text.split(
                                    '|',
                                  )[1]
                                : ''}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </td>

                  <td>
                    <Autocomplete
                      id="frequency"
                      size="small"
                      disableClearable
                      freeSolo
                      value={freqValue}
                      renderOption={option => {
                        return (
                          <Grid
                            container
                            style={{ fontSize: '1rem', color: '#373737' }}
                          >
                            <Grid item xs={12}>
                              <Typography variant="h4">
                                {option.display}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      }}
                      onChange={(e, value) => {
                        var arr = [...arrayOfPrescribedMedicine];
                        // debugger;
                        arr[index] = {
                          ...arr[index],
                          newChange: true,
                          dosageInstruction: [
                            {
                              ...arr[index]['dosageInstruction'][0],
                              code: {
                                codeableSystem:
                                  'http://hl7.org/fhir/v3/GTSAbbreviation',
                                code:
                                  typeof value === 'string'
                                    ? value
                                    : value && value.inputValue
                                    ? value.inputValue
                                    : value.code,
                                text:
                                  typeof value === 'string'
                                    ? 'Other'
                                    : value && value.inputValue
                                    ? 'Other'
                                    : value.display,
                                display:
                                  typeof value === 'string'
                                    ? value
                                    : value && value.inputValue
                                    ? value.inputValue
                                    : value.display,
                              },
                            },
                          ],
                          newEntryDose:
                            typeof value === 'string'
                              ? true
                              : value && value.inputValue
                              ? true
                              : false,
                        };
                        // debugger;
                        setArrayOfPrescribedMedicine(arr);
                        user.setCheckPrescription(true);
                      }}
                      filterOptions={(optionsArray, params) => {
                        const filtered = filterArrayFreq(optionsArray, params);

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
                          return option.display;
                        }
                        return option.display;
                      }}
                      selectOnFocus
                      clearOnBlur
                      // blurOnSelect
                      handleHomeEndKeys
                      options={frequencyArray ? frequencyArray : []}
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textField2}
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            width: 'auto',
                          }}
                          margin="dense"
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          onBlur={e => {
                            if (e.target.value) {
                              var arr = [...arrayOfPrescribedMedicine];
                              arr[index] = {
                                ...arr[index],
                                dosageInstruction: [
                                  {
                                    ...arr[index]['dosageInstruction'][0],
                                    code: {
                                      codeableSystem:
                                        'http://hl7.org/fhir/v3/GTSAbbreviation',
                                      code: e.target.value,
                                      text: 'Other',
                                      display: e.target.value,
                                    },
                                  },
                                ],
                                newEntryDose: true,
                                newChange: true,
                              };

                              setArrayOfPrescribedMedicine(arr);
                              user.setCheckPrescription(true);
                            }
                          }}
                          // error={ false }
                          // helperText="Required"
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select',
                            className: classes.input2,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <Autocomplete
                      id="instruction"
                      size="small"
                      disableClearable
                      // freeSolo
                      value={
                        (item['dosageInstruction'] &&
                          item['dosageInstruction'][0]['when'] &&
                          item['dosageInstruction'][0]['when'][0]) || {
                          code: '',
                          display: '',
                        }
                      }
                      renderOption={option => {
                        return (
                          <Grid
                            container
                            style={{ fontSize: '1rem', color: '#373737' }}
                          >
                            <Grid item xs={12}>
                              <Typography variant="h4">
                                {option.display}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      }}
                      onChange={(e, value) => {
                        var arr = [...arrayOfPrescribedMedicine];
                        arr[index] = {
                          ...arr[index],
                          newChange: true,
                          dosageInstruction: [
                            {
                              ...arr[index]['dosageInstruction'][0],
                              when: [value.display],
                            },
                          ],
                        };
                        setArrayOfPrescribedMedicine(arr);
                        user.setCheckPrescription(true);
                      }}
                      getOptionLabel={option => option.display || option}
                      options={instructionArray ? instructionArray : []}
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textField2}
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            width: 'auto',
                          }}
                          margin="dense"
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          // error={ false }
                          // helperText="Required"
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select',
                            className: classes.input2,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <Grid container>
                      <Grid item xs={6} md={5}>
                        <Autocomplete
                          size="small"
                          disableClearable
                          value={
                            item &&
                            item['dosageInstruction'] &&
                            item['dosageInstruction'].length &&
                            item['dosageInstruction'].length > 0 &&
                            item['dosageInstruction'][0] &&
                            item['dosageInstruction'][0]['duration']
                          }
                          renderOption={option => {
                            return (
                              <Grid
                                container
                                style={{ fontSize: '1rem', color: '#373737' }}
                              >
                                <Grid item xs={12}>
                                  <Typography variant="h4">{option}</Typography>
                                </Grid>
                              </Grid>
                            );
                          }}
                          onChange={(e, value) => {
                            const arr = [...arrayOfPrescribedMedicine];
                            arr[index] = {
                              ...arr[index],
                              newChange: true,
                              dosageInstruction: [
                                {
                                  ...arr[index]['dosageInstruction'][0],
                                  duration: parseInt(value),
                                },
                              ],
                            };
                            setArrayOfPrescribedMedicine(arr);
                            user.setCheckPrescription(true);
                          }}
                          // inputValue={item['dosageInstruction'][0]['duration']}
                          // onInputChange={(e, value, reason) => {
                          //     if (value !== "" && reason !== "reset") {
                          //         const arr = [...arrayOfPrescribedMedicine]
                          //         arr[index]['dosageInstruction'][0]['duration'] = value
                          //         setArrayOfPrescribedMedicine(arr)
                          //     }
                          // }}
                          getOptionLabel={option => option.toString()}
                          options={[...Array(100).keys()].map(i =>
                            (i + 1).toString(),
                          )}
                          renderInput={params => (
                            <TextField
                              {...params}
                              className={classes.textField2}
                              style={{
                                marginTop: '0px',
                                marginBottom: '0px',
                                width: 'auto',
                              }}
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{ shrink: false }}
                              // error={ false }
                              // helperText="Required"
                              InputProps={{
                                ...params.InputProps,
                                placeholder: 'Select',
                                className: classes.input2,
                                classes: { notchedOutline: classes.noBorder },
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6} md={7} style={{ alignSelf: 'center' }}>
                        <Autocomplete
                          id="durationUnit"
                          size="small"
                          disableClearable
                          disabled={
                            (item['dosageInstruction'] &&
                              item['dosageInstruction'][0]['duration'] ===
                                '') ||
                            (item['dosageInstruction'] &&
                              item['dosageInstruction'][0]['duration'] ===
                                null) ||
                            (item['dosageInstruction'] &&
                              item['dosageInstruction'][0]['duration'] ===
                                undefined)
                          }
                          defaultValue={durationUnitValue}
                          renderOption={option => {
                            return (
                              <Grid container style={{ color: '#373737' }}>
                                <Grid item xs={12}>
                                  <Typography
                                    variant="h4"
                                    style={{
                                      fontSize: '0.8rem',
                                      fontWeight: 500,
                                      color: '#373737',
                                    }}
                                  >
                                    {option.value}
                                  </Typography>
                                </Grid>
                              </Grid>
                            );
                          }}
                          onChange={(e, value) => {
                            let arr = [...arrayOfPrescribedMedicine];
                            arr[index] = {
                              ...arr[index],
                              newChange: true,
                              dosageInstruction: [
                                {
                                  ...arr[index]['dosageInstruction'][0],
                                  durationUnit: value.key,
                                },
                              ],
                            };
                            // debugger
                            setArrayOfPrescribedMedicine(arr);
                            user.setCheckPrescription(true);
                          }}
                          getOptionLabel={option => option.value || ''}
                          options={(durationData && durationData) || []}
                          renderInput={params => (
                            <TextField
                              {...params}
                              className={classes.textField1}
                              style={{
                                marginTop: '0px',
                                marginBottom: '0px',
                                fontSize: '0.8rem',
                                width: 'auto',
                              }}
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{ shrink: false }}
                              // error={ false }
                              // helperText="Required"
                              InputProps={{
                                ...params.InputProps,
                                className: classes.input2,
                                classes: { notchedOutline: classes.noBorder },
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </td>
                  <td>
                    <TextField
                      multiline
                      maxRows={3}
                      className={classes.textField1}
                      fullWidth
                      variant="outlined"
                      style={{ paddingRight: 0 }}
                      defaultValue={
                        item &&
                        item['dosageInstruction'] &&
                        item['dosageInstruction'].length &&
                        item['dosageInstruction'].length > 0 &&
                        item['dosageInstruction'][0] &&
                        item['dosageInstruction'][0]['text']
                      }
                      size="small"
                      // onChange={e => {
                      //   var arr = [...arrayOfPrescribedMedicine];
                      //   arr[index] = {
                      //     ...arr[index],
                      //     newChange: true,
                      //     dosageInstruction: [
                      //       {
                      //         ...arr[index]['dosageInstruction'][0],
                      //         text: e.target.value,
                      //       },
                      //     ],
                      //   };
                      //   setArrayOfPrescribedMedicine(arr);
                      //   // debugger;
                      //   user.setCheckPrescription(true);
                      // }}
                      onBlur={e => {
                        var arr = [...arrayOfPrescribedMedicine];
                        arr[index] = {
                          ...arr[index],
                          newChange: true,
                          dosageInstruction: [
                            {
                              ...arr[index]['dosageInstruction'][0],
                              text: e.target.value,
                            },
                          ],
                        };
                        setArrayOfPrescribedMedicine(arr);
                        // debugger;
                        user.setCheckPrescription(true);
                      }}
                      InputProps={{
                        placeholder: 'Enter Value',
                        className: classes.input3,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  </td>
                  {/* <td> */}
                  {/* { item.medicineType === "tab" && item.? 
                            <Typography variant="h4" style={{ fontWeight: 500, color: "#373737" }}>{
                                `${item.}`
                            }</Typography>
                            :  */}
                  {/* <TextField
                                className={classes.textField1}
                                fullWidth
                                variant='outlined'
                                defaultValue={item && item['dosageInstruction'] && item['dosageInstruction'].length && item['dosageInstruction'].length>0 && item['dosageInstruction'][0] && item['dosageInstruction'][0]['doseQuantity'][0]['value']}
                                size="small"
                                onBlur={(e) => {
                                    const arr = [...arrayOfPrescribedMedicine]
                                    arr[index]['dosageInstruction'][0]['doseQuantity'][0]['value'] = e.target.value ? e.target.value:null
                                    setArrayOfPrescribedMedicine(arr)
                                }}
                                InputProps={{
                                    placeholder: "Enter Value",
                                    className: classes.input1,
                                    classes: { notchedOutline: classes.noBorder },
                                }} /> */}
                  {/* } */}
                  {/* </td> */}
                  <td>
                    <div
                      className={classes.options}
                      onClick={() => handleDeleteRow(index)}
                    >
                      <CloseIcon style={{ fontSize: '10px' }} />
                    </div>
                  </td>
                </tr>
              );
            })
          : ''}
        {/* {openAddNewRowInput ?  */}
        <tr>
          <td>
            <Autocomplete
              size="small"
              disableClearable
              debug
              value={selectedMedicineType}
              renderOption={option => {
                return (
                  <Grid
                    container
                    style={{ fontSize: '1rem', color: '#373737' }}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h4">{option.display}</Typography>
                    </Grid>
                  </Grid>
                );
              }}
              onChange={(e, value) => {
                setSelectedMedicineType(value);
                user.setCheckPrescription(true);
              }}
              getOptionLabel={option => option.display || ''}
              options={drugFormValueSet ? drugFormValueSet : []}
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField2}
                  style={{
                    marginTop: '0px',
                    marginBottom: '0px',
                    width: 'auto',
                  }}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  // error={ false }
                  // helperText="Required"
                  InputProps={{
                    ...params.InputProps,
                    placeholder: 'Select',
                    className: classes.input2,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                />
              )}
            />
          </td>
          <td colSpan={7}>
            <Autocomplete
              id="medicineArr"
              name="medicineArr"
              options={medicineArr && medicineArr.length > 0 ? medicineArr : []}
              value={selectedServiceInputValue}
              freeSolo
              fullWidth
              disableClearable
              style={{ width: '30%' }}
              // renderOption={(option) => {
              //     return <Grid container style={{ fontSize: "1rem" }}>
              //         <Grid item xs={12}>
              //             <Typography variant="h4">
              //                 {option.value}
              //             </Typography>
              //         </Grid>
              //     </Grid>
              // }}
              getOptionLabel={option => {
                // debugger
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option['brand_Name']['raw'];
                }
                return (
                  (option &&
                    (option['brand_Name']['raw'] ||
                      option['generic_Name']['raw'])) ||
                  ''
                );
              }}
              onChange={(e, value) => {
                if (typeof value === 'string')
                  handleAddNewService({
                    brand_Name: {
                      raw: value,
                    },
                    generic_Name: {
                      raw: value,
                    },
                    newEntry: true,
                  });
                else if (value && value.inputValue) {
                  // debugger;
                  handleAddNewService({
                    brand_Name: {
                      raw: value.inputValue,
                    },
                    generic_Name: {
                      raw: value.inputValue,
                    },
                    newEntry: true,
                  });
                } else handleAddNewService({ ...value, newEntry: false });
                setSelectedServiceInputValue({
                  brand_Name: {
                    raw: '',
                  },
                  generic_Name: {
                    raw: '',
                  },
                });
                user.setCheckPrescription(true);
              }}
              filterOptions={(optionsArray, params) => {
                // const filtered = filterArrayAuto(optionsArray, params);
                // debugger;
                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                  optionsArray.push({
                    inputValue: params.inputValue,
                    brand_Name: {
                      raw: `Add "${params.inputValue}"`,
                    },
                  });
                }

                return optionsArray;
              }}
              // inputValue={selectedServiceInputValue}
              // onInputChange={(e, value) => {
              //     setSelectedServiceInputValue(value)
              // }}
              // filterOptions={(x, s) => {

              //     const matchingValueArr = []

              //     x && x.length > 0 && x.forEach(ele => {
              //         if (ele['brand_Name']['raw'] && ele['brand_Name']['raw'].includes(s['inputValue'])) {
              //             return matchingValueArr.push(ele)
              //         }
              //     })
              //     return matchingValueArr
              // }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              className={classes.textField1}
              renderOption={option =>
                option && option.brand_Name && option.brand_Name.raw
              }
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  onChange={e => {
                    props.handleChangeInput(e.target.value);
                  }}
                  InputLabelProps={{ shrink: false }}
                  onBlur={e => {
                    // debugger;
                    if (e.target.value) {
                      if (typeof e.target.value === 'string') {
                        handleAddNewService({
                          brand_Name: {
                            raw: e.target.value,
                          },
                          generic_Name: {
                            raw: e.target.value,
                          },
                          newEntry: true,
                        });
                      } else {
                        handleAddNewService(e.target.value);
                      }
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    placeholder: 'Select Drug',
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <SearchIcon
                            style={{ color: '#d0d0d0', fontSize: '20px' }}
                          />
                        </InputAdornment>
                      </>
                    ),
                    className: classes.input1,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                />
              )}
            />
          </td>
        </tr>
        {/* : ""} */}
      </table>
    </>
  );
}

export default PrescriptionTable;
