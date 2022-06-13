import React, { useState, Fragment } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  OuterBoxPaper,
  SaveActionButton,
} from '../../../../../../../../components';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../../../../app/routeConstants';
import { Formik, Form } from 'formik';
import TextfieldWrapper from '../../../../../../../layouts/formTemplate/TextField';
import TextfieldArea from '../../../../../../../layouts/formTemplate/TextArea';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
}));

const AddRefLink = props => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const INITIAL_FORM_STATE = {
    Title: '',
    Description: '',
    HyperLink: 'https://www.oncowin.in/',
  };

  const FORM_VALIDATION = Yup.object().shape({
    Title: Yup.string()
      .required('Title Required')
      .nullable(),
    Description: Yup.string()
      .required('Description Required')
      .nullable(),
    HyperLink: Yup.string().required('Hyper Link Required'),
  });

  const onSave = async (values, { resetForm }) => {
    console.log(values);
  };

  const Close = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE,
      state: {
        path: history.location.pathname,
      },
    });
  };

  const RightContainer = props => {
    return (
      <>
        <SaveActionButton
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

  const BottomComponent = props => {
    return (
      <>
        <Grid container spacing={3} style={{ display: 'block' }}>
          <Grid item container xs={12}>
            <Grid item xs={12} md={2} className={classes.lebels}>
              Title
            </Grid>
            <Grid item xs={12} md={10}>
              <TextfieldWrapper
                name="Title"
                placeholder="Title Here"
                style={{ width: 450 }}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} md={2} className={classes.lebels}>
              Description
            </Grid>
            <Grid item xs={12} md={10}>
              <TextfieldArea
                name="Description"
                placeholder="Enter Description Here"
                multiline
                rows={4}
                style={{ width: 450 }}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} md={2} className={classes.lebels}>
              Hyper Link
            </Grid>
            <Grid item xs={12} md={10}>
              <TextfieldWrapper
                name="HyperLink"
                placeholder="Hyper Link"
                style={{ width: 450 }}
              />
            </Grid>
          </Grid>
        </Grid>
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
                title={'Add New Reference Link'}
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

export default AddRefLink;
