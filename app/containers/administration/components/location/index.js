import React, { useEffect } from 'react';
import {
  CancleDialog,
  EditIconSquareButton,
  MessageComponent,
  PinkAddCircleButton,
  SquareIconButton,
  ViewTable,
} from '../../../../components';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getLocationList } from '../../../../apis/administrationApis/administrationSlice';
import { getOrganizationData } from '../../../../utils/authHelper';

import { ListSkeleton } from '../../../../components/skeleton';
const NoRecord = React.lazy(() =>
  import('../../../../components/elements/NoRecordPage'),
);

function LocationList(props) {
  const { locationList } = props;
  const history = useHistory();
  const organizationId = getOrganizationData('resourceId');
  const [DeleteLoader, setDeleteLoader] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [LocalLoader, setLocalLoader] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const HandleDeleteModalOpen = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const getLocationListApi = async resourceId => {
    const { payload } = await props.getLocationList({ id: resourceId });
    setLocalLoader(true);
    if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    if (organizationId) {
      getLocationListApi(organizationId);
    }
  }, []);

  const handleDelete = async () => {
    // setDeleteLoader(true);
    // const { payload } = await props.doPractionerDelete({
    //   resourceType: 'Practitioner',
    //   // id: selectedId,
    //   id: uuidv4(),
    // });
    // setDeleteLoader(false);
    // if (payload && payload.status === 200) {
    //   props.snackbarShowMessage(payload.data.message, 'success');
    //   // getPractitionerList('');
    // } else if (payload && payload.message) {
    //   let m =
    //     payload.response &&
    //     payload.response.data &&
    //     payload.response.data.message
    //       ? payload.response.data.message
    //       : payload.message;

    //   props.snackbarShowMessage(m, 'error');
    // }

    HandleDeleteModalOpen();
  };
  const Data = (locationList && locationList) || [];
  console.log(Data);
  const defaultHeadCells = [
    {
      id: 'name',
      label: 'Location',
      render: ({ value }) => {
        return value || '-';
      },
    },
    {
      id: 'address',
      label: 'Full Address',
      render: ({ value }) => {
        return (
          <span>
            {value.line ? value.line : ''}
            {value.city ? `, ${value.city}` : ''}{' '}
            {value.state ? `, ${value.state}` : ''}
            {value.postalCode ? `, ${value.postalCode}` : ''}
          </span>
        );
      },
    },
    {
      id: 'name',
      label: 'Last Updated',
      maxWidth: '150px',
      width: '150px',
      render: ({ value }) => {
        return '00/00/0000';
      },
    },
    {
      id: 'status',
      label: 'Status',
      maxWidth: '150px',
      width: '150px',
      render: ({ value }) => {
        return value || '-';
      },
    },
    {
      id: 'resourceId',
      label: '',
      maxWidth: '50px',
      width: '50px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              HandleDeleteModalOpen(), setSelectedId(value);
            }}
            style={{ padding: 4 }}
          >
            <DeleteIcon style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
    {
      id: 'resourceId',
      label: '',
      maxWidth: '50px',
      width: '50px',
      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname: ROUTES_CONSTANTS.ADMINISTRATION_LOCATION_EDIT,
                state: {
                  locationID: value,
                },
              });
            }}
            style={{ padding: 4 }}
          >
            <Edit style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
  ];
  return (
    <>
      {LocalLoader ? (
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

      <CancleDialog
        handleClick={HandleDeleteModalOpen}
        open={deleteModalOpen}
        isLoading={DeleteLoader}
        disabled={DeleteLoader}
        handleDelete={handleDelete}
      />

      <PinkAddCircleButton
        title={'Add Location'}
        onClick={() => {
          history.push(ROUTES_CONSTANTS.ADMINISTRATION_LOCATION_CREATE);
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
    </>
  );
}

const mapStateToProps = state => state.Administration;
export function mapDispatchToProps(dispatch) {
  return {
    getLocationList: payload => dispatch(getLocationList(payload)),

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
)(LocationList);
