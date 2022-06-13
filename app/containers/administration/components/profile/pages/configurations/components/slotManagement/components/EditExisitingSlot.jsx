import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Formik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import { valueSetSearch } from 'apis/globalApis/globalSlice';
import AutoCompleteField from '../../../../../../../../layouts/formTemplate/AutoCompleteField';
import { Typography } from '@material-ui/core';
import {
  CircularChips,
  SquareIconButton,
  OuterBoxPaper,
  SaveActionButton,
  MessageComponent,
} from '../../../../../../../../../components';
import TimePickerField from '../../../../../../../../layouts/formTemplate/TimePickerField';
import DeleteIcon from '@material-ui/icons/Delete';
import { actionsConfig } from '../../../../../../../../../apis/administrationApis/administrationSlice';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fff',
    //marginTop:20
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  mendotary: {
    color: '#FF5C5C',
    paddingLeft: 5,
  },
}));
const daysData = [
  { value: 'Monday', label: 'M' },
  { value: 'TuesDay', label: 'T' },
  { value: 'Wednesday', label: 'W' },
  { value: 'Thursday', label: 'T' },
  { value: 'Friday', label: 'F' },
  { value: 'Saturday', label: 'S' },
  { value: 'Sunday', label: 'S' },
];
const EditExisitingSlot = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [appointmentType, setAppointmentType] = useState([]);
  const [selectedChips, setSelectedChips] = React.useState([]);
  const location = useLocation();
  console.log('location', location);
  //-----------------API CALLS ---------------

  //-----------------API CALLS END---------------

  const INITIAL_FORM_STATE = {
    typeOfAppointment: '',
    selectDays: ['Wednesday', 'Saturday', 'Sunday'],
    startTime: null,
    endTime: null,
    slotDuration: '',
    appointmentPerSlot: '',
  };
  useEffect(() => {
    setSelectedChips(INITIAL_FORM_STATE.selectDays || []);
  }, []);
  useEffect(() => {
    setAppointmentType([
      {
        code: 'VideoConsultation',
        display: 'Video Consultation',
      },
      {
        code: 'clinicalVisit',
        display: 'Clinical Visit',
      },
      {
        code: 'clinicalVisit',
        display: 'Clinical Visit',
      },
    ]);
  }, []);
  //   const FORM_VALIDATION = Yup.object().shape({
  //     firstName: Yup.string()
  //       .required('Firstname Required')
  //       .nullable(),
  //     middleName: Yup.string()
  //       .required('Middlename Required')
  //       .nullable(),
  //     lastName: Yup.string().required('Lastname Required'),
  //     phone: Yup.string()
  //       .matches(phoneRegExp, 'Please Enter valid Phone number')
  //       .min(10, 'Please Enter valid Phone number')
  //       .max(12, 'Please Enter valid Phone number')
  //       .nullable()
  //       .required('Phone number Required'),
  //     speciality: Yup.object().shape({
  //       display: Yup.string().required('Required'),
  //     }),
  //   });

  const onSave = async (values, { resetForm }) => {
    console.log(values);
  };

  const RightContainer = props => {
    return (
      <>
        <SquareIconButton
          onClick={() => history.go(-1)}
          style={{ margin: '0px 5px', padding: '10px' }}
        >
          <DeleteIcon style={{ fontSize: '1rem' }} />
        </SquareIconButton>
        <SaveActionButton
          onClick={() => props.handleSubmit()}
          style={{
            padding: 0,
            minWidth: '155px',
            fontSize: '0.9rem',
          }}
        >
          Save
        </SaveActionButton>
      </>
    );
  };

  const BottomContainer = props => {
    const { values, handleChange } = props;
    return (
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid
          item
          container
          sm={12}
          md={7}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              <Typography variant="h3">
                Select Clinic / Hospital <br />/ Type of Appointment
                <span className={classes.mendotary}>{' *'}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <AutoCompleteField
                id="typeOfAppointment"
                size="small"
                options={[]}
                label="Select Appointment Type"
                name="typeOfAppointment"
                val={values.typeOfAppointment}
                code="code"
                display="display"
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              <Typography variant="h3">
                Select Days <span className={classes.mendotary}>{' *'}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <CircularChips
                options={daysData}
                selectedChips={selectedChips}
                setSelectedChips={setSelectedChips}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              Select Time
              <span className={classes.mendotary}>{' *'}</span>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <TimePickerField
                  name="startTime"
                  value={values.startTime}
                  placeholder="Start Time"
                  style={{ width: '49%' }}
                />

                <TimePickerField
                  name="endTime"
                  value={values.endTime}
                  placeholder="End Time"
                  style={{ width: '49%' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              Slot Duration
              <span className={classes.mendotary}>{' *'}</span>
            </Grid>
            <Grid item xs={12} md={8}>
              <AutoCompleteField
                id="slotDuration"
                size="small"
                options={[]}
                label="Select Slot Duration"
                name="slotDuration"
                val={values.slotDuration}
                code="code"
                display="display"
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              Appointment per slot
              <span className={classes.mendotary}>{' *'}</span>
            </Grid>
            <Grid item xs={12} md={8}>
              <AutoCompleteField
                id="appointmentPerSlot"
                size="small"
                options={[]}
                label="Select Appointment Per Slot"
                name="appointmentPerSlot"
                val={values.appointmentPerSlot}
                code="code"
                display="display"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const handleOnClose = () => {
    props.updateAdministrationByKeyVal({
      key: 'tabIndexForConfiguration',
      data: 3,
    });
    props.history.goBack();
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        enableReinitialize={true}
        // validationSchema={FORM_VALIDATION}
        onSubmit={onSave}
      >
        {formProps => {
          // console.log("values", values)
          return (
            <Form>
              <OuterBoxPaper
                title={'Edit Slot'}
                handleClose={handleOnClose}
                rightContainer={RightContainer(formProps)}
                bottomComponent={BottomContainer(formProps)}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    updateAdministrationByKeyVal: payload =>
      dispatch(actionsConfig.updateAdministrationByKeyVal(payload)),
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
)(EditExisitingSlot);
