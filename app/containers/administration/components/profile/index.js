import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useAdministrationSlice } from '../../../../apis/administrationApis/administrationSlice';
import { MessageComponent } from '../../../../components';
import Configurations from './pages/configurations';
const Skeleton = React.lazy(() => import('../../../skeleton/tableSkeletone'));
const NoRecord = React.lazy(() =>
  import('../../../../components/elements/NoRecordPage'),
);

const useStyles = makeStyles(theme => ({}));

function Profile(props) {
  useAdministrationSlice();

  return <Configurations />;
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(Profile);
