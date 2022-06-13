import {
  Divider,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  OuterBoxPaper,
  SemiBoldText,
  SaveActionButton,
  MessageComponent,
} from '../../../../../components';
import { URLS } from '../../../../../utils/urls';
import AutoCompleteField from '../../../../layouts/formTemplate/AutoCompleteField';
import DateTimePickerField from '../../../../layouts/formTemplate/DateTimePickerField';
import SwitchFieldWrapper from '../../../../layouts/formTemplate/SwitchField';
import TextfieldWrapper from '../../../../layouts/formTemplate/TextField';

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
}));

const LabMasterEdit = props => {
  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [serviceTypeData, setServiceTypeData] = useState([
    { code: 'Hospital', display: 'Hospital' },
    { code: 'Clinic', display: 'Clinic' },
  ]);
  const [saveLoader, setSaveLoader] = React.useState(false);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const specialitySet = await props.valueSetSearch({
      url: URLS.SPECIALITY,
    });
    setServiceTypeData(
      specialitySet.payload && specialitySet.payload.message
        ? []
        : specialitySet.payload,
    );
  };
  //-----------------API CALLS END---------------
  React.useEffect(() => {
    // callValueSetSearch();
  }, []);

  let labCode = '';
  let nqMappingCode = '';
  let startDate = '';
  let endDate = '';
  let testName = '';
  let alternateName = '';
  let providerTestCode = '';
  let providerTestCode2 = '';
  let testUrl = 'https://www.thyrocare.com';
  let type = '';
  let providerMRP = '';
  let providerOfferPrice = '';
  let providerCostPrice = '';
  let nqListCost = '';
  let nqOfferPrice = '';
  let nqAllowedPerson = '';
  let status = true;

  const Data = {
    labCode: 'NQLAB00000060',
    nqMappingCode: '',
    startDate: '2022-05-08',
    endDate: '2022-05-10',
    testName: 'ALPHA FETO PROTEIN (AFP)',
    alternateName: 'AFP Maternal; Maternal Serum AFP; msAFP screen',
    providerTestCode: 'AFP',
    providerTestCode2: 'ALPHA FETO PROTEIN (AFP)',
    testUrl: 'https://www.thyrocare.com',
    type: {
      code: 'Hospital',
      display: 'Hospital',
    },
    providerMRP: '1500',
    providerOfferPrice: '1300',
    providerCostPrice: '1800',
    nqListCost: '500',
    nqOfferPrice: '900',
    nqAllowedPerson: '100',
    status: true,
  };

  const INITIAL_FORM_STATE = {
    labCode: Data['labCode'],
    nqMappingCode: Data['nqMappingCode'],
    startDate: Data['startDate'],
    endDate: Data['endDate'],
    testName: Data['testName'],
    alternateName: Data['alternateName'],
    providerTestCode: Data['providerTestCode'],
    providerTestCode2: Data['providerTestCode2'],
    testUrl: Data['testUrl'],
    type: Data['type'],
    providerMRP: Data['providerMRP'],
    providerOfferPrice: Data['providerOfferPrice'],
    providerCostPrice: Data['providerCostPrice'],
    nqListCost: Data['nqListCost'],
    nqOfferPrice: Data['nqOfferPrice'],
    nqAllowedPerson: Data['nqAllowedPerson'],
    status: Data['status'],
  };

  const FORM_VALIDATION = Yup.object().shape({});

  const onSave = async (values, { resetForm }) => {
    console.log(values);
    const field = {
      values: values,
      role: 'Doctor',
      resourceName: 'Practitioner',
    };

    const Id = '';
    // debugger;

    // setSaveLoader(true);
    // const { payload } = await props.doPractionerSave(hospitalAdd(field));
    // setSaveLoader(false);
    // if (payload && payload.status === 200) {
    //   props.snackbarShowMessage(payload.data.message, 'success');

    //   // setTimeout(() => {
    //   //   history.push(ROUTES_CONSTANTS.DASHBOARD);
    //   // }, [2500]);
    // } else if (payload && payload.message) {
    //   let m =
    //     payload.response &&
    //     payload.response.data &&
    //     payload.response.data.message
    //       ? payload.response.data.message
    //       : payload.message;

    //   props.snackbarShowMessage(m, 'error');
    // }
  };

  const RightContainer = props => {
    return (
      <>
        <SaveActionButton
          isLoading={saveLoader}
          disabled={saveLoader}
          onClick={() => props.handleSubmit()}
          style={{
            padding: 0,
            minWidth: smDown ? 90 : '155px',
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
      <Grid container>
        <Grid item container xs={12} md={6} style={{ marginBottom: 25 }}>
          <Grid container spacing={3}>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Provider
              </Grid>
              <Grid item xs={12} md={9}>
                <SemiBoldText>Thyrocare Technology Limited</SemiBoldText>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Code
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper name="labCode" placeholder="Enter Code" />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                NQ Mapping Code
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="nqMappingCode"
                  placeholder="NQ Mapping Code"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Effective Date
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <DateTimePickerField
                  name="startDate"
                  type="date"
                  // placeholder="Date Of Birth"
                  minDate={''}
                  maxDate={''}
                  value={values.startDate}
                  style={{ width: '45%' }}
                />

                <DateTimePickerField
                  name="endDate"
                  type="date"
                  // placeholder="Date Of Birth"
                  minDate={''}
                  maxDate={''}
                  value={values.endDate}
                  style={{ width: '45%' }}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Test Name
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="testName"
                  placeholder="Enter Test Name"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Alternate Name
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="alternateName"
                  placeholder="Enter Alternate Name"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Provider Test Code
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="providerTestCode"
                  placeholder="Enter Provider Code"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Provider Test Code 2
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="providerTestCode2"
                  placeholder="Enter Provider Code"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Test URL
              </Grid>
              <Grid item xs={12} md={9}>
                <TextfieldWrapper
                  name="testUrl"
                  placeholder="Enter URL"
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <FileCopyOutlinedIcon
                          style={{ fontSize: '1rem', opacity: 0.9 }}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Type
              </Grid>
              <Grid item xs={12} md={9}>
                <AutoCompleteField
                  id="type"
                  size="small"
                  options={serviceTypeData ? serviceTypeData : []}
                  label="Select Type"
                  name="type"
                  val={values.type}
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Provider MRP
              </Grid>
              <Grid item xs={12} md={3}>
                <TextfieldWrapper
                  type="number"
                  name="providerMRP"
                  placeholder="Enter MRP"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ color: '#000000' }}
                    >
                      <Typography variant="h4">₹</Typography>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Provider b2c Offer Price
              </Grid>
              <Grid item xs={12} md={3}>
                <TextfieldWrapper
                  type="number"
                  name="providerOfferPrice"
                  placeholder="Enter Price"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ color: '#000000' }}
                    >
                      <Typography variant="h4">₹</Typography>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                Provider NQ Cost Price
              </Grid>
              <Grid item xs={12} md={3}>
                <TextfieldWrapper
                  type="number"
                  name="providerCostPrice"
                  placeholder="Enter Price"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ color: '#000000' }}
                    >
                      <Typography variant="h4">₹</Typography>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                NQ list Price
              </Grid>
              <Grid item xs={12} md={3}>
                <TextfieldWrapper
                  type="number"
                  name="nqListCost"
                  placeholder="Enter Price"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ color: '#000000' }}
                    >
                      <Typography variant="h4">₹</Typography>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                NQ offer Price
              </Grid>
              <Grid item xs={12} md={3}>
                <TextfieldWrapper
                  type="number"
                  name="nqOfferPrice"
                  placeholder="Enter Price"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ color: '#000000' }}
                    >
                      <Typography variant="h4">₹</Typography>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={3} className={classes.lebels}>
                NQ Allowed Passon
              </Grid>
              <Grid item xs={12} md={3}>
                <TextfieldWrapper
                  type="number"
                  name="nqAllowedPerson"
                  // placeholder="Mobile Number"
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={4} className={classes.lebels}>
                Status
              </Grid>
              <Grid item xs={12} md={8}>
                <SwitchFieldWrapper
                  name="status"
                  value={values.status}
                  unCheckedText="Inactive"
                  checkedText="Active"
                />
              </Grid>
            </Grid>
          </Grid>{' '}
        </Grid>
      </Grid>
    );
  };

  const handleOnClose = () => {
    props.history.goBack();
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        enableReinitialize={true}
        validationSchema={FORM_VALIDATION}
        onSubmit={onSave}
      >
        {formProps => {
          // console.log("values", values)
          return (
            <Form>
              <OuterBoxPaper
                title={'Edit Test'}
                handleClose={handleOnClose}
                rightContainer={RightContainer(formProps)}
                bottomComponent={BottomContainer(formProps)}
                bottomHeight={'76vh'}
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
    // valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    // doPractionerSave: payload => dispatch(doPractionerSave(payload)),
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
)(LabMasterEdit);
