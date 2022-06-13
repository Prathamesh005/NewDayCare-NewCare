import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  actionsConfig,
  doPractionerDelete,
  useAdministrationSlice,
} from '../../../../apis/administrationApis/administrationSlice';
import { getPractitionerList } from '../../../../apis/globalApis/globalSlice';
import {
  CancleDialog,
  EditIconSquareButton,
  MessageComponent,
  OuterBox,
  PageTitleText,
  PinkAddCircleButton,
  SearchInput,
  SquareIconButton,
  ViewTable,
} from '../../../../components';
import { ListSkeleton } from '../../../../components/skeleton';
import VerticalTune from '../../../../images/assets/tune-vertical.svg';
import { List_DATE_TIME_DISPLAY } from '../../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
const NoRecord = React.lazy(() =>
  import('../../../../components/elements/NoRecordPage'),
);

const useStyles = makeStyles(theme => ({
  textFieldGrid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  main: {
    flexGrow: 1,
  },
  iconClass: {
    color: '#727272',
    cursor: 'pointer',
  },
}));

function AllDoctors(props) {
  useAdministrationSlice();
  const {} = props;
  const { practitionerList } = props.globalReducerThunk;
  const classes = useStyles();
  const [data, setData] = useState({
    query: false,
    date: moment().format(List_DATE_TIME_DISPLAY),
    activeFilter: [],
  });
  const [LocalLoader, setLocalLoader] = React.useState(false);
  const [DeleteLoader, setDeleteLoader] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const history = useHistory();
  const HandleDeleteModalOpen = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onHandleDetail = (value, row, Id) => {
    setOpenDetail(value);
    setSelectedId(Id);
    setSelectedData(row);
  };

  const getPractitionerList = async inputData => {
    setLocalLoader(true);
    const { payload } = await props.getPractitionerList(inputData);
    setLocalLoader(false);
    if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    getPractitionerList('');
  }, []);

  const handleChange = value => {
    setData({ ...data, query: value });
  };

  let Data =
    practitionerList && practitionerList.length !== 0 ? practitionerList : [];
  // console.log('Data', Data);
  const search = data.query;
  if (search && search.length > 0) {
    Data =
      practitionerList &&
      practitionerList.filter(eachVal => {
        let opt =
          eachVal.practitioner.display
            .toLowerCase()
            .search(search.toLowerCase()) !== -1;
        return opt;
      });
  }

  const defaultHeadCells = [
    {
      id: 'practitioner',
      label: "Doctor's Name",

      render: ({ value }) => {
        return (
          <span style={{ fontWeight: 500 }}>
            {' '}
            {value.first}
            {value.middle && ' ' + value.middle}
            {value.last && ' ' + value.last}
          </span>
        );
      },
    },
    {
      id: 'practitioner',
      label: 'Speciality',
      render: ({ value }) => {
        return (
          (value.practitionerRoleInOrganization &&
            value.practitionerRoleInOrganization[0] &&
            value.practitionerRoleInOrganization[0].speciality[0] &&
            value.practitionerRoleInOrganization[0].speciality[0].display) ||
          '-'
        );
      },
    },
    {
      id: 'practitioner',
      label: 'Created On',
      render: ({ value }) => {
        return '-';
      },
    },
    {
      id: 'practitioner',
      label: 'Status',
      render: ({ value }) => {
        return '-';
      },
    },
    {
      id: 'practitioner',
      label: '',
      maxWidth: '50px',
      width: '50px',
      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE,
                // state: { detailData: row },
              });
            }}
            style={{ padding: 4 }}
          >
            <img src={VerticalTune} height="19px" width="19px" />
          </SquareIconButton>
        );
      },
    },

    {
      id: 'practitioner',
      label: '',
      maxWidth: '50px',
      width: '50px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE,
                search: `?practitionerID=${row.practitioner.resourceId}`,
              });
            }}
            style={{ padding: 4 }}
          >
            <InfoIcon style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
    {
      id: 'practitioner',
      label: '',
      maxWidth: '50px',
      width: '50px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              HandleDeleteModalOpen(),
                onHandleDetail(true, row, row.practitioner.resourceId);
            }}
            style={{ padding: 4 }}
          >
            <DeleteIcon style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
    {
      id: 'practitioner',
      label: '',
      maxWidth: '50px',
      width: '50px',
      render: ({ value, row }) => {
        return (
          <EditIconSquareButton
            onClick={() => {
              history.push({
                pathname: ROUTES_CONSTANTS.ADMINISTRATION_DOCTOR_EDIT,
                state: {
                  practitionerID:
                    row && row.practitioner && row.practitioner.resourceId,
                },
              });
            }}
            edge="end"
            iconProps={{ style: { width: '18px' } }}
            style={{ height: '17px', width: '17px', padding: '0.8rem' }}
          />
        );
      },
    },
  ];

  const OuterBoxTopComponent = () => {
    return (
      <>
        <Grid container>
          <Grid item xs sm={4}>
            <SearchInput
              onChange={e => handleChange(e.target.value)}
              placeholder="Search Doctor"
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const OuterBoxBottomComponent = () => {
    return (
      <>
        {!LocalLoader ? (
          Data && Data.length > 0 ? (
            <ViewTable
              rows={Data}
              headCells={defaultHeadCells}
              headBackground={'#f0f0f0'}
              pagination={false}
            />
          ) : (
            <div style={{ height: 285, width: '100%' }}>
              <NoRecord />
            </div>
          )
        ) : (
          <ListSkeleton count={7} />
        )}
      </>
    );
  };

  const handleDelete = async () => {
    setDeleteLoader(true);
    const { payload } = await props.doPractionerDelete({
      resourceType: 'Practitioner',
      // id: selectedId,
      id: uuidv4(),
    });
    setDeleteLoader(false);
    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');
      getPractitionerList('');
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }

    HandleDeleteModalOpen();
  };

  return (
    <Fragment>
      {/* <div className={classes.main}>
        <Grid container>
          <Grid container style={{ marginBottom: 25 }}>
            <Grid item xs sm={4}>
              <PageTitleText>All Doctors</PageTitleText>
            </Grid>
          </Grid>

          <OuterBox
            topComponent={OuterBoxTopComponent()}
            bottomComponent={OuterBoxBottomComponent()}
          />
        </Grid>
      </div> */}

      {OuterBoxBottomComponent()}

      <CancleDialog
        handleClick={HandleDeleteModalOpen}
        open={deleteModalOpen}
        isLoading={DeleteLoader}
        disabled={DeleteLoader}
        handleDelete={handleDelete}
      />

      <PinkAddCircleButton
        title={'Add Doctor'}
        onClick={() => {
          history.push(ROUTES_CONSTANTS.ADMINISTRATION_DOCTOR_CREATE);
        }}
        size="small"
        style={{
          width: 140,
          borderRadius: 50,
          position: 'fixed',
          bottom: 40,
          right: 40,
        }}
      />
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    getPractitionerList: payload => dispatch(getPractitionerList(payload)),
    doPractionerDelete: payload => dispatch(doPractionerDelete(payload)),

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
)(AllDoctors);
