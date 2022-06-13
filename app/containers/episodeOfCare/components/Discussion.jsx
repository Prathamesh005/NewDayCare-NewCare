import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { valueSetSearch } from '../../../apis/globalApis/globalSlice';
import TextSelect from '../../../components/hocs/wrappers/TextSelect';
import { getFromLocalStorage } from '../../../utils/localStorageUtils';
import UserContext from '../MyStateContext';
import TextArea from './forms/TextArea';

const useStyles = makeStyles(theme => ({
  discussionDiv: {
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '15px',
    },
  },
  headlabels: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  secondarylabels: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
}));

function Discussion(props) {
  const {
    SET_DISCUSSION_INITIAL_STATE,
    SET_ADDITIONAL_NOTE_INITIAL_STATE,
    discussionData,
    additionalNoteData,
    refferedToData,
  } = props;

  const user = React.useContext(UserContext);
  const loginUserDetails = getFromLocalStorage('data');
  const userResourceId = loginUserDetails.userDetails.fhirResourceId;
  const userDisplay = loginUserDetails.userDetails.display;

  const classes = useStyles();
  const [specialityArray, setSpecialityArray] = useState();
  const [specialityArrayUrl, setSpecialityArrayUrl] = useState('');
  const [storedData, setStoredData] = useState([]);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.valueSetSearch({
      url: 'http://hl7.org/fhir/ValueSet/c80-practice-codes',
      ID: true,
    });
    setSpecialityArray(payload && payload.message ? [] : payload);
    setSpecialityArrayUrl('http://hl7.org/fhir/ValueSet/c80-practice-codes');
  };
  //-----------------API CALLS END---------------
  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    let discussion = '';
    let discussionId = uuidv4();

    if (discussionData && discussionData) {
      if (discussionData.note) {
        discussion = discussionData && discussionData.note;
        discussionId = discussionData && discussionData.resourceId;
      }
    }

    const INITIAL_FORM_STATE = {
      discussion: discussion,
      discussionId: discussionId,
    };

    SET_DISCUSSION_INITIAL_STATE(INITIAL_FORM_STATE);

    return () => {};
  }, [discussionData]);

  useEffect(() => {
    let additionalNote = '';
    let additionalNoteId = uuidv4();

    if (additionalNoteData && additionalNoteData) {
      additionalNote = additionalNoteData.description;
      additionalNoteId = additionalNoteData.resourceId;
    }

    const INITIAL_FORM_STATE = {
      additionalNote: additionalNote,
      additionalNoteId: additionalNoteId,
    };

    SET_ADDITIONAL_NOTE_INITIAL_STATE(INITIAL_FORM_STATE);

    return () => {};
  }, [additionalNoteData]);

  useEffect(() => {
    if (Array.isArray(refferedToData) && refferedToData.length > 0) {
      const prac = refferedToData[0]['note'];
      setStoredData([
        {
          resourceId: refferedToData[0]['resourceId'],
          practitioner: prac,
          specialist: refferedToData[0]['code']
            ? {
                display:
                  refferedToData[0]['code'] &&
                  refferedToData[0]['code']['display'],
                code:
                  refferedToData[0]['code'] &&
                  refferedToData[0]['code']['code'],
              }
            : null,
        },
      ]);
    }
  }, [refferedToData]);
  const handleUpdateStoredData = arr => {
    if (Array.isArray(arr) && arr.length > 0) {
      const obj = {
        resourceId: arr[0]['resourceId'],
        patientInstruction: '',
        //Login Practitioner
        requester: {
          resourceId: userResourceId,
          resourceType: 'Practitioner',
          resourceReference: `Practitioner/${userResourceId}`,
          display: userDisplay,
        },
        code: arr[0]['specialist']
          ? {
              codeableSystem: specialityArrayUrl && specialityArrayUrl,
              code: arr[0]['specialist']['code'],
              text: arr[0]['specialist']['display'],
              display: arr[0]['specialist']['display'],
            }
          : null,
        referralName: arr[0]['practitioner'],
      };
      user.setReportedToData([obj]);
    }
    setStoredData(arr);
  };
  const handleSaveEach = (inputData, selectedData) => {
    setStoredData([
      {
        resourceId: uuidv4(),
        practitioner: inputData,
        specialist: selectedData['code']
          ? {
              display: selectedData['display'],
              code: selectedData['code'],
            }
          : null,
      },
    ]);
    user.setCheckReportedToData(true);
  };
  const handleSaveEdit = (inputData, selectedData, id, editIndex) => {
    const filteredStoredData = [...storedData];
    (filteredStoredData[editIndex] = {
      resourceId: id,
      practitioner: inputData,
      specialist: selectedData['code']
        ? {
            display: selectedData['display'],
            code: selectedData['code'],
          }
        : null,
    }),
      setStoredData([...filteredStoredData]);
    user.setCheckReportedToData(true);
  };

  return (
    <Fragment>
      <Grid container xs={12} spacing={8} className={classes.discussionDiv}>
        <Grid item container xs={12} md={6} spacing={4}>
          <Grid item xs={12}>
            <Typography className={classes.headlabels}>Discussion</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextArea
              name="discussion"
              placeholder="Enter Value Here"
              multiline
              rows={8}
            />
          </Grid>
        </Grid>

        <Grid item container xs={6} spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.headlabels}>Referred to</Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={3} className={classes.lebels}>
            Name of Doctor
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <TextSelect
              type="referredTo"
              options={
                specialityArray && specialityArray.length !== 0
                  ? specialityArray
                  : []
              }
              placeholder="Enter Name"
              label="Select Speciality"
              display="display"
              data={storedData}
              updateStoredData={handleUpdateStoredData}
              checkAnyUpdate={() => user.setCheckReportedToData(true)}
              deleteData={data => user.setDelReportedToData(data)}
              saveData={handleSaveEach}
              saveEditData={handleSaveEdit}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography className={classes.headlabels}>
              Additional Note
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextArea
              name="additionalNote"
              placeholder="Enter Value Here"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Discussion);
