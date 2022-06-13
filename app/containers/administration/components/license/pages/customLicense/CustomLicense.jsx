import React, { useState, Fragment, useEffect } from 'react';
import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import {
  OuterBoxPaper,
  PinkText,
  SemiBoldText,
} from '../../../../../../components';
import {
  SquareIconButton,
  SaveActionButton,
} from '../../../../../../components/button';
import TextfieldWrapper from '../../../../../layouts/formTemplate/TextField';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../../app/routeConstants';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import * as qs from 'query-string';
import Ellipse from '../../../../../../images/Ellipse.svg';

const useStyles = makeStyles(theme => ({
  sqbtn: {
    background: '#FFFFFF',
    marginRight: '1.3rem',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      width: '4.2rem',
    },
    '&:hover': {
      background: '#ffffff',
      boxShadow: 'none',
    },
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  subheader: {
    opacity: 0.8,
    width: '40rem',
    [theme.breakpoints.down('xs')]: {
      width: '22rem',
    },
  },
  scroll: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },
}));

const CustomLicense = props => {
  const classes = useStyles();
  const history = useHistory();
  // const query = qs.parse(location.search);
  const location = useLocation();
  const [data, setData] = useState('');

  useEffect(() => {
    {
      location.state && setData(location.state.licenseData);
    }
  }, [location.state]);

  const INITIAL_FORM_STATE = {
    activationDate: '',
    expiryDate: '',
    parameterOne: 1000,
    parameterTwo: 200,
    parameterThree: 50,
    parameterFour: 10,
    parameterFive: 2,
    disable: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    parameterOne: Yup.number()
      .min(1, 'Please Enter Valid number')
      .required('Please Enter number'),
    parameterTwo: Yup.number()
      .min(1, 'Please Enter Valid number')
      .required('Please Enter number'),
    parameterThree: Yup.number()
      .min(1, 'Please Enter Valid number')
      .required('Please Enter number'),
    parameterFour: Yup.number()
      .min(1, 'Please Enter Valid number')
      .required('Please Enter number'),
    parameterFive: Yup.number()
      .min(1, 'Please Enter Valid number')
      .required('Please Enter number'),
    activationDate: Yup.date().required('Please Enter Date'),
    expiryDate: Yup.date().required('Please Enter Date'),
  });

  const onSave = async (values, { resetForm }) => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_MANAGE,
      // search: `?licenseID=${query.licenseID}`,
      state: { licenseData: data },
    });
    values.disable = true;
    console.log(values);
  };

  const Close = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_MANAGE,
      // search: `?licenseID=${query.licenseID}`,
      state: { licenseData: data },
    });
  };

  const RightContainer = props => {
    return (
      <>
        <SquareIconButton
          className={classes.sqbtn}
          onClick={() => {
            history.push({
              pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_MANAGE,
              // search: `?licenseID=${query.licenseID}`,
              state: { licenseData: data },
            });
          }}
        >
          <PinkText>Reset to Default</PinkText>
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

  const BottomComponent = props => {
    return (
      <>
        <Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h3">Active License</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <SemiBoldText variant="h3" style={{ fontSize: '1.1rem' }}>
                {data.title}
              </SemiBoldText>
            </Grid>

            <Grid item container spacing={3} xs={12} md={12}>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h3" component={'span'}>
                    Activation Date
                  </Typography>
                  <TextfieldWrapper
                    name="activationDate"
                    type="date"
                    style={{
                      width: '9rem',
                      marginLeft: '1rem',
                    }}
                  />
                </div>
              </Grid>

              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h3" component={'span'}>
                    Expiry Date
                  </Typography>
                  <TextfieldWrapper
                    name="expiryDate"
                    type="date"
                    style={{
                      width: '9rem',
                      marginLeft: '1rem',
                    }}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="h3" className={classes.subheader}>
                {data.subheader}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <div
                style={{
                  borderBottom: '1px solid #707070',
                  opacity: 0.4,
                  width: '40rem',
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography
                variant="h3"
                style={{ opacity: 0.8, color: '#404040' }}
              >
                Includes:
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} className={classes.scroll}>
              <Box style={{ width: '40rem' }}>
                {data &&
                  data.parameters.map((ele3, index) => {
                    return (
                      <Fragment key={index}>
                        <Grid container spacing={8} alignItems="center">
                          <Grid item xs={1} md={1} lg={1}>
                            <img src={Ellipse} style={{ opacity: 0.6 }} />
                          </Grid>
                          <Grid item xs={5} md={5} lg={5}>
                            <Typography variant="h3" style={{ opacity: 0.8 }}>
                              {ele3.parameter}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} md={2} lg={2}>
                            <Typography variant="h3" style={{ opacity: 0.6 }}>
                              Uses:120/
                            </Typography>
                          </Grid>
                          <Grid item xs={4} md={4} lg={4}>
                            <TextfieldWrapper
                              name={`${ele3.parameterValidation}`}
                              // className={classes.field}
                              style={{
                                width: 100,
                                // background: '#F4F4F4',
                                borderRadius: '5px',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Fragment>
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </Fragment>
      </>
    );
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
          return (
            <Form>
              <OuterBoxPaper
                title={'Customize License Pack'}
                rightContainer={RightContainer(formProps)}
                handleClose={Close}
                bottomComponent={BottomComponent(formProps)}
                bottomHeight={'75vh'}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CustomLicense;
