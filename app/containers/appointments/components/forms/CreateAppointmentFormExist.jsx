import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  createAppointment,
  fetchAppointmentSlots,
  useAppointmentSlice,
} from '../../../../apis/appointmentsApis/appointmentSlice';
import { getPractitionerList } from '../../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../../components';
import { getFromLocalStorage } from '../../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
import ButtonComponent from '../../../layouts/formTemplate/Button';
import { backDateCheck } from './utils';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  labels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  photoBtn: {
    marginLeft: 20,
    background: '#ffffff',
    color: '#000000',
    '&:hover': {
      background: '#f4f4f4',
      opacity: 0.9,
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  bottomGrid: {
    backgroundColor: '#F2F5FA',
    padding: '1.2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  vip: {
    marginBottom: 0,
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.button.paginated.color,
    },
  },
  dobField: {
    // fontSize:"0.9rem",
    background: '#F4F4F4',
    '& .MuiFilledInput-inputMarginDense': {
      padding: '12px',
    },
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& ::-webkit-calendar-picker-indicator': {
      marginLeft: 0,
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
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
  mendotary: {
    color: '#FF5C5C',
    paddingLeft: 5,
  },

  apptType: {
    float: 'right',
    border: `1px solid ${theme.palette.button.paginated.color}`,
    padding: '0.2rem',
    '& .Mui-selected': {
      backgroundColor: theme.palette.button.paginated.color,
      color: '#ffffff',
      '&:hover': {
        background: '#fc0982',
      },
    },
    '& .MuiToggleButton-root': {
      '&:hover': {
        background: '#dedcdd',
      },
    },
  },
}));
const ToggleButtonGroupStyle = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);
function CreateAppointmentFormExist(props) {
  //-------------- using thunk ----------------
  useAppointmentSlice();
  //-------------- using thunk ----------------
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [checkVal, setCheckVal] = useState(false);
  const [practitionerArr, setPractitionerArr] = useState([]);
  const [patientData, setPatientData] = useState({ ...props.patientData });
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const [appointmentSlotsArr, setAppointmentSlotsArr] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(
    history.location.state &&
      history.location.state.path &&
      docData &&
      docData.userDetails &&
      docData.userDetails.userRole === 'Doctor'
      ? appointmentSlotsArr && appointmentSlotsArr[0]
      : null,
  );
  const [appointmentDateState, setAppointmentDateState] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [patientComment, setPatientComment] = useState('');
  const [instructions, setInstructions] = useState({
    eatHealthyFood: false,
    restBody: false,
  });
  const [slotValueLoading, setSlotValueLoading] = useState(false);
  const [alignment, setAlignment] = useState('walkIn');
  const docData = getFromLocalStorage('data');
  const [isLoading, setIsLoading] = useState(false);
  const backDated = getFromLocalStorage('BDA');
  const isBackDatedAllowed = backDated === 'true';

  const INITIAL_FORM_STATE = {
    practitioner: selectedPractitioner,
    appointmentDate: appointmentDateState,
    appointmentTimeSlot: selectedSlot,
    comment: patientComment,
    instructions: instructions,
    vip: checkVal,
    typeOfAppointment: alignment,
  };
  const checkBoxArr = [
    { name: 'eatHealthyFood', label: 'Eat Healthy Food', color: '#FF3399' },
    { name: 'restBody', label: 'Take Rest', color: '#FF3399' },
  ];

  const FORM_VALIDATION = Yup.object().shape(
    backDateCheck({ appointmentDate: appointmentDateState }, isBackDatedAllowed)
      ? {
          practitioner: Yup.object().typeError('Required'),
          appointmentDate: Yup.string().required('Required'),
          appointmentTimeSlot: Yup.object(),
          comment: Yup.string(),
        }
      : {
          practitioner: Yup.object().typeError('Required'),
          appointmentDate: Yup.string().required('Required'),
          appointmentTimeSlot: Yup.object().required('Required'),
          comment: Yup.string(),
        },
  );
  useEffect(() => {
    setPatientData(props.patientData);
  }, [props.patientData]);
  useEffect(() => {
    setAppointmentSlotsArr([]);
    if (
      backDateCheck(
        { appointmentDate: appointmentDateState },
        isBackDatedAllowed,
      )
    ) {
      setSelectedSlot('');
      setAppointmentSlotsArr([]);
    } else if (
      selectedPractitioner !== null &&
      selectedPractitioner !== undefined &&
      Object.keys(selectedPractitioner).length !== 0 &&
      appointmentDateState !== ''
    ) {
      const practitionerID = selectedPractitioner.practitioner.resourceId;
      const fromDate = appointmentDateState;
      const toDate = appointmentDateState;
      callAppointmentSlots(practitionerID, fromDate, toDate);
    }
  }, [selectedPractitioner, appointmentDateState]);
  const callAppointmentSlots = async (practitionerID, fDate, tDate) => {
    const fromDate =
      fDate === moment().format('YYYY-MM-DD')
        ? `${fDate}T${moment().format('HH:mm')}`
        : `${fDate}T00:00`;
    const toDate = `${tDate}T23:59`;
    setSlotValueLoading(true);
    const { payload } = await props.fetchAppointmentSlots({
      practitionerID,
      fromDate,
      toDate,
    });
    setSlotValueLoading(false);
    // console.log(payload);
    if (
      payload.data === null ||
      (payload.data && payload.data.scheduleSlots === null)
    ) {
      setAppointmentSlotsArr([]);
    } else {
      setAppointmentSlotsArr(payload.data.scheduleSlots);
      history.location.state &&
      history.location.state.path &&
      docData &&
      docData.userDetails &&
      docData.userDetails.userRole === 'Doctor'
        ? setSelectedSlot(
            payload.data.scheduleSlots && payload.data.scheduleSlots[0],
          )
        : setSelectedSlot();
    }
  };
  useEffect(() => {
    getPractitionerList('');
  }, []);
  const getPractitionerList = async inputData => {
    const { payload } = await props.getPractitionerList(inputData);
    if (payload.data) {
      setPractitionerArr(payload.data.cancerPractitioner);
    }
  };
  const getPractitionerDataFromAPI = e => {
    let inputValue = e.target.value;
    new Promise((resolve, reject) => {
      props.fetchPractitionerList(inputValue, resolve, reject);
    })
      .then(() => {})
      .catch(error => {
        console.log(error);
        // const m = props && props.practitionerListFromSearchError ? props.patientListFromSearchError : 'Failed';
      });
  };

  const handleAppointmentDate = e => {
    setAppointmentDateState(e.target.value);
  };
  const handleCheckboxChange = (e, isChecked, value) => {
    setCheckVal(isChecked);
  };
  const handleComment = e => {
    setPatientComment(e.target.value);
  };
  const handleInstructions = (e, isChecked, value) => {
    setInstructions({ ...instructions, [e.target.name]: isChecked });
  };
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onSave = (values, { resetForm }) => {
    const patientDetails = {
      display: patientData.display,
      fhirResourceId: patientData.fhirResourceId,
      first: patientData.firstName,
      last: patientData.lastName,
      role: 'Patient',
    };
    const obj = {
      patientData: patientDetails,
      practitioner: values.practitioner,
      appointmentDate: values.appointmentDate,
      appointmentTimeSlot: backDateCheck(values, isBackDatedAllowed)
        ? null
        : values.appointmentTimeSlot,
      comment: values.comment,
      instructions: values.instructions,
      vip: values.vip,
      typeOfAppointment: values.typeOfAppointment,
    };
    setIsLoading(true);
    callCreateAppointmentAPI(obj);
  };
  const callCreateAppointmentAPI = async obj => {
    const { payload } = await props.createAppointment(obj);
    setIsLoading(false);
    if (Object.keys(payload.data && payload.data.appointment).length !== 0) {
      if (
        backDateCheck(
          { appointmentDate: appointmentDateState },
          isBackDatedAllowed,
        )
      ) {
        props.snackbarShowMessage(payload.data.message, 'success');

        setTimeout(function() {
          history.push({
            pathname: ROUTES_CONSTANTS.EPISODE_OF_CARE,
            state: {
              detaildata: payload.data && payload.data.appointment,
            },
          });
        }, 2000);
      } else {
        if (
          selectedSlot.slot.start === 'instant' &&
          docData &&
          docData.userDetails &&
          docData.userDetails.userRole === 'Doctor'
        ) {
          props.snackbarShowMessage(payload.data.message, 'success');

          setTimeout(function() {
            history.push({
              pathname: ROUTES_CONSTANTS.EPISODE_OF_CARE,
              state: {
                detaildata: payload.data && payload.data.appointment,
              },
            });
          }, 2000);
        } else {
          props.snackbarShowMessage(payload.data.message, 'success');

          setTimeout(function() {
            history.push(ROUTES_CONSTANTS.ALL_APPOINTMENTS);
          }, 2000);
        }
      }
    } else {
      history.push(ROUTES_CONSTANTS.ALL_APPOINTMENTS);
    }
  };

  useEffect(() => {
    if (
      history.location.state &&
      history.location.state.path &&
      docData &&
      docData.userDetails &&
      docData.userDetails.userRole === 'Doctor'
    ) {
      let prac =
        practitionerArr &&
        Array.isArray(practitionerArr) &&
        practitionerArr.length > 0 &&
        practitionerArr.find(
          item =>
            item.practitioner.resourceId === docData.userDetails.fhirResourceId,
        );
      if (prac) {
        setSelectedPractitioner(prac);
        setAppointmentDateState(moment().format('YYYY-MM-DD'));
      }
    }
  }, [practitionerArr]);
  // console.log("exist props", props)
  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        enableReinitialize={true}
        validationSchema={FORM_VALIDATION}
        onSubmit={onSave}
      >
        {({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleReset,
        }) => (
          <Form style={{ padding: '2rem' }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} className={classes.labels}>
                    Doctor<span className={classes.mendotary}>{' *'}</span>
                  </Grid>
                  <Grid item xs={8}>
                    <Autocomplete
                      id="practitioner"
                      name="practitioner"
                      options={practitionerArr ? practitionerArr : []}
                      size="small"
                      value={selectedPractitioner}
                      disabled={
                        history.location &&
                        history.location.state &&
                        history.location.state.path &&
                        docData &&
                        docData.userDetails &&
                        docData.userDetails.userRole === 'Doctor'
                      }
                      onChange={(event, newValue) => {
                        setSelectedPractitioner(newValue);
                      }}
                      getOptionLabel={option =>
                        option &&
                        option.practitioner &&
                        option.practitioner.display &&
                        option.practitioner.display.split('/')[0]
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textField}
                          margin="dense"
                          variant="outlined"
                          labelWidth={0}
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select Doctor',
                            className: classes.input1,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                          onChange={e =>
                            getPractitionerDataFromAPI(e.target.value)
                          }
                          helperText={
                            touched.practitioner && errors.practitioner
                          }
                          error={Boolean(
                            touched.practitioner && errors.practitioner,
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} className={classes.labels}>
                    {mdDown ? (
                      <div>
                        Appointment{' '}
                        <span style={{ display: 'block' }}>
                          {' '}
                          Date &amp; Time
                          <span className={classes.mendotary}>{' *'}</span>
                        </span>
                      </div>
                    ) : (
                      <>
                        <div>
                          Appointment Date &amp; Time
                          <span className={classes.mendotary}>{' *'}</span>
                        </div>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="appointmentDate"
                      name="appointmentDate"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={appointmentDateState}
                      onChange={e => handleAppointmentDate(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        type: 'date',
                        placeholder: 'dd-mm-yyyy',
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                      inputProps={{
                        min: !isBackDatedAllowed
                          ? moment(new Date()).format('YYYY-MM-DD')
                          : '',
                      }}
                      helperText={
                        touched.appointmentDate && errors.appointmentDate
                      }
                      error={Boolean(
                        touched.appointmentDate && errors.appointmentDate,
                      )}
                    />
                    {/* } */}
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      id="appointmentTimeSlot"
                      name="appointmentTimeSlot"
                      loading={slotValueLoading}
                      options={appointmentSlotsArr}
                      disabled={
                        backDateCheck(values, isBackDatedAllowed) ||
                        !values.practitioner
                      }
                      size="small"
                      value={
                        history.location.state &&
                        history.location.state.path &&
                        docData.userRole === 'Doctor'
                          ? appointmentSlotsArr[0]
                          : selectedSlot
                      }
                      renderOption={option => {
                        return (
                          <Typography style={{ fontSize: '0.8rem' }}>
                            {option == ''
                              ? 'Instant'
                              : option &&
                                option.slot &&
                                option.slot.start == 'instant'
                              ? 'Instant'
                              : option &&
                                option.slot &&
                                option.slot.start.split('+')[1] === '05:30'
                              ? `${moment
                                  .utc(option.slot.start)
                                  .local()
                                  .format('hh:mm A')} - ${moment
                                  .utc(option.slot.end)
                                  .local()
                                  .format('hh:mm A')}`
                              : `${moment
                                  .utc(option.slot.start)
                                  .format('hh:mm A')} - ${moment
                                  .utc(option.slot.end)
                                  .format('hh:mm A')}`}
                          </Typography>
                        );
                      }}
                      onChange={(event, newValue) => {
                        // console.log(newValue);
                        setSelectedSlot(newValue);
                      }}
                      getOptionLabel={option => {
                        // debugger
                        return option == ''
                          ? 'Instant'
                          : option &&
                            option.slot &&
                            option.slot.start == 'instant'
                          ? 'Instant'
                          : option &&
                            option.slot &&
                            option.slot.start.split('+')[1] === '05:30'
                          ? `${moment
                              .utc(option.slot.start)
                              .local()
                              .format('hh:mm A')} - ${moment
                              .utc(option.slot.end)
                              .local()
                              .format('hh:mm A')}`
                          : `${moment
                              .utc(option.slot.start)
                              .format('hh:mm A')} - ${moment
                              .utc(option.slot.end)
                              .format('hh:mm A')}`;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          className={classes.textField}
                          margin="dense"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            placeholder: 'Select Slot',
                            className: classes.input1,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                          helperText={
                            touched.appointmentTimeSlot &&
                            errors.appointmentTimeSlot
                          }
                          error={Boolean(
                            touched.appointmentTimeSlot &&
                              errors.appointmentTimeSlot,
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} className={classes.labels}>
                    Comment
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="comment"
                      name="comment"
                      placeholder="Patient Comment"
                      value={values.comment}
                      onChange={handleComment}
                      multiline
                      fullWidth
                      variant="outlined"
                      size="small"
                      rows={4}
                      className={classes.textField}
                      InputProps={{
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                      helperText={touched.comment && errors.comment}
                      error={Boolean(touched.comment && errors.comment)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} className={classes.labels}>
                    Patient Instructions
                  </Grid>
                  <Grid item xs={8}>
                    <FormGroup row>
                      {checkBoxArr.map(item => (
                        <FormControlLabel
                          className={classes.vip}
                          control={
                            <Checkbox
                              name={item.name}
                              onChange={handleInstructions}
                            />
                          }
                          label={
                            <Typography
                              variant="h4"
                              style={{
                                fontSize: '1rem',
                                fontWeight: 400,
                                color: '#727272',
                              }}
                            >
                              {item.label}
                            </Typography>
                          }
                        />
                      ))}
                    </FormGroup>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} className={classes.labels}>
                    <FormControlLabel
                      className={classes.vip}
                      control={
                        <Checkbox
                          onChange={handleCheckboxChange}
                          name="checkedA"
                        />
                      }
                      label={
                        <Typography
                          variant="h4"
                          style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: '#727272',
                          }}
                        >
                          {'VIP Patient'}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={6}>
                    <ToggleButtonGroupStyle
                      name="typeOfAppointment"
                      value={alignment}
                      exclusive
                      size="small"
                      onChange={handleAlignment}
                      aria-label="typeOfAppointment"
                      className={classes.apptType}
                    >
                      <ToggleButton value="walkIn" aria-label="walkIn">
                        Walk-In
                      </ToggleButton>
                      <ToggleButton value="videoCall" aria-label="videoCall">
                        Video-Call
                      </ToggleButton>
                    </ToggleButtonGroupStyle>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} className={classes.bottomGrid}>
                {props.disableAppointmentFormExist ? (
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    disabled
                    style={{ padding: '0px 45px' }}
                  >
                    Submit
                  </ButtonComponent>
                ) : (
                  <div className={classes.wrapper}>
                    <ButtonComponent
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                      style={{ padding: '0px 45px' }}
                    >
                      Submit
                    </ButtonComponent>
                    {isLoading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = state => state;
export function mapDispatchToProps(dispatch) {
  return {
    createAppointment: fieldValues => dispatch(createAppointment(fieldValues)),
    fetchAppointmentSlots: (practitionerID, fromDate, toDate) =>
      dispatch(fetchAppointmentSlots(practitionerID, fromDate, toDate)),
    getPractitionerList: payload => dispatch(getPractitionerList(payload)),
    dispatch,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withRouter,
  MessageComponent,
)(CreateAppointmentFormExist);
