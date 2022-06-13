import {
  Grid,
  InputAdornment,
  Paper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getPatientDetails } from '../../../../apis/appointmentsApis/appointmentSlice';
import { getPatientList } from '../../../../apis/globalApis/globalSlice';
import {
  WhiteCloseIconButton,
  WhiteButton,
  MessageComponent,
  PageTitleText,
} from '../../../../components';
import { useDebouncing } from '../../../../hooks/useDebouncing';
import AddPatientImage from '../../../../images/AddPatientImage.svg';
import IconSearch from '../../../../images/assets/Search icon.svg';
import { getFromLocalStorage } from '../../../../utils/localStorageUtils';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
import AddPatientForm from './AddPatientForm';
import CreateAppointmentForm from './CreateAppointmentForm';
import CreateAppointmentFormExist from './CreateAppointmentFormExist';
import CreateAppointmentFormFromEdit from './CreateAppointmentFormFromEdit';
import EditAppointmentForm from './EditAppointmentForm';
import EditPatientForm from './EditPatientForm';
import ExistingPatientData from './ExistingPatientData';
import ExistingPatientDataAfterAdd from './ExistingPatientDataAfterAdd';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    border: '0.5px solid #707070',
    borderRadius: '5px',

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    padding: '0px !important',
    height: '35px',
    marginTop: 7,
  },
  searchIcon: {
    padding: theme.spacing(1, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00000029',
  },
  inputRoot: {
    color: 'default',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
    ['@media (min-width:960px) and (max-width:1040px)']: {
      width: '20ch !important',
    },
  },
  mainPaper: {
    padding: '0rem 4rem',
    margin: 'auto',
    boxShadow: '0px 2px 4px #00000029',
    [theme.breakpoints.down('md')]: {
      padding: '0rem 2rem',
    },
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(5),
    boxShadow: '0px 0px 20px #00000033',
  },
  paperTop: {
    padding: '0rem 4rem',
    margin: 'auto',
    marginBottom: -7,
    boxShadow: '0px 2px 4px #00000029',
    [theme.breakpoints.down('md')]: {
      padding: '0rem 2rem',
    },
  },
  paperTopItem: {
    margin: theme.spacing(5),
  },
  textField1: {
    '& .MuiOutlinedInput-input': {
      fontSize: '1rem',
      fontWeight: 500,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 500,
    },
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },

  input1: {
    background: '#ffffff',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#ffffff !important',
    },
    '&:active': {
      background: '#ffffff !important',
    },
    '&:hover': {
      background: '#ffffff !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  textImg: {
    fontSize: '1.5rem',
    color: '#373737',
  },
}));
const AppointmentForm = props => {
  const { patientListData } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [selectedPatientData, setSelectedPatientData] = useState({});
  const [openEditPatientForm, setOpenEditPatientForm] = useState(false);
  const [detailsForEditAppointment, setDetailsForEditAppointment] = useState(
    null,
  );
  const [
    patientDetailsForEditAppointment,
    setPatientDetailsForEditAppointment,
  ] = useState();
  const [editableData, setEditableData] = useState({});
  const [patientIDV, setPatientIDV] = useState('');
  const [disableAppointmentForm, setDisableAppointmentForm] = useState(true);
  const [
    disableAppointmentFormExist,
    setDisableAppointmentFormExist,
  ] = useState(false);

  const [openExisitingPatientData, setOpenExisitingPatientData] = useState(
    false,
  );
  const [instant, setInstant] = useState(false);
  const [instantWithoutPatient, setInstantWithoutPatient] = useState(false);
  const [editedDataForAppointment, setEditedDataForAppointment] = useState({});
  const [appointmentAction, setAppointmentAction] = useState('');
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [buttonName, setButtonName] = useState('Submit');
  const handleOpenAddPatient = () => {
    setOpenAddPatient(true);
    setOpenEditPatient(false);
    setOpenCard(false);
    setDisableAppointmentForm(true);
    setSelectedPatient();
    setButtonName('Submit');
  };
  useEffect(() => {
    if (location.state && location.state.detailsForEditAppointment) {
      setSelectedPatientData(
        location.state && location.state.detailsForEditAppointment
          ? location.state.detailsForEditAppointment
          : {},
      );
      setDetailsForEditAppointment(
        location.state && location.state.detailsForEditAppointment
          ? location.state.detailsForEditAppointment
          : null,
      );
      setOpenEditPatientForm();
      const patientResourceId =
        location.state &&
        location.state.detailsForEditAppointment &&
        location.state.detailsForEditAppointment.detaildata &&
        location.state.detailsForEditAppointment.detaildata.cancerPatient
          ? location.state.detailsForEditAppointment.detaildata.cancerPatient
              .resourceId
          : location.state &&
            location.state.detailsForEditAppointment &&
            location.state.detailsForEditAppointment.detaildata &&
            location.state.detailsForEditAppointment.patientID;

      patientResourceId && callGetPatientDetailsApi(patientResourceId);
    }
  }, [location && location.state]);

  useEffect(() => {
    if (
      detailsForEditAppointment &&
      detailsForEditAppointment.appointmentResourceId &&
      detailsForEditAppointment.patientDetails
    ) {
      if (detailsForEditAppointment.patientDetails) {
        handleEditSelection({
          ...detailsForEditAppointment,
          patientDetails:
            patientDetailsForEditAppointment &&
            patientDetailsForEditAppointment,
        });
        setButtonName('Edit');
      } else {
        handleEditSelection({
          patientDetails: patientDetailsForEditAppointment,
          appointmentResourceId:
            detailsForEditAppointment.appointmentResourceId,
          appointmentStatus: detailsForEditAppointment.appointmentStatus,
        });
      }
    }
  }, [patientDetailsForEditAppointment]);

  useEffect(() => {
    if (
      location.state &&
      location.state.path &&
      location.state.path === ROUTES_CONSTANTS.PATIENT_EVERYTHING
    ) {
      if (
        patientDetailsForEditAppointment &&
        patientDetailsForEditAppointment.patient
      ) {
        handleSelection(patientDetailsForEditAppointment);
      }
    }
  }, [patientDetailsForEditAppointment]);

  const handlePatientData = response => {
    setPatientData(response);
  };

  const handleEditSelection = newValue => {
    setSelectedPatient(newValue.patientDetails);
    setSelectedPatientData({
      firstName: newValue.patientDetails.patient.first,
      lastName: newValue.patientDetails.patient.last,
      phone: newValue.patientDetails.patient.phone,
      city: newValue.patientDetails.patient.city,
      gender: newValue.patientDetails.patient.gender,
      image: '',
      contentType: '',
      dateOfBirth: newValue.patientDetails.patient.birthDate,
      fhirResourceId: newValue.patientDetails.patient.resourceId,
      display: newValue.patientDetails.patient.display,
      age: newValue.patientDetails.patient.age,
    });
  };
  const handleSelection = newValue => {
    setSelectedPatient(newValue);
    setSelectedPatientData({
      firstName: newValue.patient.first,
      lastName: newValue.patient.last,
      phone: newValue.patient.phone,
      city: newValue.patient.city,
      gender: newValue.patient.gender,
      image: newValue.patient.image,
      contentType: newValue.patient.contentType,
      dateOfBirth: newValue.patient.birthDate,
      age: newValue.patient.age,
      fhirResourceId: newValue.patient.resourceId,
      display: newValue.patient.display,
    });
    setOpenExisitingPatientData(true);
    setOpenEditPatient(false);
    setButtonName('Submit');
  };

  const handleEditPatientData = data => {
    setEditableData(data);
    setAppointmentAction(
      detailsForEditAppointment &&
        detailsForEditAppointment.appointmentResourceId
        ? 'update'
        : 'create',
    );
    setOpenEditPatientForm(true);
    setOpenExisitingPatientData(false);
    setDisableAppointmentFormExist(true);
  };
  const handleEditPatientDataAfterAdding = data => {
    setSelectedPatient({
      patient: {
        address: data.city,
        birthDate: data.dateOfBirth,
        city: data.city,
        display: data.display,
        email: data.email,
        first: data.firstName,
        gender: data.gender,
        last: data.lastName,
        middle: data.middle,
        phone: data.phone,
        resourceId: data.fhirResourceId,
        state: null,
      },
    });
    setSelectedPatientData({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      gender: data.gender,
      image: '',
      contentType: '',
      dateOfBirth: data.dateOfBirth,
      fhirResourceId: data.fhirResourceId,
      display: data.display,
    });
    setEditableData({
      ...data,
      id: data.fhirResourceId,
      nQPatientId: data.nQPatientId,
    });
    setOpenEditPatientForm(true);
    setOpenExisitingPatientData(false);
    setDisableAppointmentFormExist(true);
  };
  const handleOpenExistingPatientForm = field => {
    setSelectedPatientData({
      firstName: field.firstName,
      lastName: field.lastName,
      phone: field.phone,
      city: field.city,
      gender: field.gender,
      image: field.image,
      contentType: field.contentType,
      dateOfBirth: field.dateOfBirth,
      nQPatientId: field.nQPatientId,
      age: field.dob,
    });
    setSelectedPatient({
      patient: {
        address: field.city,
        age: field.dob,
        birthDate: field.dateOfBirth,
        city: field.city,
        contentType: field.contentType,
        display: `${field.firstName && `${field.firstName}`}${field.lastName &&
          ` ${field.lastName}`}/${field.gender &&
          `${field.gender}/`}${field.phone && `${field.phone}/`}${field.dob &&
          `${field.dob}/`}${field.city && `${field.city}`}`,
        email: null,
        first: field.firstName,
        gender: field.gender,
        image: field.image,
        last: field.lastName,
        middle: null,
        nQPatientId: field.nQPatientId,
        phone: field.phone,
        resourceId: field.id,
        state: null,
      },
    });
    setOpenExisitingPatientData(true);
    setDisableAppointmentFormExist(false);
    getPatientlistApi('');
  };
  // useEffect(() => {
  //   setPatientIDV(props.patientIDValue);
  // }, [props.patientIDValue]);
  // useEffect(() => {
  //   setPatientData(props.patientDataSaved);
  // }, [props.patientDataSaved, handlePatientData]);
  const handleClose = () => {
    history.goBack();
  };

  useEffect(() => {
    if (location.state && location.state.path) {
      setInstant(true);
      if (location.state.path === ROUTES_CONSTANTS.PATIENT_EVERYTHING) {
        setInstantWithoutPatient(false);
        let id = getFromLocalStorage('resourceId');
        callGetPatientDetailsApi(id);
      } else {
        handleOpenAddPatient();
      }
    }
  }, []);
  useEffect(() => {
    // _.isEmpty(patientListData) &&
    getPatientlistApi('');
  }, []);
  const getPatientlistApi = async inputData => {
    const { payload } = await props.getPatientList({ patientName: inputData });
    if (payload.data) {
      setPatientList(payload.data.cancerPatients);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  //using debouncing
  const onDebounceLoadData = useDebouncing(getPatientlistApi);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };
  const callGetPatientDetailsApi = async id => {
    const { payload } = await props.getPatientDetails(id);
    if (payload.data) {
      setPatientDetailsForEditAppointment(payload.data);
    } else if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    } else {
      props.snackbarShowMessage(payload, 'error');
    }
  };
  const LeftComponent = props.leftComponent;
  const pageTitle = props.pageTitle;

  const handleEditPatientDataFromPayload = response => {
    setEditedDataForAppointment(response);
  };

  // console.log("patientData", selectedPatientData)
  return (
    <>
      <Grid container spacing={2}>
        {/* Top header */}
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <PageTitleText>
                {pageTitle ? pageTitle : 'Create Appointment'}
              </PageTitleText>
            </Grid>
            <Grid item>
              <WhiteCloseIconButton onClick={handleClose} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paperTop} elevation={0}>
                <Grid container>
                  <Grid item xs={6}>
                    <Paper className={classes.paperTopItem} elevation={0}>
                      <Autocomplete
                        id="patientSearch"
                        options={patientList || []}
                        size="small"
                        disableClearable
                        value={selectedPatient}
                        renderOption={option => {
                          const optionValue =
                            option && option.patient && option.patient;
                          const nameValue = optionValue.display.split('/')[0];
                          const age = optionValue.display.split('/')[3];
                          const gender =
                            optionValue.display.split('/')[1] === 'Male'
                              ? 'M'
                              : optionValue.display.split('/')[1] === 'Female'
                              ? 'F'
                              : 'O';
                          const mobile = optionValue.display.split('/')[2];
                          const nQPatientId = optionValue.nQPatientId;
                          return (
                            <Grid
                              container
                              style={{
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: '#373737',
                              }}
                            >
                              <Grid item xs={9}>
                                {nameValue} - {age}/{gender} &nbsp;
                                &nbsp;(+91&nbsp; {mobile})
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                style={{ textAlign: 'right', color: '#B4B4B4' }}
                              >
                                {nQPatientId}
                              </Grid>
                            </Grid>
                          );
                        }}
                        onChange={(event, newValue) => {
                          handleSelection(newValue);
                        }}
                        getOptionLabel={option =>
                          (option &&
                            option.patient &&
                            option.patient.display &&
                            option.patient.display.split('/')[0]) ||
                          ''
                        }
                        className={classes.textField1}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="outlined"
                            onChange={e => onHandleChange(e.target.value)}
                            InputLabelProps={{ shrink: false }}
                            InputProps={{
                              ...params.InputProps,
                              // type: "search",
                              placeholder: 'Search Patient',
                              startAdornment: (
                                <>
                                  <InputAdornment
                                    position="start"
                                    style={{ marginRight: 16 }}
                                  >
                                    <img
                                      src={IconSearch}
                                      height="16px"
                                      width="16px"
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
                    </Paper>
                  </Grid>

                  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <Paper className={classes.paperTopItem} elevation={0}>
                      <Typography variant="h3" style={{ fontWeight: 500 }}>
                        OR
                      </Typography>{' '}
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paperTopItem} elevation={0}>
                      <WhiteButton
                        variant="contained"
                        size="medium"
                        onClick={() => handleOpenAddPatient()}
                      >
                        + Add New Patient
                      </WhiteButton>{' '}
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/*  Main container*/}
        {selectedPatient !== null &&
        selectedPatient !== undefined &&
        Object.keys(selectedPatient).length !== 0 ? (
          <Grid item xs={12}>
            <Paper className={classes.mainPaper} elevation={0}>
              <Grid container>
                {!openEditPatientForm ? (
                  <>
                    <Grid item xs={6}>
                      <Paper className={classes.paper} elevation={0}>
                        <ExistingPatientData
                          patientData={selectedPatientData}
                          patientID={selectedPatient.patient.resourceId}
                          patientNQId={selectedPatient.patient.nQPatientId}
                          handleEditPatientData={handleEditPatientData}
                        />
                      </Paper>
                    </Grid>
                    {/* left container */}
                    <Grid item xs={6}>
                      {/* NOTE : render component from props or default  CreateAppointmentForm */}
                      {LeftComponent ? (
                        <LeftComponent
                          closeAppointment={() => handleClose()}
                          patientID={selectedPatient.patient.resourceId}
                        />
                      ) : !(
                          detailsForEditAppointment &&
                          detailsForEditAppointment.appointmentResourceId
                        ) ? (
                        <CreateAppointmentFormExist
                          patientData={selectedPatientData}
                          patientID={selectedPatient}
                          disableAppointmentFormExist={
                            disableAppointmentFormExist
                          }
                          closeAppointment={() => handleClose()}
                        />
                      ) : (
                        <EditAppointmentForm
                          patientData={selectedPatientData}
                          patientID={selectedPatient.patient.resourceId}
                          detailsData={detailsForEditAppointment}
                          buttonName={buttonName}
                          closeAppointment={() => handleClose()}
                        />
                      )}
                    </Grid>
                  </>
                ) : (
                  <>
                    {/* right container */}
                    <Grid item xs={6}>
                      <Paper className={classes.paper} elevation={0}>
                        {/* PatientData  */}
                        {!openExisitingPatientData ? (
                          <EditPatientForm
                            patientData={editableData}
                            disableAppointmentForm={() =>
                              setDisableAppointmentForm(false)
                            }
                            handleOpenExistingPatientForm={
                              handleOpenExistingPatientForm
                            }
                            handleEditPatientDataFromPayload={
                              handleEditPatientDataFromPayload
                            }
                          />
                        ) : (
                          <ExistingPatientData
                            patientData={selectedPatientData}
                            patientID={selectedPatient.patient.resourceId}
                            patientNQId={selectedPatient.patient.nQPatientId}
                            handleEditPatientData={handleEditPatientData}
                          />
                        )}
                      </Paper>
                    </Grid>
                    {/* left container  */}
                    <Grid item xs={6}>
                      {/* NOTE : render component from props or default  CreateAppointmentForm */}
                      {LeftComponent ? (
                        <LeftComponent disable={!openExisitingPatientData} />
                      ) : (
                        <CreateAppointmentFormFromEdit
                          patientData={editedDataForAppointment}
                          patientID={selectedPatient.patient.resourceId}
                          patientNQId={selectedPatient.patient.nQPatientId}
                          disableAppointmentFormExist={
                            disableAppointmentFormExist
                          }
                          closeAppointment={() => handleClose()}
                          actionType={appointmentAction}
                          detailsForEditAppointment={
                            detailsForEditAppointment &&
                            detailsForEditAppointment
                          }
                        />
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Paper className={classes.mainPaper} elevation={0}>
              <Grid container>
                {openAddPatient && !openEditPatient ? (
                  <>
                    <Grid item xs={6}>
                      {/* Right container*/}
                      <Paper className={classes.paper} elevation={0}>
                        {!openCard ? (
                          <AddPatientForm
                            disableAppointmentForm={() =>
                              setDisableAppointmentForm(false)
                            }
                            openCard={() => setOpenCard(true)}
                            handlePatientData={handlePatientData}
                          />
                        ) : (
                          <ExistingPatientDataAfterAdd
                            patientData={patientData}
                            patientID={patientIDV}
                            handleEditPatientData={
                              handleEditPatientDataAfterAdding
                            }
                          />
                        )}
                      </Paper>
                    </Grid>
                    {/* Left container */}
                    <Grid item xs={6}>
                      {/* NOTE : render component from props or default  CreateAppointmentForm */}
                      {LeftComponent ? (
                        <LeftComponent
                          disable={disableAppointmentForm}
                          patientID={patientIDV}
                        />
                      ) : (
                        <CreateAppointmentForm
                          disableAppointmentForm={disableAppointmentForm}
                          patientData={patientData}
                          closeAppointment={() => handleClose()}
                        />
                      )}
                    </Grid>
                  </>
                ) : !openAddPatient && openEditPatient ? (
                  <>
                    {/* Right container*/}
                    <Grid item xs={6}>
                      <Paper className={classes.paper} elevation={0}>
                        <EditPatientForm
                          patientData={editableData}
                          disableAppointmentForm={() =>
                            setDisableAppointmentForm(false)
                          }
                          handleOpenExistingPatientForm={
                            handleOpenExistingPatientForm
                          }
                        />
                      </Paper>
                    </Grid>
                    {/* Left container */}
                    <Grid item xs={6}>
                      {/* NOTE : render component from props or default  CreateAppointmentForm */}
                      {LeftComponent ? (
                        <LeftComponent closeAppointment={() => handleClose()} />
                      ) : (
                        <CreateAppointmentForm
                          patientData={patientData}
                          closeAppointment={() => handleClose()}
                        />
                      )}
                    </Grid>
                  </>
                ) : (
                  <Grid
                    item
                    xs={12}
                    style={{
                      height: '63vh',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={AddPatientImage}
                      alt="Add Patient Image"
                      style={{ fontFamily: 'Yantramanav-Regular, Yantramanav' }}
                    />
                    <Typography variant="h3" className={classes.textImg}>
                      Search Patient or Add New Patient
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    getPatientDetails: payload => dispatch(getPatientDetails(payload)),
    getPatientList: payload => dispatch(getPatientList(payload)),
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
  memo,
  MessageComponent,
)(AppointmentForm);
