import React, { useState, Fragment } from 'react';
import {
  Grid,
  makeStyles,
  Avatar,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  OuterBoxPaper,
  CancleDialog,
} from '../../../../../../../../components';
import {
  SquareIconButton,
  SaveActionButton,
} from '../../../../../../../../components/button';
import TextfieldWrapper from '../../../../../../../layouts/formTemplate/TextField';
import TextfieldArea from '../../../../../../../layouts/formTemplate/TextArea';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../../../../app/routeConstants';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  sqbtn: {
    background: '#FFFFFF',
    minWidth: '50px',
    minHeight: '40px',
    marginRight: '1.3rem',
    boxShadow: ' 0px 0px 6px #00000029',
    borderRadius: '5px',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
}));

const EditRefLink = props => {
  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const [modelOpen, setModalOpen] = useState(false);

  const handleModelClick = () => {
    setModalOpen(!modelOpen);
  };

  const Close = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE,
      state: {
        path: history.location.pathname,
      },
    });
  };

  const INITIAL_FORM_STATE = {
    Title: 'Oncowin Clinic',
    Description:
      'Nisi ex commodo Lorem aute voluptate est deserunt aliquip voluptate anim adipisicing amet.',
    HyperLink: 'https://www.oncowin.in/',
  };

  const FORM_VALIDATION = Yup.object().shape({
    Title: Yup.string()
      .required('Title Required')
      .nullable(),
    Description: Yup.string()
      .required('Description')
      .nullable(),
    HyperLink: Yup.string().required('Hyper Link Required'),
  });

  const onSave = async (values, { resetForm }) => {
    console.log(values);
  };

  const RightContainer = props => {
    return (
      <>
        <SquareIconButton onClick={handleModelClick} className={classes.sqbtn}>
          <DeleteIcon style={{ fontSize: '1.2rem' }} />
        </SquareIconButton>
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
              <CancleDialog
                handleClick={handleModelClick}
                open={modelOpen}
                // isLoading={DeleteLoader}
                // disabled={DeleteLoader}
                // handleDelete={handleDelete}
              />

              <OuterBoxPaper
                title={'Edit Reference Link'}
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

export default EditRefLink;
