import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import TextOnly from '../../../../components/hocs/wrappers/TextOnly';
import UserContext from '../../MyStateContext';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
}));

function ChiefComplaint(props) {
  const { chiefComplaintData } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    setStoredData(chiefComplaintData);
  }, [chiefComplaintData]);

  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setChiefComplaintData(data);
  };
  const handleSaveEach = value => {
    setStoredData([
      ...storedData,
      {
        resourceId: uuidv4(),
        clinicalComplains: [value],
      },
    ]);
    user.setCheckChiefComplaint(true);
  };
  const handleSaveEdit = (value, id, editIndex) => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      resourceId: id,
      clinicalComplains: [value],
    };
    setStoredData([...filteredStoredData]);

    user.setCheckChiefComplaint(true);
  };
  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs md={1} className={classes.lebels}>
          Chief Complaint
        </Grid>
        <TextOnly
          name="chiefComplaint"
          label="Select Reason For Visit"
          data={storedData || []}
          updateStoredData={handleUpdateStoredData}
          checkAnyUpdate={() => user.setCheckChiefComplaint(true)}
          deleteData={data => user.setDelChiefComplaintData(data)}
          saveData={handleSaveEach}
          saveEditData={handleSaveEdit}
        />
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ChiefComplaint);
