/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadHOPI } from '../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../components';
import { NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles({
  mainDiv: {
    fontSize: '1rem',
    fontWeight: 400,
  },
});

function HOPI(props) {
  const classes = useStyles();

  const { HOPIDescription, HOPILoader } = props;

  const callLoadHOPI = async field => {
    const { payload } = await props.loadHOPI(field);
    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    if (props.Id && props.Id.resourceId) {
      const field = {
        id: props.Id && props.Id.resourceId,
        // appointmentId: props.Id && props.Id.resourceId,
      };

      callLoadHOPI(field);
    }
  }, [props.Id]);

  return (
    <>
      <div className={classes.mainDiv}>
        {!HOPILoader && HOPIDescription
          ? HOPIDescription
          : !HOPILoader && NO_RECORD}
      </div>
    </>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    loadHOPI: id => dispatch(loadHOPI(id)),
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
)(HOPI);
