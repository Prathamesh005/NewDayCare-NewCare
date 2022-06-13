import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Formik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import { valueSetSearch } from 'apis/globalApis/globalSlice';
import AutoCompleteField from '../../../../../../../../layouts/formTemplate/AutoCompleteField';
import { Typography } from '@material-ui/core';
import {
  CircularChips,
  PinkSwitch,
  OuterBoxPaper,
  SaveActionButton,
  MessageComponent,
} from '../../../../../../../../../components';
import TimePickerField from '../../../../../../../../layouts/formTemplate/TimePickerField';
import DateTimePickerField from '../../../../../../../../layouts/formTemplate/DateTimePickerField';
import Divider from '@material-ui/core/Divider';
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

const EditExistingBlockCalender = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [reason, setReason] = useState([]);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  //-----------------API CALLS ---------------

  //-----------------API CALLS END---------------

  const INITIAL_FORM_STATE = {
    reason: '',
    duration: false,
    fromDate: null,
    toDate: null,
    fromTime: null,
    toTime: null,
  };

  useEffect(() => {
    setReason([
      {
        code: 'familyTime',
        display: 'Family Time',
      },
      {
        code: 'familyTime',
        display: 'Family Time',
      },
    ]);
  }, []);
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
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
        <SaveActionButton
          // isLoading={saveLoader}
          // disabled={saveLoader}
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
    const { values } = props;
    return (
      <Grid
        container
        spacing={5}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid
          item
          container
          sm={12}
          md={6}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              <Typography variant="h3">
                Reason<span className={classes.mendotary}>{' *'}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <AutoCompleteField
                id="reason"
                size="small"
                options={[]}
                label="Select Reason"
                name="reason"
                val={values.reason}
                code="code"
                display="display"
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              <Typography variant="h3">
                Duration <span className={classes.mendotary}>{' *'}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant={5}>
                All Day{' '}
                <span>
                  <PinkSwitch
                    checked={state.checkedA}
                    onChange={e => handleChange(e)}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    size="small"
                  />
                </span>
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              From
              <span className={classes.mendotary}>{' *'}</span>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <DateTimePickerField
                  name="fromDate"
                  type="date"
                  placeholder="Select Date"
                  minDate=""
                  maxDate={new Date()}
                  style={{ width: '49%' }}
                />

                <TimePickerField
                  name="endTime"
                  value={values.endTime}
                  placeholder="Select Time"
                  style={{ width: '49%' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} md={4} className={classes.lebels}>
              To
              <span className={classes.mendotary}>{' *'}</span>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <DateTimePickerField
                  name="toDate"
                  type="date"
                  placeholder="Select Date"
                  minDate=""
                  maxDate={new Date()}
                  style={{ width: '49%' }}
                />

                <TimePickerField
                  name="endTime"
                  value={values.endTime}
                  placeholder="Select Time"
                  style={{ width: '49%' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" />
        <Grid
          item
          container
          sm={12}
          md={6}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item container xs={12}>
            <Grid item xs={12} md={8} className={classes.lebels}>
              <Typography variant="h3">For All Clinics / Hospitals</Typography>
            </Grid>
            <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
              <PinkSwitch
                checked={state.checkedB}
                onChange={e => handleChange(e)}
                name="checkedB"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid item xs={12} md={8} className={classes.lebels}>
              <Typography variant="h4">
                By Turning on Toggle System will not accept new Appointment for
                above period
              </Typography>
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} md={8} className={classes.lebels}>
              <Typography variant="h3">
                Cancel All Scheduled Appointments
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
              <PinkSwitch
                checked={state.checkedC}
                onChange={e => handleChange(e)}
                name="checkedC"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid item xs={12} md={8} className={classes.lebels}>
              <Typography variant="h4">
                By Turning on Toggle System will not accept new Appointment for
                above period
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const handleOnClose = () => {
    props.updateAdministrationByKeyVal({
      key: 'tabIndexForConfiguration',
      data: 4,
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
                title={'Block Calender'}
                handleClose={handleOnClose}
                rightContainer={RightContainer(formProps)}
                bottomComponent={BottomContainer(formProps)}
                bottomHeight={'75vh'}
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
)(EditExistingBlockCalender);
