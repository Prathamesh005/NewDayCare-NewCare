import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  actionsConfig,
  doPractionerDelete,
  getStaffList,
  useAdministrationSlice,
} from '../../../../apis/administrationApis/administrationSlice';
import { getPractitionerList } from '../../../../apis/globalApis/globalSlice';
import {
  CancleDialog,
  OuterBox,
  PageTitleText,
  PinkAddCircleButton,
  SearchInput,
  SquareIconButton,
  ViewTable,
  MessageComponent,
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

function AllStaff(props) {
  useAdministrationSlice();
  const {} = props;
  const classes = useStyles();
  const [data, setData] = useState({
    query: false,
    date: moment().format(List_DATE_TIME_DISPLAY),
    activeFilter: [],
  });
  const [practitionerList, setPractitionerList] = React.useState([]);
  const [LocalLoader, setLocalLoader] = React.useState(false);
  const [DeleteLoader, setDeleteLoader] = React.useState(false);
  const [modelOpen, setModalOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const history = useHistory();
  const handleModelClick = () => {
    setModalOpen(!modelOpen);
  };

  const onHandleDetail = (value, row, Id) => {
    setOpenDetail(value);
    setSelectedId(Id);
    setSelectedData(row);
  };

  const getStaffListApi = async inputData => {
    setLocalLoader(true);
    const { payload } = await props.getStaffList(inputData);
    setLocalLoader(false);

    if (payload && payload.length !== 0) {
      setPractitionerList(payload);
    }
    if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    getStaffListApi('');
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
      label: 'Staff Name',
      maxWidth: '250px',
      width: '250px',
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
      label: 'Role',
      render: ({ value }) => {
        return 'Physical therapists';
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
            // onClick={() => {
            //   history.push({
            //     pathname: ROUTES_CONSTANTS.ADMINISTRATION_STAFF_EDIT,
            //     state: { detailData: row },
            //   });
            // }}
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
              handleModelClick(),
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
      maxWidth: '80px',
      width: '80px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname: ROUTES_CONSTANTS.ADMINISTRATION_STAFF_EDIT,
                state: { detailData: row },
              });
            }}
            style={{ padding: 4 }}
          >
            <EditIcon style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
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
              placeholder="Search Staff"
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
            <div style={{ height: 250, width: '100%' }}>
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

    handleModelClick();
  };

  return (
    <Fragment>
      {/* <div className={classes.main}>
        <Grid container>
          <Grid container style={{ marginBottom: 25 }}>
            <Grid item xs sm={4}>
              <PageTitleText>All Staff</PageTitleText>
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
        handleClick={handleModelClick}
        open={modelOpen}
        isLoading={DeleteLoader}
        disabled={DeleteLoader}
        handleDelete={handleDelete}
      />

      <PinkAddCircleButton
        title={'Add Staff'}
        onClick={() => {
          history.push(ROUTES_CONSTANTS.ADMINISTRATION_STAFF_CREATE);
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
    getStaffList: payload => dispatch(getStaffList(payload)),
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
)(AllStaff);
