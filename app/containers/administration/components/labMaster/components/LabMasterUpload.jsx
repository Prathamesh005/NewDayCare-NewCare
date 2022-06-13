import { Box, Divider, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  DragAndDrop,
  OuterBoxPaper,
  OutlinedChipsWithStatus,
  SecondaryText,
  SemiBoldText,
  MessageComponent,
} from '../../../../../components';
import { URLS } from '../../../../../utils/urls';
import FileUploadConfirm from './FileUploadConfirm';

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

const LabMasterUpload = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState()

  //-----------------API CALLS ---------------

  //-----------------API CALLS END---------------

  const INITIAL_FORM_STATE = {};
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
  };
  const handleData = (dataNew, openValue, filename) => {
    // debugger
    setData(dataNew)
    setOpen(openValue)
    setFileName(filename)
  }

  let Data = [
    {
      testName: 'Thyrocare Test Price List',
      uploadTime: 'Uploaded on - 12/04/2022',
      uploadedBy: 'Uploaded By - Shubham Verma',
      status: 'success',
    },
    {
      testName: 'Thyrocare Test Price List',
      uploadTime: 'Uploaded on - 12/04/2022',
      uploadedBy: 'Uploaded By - Shubham Verma',
      status: 'error',
    },
    {
      testName: 'Thyrocare Test Price List',
      uploadTime: 'Uploaded on - 12/04/2022',
      uploadedBy: 'Uploaded By - Shubham Verma',
      status: 'warning',
    },
  ];

  const BottomContainer = props => {
    const { values, handleChange } = props;
    return (
      <Grid container>
        <Grid item container xs={12} md={6} style={{ marginBottom: 25 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <DragAndDrop handleData={handleData} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SemiBoldText>Upload History</SemiBoldText>
            </Grid>

            {Data &&
              Data.length > 0 &&
              Data.map((ele, index) => {
                return (
                  <Grid item xs={12} key={index.toString()}>
                    <Box display={'flex'}>
                      <Box flexGrow="1">
                        <Typography variant="h3" gutterBottom>
                          {ele.testName}
                        </Typography>
                        <SecondaryText variant="h4" component="span">
                          {ele.uploadTime}
                        </SecondaryText>

                        <SecondaryText
                          variant="h4"
                          component="span"
                          style={{ paddingLeft: 20 }}
                        >
                          {ele.uploadedBy}
                        </SecondaryText>
                      </Box>
                      <Box>
                        <OutlinedChipsWithStatus status={ele.status} />
                      </Box>
                    </Box>

                    <Divider style={{ margin: '20px 0px' }} />
                  </Grid>
                );
              })}
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
      {!open ? <Formik
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
                title={'Lab Tests Bulk upload'}
                handleClose={handleOnClose}
                bottomComponent={BottomContainer(formProps)}
                bottomHeight={'75vh'}
              />
            </Form>
          );
        }}
      </Formik>
        : <FileUploadConfirm data={data} handleClose={() => setOpen(false)} fileName={fileName} />}
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
)(LabMasterUpload);
