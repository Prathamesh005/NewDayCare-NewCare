import ProfileCard from './components/profileCard/ProfileCard';
import React, { useState, Fragment } from 'react';
import RefrenceCard from './components/referenceCard/RefrenceCard';
import { Grid, makeStyles } from '@material-ui/core';
import MyChannel from './components/myChannel/MyChannel';
import { CancleDialog, MessageComponent } from '../../../../../../components';
import { withRouter } from 'react-router-dom';
import { getPractitionerDetails } from '../../../../../../apis/globalApis/globalSlice';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getQueryStringValByKey } from '../../../../../../hooks/useQueryParam';
import Patient360 from '../../../../../skeleton/Patient360';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    flexGrow: 1,
    padding: 8,
  },
}));

const ProfilePage = props => {
  const { practitionerDetails } = props;
  const classes = useStyles();
  const [modelOpen, setModalOpen] = useState(false);
  const [LoaderLoader, setLoaderLoader] = useState(false);
  let practitionerID = getQueryStringValByKey('practitionerID');

  const handleModelClick = () => {
    setModalOpen(!modelOpen);
  };

  const onLoad = async Id => {
    const { payload } = await props.getPractitionerDetails({
      id: Id,
    });

    if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }

    setLoaderLoader(true);
  };

  React.useEffect(() => {
    onLoad(practitionerID);
  }, [practitionerID]);

  const linkdata = [
    {
      id: 1,
      header: "Dr.Rahul's Blogs",
      subheader: 'Dr. Rahul Kulkarni consultant Medical- Oncologist in Pune.',
    },
    {
      id: 2,
      header: 'Oncowin Clinic',
      subheader: 'Lorem Ipsum Dolar Sit Amet Lorem Ipsum Dolar Sit Amet',
    },
    {
      id: 3,
      header: 'NCCN Guidelines',
      subheader: 'Lorem Ipsum Dolar Sit Amet Lorem Ipsum Dolar Sit Amet',
    },
  ];

  return (
    <Fragment>
      <CancleDialog
        handleClick={handleModelClick}
        open={modelOpen}
        // isLoading={DeleteLoader}
        // disabled={DeleteLoader}
        // handleDelete={handleDelete}
      />
      {LoaderLoader ? (
        <div className={classes.mainContainer}>
          <Grid container spacing={4}>
            <Grid item lg={8} md={8} sm={12}>
              <ProfileCard
                practitionerDetails={practitionerDetails}
                handleModelClick={handleModelClick}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <MyChannel
                link={practitionerDetails && practitionerDetails.channel}
              />

              <RefrenceCard
                linkdata={linkdata}
                handleModelClick={handleModelClick}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Patient360 />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    getPractitionerDetails: payload =>
      dispatch(getPractitionerDetails(payload)),
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
)(ProfilePage);
